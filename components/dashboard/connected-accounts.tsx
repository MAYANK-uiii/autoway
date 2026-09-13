"use client"

import { useState } from "react"
import { Mail, Plus } from "lucide-react"
import { AccountCard } from "@/components/dashboard/account-card"
import { InstagramIcon, WhatsAppIcon, YoutubeIcon, LinkedinIcon } from "@/components/dashboard/brand-icons"
import { cn } from "@/lib/utils"

interface ConnectedAccountsProps {
  isDark: boolean
}

export function ConnectedAccounts({ isDark }: ConnectedAccountsProps) {
  const [instaOn, setInstaOn] = useState(true)
  const [emailOn, setEmailOn] = useState(false)
  const [whatsappConnected, setWhatsappConnected] = useState(false)
  const [youtubeConnected, setYoutubeConnected] = useState(false)
  const [linkedinConnected, setLinkedinConnected] = useState(false)

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
            Connected Accounts
          </h1>
          <p className={cn("mt-1 text-sm", isDark ? "text-white/50" : "text-black/50")}>
            Manage the channels AUTOWAY automates for you
          </p>
        </div>
        <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(64,224,208,0.35)] transition-all duration-200 hover:shadow-[0_0_32px_rgba(123,97,255,0.5)] active:scale-[0.98]">
          <Plus className="h-4 w-4" />
          Add New Account
        </button>
      </header>

      <div className="grid gap-5 p-8 sm:grid-cols-2 xl:grid-cols-3">
        <AccountCard
          isDark={isDark}
          icon={<InstagramIcon className="h-5 w-5" />}
          name="Instagram"
          accent="#E1306C"
          connected
          detail="@user_insta"
          automationOn={instaOn}
          onToggleAutomation={() => setInstaOn((v) => !v)}
        />

        <AccountCard
          isDark={isDark}
          icon={<WhatsAppIcon className="h-5 w-5" />}
          name="WhatsApp"
          accent="#25D366"
          connected={whatsappConnected}
          detail={whatsappConnected ? "+1 555 0148" : undefined}
          automationOn={whatsappConnected}
          onToggleAutomation={() => setWhatsappConnected((v) => !v)}
          onConnect={() => setWhatsappConnected(true)}
          connectLabel="Connect WhatsApp QR"
          connectWithQr
        />

        <AccountCard
          isDark={isDark}
          icon={<Mail className="h-5 w-5" />}
          name="Email"
          accent="#40E0D0"
          connected
          detail="alex@autoway.io"
          automationOn={emailOn}
          onToggleAutomation={() => setEmailOn((v) => !v)}
        />

        <AccountCard
          isDark={isDark}
          icon={<YoutubeIcon className="h-5 w-5" />}
          name="YouTube"
          accent="#FF0000"
          connected={youtubeConnected}
          detail={youtubeConnected ? "AUTOWAY Channel" : undefined}
          automationOn={youtubeConnected}
          onToggleAutomation={() => setYoutubeConnected((v) => !v)}
          onConnect={() => setYoutubeConnected(true)}
          connectLabel="Connect YouTube"
        />

        <AccountCard
          isDark={isDark}
          icon={<LinkedinIcon className="h-5 w-5" />}
          name="LinkedIn"
          accent="#0A66C2"
          connected={linkedinConnected}
          detail={linkedinConnected ? "Alex Vega" : undefined}
          automationOn={linkedinConnected}
          onToggleAutomation={() => setLinkedinConnected((v) => !v)}
          onConnect={() => setLinkedinConnected(true)}
          connectLabel="Connect LinkedIn"
        />

        {/* Add another channel tile */}
        <button
          className={cn(
            "flex min-h-[164px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm font-medium transition-colors",
            isDark
              ? "border-white/15 text-white/40 hover:border-[#40E0D0]/50 hover:text-white/70"
              : "border-black/15 text-black/40 hover:border-[#7B61FF]/50 hover:text-black/70",
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#40E0D0]/20 to-[#7B61FF]/20">
            <Plus className="h-5 w-5" />
          </span>
          Connect another channel
        </button>
      </div>
    </div>
  )
}
