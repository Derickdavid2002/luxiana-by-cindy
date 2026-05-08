"use client"

import Image from "next/image"
import { useCartStore } from "../store/cartStore"
import { urlFor } from "@/lib/sanity"
import { FaWhatsapp } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { MdAdd, MdRemove } from "react-icons/md"

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty } = useCartStore()

  const cartCount = items.reduce((a, i) => a + i.qty, 0)
  const cartTotal = items.reduce((a, i) => a + i.price * i.qty, 0)

  const buildWhatsAppMsg = () => {
    const lines = items
      .map(i => `• ${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`)
      .join("\n")
    const msg = `Hello Luxiana Beauty! 🌸\n\nI'd like to place an order:\n\n${lines}\n\n*Total: ${fmt(cartTotal)}*\n\nPlease confirm availability and payment details. Thank you!`
    return `https://wa.me/2347086253922?text=${encodeURIComponent(msg)}`
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[98]"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-[420px] max-w-[100vw] h-screen z-[99] flex flex-col
          bg-gradient-to-b from-[#0e0e0e] to-[#0a0a0a]
          border-l border-[rgba(232,61,138,0.2)]
          transition-transform duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)]
          ${isOpen
            ? "translate-x-0 shadow-[-20px_0_60px_rgba(232,61,138,0.1)]"
            : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-7 py-6 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <HiOutlineShoppingBag size={20} className="text-[#E83D8A]" />
            <h2 className="text-white text-[17px] font-bold tracking-wide">
              Your Cart{" "}
              {cartCount > 0 && (
                <span
                  className="text-[#E83D8A]"
                  style={{ textShadow: "0 0 10px #E83D8A" }}
                >
                  ({cartCount})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 bg-white/5 border border-[#1e1e1e] cursor-pointer hover:text-white hover:border-white/20 transition-colors"
          >
            <RxCross2 size={14} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#1e1e1e] flex items-center justify-center">
                <HiOutlineShoppingBag size={28} className="text-white/20" />
              </div>
              <div>
                <p className="text-white/40 text-sm font-semibold tracking-wide">
                  Your cart is empty
                </p>
                <p className="text-white/20 text-xs mt-1">
                  Add some products to get started
                </p>
              </div>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item._id}
                className="flex gap-4 py-4 border-b border-[#1e1e1e]"
              >
                {/* Image */}
                <div className="relative w-[70px] h-[70px] rounded-xl overflow-hidden flex-shrink-0 border border-[#1e1e1e]">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).width(140).height(140).url()}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-semibold mb-1 leading-snug truncate">
                    {item.name}
                  </p>
                  <p
                    className="text-[#E83D8A] text-[13px] font-black mb-3"
                    style={{ textShadow: "0 0 8px rgba(232,61,138,0.4)" }}
                  >
                    {fmt(item.price)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#1e1e1e] text-white/60 hover:text-white hover:border-[#E83D8A]/30 transition-colors cursor-pointer"
                    >
                      <MdRemove size={14} />
                    </button>
                    <span className="text-white text-sm font-bold min-w-[20px] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#1e1e1e] text-white/60 hover:text-white hover:border-[#E83D8A]/30 transition-colors cursor-pointer"
                    >
                      <MdAdd size={14} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="self-start mt-1 text-white/20 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <RxCross2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-7 py-5 border-t border-[#1e1e1e]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/40 text-xs tracking-widest uppercase">
                Total
              </span>
              <span className="text-white text-[22px] font-black">
                {fmt(cartTotal)}
              </span>
            </div>
            <p className="text-white/25 text-[11px] mb-5">
              {cartCount} item{cartCount > 1 ? "s" : ""} · Free delivery on orders above ₦20,000
            </p>
            <a
              href={buildWhatsAppMsg()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-sm text-white tracking-wide no-underline transition-all hover:opacity-90 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #128C7E, #25D366)",
                boxShadow: "0 4px 24px rgba(37,211,102,0.3)",
              }}
            >
              <FaWhatsapp size={18} />
              Checkout via WhatsApp
            </a>
            <p className="text-white/20 text-[10px] text-center mt-3 leading-relaxed">
              Your full order summary will be sent to Cindy on WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  )
}