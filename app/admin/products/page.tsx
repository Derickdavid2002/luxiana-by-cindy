import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../_components/AdminLayout"
import ProductList from "./_components/ProductList"
import { Product } from "../../types"

export const dynamic = "force-dynamic" // ← ADD THIS LINE

export default async function AdminProductsPage() {
  const products: Product[] = await adminClient.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id, name, slug, category, price, description, image, inStock, featured
    }`,
    {},
    { cache: "no-store" } // ← ADD THIS
  )

  return (
    <AdminLayout>
      <ProductList initialProducts={products} />
    </AdminLayout>
  )
}