"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HERO_IMAGES } from "../../lib/data";

export default function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background images */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${i === heroIndex ? "opacity-100 animate-heroZoom" : "opacity-0"}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/30 via-[#060606]/55 to-[#060606]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(232,61,138,0.08)_0%,transparent_70%)]" />

      {/* Floating blobs */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,61,138,0.12)_0%,transparent_70%)] blur-[40px] animate-float" />
      <div className="absolute bottom-[15%] right-[8%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(232,61,138,0.1)_0%,transparent_70%)] blur-[30px] animate-float [animation-direction:reverse] [animation-duration:8s]" />

      {/* Content */}
      <div className="relative z-[2] mb-15 text-center px-6 max-w-[800px] animate-fadeInUp">
        <div className="inline-flex items-center gap-2.5 bg-[rgba(232,61,138,0.1)] border border-[rgba(232,61,138,0.3)] rounded-full px-5 py-1.5 mb-8 backdrop-blur-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E83D8A] shadow-[0_0_8px_#E83D8A] inline-block" />
          <span className="text-[#f472b6] text-[10px] tracking-[3px] uppercase font-semibold">Premium Beauty by Cindy</span>
        </div>

        <h1 className="font-black text-[clamp(56px,10vw,110px)] text-[#f0f0f0] tracking-[4px] uppercase leading-none mb-1.5 [text-shadow:0_4px_40px_rgba(0,0,0,0.5)] [font-family:'Arial_Black',sans-serif]">
          LUXIANA
        </h1>
        <h2 className="font-black text-[clamp(38px,7vw,74px)] tracking-[4px] uppercase leading-none mb-2.5 [font-family:'Arial_Black',sans-serif] bg-gradient-to-br from-[#E83D8A] via-[#f472b6] to-[#ff6eb5] bg-clip-text text-transparent [filter:drop-shadow(0_0_20px_rgba(232,61,138,0.4))]">
          BEAUTY
        </h2>
        <p className="text-[clamp(18px,3vw,28px)] text-[#f472b6] tracking-[4px] mb-10 opacity-90 [font-family:Georgia,serif] italic [text-shadow:0_0_20px_rgba(232,61,138,0.27)]">
          by cindy
        </p>
        <p className="text-[rgba(240,240,240,0.65)] text-[15px] max-w-[420px] mx-auto mb-[52px] leading-[1.9] tracking-[0.3px]">
          Premium beauty products crafted for the woman who deserves only the finest.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/shop"
            className="bg-gradient-to-br from-[#E83D8A] to-[#c0256e] text-white px-12 py-4 rounded-xl font-bold text-sm no-underline tracking-[1.5px] uppercase shadow-[0_0_30px_rgba(232,61,138,0.5)]"
          >
            Shop Now
          </Link>
          <Link
            href="/gold"
            className="bg-white/5 text-[#f0f0f0] border border-white/20 px-12 py-4 rounded-xl font-semibold text-sm no-underline tracking-[1.5px] uppercase backdrop-blur-[10px]"
          >
            Gold Collection
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex gap-2 z-[3]">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setHeroIndex(i)}
            className={`h-2 rounded-full border-none cursor-pointer transition-all duration-400 ${i === heroIndex ? "w-7 bg-[#E83D8A] shadow-[0_0_10px_#E83D8A]" : "w-2 bg-white/30"}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 right-10 flex items-center gap-2 animate-float [animation-duration:2.5s]">
        <span className="text-white/30 text-[10px] tracking-[2px] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[rgba(232,61,138,0.6)] to-transparent" />
      </div>
    </div>
  );
}