"use client"

import { useState } from "react"
import { X, CalendarClock, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { InstagramIcon, WhatsAppIcon } from "@/components/dashboard/brand-icons"
import { Mail } from "lucide-react"
import { useToast } from "@/components/dashboard/toast"

interface ScheduleModalProps {
  open: boolean
  onClose: () => void
}

const channels = [
  { key: "instagram", label: "Instagram", icon: InstagramIcon, accent: "#E1306C" },
  { key: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon, accent: "#25D366" },
  { key: "email", label: "Email", icon: Mail, accent: "#40E0D0" },
]

const times = ["09:00", "10:30", "12:00", "13:30", "15:00", "18:00", "20:00"]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function ScheduleModal({ open, onClose }: ScheduleModalProps) {
  const { notify } = useToast()
  const [channel, setChannel] = useState("instagram")
  const [date, setDate] = useState(todayISO())
  const [time, setTime] = useState("10:30")
  const [title, setTitle] = useState("")
  const [busy, setBusy] = useState(false)

  if (!open) return null

  const submit = () => {
    if (!title.trim()) {
      notify("Add a title for your scheduled content")
      return
    }
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      onClose()
      setTitle("")
      notify(`Scheduled for ${date} at ${time}`)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Schedule content"
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
        style={{ animation: "autoway-fade-up 0.25s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-[#7B61FF]/20 blur-3xl"
        />
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <CalendarClock className="h-4 w-4 text-[#40E0D0]" /> Schedule Content
          </h2>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative space-y-5 p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/40">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekend promo reel"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#40E0D0]/60"
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">Channel</p>
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => {
                const on = channel === c.key
                return (
                  <button
                    key={c.key}
                    onClick={() => setChannel(c.key)}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                      on ? "border-[#40E0D0]/50 bg-[#40E0D0]/10 text-white" : "border-white/10 text-white/50 hover:text-white",
                    )}
                  >
                    <c.icon className="h-4 w-4" style={{ color: on ? c.accent : undefined }} />
                    {c.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/40">Date</label>
              <input
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-colors [color-scheme:dark] focus:border-[#40E0D0]/60"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/40">Time</label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors [color-scheme:dark] focus:border-[#40E0D0]/60"
                >
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-end gap-2 border-t border-white/10 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={busy}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98] disabled:opacity-60"
          >
            <CalendarClock className="h-4 w-4" /> {busy ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  )
}
