export function paymentRejectedTemplate({
  customerName,
  orderNumber,
  reason,
}: {
  customerName: string
  orderNumber: string
  reason?: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#060606;font-family:Helvetica,Arial,sans-serif">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px">
        <div style="text-align:center;margin-bottom:40px">
          <h1 style="color:#E83D8A;font-size:24px;font-weight:900;letter-spacing:3px;text-transform:uppercase;margin:0">LUXIANA BEAUTY</h1>
          <p style="color:#f472b6;font-size:12px;font-style:italic;margin:4px 0 0">by cindy</p>
        </div>
        <div style="background:#111111;border:1px solid #1e1e1e;border-radius:16px;padding:32px;text-align:center">
          <div style="width:64px;height:64px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px">❌</div>
          <h2 style="color:#f0f0f0;font-size:20px;font-weight:700;margin:0 0 12px">Payment Not Confirmed</h2>
          <p style="color:#7a7a7a;font-size:14px;margin:0 0 24px;line-height:1.7">
            Hi ${customerName}, we were unable to confirm your payment for order <strong style="color:#E83D8A">#${orderNumber}</strong>.
          </p>
          ${reason ? `
          <div style="background:#1a1a1a;border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:16px;margin-bottom:24px;text-align:left">
            <p style="color:#7a7a7a;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px">Reason</p>
            <p style="color:#f0f0f0;font-size:14px;margin:0">${reason}</p>
          </div>
          ` : ""}
          <div style="background:rgba(232,61,138,0.05);border:1px solid rgba(232,61,138,0.2);border-radius:10px;padding:16px;margin-bottom:24px">
            <p style="color:#E83D8A;font-size:13px;font-weight:600;margin:0">What to do next?</p>
            <p style="color:#7a7a7a;font-size:13px;margin:8px 0 0;line-height:1.6">
              Please make a new transfer with the <strong style="color:#f0f0f0">correct amount</strong> and place a new order, or contact us on WhatsApp for assistance.
            </p>
          </div>
          <a href="https://wa.me/2348081859922" style="display:inline-block;background:linear-gradient(135deg,#128C7E,#25D366);color:#fff;padding:12px 28px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none">
            Contact Us on WhatsApp
          </a>
        </div>
        <div style="text-align:center;margin-top:32px">
          <p style="color:#4a4a4a;font-size:12px">© 2025 Luxiana Beauty by Cindy</p>
        </div>
      </div>
    </body>
    </html>
  `
}