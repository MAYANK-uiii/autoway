"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, Sparkles } from "lucide-react"

interface HeroSectionProps {
  onStartTrial: () => void
}

export function HeroSection({ onStartTrial }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="autoway-pulse-glow pointer-events-none absolute -top-40 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "#40E0D0" }}
      />
      <div
        aria-hidden="true"
        className="autoway-pulse-glow pointer-events-none absolute -top-20 right-1/4 h-96 w-96 translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "#7B61FF", animationDelay: "2.5s" }}
      />
      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-[#40E0D0]" />
            AI-powered social automation
          </div>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Automate Your{" "}
            <span
              className="autoway-gradient-animate text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #40E0D0, #7B61FF, #40E0D0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              Socials
            </span>{" "}
            seamlessly
          </h1>

          <p className="mx-auto mt-6 max-w-md text-pretty text-lg text-white/60 lg:mx-0">
            Schedule posts, auto-reply to DMs, and run email campaigns across Instagram,
            WhatsApp, and Email — all from one intelligent dashboard.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={onStartTrial}
              className="w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105 sm:w-auto"
              style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
            >
              Start Free Trial
            </button>
          </div>

          <p className="mt-4 text-xs text-white/40">
            No credit card required · 14-day free trial
          </p>
        </div>

        <SocialPreviewCard />
      </div>
    </section>
  )
}

function SocialPreviewCard() {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(2481)

  const toggleLike = () => {
    setLiked((prev) => {
      setLikes((n) => (prev ? n - 1 : n + 1))
      return !prev
    })
  }

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden="true"
        className="autoway-pulse-glow absolute -inset-1 rounded-3xl opacity-40 blur-xl"
        style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
      />

      {/* floating channel badges */}
      <div className="autoway-float absolute -left-6 top-10 z-10 hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 px-3 py-2 shadow-xl backdrop-blur sm:flex sm:items-center sm:gap-2">
        <MessageCircle className="h-4 w-4 text-[#40E0D0]" />
        <span className="text-xs font-medium text-white/80">DM auto-replied</span>
      </div>
      <div
        className="autoway-float-slow absolute -right-4 bottom-24 z-10 hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 px-3 py-2 shadow-xl backdrop-blur sm:flex sm:items-center sm:gap-2"
        style={{ animationDelay: "1.2s" }}
      >
        <Send className="h-4 w-4 text-[#7B61FF]" />
        <span className="text-xs font-medium text-white/80">Campaign sent</span>
      </div>

      <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a] p-4 shadow-2xl">
        {/* card header */}
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full"
            style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">autoway.official</p>
            <p className="text-xs text-white/40">Scheduled · just now</p>
          </div>
          <span className="rounded-full border border-[#40E0D0]/30 bg-[#40E0D0]/10 px-2 py-0.5 text-[10px] font-medium text-[#40E0D0]">
            AUTO
          </span>
        </div>

        {/* media */}
        <div
          className="mt-4 flex aspect-square items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(64,224,208,0.25), rgba(123,97,255,0.25))",
          }}
        >
          <span
            className="text-4xl font-bold text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #40E0D0, #7B61FF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            AUTOWAY
          </span>
        </div>

        {/* actions */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={toggleLike}
            aria-pressed={liked}
            aria-label="Like"
            className="transition-transform hover:scale-110"
          >
            <Heart
              className="h-6 w-6 transition-colors"
              style={{ color: liked ? "#7B61FF" : "#ffffff" }}
              fill={liked ? "#7B61FF" : "none"}
            />
          </button>
          <button aria-label="Comment" className="transition-transform hover:scale-110">
            <MessageCircle className="h-6 w-6 text-white" />
          </button>
          <button aria-label="Share" className="transition-transform hover:scale-110">
            <Send className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            aria-label="Save"
            className="ml-auto transition-transform hover:scale-110"
          >
            <Bookmark
              className="h-6 w-6 transition-colors"
              style={{ color: saved ? "#40E0D0" : "#ffffff" }}
              fill={saved ? "#40E0D0" : "none"}
            />
          </button>
        </div>

        <p className="mt-3 text-sm font-semibold text-white">
          {likes.toLocaleString()} likes
        </p>
        <p className="mt-1 text-sm text-white/70">
          <span className="font-semibold text-white">autoway.official</span> Posting on
          autopilot while you sleep. 🚀
        </p>
      </div>
    </div>
  )
}
