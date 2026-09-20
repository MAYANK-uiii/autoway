"use client"

import { MessageSquare, Mail } from "lucide-react"
import { useRef, type ComponentType, type SVGProps } from "react"
import { Reveal } from "@/components/reveal"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

interface Feature {
  icon: IconType
  title: string
  description: string
  accent: string
  points: string[]
}

const features: Feature[] = [
  {
    icon: InstagramIcon,
    title: "Instagram Automation",
    description:
      "Auto-schedule posts and stories, reply to comments, and grow your audience with smart AI captions.",
    accent: "#40E0D0",
    points: ["Smart scheduling", "Auto DM replies", "Hashtag suggestions"],
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description:
      "Set up instant auto-responders, broadcast campaigns, and drip sequences that convert on WhatsApp.",
    accent: "#7B61FF",
    points: ["Instant replies", "Broadcast lists", "Chat flows"],
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Build beautiful email sequences, trigger campaigns on events, and track opens in real time.",
    accent: "#40E0D0",
    points: ["Drip campaigns", "Event triggers", "Open tracking"],
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            One platform,{" "}
            <span
              className="text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #40E0D0, #7B61FF)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              every channel
            </span>
          </h2>
          <p className="mt-4 text-pretty text-lg text-white/60">
            Connect your favorite channels and let AUTOWAY handle the busywork.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 120}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    node.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 transition-all duration-300 hover:-translate-y-1"
      style={
        {
          "--accent": feature.accent,
        } as React.CSSProperties
      }
    >
      {/* cursor-following spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), ${feature.accent}22, transparent 70%)`,
        }}
      />

      {/* neon border glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${feature.accent}66, 0 0 40px -8px ${feature.accent}80`,
        }}
      />

      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${feature.accent}1a`,
          border: `1px solid ${feature.accent}40`,
        }}
      >
        <Icon className="h-6 w-6" style={{ color: feature.accent }} />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{feature.description}</p>

      <ul className="mt-5 space-y-2">
        {feature.points.map((point) => (
          <li key={point} className="flex items-center gap-2 text-sm text-white/70">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: feature.accent }}
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
