"use client"

import { ExecutionLogs } from "@/components/dashboard/execution-logs"
import { cn } from "@/lib/utils"

interface ActivityLogsPageProps {
  isDark: boolean
}

export function ActivityLogsPage({ isDark }: ActivityLogsPageProps) {
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
            Activity Logs
          </h1>
          <p className={cn("mt-1 text-sm", isDark ? "text-white/50" : "text-black/50")}>
            Real-time stream of every automated action AUTOWAY runs
          </p>
        </div>
      </header>

      <div className="p-8">
        <ExecutionLogs isDark={isDark} />
      </div>
    </div>
  )
}
