"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../../../../lib/sanity"
import { GoldItem } from "../../../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ConfirmModal from "../../_components/ConfirmModal"

import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdDiamond,
  MdImage,
} from "react-icons/md"

export default function GoldList({ initialItems }: { initialItems: GoldItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = items.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  )

  const [confirmModal, setConfirmModal] = useState<{
  open: boolean
  itemId: string
  itemName: string
}>({ open: false, itemId: "", itemName: "" })

 const handleDelete = async () => {
  const { itemId } = confirmModal
  setDeleting(itemId)
  try {
    await fetch(`/api/admin/gold/${itemId}`, { method: "DELETE" })
    setItems(prev => prev.filter(i => i._id !== itemId))
    setConfirmModal({ open: false, itemId: "", itemName: "" })
  } catch {
    setConfirmModal({ open: false, itemId: "", itemName: "" })
  }
  setDeleting(null)
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
            Gold Collection
          </h1>
          <p className="text-sm text-white/30 mt-0.5">
            {items.length} total items
          </p>
        </div>
        <Link href="/admin/gold/new">
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#c8942a] to-[#e8c060] hover:opacity-90 text-[#0a0600] text-xs font-bold tracking-wide border-none shadow-[0_0_20px_rgba(200,148,42,0.3)] flex items-center gap-1.5"
          >
            <MdAdd size={15} />
            Add Item
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
          placeholder="Search gold items..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#c8942a]/40 rounded-xl h-11"
        />
      </div>

      {/* Count */}
      <p className="text-[11px] text-white/30 tracking-wide -mt-1">
        Showing{" "}
        <span className="text-[#c8942a] font-bold">{filtered.length}</span>
        {" "}of {items.length} items
      </p>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#c8942a]/10 border border-[#c8942a]/20 flex items-center justify-center">
            <MdDiamond size={28} className="text-[#c8942a]/50" />
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm font-semibold">
              No gold items found
            </p>
            <p className="text-white/20 text-xs mt-1">
              Add your first gold collection item
            </p>
          </div>
          <Link href="/admin/gold/new">
            <Button
              size="sm"
              variant="outline"
              className="border-[#c8942a]/30 text-[#c8942a] hover:bg-[#c8942a]/10 text-xs"
            >
              <MdAdd size={14} className="mr-1.5" />
              Add First Item
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(item => (
            <div
              key={item._id}
              className="bg-[#111111] border border-[#3a2808] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#c8942a]/30"
            >
              {/* Gold top border */}
              <div className="h-0.5 bg-gradient-to-r from-[#c8942a]/60 via-[#e8c060]/40 to-transparent" />

              <div className="flex gap-3 p-4">
                {/* Image */}
                <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 border border-[#3a2808] bg-[#1a1005]">
                  {item.images?.[0] ? (
                    <Image
                      src={urlFor(item.images[0]).width(144).height(144).url()}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MdImage size={20} className="text-[#c8942a]/30" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MdDiamond size={12} className="text-[#c8942a] flex-shrink-0" />
                    <h3 className="text-sm font-bold text-[#f0d080] truncate">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[12px] text-[#6a4c18] leading-relaxed line-clamp-2">
                    {item.description || "No description"}
                  </p>
                  {item.images?.length > 1 && (
                    <p className="text-[10px] text-[#c8942a]/50 mt-1.5 font-semibold">
                      {item.images.length} photos
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                <Link href={`/admin/gold/${item._id}`} className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#3a2808] bg-[#c8942a]/5 text-[#c8942a]/70 hover:text-[#c8942a] hover:border-[#c8942a]/40 hover:bg-[#c8942a]/10 text-xs font-bold tracking-wide flex items-center gap-1.5"
                  >
                    <MdEdit size={13} />
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                 onClick={() => setConfirmModal({ open: true, itemId: item._id, itemName: item.name })}
                  disabled={deleting === item._id}
                  className="w-full border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 text-xs font-bold tracking-wide flex items-center gap-1.5 disabled:opacity-50"
                >
                  {deleting === item._id ? (
                    <span className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <MdDelete size={13} />
                  )}
                  {deleting === item._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}


      <ConfirmModal
  isOpen={confirmModal.open}
  title="Delete Gold Item"
  message={`Are you sure you want to delete "${confirmModal.itemName}"? This cannot be undone.`}
  confirmLabel="Yes, Delete"
  cancelLabel="Keep It"
  variant="danger"
  loading={deleting === confirmModal.itemId}
  onConfirm={handleDelete}
  onCancel={() => setConfirmModal({ open: false, itemId: "", itemName: "" })}
/>
    </div>
  )
}