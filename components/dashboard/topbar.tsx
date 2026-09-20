"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, Menu, Settings, User, LogOut, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Tooltip } from "@/components/dashboard/tooltip"

interface TopbarProps {
  title: string
  subtitle: string
  onOpenMenu: () => void
  onNavigate: (label: string) => void
}

const notifications = [
  { id: 1, text: "Instagram post published successfully", time: "2 min ago" },
  { id: 2, text: "DM automation replied to 24 messages", time: "18 min ago" },
  { id: 3, text: "WhatsApp campaign is publishing now", time: "1 hr ago" },
]

export function Topbar({ title, subtitle, onOpenMenu, onNavigate }: TopbarProps) {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const displayName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Mayank"
  const email = user?.email ?? "mayank@autoway.io"
  const initials = displayName.slice(0, 2).toUpperCase()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowNotif(false)
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h1>
          <p className="truncate text-xs text-white/50 sm:text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2" ref={wrapRef}>
        {/* Search */}
        <div className="hidden items-center md:flex">
          {showSearch ? (
            <input
              autoFocus
              placeholder="Search posts, campaigns..."
              onBlur={() => setShowSearch(false)}
              className="w-56 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#40E0D0]/60"
            />
          ) : (
            <Tooltip label="Search">
              <button
                onClick={() => setShowSearch(true)}
                className="rounded-xl border border-white/10 p-2.5 text-white/60 transition-colors hover:border-[#40E0D0]/40 hover:text-white"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Connected indicator */}
        <Tooltip label="3 accounts connected">
          <span className="hidden items-center gap-1.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-2 text-xs font-medium text-[#4ade80] sm:flex">
            <CircleDot className="h-3.5 w-3.5" />
            3 Connected
          </span>
        </Tooltip>

        {/* Notifications */}
        <div className="relative">
          <Tooltip label="Notifications">
            <button
              onClick={() => {
                setShowNotif((v) => !v)
                setShowProfile(false)
              }}
              className="relative rounded-xl border border-white/10 p-2.5 text-white/60 transition-colors hover:border-[#40E0D0]/40 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#40E0D0] shadow-[0_0_8px_#40E0D0]" />
            </button>
          </Tooltip>
          {showNotif && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              style={{ animation: "autoway-fade-up 0.2s ease" }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="text-sm font-semibold text-white">Notifications</span>
                <span className="rounded-full bg-[#40E0D0]/15 px-2 py-0.5 text-[11px] font-medium text-[#40E0D0]">3 new</span>
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="flex gap-3 border-b border-white/5 px-4 py-3 transition-colors last:border-0 hover:bg-white/[0.03]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF]" />
                    <div>
                      <p className="text-sm text-white/85">{n.text}</p>
                      <p className="mt-0.5 text-xs text-white/40">{n.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile((v) => !v)
              setShowNotif(false)
            }}
            className="flex items-center gap-2 rounded-xl border border-white/10 p-1 pr-2 transition-colors hover:border-[#40E0D0]/40"
            aria-label="Open profile menu"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] text-xs font-bold text-black">
              {initials}
            </span>
          </button>
          {showProfile && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              style={{ animation: "autoway-fade-up 0.2s ease" }}
            >
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="truncate text-xs text-white/40">{email}</p>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => {
                    onNavigate("Settings")
                    setShowProfile(false)
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <User className="h-4 w-4" /> Profile
                </button>
                <button
                  onClick={() => {
                    onNavigate("Settings")
                    setShowProfile(false)
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Settings className="h-4 w-4" /> Settings
                </button>
                <button
                  onClick={() => {
                    signOut()
                    router.replace("/login")
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
