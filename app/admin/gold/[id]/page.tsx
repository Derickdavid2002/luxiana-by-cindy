import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../../_components/AdminLayout"
import EditGoldForm from "./_components/EditGoldForm"
import { GoldItem } from "../../../types"
import { redirect } from "next/navigation"

export default async function EditGoldPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const item: GoldItem = await adminClient.fetch(
    `*[_type == "goldItem" && _id == $id][0] {
      _id, name, slug, description, images, order
    }`,
    { id }
  )

  if (!item) redirect("/admin/gold")

  return (
    <AdminLayout>
      <EditGoldForm item={item} />
    </AdminLayout>
  )
}