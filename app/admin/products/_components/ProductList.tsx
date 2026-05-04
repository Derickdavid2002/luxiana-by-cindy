"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { urlFor } from "../../../../lib/sanity"
import { Product } from "../../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MdAddBox,
  MdSearch,
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdCancel,
  MdStar,
  MdStarOutline,
  MdInventory2,
  MdFilterList,
} from "react-icons/md"

const fmt = (n: number | null | undefined) => {
  if (n == null || isNaN(Number(n))) return "₦0"
  return `₦${Number(n).toLocaleString()}`
}

const FILTERS = ["All", "In Stock", "Out of Stock", "Featured"]

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = products.filter(p => {
    const name = p.name?.toLowerCase() ?? ""
    const matchSearch = name.includes(search.toLowerCase())
    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "In Stock" && p.inStock) ||
      (activeFilter === "Out of Stock" && !p.inStock) ||
      (activeFilter === "Featured" && p.featured)
    return matchSearch && matchFilter
  })

  const handleToggle = async (id: string, field: "inStock" | "featured", current: boolean) => {
    setToggling(id + field)
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !current }),
      })
      setProducts(prev => prev.map(p => p._id === id ? { ...p, [field]: !current } : p))
    } catch {
      alert("Failed to update product")
    }
    setToggling(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setDeleting(id)
    setDeletingId(id)
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      setProducts(prev => prev.filter(p => p._id !== id))
    } catch {
      alert("Failed to delete product")
    }
    setDeleting(null)
    setDeletingId(null)
  }

  return (
    <div className="py-6 flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-1.5 font-semibold">
            Manage
          </p>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Products
          </h1>
          <p className="text-sm text-white/30 mt-0.5">
            {products.length} total products
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white text-xs font-bold tracking-wide border-none shadow-[0_0_20px_rgba(232,61,138,0.3)] flex items-center gap-1.5"
          >
            <MdAddBox size={15} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <MdSearch
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
          />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#E83D8A]/40 rounded-xl h-11"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <MdFilterList size={14} className="text-white/30 flex-shrink-0" />
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase transition-all cursor-pointer border ${
                activeFilter === f
                  ? "bg-[#E83D8A]/15 border-[#E83D8A]/35 text-[#E83D8A]"
                  : "bg-white/5 border-[#1e1e1e] text-white/40 hover:text-white/60 hover:border-white/15"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[11px] text-white/30 tracking-wide -mt-1">
        Showing{" "}
        <span className="text-[#E83D8A] font-bold">{filtered.length}</span>
        {" "}of {products.length} products
      </p>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[#1e1e1e] flex items-center justify-center">
            <MdInventory2 size={28} className="text-white/20" />
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm font-semibold">No products found</p>
            <p className="text-white/20 text-xs mt-1">Try adjusting your search or filter</p>
          </div>
          <Link href="/admin/products/new">
            <Button
              size="sm"
              variant="outline"
              className="border-[#E83D8A]/30 text-[#E83D8A] hover:bg-[#E83D8A]/10 text-xs"
            >
              <MdAddBox size={14} className="mr-1.5" />
              Add First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(product => (
            <div
              key={product._id}
              className={`bg-[#111111] border rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#E83D8A]/20 ${
                deletingId === product._id ? "opacity-50 scale-95" : "opacity-100 scale-100"
              } ${
                product.featured
                  ? "border-amber-500/15"
                  : "border-[#1e1e1e]"
              }`}
            >
              {/* Featured indicator */}
              {product.featured && (
                <div className="h-0.5 bg-gradient-to-r from-amber-500/60 via-amber-400/40 to-transparent" />
              )}

              {/* Top section */}
              <div className="flex gap-3 p-4">
                {/* Image */}
                <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 border border-[#1e1e1e] bg-white/5">
                  {product.image ? (
                    <Image
                      src={urlFor(product.image).width(144).height(144).url()}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MdInventory2 size={20} className="text-white/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white truncate leading-snug">
                      {product.name || "Untitled Product"}
                    </h3>
                    {product.featured && (
                      <MdStar size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-[11px] text-white/35 mt-0.5 mb-2">
                    {product.category}
                  </p>
                  <p className="text-base font-black text-[#E83D8A] leading-none">
                    {fmt(product.price)}
                  </p>
                </div>
              </div>

              {/* Toggle row */}
              <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleToggle(product._id, "inStock", product.inStock)}
                  disabled={toggling === product._id + "inStock"}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer disabled:opacity-50 border ${
                    product.inStock
                      ? "bg-green-500/10 border-green-500/25 text-green-400 hover:bg-green-500/15"
                      : "bg-white/5 border-[#1e1e1e] text-white/35 hover:border-white/20"
                  }`}
                >
                  {toggling === product._id + "inStock" ? (
                    <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  ) : product.inStock ? (
                    <MdCheckCircle size={13} />
                  ) : (
                    <MdCancel size={13} />
                  )}
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </button>

                <button
                  onClick={() => handleToggle(product._id, "featured", product.featured)}
                  disabled={toggling === product._id + "featured"}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wide transition-all cursor-pointer disabled:opacity-50 border ${
                    product.featured
                      ? "bg-amber-500/10 border-amber-500/25 text-amber-400 hover:bg-amber-500/15"
                      : "bg-white/5 border-[#1e1e1e] text-white/35 hover:border-white/20"
                  }`}
                >
                  {toggling === product._id + "featured" ? (
                    <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  ) : product.featured ? (
                    <MdStar size={13} />
                  ) : (
                    <MdStarOutline size={13} />
                  )}
                  {product.featured ? "Featured" : "Not Featured"}
                </button>
              </div>

              {/* Action buttons */}
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                <Link href={`/admin/products/${product._id}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#1e1e1e] bg-white/5 text-white/60 hover:text-white hover:border-[#E83D8A]/30 hover:bg-[#E83D8A]/5 text-xs font-bold tracking-wide flex items-center gap-1.5"
                  >
                    <MdEdit size={13} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product._id)}
                  disabled={deleting === product._id}
                  className="w-full border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-xs font-bold tracking-wide flex items-center gap-1.5 disabled:opacity-50"
                >
                  {deleting === product._id ? (
                    <span className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <MdDelete size={13} />
                  )}
                  {deleting === product._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}