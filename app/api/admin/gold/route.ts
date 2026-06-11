import { NextResponse } from "next/server"
import { adminClient } from "../../../../lib/adminSanity"
import { revalidatePath } from "next/cache"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const item = await adminClient.create({
      _type: "goldItem",
      ...body,
    })

    // Revalidate so new gold item shows immediately
    revalidatePath("/gold")

    return NextResponse.json(item)
  } catch {
    return NextResponse.json(
      { error: "Failed to create gold item" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const items = await adminClient.fetch(
      `*[_type == "goldItem"] | order(order asc) {
        _id, name, slug, description, images, order
      }`
    )
    return NextResponse.json(items)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch gold items" },
      { status: 500 }
    )
  }
}