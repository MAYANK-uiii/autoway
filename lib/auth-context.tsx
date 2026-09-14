"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

const COOKIE_NAME = "autoway_session"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AuthUser {
  email: string
  name: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<AuthUser>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readSessionCookie(): AuthUser | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`))
  if (!match) return null
  try {
    const value = decodeURIComponent(match.slice(COOKIE_NAME.length + 1))
    const parsed = JSON.parse(value) as AuthUser
    if (parsed && typeof parsed.email === "string") return parsed
    return null
  } catch {
    return null
  }
}

function writeSessionCookie(user: AuthUser) {
  const value = encodeURIComponent(JSON.stringify(user))
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

function clearSessionCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore the session from the cookie on first mount so a refresh stays logged in.
  useEffect(() => {
    setUser(readSessionCookie())
    setIsLoading(false)
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    // No backend is connected, so this validates input shape and issues a local session.
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !password) {
      throw new Error("Email and password are required.")
    }
    const nextUser: AuthUser = {
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0] || "AUTOWAY User",
    }
    writeSessionCookie(nextUser)
    setUser(nextUser)
    return nextUser
  }, [])

  const signOut = useCallback(() => {
    clearSessionCookie()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, signIn, signOut }),
    [user, isLoading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
