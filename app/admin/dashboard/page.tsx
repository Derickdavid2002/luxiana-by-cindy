import { auth } from "../../../auth"
import { redirect } from "next/navigation"
import { adminClient } from "../../../lib/adminSanity"
import AdminLayout from "../_components/AdminLayout"
import DashboardStats from "./_components/DashboardStats"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) redirect("/admin/login")

  const products = await adminClient.fetch(
    `*[_type == "product"] {
      _id, name, price, inStock, featured, category
    }`
  )

  const stats = {
    total: products.length,
    inStock: products.filter((p: any) => p.inStock).length,
    featured: products.filter((p: any) => p.featured).length,
    outOfStock: products.filter((p: any) => !p.inStock).length,
    categories: [...new Set(products.map((p: any) => p.category))].length,
  }

  return (
    <AdminLayout>
      <DashboardStats stats={stats} />
    </AdminLayout>
  )
}