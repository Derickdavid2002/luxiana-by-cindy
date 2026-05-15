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
}

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function OrderDetail({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(order.status)
  const [updating, setUpdating] = useState(false)
  const [proofZoomed, setProofZoomed] = useState(false)

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
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border flex-shrink-0 ${STATUS_STYLES[status]}`}
        >
          {STATUS_FLOW.find(s => s.value === status)?.label ?? status}
        </span>
      </div>

      {/* Progress */}
      <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-4">
        <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold mb-4">
          Order Progress
        </p>

        {/* Progress bar */}
        <div className="flex items-start justify-between mb-5 overflow-x-auto pb-1">
          {STATUS_FLOW.map((s, i) => {
            const isDone = i <= currentIndex
            const isActive = i === currentIndex
            const Icon = s.icon
            return (
              <div key={s.value} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                <div className="flex items-center w-full">
                  {/* Line before */}
                  {i > 0 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        i <= currentIndex ? "bg-[#E83D8A]" : "bg-[#1e1e1e]"
                      }`}
                    />
                  )}
                  {/* Dot */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? "bg-[#E83D8A] shadow-[0_0_14px_rgba(232,61,138,0.5)]"
                        : isDone
                        ? "bg-green-500"
                        : "bg-[#1e1e1e] border border-[#333]"
                    }`}
                  >
                    <Icon
                      size={14}
                      className={
                        isDone || isActive ? "text-white" : "text-white/20"
                      }
                    />
                  </div>
                  {/* Line after */}
                  {i < STATUS_FLOW.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        i < currentIndex ? "bg-[#E83D8A]" : "bg-[#1e1e1e]"
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`text-[9px] font-semibold text-center leading-tight px-0.5 ${
                    isActive
                      ? "text-[#E83D8A]"
                      : isDone
                      ? "text-green-400"
                      : "text-white/20"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Action button */}
        {nextStatus && status !== "cancelled" && (
          <Button
            onClick={() => handleStatusUpdate(nextStatus.value)}
            disabled={updating}
            className="w-full h-11 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold text-sm border-none shadow-[0_0_20px_rgba(232,61,138,0.3)] disabled:opacity-50 flex items-center gap-2"
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
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
            <p className="text-green-400 text-sm font-semibold flex items-center justify-center gap-2">
              <MdDoneAll size={16} />
              Order completed successfully!
            </p>
          </div>
        )}

        {!["delivered", "cancelled"].includes(status) && (
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
      <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-4">
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
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#1e1e1e] flex items-center justify-center flex-shrink-0">
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
      <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-4">
        <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold mb-3">
          Order Items
        </p>
        <div className="flex flex-col gap-0">
          {order.items?.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-[#1e1e1e] last:border-0 gap-2"
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
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-[#1e1e1e]">
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
          <div className="flex justify-between pt-2 border-t border-[#1e1e1e]">
            <span className="text-white font-bold">Total</span>
            <span className="text-[#E83D8A] font-black text-lg">
              {fmt(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Proof of payment */}
      {order.proofOfPayment && (
        <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-semibold mb-3">
            Proof of Payment
          </p>
          <div
            className="relative w-full rounded-xl overflow-hidden cursor-pointer border border-[#1e1e1e] group"
            onClick={() => setProofZoomed(true)}
          >
            <Image
              src={urlFor(order.proofOfPayment).width(600).url()}
              alt="Proof of payment"
              width={600}
              height={400}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex items-center gap-2 bg-black/60 px-3 py-2 rounded-full">
                <MdZoomIn size={16} className="text-white" />
                <span className="text-white text-xs font-semibold">
                  Tap to zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoomed proof modal */}
      {proofZoomed && order.proofOfPayment && (
        <div
          className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4"
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
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setProofZoomed(false)}
            >
              <MdClose size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}