"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { ToastProvider } from "@/components/dashboard/toast"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { Overview } from "@/components/dashboard/overview"
import { AiAssistant } from "@/components/dashboard/ai-assistant"
import { CreatePostModal } from "@/components/dashboard/create-post-modal"
import { ScheduleModal } from "@/components/dashboard/schedule-modal"
import {
  ContentPage,
  SchedulerPage,
  CampaignsPage,
  InboxPage,
  AnalyticsPage,
  HelpPage,
} from "@/components/dashboard/section-pages"
import { ConnectedAccounts } from "@/components/dashboard/connected-accounts"
import { Automations } from "@/components/dashboard/automations"
import { SettingsPage } from "@/components/dashboard/settings-page"

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  Overview: { title: "Good evening, Mayank 👋", subtitle: "Here's what's happening with your social automation." },
  Content: { title: "Content", subtitle: "Create, manage and review all of your posts." },
  Scheduler: { title: "Scheduler", subtitle: "Plan your content across the week." },
  Automations: { title: "Automations", subtitle: "Set your channels on autopilot." },
  Campaigns: { title: "Campaigns", subtitle: "Run multi-channel campaigns that convert." },
  Inbox: { title: "Inbox", subtitle: "All your conversations in one place." },
  Analytics: { title: "Analytics", subtitle: "Measure reach, engagement and growth." },
  "Connected Accounts": { title: "Connected Accounts", subtitle: "Manage the channels AUTOWAY automates for you." },
  Settings: { title: "Settings", subtitle: "Manage your account and preferences." },
  "Help & Support": { title: "Help & Support", subtitle: "Guides, FAQs and ways to reach us." },
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [active, setActive] = useState("Overview")
  const [menuOpen, setMenuOpen] = useState(false)
  const [postOpen, setPostOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login")
  }, [isLoading, user, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-6 w-6 animate-spin text-white/60" />
      </div>
    )
  }

  const meta = pageMeta[active] ?? pageMeta.Overview

  const renderSection = () => {
    switch (active) {
      case "Overview":
        return <Overview onNavigate={setActive} onCreatePost={() => setPostOpen(true)} onSchedule={() => setScheduleOpen(true)} />
      case "Content":
        return <ContentPage onCreatePost={() => setPostOpen(true)} />
      case "Scheduler":
        return <SchedulerPage onSchedule={() => setScheduleOpen(true)} />
      case "Automations":
        return <Automations isDark />
      case "Campaigns":
        return <CampaignsPage />
      case "Inbox":
        return <InboxPage />
      case "Analytics":
        return <AnalyticsPage />
      case "Connected Accounts":
        return <ConnectedAccounts isDark />
      case "Settings":
        return <SettingsPage isDark onToggleTheme={() => {}} />
      case "Help & Support":
        return <HelpPage />
      default:
        return <Overview onNavigate={setActive} onCreatePost={() => setPostOpen(true)} onSchedule={() => setScheduleOpen(true)} />
    }
  }

  // The Automations, Connected Accounts and Settings components render their own headers.
  const hidesTopbar = active === "Automations" || active === "Connected Accounts" || active === "Settings"

  return (
    <ToastProvider>
      <div className="flex min-h-screen w-full bg-black text-white">
        <Sidebar active={active} onNavigate={setActive} open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main className="flex min-w-0 flex-1 flex-col">
          {!hidesTopbar && (
            <Topbar title={meta.title} subtitle={meta.subtitle} onOpenMenu={() => setMenuOpen(true)} onNavigate={setActive} />
          )}
          <div className="flex-1">{renderSection()}</div>
        </main>

        <AiAssistant />
        <CreatePostModal open={postOpen} onClose={() => setPostOpen(false)} />
        <ScheduleModal open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
      </div>
    </ToastProvider>
  )
}
