"use client"

import { useState } from "react"
import { Product } from "../../../types"
import ProductCard from "../../../_components/ProductCard"

const CATEGORIES = ["All", "Skincare", "Kayamata", "Body Care", "Fragrance"]

export default function ShopClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = products.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="w-full min-h-screen bg-dark">

      {/* Header */}
      <div className="relative w-full overflow-hidden py-20 border-b border-dark-border bg-[#0a0a0a]">

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[radial-gradient(ellipse,rgba(232,61,138,0.1),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
          <p className="text-[11px] uppercase tracking-[5px] mb-3 text-pink-DEFAULT drop-shadow-[0_0_10px_rgba(232,61,138,0.4)]">
            Browse
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide">
            All Products
          </h1>

          {/* Search */}
          <div className="relative max-w-md mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-dark-border text-white text-sm placeholder-white/30 outline-none focus:border-pink/40 transition-colors"
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
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wide border transition-all duration-200
                    ${
                      active
                        ? "bg-pink-DEFAULT text-white border-pink-DEFAULT shadow-[0_0_20px_rgba(232,61,138,0.35)]"
                        : "text-white/50 border-dark-border hover:border-pink/30 hover:text-white/80"
                    }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-white/30">
              No products found. Try a different category or search term.
            </p>
          </div>
        ) : (
          <>
            <p className="text-white/30 text-sm mb-8">
              Showing{" "}
              <span className="text-pink-DEFAULT font-semibold">
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