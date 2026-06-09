"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MdStore,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdLock,
  MdCheckCircle,
  MdContentCopy,
  MdCheck,
  MdInfo,
} from "react-icons/md"
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
} from "react-icons/fa"

export default function SettingsClient() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const storeInfo = [
    { icon: MdStore, label: "Store Name", value: "Luxiana Beauty by Cindy" },
    { icon: MdPerson, label: "Owner", value: "Isibor Gloria Cynthia" },
    { icon: MdEmail, label: "Admin Email", value: "Cindyisibor40@icloud.com" },
    { icon: MdPhone, label: "WhatsApp", value: "+234 808 185 9922" },
  ]

  const bankInfo = [
    { label: "Bank", value: "Opay" },
    { label: "Account Number", value: "7086253922", copyKey: "account" },
    { label: "Account Name", value: "Isibor Gloria Cynthia", copyKey: "name" },
  ]

  const socialLinks = [
    { icon: FaWhatsapp, label: "WhatsApp", value: "wa.me/2348081859922", color: "#25D366" },
    { icon: FaInstagram, label: "Instagram", value: "@Luxiana_Beauty", color: "#E1306C" },
    { icon: FaTiktok, label: "TikTok", value: "@Luxiana_Beauty", color: "#69C9D0" },
    { icon: FaSnapchat, label: "Snapchat", value: "@Sweeetcin", color: "#FFFC00" },
  ]

  return (
    <div className="py-4 flex flex-col gap-5 max-w-2xl">

      {/* Header */}
      <div>
        <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-1.5 font-semibold">
          Admin
        </p>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Settings
        </h1>
        <p className="text-sm text-white/30 mt-0.5">
          Store configuration and account details
        </p>
      </div>

      {/* Info banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl"
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <MdInfo size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-blue-300/70 text-[12px] leading-relaxed">
          To change passwords, email or bank details — update them in your
          Vercel environment variables and redeploy. Contact your developer
          for code changes.
        </p>
      </div>

      {/* Store info */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[11px] uppercase tracking-[3px] text-white/30 font-semibold mb-4">
          Store Information
        </p>
        <div className="flex flex-col gap-4">
          {storeInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(232,61,138,0.08)",
                  border: "1px solid rgba(232,61,138,0.15)",
                }}
              >
                <Icon size={15} className="text-[#E83D8A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-white/25 uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-white text-[13px] font-semibold truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank details */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[11px] uppercase tracking-[3px] text-white/30 font-semibold mb-4">
          Bank Account (Payment)
        </p>
        <div className="flex flex-col gap-3">
          {bankInfo.map(item => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e" }}
            >
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mb-0.5">
                  {item.label}
                </p>
                <p className="text-white text-[13px] font-bold">{item.value}</p>
              </div>
              {item.copyKey && (
                <button
                  onClick={() => copyToClipboard(item.value, item.copyKey!)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid #1e1e1e",
                    color: copied === item.copyKey ? "#22c55e" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {copied === item.copyKey
                    ? <><MdCheck size={12} /> Copied!</>
                    : <><MdContentCopy size={12} /> Copy</>
                  }
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[11px] uppercase tracking-[3px] text-white/30 font-semibold mb-4">
          Social Media
        </p>
        <div className="flex flex-col gap-3">
          {socialLinks.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon size={15} style={{ color }} />
              </div>
              <div>
                <p className="text-[10px] text-white/25 uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-white text-[13px] font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin credentials */}
      {/* <div
        className="rounded-2xl p-5"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[11px] uppercase tracking-[3px] text-white/30 font-semibold mb-4">
          Admin Login
        </p>
        <div className="flex flex-col gap-3">
          {[
            { label: "Username", value: "cindy", copyKey: "username" },
            { label: "Password", value: "luxiana2025", copyKey: "password" },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e" }}
            >
              <div className="flex items-center gap-3">
                <MdLock size={14} className="text-[#E83D8A]" />
                <div>
                  <p className="text-[10px] text-white/25 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-white text-[13px] font-bold font-mono">
                    {item.value}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(item.value, item.copyKey)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #1e1e1e",
                  color: copied === item.copyKey ? "#22c55e" : "rgba(255,255,255,0.4)",
                }}
              >
                {copied === item.copyKey
                  ? <><MdCheck size={12} /> Copied!</>
                  : <><MdContentCopy size={12} /> Copy</>
                }
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* Status */}
      {/* <div
        className="rounded-2xl p-5"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[11px] uppercase tracking-[3px] text-white/30 font-semibold mb-4">
          System Status
        </p>
        <div className="flex flex-col gap-3">
          {[
            { label: "Sanity CMS", status: "Connected", ok: true },
            { label: "Email (Resend)", status: "Active", ok: true },
            { label: "Admin Auth", status: "Secured", ok: true },
            { label: "Order System", status: "Live", ok: true },
          ].map(item => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2"
            >
              <span className="text-white/50 text-sm">{item.label}</span>
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: item.ok ? "#22c55e" : "#ef4444",
                    boxShadow: item.ok
                      ? "0 0 6px #22c55e"
                      : "0 0 6px #ef4444",
                  }}
                />
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: item.ok ? "#22c55e" : "#ef4444" }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Sign out */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[11px] uppercase tracking-[3px] text-white/30 font-semibold mb-4">
          Session
        </p>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #E83D8A, #c0256e)" }}
          >
            C
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Cindy</p>
            <p className="text-white/30 text-[11px]">Administrator</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <MdCheckCircle size={14} className="text-green-400" />
            <span className="text-green-400 text-[11px] font-semibold">
              Active
            </span>
          </div>
        </div>
        <Button
          onClick={() => {
            if (typeof window !== "undefined") {
              import("next-auth/react").then(({ signOut }) => {
                signOut({ callbackUrl: "/admin/login" })
              })
            }
          }}
          variant="outline"
          className="w-full border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 h-11 font-semibold text-sm"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}