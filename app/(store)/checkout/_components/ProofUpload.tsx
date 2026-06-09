"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  MdArrowBack,
  MdCloudUpload,
  MdImage,
  MdClose,
  MdCheckCircle,
  MdChangeCircle,
} from "react-icons/md"

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
  const [error, setError] = useState("")

  const handleFileChange = (f: File) => {
    // Validate on client side too
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(f.type)) {
      setError("Please upload a JPG or PNG image")
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File too large. Max 10MB")
      return
    }
    setError("")
    setFile(f)
    // Create preview URL
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload your proof of payment")
      return
    }
    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Upload failed")
      }

      // Build the proof URL from the asset
      const proofUrl = data.url || 
        `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${data._id
          .replace("image-", "")
          .replace(/-(?=[^-]*$)/, ".")}`

      onSubmit(data._id, proofUrl)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Failed to upload proof. Please try again.")
    }
    setUploading(false)
  }

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ background: "#111111", border: "1px solid #1e1e1e" }}
    >
      <h2 className="text-lg font-bold text-white mb-1 tracking-wide">
        Upload Payment Proof
      </h2>
      <p className="text-white/30 text-sm mb-6">
        Upload a screenshot of your transfer confirmation
      </p>

      {/* Upload area or preview */}
      {!preview ? (
        <label className="cursor-pointer block mb-6">
          <div
            className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 transition-all"
            style={{
              height: 220,
              border: "2px dashed #1e1e1e",
              background: "rgba(255,255,255,0.02)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(232,61,138,0.4)"
              e.currentTarget.style.background = "rgba(232,61,138,0.03)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#1e1e1e"
              e.currentTarget.style.background = "rgba(255,255,255,0.02)"
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #1e1e1e",
              }}
            >
              <MdImage size={26} className="text-white/20" />
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-semibold text-white/40">
                Tap to upload payment screenshot
              </p>
              <p className="text-[11px] text-white/20 mt-1">
                PNG, JPG supported · Max 10MB
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: "rgba(232,61,138,0.08)",
                border: "1px solid rgba(232,61,138,0.2)",
              }}
            >
              <MdCloudUpload size={14} className="text-[#E83D8A]" />
              <span className="text-xs font-semibold text-[#E83D8A]/70">
                Browse Files
              </span>
            </div>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={e => {
              const f = e.target.files?.[0]
              if (f) handleFileChange(f)
            }}
            className="hidden"
          />
        </label>
      ) : (
        <div className="mb-6">
          {/* Image preview — full visibility */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(34,197,94,0.3)",
              background: "#0a0a0a",
              minHeight: 280,
            }}
          >
            {/* The actual image — object-contain so full image is visible */}
            <img
              src={preview}
              alt="Payment proof"
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                display: "block",
                padding: "8px",
              }}
            />

            {/* Top overlay buttons */}
            <div
              className="absolute top-3 right-3 flex gap-2"
            >
              {/* Change image */}
              <label
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-semibold text-white/70 hover:text-white transition-colors"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <MdChangeCircle size={13} />
                Change
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={e => {
                    const f = e.target.files?.[0]
                    if (f) handleFileChange(f)
                  }}
                  className="hidden"
                />
              </label>

              {/* Remove image */}
              <button
                type="button"
                onClick={() => { setFile(null); setPreview(null) }}
                className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <MdClose size={14} className="text-white/70" />
              </button>
            </div>

            {/* Bottom ready badge */}
            <div
              className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              <MdCheckCircle size={12} className="text-green-400" />
              <span className="text-green-400 text-[11px] font-semibold">
                Ready to submit
              </span>
            </div>
          </div>

          {/* File info */}
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-white/25 text-[11px] truncate max-w-[70%]">
              {file?.name}
            </p>
            <p className="text-white/25 text-[11px]">
              {file ? `${(file.size / 1024 / 1024).toFixed(1)}MB` : ""}
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="rounded-xl px-4 py-3 mb-4"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <p className="text-red-400 text-[12px] font-semibold">{error}</p>
        </div>
      )}

      {/* Note */}
      <div
        className="flex items-start gap-2 p-3 rounded-xl mb-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid #1e1e1e",
        }}
      >
        <MdImage size={13} className="text-white/25 mt-0.5 flex-shrink-0" />
        <p className="text-white/30 text-[12px] leading-relaxed">
          Make sure your screenshot clearly shows the{" "}
          <strong className="text-white/50">transaction amount</strong>,{" "}
          <strong className="text-white/50">date</strong> and{" "}
          <strong className="text-white/50">confirmation</strong>.
        </p>
      </div>

      {/* Action buttons */}
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
            <>
              <MdCloudUpload size={16} />
              Submit Order
            </>
          )}
        </Button>
      </div>
    </div>
  )
}