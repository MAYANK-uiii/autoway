"use client"

import type { ReactNode } from "react"
import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccountCardProps {
  icon: ReactNode
  name: string
  accent: string
  connected: boolean
  detail?: string
  automationOn?: boolean
  onToggleAutomation?: () => void
  onManage?: () => void
  onConnect?: () => void
  connectLabel?: string
  connectWithQr?: boolean
  isDark: boolean
}

export function AccountCard({
  icon,
  name,
  accent,
  connected,
  detail,
  automationOn,
  onToggleAutomation,
  onManage,
  onConnect,
  connectLabel = "Connect",
  connectWithQr,
  isDark,
}: AccountCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-5 transition-all duration-300",
        isDark
          ? "border-white/10 bg-white/[0.03] hover:border-white/20"
          : "border-black/10 bg-black/[0.02] hover:border-black/20",
      )}
      style={{ boxShadow: `inset 0 0 0 1px transparent` }}
    >
      {/* glow on hover */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
            style={{ background: `${accent}1f`, boxShadow: `inset 0 0 0 1px ${accent}55` }}
          >
            <span style={{ color: accent }}>{icon}</span>
          </div>
          <div>
            <p className={cn("font-semibold", isDark ? "text-white" : "text-black")}>{name}</p>
            {detail ? (
              <p className={cn("text-sm", isDark ? "text-white/50" : "text-black/50")}>{detail}</p>
            ) : (
              <p className="text-sm text-white/30">Not linked</p>
            )}
          </div>
        </div>

        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            connected
              ? "bg-[#40E0D0]/15 text-[#40E0D0]"
              : isDark
                ? "bg-white/10 text-white/50"
                : "bg-black/10 text-black/50",
          )}
        >
          <span
            className={cn("h-1.5 w-1.5 rounded-full", connected ? "bg-[#40E0D0]" : "bg-white/40")}
          />
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Footer actions */}
      {connected ? (
        <div
          className={cn(
            "flex items-center justify-between border-t pt-4",
            isDark ? "border-white/10" : "border-black/10",
          )}
        >
          <button
            onClick={onToggleAutomation}
            className="flex items-center gap-2.5 text-sm"
            aria-pressed={automationOn}
          >
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
                automationOn ? "bg-gradient-to-r from-[#40E0D0] to-[#7B61FF]" : isDark ? "bg-white/15" : "bg-black/20",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
                  automationOn ? "translate-x-[22px]" : "translate-x-0.5",
                )}
              />
            </span>
            <span className={cn(isDark ? "text-white/70" : "text-black/70")}>
              Automation {automationOn ? "On" : "Off"}
            </span>
          </button>

          <button
            onClick={onManage}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              isDark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-black/70 hover:bg-black/10 hover:text-black",
            )}
          >
            Manage
          </button>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl border border-transparent bg-gradient-to-r from-[#40E0D0]/20 to-[#7B61FF]/20 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:from-[#40E0D0]/30 hover:to-[#7B61FF]/30",
            "shadow-[inset_0_0_0_1px_rgba(123,97,255,0.4)]",
          )}
        >
          {connectWithQr && <QrCode className="h-4 w-4" />}
          {connectLabel}
        </button>
      )}
    </div>
  )
}
