import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminLayout from "../../_components/AdminLayout"
import ProductForm from "./_components/ProductForm"

export default async function NewProductPage() {
const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <AdminLayout>
      <ProductForm />
    </AdminLayout>
  )
}