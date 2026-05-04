"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdLogin,
  MdError,
} from "react-icons/md"

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })
    if (result?.ok) {
      router.push("/admin/dashboard")
    } else {
      setError("Invalid username or password. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#E83D8A]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#E83D8A]/3 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E83D8A]/10 border border-[#E83D8A]/20 mb-5">
            <MdLock size={28} className="text-[#E83D8A]" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-[4px] text-[#E83D8A] mb-1">
            Luxiana Beauty
          </h1>
          <p className="text-[12px] tracking-[3px] text-[#f472b6] italic">
            by cindy
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-white/10" />
            <p className="text-[10px] text-white/25 tracking-[3px] uppercase">
              Admin Panel
            </p>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white tracking-wide">
              Welcome back
            </h2>
            <p className="text-[12px] text-white/30 mt-1">
              Sign in to manage your store
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20">
              <MdError size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-[12px] font-medium">{error}</p>
            </div>
          )}

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
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="pl-9 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11 text-sm"
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="pl-9 pr-10 bg-white/5 border-[#1e1e1e] text-white placeholder:text-white/15 focus:border-[#E83D8A]/40 rounded-xl h-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors cursor-pointer"
                >
                  {showPassword
                    ? <MdVisibilityOff size={16} />
                    : <MdVisibility size={16} />
                  }
                </button>
              </div>
            </div>

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
                  <MdLogin size={18} />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-[11px] text-white/15 mt-6 tracking-wide">
          © 2025 Luxiana Beauty by Cindy
        </p>
      </div>
    </div>
  )
}