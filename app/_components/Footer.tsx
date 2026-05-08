import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/gold", label: "Gold Collection" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { label: "💬 WhatsApp", href: "https://wa.me/2347086253922" },
  { label: "📸 Instagram", href: "https://instagram.com/luxianabeauty" },
  { label: "🎵 TikTok", href: "https://tiktok.com/@luxianabeauty" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] border-t border-[#1e1e1e] px-10 pt-12 pb-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="font-black text-[16px] text-[#E83D8A] tracking-[2px] uppercase [font-family:'Arial_Black',sans-serif] [text-shadow:0_0_16px_rgba(232,61,138,0.33)] mb-1">
              LUXIANA BEAUTY
            </div>
            <div className="text-[#f472b6] text-xs [font-family:Georgia,serif] italic mb-3.5">by cindy</div>
            <p className="text-[#4a4a4a] text-xs leading-[1.7] max-w-[240px]">Premium beauty products for the modern woman.</p>
          </div>

          {/* Nav */}
          <div className="text-center">
            <p className="text-[#4a4a4a] text-[11px] tracking-widest uppercase mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-[#4a4a4a] text-[13px] no-underline tracking-wide hover:text-[#f0f0f0] transition-colors duration-200">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="text-right">
            <p className="text-[#4a4a4a] text-[11px] tracking-widest uppercase mb-4">Follow Us</p>
            <div className="flex flex-col gap-2.5 items-end">
              {socialLinks.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="text-[#4a4a4a] text-[13px] no-underline hover:text-[#f0f0f0] transition-colors duration-200">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e1e1e] pt-6 flex justify-between items-center flex-wrap gap-3">
          <p className="text-[#2a2a2a] text-xs">© 2025 Luxiana Beauty by Cindy. All rights reserved.</p>
          <div className="flex gap-1.5 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E83D8A] shadow-[0_0_8px_#E83D8A]" />
            <span className="text-[#2a2a2a] text-[11px] tracking-widest">Premium Beauty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}