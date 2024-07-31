import Stripe from "stripe"
import Product from "./components/Product"
import Image from "next/image"
import frontgrill from "@/assets/frontpagegrill.jpg"
import WordAnimation from "./components/WordAnimation"

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
    <>
      {/* <div className="h-2/3 bg-grill bg-no-repeat bg-cover bg-center bg-fixed"> */}
      <div className="relative w-full">
        <Image
          className="object-cover object-center w-full h-full rounded-md "
          src={frontgrill}
          alt=""
        />
        <div className="absolute inset-0 pt-96 pl-10">
          <h1 className=" text-black font-bold text-6xl ">
            Discover Your Style
          </h1>
          <WordAnimation></WordAnimation>
        </div>
        {/* <main className=" absolute inset-44 grid grid-cols-fluid gap-4">
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
        </main> */}
      </div>
    </>
  )
}

