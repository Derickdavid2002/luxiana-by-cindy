import { NextResponse } from "next/server"
import { adminClient } from "../../../../../lib/adminSanity"
import { revalidatePath } from "next/cache"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const product = await adminClient.patch(id).set(body).commit()
    revalidatePath("/shop")
    revalidatePath("/")
    revalidatePath(`/shop/${body.slug?.current || ""}`)
    return NextResponse.json(product)
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Fetch slug before deleting so we can revalidate
    const product = await adminClient.fetch(
      `*[_type == "product" && _id == $id][0]{ slug }`,
      { id }
    )

    await adminClient.delete(id)

    // Revalidate all pages that show products
    revalidatePath("/")
    revalidatePath("/shop")
    revalidatePath("/shop/[slug]", "page")
    if (product?.slug?.current) {
      revalidatePath(`/shop/${product.slug.current}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}