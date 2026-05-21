import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../_components/AdminLayout"
import GoldList from "./_components/GoldList"
import { GoldItem } from "../../types"

export default async function AdminGoldPage() {
  const items: GoldItem[] = await adminClient.fetch(
    `*[_type == "goldItem"] | order(order asc) {
      _id, name, slug, description, images, order
    }`
  )

  return (
    <AdminLayout>
      <GoldList initialItems={items} />
    </AdminLayout>
  )
}