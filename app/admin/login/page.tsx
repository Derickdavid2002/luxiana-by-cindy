"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        username: form.username,
        password: form.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        setError("Invalid username or password")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#060606" }}
    >
      {/* Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(232,61,138,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="font-black text-[22px] text-[#E83D8A] tracking-[3px] uppercase mb-1"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              textShadow: "0 0 20px rgba(232,61,138,0.5)",
            }}
          >
            LUXIANA BEAUTY
          </h1>
          <p
            className="text-[#f472b6] text-[12px] tracking-widest opacity-90 mb-2"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            by cindy
          </p>
          <p className="text-white/30 text-[11px] uppercase tracking-[3px]">
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "#111111",
            border: "1px solid #1e1e1e",
            boxShadow: "0 0 40px rgba(232,61,138,0.06)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(232,61,138,0.1)",
                border: "1px solid rgba(232,61,138,0.2)",
              }}
            >
              <MdLock size={18} className="text-[#E83D8A]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-[15px]">Sign In</h2>
              <p className="text-white/30 text-[11px]">Access your admin panel</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                Username
              </label>
              <div className="relative">
                <MdPerson
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  required
                  className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                Password
              </label>
              <div className="relative">
                <MdLock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  className="pl-9 pr-10 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {showPassword
                    ? <MdVisibilityOff size={16} />
                    : <MdVisibility size={16} />
                  }
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <p className="text-red-400 text-[12px] font-semibold">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white font-bold tracking-[1.5px] uppercase text-sm border-none shadow-[0_0_30px_rgba(232,61,138,0.35)] disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <MdLock size={16} />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/15 text-[11px] mt-6">
          © 2025 Luxiana Beauty by Cindy
        </p>
      </div>
    </div>
  )
}