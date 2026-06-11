"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  MdCloudUpload,
  MdCheckCircle,
  MdCancel,
  MdStar,
  MdStarOutline,
  MdArrowBack,
  MdAddBox,
  MdImage,
} from "react-icons/md"

const CATEGORIES = ["Skincare", "Gold", "Diamonds", "Watches"] as const
type Category = (typeof CATEGORIES)[number]
const fmt = (n: string) => {
  const num = Number(n)
  if (!n || isNaN(num)) return ""
  return `₦${num.toLocaleString()}`
}

export default function ProductForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [form, setForm] = useState({
    name: "",
    category: "Skincare",
    price: "",
    description: "",
    inStock: true,
    featured: false,
  })

  const handleImageChange = (file: File) => {
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) handleImageChange(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return alert("Please select a product image")
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", imageFile)
      const imageRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      if (!imageRes.ok) throw new Error("Image upload failed")
      const imageData = await imageRes.json()
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          slug: { _type: "slug", current: slug },
          image: {
            _type: "image",
            asset: { _type: "reference", _ref: imageData._id },
          },
        }),
      })
      if (!res.ok) throw new Error("Product creation failed")
      router.push("/admin/products")
    } catch (err) {
      console.error(err)
      alert("Failed to create product. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

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
        <div>
          <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-1 font-semibold">
            New
          </p>
          <h1 className="text-2xl font-bold text-white tracking-wide leading-none">
            Add Product
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Product Image *
          </label>
          <label
            className={`cursor-pointer block transition-all duration-200 ${dragOver ? "scale-[1.01]" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[#E83D8A]/30 group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <MdCloudUpload size={28} className="text-white" />
                  <span className="text-white text-xs font-semibold tracking-wide">
                    Click to change image
                  </span>
                </div>
              </div>
            ) : (
              <div className={`w-full h-52 rounded-2xl border-2 border-dashed bg-white/3 flex flex-col items-center justify-center gap-3 transition-all duration-200 ${
                dragOver
                  ? "border-[#E83D8A]/60 bg-[#E83D8A]/5"
                  : "border-[#1e1e1e] hover:border-[#E83D8A]/30 hover:bg-white/5"
              }`}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-[#1e1e1e] flex items-center justify-center">
                  <MdImage size={22} className="text-white/25" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white/40">
                    Drop image here or click to upload
                  </p>
                  <p className="text-[11px] text-white/20 mt-1">
                    PNG, JPG, WEBP supported
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-[#1e1e1e]">
                  <MdCloudUpload size={14} className="text-[#E83D8A]" />
                  <span className="text-xs font-semibold text-white/50 tracking-wide">
                    Browse Files
                  </span>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) handleImageChange(file)
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Product Name *
          </label>
          <Input
            type="text"
            placeholder="e.g. Rose Glow Serum"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#E83D8A]/40 rounded-xl h-11"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Category *
          </label>
          <Select
            value={form.category}
            onValueChange={val => setForm({ ...form, category: val })}
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
            placeholder="e.g. 12500"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            required
            min="0"
            className="bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#E83D8A]/40 rounded-xl h-11"
          />
          {form.price && (
            <p className="text-[11px] text-[#E83D8A] font-bold tracking-wide">
              Preview: {fmt(form.price)}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Description
          </label>
          <Textarea
            placeholder="Describe the product — ingredients, benefits, how to use..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#E83D8A]/40 rounded-xl resize-none"
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
                ? <MdCheckCircle size={15} />
                : <MdCancel size={15} />
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
                ? <MdStar size={15} />
                : <MdStarOutline size={15} />
              }
              {form.featured ? "Featured" : "Not Featured"}
            </button>
          </div>
          <p className="text-[11px] text-white/20">
            Featured products appear on the homepage
          </p>
        </div>

        {/* Summary card */}
        {form.name && (
          <div className="bg-[#E83D8A]/5 border border-[#E83D8A]/20 rounded-2xl p-4 flex flex-col gap-1.5">
            <p className="text-[11px] text-[#E83D8A] font-bold uppercase tracking-widest mb-1">
              Product Summary
            </p>
            <p className="text-sm font-semibold text-white">{form.name}</p>
            <p className="text-[12px] text-white/40">{form.category}</p>
            {form.price && (
              <p className="text-base font-black text-[#E83D8A]">
                {fmt(form.price)}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.4)] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Product...
              </>
            ) : (
              <>
                <MdAddBox size={18} />
                Create Product
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