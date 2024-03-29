import Stripe from "stripe"
import Product from "./components/Product"

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  })

  const products = await stripe.products.list()

  // Prices are seperate from product name.
  // fetch each of the products based on the price id
  // after fetch successfully then mark as promise resolved
  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id })
      const features = product.metadata.features || ""
      return {
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        id: product.id,
        description: product.description,
        currency: prices.data[0].currency,
        metadata: { features },
      }
    })
  )
  return productWithPrices
}

export default async function Home() {
  const products = await getProducts()
  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product
          id={product.id}
          name={product.name}
          unit_amount={product.unit_amount}
          image={product.image}
          description={product.description}
          key={product.id}
          metadata={product.metadata}></Product>
      ))}
    </main>
  )
}

