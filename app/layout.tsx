import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Luxiana Beauty by Cindy",
  description: "Premium beauty products crafted for the woman who deserves only the finest.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ background: "#060606", overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  )
}