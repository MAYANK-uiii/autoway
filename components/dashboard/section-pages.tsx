"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Megaphone,
  Send,
  MoreHorizontal,
  Mail,
  BarChart3,
  TrendingUp,
  LifeBuoy,
  MessageSquare,
  BookOpen,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LineChart } from "@/components/dashboard/charts"
import { InstagramIcon, WhatsAppIcon } from "@/components/dashboard/brand-icons"
import { useToast } from "@/components/dashboard/toast"
import { metrics, performanceData, scheduleToday, type Platform, type RangeKey } from "@/lib/dashboard-data"

const card = "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"

function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  if (platform === "instagram") return <InstagramIcon className={className} />
  if (platform === "whatsapp") return <WhatsAppIcon className={className} />
  return <Mail className={className} />
}
function platformColor(p: Platform) {
  return p === "instagram" ? "#E1306C" : p === "whatsapp" ? "#25D366" : "#40E0D0"
}

/* ---------------- Content / Posts ---------------- */

const posts = [
  { id: 1, platform: "instagram" as Platform, title: "Product launch teaser", status: "Published", stat: "8.1K reach" },
  { id: 2, platform: "instagram" as Platform, title: "Behind the scenes reel", status: "Scheduled", stat: "Today 6:00 PM" },
  { id: 3, platform: "whatsapp" as Platform, title: "Flash sale broadcast", status: "Publishing", stat: "2.4K recipients" },
  { id: 4, platform: "email" as Platform, title: "Monthly newsletter", status: "Draft", stat: "Not scheduled" },
  { id: 5, platform: "instagram" as Platform, title: "Customer story carousel", status: "Published", stat: "5.6K reach" },
  { id: 6, platform: "email" as Platform, title: "Welcome sequence", status: "Published", stat: "94% open rate" },
]

export function ContentPage({ onCreatePost }: { onCreatePost: () => void }) {
  const [query, setQuery] = useState("")
  const filtered = posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search content..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#40E0D0]/60"
          />
        </div>
        <button
          onClick={onCreatePost}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Create Post
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className={cn(card, "group overflow-hidden transition-colors hover:border-[#40E0D0]/30")}>
            <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40"
                style={{ color: platformColor(p.platform) }}
              >
                <PlatformIcon platform={p.platform} className="h-6 w-6" />
              </span>
              <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-0.5 text-[11px] font-medium text-white/70">
                {p.status}
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-0.5 text-xs text-white/45">{p.stat}</p>
              </div>
              <button aria-label="More options" className="rounded-lg p-1.5 text-white/40 hover:bg-white/5 hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Scheduler ---------------- */

const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"]
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function SchedulerPage({ onSchedule }: { onSchedule: () => void }) {
  const scheduledSlots: Record<string, { platform: Platform; title: string }> = {
    "Mon-10 AM": { platform: "instagram", title: "Teaser" },
    "Tue-1 PM": { platform: "whatsapp", title: "Broadcast" },
    "Wed-6 PM": { platform: "instagram", title: "Reel" },
    "Fri-11 AM": { platform: "email", title: "Newsletter" },
    "Sat-2 PM": { platform: "instagram", title: "Carousel" },
  }
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {scheduleToday.map((s) => (
            <div key={s.id} className={cn(card, "flex items-center gap-3 px-4 py-2.5")}>
              <span className="text-sm font-semibold text-white/70">{s.time}</span>
              <span style={{ color: platformColor(s.platform) }}>
                <PlatformIcon platform={s.platform} className="h-4 w-4" />
              </span>
              <span className="text-sm text-white/70">{s.title}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onSchedule}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Schedule Content
        </button>
      </div>

      <div className={cn(card, "overflow-x-auto p-5")}>
        <div className="min-w-[720px]">
          <div className="grid grid-cols-8 gap-2">
            <div />
            {weekDays.map((d) => (
              <div key={d} className="pb-2 text-center text-xs font-semibold uppercase tracking-wide text-white/45">
                {d}
              </div>
            ))}
            {hours.map((h) => (
              <div key={h} className="contents">
                <div className="py-3 pr-2 text-right text-[11px] text-white/35">{h}</div>
                {weekDays.map((d) => {
                  const slot = scheduledSlots[`${d}-${h}`]
                  return (
                    <button
                      key={`${d}-${h}`}
                      onClick={onSchedule}
                      className={cn(
                        "flex min-h-[44px] items-center justify-center rounded-lg border text-[11px] transition-colors",
                        slot
                          ? "border-[#40E0D0]/30 bg-gradient-to-br from-[#40E0D0]/15 to-[#7B61FF]/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-transparent hover:border-[#40E0D0]/30 hover:text-white/30",
                      )}
                    >
                      {slot ? (
                        <span className="flex items-center gap-1">
                          <span style={{ color: platformColor(slot.platform) }}>
                            <PlatformIcon platform={slot.platform} className="h-3 w-3" />
                          </span>
                          {slot.title}
                        </span>
                      ) : (
                        "+"
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Campaigns ---------------- */

const campaigns = [
  { id: 1, name: "Summer Sale 2026", channels: ["instagram", "email"] as Platform[], status: "Active", progress: 68, reach: "42.1K" },
  { id: 2, name: "Product Launch", channels: ["instagram", "whatsapp", "email"] as Platform[], status: "Active", progress: 40, reach: "28.4K" },
  { id: 3, name: "Re-engagement Flow", channels: ["whatsapp", "email"] as Platform[], status: "Scheduled", progress: 0, reach: "—" },
  { id: 4, name: "Holiday Giveaway", channels: ["instagram"] as Platform[], status: "Completed", progress: 100, reach: "61.8K" },
]

export function CampaignsPage() {
  const { notify } = useToast()
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-5 sm:p-8">
      <div className="flex items-center justify-end">
        <button
          onClick={() => notify("New campaign builder opening soon")}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98]"
        >
          <Megaphone className="h-4 w-4" /> Create Campaign
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {campaigns.map((c) => (
          <div key={c.id} className={cn(card, "p-5 transition-colors hover:border-[#40E0D0]/30")}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold text-white">{c.name}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  {c.channels.map((ch) => (
                    <span key={ch} style={{ color: platformColor(ch) }}>
                      <PlatformIcon platform={ch} className="h-4 w-4" />
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  c.status === "Active"
                    ? "border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80]"
                    : c.status === "Scheduled"
                      ? "border-[#40E0D0]/30 bg-[#40E0D0]/10 text-[#40E0D0]"
                      : "border-white/15 bg-white/5 text-white/50",
                )}
              >
                {c.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-white/45">
                <span>Progress</span>
                <span>{c.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] transition-all"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-white/45">Total reach</span>
              <span className="text-sm font-semibold text-white">{c.reach}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Inbox ---------------- */

const threads = [
  { id: 1, platform: "instagram" as Platform, name: "@jordan.k", preview: "Is this still available?", time: "2m", unread: true },
  { id: 2, platform: "whatsapp" as Platform, name: "Priya S.", preview: "Thanks for the quick reply!", time: "14m", unread: true },
  { id: 3, platform: "email" as Platform, name: "support@brand.co", preview: "Re: Partnership opportunity", time: "1h", unread: false },
  { id: 4, platform: "instagram" as Platform, name: "@themarkdesign", preview: "Loved your latest reel 🔥", time: "3h", unread: false },
]

export function InboxPage() {
  const { notify } = useToast()
  const [active, setActive] = useState(1)
  const thread = threads.find((t) => t.id === active)!
  const [reply, setReply] = useState("")
  return (
    <div className="mx-auto w-full max-w-7xl p-5 sm:p-8">
      <div className={cn(card, "grid overflow-hidden md:grid-cols-[300px_1fr]")} style={{ minHeight: 480 }}>
        <ul className="border-b border-white/10 md:border-b-0 md:border-r">
          {threads.map((t) => (
            <li key={t.id}>
              <button
                onClick={() => setActive(t.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-white/5 px-4 py-3.5 text-left transition-colors",
                  active === t.id ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
                )}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                  style={{ color: platformColor(t.platform) }}
                >
                  <PlatformIcon platform={t.platform} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-white">{t.name}</p>
                    <span className="text-[11px] text-white/35">{t.time}</span>
                  </div>
                  <p className="truncate text-xs text-white/45">{t.preview}</p>
                </div>
                {t.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-[#40E0D0] shadow-[0_0_6px_#40E0D0]" />}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
              style={{ color: platformColor(thread.platform) }}
            >
              <PlatformIcon platform={thread.platform} className="h-4 w-4" />
            </span>
            <p className="text-sm font-semibold text-white">{thread.name}</p>
          </div>
          <div className="flex-1 space-y-3 p-5">
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white/85">
                {thread.preview}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-3.5 py-2.5 text-sm text-black">
                Hi! Yes it is — I&apos;ll send you the details right away.
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-[#40E0D0]/60">
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && reply.trim()) {
                    notify("Reply sent")
                    setReply("")
                  }
                }}
                placeholder="Type a reply..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
              <button
                onClick={() => {
                  if (reply.trim()) {
                    notify("Reply sent")
                    setReply("")
                  }
                }}
                aria-label="Send reply"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] text-black"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Analytics ---------------- */

const analyticsMetrics: { key: keyof typeof performanceData["7d"]; label: string }[] = [
  { key: "reach", label: "Reach" },
  { key: "engagement", label: "Engagement" },
  { key: "followers", label: "Followers" },
  { key: "posts", label: "Posts" },
]

export function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>("30d")
  const [metric, setMetric] = useState<keyof typeof performanceData["7d"]>("reach")
  const series = performanceData[range]
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.key} className={cn(card, "p-5")}>
            <p className="text-sm text-white/50">{m.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{m.value}</p>
            <p className={cn("mt-1 flex items-center gap-1 text-xs font-medium", m.deltaPositive ? "text-[#4ade80]" : "text-red-400")}>
              <TrendingUp className="h-3.5 w-3.5" /> {m.delta} <span className="text-white/35">{m.sub}</span>
            </p>
          </div>
        ))}
      </div>

      <div className={cn(card, "p-5")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <BarChart3 className="h-4 w-4 text-[#40E0D0]" /> Performance Overview
          </h2>
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
            {(["7d", "30d", "90d"] as RangeKey[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  range === r ? "bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] text-black" : "text-white/55 hover:text-white",
                )}
              >
                {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {analyticsMetrics.map((pm) => (
            <button
              key={pm.key}
              onClick={() => setMetric(pm.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                metric === pm.key ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(64,224,208,0.4)]" : "text-white/45 hover:text-white",
              )}
            >
              {pm.label}
            </button>
          ))}
        </div>
        <LineChart data={series[metric] as number[]} labels={series.labels} height={300} className="mt-4" />
      </div>
    </div>
  )
}

/* ---------------- Help & Support ---------------- */

const faqs = [
  { q: "How do I connect a new social account?", a: "Go to Connected Accounts and click 'Add New Account', then follow the secure authorization flow for your platform." },
  { q: "Can I schedule posts across multiple channels?", a: "Yes. Use Create Post or the Scheduler to publish to Instagram, WhatsApp and Email at once." },
  { q: "How does the AI auto-reply work?", a: "Enable the automation under Automations. Autoway AI reads incoming messages and replies using your configured tone and rules." },
  { q: "Is my data secure?", a: "All connections use encrypted tokens and we never store your account passwords." },
]

export function HelpPage() {
  const { notify } = useToast()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-5 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: BookOpen, title: "Documentation", desc: "Guides & tutorials" },
          { icon: MessageSquare, title: "Live Chat", desc: "Chat with support" },
          { icon: LifeBuoy, title: "Submit a Ticket", desc: "We reply within 24h" },
        ].map((item) => (
          <button
            key={item.title}
            onClick={() => notify(`${item.title} coming soon`)}
            className={cn(card, "flex flex-col items-start gap-3 p-5 text-left transition-colors hover:border-[#40E0D0]/30")}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#40E0D0]/20 to-[#7B61FF]/20 text-[#40E0D0]">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/45">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className={cn(card, "divide-y divide-white/10 overflow-hidden")}>
        <p className="px-5 py-4 text-base font-semibold text-white">Frequently asked questions</p>
        {faqs.map((f, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.03]"
            >
              {f.q}
              <ChevronRight className={cn("h-4 w-4 shrink-0 text-white/40 transition-transform", open === i && "rotate-90")} />
            </button>
            {open === i && <p className="px-5 pb-4 text-sm leading-relaxed text-white/55">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
