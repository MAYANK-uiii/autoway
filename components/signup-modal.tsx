"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { X, Mail, Lock, Loader2, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface SignUpModalProps {
  open: boolean
  onClose: () => void
}

export function SignUpModal({ open, onClose }: SignUpModalProps) {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle")

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setStatus("idle")
      setEmail("")
      setPassword("")
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    setStatus("loading")
    try {
      await signIn(email || "you@example.com", password || "autoway")
      setStatus("done")
    } catch {
      setStatus("idle")
    }
  }

  const goToDashboard = () => {
    onClose()
    router.push("/dashboard")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      />

      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-2xl opacity-70 blur-md"
          style={{
            background: "linear-gradient(135deg, #40E0D0, #7B61FF)",
          }}
        />
        <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-8">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-lg p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {status === "done" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
              >
                <Check className="h-7 w-7 text-black" />
              </div>
              <h2 className="text-xl font-semibold text-white">You&apos;re in!</h2>
              <p className="mt-2 text-sm text-white/60">
                Welcome to AUTOWAY. Your free trial is ready to roll.
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-xl py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
              >
                Get building
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 id="signup-title" className="text-2xl font-semibold text-white">
                  Create your account
                </h2>
                <p className="mt-1.5 text-sm text-white/60">
                  Start automating your socials in minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#40E0D0]/60 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="password" className="text-sm font-medium text-white/80">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#7B61FF]/60 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/40">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <p className="mt-5 text-center text-xs text-white/40">
                By signing up you agree to our Terms &amp; Privacy Policy.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}
