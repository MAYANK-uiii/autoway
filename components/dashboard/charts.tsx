"use client"

import { useId } from "react"

/** Build a smooth-ish SVG path (Catmull-Rom -> Bezier) through the points. */
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return ""
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  return d
}

function toPoints(data: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = data.length > 1 ? (w - pad * 2) / (data.length - 1) : 0
  return data.map((v, i) => ({
    x: pad + i * step,
    y: pad + (h - pad * 2) * (1 - (v - min) / range),
  }))
}

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  className?: string
}

/** Compact area+line sparkline for stat cards. */
export function Sparkline({ data, width = 120, height = 40, className }: SparklineProps) {
  const id = useId()
  const pts = toPoints(data, width, height, 3)
  const line = smoothPath(pts)
  const area = `${line} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#40E0D0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`sparkline-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#40E0D0" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${id})`} />
      <path d={line} fill="none" stroke={`url(#sparkline-${id})`} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

interface MiniBarsProps {
  data: number[]
  width?: number
  height?: number
  className?: string
}

/** Compact bar chart for stat cards. */
export function MiniBars({ data, width = 120, height = 40, className }: MiniBarsProps) {
  const id = useId()
  const max = Math.max(...data) || 1
  const gap = 3
  const barW = (width - gap * (data.length - 1)) / data.length
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`bars-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#40E0D0" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>
      </defs>
      {data.map((v, i) => {
        const bh = Math.max(2, (v / max) * (height - 2))
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={height - bh}
            width={barW}
            height={bh}
            rx={Math.min(barW / 2, 2)}
            fill={`url(#bars-${id})`}
            opacity={0.55 + (i / data.length) * 0.45}
          />
        )
      })}
    </svg>
  )
}

interface LineChartProps {
  data: number[]
  labels: string[]
  height?: number
  className?: string
}

/** Full-width interactive-feeling line chart with grid, gradient fill and dots. */
export function LineChart({ data, labels, height = 260, className }: LineChartProps) {
  const id = useId()
  const width = 720
  const padX = 8
  const padY = 16
  const pts = toPoints(data, width, height - 24, padX).map((p) => ({ ...p, y: p.y + 4 }))
  const line = smoothPath(pts)
  const area = `${line} L ${pts[pts.length - 1].x} ${height - 20} L ${pts[0].x} ${height - 20} Z`
  const gridLines = 4

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" role="img" aria-label="Performance line chart">
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#40E0D0" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#40E0D0" />
            <stop offset="100%" stopColor="#7B61FF" />
          </linearGradient>
        </defs>
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const y = padY + ((height - padY - 24) / gridLines) * i
          return <line key={i} x1={padX} y1={y} x2={width - padX} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        })}
        <path d={area} fill={`url(#area-${id})`} />
        <path
          d={line}
          fill="none"
          stroke={`url(#stroke-${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(64,224,208,0.4))" }}
        />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#0a0a0a" stroke="#40E0D0" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="mt-2 flex justify-between px-1 text-[11px] text-white/40">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  )
}
