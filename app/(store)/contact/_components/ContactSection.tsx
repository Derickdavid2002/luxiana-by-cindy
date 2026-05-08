export default function ContactSection() {
  const socials = [
    { icon: "💬", label: "WhatsApp", sub: "Chat with us", hoverBorder: "hover:border-[#25D366]", hoverShadow: "hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]", href: "https://wa.me/2347086253922" },
    { icon: "📸", label: "Instagram", sub: "@luxianabeauty", hoverBorder: "hover:border-[#E1306C]", hoverShadow: "hover:shadow-[0_0_30px_rgba(225,48,108,0.2)]", href: "https://instagram.com/luxianabeauty" },
    { icon: "🎵", label: "TikTok", sub: "@luxianabeauty", hoverBorder: "hover:border-[#69C9D0]", hoverShadow: "hover:shadow-[0_0_30px_rgba(105,201,208,0.2)]", href: "https://tiktok.com/@luxianabeauty" },
  ];

  return (
    <div className="relative bg-[#060606] min-h-screen px-8 pt-[100px] pb-20 overflow-hidden">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(232,61,138,0.06)_0%,transparent_70%)] blur-[40px]" />

      <div className="relative z-[1] max-w-[680px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#E83D8A] text-[10px] tracking-[5px] uppercase mb-3.5">Reach Out</p>
          <h1 className="text-[#f0f0f0] text-[40px] font-bold mb-4 tracking-wide">Contact Us</h1>
          <div className="w-[60px] h-[2px] bg-gradient-to-r from-transparent via-[#E83D8A] to-transparent mx-auto mb-5 shadow-[0_0_10px_#E83D8A]" />
          <p className="text-[#4a4a4a] text-sm leading-[1.9]">We'd love to hear from you. Connect with us on any platform below.</p>
        </div>

        {/* Socials */}
        <div className="grid grid-cols-3 gap-3.5 mb-9">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`bg-gradient-to-br from-[#121212] to-[#0e0e0e] border border-[#1e1e1e] rounded-2xl px-4 py-8 text-center no-underline block transition-all duration-300 hover:-translate-y-1 ${item.hoverBorder} ${item.hoverShadow}`}
            >
              <div className="text-[36px] mb-3">{item.icon}</div>
              <div className="text-[#f0f0f0] font-bold text-sm mb-1.5">{item.label}</div>
              <div className="text-[#4a4a4a] text-[11px]">{item.sub}</div>
            </a>
          ))}
        </div>

        {/* Order card */}
        <div className="bg-gradient-to-br from-[#111111] to-[#0d0d0d] border border-[rgba(232,61,138,0.35)] rounded-[18px] px-9 py-10 text-center">
          <div className="text-[40px] mb-4">🌸</div>
          <h3 className="text-[#f0f0f0] text-[18px] font-bold mb-3">Place an Order</h3>
          <p className="text-[#7a7a7a] text-sm leading-[1.8] max-w-[400px] mx-auto mb-7">
            Add items to your cart and checkout via WhatsApp, or message us directly with questions.
          </p>
          <a
            href="https://wa.me/2347086253922"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-gradient-to-br from-[#128C7E] to-[#25D366] text-white px-12 py-[15px] rounded-xl font-bold text-sm no-underline shadow-[0_4px_24px_rgba(37,211,102,0.35)]"
          >
            💬 Message Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}