"use client"

import { useState } from "react"
import { X, Image as ImageIcon, Sparkles, Send, CalendarClock } from "lucide-react"
import { cn } from "@/lib/utils"
import { InstagramIcon, WhatsAppIcon } from "@/components/dashboard/brand-icons"
import { Mail } from "lucide-react"
import { useToast } from "@/components/dashboard/toast"

interface CreatePostModalProps {
  open: boolean
  onClose: () => void
}

const channels = [
  { key: "instagram", label: "Instagram", icon: InstagramIcon, accent: "#E1306C" },
  { key: "whatsapp", label: "WhatsApp", icon: WhatsAppIcon, accent: "#25D366" },
  { key: "email", label: "Email", icon: Mail, accent: "#40E0D0" },
]

export function CreatePostModal({ open, onClose }: CreatePostModalProps) {
  const { notify } = useToast()
  const [selected, setSelected] = useState<string[]>(["instagram"])
  const [text, setText] = useState("")
  const [busy, setBusy] = useState(false)

  if (!open) return null

  const toggle = (key: string) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  const generate = () => {
    setText(
      "Big things are coming to AUTOWAY. Automate your Instagram, WhatsApp and Email in one place and grow on autopilot. #automation #socialmedia",
    )
    notify("AI caption generated")
  }

  const submit = (schedule: boolean) => {
    if (!text.trim() || selected.length === 0) {
      notify("Add content and pick at least one channel")
      return
    }
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      onClose()
      setText("")
      notify(schedule ? "Post scheduled successfully" : "Post published successfully")
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create post"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
        style={{ animation: "autoway-fade-up 0.25s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#40E0D0]/20 blur-3xl"
        />
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-base font-semibold text-white">Create Post</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative space-y-5 p-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">Publish to</p>
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => {
                const on = selected.includes(c.key)
                return (
                  <button
                    key={c.key}
                    onClick={() => toggle(c.key)}
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

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-white/40">Content</p>
              <button
                onClick={generate}
                className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-[#40E0D0] transition-colors hover:bg-white/10"
              >
                <Sparkles className="h-3.5 w-3.5" /> Generate with AI
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="What do you want to share?"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#40E0D0]/60"
            />
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-4 text-sm text-white/40 transition-colors hover:border-[#40E0D0]/40 hover:text-white/70">
            <ImageIcon className="h-4 w-4" /> Add media
          </button>
        </div>

        <div className="relative flex flex-col-reverse gap-2 border-t border-white/10 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={() => submit(true)}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/5 disabled:opacity-60"
          >
            <CalendarClock className="h-4 w-4" /> Schedule
          </button>
          <button
            onClick={() => submit(false)}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98] disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {busy ? "Publishing..." : "Publish now"}
          </button>
        </div>
      </div>
    </div>
  )
}
