"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MdSearch,
  MdShoppingBag,
  MdArrowForward,
  MdPending,
  MdCheckCircle,
  MdInventory,
  MdLocalShipping,
  MdDoneAll,
  MdCancel,
} from "react-icons/md"
import { Input } from "@/components/ui/input"

const STATUS_STYLES: Record<string, string> = {
  pending: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  confirmed: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  processing: "text-purple-400 bg-purple-500/10 border-purple-500/25",
  shipped: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
  delivered: "text-green-400 bg-green-500/10 border-green-500/25",
  cancelled: "text-red-400 bg-red-500/10 border-red-500/25",
}

const STATUS_ICONS: Record<string, any> = {
  pending: MdPending,
  confirmed: MdCheckCircle,
  processing: MdInventory,
  shipped: MdLocalShipping,
  delivered: MdDoneAll,
  cancelled: MdCancel,
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function OrderList({ initialOrders }: { initialOrders: any[] }) {
  const [orders] = useState(initialOrders)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filtered = orders.filter(o => {
    const matchSearch =
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      filterStatus === "all" || o.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="py-4 flex flex-col gap-4">

      {/* Header */}
      <div>
        <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-1.5 font-semibold">
          Manage
        </p>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Orders
        </h1>
        <p className="text-sm text-white/30 mt-0.5">
          {orders.length} total orders
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <MdSearch
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
        />
        <Input
          type="text"
          placeholder="Search by order number or customer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/20 focus:border-[#E83D8A]/40 rounded-xl h-11"
        />
      </div>

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...Object.keys(STATUS_LABELS)].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wide uppercase transition-all cursor-pointer border ${
              filterStatus === s
                ? "bg-[#E83D8A]/15 border-[#E83D8A]/35 text-[#E83D8A]"
                : "bg-white/5 border-[#1e1e1e] text-white/40 hover:text-white/60"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[11px] text-white/30 -mt-1">
        Showing{" "}
        <span className="text-[#E83D8A] font-bold">{filtered.length}</span>
        {" "}orders
      </p>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-[#1e1e1e] flex items-center justify-center">
            <MdShoppingBag size={24} className="text-white/20" />
          </div>
          <div className="text-center">
            <p className="text-white/40 text-sm font-semibold">
              No orders found
            </p>
            <p className="text-white/20 text-xs mt-1">
              Orders appear here once customers checkout
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(order => {
            const StatusIcon = STATUS_ICONS[order.status] ?? MdPending
            const statusStyle =
              STATUS_STYLES[order.status] ?? STATUS_STYLES.pending
            const date = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "—"

            return (
              <Link key={order._id} href={`/admin/orders/${order._id}`}>
                <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-4 hover:border-[#E83D8A]/20 transition-all duration-200 group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {/* Order number + status */}
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-[#E83D8A] text-sm font-black tracking-wide">
                          #{order.orderNumber}
                        </p>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border flex items-center gap-1 ${statusStyle}`}
                        >
                          <StatusIcon size={10} />
                          {STATUS_LABELS[order.status]}
                        </span>
                      </div>

                      {/* Customer */}
                      <p className="text-white text-[13px] font-semibold truncate">
                        {order.customer?.name}
                      </p>
                      <p className="text-white/30 text-[11px] truncate">
                        {order.customer?.email}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <p className="text-white/25 text-[10px]">{date}</p>
                        <span className="text-white/15 text-[10px]">·</span>
                        <p className="text-white/25 text-[10px]">
                          {order.items?.length} item
                          {order.items?.length !== 1 ? "s" : ""}
                        </p>
                        <span className="text-white/15 text-[10px]">·</span>
                        <p className="text-white/25 text-[10px]">
                          {order.delivery?.state}
                        </p>
                      </div>
                    </div>

                    {/* Amount + arrow */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p className="text-[#E83D8A] font-black text-[14px]">
                        {fmt(order.total)}
                      </p>
                      <MdArrowForward
                        size={15}
                        className="text-white/20 group-hover:text-[#E83D8A] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}