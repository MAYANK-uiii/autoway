"use client"

import {
  LayoutDashboard,
  FileText,
  CalendarClock,
  Zap,
  Megaphone,
  Inbox,
  BarChart3,
  Link2,
  Settings,
  LifeBuoy,
  LogOut,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

export const primaryNav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Content", icon: FileText },
  { label: "Scheduler", icon: CalendarClock },
  { label: "Automations", icon: Zap },
  { label: "Campaigns", icon: Megaphone },
  { label: "Inbox", icon: Inbox },
  { label: "Analytics", icon: BarChart3 },
  { label: "Connected Accounts", icon: Link2 },
] as const

const bottomNav = [
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: LifeBuoy },
] as const

interface SidebarProps {
  active: string
  onNavigate: (label: string) => void
  open: boolean
  onClose: () => void
}

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    router.replace("/login")
  }

  const displayName = user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Mayank"
  const email = user?.email ?? "mayank@autoway.io"
  const initials = displayName.slice(0, 2).toUpperCase()

  const NavButton = ({ label, icon: Icon }: { label: string; icon: typeof LayoutDashboard }) => {
    const isActive = active === label
    return (
      <button
        onClick={() => {
          onNavigate(label)
          onClose()
        }}
        className={cn(
          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "text-white"
            : "text-white/55 hover:bg-white/5 hover:text-white",
        )}
      >
        {isActive && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#40E0D0]/20 to-[#7B61FF]/15 shadow-[inset_0_0_0_1px_rgba(64,224,208,0.45),0_0_20px_rgba(64,224,208,0.15)]"
          />
        )}
        <Icon className={cn("relative z-10 h-[18px] w-[18px] transition-colors", isActive ? "text-[#40E0D0]" : "")} />
        <span className="relative z-10">{label}</span>
      </button>
    )
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#050505] p-4 transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] shadow-[0_0_12px_#40E0D0]" />
            <span className="bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] bg-clip-text text-lg font-bold tracking-tight text-transparent">
              AUTOWAY
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/50 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Primary navigation */}
        <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
          {primaryNav.map((item) => (
            <NavButton key={item.label} label={item.label} icon={item.icon} />
          ))}

          <div className="my-3 h-px bg-white/10" />

          {bottomNav.map((item) => (
            <NavButton key={item.label} label={item.label} icon={item.icon} />
          ))}
        </nav>

        {/* User profile card */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] text-sm font-bold text-black">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{displayName}</p>
            <p className="truncate text-xs text-white/40">{email}</p>
          </div>
          <button
            onClick={handleSignOut}
            aria-label="Log out"
            className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-[#40E0D0]"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </>
  )
}
