"use client"

import { LayoutDashboard, Zap, Link2, Activity, Settings, Sun, Moon, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Automations", icon: Zap },
  { label: "Connected Accounts", icon: Link2 },
  { label: "Activity Logs", icon: Activity },
  { label: "Settings", icon: Settings },
] as const

interface SidebarProps {
  active: string
  onNavigate: (label: string) => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Sidebar({ active, onNavigate, isDark, onToggleTheme }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r p-5 transition-colors duration-300",
        isDark ? "border-white/10 bg-black" : "border-black/10 bg-white",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-1">
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] shadow-[0_0_12px_#40E0D0]" />
        <span className="bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] bg-clip-text text-lg font-bold tracking-tight text-transparent">
          AUTOWAY
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-[#40E0D0]/15 to-[#7B61FF]/15 text-white shadow-[inset_0_0_0_1px_rgba(64,224,208,0.4)]"
                  : isDark
                    ? "text-white/60 hover:bg-white/5 hover:text-white"
                    : "text-black/60 hover:bg-black/5 hover:text-black",
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] transition-colors",
                  isActive ? "text-[#40E0D0]" : "",
                )}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        className={cn(
          "mb-3 flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors duration-200",
          isDark
            ? "border-white/10 text-white/70 hover:bg-white/5"
            : "border-black/10 text-black/70 hover:bg-black/5",
        )}
        aria-label="Toggle theme"
      >
        <span className="flex items-center gap-3">
          {isDark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
        <span
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors duration-300",
            isDark ? "bg-[#7B61FF]" : "bg-black/20",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300",
              isDark ? "translate-x-[18px]" : "translate-x-0.5",
            )}
          />
        </span>
      </button>

      {/* User profile card */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300",
          isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.03]",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] text-sm font-bold text-black">
          AV
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn("truncate text-sm font-semibold", isDark ? "text-white" : "text-black")}>Alex Vega</p>
          <button className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-[#40E0D0]">
            <LogOut className="h-3 w-3" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  )
}
