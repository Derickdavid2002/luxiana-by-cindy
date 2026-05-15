import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../../_components/AdminLayout"
import OrderDetail from "./_components/OrderDetail"

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const { id } = await params

  const order = await adminClient.fetch(
    `*[_type == "order" && _id == $id][0] {
      _id, orderNumber, status, customer, delivery,
      items, subtotal, total, proofOfPayment, notes, createdAt
    }`,
    { id }
  )

  if (!order) redirect("/admin/orders")

  return (
    <AdminLayout>
      <OrderDetail order={order} />
    </AdminLayout>
  )
}