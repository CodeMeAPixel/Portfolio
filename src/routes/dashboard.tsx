import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router'
import {
  LayoutDashboard,
  MessageSquare,
  ArrowLeft,
  User,
} from 'lucide-react'
import { getServerSession } from '~/lib/admin-fns'
import { PanelNotFound, PanelError } from '~/components/PanelPages'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (!session?.user) {
      throw redirect({ to: '/login' })
    }
    return { session }
  },
  component: DashboardLayout,
  notFoundComponent: () => <PanelNotFound backTo="/dashboard" backLabel="Back to Dashboard" />,
  errorComponent: (props) => <PanelError {...props} backTo="/dashboard" backLabel="Back to Dashboard" />,
})

const tabs = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/reviews', label: 'My Reviews', icon: MessageSquare },
]

function DashboardLayout() {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const { session } = Route.useRouteContext()

  const isActive = (to: string, end?: boolean) =>
    end ? pathname === to : pathname.startsWith(to)

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[15%] h-[70%] w-[45%] rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-[0.04]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[35%] rounded-full bg-[radial-gradient(ellipse,var(--glow-secondary)_0%,transparent_70%)] opacity-[0.04]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-tight text-foreground">Dashboard</span>
            </div>
          </div>

          <div className="flex-1" />

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            <span className="hidden sm:inline">Back to site</span>
          </Link>

          {session?.user && (
            <div className="flex items-center gap-2.5">
              <span className="hidden text-xs text-muted-foreground md:block">
                {(session.user as any).name}
              </span>
              {(session.user as any).image ? (
                <img
                  src={(session.user as any).image}
                  alt={(session.user as any).name || 'User'}
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {((session.user as any).name || 'U')[0].toUpperCase()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tab navigation */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="-mb-px flex gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-[13px] font-medium transition-all ${
                  isActive(tab.to, tab.end)
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border/50 hover:text-foreground'
                }`}
              >
                <tab.icon className={`h-3.5 w-3.5 ${isActive(tab.to, tab.end) ? 'text-primary' : ''}`} />
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
