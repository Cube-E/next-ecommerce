import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamType"
import formatPrice from "@/util/PriceFormat"
import AddCart from "./AddCart"

export default async function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16 ">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={400}
        height={400}
        className=" sm:w-full xl:w-2/5 rounded-md"
        priority={true}
      />
      <div className="font-medium bg-base-200 p-4 rounded-md">
        <h1> {searchParams.id}</h1>
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount !== null
              ? formatPrice(searchParams.unit_amount)
              : "N/A"}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  )
}
