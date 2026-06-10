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

    // Send confirmation email to customer
    // ✅ TO CHANGE LATER: Once you have a domain verified in Resend,
    // change `from` to: "Luxiana Beauty <orders@yourdomain.com>"
    await resend.emails.send({
      from: "Luxiana Beauty <orders@luxianabeauty.com>",
      to: [customer.email], // ✅ Goes directly to customer's email
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

    // Send new order alert to admin (Cindy)
    // ✅ TO CHANGE LATER: Change ADMIN_EMAIL in .env.local to Cindy's real email
    await resend.emails.send({
      from: "Luxiana Beauty <onboarding@resend.dev>",
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

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order._id,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET(_req: Request) {
  try {
    const orders = await adminClient.fetch(
      `*[_type == "order"] | order(createdAt desc) {
        _id, orderNumber, status, customer, delivery,
        items, subtotal, total, createdAt
      }`,
      {},
      { cache: "no-store" }
    )
    return NextResponse.json(orders)
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}