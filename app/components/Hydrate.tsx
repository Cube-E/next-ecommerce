"use client"

// Hydrate data to sync server data to client state data
import { ReactNode, useEffect, useState } from "react"
import { useThemeStore } from "@/store"
import { SessionProvider } from "next-auth/react"
export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const themeStore = useThemeStore()
  //wait till NextJs rehydration is complete
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <SessionProvider>
      {isHydrated ? (
        <body className=" w-full" data-theme={themeStore.mode}>
          {children}
        </body>
      ) : (
        <body></body>
      )}
    </SessionProvider>
  )
}
