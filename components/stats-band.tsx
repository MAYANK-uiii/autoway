"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 12000, suffix: "+", label: "Creators & teams" },
  { value: 4, suffix: "M+", label: "Messages automated" },
  { value: 98, suffix: "%", label: "Faster response time" },
  { value: 3, suffix: "x", label: "Audience growth" },
]

export function StatsBand() {
  return (
    <section className="relative px-6 py-16">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:grid-cols-4 md:p-12">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl font-bold text-transparent md:text-5xl"
                style={{
                  backgroundImage: "linear-gradient(135deg, #40E0D0, #7B61FF)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                <Counter target={stat.value} suffix={stat.suffix} delay={i * 120} />
              </p>
              <p className="mt-2 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Counter({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const startTime = performance.now() + delay
          const tick = (now: number) => {
            const elapsed = now - startTime
            if (elapsed < 0) {
              requestAnimationFrame(tick)
              return
            }
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(target * eased))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, delay])

  return <span ref={ref}>{formatValue(value)}{suffix}</span>
}

function formatValue(value: number) {
  if (value >= 1000) return `${Math.round(value / 1000)}K`
  return `${value}`
}
