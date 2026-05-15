export function orderPlacedTemplate({
  customerName,
  orderNumber,
  items,
  subtotal,
  deliveryFee,
  total,
  address,
  state,
}: {
  customerName: string
  orderNumber: string
  items: { name: string; qty: number; price: number }[]
  subtotal: number
  deliveryFee: number
  total: number
  address: string
  state: string
}) {
  const fmt = (n: number) => `₦${n.toLocaleString()}`

  const itemRows = items
    .map(
      i => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0f0f0;font-size:14px">${i.name}</td>
        <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#f0f0f0;font-size:14px;text-align:center">x${i.qty}</td>
        <td style="padding:10px 0;border-bottom:1px solid #1e1e1e;color:#E83D8A;font-size:14px;text-align:right;font-weight:bold">${fmt(i.price * i.qty)}</td>
      </tr>`
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#060606;font-family:Helvetica,Arial,sans-serif">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px">

        <!-- Header -->
        <div style="text-align:center;margin-bottom:40px">
          <h1 style="color:#E83D8A;font-size:24px;font-weight:900;letter-spacing:3px;text-transform:uppercase;margin:0">
            LUXIANA BEAUTY
          </h1>
          <p style="color:#f472b6;font-size:12px;font-style:italic;margin:4px 0 0">by cindy</p>
        </div>

        <!-- Card -->
        <div style="background:#111111;border:1px solid #1e1e1e;border-radius:16px;padding:32px">
          <h2 style="color:#f0f0f0;font-size:20px;font-weight:700;margin:0 0 8px">
            Order Received! 🌸
          </h2>
          <p style="color:#7a7a7a;font-size:14px;margin:0 0 24px;line-height:1.6">
            Hi ${customerName}, we've received your order and proof of payment. We'll confirm your payment shortly and begin processing your order.
          </p>

          <!-- Order number -->
          <div style="background:#1a1a1a;border:1px solid #E83D8A33;border-radius:10px;padding:16px;margin-bottom:24px">
            <p style="color:#7a7a7a;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px">Order Number</p>
            <p style="color:#E83D8A;font-size:18px;font-weight:900;margin:0;letter-spacing:2px">#${orderNumber}</p>
          </div>

          <!-- Items -->
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <thead>
              <tr>
                <th style="color:#7a7a7a;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:left;padding-bottom:10px">Item</th>
                <th style="color:#7a7a7a;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:center;padding-bottom:10px">Qty</th>
                <th style="color:#7a7a7a;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:right;padding-bottom:10px">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <!-- Totals -->
          <div style="border-top:1px solid #1e1e1e;padding-top:16px">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:#7a7a7a;font-size:13px">Subtotal</span>
              <span style="color:#f0f0f0;font-size:13px">${fmt(subtotal)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:16px">
              <span style="color:#7a7a7a;font-size:13px">Delivery (${state})</span>
              <span style="color:#f0f0f0;font-size:13px">${fmt(deliveryFee)}</span>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="color:#f0f0f0;font-size:16px;font-weight:700">Total</span>
              <span style="color:#E83D8A;font-size:20px;font-weight:900">${fmt(total)}</span>
            </div>
          </div>

          <!-- Delivery -->
          <div style="background:#1a1a1a;border:1px solid #1e1e1e;border-radius:10px;padding:16px;margin-top:24px">
            <p style="color:#7a7a7a;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Delivery Address</p>
            <p style="color:#f0f0f0;font-size:14px;margin:0">${address}</p>
            <p style="color:#7a7a7a;font-size:13px;margin:4px 0 0">${state} State</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align:center;margin-top:32px">
          <p style="color:#4a4a4a;font-size:12px;line-height:1.6">
            Questions? Reply to this email or message us on WhatsApp.<br>
            © 2025 Luxiana Beauty by Cindy
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}