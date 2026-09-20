"use client"

import { cn } from "@/lib/utils"

interface TooltipProps {
  label: string
  children: React.ReactNode
  className?: string
}

/**
 * Lightweight hover/focus tooltip. Wrap an interactive element and pass a label.
 */
export function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={cn("group/tt relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#0a0a0a] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-150 group-hover/tt:translate-y-0 group-hover/tt:opacity-100 group-focus-within/tt:translate-y-0 group-focus-within/tt:opacity-100"
      >
        {label}
      </span>
    </span>
  )
}
