import { NextResponse } from "next/server"
import { adminClient } from "@/lib/adminSanity"
import { resend, ADMIN_EMAIL } from "@/lib/email/resend"
import { orderPlacedTemplate } from "@/lib/email/templates/orderPlaced"
import { newOrderAlertTemplate } from "@/lib/email/templates/newOrderAlert"

function generateOrderNumber() {
  return `LUX-${Date.now().toString().slice(-6)}-${Math.random()
    .toString(36)
    .slice(2, 5)
    .toUpperCase()}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      customer,
      delivery,
      items,
      subtotal,
      total,
      proofOfPaymentId,
      proofUrl,
    } = body

    const orderNumber = generateOrderNumber()

    // 1. Save order
    const order = await adminClient.create({
      _type: "order",
      orderNumber,
      status: "pending",
      customer,
      delivery,
      items,
      subtotal,
      total,
      proofOfPayment: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: proofOfPaymentId,
        },
      },
      createdAt: new Date().toISOString(),
    })

    // 2. CUSTOMER EMAIL
    const customerEmail = await resend.emails.send({
      from: "Luxiana Beauty <orders@luxianabeauty.com>",
      to: [customer.email],
      subject: `Order Received — #${orderNumber}`,
      html: orderPlacedTemplate({
        customerName: customer.name,
        orderNumber,
        items,
        subtotal,
        deliveryFee: delivery.fee,
        total,
        address: delivery.address,
        state: delivery.state,
      }),
    })

    console.log("Customer email result:", customerEmail)

    // 3. ADMIN EMAIL
    const adminEmail = await resend.emails.send({
      from: "Luxiana Beauty <orders@luxianabeauty.com>",
      to: [ADMIN_EMAIL],
      subject: `🛍 New Order — #${orderNumber}`,
      html: newOrderAlertTemplate({
        orderNumber,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        address: delivery.address,
        state: delivery.state,
        items,
        subtotal,
        deliveryFee: delivery.fee,
        total,
        proofUrl,
      }),
    })

    console.log("Admin email result:", adminEmail)

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order._id,
    })
  } catch (error) {
    console.error("ORDER CREATION ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 }
    )
  }
}