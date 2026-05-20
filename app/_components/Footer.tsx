import Link from "next/link"

export default function Footer() {
  return (
    <footer
      className="w-full pt-16 pb-10 px-12"
      style={{ background: "#0a0a0a", borderTop: "1px solid #1e1e1e" }}
    >
      <div className="max-w-8xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-3 gap-12 mb-14">

          {/* Brand */}
          <div>
            <span
              className="block font-black text-[18px] tracking-[3px] uppercase mb-1 text-[#E83D8A]"
              style={{ fontFamily: "'Arial Black', sans-serif", textShadow: "0 0 16px #E83D8A55" }}
            >
              LUXIANA BEAUTY
            </span>
            <span
              className="block text-[13px] tracking-wide mb-6 text-[#f472b6]"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              by cindy
            </span>
            <p className="text-[13px] leading-relaxed text-white/35 max-w-[240px]">
              Premium beauty products crafted for the modern woman who deserves only the finest.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { href: "https://wa.me/2348000000000", icon: "💬", color: "rgba(37,211,102,0.1)", border: "rgba(37,211,102,0.2)" },
                { href: "https://instagram.com/luxianabeauty", icon: "📸", color: "rgba(225,48,108,0.1)", border: "rgba(225,48,108,0.2)" },
                { href: "https://tiktok.com/@luxianabeauty", icon: "🎵", color: "rgba(105,201,208,0.1)", border: "rgba(105,201,208,0.2)" },
              ].map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110 text-lg"
                  style={{ background: s.color, border: `1px solid ${s.border}` }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[11px] uppercase tracking-[3px] mb-6 font-semibold text-[#E83D8A]">
              Navigate
            </p>
            <div className="flex flex-col gap-4">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/gold", label: "Gold Collection" },
                { href: "/contact", label: "Contact" },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/35 hover:text-[#E83D8A] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] uppercase tracking-[3px] mb-6 font-semibold text-[#E83D8A]">
              Get in Touch
            </p>
            <div className="flex flex-col gap-4">
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer"
                className="text-sm text-white/35 hover:text-[#25D366] transition-colors duration-200 w-fit">
                💬 WhatsApp Us
              </a>
              <a href="https://instagram.com/luxianabeauty" target="_blank" rel="noreferrer"
                className="text-sm text-white/35 hover:text-[#E1306C] transition-colors duration-200 w-fit">
                📸 Instagram
              </a>
              <a href="https://tiktok.com/@luxianabeauty" target="_blank" rel="noreferrer"
                className="text-sm text-white/35 hover:text-[#69C9D0] transition-colors duration-200 w-fit">
                🎵 TikTok
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
            {/* Hidden admin link — subtle, only Cindy knows it's here */}
            <Link
              href="/admin"
              className="text-[11px] text-white/10 hover:text-white/30 transition-colors tracking-widest uppercase"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}