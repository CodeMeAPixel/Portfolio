import { createFileRoute, Link } from '@tanstack/react-router'
import { MessageSquare, ArrowUpRight, Shield } from 'lucide-react'
import { createMeta } from '~/lib/meta'

export const Route = createFileRoute('/dashboard/')({
  head: () => createMeta({ title: 'Dashboard', path: '/dashboard' }),
  component: DashboardHome,
})

function DashboardHome() {
  const { session } = Route.useRouteContext() as any
  const user = session?.user as any

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{user?.email}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span
                className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  user?.role === 'ADMIN'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-foreground/[0.04] text-muted-foreground/70'
                }`}
              >
                {user?.role || 'MEMBER'}
              </span>
            </div>
          </div>
        </div>

        {user?.role === 'ADMIN' && (
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground"
          >
            <Shield className="h-3.5 w-3.5" />
            Admin Panel
          </Link>
        )}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/dashboard/reviews"
            className="group flex items-center justify-between rounded-xl border border-border/50 p-4 transition-all hover:border-primary/20 hover:bg-foreground/[0.02]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                <MessageSquare className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium">My Reviews</p>
                <p className="text-xs text-muted-foreground/50">Submit or manage reviews</p>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 transition-all group-hover:text-muted-foreground" />
          </Link>

          <Link
            to="/"
            className="group flex items-center justify-between rounded-xl border border-border/50 p-4 transition-all hover:border-primary/20 hover:bg-foreground/[0.02]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                <ArrowUpRight className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">View Portfolio</p>
                <p className="text-xs text-muted-foreground/50">See your public profile</p>
              </div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 transition-all group-hover:text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  )
}
