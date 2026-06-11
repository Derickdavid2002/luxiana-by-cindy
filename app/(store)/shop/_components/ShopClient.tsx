"use client"

import { useState } from "react"
import { Product } from "../../../types"
import ProductCard from "../../../_components/ProductCard"
import { MdSearch } from "react-icons/md"

const CATEGORIES = ["All", "Skincare", "Gold", "Diamonds", "Watches"]

export default function ShopClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = products.filter(p => {
    const matchCat =
      activeCategory === "All" || p.category === activeCategory
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase())
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
            background:
              "radial-gradient(ellipse, rgba(232,61,138,0.1), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
          <p
            className="text-[11px] uppercase tracking-[5px] mb-3 font-semibold"
            style={{
              color: "#E83D8A",
              textShadow: "0 0 10px rgba(232,61,138,0.4)",
            }}
          >
            Browse
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide">
            All Products
          </h1>

          {/* Search */}
          <div className="relative max-w-md mb-8">
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
                color: "#f0f0f0",
              }}
              onFocus={e =>
                (e.target.style.borderColor = "rgba(232,61,138,0.4)")
              }
              onBlur={e => (e.target.style.borderColor = "#1e1e1e")}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-3 flex-wrap">
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-200 cursor-pointer"
                  style={{
                    background: active
                      ? "#E83D8A"
                      : "transparent",
                    color: active
                      ? "#fff"
                      : "rgba(255,255,255,0.5)",
                    border: active
                      ? "1px solid #E83D8A"
                      : "1px solid #1e1e1e",
                    boxShadow: active
                      ? "0 0 20px rgba(232,61,138,0.35)"
                      : "none",
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Enquiry note — shows when Gold or Diamonds selected */}
          {(activeCategory === "Gold" || activeCategory === "Diamonds") && (
            <div
              className="mt-5 flex items-center gap-2 px-4 py-3 rounded-xl max-w-md"
              style={{
                background: "rgba(37,211,102,0.06)",
                border: "1px solid rgba(37,211,102,0.15)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#25D366" }}
              />
              <p className="text-[12px] text-white/40">
                {activeCategory} items are available by{" "}
                <span className="text-green-400 font-semibold">
                  WhatsApp enquiry only
                </span>
                . Click any item to enquire.
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
              <span
                className="font-semibold"
                style={{ color: "#E83D8A" }}
              >
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