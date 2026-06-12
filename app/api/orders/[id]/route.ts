import { NextResponse } from "next/server"
import { adminClient } from "@/lib/adminSanity"
import { resend } from "@/lib/email/resend"
import { paymentConfirmedTemplate } from "@/lib/email/templates/paymentConfirmed"
import { orderShippedTemplate } from "@/lib/email/templates/orderShipped"
import { orderDeliveredTemplate } from "@/lib/email/templates/orderDelivered"
import { paymentRejectedTemplate } from "@/lib/email/templates/paymentRejected"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log("ORDER STATUS UPDATE API HIT")
    console.log("HAS RESEND KEY:", !!process.env.RESEND_API_KEY)

    const { id } = await params
    const { status, reason } = await req.json()

    console.log("Updating order:", id)
    console.log("New status:", status)

    const order = await adminClient.fetch(
      `*[_type == "order" && _id == $id][0] {
        _id,
        orderNumber,
        status,
        customer,
        total
      }`,
      { id }
    )

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    await adminClient
      .patch(id)
      .set({
        status,
        ...(reason ? { rejectionReason: reason } : {}),
      })
      .commit()

    const fmt = (n: number) => `₦${n.toLocaleString()}`

    const emailMap: Record<
      string,
      { subject: string; html: string } | null
    > = {
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
          reason:
            reason ||
            `Payment mismatch. Expected ${fmt(order.total)}.`,
        }),
      },
    }

    const emailData = emailMap[status]

    if (emailData && order.customer?.email) {
      console.log("Sending status email to:", order.customer.email)

      const result = await resend.emails.send({
        from: "Luxiana Beauty <orders@luxianabeauty.com>",
        to: [order.customer.email],
        subject: emailData.subject,
        html: emailData.html,
      })

      console.log(
        "STATUS EMAIL RESULT:",
        JSON.stringify(result, null, 2)
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("ORDER UPDATE ERROR:", error)

    return NextResponse.json(
      {
        error: "Failed to update order",
      },
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
        rejectionReason,
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
    console.error("FETCH ORDER ERROR:", error)

    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}