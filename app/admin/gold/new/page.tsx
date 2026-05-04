import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminLayout from "../../_components/AdminLayout"
import GoldForm from "./_components/GoldForm"

export default async function NewGoldPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <AdminLayout>
      <GoldForm />
    </AdminLayout>
  )
}