import Link from "next/link"
import { FaWhatsapp, FaInstagram, FaTiktok, FaSnapchat } from "react-icons/fa"

export default function Footer() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/gold", label: "Gold Collection" },
    { href: "/contact", label: "Contact" },
  ]

  const socials = [
    { href: "https://wa.me/2348081859922", icon: FaWhatsapp, label: "WhatsApp", color: "#25D366", bg: "rgba(37,211,102,0.1)", border: "rgba(37,211,102,0.2)" },
    { href: "https://instagram.com/Luxiana_Beauty", icon: FaInstagram, label: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.1)", border: "rgba(225,48,108,0.2)" },
    { href: "https://tiktok.com/@Luxiana_Beauty", icon: FaTiktok, label: "TikTok", color: "#69C9D0", bg: "rgba(105,201,208,0.1)", border: "rgba(105,201,208,0.2)" },
    { href: "https://snapchat.com/add/Sweeetcin", icon: FaSnapchat, label: "Snapchat", color: "#FFFC00", bg: "rgba(255,252,0,0.1)", border: "rgba(255,252,0,0.2)" },
  ]

  return (
    <footer className="w-full pt-16 pb-10 px-6 md:px-12" style={{ background: "#0a0a0a", borderTop: "1px solid #1e1e1e" }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <span
              className="block font-black text-[18px] tracking-[3px] uppercase mb-1 text-[#E83D8A]"
              style={{ fontFamily: "'Arial Black', sans-serif", textShadow: "0 0 16px #E83D8A55" }}
            >
              LUXIANA BEAUTY
            </span>
            <span
              className="block text-[13px] tracking-wide mb-5 text-[#f472b6]"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              by cindy
            </span>
            <p className="text-[13px] leading-relaxed text-white/35 max-w-[240px] mb-6">
              Premium beauty products crafted for the modern woman who deserves only the finest.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 flex-wrap">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          {/* <div>
            <p className="text-[11px] uppercase tracking-[3px] mb-5 font-semibold text-[#E83D8A]">
              Navigate
            </p>
            <div className="flex flex-col gap-4">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/35 hover:text-[#E83D8A] transition-colors duration-200 w-fit no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div> */}

          {/* Contact */}
          <div>
            <p className="text-[11px] uppercase tracking-[3px] mb-5 font-semibold text-[#E83D8A]">
              Get in Touch
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/2348081859922"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/35 hover:text-[#25D366] transition-colors duration-200 w-fit no-underline"
              >
                <FaWhatsapp size={14} />
                WhatsApp Us
              </a>
              <a
                href="https://instagram.com/Luxiana_Beauty"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/35 hover:text-[#E1306C] transition-colors duration-200 w-fit no-underline"
              >
                <FaInstagram size={14} />
                Instagram
              </a>
              <a
                href="https://tiktok.com/@Luxiana_Beauty"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/35 hover:text-[#69C9D0] transition-colors duration-200 w-fit no-underline"
              >
                <FaTiktok size={14} />
                TikTok
              </a>
              <a
                href="https://snapchat.com/add/Sweeetcin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/35 hover:text-[#FFFC00] transition-colors duration-200 w-fit no-underline"
              >
                <FaSnapchat size={14} />
                Snapchat
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: "linear-gradient(to right, transparent, rgba(232,61,138,0.3), transparent)" }}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-[12px] text-white/20">
            © 2025 Luxiana Beauty by Cindy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-[#E83D8A]"
                style={{ boxShadow: "0 0 8px #E83D8A" }}
              />
              <span className="text-[11px] tracking-widest uppercase text-white/20">
                Premium Beauty
              </span>
            </div>
            <Link
              href="/admin"
              className="text-[11px] text-white/10 hover:text-white/30 transition-colors tracking-widest uppercase no-underline"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}