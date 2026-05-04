"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MdArrowBack,
  MdAdd,
  MdCloudUpload,
  MdImage,
  MdDiamond,
  MdClose,
} from "react-icons/md"

export default function GoldForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [form, setForm] = useState({
    name: "",
    description: "",
    order: "",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    const newFiles = [...imageFiles, ...files].slice(0, 5)
    setImageFiles(newFiles)
    const previews = newFiles.map(f => URL.createObjectURL(f))
    setImagePreviews(previews)
  }

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (imageFiles.length === 0) return alert("Please add at least one image")
    setLoading(true)

    try {
      // Upload all images
      const uploadedImages = await Promise.all(
        imageFiles.map(async file => {
          const formData = new FormData()
          formData.append("file", file)
          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          })
          if (!res.ok) throw new Error("Image upload failed")
          const data = await res.json()
          return {
            _type: "image",
            _key: Math.random().toString(36).slice(2),
            asset: { _type: "reference", _ref: data._id },
          }
        })
      )

      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const res = await fetch("/api/admin/gold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          order: form.order ? Number(form.order) : 0,
          slug: { _type: "slug", current: slug },
          images: uploadedImages,
        }),
      })

      if (!res.ok) throw new Error("Failed to create gold item")
      router.push("/admin/gold")
    } catch (err) {
      console.error(err)
      alert("Failed to create gold item")
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
          <p className="text-[11px] uppercase tracking-[4px] text-[#c8942a] mb-1 font-semibold">
            New
          </p>
          <h1 className="text-2xl font-bold text-white tracking-wide leading-none">
            Add Gold Item
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Images upload */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Images * (up to 5)
          </label>

          {/* Image previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-2">
              {imagePreviews.map((preview, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#3a2808] group">
                  <img
                    src={preview}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <MdClose size={12} className="text-white" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#c8942a]/80 text-[#0a0600]">
                      MAIN
                    </span>
                  )}
                </div>
              ))}

              {/* Add more button */}
              {imagePreviews.length < 5 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-[#3a2808] bg-[#c8942a]/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#c8942a]/40 transition-colors">
                  <MdAdd size={20} className="text-[#c8942a]/40" />
                  <span className="text-[10px] text-[#c8942a]/40 font-semibold">Add more</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          {/* Upload area */}
          {imagePreviews.length === 0 && (
            <label className="cursor-pointer">
              <div className="w-full h-48 rounded-2xl border-2 border-dashed border-[#3a2808] bg-[#c8942a]/3 flex flex-col items-center justify-center gap-3 hover:border-[#c8942a]/40 hover:bg-[#c8942a]/5 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#c8942a]/10 border border-[#3a2808] flex items-center justify-center">
                  <MdImage size={22} className="text-[#c8942a]/40" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white/30">
                    Upload gold item photos
                  </p>
                  <p className="text-[11px] text-white/15 mt-1">
                    Select up to 5 images
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c8942a]/8 border border-[#3a2808]">
                  <MdCloudUpload size={14} className="text-[#c8942a]" />
                  <span className="text-xs font-semibold text-[#c8942a]/60 tracking-wide">
                    Browse Files
                  </span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Item Name *
          </label>
          <Input
            type="text"
            placeholder="e.g. 24K Gold Facial Set"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#c8942a]/40 rounded-xl h-11"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Description
          </label>
          <Textarea
            placeholder="Describe this gold collection item..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#c8942a]/40 rounded-xl resize-none"
          />
        </div>

        {/* Display order */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Display Order
          </label>
          <Input
            type="number"
            placeholder="e.g. 1 (lower = appears first)"
            value={form.order}
            onChange={e => setForm({ ...form, order: e.target.value })}
            min="0"
            className="bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#c8942a]/40 rounded-xl h-11"
          />
          <p className="text-[11px] text-white/20">
            Lower numbers appear first on the gold collection page
          </p>
        </div>

        {/* Summary */}
        {form.name && (
          <div className="bg-[#c8942a]/5 border border-[#c8942a]/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MdDiamond size={13} className="text-[#c8942a]" />
              <p className="text-[11px] text-[#c8942a] font-bold uppercase tracking-widest">
                Item Summary
              </p>
            </div>
            <p className="text-sm font-semibold text-[#f0d080]">{form.name}</p>
            <p className="text-[12px] text-[#6a4c18] mt-1">
              {imagePreviews.length} image{imagePreviews.length !== 1 ? "s" : ""} selected
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-[#c8942a] to-[#e8c060] hover:opacity-90 text-[#0a0600] font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(200,148,42,0.3)] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[#0a0600] border-t-transparent rounded-full animate-spin" />
                Creating Item...
              </>
            ) : (
              <>
                <MdDiamond size={16} />
                Create Gold Item
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