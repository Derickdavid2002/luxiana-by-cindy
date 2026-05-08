"use client"

import { useEffect } from "react"
import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer"
import CartDrawer from "../_components/CartDrawer"
import { useCartStore } from "../store/cartStore"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const checkExpiry = useCartStore(state => state.checkExpiry)

  useEffect(() => {
    // Check expiry on mount and every minute
    checkExpiry()
    const interval = setInterval(checkExpiry, 60 * 1000)
    return () => clearInterval(interval)
  }, [checkExpiry])

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main style={{ paddingTop: 80 }}>
        {children}
      </main>
      <Footer />
    </>
  )
}