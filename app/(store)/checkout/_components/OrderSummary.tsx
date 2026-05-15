import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { CartItem } from "../../../store/cartStore"
import { MdLocalShipping } from "react-icons/md"

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
    <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5 sticky top-24">
      <h3 className="text-[11px] uppercase tracking-[3px] text-white/40 font-semibold mb-4">
        Order Summary
      </h3>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-5">
        {items.map(item => (
          <div key={item._id} className="flex gap-3 items-center">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#1e1e1e]">
              {item.image && (
                <Image
                  src={urlFor(item.image).width(96).height(96).url()}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold truncate">
                {item.name}
              </p>
              <p className="text-white/30 text-[11px]">x{item.qty}</p>
            </div>
            <p className="text-[#E83D8A] text-[13px] font-bold flex-shrink-0">
              {fmt(item.price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1e1e1e] mb-4" />

      {/* Totals */}
      <div className="flex flex-col gap-2.5 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/40">Subtotal</span>
          <span className="text-white">{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm items-center gap-2">
          <span className="text-white/40 flex items-center gap-1.5">
            <MdLocalShipping size={14} className="text-white/30" />
            Delivery {state && `(${state})`}
          </span>
          <span className={state ? "text-white" : "text-white/30 text-xs"}>
            {state ? fmt(deliveryFee) : "Select state first"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#1e1e1e] mb-4" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-white font-bold text-sm">Total</span>
        <span
          className="text-[#E83D8A] text-xl font-black"
          style={{ textShadow: "0 0 12px rgba(232,61,138,0.4)" }}
        >
          {fmt(total)}
        </span>
      </div>

      {/* Secure payment note */}
      <div className="mt-5 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/3 border border-[#1e1e1e]">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
        <p className="text-white/25 text-[11px] text-center">
          Secure bank transfer · Verified before shipping
        </p>
      </div>
    </div>
  )
}