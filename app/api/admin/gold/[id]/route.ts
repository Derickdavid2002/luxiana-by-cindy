import { NextResponse } from "next/server"
import { adminClient } from "../../../../../lib/adminSanity"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const item = await adminClient.patch(id).set(body).commit()
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: "Failed to update gold item" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await adminClient.delete(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete gold item" }, { status: 500 })
  }
}