import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { CartItem } from "../../../store/cartStore"
import { MdLocalShipping, MdLock } from "react-icons/md"

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  total,
  state,
}: {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  state: string
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "#111111",
        border: "1px solid #1e1e1e",
      }}
    >
      {/* Header */}
      <h3
        className="text-[11px] uppercase tracking-[3px] font-semibold mb-4"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        Order Summary
      </h3>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-5">
        {items.map(item => (
          <div key={item._id} className="flex gap-3 items-center">
            {/* Image */}
            <div
              className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"
              style={{ border: "1px solid #1e1e1e" }}
            >
              {item.image && (
                <Image
                  src={urlFor(item.image).width(96).height(96).url()}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Name + qty */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[13px] font-semibold truncate"
                style={{ color: "#f0f0f0" }}
              >
                {item.name}
              </p>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                x{item.qty}
              </p>
            </div>

            {/* Price */}
            <p
              className="text-[13px] font-bold flex-shrink-0"
              style={{ color: "#E83D8A" }}
            >
              {fmt(item.price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-4"
        style={{ background: "#1e1e1e" }}
      />

      {/* Totals */}
      <div className="flex flex-col gap-2.5 mb-4">
        <div className="flex justify-between items-center">
          <span
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Subtotal
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: "#f0f0f0" }}
          >
            {fmt(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <span
            className="text-sm flex items-center gap-1.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <MdLocalShipping size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
            Delivery {state && `(${state})`}
          </span>
          <span
            className="text-sm font-semibold"
            style={{
              color: state ? "#f0f0f0" : "rgba(255,255,255,0.3)",
              fontSize: state ? undefined : 12,
            }}
          >
            {state ? fmt(deliveryFee) : "Select state first"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-4"
        style={{ background: "#1e1e1e" }}
      />

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span
          className="font-bold text-sm"
          style={{ color: "#f0f0f0" }}
        >
          Total
        </span>
        <span
          className="text-xl font-black"
          style={{
            color: "#E83D8A",
            textShadow: "0 0 12px rgba(232,61,138,0.4)",
          }}
        >
          {fmt(total)}
        </span>
      </div>

      {/* Secure badge */}
      <div
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid #1e1e1e",
        }}
      >
        <MdLock size={13} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
        <p
          className="text-center leading-relaxed"
          style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}
        >
          Secure bank transfer · Verified before shipping
        </p>
      </div>
    </div>
  )
}