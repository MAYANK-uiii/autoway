"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import { AutomationForm } from "@/components/dashboard/automation-form"
import { WorkflowsTable, type Workflow, type WorkflowStatus } from "@/components/dashboard/workflows-table"
import { ExecutionLogs } from "@/components/dashboard/execution-logs"
import { InstagramIcon, WhatsAppIcon } from "@/components/dashboard/brand-icons"
import { cn } from "@/lib/utils"

function platformIcon(label: string): ReactNode {
  if (label === "Instagram") return <InstagramIcon className="h-4 w-4" />
  if (label === "WhatsApp") return <WhatsAppIcon className="h-4 w-4" />
  return <Mail className="h-4 w-4" />
}

const initialWorkflows: Workflow[] = [
  {
    id: "wf-1",
    platformLabel: "Instagram",
    accent: "#E1306C",
    icon: <InstagramIcon className="h-4 w-4" />,
    action: "Auto DM",
    frequency: "Daily at 10:30",
    status: "Running",
    enabled: true,
  },
  {
    id: "wf-2",
    platformLabel: "Email",
    accent: "#40E0D0",
    icon: <Mail className="h-4 w-4" />,
    action: "Schedule Newsletter",
    frequency: "Every 12h",
    status: "Scheduled",
    enabled: true,
  },
  {
    id: "wf-3",
    platformLabel: "WhatsApp",
    accent: "#25D366",
    icon: <WhatsAppIcon className="h-4 w-4" />,
    action: "Auto Reply Message",
    frequency: "Continuous",
    status: "Paused",
    enabled: false,
  },
]

interface AutomationsProps {
  isDark: boolean
}

export function Automations({ isDark }: AutomationsProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows)

  function handleDeploy(w: {
    platform: string
    platformLabel: string
    accent: string
    action: string
    frequency: string
    enabled: boolean
  }) {
    const status: WorkflowStatus = w.enabled
      ? w.frequency.startsWith("Daily") || w.frequency.startsWith("Every")
        ? "Running"
        : "Scheduled"
      : "Paused"
    setWorkflows((prev) => [
      {
        id: `wf-${Date.now()}`,
        platformLabel: w.platformLabel,
        accent: w.accent,
        icon: platformIcon(w.platformLabel),
        action: w.action,
        frequency: w.frequency,
        status,
        enabled: w.enabled,
      },
      ...prev,
    ])
  }

  function handleToggle(id: string) {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, enabled: !w.enabled, status: !w.enabled ? "Running" : "Paused" }
          : w,
      ),
    )
  }

  function handleDelete(id: string) {
    setWorkflows((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header
        className={cn(
          "flex items-center justify-between border-b px-8 py-6",
          isDark ? "border-white/10" : "border-black/10",
        )}
      >
        <div>
          <h1 className={cn("text-2xl font-bold tracking-tight", isDark ? "text-white" : "text-black")}>
            Automations &amp; Workflow Builder
          </h1>
          <p className={cn("mt-1 text-sm", isDark ? "text-white/50" : "text-black/50")}>
            Build, schedule, and monitor your automated actions
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 p-8">
        <AutomationForm isDark={isDark} onDeploy={handleDeploy} />
        <WorkflowsTable workflows={workflows} onToggle={handleToggle} onDelete={handleDelete} isDark={isDark} />
        <ExecutionLogs isDark={isDark} />
      </div>
    </div>
  )
}
