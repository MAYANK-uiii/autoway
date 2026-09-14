"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { user, isLoading, signIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Already authenticated users never see the login page.
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard")
    }
  }, [isLoading, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await signIn(email, password)
      // Redirect only after authentication has completed successfully.
      router.replace("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.")
      setSubmitting(false)
    }
  }

  // Avoid flashing the form while restoring the session or redirecting.
  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-6 w-6 animate-spin text-white/60" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="relative w-full max-w-md">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-2xl opacity-70 blur-md"
          style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
        />
        <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#40E0D0] to-[#7B61FF] shadow-[0_0_12px_#40E0D0]" />
            <span className="bg-gradient-to-r from-[#40E0D0] to-[#7B61FF] bg-clip-text text-lg font-bold tracking-tight text-transparent">
              AUTOWAY
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="mt-1.5 text-sm text-white/60">Sign in to your AUTOWAY dashboard.</p>
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

            {error ? (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
              style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-white/40">
            By signing in you agree to our Terms &amp; Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
