"use client"

import { useRef, useState } from "react"
import { Clock, Calendar, Repeat, Save, Rocket, Play, Pause } from "lucide-react"
import { InstagramIcon, WhatsAppIcon } from "@/components/dashboard/brand-icons"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"

type PlatformId = "instagram" | "whatsapp" | "email"

const platforms: { id: PlatformId; label: string; accent: string; icon: React.ReactNode }[] = [
  { id: "instagram", label: "Instagram", accent: "#E1306C", icon: <InstagramIcon className="h-5 w-5" /> },
  { id: "whatsapp", label: "WhatsApp", accent: "#25D366", icon: <WhatsAppIcon className="h-5 w-5" /> },
  { id: "email", label: "Email", accent: "#40E0D0", icon: <Mail className="h-5 w-5" /> },
]

const actionsByPlatform: Record<PlatformId, string[]> = {
  instagram: ["Auto DM", "Schedule Post", "Auto Reply Comment"],
  whatsapp: ["Auto Reply Message", "Broadcast Message", "Schedule Message"],
  email: ["Auto Reply Email", "Schedule Newsletter", "Drip Campaign"],
}

const placeholders = ["{name}", "{handle}", "{date}", "{link}"]

interface AutomationFormProps {
  isDark: boolean
  onDeploy: (workflow: {
    platform: PlatformId
    platformLabel: string
    accent: string
    action: string
    frequency: string
    enabled: boolean
  }) => void
}

export function AutomationForm({ isDark, onDeploy }: AutomationFormProps) {
  const [platform, setPlatform] = useState<PlatformId>("instagram")
  const [action, setAction] = useState(actionsByPlatform.instagram[0])
  const [content, setContent] = useState("")
  const [frequency, setFrequency] = useState<"Daily" | "Interval">("Daily")
  const [time, setTime] = useState("10:30")
  const [interval, setInterval] = useState("6")
  const [durationMode, setDurationMode] = useState<"days" | "continuous">("days")
  const [durationDays, setDurationDays] = useState("7")
  const [enabled, setEnabled] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const activePlatform = platforms.find((p) => p.id === platform)!

  function insertPlaceholder(token: string) {
    const el = textareaRef.current
    if (!el) {
      setContent((c) => c + token)
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    setContent((c) => c.slice(0, start) + token + c.slice(end))
    requestAnimationFrame(() => {
      el.focus()
      el.selectionStart = el.selectionEnd = start + token.length
    })
  }

  function handlePlatformChange(id: PlatformId) {
    setPlatform(id)
    setAction(actionsByPlatform[id][0])
  }

  const labelCls = cn("mb-2 block text-sm font-medium", isDark ? "text-white/80" : "text-black/70")
  const fieldCls = cn(
    "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors",
    isDark
      ? "border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:border-[#40E0D0]/60"
      : "border-black/10 bg-white text-black placeholder:text-black/30 focus:border-[#7B61FF]/60",
  )

  const frequencyLabel = frequency === "Daily" ? `Daily at ${time}` : `Every ${interval}h`

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6",
        isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]",
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-black")}>Automation Setup</h2>
          <p className={cn("text-sm", isDark ? "text-white/50" : "text-black/50")}>
            Configure a new automated workflow
          </p>
        </div>
        {/* Master switch */}
        <button
          onClick={() => setEnabled((v) => !v)}
          className={cn(
            "flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors",
            enabled
              ? "border-[#40E0D0]/40 bg-[#40E0D0]/10"
              : isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-black/10 bg-black/[0.03]",
          )}
          aria-pressed={enabled}
        >
          <span
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold",
              enabled ? "text-[#40E0D0]" : isDark ? "text-white/50" : "text-black/50",
            )}
          >
            {enabled ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {enabled ? "Active" : "Paused"}
          </span>
          <span
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
              enabled ? "bg-gradient-to-r from-[#40E0D0] to-[#7B61FF]" : isDark ? "bg-white/15" : "bg-black/20",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
                enabled ? "translate-x-[22px]" : "translate-x-0.5",
              )}
            />
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {/* Platform selector */}
        <div>
          <span className={labelCls}>Platform</span>
          <div className="grid grid-cols-3 gap-3">
            {platforms.map((p) => {
              const isActive = p.id === platform
              return (
                <button
                  key={p.id}
                  onClick={() => handlePlatformChange(p.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-white"
                      : isDark
                        ? "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/25"
                        : "border-black/10 bg-white text-black/60 hover:border-black/25",
                  )}
                  style={
                    isActive
                      ? { borderColor: `${p.accent}88`, background: `${p.accent}1f`, boxShadow: `0 0 18px ${p.accent}33` }
                      : undefined
                  }
                >
                  <span style={{ color: p.accent }}>{p.icon}</span>
                  {p.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Action type */}
        <div>
          <label htmlFor="action-type" className={labelCls}>
            Action Type
          </label>
          <div className="relative">
            <select
              id="action-type"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className={cn(fieldCls, "cursor-pointer appearance-none pr-10")}
            >
              {actionsByPlatform[platform].map((a) => (
                <option key={a} value={a} className="bg-neutral-900 text-white">
                  {a}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40">▾</span>
          </div>
        </div>

        {/* Content input */}
        <div>
          <label htmlFor="content" className={labelCls}>
            Message Template
          </label>
          <textarea
            id="content"
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder={`Hey {name}, thanks for connecting with us on ${activePlatform.label}!`}
            className={cn(fieldCls, "resize-none")}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={cn("text-xs", isDark ? "text-white/40" : "text-black/40")}>Insert:</span>
            {placeholders.map((token) => (
              <button
                key={token}
                onClick={() => insertPlaceholder(token)}
                className={cn(
                  "rounded-md px-2 py-1 font-mono text-xs transition-colors",
                  isDark
                    ? "bg-[#7B61FF]/15 text-[#b3a4ff] hover:bg-[#7B61FF]/25"
                    : "bg-[#7B61FF]/10 text-[#7B61FF] hover:bg-[#7B61FF]/20",
                )}
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Timer & duration */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className={labelCls}>Frequency</span>
            <div className="grid grid-cols-2 gap-2">
              {(["Daily", "Interval"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all",
                    frequency === f
                      ? "border-[#40E0D0]/50 bg-[#40E0D0]/10 text-[#40E0D0]"
                      : isDark
                        ? "border-white/10 text-white/60 hover:border-white/25"
                        : "border-black/10 text-black/60 hover:border-black/25",
                  )}
                >
                  {f === "Daily" ? <Calendar className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className={labelCls}>{frequency === "Daily" ? "Time" : "Interval (hours)"}</span>
            {frequency === "Daily" ? (
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={cn(fieldCls, "pl-10 [color-scheme:dark]")}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center py-2.5">
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  className="autoway-range w-full"
                  aria-label="Interval in hours"
                />
                <p className={cn("mt-2 text-xs", isDark ? "text-white/50" : "text-black/50")}>Every {interval} hours</p>
              </div>
            )}
          </div>
        </div>

        {/* Duration */}
        <div>
          <span className={labelCls}>Duration</span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDurationMode("days")}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                durationMode === "days"
                  ? "border-[#7B61FF]/50 bg-[#7B61FF]/10 text-[#b3a4ff]"
                  : isDark
                    ? "border-white/10 text-white/60 hover:border-white/25"
                    : "border-black/10 text-black/60 hover:border-black/25",
              )}
            >
              Run for a period
            </button>
            <button
              onClick={() => setDurationMode("continuous")}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                durationMode === "continuous"
                  ? "border-[#7B61FF]/50 bg-[#7B61FF]/10 text-[#b3a4ff]"
                  : isDark
                    ? "border-white/10 text-white/60 hover:border-white/25"
                    : "border-black/10 text-black/60 hover:border-black/25",
              )}
            >
              Run continuously
            </button>
            {durationMode === "days" && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className={cn(fieldCls, "w-20 text-center")}
                />
                <span className={cn("text-sm", isDark ? "text-white/60" : "text-black/60")}>days</span>
              </div>
            )}
          </div>
        </div>

        {/* Deploy */}
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-sm">
            <span className={cn(isDark ? "text-white/40" : "text-black/40")}>Status:</span>
            <span className={cn("font-semibold", enabled ? "text-[#40E0D0]" : "text-white/50")}>
              {enabled ? "Active" : "Paused"}
            </span>
          </div>
          <button
            onClick={() =>
              onDeploy({
                platform,
                platformLabel: activePlatform.label,
                accent: activePlatform.accent,
                action,
                frequency: frequencyLabel,
                enabled,
              })
            }
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all duration-200 hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98]"
          >
            <Save className="h-4 w-4" />
            Save &amp; Deploy Automation
            <Rocket className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export type { PlatformId }
