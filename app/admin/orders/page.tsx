import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../_components/AdminLayout"
import OrderList from "./_components/OrderList"

export const revalidate = 0
export const dynamic = "force-dynamic"

export default async function AdminOrdersPage() {
  const orders = await adminClient.fetch(
    `*[_type == "order"] | order(createdAt desc) {
      _id, orderNumber, status, customer, delivery,
      items, subtotal, total, createdAt
    }`,
    {},
    { cache: "no-store" }
  )

  return (
    <AdminLayout>
      <OrderList initialOrders={orders} />
    </AdminLayout>
  )
}