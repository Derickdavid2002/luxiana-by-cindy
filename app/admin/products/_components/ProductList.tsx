"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity"
import { Product } from "../../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ConfirmModal from "../../_components/ConfirmModal"
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdCheckCircle,
  MdCancel,
  MdStar,
  MdInventory2,
} from "react-icons/md"

const CATEGORIES = ["All", "Skincare", "Gold", "Diamonds", "Watches"]
const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function ProductList({
  initialProducts,
}: {
  initialProducts: Product[]
}) {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean
    productId: string
    productName: string
  }>({ open: false, productId: "", productName: "" })

  const filtered = products.filter(p => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === "All" || p.category === category
    return matchSearch && matchCat
  })

  const openDeleteModal = (id: string, name: string) => {
    setConfirmModal({ open: true, productId: id, productName: name })
  }

  const handleDelete = async () => {
    const { productId } = confirmModal
    setDeleting(productId)
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Delete failed")
      // Remove from local state immediately
      setProducts(prev => prev.filter(p => p._id !== productId))
      setConfirmModal({ open: false, productId: "", productName: "" })
      // Refresh server data
      router.refresh()
    } catch {
      setConfirmModal({ open: false, productId: "", productName: "" })
    }
    setDeleting(null)
  }

  const handleToggle = async (
    id: string,
    field: "inStock" | "featured",
    value: boolean
  ) => {
    // Optimistic update
    setProducts(prev =>
      prev.map(p => (p._id === id ? { ...p, [field]: value } : p))
    )
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      })
      router.refresh()
    } catch {
      // Revert on error
      setProducts(prev =>
        prev.map(p => (p._id === id ? { ...p, [field]: !value } : p))
      )
    }
  }

  return (
    <div className="py-4 flex flex-col gap-4">

      {/* Confirm delete modal */}
      <ConfirmModal
        isOpen={confirmModal.open}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmModal.productName}"? This action cannot be undone and will remove it from the store immediately.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Keep It"
        variant="danger"
        loading={deleting === confirmModal.productId}
        onConfirm={handleDelete}
        onCancel={() =>
          setConfirmModal({ open: false, productId: "", productName: "" })
        }
      />

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
            <MdAdd size={15} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
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

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer border"
            style={{
              background:
                category === cat
                  ? "rgba(232,61,138,0.15)"
                  : "rgba(255,255,255,0.05)",
              borderColor:
                category === cat
                  ? "rgba(232,61,138,0.35)"
                  : "#1e1e1e",
              color:
                category === cat
                  ? "#E83D8A"
                  : "rgba(255,255,255,0.4)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[11px] text-white/30 -mt-1">
        Showing{" "}
        <span className="text-[#E83D8A] font-bold">{filtered.length}</span>
        {" "}of {products.length} products
      </p>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #1e1e1e",
            }}
          >
            <MdInventory2 size={28} className="text-white/20" />
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm font-semibold">
              No products found
            </p>
            <p className="text-white/20 text-xs mt-1">
              Try a different search or category
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(product => (
            <div
              key={product._id}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: "#111111",
                border: "1px solid #1e1e1e",
              }}
            >
              <div className="flex gap-3 p-4">
                {/* Image */}
                <div
                  className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0"
                  style={{ border: "1px solid #1e1e1e", background: "#1a1a1a" }}
                >
                  {product.image ? (
                    <Image
                      src={urlFor(product.image).width(144).height(144).url()}
                      alt={product.name}
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
                    <div className="min-w-0">
                      <p className="text-white text-[13px] font-bold truncate">
                        {product.name}
                      </p>
                      <p className="text-white/30 text-[11px] mt-0.5">
                        {product.category}
                      </p>
                      <p
                        className="text-[14px] font-black mt-1"
                        style={{ color: "#E83D8A" }}
                      >
                        {fmt(product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <button
                      onClick={() =>
                        handleToggle(product._id, "inStock", !product.inStock)
                      }
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer border"
                      style={{
                        background: product.inStock
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(239,68,68,0.1)",
                        borderColor: product.inStock
                          ? "rgba(34,197,94,0.25)"
                          : "rgba(239,68,68,0.25)",
                        color: product.inStock ? "#22c55e" : "#ef4444",
                      }}
                    >
                      {product.inStock ? (
                        <MdCheckCircle size={11} />
                      ) : (
                        <MdCancel size={11} />
                      )}
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </button>

                    <button
                      onClick={() =>
                        handleToggle(product._id, "featured", !product.featured)
                      }
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer border"
                      style={{
                        background: product.featured
                          ? "rgba(245,158,11,0.1)"
                          : "rgba(255,255,255,0.05)",
                        borderColor: product.featured
                          ? "rgba(245,158,11,0.25)"
                          : "#1e1e1e",
                        color: product.featured
                          ? "#f59e0b"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      <MdStar size={11} />
                      {product.featured ? "Featured" : "Not Featured"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div
                className="px-4 pb-4 grid grid-cols-2 gap-2"
              >
                <Link href={`/admin/products/${product._id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#1e1e1e] bg-white/3 text-white/50 hover:text-white hover:border-white/20 text-xs font-bold flex items-center gap-1.5"
                  >
                    <MdEdit size={13} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDeleteModal(product._id, product.name)}
                  className="w-full border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-xs font-bold flex items-center gap-1.5"
                >
                  <MdDelete size={13} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}