"use client"

import { FaWhatsapp, FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa"

export default function ContactSection() {
  const socials = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      sub: "Chat with us directly",
      href: "https://wa.me/2348081859922",
      color: "#25D366",
      glow: "rgba(37,211,102,0.15)",
      border: "rgba(37,211,102,0.25)",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      sub: "@Luxiana_Beauty",
      href: "https://instagram.com/Luxiana_Beauty",
      color: "#E1306C",
      glow: "rgba(225,48,108,0.15)",
      border: "rgba(225,48,108,0.25)",
    },
    {
      icon: FaTiktok,
      label: "TikTok",
      sub: "@Luxiana_Beauty",
      href: "https://www.tiktok.com/@Luxiana_Beauty",
      color: "#69C9D0",
      glow: "rgba(105,201,208,0.15)",
      border: "rgba(105,201,208,0.25)",
    },
    {
      icon: FaSnapchat,
      label: "Snapchat",
      sub: "@Sweeetcin",
      href: "https://snapchat.com/add/Sweeet_cin",
      color: "#FFFC00",
      glow: "rgba(255,252,0,0.15)",
      border: "rgba(255,252,0,0.25)",
    },
  ]

  return (
    <div className="w-full min-h-screen bg-[#060606]">

      {/* Header */}
      <div
        className="relative w-full overflow-hidden py-24 text-center border-b border-[#1e1e1e]"
        style={{ background: "#0a0a0a" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(232,61,138,0.1) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6">
          <p
            className="text-[11px] uppercase tracking-[5px] mb-3 font-semibold"
            style={{ color: "#E83D8A", textShadow: "0 0 10px #E83D8A66" }}
          >
            Reach Out
          </p>
          <h1 className="text-[40px] font-bold text-white mb-4 tracking-wide">
            Contact Us
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-5"
            style={{
              background: "linear-gradient(to right, transparent, #E83D8A, transparent)",
              boxShadow: "0 0 10px #E83D8A",
            }}
          />
          <p className="text-sm text-white/40 max-w-md mx-auto leading-loose">
            We'd love to hear from you. Reach out via any of the platforms below.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Social cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {socials.map(item => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center text-center py-8 px-4 rounded-2xl border transition-all duration-300 hover:-translate-y-2 no-underline"
              style={{
                background: "#111111",
                borderColor: item.border,
                boxShadow: `0 4px 20px ${item.glow}`,
              }}
            >
              <item.icon size={32} style={{ color: item.color, marginBottom: 12 }} />
              <span
                className="text-sm font-bold mb-1 tracking-wide"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
              <span className="text-[11px] text-white/30">{item.sub}</span>
            </a>
          ))}
        </div>

        {/* CTA Card */}
        <div
          className="w-full rounded-2xl p-10 text-center border border-[#E83D8A]/20"
          style={{
            background: "linear-gradient(145deg, #111111, #0d0d0d)",
            boxShadow: "0 0 40px rgba(232,61,138,0.06)",
          }}
        >
          <FaWhatsapp size={40} className="text-[#25D366] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
            Place an Order
          </h3>
          <p className="text-sm text-white/40 leading-loose mb-8 max-w-sm mx-auto">
            Add items to your cart and checkout, or message us directly on WhatsApp with any questions.
          </p>
          <a
            href="https://wa.me/2348081859922"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-12 py-4 rounded-xl font-bold text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:scale-105 no-underline"
            style={{
              background: "linear-gradient(135deg, #128C7E, #25D366)",
              boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
            }}
          >
            <FaWhatsapp size={18} />
            Message Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}