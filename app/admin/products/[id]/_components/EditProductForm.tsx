"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { urlFor } from "../../../../../lib/sanity"
import { Product } from "../../../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MdArrowBack,
  MdSave,
  MdCheckCircle,
  MdCancel,
  MdStar,
  MdStarOutline,
  MdImage,
} from "react-icons/md"

const CATEGORIES = ["Skincare", "Jewelry", "Ladies Care"] as const
type Category = (typeof CATEGORIES)[number]

const fmt = (n: number) => `₦${n.toLocaleString()}`

type FormState = {
  name: string
  category: Category
  price: string
  description: string
  inStock: boolean
  featured: boolean
}

export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: product.name,
    category: product.category as Category,
    price: String(product.price),
    description: product.description || "",
    inStock: product.inStock,
    featured: product.featured,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
        }),
      })
      if (!res.ok) throw new Error("Update failed")
      router.push("/admin/products")
    } catch {
      alert("Failed to update product")
    }
    setLoading(false)
  }

  const hasChanges =
    form.name !== product.name ||
    form.category !== product.category ||
    form.price !== String(product.price) ||
    form.description !== (product.description || "") ||
    form.inStock !== product.inStock ||
    form.featured !== product.featured

  return (
    <div className="py-6 flex flex-col gap-6 max-w-2xl">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="w-9 h-9 text-white/40 hover:text-white hover:bg-white/5 rounded-xl"
        >
          <MdArrowBack size={18} />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-1 font-semibold">
            Editing
          </p>
          <h1 className="text-xl font-bold text-white tracking-wide truncate leading-none">
            {product.name}
          </h1>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[11px] font-semibold text-amber-400">
              Unsaved
            </span>
          </div>
        )}
      </div>

      {/* Current image */}
      {product.image && (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#1e1e1e] group">
          <Image
            src={urlFor(product.image).width(600).height(400).url()}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <MdImage size={13} className="text-white/50" />
            <span className="text-[11px] text-white/50 font-semibold tracking-wide">
              Current Image
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Product Name *
          </label>
          <Input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#E83D8A]/40 rounded-xl h-11"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Category *
          </label>
          <Select
            value={form.category}
            onValueChange={val => setForm({ ...form, category: val as Category })}
          >
            <SelectTrigger className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#E83D8A]/40 rounded-xl h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#1e1e1e] text-white">
              {CATEGORIES.map(cat => (
                <SelectItem
                  key={cat}
                  value={cat}
                  className="text-white/70 hover:text-white focus:bg-[#E83D8A]/10 focus:text-[#E83D8A]"
                >
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Price (₦) *
          </label>
          <Input
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            required
            min="0"
            className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#E83D8A]/40 rounded-xl h-11"
          />
          {form.price && (
            <p className="text-[11px] text-[#E83D8A] font-bold tracking-wide">
              Preview: {fmt(Number(form.price))}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Description
          </label>
          <Textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#E83D8A]/40 rounded-xl resize-none"
          />
          <p className="text-[11px] text-white/20 text-right">
            {form.description.length} characters
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Product Status
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, inStock: !form.inStock })}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer border ${
                form.inStock
                  ? "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/15"
                  : "bg-white/5 border-[#1e1e1e] text-white/40 hover:border-white/20"
              }`}
            >
              {form.inStock
                ? <MdCheckCircle size={14} />
                : <MdCancel size={14} />
              }
              {form.inStock ? "In Stock" : "Out of Stock"}
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, featured: !form.featured })}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer border ${
                form.featured
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/15"
                  : "bg-white/5 border-[#1e1e1e] text-white/40 hover:border-white/20"
              }`}
            >
              {form.featured
                ? <MdStar size={14} />
                : <MdStarOutline size={14} />
              }
              {form.featured ? "Featured" : "Not Featured"}
            </button>
          </div>
        </div>

        {/* Changes summary */}
        {hasChanges && (
          <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4">
            <p className="text-[11px] text-amber-400 font-bold uppercase tracking-widest mb-2">
              You have unsaved changes
            </p>
            <p className="text-[12px] text-white/40 leading-relaxed">
              Click Save Changes to apply your updates to the store.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading || !hasChanges}
            className="w-full h-12 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.35)] disabled:opacity-40 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <MdSave size={18} />
                Save Changes
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="w-full border-[#1e1e1e] bg-transparent text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 text-sm"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}