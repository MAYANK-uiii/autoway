"use client"

import { useState } from "react"
import { Bell, Moon, ShieldCheck, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

interface SettingsPageProps {
  isDark: boolean
  onToggleTheme: () => void
}

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean
  onToggle: () => void
  label: string
}) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-[#7B61FF]" : "bg-white/20",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
          on ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

export function SettingsPage({ isDark, onToggleTheme }: SettingsPageProps) {
  const { user } = useAuth()
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [pushAlerts, setPushAlerts] = useState(false)

  const cardClass = cn(
    "rounded-2xl border p-6",
    isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.03]",
  )
  const rowClass = cn(
    "flex items-center justify-between gap-4 py-3",
  )
  const labelClass = cn("text-sm font-medium", isDark ? "text-white/80" : "text-black/80")
  const subClass = cn("text-xs", isDark ? "text-white/40" : "text-black/40")
  const headingClass = cn("flex items-center gap-2 text-sm font-semibold", isDark ? "text-white" : "text-black")

  return (
    <div className="flex flex-col">
      <header
        className={cn(
          "flex items-center justify-between border-b px-8 py-6",
          isDark ? "border-white/10" : "border-black/10",
        )}
      >
        <div>
          <h1 className={cn("text-2xl font-bold tracking-tight", isDark ? "text-white" : "text-black")}>
            Settings
          </h1>
          <p className={cn("mt-1 text-sm", isDark ? "text-white/50" : "text-black/50")}>
            Manage your account, notifications, and preferences
          </p>
        </div>
      </header>

      <div className="grid gap-6 p-8 lg:grid-cols-2">
        {/* Profile */}
        <div className={cardClass}>
          <h2 className={headingClass}>
            <User className="h-4 w-4 text-[#40E0D0]" />
            Profile
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] text-base font-bold text-black">
              {(user?.name ?? "AUTOWAY User").slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className={cn("truncate text-sm font-semibold", isDark ? "text-white" : "text-black")}>
                {user?.name ?? "AUTOWAY User"}
              </p>
              <p className={cn("truncate", subClass)}>{user?.email ?? "user@autoway.io"}</p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className={cardClass}>
          <h2 className={headingClass}>
            <Moon className="h-4 w-4 text-[#40E0D0]" />
            Appearance
          </h2>
          <div className={rowClass}>
            <div>
              <p className={labelClass}>Dark mode</p>
              <p className={subClass}>Use the dark AUTOWAY theme</p>
            </div>
            <Toggle on={isDark} onToggle={onToggleTheme} label="Toggle dark mode" />
          </div>
        </div>

        {/* Notifications */}
        <div className={cardClass}>
          <h2 className={headingClass}>
            <Bell className="h-4 w-4 text-[#40E0D0]" />
            Notifications
          </h2>
          <div className={rowClass}>
            <div>
              <p className={labelClass}>Email alerts</p>
              <p className={subClass}>Get automation summaries by email</p>
            </div>
            <Toggle on={emailAlerts} onToggle={() => setEmailAlerts((v) => !v)} label="Toggle email alerts" />
          </div>
          <div className={rowClass}>
            <div>
              <p className={labelClass}>Push notifications</p>
              <p className={subClass}>Real-time alerts in your browser</p>
            </div>
            <Toggle on={pushAlerts} onToggle={() => setPushAlerts((v) => !v)} label="Toggle push notifications" />
          </div>
        </div>

        {/* Security */}
        <div className={cardClass}>
          <h2 className={headingClass}>
            <ShieldCheck className="h-4 w-4 text-[#40E0D0]" />
            Security
          </h2>
          <div className={rowClass}>
            <div>
              <p className={labelClass}>Two-factor authentication</p>
              <p className={subClass}>Add an extra layer of protection</p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/60">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
