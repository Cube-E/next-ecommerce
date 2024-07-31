import Image from "next/image"
import formatPrice from "@/util/PriceFormat"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { name, image, unit_amount, id, description, features },
      }}>
      <div className="">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="rounded-md h-48 w-48 object-cover"
          priority={true}
        />
        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  )
}
