"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeatureGrid } from "@/components/feature-grid"
import { StatsBand } from "@/components/stats-band"
import { ChannelMarquee } from "@/components/channel-marquee"
import { SignUpModal } from "@/components/signup-modal"
import { Reveal } from "@/components/reveal"

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader onGetStarted={openModal} />
      <main>
        <HeroSection onStartTrial={openModal} />
        <ChannelMarquee />
        <StatsBand />
        <FeatureGrid />
        <SiteFooter onGetStarted={openModal} />
      </main>
      <SignUpModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

function SiteFooter({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section id="pricing" className="relative overflow-hidden px-6 py-24">
      <div
        aria-hidden="true"
        className="autoway-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
      />
      <Reveal className="relative mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0a0a0a] p-10 text-center md:p-14">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Ready to put your socials on{" "}
          <span
            className="text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #40E0D0, #7B61FF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            autopilot
          </span>
          ?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          Join thousands of creators and teams automating their growth with AUTOWAY.
        </p>
        <button
          onClick={onGetStarted}
          className="mt-8 rounded-xl px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
        >
          Start Free Trial
        </button>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} AUTOWAY. All rights reserved.
        </p>
      </Reveal>
    </section>
  )
}
