"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NIGERIAN_STATES } from "../../../../lib/deliveryFee"
import { MdArrowForward, MdPerson, MdEmail, MdPhone, MdLocationOn } from "react-icons/md"

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  state: string
}

export default function CheckoutForm({
  formData,
  setFormData,
  onNext,
}: {
  formData: FormData
  setFormData: (data: FormData) => void
  onNext: () => void
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.address &&
    formData.state

  return (
    <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6 md:p-8">
      <h2 className="text-lg font-bold text-white mb-1 tracking-wide">
        Delivery Details
      </h2>
      <p className="text-white/30 text-sm mb-6">
        Enter your details for delivery
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Full Name *
          </label>
          <div className="relative">
            <MdPerson size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <Input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
              className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Email Address *
          </label>
          <div className="relative">
            <MdEmail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
              className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11"
            />
          </div>
          <p className="text-[11px] text-white/20">
            Order updates will be sent to this email
          </p>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            Phone Number *
          </label>
          <div className="relative">
            <MdPhone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <Input
              type="tel"
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              required
              className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11"
            />
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
            State *
          </label>
          <Select
            value={formData.state}
            onValueChange={val => setFormData({ ...formData, state: val })}
          >
            <SelectTrigger className="bg-white/5 border-[#1e1e1e] text-white focus:border-[#E83D8A]/40 rounded-xl h-11">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#1e1e1e] text-white max-h-[240px]">
              {NIGERIAN_STATES.map(state => (
                <SelectItem
                  key={state}
                  value={state}
                  className="text-white/70 hover:text-white focus:bg-[#E83D8A]/10 focus:text-[#E83D8A]"
                >
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
*State (Delivery Address) *
          </label>
          <div className="relative">
            <MdLocationOn size={16} className="absolute left-3.5 top-3.5 text-white/25" />
            <textarea
              placeholder="Enter your full delivery address"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              required
              rows={3}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-[#1e1e1e] text-white text-sm placeholder:text-white/15 outline-none focus:border-[#E83D8A]/40 transition-colors resize-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="w-full h-12 mt-2 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.35)] disabled:opacity-40 flex items-center gap-2"
        >
          Continue to Payment
          <MdArrowForward size={18} />
        </Button>
      </form>
    </div>
  )
}