"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCartStore } from "../../../store/cartStore"
import { urlFor } from "@/lib/sanity"
import { Product } from "../../../types"

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function ProductDetail({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug.current,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="w-full min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12 text-sm text-white/30">
          <Link href="/" className="hover:text-pink-DEFAULT">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-pink-DEFAULT">Shop</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-dark-border">
            <Image
              src={urlFor(product.image).width(800).height(800).url()}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />

            {/* Category */}
            <span className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink/40 bg-pink/10 text-pink-DEFAULT backdrop-blur-sm">
              {product.category}
            </span>

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <span className="text-white/60 text-lg font-bold uppercase tracking-widest">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-pink-DEFAULT drop-shadow-[0_0_10px_rgba(232,61,138,0.5)]">
                  {fmt(product.price)}
                </span>

                {product.inStock ? (
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                    In Stock
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest bg-white/5 text-white/30 border border-dark-border">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-pink/30 to-transparent" />

            {/* Description */}
            <p className="text-base leading-relaxed text-white/60">
              {product.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-pink/30 to-transparent" />

            {/* Actions */}
            {product.inStock && (
              <div className="flex flex-col gap-4">

                {/* Qty */}
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-widest text-white/50">
                    Qty
                  </span>

                  <div className="flex items-center gap-3 p-1 rounded-xl border border-dark-border bg-white/5">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-dark-border hover:bg-pink/10 hover:text-pink-DEFAULT"
                    >
                      −
                    </button>

                    <span className="text-white font-bold min-w-[28px] text-center">
                      {qty}
                    </span>

                    <button
                      onClick={() => setQty(q => q + 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-dark-border hover:bg-pink/10 hover:text-pink-DEFAULT"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-5 rounded-xl font-bold text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:scale-[1.02]
                  ${added 
                    ? "bg-green-700 shadow-[0_4px_24px_rgba(26,92,42,0.4)]" 
                    : "bg-gradient-to-r from-pink-DEFAULT to-pink-700 shadow-[0_0_40px_rgba(232,61,138,0.4)]"
                  }`}
                >
                  {added ? "✓ Added to Cart!" : `Add ${qty > 1 ? `${qty} items` : ""} to Cart`}
                </button>

                {/* ✅ FIXED WhatsApp */}
                <a
                  href={`https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(
                    `Hello! I'd like to order *${product.name}* x${qty} — ${fmt(product.price * qty)}. Please confirm availability. Thank you!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 border border-green-400/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  💬 Order via WhatsApp
                </a>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-2">
              {["Premium Quality", "Fast Delivery", "100% Authentic"].map(tag => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-dark-border text-white/40"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-16">
          <Link
            href="/shop"
            className="text-sm text-white/40 hover:text-pink-DEFAULT"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}