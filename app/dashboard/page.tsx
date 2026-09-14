"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ConnectedAccounts } from "@/components/dashboard/connected-accounts"
import { Automations } from "@/components/dashboard/automations"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isDark, setIsDark] = useState(true)
  const [active, setActive] = useState("Automations")

  // Protect the dashboard: unauthenticated visitors are sent to /login.
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [isLoading, user, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-6 w-6 animate-spin text-white/60" />
      </div>
    )
  }

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
