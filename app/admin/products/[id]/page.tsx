import { adminClient } from "@/lib/adminSanity"
import AdminLayout from "../../_components/AdminLayout"
import EditProductForm from "./_components/EditProductForm"
import { Product } from "../../../types"
import { redirect } from "next/navigation"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product: Product = await adminClient.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id, name, slug, category, price, description, image, inStock, featured
    }`,
    { id }
  )

  if (!product) redirect("/admin/products")

  return (
    <AdminLayout>
      <EditProductForm product={product} />
    </AdminLayout>
  )
}