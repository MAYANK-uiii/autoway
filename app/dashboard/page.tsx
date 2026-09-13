"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ConnectedAccounts } from "@/components/dashboard/connected-accounts"
import { Automations } from "@/components/dashboard/automations"

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true)
  const [active, setActive] = useState("Automations")

  return (
    <div
      className={cn(
        "flex min-h-screen w-full transition-colors duration-300",
        isDark ? "bg-black text-white" : "bg-[#f5f5f7] text-black",
      )}
    >
      <Sidebar
        active={active}
        onNavigate={setActive}
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
      />
      <main className="flex flex-1 flex-col">
        {active === "Automations" ? (
          <Automations isDark={isDark} />
        ) : (
          <ConnectedAccounts isDark={isDark} />
        )}
      </main>
    </div>
  )
}
