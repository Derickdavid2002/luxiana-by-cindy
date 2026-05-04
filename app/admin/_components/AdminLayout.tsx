"use client"

import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MdDashboard,
  MdInventory2,
  MdAddBox,
  MdCollections,
  MdLanguage,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md"
import { useState } from "react"

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: MdDashboard, section: "main" },
  { href: "/admin/products", label: "Products", icon: MdInventory2, section: "main" },
  { href: "/admin/products/new", label: "Add Product", icon: MdAddBox, section: "manage" },
  { href: "/admin/gold", label: "Gold Collection", icon: MdCollections, section: "manage" },
  { href: "/", label: "View Website", icon: MdLanguage, section: "store" },
  { href: "/admin/settings", label: "Settings", icon: MdSettings, section: "store" },
]

const SECTIONS = [
  { key: "main", label: "Main" },
  { key: "manage", label: "Manage" },
  { key: "store", label: "Store" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  const isActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.href === "/admin/dashboard") return pathname === item.href
    if (item.href === "/admin/products/new") return pathname === item.href
    if (item.href === "/admin/products") return pathname.startsWith("/admin/products") && pathname !== "/admin/products/new"
    return pathname === item.href
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0a0a0a] border-r border-[#1e1e1e] w-[220px]">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#1e1e1e]">
        <p className="text-sm font-black uppercase tracking-[3px] text-[#E83D8A]">
          Luxiana Beauty
        </p>
        <p className="text-[10px] tracking-widest text-[#f472b6] italic mt-0.5">
          by cindy
        </p>
        <p className="text-[9px] tracking-[3px] uppercase text-white/20 mt-1.5">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {SECTIONS.map(section => (
          <div key={section.key} className="mb-2">
            <p className="text-[9px] font-semibold uppercase tracking-[3px] text-white/20 px-5 py-2">
              {section.label}
            </p>
            {NAV_ITEMS.filter(i => i.section === section.key).map(item => {
              const active = isActive(item)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 group border ${
                    active
                      ? "bg-[#E83D8A]/12 border-[#E83D8A]/25 text-[#E83D8A]"
                      : "border-transparent text-white/40 hover:bg-white/5 hover:text-white/70"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                    active ? "bg-[#E83D8A]/20" : "bg-white/5 group-hover:bg-white/8"
                  }`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-[12px] font-semibold tracking-wide">{item.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E83D8A] shadow-[0_0_6px_#E83D8A]" />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-[#1e1e1e]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-[#1e1e1e] mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E83D8A] to-[#c0256e] flex items-center justify-center text-[11px] font-black text-white flex-shrink-0">
            C
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-white truncate">Cindy</p>
            <p className="text-[10px] text-white/30 tracking-wide">Administrator</p>
          </div>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full flex items-center gap-2 text-white/40 border-[#1e1e1e] bg-transparent hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all text-xs"
        >
          <MdLogout size={13} />
          Sign Out
        </Button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-[#060606] flex">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 w-[220px]">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[220px] transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:pl-[220px] min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-[#060606]/95 border-b border-[#1e1e1e] backdrop-blur-xl flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white/40 hover:text-white hover:bg-white/5 w-8 h-8"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <MdClose size={18} /> : <MdMenu size={18} />}
            </Button>

            {/* Page title */}
            <div>
              <p className="text-[13px] font-bold text-white tracking-wide">
                {NAV_ITEMS.find(i => isActive(i))?.label ?? "Admin"}
              </p>
              <p className="text-[10px] text-white/30 hidden sm:block">
                Luxiana Beauty Admin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/admin/products/new">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white text-xs font-bold tracking-wide border-none shadow-[0_0_20px_rgba(232,61,138,0.3)] hidden sm:flex items-center gap-1.5"
              >
                <MdAddBox size={14} />
                Add Product
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}