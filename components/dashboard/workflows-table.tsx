"use client"

import type { ReactNode } from "react"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export type WorkflowStatus = "Running" | "Scheduled" | "Paused"

export interface Workflow {
  id: string
  platformLabel: string
  accent: string
  icon: ReactNode
  action: string
  frequency: string
  status: WorkflowStatus
  enabled: boolean
}

const statusStyles: Record<WorkflowStatus, { dot: string; text: string; bg: string }> = {
  Running: { dot: "bg-[#40E0D0]", text: "text-[#40E0D0]", bg: "bg-[#40E0D0]/15" },
  Scheduled: { dot: "bg-[#7B61FF]", text: "text-[#b3a4ff]", bg: "bg-[#7B61FF]/15" },
  Paused: { dot: "bg-white/40", text: "text-white/50", bg: "bg-white/10" },
}

interface WorkflowsTableProps {
  workflows: Workflow[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  isDark: boolean
}

export function WorkflowsTable({ workflows, onToggle, onDelete, isDark }: WorkflowsTableProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border",
        isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]",
      )}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-black")}>Active Workflows</h2>
          <p className={cn("text-sm", isDark ? "text-white/50" : "text-black/50")}>
            {workflows.length} automation{workflows.length === 1 ? "" : "s"} configured
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className={cn("border-y", isDark ? "border-white/10 text-white/40" : "border-black/10 text-black/40")}>
              <th className="px-6 py-3 font-medium">Platform</th>
              <th className="px-6 py-3 font-medium">Action</th>
              <th className="px-6 py-3 font-medium">Frequency</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((w) => {
              const s = statusStyles[w.status]
              return (
                <tr
                  key={w.id}
                  className={cn(
                    "border-b transition-colors",
                    isDark ? "border-white/5 hover:bg-white/[0.03]" : "border-black/5 hover:bg-black/[0.03]",
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ background: `${w.accent}1f`, color: w.accent }}
                      >
                        {w.icon}
                      </span>
                      <span className={cn("font-medium", isDark ? "text-white" : "text-black")}>{w.platformLabel}</span>
                    </div>
                  </td>
                  <td className={cn("px-6 py-4", isDark ? "text-white/70" : "text-black/70")}>{w.action}</td>
                  <td className={cn("px-6 py-4", isDark ? "text-white/70" : "text-black/70")}>{w.frequency}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                        s.bg,
                        s.text,
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot, w.status === "Running" && "animate-pulse")} />
                      {w.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => onToggle(w.id)} aria-pressed={w.enabled} aria-label={`Toggle ${w.platformLabel} ${w.action}`}>
                        <span
                          className={cn(
                            "relative block h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
                            w.enabled
                              ? "bg-gradient-to-r from-[#40E0D0] to-[#7B61FF]"
                              : isDark
                                ? "bg-white/15"
                                : "bg-black/20",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300",
                              w.enabled ? "translate-x-[22px]" : "translate-x-0.5",
                            )}
                          />
                        </span>
                      </button>
                      <button
                        onClick={() => onDelete(w.id)}
                        className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Delete ${w.platformLabel} ${w.action}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {workflows.length === 0 && (
              <tr>
                <td colSpan={5} className={cn("px-6 py-10 text-center text-sm", isDark ? "text-white/40" : "text-black/40")}>
                  No workflows yet. Configure one above to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
