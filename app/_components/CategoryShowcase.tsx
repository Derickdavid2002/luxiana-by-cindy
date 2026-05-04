"use client";

import { useRouter } from "next/navigation";

const CATS = [
  { label: "Skincare", emoji: "✨", desc: "Glow essentials", hoverClass: "hover:border-blue-400", glowClass: "from-blue-400/5" },
  { label: "Kayamata", emoji: "🌺", desc: "Feminine wellness", hoverClass: "hover:border-pink-500", glowClass: "from-pink-500/5" },
  { label: "Body Care", emoji: "🧴", desc: "Head-to-toe luxury", hoverClass: "hover:border-violet-400", glowClass: "from-violet-400/5" },
  { label: "Fragrance", emoji: "🌸", desc: "Signature scents", hoverClass: "hover:border-pink-300", glowClass: "from-pink-300/5" },
];

const MARQUEE_ITEMS = ["✦ SKINCARE", "✦ KAYAMATA", "✦ BODY CARE", "✦ FRAGRANCE", "✦ GOLD COLLECTION", "✦ PREMIUM BEAUTY"];

export default function CategoryShowcase() {
  const router = useRouter();

  return (
    <div className="w-full">

      {/* Marquee Strip */}
      <div className="w-full bg-gradient-to-r from-[#E83D8A] to-[#c0256e] py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {MARQUEE_ITEMS.map((t) => (
                <span key={t} className="text-white/90 text-[11px] tracking-[3px] font-bold px-8">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="w-full bg-[#0e0e0e] px-8 py-20">
        <div className="max-w-[1280px] mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[#E83D8A] text-[10px] tracking-[5px] uppercase mb-3.5">Explore</p>
            <h2 className="text-[#f0f0f0] text-[34px] font-bold tracking-wide">Shop by Category</h2>
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-transparent via-[#E83D8A] to-transparent mx-auto mt-4" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATS.map((cat) => (
              <button
                key={cat.label}
                onClick={() => router.push(`/shop?category=${cat.label}`)}
                className={`group relative overflow-hidden bg-gradient-to-br from-[#141414] to-[#101010] border border-[#1e1e1e] rounded-2xl px-5 py-9 cursor-pointer text-center transition-all duration-300 hover:-translate-y-1 ${cat.hoverClass}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${cat.glowClass} to-transparent`} />
                <div className="text-[40px] mb-3.5">{cat.emoji}</div>
                <div className="relative z-10 text-[#f0f0f0] font-bold text-base mb-1.5 tracking-wide">{cat.label}</div>
                <div className="relative z-10 text-[#4a4a4a] text-xs tracking-wide">{cat.desc}</div>
              </button>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}