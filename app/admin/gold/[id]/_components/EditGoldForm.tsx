"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { urlFor } from "../../../../../lib/sanity"
import { GoldItem } from "../../../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MdArrowBack,
  MdSave,
  MdDiamond,
  MdImage,
} from "react-icons/md"

export default function EditGoldForm({ item }: { item: GoldItem }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: item.name,
    description: item.description || "",
    order: String(item.order || 0),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/gold/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          order: Number(form.order),
        }),
      })
      if (!res.ok) throw new Error("Update failed")
      router.push("/admin/gold")
    } catch {
      alert("Failed to update gold item")
    }
    setLoading(false)
  }

  const hasChanges =
    form.name !== item.name ||
    form.description !== (item.description || "") ||
    form.order !== String(item.order || 0)

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
          <p className="text-[11px] uppercase tracking-[4px] text-[#c8942a] mb-1 font-semibold">
            Editing
          </p>
          <h1 className="text-xl font-bold text-white tracking-wide truncate leading-none">
            {item.name}
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

      {/* Current images */}
      {item.images?.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Current Images
          </label>
          <div className="grid grid-cols-3 gap-3">
            {item.images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#3a2808]">
                <Image
                  src={urlFor(img).width(300).height(300).url()}
                  alt={`${item.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
                {i === 0 && (
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#c8942a]/80 text-[#0a0600]">
                    MAIN
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/20">
            To change images, delete this item and create a new one
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Item Name *
          </label>
          <Input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#c8942a]/40 rounded-xl h-11"
          />
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
            className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#c8942a]/40 rounded-xl resize-none"
          />
          <p className="text-[11px] text-white/20 text-right">
            {form.description.length} characters
          </p>
        </div>

        {/* Display order */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Display Order
          </label>
          <Input
            type="number"
            value={form.order}
            onChange={e => setForm({ ...form, order: e.target.value })}
            min="0"
            className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#c8942a]/40 rounded-xl h-11"
          />
          <p className="text-[11px] text-white/20">
            Lower numbers appear first on the gold collection page
          </p>
        </div>

        {/* Unsaved changes */}
        {hasChanges && (
          <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-4">
            <p className="text-[11px] text-amber-400 font-bold uppercase tracking-widest mb-1">
              Unsaved changes
            </p>
            <p className="text-[12px] text-white/40 leading-relaxed">
              Click Save Changes to apply your updates.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading || !hasChanges}
            className="w-full h-12 bg-gradient-to-r from-[#c8942a] to-[#e8c060] hover:opacity-90 text-[#0a0600] font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(200,148,42,0.3)] disabled:opacity-40 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[#0a0600] border-t-transparent rounded-full animate-spin" />
                Saving...
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