"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MdArrowBack, MdArrowForward, MdContentCopy, MdCheck } from "react-icons/md"

const BANK = {
  bankName: "Opay",
  accountNumber: "8108682558",
  accountName: "Derick David",
}

const fmt = (n: number) => `₦${n.toLocaleString()}`

export default function BankDetails({
  total,
  onNext,
  onBack,
}: {
  total: number
  onNext: () => void
  onBack: () => void
}) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6 md:p-8">
      <h2 className="text-lg font-bold text-white mb-1 tracking-wide">
        Make Payment
      </h2>
      <p className="text-white/30 text-sm mb-6">
        Transfer the exact amount to the account below
      </p>

      {/* Amount to pay */}
      <div
        className="rounded-2xl p-5 mb-6 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(232,61,138,0.1), rgba(192,37,110,0.05))",
          border: "1px solid rgba(232,61,138,0.25)",
        }}
      >
        <p className="text-white/40 text-[11px] uppercase tracking-[3px] mb-2">
          Amount to Transfer
        </p>
        <p
          className="text-[#E83D8A] text-4xl font-black"
          style={{ textShadow: "0 0 30px rgba(232,61,138,0.4)" }}
        >
          {fmt(total)}
        </p>
        <p className="text-white/20 text-xs mt-2">
          Transfer this exact amount
        </p>
      </div>

      {/* Bank details */}
      <div className="flex flex-col gap-3 mb-6">
        {[
          { label: "Bank Name", value: BANK.bankName, key: "bank" },
          { label: "Account Number", value: BANK.accountNumber, key: "account" },
          { label: "Account Name", value: BANK.accountName, key: "name" },
        ].map(item => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-[#1e1e1e]"
          >
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">
                {item.label}
              </p>
              <p className="text-white font-bold text-[15px]">{item.value}</p>
            </div>
            <button
              onClick={() => copyToClipboard(item.value, item.key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-[#1e1e1e] text-white/40 hover:text-white hover:border-[#E83D8A]/30 transition-all cursor-pointer text-xs font-semibold"
            >
              {copied === item.key ? (
                <>
                  <MdCheck size={13} className="text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <MdContentCopy size={13} />
                  Copy
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-6">
        <p className="text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-2">
          Important Instructions
        </p>
        <ul className="text-white/40 text-[12px] leading-relaxed space-y-1.5">
          <li>• Transfer the <strong className="text-white/60">exact amount</strong> shown above</li>
          <li>• Take a <strong className="text-white/60">screenshot</strong> of your transfer confirmation</li>
          <li>• Click <strong className="text-white/60">I've Made Payment</strong> to upload your proof</li>
          <li>• Your order will be confirmed after payment verification</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#1e1e1e] bg-transparent text-white/40 hover:text-white hover:border-white/20 h-12 flex items-center gap-2"
        >
          <MdArrowBack size={16} />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 h-12 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-wide text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.35)] flex items-center gap-2"
        >
          I've Made Payment
          <MdArrowForward size={16} />
        </Button>
      </div>
    </div>
  )
}