"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MdArrowBack, MdCloudUpload, MdImage, MdClose, MdCheck } from "react-icons/md"

export default function ProofUpload({
  loading,
  onSubmit,
  onBack,
}: {
  loading: boolean
  onSubmit: (proofId: string, proofUrl: string) => void
  onBack: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (f: File) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async () => {
    if (!file) return alert("Please upload your proof of payment")
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Upload failed")
      const data = await res.json()
      const proofUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${data._id.replace("image-", "").replace(/-(\w+)$/, ".$1")}`
      onSubmit(data._id, proofUrl)
    } catch (err) {
      console.error(err)
      alert("Failed to upload proof. Please try again.")
    }
    setUploading(false)
  }

  return (
    <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6 md:p-8">
      <h2 className="text-lg font-bold text-white mb-1 tracking-wide">
        Upload Payment Proof
      </h2>
      <p className="text-white/30 text-sm mb-6">
        Upload a screenshot of your transfer confirmation
      </p>

      {/* Upload area */}
      {!preview ? (
        <label className="cursor-pointer block mb-6">
          <div className="w-full h-52 rounded-2xl border-2 border-dashed border-[#1e1e1e] bg-white/3 flex flex-col items-center justify-center gap-3 hover:border-[#E83D8A]/40 hover:bg-white/5 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-[#1e1e1e] flex items-center justify-center">
              <MdImage size={26} className="text-white/20" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white/40">
                Tap to upload payment screenshot
              </p>
              <p className="text-[11px] text-white/20 mt-1">
                PNG, JPG supported
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-[#1e1e1e]">
              <MdCloudUpload size={14} className="text-[#E83D8A]" />
              <span className="text-xs font-semibold text-white/40">
                Browse Files
              </span>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) handleFileChange(f)
            }}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative mb-6 rounded-2xl overflow-hidden border border-[#E83D8A]/30 group">
          <img
            src={preview}
            alt="Payment proof"
            className="w-full h-52 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold">
              <MdCloudUpload size={16} />
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) handleFileChange(f)
                }}
                className="hidden"
              />
            </label>
          </div>
          <button
            onClick={() => { setFile(null); setPreview(null) }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white cursor-pointer border border-white/20"
          >
            <MdClose size={14} />
          </button>
          {/* Success indicator */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1.5 rounded-full">
            <MdCheck size={12} className="text-green-400" />
            <span className="text-green-400 text-[11px] font-semibold">
              Ready to upload
            </span>
          </div>
        </div>
      )}

      {/* Note */}
      <div className="bg-white/3 border border-[#1e1e1e] rounded-xl p-4 mb-6">
        <p className="text-white/30 text-[12px] leading-relaxed">
          📋 Make sure your screenshot clearly shows the <strong className="text-white/50">transaction amount</strong>, <strong className="text-white/50">date</strong> and <strong className="text-white/50">confirmation</strong>.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          disabled={loading || uploading}
          className="flex-1 border-[#1e1e1e] bg-transparent text-white/40 hover:text-white hover:border-white/20 h-12 flex items-center gap-2"
        >
          <MdArrowBack size={16} />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!file || loading || uploading}
          className="flex-1 h-12 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-wide text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.35)] disabled:opacity-40 flex items-center gap-2"
        >
          {loading || uploading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {uploading ? "Uploading..." : "Placing Order..."}
            </>
          ) : (
            "Submit Order"
          )}
        </Button>
      </div>
    </div>
  )
}