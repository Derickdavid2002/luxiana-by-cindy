import { Resend } from "resend"

const apiKey = process.env.RESEND_API_KEY
const adminEmail = process.env.ADMIN_EMAIL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY in environment variables")
}

if (!adminEmail) {
  throw new Error("Missing ADMIN_EMAIL in environment variables")
}

export const resend = new Resend(apiKey)

export const ADMIN_EMAIL = adminEmail
export const SITE_URL = siteUrl || "http://localhost:3000"