import { NextResponse } from "next/server"
import { adminClient } from "@/lib/adminSanity"
import { resend } from "@/lib/email/resend"
import { paymentConfirmedTemplate } from "@/lib/email/templates/paymentConfirmed"
import { orderShippedTemplate } from "@/lib/email/templates/orderShipped"
import { orderDeliveredTemplate } from "@/lib/email/templates/orderDelivered"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await req.json()

    const order = await adminClient.fetch(
      `*[_type == "order" && _id == $id][0] {
        _id,
        orderNumber,
        status,
        customer
      }`,
      { id }
    )

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // Update order status
    await adminClient.patch(id).set({ status }).commit()

    // Email templates
    const emailMap: Record<
      string,
      { subject: string; html: string } | null
    > = {
      confirmed: {
        subject: `✅ Payment Confirmed — #${order.orderNumber}`,
        html: paymentConfirmedTemplate({
          customerName: order.customer?.name,
          orderNumber: order.orderNumber,
        }),
      },

      shipped: {
        subject: `🚚 Your Order Has Been Shipped — #${order.orderNumber}`,
        html: orderShippedTemplate({
          customerName: order.customer?.name,
          orderNumber: order.orderNumber,
        }),
      },

      delivered: {
        subject: `🌸 Order Delivered — #${order.orderNumber}`,
        html: orderDeliveredTemplate({
          customerName: order.customer?.name,
          orderNumber: order.orderNumber,
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
        _id,
        orderNumber,
        status,
        customer,
        delivery,
        items,
        subtotal,
        total,
        proofOfPayment,
        notes,
        createdAt
      }`,
      { id }
    )

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Fetch order error:", error)

    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}