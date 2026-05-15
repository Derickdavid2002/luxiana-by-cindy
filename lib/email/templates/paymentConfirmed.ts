export function paymentConfirmedTemplate({
  customerName,
  orderNumber,
}: {
  customerName: string
  orderNumber: string
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
          <div style="font-size:48px;margin-bottom:16px">✅</div>
          <h2 style="color:#f0f0f0;font-size:22px;font-weight:700;margin:0 0 12px">Payment Confirmed!</h2>
          <p style="color:#7a7a7a;font-size:14px;margin:0 0 24px;line-height:1.7">
            Hi ${customerName}, your payment for order <strong style="color:#E83D8A">#${orderNumber}</strong> has been confirmed. We're now preparing your order!
          </p>
          <div style="background:#22c55e11;border:1px solid #22c55e33;border-radius:10px;padding:16px">
            <p style="color:#22c55e;font-size:14px;font-weight:600;margin:0">
              🎉 Your order is being prepared and will be shipped soon!
            </p>
          </div>
        </div>
        <div style="text-align:center;margin-top:32px">
          <p style="color:#4a4a4a;font-size:12px">© 2025 Luxiana Beauty by Cindy</p>
        </div>
      </div>
    </body>
    </html>
  `
}