import Navbar from "../_components/Navbar"
import Footer from "../_components/Footer"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 88 }}>
        {children}
      </main>
      <Footer />
    </>
  )
}