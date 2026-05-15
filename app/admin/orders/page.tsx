import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../_components/AdminLayout"
import OrderList from "./_components/OrderList"

export default async function AdminOrdersPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const orders = await adminClient.fetch(
    `*[_type == "order"] | order(createdAt desc) {
      _id, orderNumber, status, customer, delivery,
      items, subtotal, total, createdAt
    }`
  )

  return (
    <AdminLayout>
      <OrderList initialOrders={orders} />
    </AdminLayout>
  )
}