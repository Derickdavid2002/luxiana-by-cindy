"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MdInventory2,
  MdCheckCircle,
  MdStar,
  MdCancel,
  MdCategory,
  MdAddBox,
  MdList,
  MdLanguage,
  MdTrendingUp,
  MdArrowForward,
} from "react-icons/md"

interface Stats {
  total: number
  inStock: number
  featured: number
  outOfStock: number
  categories: number
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const statCards = [
    {
      label: "Total Products",
      value: stats.total,
      icon: MdInventory2,
      iconColor: "text-[#E83D8A]",
      iconBg: "bg-[#E83D8A]/10",
      border: "hover:border-[#E83D8A]/30",
      glow: "hover:shadow-[0_4px_20px_rgba(232,61,138,0.12)]",
      trend: "+3 this week",
      trendColor: "text-green-400",
    },
    {
      label: "In Stock",
      value: stats.inStock,
      icon: MdCheckCircle,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/10",
      border: "hover:border-green-500/30",
      glow: "hover:shadow-[0_4px_20px_rgba(34,197,94,0.12)]",
      trend: "Active products",
      trendColor: "text-green-400",
    },
    {
      label: "Featured",
      value: stats.featured,
      icon: MdStar,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
      border: "hover:border-amber-500/30",
      glow: "hover:shadow-[0_4px_20px_rgba(245,158,11,0.12)]",
      trend: "On homepage",
      trendColor: "text-amber-400",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock,
      icon: MdCancel,
      iconColor: "text-red-400",
      iconBg: "bg-red-500/10",
      border: "hover:border-red-500/30",
      glow: "hover:shadow-[0_4px_20px_rgba(239,68,68,0.12)]",
      trend: "Needs restocking",
      trendColor: "text-red-400",
    },
  ]

  const quickActions = [
    {
      href: "/admin/products/new",
      icon: MdAddBox,
      label: "Add New Product",
      sub: "Upload & publish instantly",
      iconBg: "bg-[#E83D8A]/15",
      iconColor: "text-[#E83D8A]",
      primary: true,
    },
    {
      href: "/admin/products",
      icon: MdList,
      label: "Manage Products",
      sub: "Edit, toggle stock & featured",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      primary: false,
    },
    {
      href: "/",
      icon: MdLanguage,
      label: "View Live Website",
      sub: "See how customers see it",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      primary: false,
    },
  ]

  return (
    <div className="py-6 flex flex-col gap-6">

      {/* Welcome header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[4px] text-[#E83D8A] mb-1.5 font-semibold">
            Welcome back
          </p>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Dashboard
          </h1>
          <p className="text-sm text-white/30 mt-1">
            Manage your Luxiana Beauty store
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20">
          <MdTrendingUp size={14} className="text-green-400" />
          <span className="text-[11px] font-semibold text-green-400 tracking-wide">
            Store Live
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`bg-[#111111] border border-[#1e1e1e] rounded-2xl p-4 flex flex-col gap-3 transition-all duration-300 cursor-default ${card.border} ${card.glow}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                <Icon size={18} className={card.iconColor} />
              </div>
              <div>
                <p className="text-3xl font-black text-white leading-none">
                  {card.value}
                </p>
                <p className="text-[11px] text-white/40 tracking-wide mt-1.5">
                  {card.label}
                </p>
                <p className={`text-[10px] mt-1 font-semibold ${card.trendColor}`}>
                  {card.trend}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Quick actions */}
        <div className="lg:col-span-2 bg-[#111111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1e1e1e] flex items-center justify-between">
            <h2 className="text-[11px] font-bold text-white/50 uppercase tracking-[3px]">
              Quick Actions
            </h2>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {quickActions.map(action => {
              const Icon = action.icon
              return (
                <Link key={action.href} href={action.href}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer group ${
                    action.primary
                      ? "bg-[#E83D8A]/8 border-[#E83D8A]/20 hover:bg-[#E83D8A]/15 hover:border-[#E83D8A]/35"
                      : "bg-white/3 border-[#1e1e1e] hover:bg-white/6 hover:border-white/15"
                  }`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${action.iconBg}`}>
                      <Icon size={18} className={action.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] font-semibold ${action.primary ? "text-[#E83D8A]" : "text-white/80"}`}>
                        {action.label}
                      </p>
                      <p className="text-[11px] text-white/30 mt-0.5">
                        {action.sub}
                      </p>
                    </div>
                    <MdArrowForward
                      size={16}
                      className="text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Categories + CTA */}
        <div className="flex flex-col gap-4">

          {/* Categories card */}
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5 flex items-center justify-between hover:border-[#E83D8A]/20 transition-all duration-300">
            <div>
              <p className="text-[11px] text-white/30 tracking-[2px] uppercase font-semibold">
                Categories
              </p>
              <p className="text-4xl font-black text-white mt-2 leading-none">
                {stats.categories}
              </p>
              <p className="text-[11px] text-white/30 mt-1.5">
                Active categories
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E83D8A]/10 flex items-center justify-center">
              <MdCategory size={24} className="text-[#E83D8A]" />
            </div>
          </div>

          {/* Add product CTA */}
          <div className="bg-gradient-to-br from-[#E83D8A]/15 to-[#c0256e]/8 border border-[#E83D8A]/20 rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <p className="text-[13px] font-bold text-white">
                New Product?
              </p>
              <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                Add a new product to your store instantly
              </p>
            </div>
            <Link href="/admin/products/new">
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-[#E83D8A] to-[#c0256e] hover:opacity-90 text-white text-xs font-bold tracking-wide border-none shadow-[0_0_20px_rgba(232,61,138,0.3)] flex items-center gap-1.5"
              >
                <MdAddBox size={15} />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}