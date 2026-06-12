import { NextResponse } from "next/server"
import { adminClient } from "@/lib/adminSanity"
import { resend, ADMIN_EMAIL } from "@/lib/email/resend"
import { paymentConfirmedTemplate } from "@/lib/email/templates/paymentConfirmed"
import { orderShippedTemplate } from "@/lib/email/templates/orderShipped"
import { orderDeliveredTemplate } from "@/lib/email/templates/orderDelivered"
import { paymentRejectedTemplate } from "@/lib/email/templates/paymentRejected"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status, reason } = await req.json()

    const order = await adminClient.fetch(
      `*[_type == "order" && _id == $id][0] {
        _id, orderNumber, status, customer, total
      }`,
      { id }
    )

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update status in Sanity
    await adminClient
      .patch(id)
      .set({ status, ...(reason ? { rejectionReason: reason } : {}) })
      .commit()

    const fmt = (n: number) => `₦${n.toLocaleString()}`

    const emailMap: Record<string, { subject: string; html: string } | null> = {
      confirmed: {
        subject: `✅ Payment Confirmed — #${order.orderNumber}`,
        html: paymentConfirmedTemplate({
          customerName: order.customer.name,
          orderNumber: order.orderNumber,
        }),
      },
      shipped: {
        subject: `🚚 Your Order is On the Way — #${order.orderNumber}`,
        html: orderShippedTemplate({
          customerName: order.customer.name,
          orderNumber: order.orderNumber,
        }),
      },
      delivered: {
        subject: `🌸 Order Delivered — #${order.orderNumber}`,
        html: orderDeliveredTemplate({
          customerName: order.customer.name,
          orderNumber: order.orderNumber,
        }),
      },
      rejected: {
        subject: `❌ Payment Not Confirmed — #${order.orderNumber}`,
        html: paymentRejectedTemplate({
          customerName: order.customer.name,
          orderNumber: order.orderNumber,
          reason: reason || `The payment amount did not match the order total of ${fmt(order.total)}. Please resend the correct amount and place a new order.`,
        }),
      },
    }

    const emailData = emailMap[status]
    if (emailData && order.customer?.email) {
      await resend.emails.send({
        from: "Luxiana Beauty <orders@luxianabeauty.com>",
        to: [order.customer.email],
        subject: emailData.subject,
        html: emailData.html,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    )
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await adminClient.fetch(
      `*[_type == "order" && _id == $id][0] {
        _id, orderNumber, status, customer, delivery,
        items, subtotal, total, proofOfPayment, notes,
        rejectionReason, createdAt
      }`,
      { id }
    )
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json(order)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}