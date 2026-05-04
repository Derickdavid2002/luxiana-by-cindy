"use client"

import Image from "next/image"
import { urlFor } from "../../../../lib/sanity"
import { GoldItem } from "../../../types"

export default function GoldGrid({ items }: { items: GoldItem[] }) {
  return (
    <div className="w-full min-h-screen bg-[#060400]">

      {/* Hero */}
      <div className="relative w-full overflow-hidden py-24 text-center border-b border-[#2a1a04] bg-gradient-to-b from-[#100800] to-[#0a0500]">
        
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&q=80)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-[#100800]/90" />

        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(200,148,42,0.2),transparent_70%)] blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 border border-yellow-500/40 bg-yellow-500/10">
            <span className="text-[11px] font-bold uppercase tracking-[4px] text-yellow-400">
              ✦ Exclusive Collection ✦
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-yellow-300 drop-shadow-[0_0_30px_rgba(200,148,42,0.6)] mb-4">
            The Gold Collection
          </h1>

          <p className="text-sm sm:text-base text-yellow-700 max-w-xl mx-auto leading-relaxed">
            Rare pieces reserved for those who appreciate true luxury. Enquire
            to receive exclusive details and pricing.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-5xl block mb-4">✦</span>
            <p className="text-yellow-800">
              Gold Collection coming soon. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <div
                key={item._id}
                className="rounded-2xl overflow-hidden border border-yellow-900/40 bg-gradient-to-br from-[#130e04] to-[#1c1508] shadow-lg hover:-translate-y-2 hover:border-yellow-500 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(item.images[0]).width(600).height(450).url()}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <span className="absolute top-4 right-4 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-yellow-500/20 border border-yellow-500/50 text-yellow-300">
                    ✦ GOLD
                  </span>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-yellow-200">
                    {item.name}
                  </h3>

                  <p className="text-sm text-yellow-700 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">

                    {/* ✅ FIXED WhatsApp */}
                    <a
                      href={`https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(
                        `Hello! I'm interested in the *${item.name}* from the Gold Collection. Please provide more details and pricing. Thank you!`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wide bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black shadow-md hover:scale-105 hover:brightness-110 transition-all"
                    >
                      💬 Enquire
                    </a>

                    {/* ✅ FIXED Instagram */}
                    <a
                      href="https://instagram.com/luxianabeauty"
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-xl border border-yellow-900/40 bg-yellow-500/10 text-yellow-400 hover:border-yellow-500 hover:scale-110 transition-all"
                    >
                      📸
                    </a>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}