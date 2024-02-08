"use client"

import Image from "next/image"
import { useCartStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5"
import basket from "@/public/shopping-basket.png"
import { AnimatePresence, motion } from "framer-motion"
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"

export default function Cart() {
  const cartStore = useCartStore()

  // Total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + (item.unit_amount as number) * item.quantity!
  }, 0)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25">
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-100 absolute right-0 top-0 w-full h-screen p-12 overflow-y-scroll lg:w-2/5">
        {cartStore.onCheckout === "cart" && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12">
            Back to Store 🏃
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="text-sm font-bold pb-12">
            Check your cart 🛒
          </button>
        )}
        {/* Cart Items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="flex py-4 gap-4 bg-base-200 p-4 rounded-lg my-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-3xl w-40 h-40 object-cover"
                />
                <div>
                  <h2>{item.name}</h2>

                  <motion.div layout className="flex gap-2 ">
                    <h2>Quantity: {item.quantity}</h2>
                    <button onClick={() => cartStore.removeProduct(item)}>
                      <IoRemoveCircle />
                    </button>
                    <button onClick={() => cartStore.addProduct(item)}>
                      <IoAddCircle />
                    </button>
                  </motion.div>
                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {/* Checkout and Total Price */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <>
            <motion.p layout>Total: {formatPrice(totalPrice)}</motion.p>
            <motion.button
              layout
              onClick={() => cartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-primary text-white w-full rounded-md">
              Checkout
            </motion.button>
          </>
        ) : null}

        {/* Checkout form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}

        {/* Successful Checkout */}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}

        {/* Empty Cart */}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
              <h1> Uhhh ohhh...it's empty ☹️</h1>
              <Image src={basket} alt="basket" width={200} height={200}></Image>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
