import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { adminClient } from "../../../../lib/adminSanity"
import AdminLayout from "../../_components/AdminLayout"
import EditProductForm from "./_components/EditProductForm"
import { Product } from "../../../types"

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  if (!session) redirect("/admin/login")

  const product: Product = await adminClient.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id, name, slug, category, price, description, image, inStock, featured
    }`,
    { id: params.id }
  )

  if (!product) redirect("/admin/products")

  return (
    <AdminLayout>
      <EditProductForm product={product} />
    </AdminLayout>
  )
}