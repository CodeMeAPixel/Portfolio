import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { LoadingScreen } from '../components/LoadingScreen'

export const Route = createFileRoute('/_site')({
  component: SiteLayout,
})

function SiteLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LoadingScreen />

      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Primary glow orb */}
        <div
          className="animate-float absolute -top-40 -right-40 h-75 w-75 rounded-full blur-[140px] sm:h-125 sm:w-125"
          style={{ background: 'color-mix(in srgb, var(--glow) 12%, transparent)' }}
        />
        {/* Secondary glow orb */}
        <div
          className="animate-float absolute -bottom-40 -left-40 h-62.5 w-62.5 rounded-full blur-[120px] sm:h-100 sm:w-100"
          style={{
            background: 'color-mix(in srgb, var(--glow-secondary) 10%, transparent)',
            animationDelay: '-3s',
          }}
        />
        {/* Center aurora wash */}
        <div
          className="animate-morph absolute top-1/3 left-1/2 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[200px] opacity-60 sm:h-150 sm:w-150"
          style={{ background: 'color-mix(in srgb, var(--glow) 6%, transparent)' }}
        />
        {/* Dot grid pattern */}
        <div className="dot-pattern absolute inset-0 opacity-40" />
      </div>

      <Nav />
      <main className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
