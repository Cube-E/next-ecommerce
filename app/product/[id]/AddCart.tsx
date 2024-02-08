"use client"

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"
import { useState } from "react"

export default function AddCart({
  name,
  id,
  image,
  quantity,
  unit_amount,
}: AddCartType) {
  const cartStore = useCartStore()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    console.log(name, unit_amount, id)
    cartStore.addProduct({ id, name, unit_amount, quantity, image })
    setAdded(true)
    setTimeout(() => setAdded(false), 500)
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn btn-primary w-full text-white">
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 😎</span>}
      </button>
    </>
  )
}
