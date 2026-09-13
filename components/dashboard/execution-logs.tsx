"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

type LogLevel = "success" | "info" | "warn"

interface LogEntry {
  id: number
  time: string
  platform: string
  message: string
  level: LogLevel
}

const seedLogs: Omit<LogEntry, "id" | "time">[] = [
  { platform: "Instagram", message: "Auto DM sent to @john_doe", level: "success" },
  { platform: "Email", message: "Newsletter delivered to 1,204 subscribers", level: "success" },
  { platform: "WhatsApp", message: "Auto reply queued — awaiting connection", level: "warn" },
  { platform: "Instagram", message: "Scheduled post published to feed", level: "success" },
  { platform: "Email", message: "Drip campaign step 2 triggered", level: "info" },
]

const pool: Omit<LogEntry, "id" | "time">[] = [
  { platform: "Instagram", message: "Auto DM sent to @sarah.k", level: "success" },
  { platform: "Instagram", message: "Auto-replied to comment from @mike_t", level: "success" },
  { platform: "Email", message: "Auto reply sent to lead@acme.com", level: "success" },
  { platform: "WhatsApp", message: "Broadcast delivered to 320 contacts", level: "success" },
  { platform: "Email", message: "Rate limit approaching — throttling sends", level: "warn" },
  { platform: "Instagram", message: "Story mention reshared automatically", level: "info" },
  { platform: "WhatsApp", message: "Scheduled message sent to +1 555 0148", level: "success" },
]

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

const levelColor: Record<LogLevel, string> = {
  success: "text-[#40E0D0]",
  info: "text-[#b3a4ff]",
  warn: "text-amber-400",
}

const levelTag: Record<LogLevel, string> = {
  success: "Success",
  info: "Info",
  warn: "Warning",
}

interface ExecutionLogsProps {
  isDark: boolean
}

export function ExecutionLogs({ isDark }: ExecutionLogsProps) {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    seedLogs.map((l, i) => ({ ...l, id: i, time: now() })),
  )
  const [paused, setPaused] = useState(false)
  const idRef = useRef(seedLogs.length)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      const next = pool[Math.floor(Math.random() * pool.length)]
      setLogs((prev) => [...prev.slice(-40), { ...next, id: idRef.current++, time: now() }])
    }, 2600)
    return () => window.clearInterval(timer)
  }, [paused])

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" })
  }, [logs])

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border",
        isDark ? "border-white/10 bg-[#050505]" : "border-black/10 bg-[#0a0a0a]",
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-[#40E0D0]" />
          <span className="text-sm font-semibold text-white">Live Execution Logs</span>
          <span className="flex items-center gap-1.5 rounded-full bg-[#40E0D0]/15 px-2 py-0.5 text-[11px] font-medium text-[#40E0D0]">
            <span className={cn("h-1.5 w-1.5 rounded-full bg-[#40E0D0]", !paused && "animate-pulse")} />
            {paused ? "Paused" : "Live"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <button
            onClick={() => setPaused((v) => !v)}
            className="ml-2 rounded-md border border-white/15 px-2.5 py-1 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>

      <div ref={feedRef} className="max-h-72 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
        {logs.map((log) => (
          <div key={log.id} className="flex flex-wrap items-baseline gap-x-2 py-0.5">
            <span className="text-white/35">[{log.time}]</span>
            <span className="font-semibold text-white/80">{log.platform}:</span>
            <span className="text-white/70">{log.message}</span>
            <span className="text-white/30">—</span>
            <span className={cn("font-semibold", levelColor[log.level])}>{levelTag[log.level]}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 py-0.5 text-white/40">
          <span className="text-[#40E0D0]">$</span>
          <span className="inline-block h-4 w-2 animate-pulse bg-[#40E0D0]/70" />
        </div>
      </div>
    </div>
  )
}
