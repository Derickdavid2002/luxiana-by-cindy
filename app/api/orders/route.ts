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
    console.log("ORDER API HIT")
    console.log("HAS RESEND KEY:", !!process.env.RESEND_API_KEY)
    console.log("ADMIN EMAIL:", process.env.ADMIN_EMAIL)

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

    console.log("Creating order:", orderNumber)

    // Save order to Sanity
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

    console.log("Order saved successfully:", order._id)

    // CUSTOMER EMAIL
    console.log("Sending customer email to:", customer.email)

    const customerResult = await resend.emails.send({
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

    console.log(
      "CUSTOMER EMAIL RESULT:",
      JSON.stringify(customerResult, null, 2)
    )

    // ADMIN EMAIL
    console.log("Sending admin email to:", ADMIN_EMAIL)

    const adminResult = await resend.emails.send({
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

    console.log(
      "ADMIN EMAIL RESULT:",
      JSON.stringify(adminResult, null, 2)
    )

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

export async function GET(_req: Request) {
  try {
    const orders = await adminClient.fetch(
      `*[_type == "order"] | order(createdAt desc) {
        _id,
        orderNumber,
        status,
        customer,
        delivery,
        items,
        subtotal,
        total,
        createdAt
      }`,
      {},
      { cache: "no-store" }
    )

    return NextResponse.json(orders)
  } catch (error) {
    console.error("FETCH ORDERS ERROR:", error)

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}