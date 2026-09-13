"use client"

interface SiteHeaderProps {
  onGetStarted: () => void
}

export function SiteHeader({ onGetStarted }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2" aria-label="AUTOWAY home">
          <span
            className="text-lg font-bold tracking-tight text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #40E0D0, #7B61FF)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
          >
            AUTOWAY
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Pricing
          </a>
        </nav>

        <button
          onClick={onGetStarted}
          className="relative rounded-xl px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #40E0D0, #7B61FF)" }}
        >
          Get Started / Sign In
        </button>
      </div>
    </header>
  )
}
