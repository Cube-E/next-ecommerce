"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
export default function WordAnimation() {
  const items = ["GRILL", "BARBECUE", "RE-BASTE", "MULTI-ZONE"]
  const itemVariants = {
    // initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { ease: "easeOut", duration: 2 },
  }
  const [showItem, setShowItem] = useState(true)
  const [idx, setIdx] = useState(0)

  setTimeout(() => {
    console.log(idx)
    if (showItem) {
      setIdx((idx + 1) % items.length)
    }
    setShowItem(!showItem)

    // Use 1500 if going for animation
  }, 750)

  return (
    <div className="text-orange-300 font-semibold text-4xl pt-4 pl-2 w-2/5 text-center">
      {/* <AnimatePresence>
        {showItem && (
          <motion.div
            className="box"
            initial={{ x: 0, opacity: -1, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              ease: [0, 0.71, 0.2, 1.01],
            }}
            exit={{ x: -1, opacity: 0, scale: 0.5 }}>
            {items[idx]}
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* This one is no animation. */}
      {items[idx]}
    </div>
  )
}
