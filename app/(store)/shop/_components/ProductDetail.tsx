"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCartStore } from "../../../store/cartStore"
import { urlFor } from "@/lib/sanity"
import { Product } from "../../../types"
import { FaWhatsapp } from "react-icons/fa"
import { MdShoppingCart, MdCheck } from "react-icons/md"

const fmt = (n: number) => `₦${n.toLocaleString()}`

const ENQUIRY_ONLY = ["Jewelry"]
export default function ProductDetail({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const addItem = useCartStore(state => state.addItem)

  const isEnquiryOnly = ENQUIRY_ONLY.includes(product.category)

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
    <div className="w-full min-h-screen bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12 text-sm text-white/30">
          <Link href="/" className="hover:text-[#E83D8A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#E83D8A] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Image */}
          <div
            className="relative w-full aspect-square rounded-2xl overflow-hidden"
            style={{ border: "1px solid #1e1e1e" }}
          >
            {product.image && (
              <Image
                src={urlFor(product.image).width(800).height(800).url()}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            )}

            {/* Category badge */}
            <span
              className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm"
              style={{
                border: "1px solid rgba(232,61,138,0.4)",
                background: "rgba(232,61,138,0.1)",
                color: "#E83D8A",
              }}
            >
              {product.category}
            </span>

            {/* Enquiry only badge */}
            {isEnquiryOnly && (
              <span
                className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm"
                style={{
                  border: "1px solid rgba(37,211,102,0.4)",
                  background: "rgba(37,211,102,0.1)",
                  color: "#25D366",
                }}
              >
                Enquiry Only
              </span>
            )}

            {!product.inStock && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <span className="text-white/60 text-lg font-bold uppercase tracking-widest">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">

            {/* Title + Price */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-3xl font-black"
                  style={{
                    color: "#E83D8A",
                    textShadow: "0 0 20px rgba(232,61,138,0.4)",
                  }}
                >
                  {fmt(product.price)}
                </span>
                {product.inStock ? (
                  <span
                    className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      color: "#22c55e",
                      border: "1px solid rgba(34,197,94,0.2)",
                    }}
                  >
                    In Stock
                  </span>
                ) : (
                  <span
                    className="text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.3)",
                      border: "1px solid #1e1e1e",
                    }}
                  >
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(232,61,138,0.3), transparent)",
              }}
            />

            {/* Description */}
            <p className="text-base leading-relaxed text-white/60">
              {product.description}
            </p>

            {/* Divider */}
            <div
              className="h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(232,61,138,0.3), transparent)",
              }}
            />

            {/* Actions */}
            {product.inStock && (
              <div className="flex flex-col gap-4">

                {isEnquiryOnly ? (
                  /* ENQUIRY ONLY — Gold & Diamonds */
                  <div className="flex flex-col gap-3">
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(37,211,102,0.05)",
                        border: "1px solid rgba(37,211,102,0.15)",
                      }}
                    >
                      <p className="text-[12px] text-white/40 leading-relaxed">
                        This is a premium item available by enquiry only.
                        Contact us on WhatsApp for pricing, availability and
                        more details.
                      </p>
                    </div>
<a
                    
                      href={`https://wa.me/2348081859922?text=${encodeURIComponent(
                        `Hello! I'm interested in *${product.name}* from the ${product.category} collection. Please provide more details and pricing. Thank you!`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-5 rounded-xl font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 text-white no-underline transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg, #128C7E, #25D366)",
                        boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
                      }}
                    >
                      <FaWhatsapp size={18} />
                      Enquire on WhatsApp
                    </a>

                    <a
                      href="https://instagram.com/Luxiana_Beauty"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 text-white/60 no-underline transition-all duration-300 hover:text-white"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid #1e1e1e",
                      }}
                    >
                      Or DM us on Instagram
                    </a>
                  </div>
                ) : (
                  /* NORMAL — Skincare & Watches */
                  <>
                    {/* Qty */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs uppercase tracking-widest text-white/50">
                        Qty
                      </span>
                      <div
                        className="flex items-center gap-3 p-1 rounded-xl"
                        style={{ border: "1px solid #1e1e1e", background: "rgba(255,255,255,0.05)" }}
                      >
                        <button
                          onClick={() => setQty(q => Math.max(1, q - 1))}
                          className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #1e1e1e",
                          }}
                        >
                          −
                        </button>
                        <span className="text-white font-bold min-w-[28px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(q => q + 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #1e1e1e",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-5 rounded-xl font-bold text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer"
                      style={{
                        background: added
                          ? "linear-gradient(135deg, #166534, #15803d)"
                          : "linear-gradient(135deg, #E83D8A, #c0256e)",
                        boxShadow: added
                          ? "0 4px 24px rgba(22,101,52,0.4)"
                          : "0 0 40px rgba(232,61,138,0.4)",
                      }}
                    >
                      {added ? (
                        <>
                          <MdCheck size={18} />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <MdShoppingCart size={18} />
                          Add {qty > 1 ? `${qty} items` : ""} to Cart
                        </>
                      )}
                    </button>

                    {/* WhatsApp order */}
                    <a
                      href={`https://wa.me/2348081859922?text=${encodeURIComponent(
                        `Hello! I'd like to order *${product.name}* x${qty} — ${fmt(product.price * qty)}. Please confirm availability. Thank you!`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-[2px] flex items-center justify-center gap-3 text-white/60 no-underline transition-all duration-300 hover:text-white"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid #1e1e1e",
                      }}
                    >
                      <FaWhatsapp size={16} />
                      Order via WhatsApp
                    </a>
                  </>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-2">
              {["Premium Quality", "Fast Delivery", "100% Authentic"].map(tag => (
                <span
                  key={tag}
                  className="text-[11px] px-3 py-1.5 rounded-full text-white/40"
                  style={{ border: "1px solid #1e1e1e" }}
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
            className="text-sm text-white/40 hover:text-[#E83D8A] transition-colors"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}