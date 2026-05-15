"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "../../store/cartStore"
import { useRouter } from "next/navigation"
import CheckoutForm from "./_components/CheckoutForm"
import BankDetails from "./_components/BankDetails"
import OrderSummary from "./_components/OrderSummary"
import ProofUpload from "./_components/ProofUpload"
import { getDeliveryFee } from "@/lib/deliveryFee"
import { MdCheckCircle, MdStorefront } from "react-icons/md"
import { Button } from "@/components/ui/button"

export type CheckoutStep = "details" | "bank" | "proof" | "success"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [step, setStep] = useState<CheckoutStep>("details")
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fix: use useEffect for redirect instead of render-time push
  useEffect(() => {
    if (mounted && items.length === 0 && step !== "success") {
      router.push("/shop")
    }
  }, [mounted, items.length, step, router])

  if (!mounted) return null
  if (items.length === 0 && step !== "success") return null

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0)
  const deliveryFee = formData.state ? getDeliveryFee(formData.state) : 0
  const total = subtotal + deliveryFee

  const handleProofSubmit = async (
    proofOfPaymentId: string,
    proofUrl: string
  ) => {
    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          delivery: {
            address: formData.address,
            state: formData.state,
            fee: deliveryFee,
          },
          items: items.map(i => ({
            productId: i._id,
            name: i.name,
            price: i.price,
            qty: i.qty,
          })),
          subtotal,
          total,
          proofOfPaymentId,
          proofUrl,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOrderNumber(data.orderNumber)
      clearCart()
      setStep("success")
    } catch (err) {
      console.error(err)
      alert("Failed to place order. Please try again.")
    }
    setLoading(false)
  }

  const STEPS = [
    { key: "details", label: "Details" },
    { key: "bank", label: "Payment" },
    { key: "proof", label: "Upload Proof" },
  ]

  return (
    <div className="min-h-screen bg-[#060606] pt-8 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-2 font-semibold">
            Secure Checkout
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Complete Your Order
          </h1>
        </div>

        {/* Steps indicator */}
        {step !== "success" && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {STEPS.map((s, i) => {
              const stepKeys = STEPS.map(s => s.key)
              const currentIndex = stepKeys.indexOf(step)
              const isDone = i < currentIndex
              const isActive = s.key === step
              return (
                <div key={s.key} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-[#E83D8A] text-white shadow-[0_0_20px_rgba(232,61,138,0.4)]"
                          : "bg-white/5 border border-[#1e1e1e] text-white/30"
                      }`}
                    >
                      {isDone ? <MdCheckCircle size={16} /> : i + 1}
                    </div>
                    <span
                      className={`text-[12px] font-semibold hidden sm:block ${
                        isActive
                          ? "text-[#E83D8A]"
                          : isDone
                          ? "text-green-400"
                          : "text-white/30"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`w-8 h-px ${
                        isDone ? "bg-green-500" : "bg-[#1e1e1e]"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {step === "details" && (
              <CheckoutForm
                formData={formData}
                setFormData={setFormData}
                onNext={() => setStep("bank")}
              />
            )}
            {step === "bank" && (
              <BankDetails
                total={total}
                onNext={() => setStep("proof")}
                onBack={() => setStep("details")}
              />
            )}
            {step === "proof" && (
              <ProofUpload
                loading={loading}
                onSubmit={handleProofSubmit}
                onBack={() => setStep("bank")}
              />
            )}

            {/* Success */}
            {step === "success" && (
              <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-5">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(232,61,138,0.1)",
                    border: "1px solid rgba(232,61,138,0.3)",
                    boxShadow: "0 0 40px rgba(232,61,138,0.2)",
                  }}
                >
                  <MdCheckCircle size={40} className="text-[#E83D8A]" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you! We've received your order and proof of payment.
                    A confirmation has been sent to your email.
                  </p>
                </div>

                <div
                  className="w-full max-w-xs rounded-2xl p-5 text-center"
                  style={{
                    background: "rgba(232,61,138,0.05)",
                    border: "1px solid rgba(232,61,138,0.2)",
                  }}
                >
                  <p className="text-[11px] text-white/30 uppercase tracking-[3px] mb-2">
                    Your Order Number
                  </p>
                  <p
                    className="text-[#E83D8A] text-2xl font-black tracking-wider"
                    style={{ textShadow: "0 0 20px rgba(232,61,138,0.4)" }}
                  >
                    #{orderNumber}
                  </p>
                  <p className="text-white/20 text-[11px] mt-2">
                    Save this for reference
                  </p>
                </div>

                <div className="w-full bg-white/3 border border-[#1e1e1e] rounded-xl p-4 text-left">
                  <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold mb-3">
                    What happens next?
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      "We'll verify your payment within a few hours",
                      "You'll receive an email once payment is confirmed",
                      "We'll notify you again when your order ships",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white"
                          style={{ background: "#E83D8A" }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-white/40 text-[12px] leading-relaxed">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/shop")}
                  className="w-full max-w-xs h-12 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.4)] flex items-center gap-2"
                >
                  <MdStorefront size={18} />
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {step !== "success" && (
            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                state={formData.state}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}