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
        {/* Primary glow orb — hidden on mobile to avoid GPU-killing blur */}
        <div
          className="animate-float absolute -top-40 -right-40 hidden rounded-full blur-[140px] sm:block sm:h-125 sm:w-125"
          style={{
            background: 'color-mix(in srgb, var(--glow) 12%, transparent)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
        {/* Secondary glow orb — hidden on mobile */}
        <div
          className="animate-float absolute -bottom-40 -left-40 hidden rounded-full blur-[120px] sm:block sm:h-100 sm:w-100"
          style={{
            background: 'color-mix(in srgb, var(--glow-secondary) 10%, transparent)',
            animationDelay: '-3s',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
        {/* Dot grid pattern — reduced opacity on mobile */}
        <div className="dot-pattern absolute inset-0 opacity-20 sm:opacity-40" />
      </div>

      <Nav />
      <main className="mx-auto max-w-6xl px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
