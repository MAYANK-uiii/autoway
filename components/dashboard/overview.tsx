"use client"

import { useState } from "react"
import {
  Plus,
  CalendarClock,
  Zap,
  Megaphone,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Pencil,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sparkline, MiniBars, LineChart } from "@/components/dashboard/charts"
import { InstagramIcon, WhatsAppIcon } from "@/components/dashboard/brand-icons"
import { Tooltip } from "@/components/dashboard/tooltip"
import { useToast } from "@/components/dashboard/toast"
import {
  metrics,
  accounts,
  scheduleToday,
  automationItems,
  activityFeed,
  performanceData,
  type Platform,
  type RangeKey,
} from "@/lib/dashboard-data"

function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  if (platform === "instagram") return <InstagramIcon className={className} />
  if (platform === "whatsapp") return <WhatsAppIcon className={className} />
  return <Mail className={className} />
}

function platformColor(platform: Platform) {
  if (platform === "instagram") return "#E1306C"
  if (platform === "whatsapp") return "#25D366"
  return "#40E0D0"
}

interface OverviewProps {
  onNavigate: (label: string) => void
  onCreatePost: () => void
  onSchedule: () => void
}

const rangeTabs: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7 Days" },
  { key: "30d", label: "30 Days" },
  { key: "90d", label: "90 Days" },
]

const perfMetrics: { key: keyof typeof performanceData["7d"]; label: string }[] = [
  { key: "reach", label: "Reach" },
  { key: "engagement", label: "Engagement" },
  { key: "followers", label: "Followers" },
  { key: "posts", label: "Posts" },
]

const card = "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"

function StatusBadge({ status }: { status: "scheduled" | "publishing" | "draft" }) {
  const map = {
    scheduled: { label: "Scheduled", cls: "border-[#40E0D0]/30 bg-[#40E0D0]/10 text-[#40E0D0]" },
    publishing: { label: "Publishing", cls: "border-[#7B61FF]/30 bg-[#7B61FF]/10 text-[#b3a4ff]" },
    draft: { label: "Draft", cls: "border-white/15 bg-white/5 text-white/50" },
  }
  const s = map[status]
  return <span className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium", s.cls)}>{s.label}</span>
}

export function Overview({ onNavigate, onCreatePost, onSchedule }: OverviewProps) {
  const { notify } = useToast()
  const [range, setRange] = useState<RangeKey>("7d")
  const [metric, setMetric] = useState<keyof typeof performanceData["7d"]>("reach")
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(automationItems.map((a) => [a.id, a.active])),
  )

  const series = performanceData[range]
  const activeData = series[metric] as number[]

  const quickActions = [
    { label: "Create Post", icon: Plus, primary: true, onClick: onCreatePost },
    { label: "Schedule Content", icon: CalendarClock, onClick: onSchedule },
    { label: "Create Automation", icon: Zap, onClick: () => onNavigate("Automations") },
    { label: "Create Campaign", icon: Megaphone, onClick: () => onNavigate("Campaigns") },
  ]

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-5 sm:p-8">
      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.key}
            className={cn(card, "group relative overflow-hidden p-5 transition-all duration-300 hover:border-[#40E0D0]/30")}
            style={{ animation: `autoway-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both` }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#40E0D0]/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            />
            <p className="text-sm text-white/50">{m.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <div>
                <p className="text-3xl font-bold tracking-tight text-white">{m.value}</p>
                <p
                  className={cn(
                    "mt-1 flex items-center gap-1 text-xs font-medium",
                    m.deltaPositive ? "text-[#4ade80]" : "text-red-400",
                  )}
                >
                  {m.deltaPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {m.delta} <span className="text-white/35">{m.sub}</span>
                </p>
              </div>
              <div className="h-10 w-24 shrink-0">
                {m.kind === "bar" ? (
                  <MiniBars data={m.data} className="h-full w-full" />
                ) : (
                  <Sparkline data={m.data} className="h-full w-full" />
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick actions */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((a) => (
          <button
            key={a.label}
            onClick={a.onClick}
            className={cn(
              "group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
              a.primary
                ? "border-transparent bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] text-black shadow-[0_0_28px_rgba(64,224,208,0.35)] hover:shadow-[0_0_40px_rgba(123,97,255,0.5)]"
                : "border-white/10 bg-white/[0.03] text-white hover:border-[#40E0D0]/40 hover:bg-white/[0.06]",
            )}
          >
            <span className="flex items-center gap-2.5">
              <a.icon className="h-[18px] w-[18px]" />
              {a.label}
            </span>
            <ArrowRight className="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
          </button>
        ))}
      </section>

      {/* Analytics + Activity */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className={cn(card, "p-5 lg:col-span-2")}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-white">Performance Overview</h2>
              <p className="text-xs text-white/45">Track how your channels are growing</p>
            </div>
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
              {rangeTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setRange(t.key)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    range === t.key ? "bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] text-black" : "text-white/55 hover:text-white",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {perfMetrics.map((pm) => (
              <button
                key={pm.key}
                onClick={() => setMetric(pm.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  metric === pm.key
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(64,224,208,0.4)]"
                    : "text-white/45 hover:text-white",
                )}
              >
                {pm.label}
              </button>
            ))}
          </div>

          <LineChart data={activeData} labels={series.labels} className="mt-4" />
        </div>

        {/* Recent activity */}
        <div className={cn(card, "flex flex-col p-5")}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            <span className="h-2 w-2 rounded-full bg-[#40E0D0] shadow-[0_0_8px_#40E0D0]" />
          </div>
          <ul className="mt-4 flex-1 space-y-4">
            {activityFeed.map((a) => (
              <li key={a.id} className="flex gap-3">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                  style={{ color: platformColor(a.platform) }}
                >
                  <PlatformIcon platform={a.platform} className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-white/85">{a.text}</p>
                  <p className="mt-0.5 text-xs text-white/40">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Schedule + Accounts */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming schedule */}
        <div className={cn(card, "p-5 lg:col-span-2")}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Upcoming Schedule</h2>
            <button
              onClick={() => onNavigate("Scheduler")}
              className="flex items-center gap-1 text-xs font-medium text-[#40E0D0] transition-colors hover:text-white"
            >
              View Calendar <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-white/40">Today</p>
          <ul className="mt-3 space-y-3">
            {scheduleToday.map((s) => (
              <li
                key={s.id}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-[#40E0D0]/30"
              >
                <span className="w-16 shrink-0 text-sm font-semibold text-white/70">{s.time}</span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                  style={{ color: platformColor(s.platform) }}
                >
                  <PlatformIcon platform={s.platform} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{s.title}</p>
                  <p className="truncate text-xs text-white/40">{s.type}</p>
                </div>
                <StatusBadge status={s.status} />
                <Tooltip label="Edit">
                  <button
                    onClick={() => notify(`Editing "${s.title}"`)}
                    aria-label={`Edit ${s.title}`}
                    className="rounded-lg p-2 text-white/40 opacity-0 transition-all hover:bg-white/5 hover:text-white group-hover:opacity-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>

        {/* Connected accounts */}
        <div className={cn(card, "p-5")}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Connected Accounts</h2>
            <button
              onClick={() => onNavigate("Connected Accounts")}
              className="text-xs font-medium text-[#40E0D0] transition-colors hover:text-white"
            >
              Manage
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {accounts.map((acc) => (
              <li key={acc.platform} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                  style={{ color: acc.accent }}
                >
                  <PlatformIcon platform={acc.platform} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{acc.name}</p>
                  <p className="truncate text-xs text-white/40">{acc.handle}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="flex items-center gap-1 text-[11px] font-medium text-[#4ade80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                    Connected
                  </span>
                  <span className="text-[11px] text-white/35">{acc.lastActivity}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Active automations */}
      <section className={cn(card, "p-5")}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Active Automations</h2>
          <button
            onClick={() => onNavigate("Automations")}
            className="flex items-center gap-1 text-xs font-medium text-[#40E0D0] transition-colors hover:text-white"
          >
            Manage all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {automationItems.map((a) => {
            const on = toggles[a.id]
            return (
              <div
                key={a.id}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-[#40E0D0]/30"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                    style={{ color: platformColor(a.platform) }}
                  >
                    <PlatformIcon platform={a.platform} className="h-5 w-5" />
                  </span>
                  <button
                    role="switch"
                    aria-checked={on}
                    aria-label={`Toggle ${a.title}`}
                    onClick={() => {
                      setToggles((prev) => ({ ...prev, [a.id]: !prev[a.id] }))
                      notify(`${a.title} ${on ? "paused" : "activated"}`)
                    }}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors duration-300",
                      on ? "bg-gradient-to-r from-[#40E0D0] to-[#7B61FF]" : "bg-white/15",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
                        on ? "translate-x-[22px]" : "translate-x-0.5",
                      )}
                    />
                  </button>
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{a.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs">
                  <span className={cn("h-1.5 w-1.5 rounded-full", on ? "bg-[#4ade80] shadow-[0_0_6px_#4ade80]" : "bg-white/30")} />
                  <span className={on ? "text-[#4ade80]" : "text-white/40"}>{on ? "Active" : "Paused"}</span>
                </p>
                <p className="mt-2 text-xs text-white/45">{a.stat}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
