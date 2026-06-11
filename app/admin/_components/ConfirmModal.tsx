"use client"

import { Button } from "@/components/ui/button"
import { MdWarning, MdClose } from "react-icons/md"

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "danger" | "warning" | "info"
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null

  const colors = {
    danger: {
      icon: "rgba(239,68,68,0.1)",
      iconBorder: "rgba(239,68,68,0.2)",
      iconColor: "text-red-400",
      btn: "linear-gradient(135deg, #ef4444, #dc2626)",
      btnShadow: "0 0 20px rgba(239,68,68,0.3)",
    },
    warning: {
      icon: "rgba(245,158,11,0.1)",
      iconBorder: "rgba(245,158,11,0.2)",
      iconColor: "text-amber-400",
      btn: "linear-gradient(135deg, #f59e0b, #d97706)",
      btnShadow: "0 0 20px rgba(245,158,11,0.3)",
    },
    info: {
      icon: "rgba(232,61,138,0.1)",
      iconBorder: "rgba(232,61,138,0.2)",
      iconColor: "text-[#E83D8A]",
      btn: "linear-gradient(135deg, #E83D8A, #c0256e)",
      btnShadow: "0 0 20px rgba(232,61,138,0.3)",
    },
  }

  const c = colors[variant]

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: c.icon, border: `1px solid ${c.iconBorder}` }}
            >
              <MdWarning size={18} className={c.iconColor} />
            </div>
            <h3 className="text-white font-bold text-[15px] leading-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-white/30 hover:text-white transition-colors cursor-pointer flex-shrink-0"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="text-white/50 text-[13px] leading-relaxed pl-[52px]">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button
            onClick={onCancel}
            disabled={loading}
            variant="outline"
            className="flex-1 border-[#1e1e1e] bg-transparent text-white/40 hover:text-white hover:border-white/20 h-11"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 h-11 font-bold text-sm border-none disabled:opacity-50 flex items-center justify-center gap-2 text-white"
            style={{
              background: c.btn,
              boxShadow: c.btnShadow,
            }}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Please wait...
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}