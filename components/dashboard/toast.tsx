"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { CheckCircle2, X } from "lucide-react"

interface Toast {
  id: number
  message: string
}

interface ToastContextValue {
  notify: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (message: string) => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, message }])
      setTimeout(() => dismiss(id), 3200)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-[#40E0D0]/30 bg-[#0a0a0a]/95 px-4 py-3 text-sm text-white shadow-[0_0_30px_rgba(64,224,208,0.25)] backdrop-blur-xl"
            style={{ animation: "autoway-fade-up 0.35s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#40E0D0]" />
            <span className="max-w-xs">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-white/40 transition-colors hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return ctx
}
