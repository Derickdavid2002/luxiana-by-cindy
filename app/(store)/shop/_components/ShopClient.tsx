"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Product } from "../../../types"
import ProductCard from "../../../_components/ProductCard"
import { MdSearch, MdDiamond, MdWatch } from "react-icons/md"
import { GiRing, GiGemNecklace } from "react-icons/gi"

const CATEGORIES = ["All", "Skincare", "Jewelry", "Ladies Care"]

const JEWELRY_SUBCATEGORIES = [
  { label: "Gold", icon: GiRing, color: "#f59e0b" },
  { label: "Diamonds", icon: MdDiamond, color: "#67e8f9" },
  { label: "Moissanite", icon: GiGemNecklace, color: "#a78bfa" },
  { label: "Watches", icon: MdWatch, color: "#e2e8f0" },
]

export default function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  )
  const [search, setSearch] = useState("")

  useEffect(() => {
    const cat = searchParams.get("category") || "All"
    setActiveCategory(cat)
  }, [searchParams])

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="w-full min-h-screen bg-[#060606]">

      {/* Header */}
      <div
        className="relative w-full overflow-hidden py-20"
        style={{
          background: "#0a0a0a",
          borderBottom: "1px solid #1e1e1e",
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(232,61,138,0.1), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
          <p
            className="text-[11px] uppercase tracking-[5px] mb-3 font-semibold"
            style={{ color: "#E83D8A", textShadow: "0 0 10px rgba(232,61,138,0.4)" }}
          >
            Browse
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide">
            All Products
          </h1>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <MdSearch
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #1e1e1e",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(232,61,138,0.4)")}
              onBlur={e => (e.target.style.borderColor = "#1e1e1e")}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-3 flex-wrap mb-4">
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200 cursor-pointer"
                  style={{
                    background: active ? "#E83D8A" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.5)",
                    border: active ? "1px solid #E83D8A" : "1px solid #1e1e1e",
                    boxShadow: active ? "0 0 20px rgba(232,61,138,0.35)" : "none",
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Jewelry subcategory chips */}
          {(activeCategory === "Jewelry" || activeCategory === "All") && (
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[3px] text-white/25 font-semibold">
                Jewelry includes:
              </p>
              <div className="flex gap-2 flex-wrap">
                {JEWELRY_SUBCATEGORIES.map(({ label, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}35`,
                      color: color,
                    }}
                  >
                    <Icon size={11} />
                    {label}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-white/25 flex items-center gap-1.5 mt-0.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#25D366" }}
                />
                Jewelry items are available by WhatsApp enquiry only
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #1e1e1e",
              }}
            >
              <MdSearch size={28} className="text-white/20" />
            </div>
            <p className="text-white/30 text-sm">
              No products found. Try a different category or search term.
            </p>
          </div>
        ) : (
          <>
            <p className="text-white/30 text-sm mb-8">
              Showing{" "}
              <span className="font-semibold" style={{ color: "#E83D8A" }}>
                {filtered.length}
              </span>{" "}
              product{filtered.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}