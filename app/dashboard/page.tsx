"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ConnectedAccounts } from "@/components/dashboard/connected-accounts"

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true)
  const [active, setActive] = useState("Connected Accounts")

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
        <ConnectedAccounts isDark={isDark} />
      </main>
    </div>
  )
}
