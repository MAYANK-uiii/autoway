"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, X, Send, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  role: "user" | "ai"
  text: string
}

const suggestions = [
  "Create a post for Instagram",
  "Schedule my posts for this week",
  "Show my best performing content",
  "Create a campaign",
]

function generateReply(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.includes("post") && p.includes("instagram"))
    return "Here's a draft for Instagram: \"Automate your socials with AUTOWAY and grow on autopilot.\" Want me to add hashtags or schedule it?"
  if (p.includes("schedule"))
    return "I can spread 6 posts across this week at your best-performing times: Mon 10AM, Wed 1PM, Fri 6PM, and weekend mornings. Shall I queue them?"
  if (p.includes("best") || p.includes("performing"))
    return "Your top post this month is the 'Product launch teaser' reel with 8.1K reach and 12.4% engagement. Instagram Reels are outperforming static posts 3x."
  if (p.includes("campaign"))
    return "Let's build a campaign. What's the goal — awareness, engagement, or conversions? I can set up a multi-channel flow across Instagram, WhatsApp and Email."
  return "On it! I can help you create posts, schedule content, launch campaigns, and analyze performance across all your connected channels. What would you like to do?"
}

export function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "ai", text: "Hi Mayank! I'm Autoway AI. Ask me to create posts, schedule content, or analyze your performance." },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  const send = (text: string) => {
    const value = text.trim()
    if (!value || typing) return
    const userMsg: Message = { id: Date.now(), role: "user", text: value }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: generateReply(value) }])
      setTyping(false)
    }, 1000)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "group fixed bottom-6 right-6 z-[70] flex items-center gap-2 rounded-full bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] px-4 py-3.5 font-semibold text-black shadow-[0_0_30px_rgba(64,224,208,0.45)] transition-all duration-300 hover:shadow-[0_0_44px_rgba(123,97,255,0.6)] active:scale-95",
          open && "opacity-0 pointer-events-none",
        )}
        aria-label="Open Autoway AI assistant"
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden text-sm sm:inline">Ask Autoway AI</span>
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-[71] flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-all duration-300",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        style={{ height: "min(560px, calc(100vh - 3rem))" }}
        role="dialog"
        aria-label="Autoway AI assistant"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-[#7B61FF]/25 blur-3xl"
        />
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] text-black">
              <Bot className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Autoway AI</p>
              <p className="flex items-center gap-1 text-[11px] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" /> Online
              </p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="relative flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-md bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] text-black"
                    : "rounded-bl-md border border-white/10 bg-white/[0.04] text-white/85",
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="relative flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-[#40E0D0]/40 hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="relative border-t border-white/10 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-[#40E0D0]/60">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) send(input)
              }}
              placeholder="Ask Autoway AI..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] text-black transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
