"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import {
  MdArrowBack,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCheckCircle,
  MdLocalShipping,
  MdInventory,
  MdDoneAll,
  MdPending,
  MdCancel,
  MdZoomIn,
  MdClose,
  MdWarning,
} from "react-icons/md"

const STATUS_FLOW = [
  { value: "pending", label: "Pending", icon: MdPending },
  { value: "confirmed", label: "Confirmed", icon: MdCheckCircle },
  { value: "processing", label: "Processing", icon: MdInventory },
  { value: "shipped", label: "Shipped", icon: MdLocalShipping },
  { value: "delivered", label: "Delivered", icon: MdDoneAll },
]

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  confirmed: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  processing: "text-purple-400 bg-purple-500/10 border-purple-500/25",
  shipped: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
  delivered: "text-green-400 bg-green-500/10 border-green-500/25",
  cancelled: "text-red-400 bg-red-500/10 border-red-500/25",
  rejected: "text-orange-400 bg-orange-500/10 border-orange-500/25",
}

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function OrderDetail({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(order.status)
  const [updating, setUpdating] = useState(false)
  const [proofZoomed, setProofZoomed] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [rejecting, setRejecting] = useState(false)

  const currentIndex = STATUS_FLOW.findIndex(s => s.value === status)
  const nextStatus = STATUS_FLOW[currentIndex + 1]

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—"

  const handleStatusUpdate = async (newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Update failed")
      setStatus(newStatus)
    } catch {
      alert("Failed to update status")
    }
    setUpdating(false)
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection")
      return
    }
    setRejecting(true)
    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "rejected",
          reason: rejectReason.trim(),
        }),
      })
      if (!res.ok) throw new Error("Failed to reject")
      setStatus("rejected")
      setShowRejectModal(false)
      setRejectReason("")
    } catch {
      alert("Failed to reject payment")
    }
    setRejecting(false)
  }

  return (
    <div className="py-4 flex flex-col gap-4 w-full">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="w-9 h-9 text-white/40 hover:text-white hover:bg-white/5 rounded-xl flex-shrink-0"
        >
          <MdArrowBack size={18} />
        </Button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[3px] text-[#E83D8A] mb-0.5 font-semibold">
            Order Details
          </p>
          <h1 className="text-base font-bold text-white leading-none truncate">
            #{order.orderNumber}
          </h1>
          <p className="text-white/25 text-[10px] mt-0.5">{date}</p>
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border flex-shrink-0 ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}
        >
          {STATUS_FLOW.find(s => s.value === status)?.label ?? status}
        </span>
      </div>

      {/* Progress */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold mb-4">
          Order Progress
        </p>

        {status === "rejected" ? (
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MdWarning size={16} className="text-orange-400" />
              <p className="text-orange-400 text-sm font-bold">
                Payment Rejected
              </p>
            </div>
            <p className="text-white/50 text-[12px] leading-relaxed">
              {order.rejectionReason || "Payment could not be verified"}
            </p>
            <p className="text-white/30 text-[11px] mt-2">
              Customer has been notified via email.
            </p>
          </div>
        ) : (
          <>
            {/* Progress steps */}
            <div className="flex items-start justify-between mb-5 overflow-x-auto pb-1">
              {STATUS_FLOW.map((s, i) => {
                const isDone = i <= currentIndex
                const isActive = i === currentIndex
                const Icon = s.icon
                return (
                  <div
                    key={s.value}
                    className="flex flex-col items-center gap-1.5 flex-1 min-w-0"
                  >
                    <div className="flex items-center w-full">
                      {i > 0 && (
                        <div
                          className="flex-1 h-0.5"
                          style={{
                            background:
                              i <= currentIndex ? "#E83D8A" : "#1e1e1e",
                          }}
                        />
                      )}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          background: isActive
                            ? "#E83D8A"
                            : isDone
                            ? "#22c55e"
                            : "#1e1e1e",
                          boxShadow: isActive
                            ? "0 0 14px rgba(232,61,138,0.5)"
                            : "none",
                          border: isDone || isActive
                            ? "none"
                            : "1px solid #333",
                        }}
                      >
                        <Icon
                          size={14}
                          style={{
                            color:
                              isDone || isActive
                                ? "#fff"
                                : "rgba(255,255,255,0.2)",
                          }}
                        />
                      </div>
                      {i < STATUS_FLOW.length - 1 && (
                        <div
                          className="flex-1 h-0.5"
                          style={{
                            background:
                              i < currentIndex ? "#E83D8A" : "#1e1e1e",
                          }}
                        />
                      )}
                    </div>
                    <p
                      className="text-[9px] font-semibold text-center leading-tight px-0.5"
                      style={{
                        color: isActive
                          ? "#E83D8A"
                          : isDone
                          ? "#22c55e"
                          : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Next action */}
            {nextStatus && !["cancelled", "rejected"].includes(status) && (
              <Button
                onClick={() => handleStatusUpdate(nextStatus.value)}
                disabled={updating}
                className="w-full h-11 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold text-sm border-none shadow-[0_0_20px_rgba(232,61,138,0.3)] disabled:opacity-50 flex items-center gap-2 mb-2"
              >
                {updating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <nextStatus.icon size={16} />
                    Mark as {nextStatus.label}
                  </>
                )}
              </Button>
            )}

            {status === "delivered" && (
              <div
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <p className="text-green-400 text-sm font-semibold flex items-center justify-center gap-2">
                  <MdDoneAll size={16} />
                  Order completed successfully!
                </p>
              </div>
            )}
          </>
        )}

        {/* Reject payment button — only show on pending */}
        {status === "pending" && (
          <button
            onClick={() => setShowRejectModal(true)}
            className="w-full mt-2 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: "rgba(249,115,22,0.08)",
              border: "1px solid rgba(249,115,22,0.2)",
              color: "rgba(249,115,22,0.8)",
            }}
          >
            <MdWarning size={14} />
            Reject Payment
          </button>
        )}

        {/* Cancel button */}
        {!["delivered", "cancelled", "rejected"].includes(status) && (
          <button
            onClick={() => handleStatusUpdate("cancelled")}
            disabled={updating}
            className="w-full mt-2 py-2 text-[11px] text-red-400/40 hover:text-red-400 transition-colors cursor-pointer font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5"
          >
            <MdCancel size={13} />
            Cancel Order
          </button>
        )}
      </div>

      {/* Customer info */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold mb-3">
          Customer Info
        </p>
        <div className="flex flex-col gap-3">
          {[
            { icon: MdPerson, label: "Name", value: order.customer?.name },
            { icon: MdEmail, label: "Email", value: order.customer?.email },
            { icon: MdPhone, label: "Phone", value: order.customer?.phone },
            {
              icon: MdLocationOn,
              label: "Address",
              value: `${order.delivery?.address}, ${order.delivery?.state} State`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(232,61,138,0.08)",
                  border: "1px solid rgba(232,61,138,0.15)",
                }}
              >
                <Icon size={14} className="text-[#E83D8A]" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] text-white/25 uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-white text-[13px] font-semibold mt-0.5 break-words">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order items */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "#111111", border: "1px solid #1e1e1e" }}
      >
        <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold mb-3">
          Order Items
        </p>
        {order.items?.map((item: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 gap-2"
            style={{
              borderBottom:
                i < order.items.length - 1 ? "1px solid #1e1e1e" : "none",
            }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold truncate">
                {item.name}
              </p>
              <p className="text-white/30 text-[11px]">
                x{item.qty} · {fmt(item.price)} each
              </p>
            </div>
            <p className="text-[#E83D8A] font-bold text-[13px] flex-shrink-0">
              {fmt(item.price * item.qty)}
            </p>
          </div>
        ))}

        <div
          className="flex flex-col gap-2 pt-3 mt-1"
          style={{ borderTop: "1px solid #1e1e1e" }}
        >
          <div className="flex justify-between text-sm">
            <span className="text-white/40">Subtotal</span>
            <span className="text-white">{fmt(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/40">
              Delivery ({order.delivery?.state})
            </span>
            <span className="text-white">{fmt(order.delivery?.fee)}</span>
          </div>
          <div
            className="flex justify-between pt-2"
            style={{ borderTop: "1px solid #1e1e1e" }}
          >
            <span className="text-white font-bold">
              Expected Total
            </span>
            <span
              className="text-[#E83D8A] font-black text-lg"
              style={{ textShadow: "0 0 10px rgba(232,61,138,0.4)" }}
            >
              {fmt(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Proof of payment */}
      {order.proofOfPayment && (
        <div
          className="rounded-2xl p-4"
          style={{ background: "#111111", border: "1px solid #1e1e1e" }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold">
              Proof of Payment
            </p>
            {/* Expected amount reminder */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(232,61,138,0.08)",
                border: "1px solid rgba(232,61,138,0.2)",
              }}
            >
              <span className="text-[10px] text-white/30">Expected:</span>
              <span className="text-[11px] font-black text-[#E83D8A]">
                {fmt(order.total)}
              </span>
            </div>
          </div>
          <div
            className="relative w-full rounded-xl overflow-hidden cursor-pointer group"
            style={{ border: "1px solid #1e1e1e", background: "#0a0a0a" }}
            onClick={() => setProofZoomed(true)}
          >
            <Image
              src={urlFor(order.proofOfPayment).width(600).url()}
              alt="Proof of payment"
              width={600}
              height={400}
              className="w-full"
              style={{ objectFit: "contain", maxHeight: 350 }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <MdZoomIn size={16} className="text-white" />
                <span className="text-white text-xs font-semibold">
                  Tap to zoom
                </span>
              </div>
            </div>
          </div>
          <p className="text-white/20 text-[11px] text-center mt-2">
            Verify that the amount matches{" "}
            <span className="text-[#E83D8A] font-bold">{fmt(order.total)}</span>
          </p>
        </div>
      )}

      {/* Zoomed proof modal */}
      {proofZoomed && order.proofOfPayment && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setProofZoomed(false)}
        >
          <div className="relative max-w-lg w-full">
            <Image
              src={urlFor(order.proofOfPayment).width(800).url()}
              alt="Proof of payment"
              width={800}
              height={600}
              className="w-full rounded-2xl"
            />
            <button
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onClick={() => setProofZoomed(false)}
            >
              <MdClose size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Reject Payment Modal */}
      {showRejectModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={e => {
            if (e.target === e.currentTarget) setShowRejectModal(false)
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: "#111111", border: "1px solid #1e1e1e" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                <MdWarning size={18} className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[15px]">
                  Reject Payment
                </h3>
                <p className="text-white/30 text-[11px]">
                  Customer will be notified by email
                </p>
              </div>
            </div>

            {/* Expected amount */}
            <div
              className="rounded-xl p-3 mb-4"
              style={{
                background: "rgba(232,61,138,0.05)",
                border: "1px solid rgba(232,61,138,0.15)",
              }}
            >
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">
                Order Total Expected
              </p>
              <p
                className="text-[#E83D8A] text-xl font-black"
                style={{ textShadow: "0 0 10px rgba(232,61,138,0.4)" }}
              >
                {fmt(order.total)}
              </p>
            </div>

            {/* Reason presets */}
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-semibold">
              Select or type a reason
            </p>
            <div className="flex flex-col gap-2 mb-3">
              {[
                `Wrong amount transferred. Expected ${fmt(order.total)}`,
                "Payment screenshot is unclear or invalid",
                "Payment could not be verified",
                "Duplicate payment detected",
              ].map(preset => (
                <button
                  key={preset}
                  onClick={() => setRejectReason(preset)}
                  className="text-left px-3 py-2.5 rounded-xl text-[12px] transition-all cursor-pointer"
                  style={{
                    background:
                      rejectReason === preset
                        ? "rgba(249,115,22,0.15)"
                        : "rgba(255,255,255,0.03)",
                    border:
                      rejectReason === preset
                        ? "1px solid rgba(249,115,22,0.4)"
                        : "1px solid #1e1e1e",
                    color:
                      rejectReason === preset
                        ? "rgba(249,115,22,0.9)"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom reason */}
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Or type a custom reason..."
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl text-[12px] resize-none outline-none mb-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #1e1e1e",
                color: "#f0f0f0",
              }}
            />

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowRejectModal(false)
                  setRejectReason("")
                }}
                variant="outline"
                className="flex-1 border-[#1e1e1e] bg-transparent text-white/40 hover:text-white h-11"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={rejecting || !rejectReason.trim()}
                className="flex-1 h-11 font-bold text-sm border-none disabled:opacity-50 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  boxShadow: "0 0 20px rgba(249,115,22,0.3)",
                }}
              >
                {rejecting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <MdWarning size={15} />
                    Reject Payment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}