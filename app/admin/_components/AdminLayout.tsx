"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  MdDashboard,
  MdInventory,
  MdShoppingBag,
  MdCollections,
  MdSettings,
  MdStorefront,
  MdMenu,
  MdClose,
  MdLogout,
  MdPending,
} from "react-icons/md"

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: MdDashboard, section: "main" },
  { href: "/admin/orders", label: "Orders", icon: MdShoppingBag, section: "main", badge: "orders" },
  { href: "/admin/products", label: "Products", icon: MdInventory, section: "manage" },
  { href: "/admin/gold", label: "Gold Collection", icon: MdCollections, section: "manage" },
  { href: "/admin/settings", label: "Settings", icon: MdSettings, section: "store" },
  { href: "/", label: "View Website", icon: MdStorefront, section: "store" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pendingOrders, setPendingOrders] = useState(0)

  // Fetch pending orders count every 30 seconds
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch("/api/orders?admin=true", {
          cache: "no-store",
        })
        if (res.ok) {
          const data = await res.json()
          const pending = data.filter((o: any) => o.status === "pending").length
          setPendingOrders(pending)
        }
      } catch {
        // silent fail
      }
    }

    fetchPending()
    const interval = setInterval(fetchPending, 30000)
    return () => clearInterval(interval)
  }, [])

  const renderNavItem = (item: typeof NAV_ITEMS[0]) => {
    const active = pathname === item.href ||
      (item.href !== "/admin/dashboard" && pathname.startsWith(item.href) && item.href !== "/")
    const Icon = item.icon

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group no-underline"
        style={{
          background: active
            ? "rgba(232,61,138,0.12)"
            : "transparent",
          border: active
            ? "1px solid rgba(232,61,138,0.2)"
            : "1px solid transparent",
        }}
      >
        <Icon
          size={18}
          style={{ color: active ? "#E83D8A" : "rgba(255,255,255,0.4)", flexShrink: 0 }}
        />
        <span
          className="text-[13px] font-semibold tracking-wide flex-1"
          style={{ color: active ? "#E83D8A" : "rgba(255,255,255,0.5)" }}
        >
          {item.label}
        </span>

        {/* Pending orders badge */}
        {item.badge === "orders" && pendingOrders > 0 && (
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black text-white"
            style={{
              background: "#f59e0b",
              boxShadow: "0 0 8px rgba(245,158,11,0.5)",
            }}
          >
            {pendingOrders > 9 ? "9+" : pendingOrders}
          </span>
        )}

        {/* Active indicator */}
        {active && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
            style={{ background: "#E83D8A", boxShadow: "0 0 8px #E83D8A" }}
          />
        )}
      </Link>
    )
  }

  const grouped = {
    main: NAV_ITEMS.filter(i => i.section === "main"),
    manage: NAV_ITEMS.filter(i => i.section === "manage"),
    store: NAV_ITEMS.filter(i => i.section === "store"),
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-6 border-b border-[#1e1e1e]">
        <p
          className="font-black text-[14px] text-[#E83D8A] tracking-[2px] uppercase"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          LUXIANA BEAUTY
        </p>
        <p
          className="text-[#f472b6] text-[10px] tracking-widest mt-0.5"
          style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
        >
          by cindy
        </p>
        <p className="text-white/20 text-[9px] uppercase tracking-[2px] mt-1">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-5">
        {/* Main */}
        <div>
          <p className="text-[9px] uppercase tracking-[3px] text-white/20 font-bold px-3 mb-2">
            Main
          </p>
          <div className="flex flex-col gap-1">
            {grouped.main.map(renderNavItem)}
          </div>
        </div>

        {/* Manage */}
        <div>
          <p className="text-[9px] uppercase tracking-[3px] text-white/20 font-bold px-3 mb-2">
            Manage
          </p>
          <div className="flex flex-col gap-1">
            {grouped.manage.map(renderNavItem)}
          </div>
        </div>

        {/* Store */}
        <div>
          <p className="text-[9px] uppercase tracking-[3px] text-white/20 font-bold px-3 mb-2">
            Store
          </p>
          <div className="flex flex-col gap-1">
            {grouped.store.map(renderNavItem)}
          </div>
        </div>
      </div>

      {/* User + signout */}
      <div className="px-3 py-4 border-t border-[#1e1e1e]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #E83D8A, #c0256e)" }}
          >
            C
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-semibold">Cindy</p>
            <p className="text-white/30 text-[10px]">Administrator</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer"
          style={{
            background: "rgba(239,68,68,0.05)",
            border: "1px solid rgba(239,68,68,0.1)",
          }}
        >
          <MdLogout size={16} className="text-red-400/60" />
          <span className="text-red-400/60 text-[13px] font-semibold">
            Sign Out
          </span>
        </button>
      </div>
    </div>
  )

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#060606" }}
    >
      {/* Desktop sidebar */}
      <div
        className="hidden md:flex flex-col w-[240px] flex-shrink-0 sticky top-0 h-screen"
        style={{ background: "#0a0a0a", borderRight: "1px solid #1e1e1e" }}
      >
        <SidebarContent />
      </div>

      {/* Mobile header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{
          background: "rgba(10,10,10,0.95)",
          borderBottom: "1px solid #1e1e1e",
          backdropFilter: "blur(20px)",
        }}
      >
        <p
          className="font-black text-[13px] text-[#E83D8A] tracking-[2px] uppercase"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          {NAV_ITEMS.find(i =>
            pathname === i.href ||
            (i.href !== "/" && pathname.startsWith(i.href))
          )?.label || "Admin"}
        </p>
        <div className="flex items-center gap-2">
          {/* Pending badge on mobile header */}
          {pendingOrders > 0 && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <MdPending size={12} className="text-amber-400" />
              <span className="text-amber-400 text-[11px] font-bold">
                {pendingOrders}
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/60"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid #1e1e1e",
            }}
          >
            {sidebarOpen ? <MdClose size={18} /> : <MdMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className="md:hidden fixed top-0 left-0 h-full w-[260px] z-50 transition-transform duration-300"
        style={{
          background: "#0a0a0a",
          borderRight: "1px solid #1e1e1e",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="md:hidden h-14" />
        <div className="px-4 md:px-8 pb-10 max-w-3xl">
          {children}
        </div>
      </div>
    </div>
  )
}