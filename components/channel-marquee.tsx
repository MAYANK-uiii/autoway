import { MessageSquare, Mail, Send, Calendar, Users, Bot, BarChart3, Bell } from "lucide-react"

const items = [
  { icon: Calendar, label: "Post Scheduling" },
  { icon: Bot, label: "AI Auto-Reply" },
  { icon: Mail, label: "Email Campaigns" },
  { icon: MessageSquare, label: "WhatsApp Flows" },
  { icon: Users, label: "Audience Growth" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Send, label: "Broadcasts" },
  { icon: Bell, label: "Smart Alerts" },
]

export function ChannelMarquee() {
  const track = [...items, ...items]
  return (
    <section aria-label="Platform capabilities" className="relative border-y border-white/10 bg-[#050505] py-6">
      <div className="autoway-marquee-mask relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="autoway-marquee-track gap-4">
          {track.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70"
              >
                <Icon className="h-4 w-4 text-[#40E0D0]" />
                <span className="whitespace-nowrap font-medium">{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
