import { NextResponse } from "next/server"
import { adminClient } from "../../../../lib/adminSanity"

export async function GET() {
  try {
    const products = await adminClient.fetch(
      `*[_type == "product"] | order(_createdAt desc) {
        _id, name, slug, category, price, description, image, inStock, featured
      }`
    )
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const product = await adminClient.create({
      _type: "product",
      ...body,
    })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}