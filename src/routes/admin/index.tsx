import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createMeta } from '~/lib/meta'
import {
  Users,
  FolderKanban,
  ShoppingCart,
  MessageSquare,
  PenLine,
  Link2,
  ArrowUpRight,
  Activity,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { getAdminStats } from '~/lib/admin-fns'

const statsQueryOptions = {
  queryKey: ['admin', 'stats'],
  queryFn: () => getAdminStats(),
}

export const Route = createFileRoute('/admin/')({
  head: () => createMeta({ title: 'Admin Dashboard', path: '/admin' }),
  component: AdminOverview,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(statsQueryOptions)
  },
})

function AdminOverview() {
  const { data: stats } = useSuspenseQuery(statsQueryOptions)

  const cards = [
    { label: 'Users', value: stats.users, icon: Users, gradient: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400', link: '/admin/users' },
    { label: 'Projects', value: stats.projects, icon: FolderKanban, gradient: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-400', link: '/admin/projects' },
    { label: 'Products', value: stats.products, icon: ShoppingCart, gradient: 'from-violet-500/20 to-purple-500/20', iconColor: 'text-violet-400', link: '/admin/products' },
    { label: 'Reviews', value: stats.reviews, icon: MessageSquare, gradient: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400', link: '/admin/reviews' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: PenLine, gradient: 'from-pink-500/20 to-rose-500/20', iconColor: 'text-pink-400', link: '/admin/blog' },
    { label: 'Referrals', value: stats.referrals, icon: Link2, gradient: 'from-cyan-500/20 to-teal-500/20', iconColor: 'text-cyan-400', link: '/admin/referrals' },
    { label: 'Docs', value: stats.docs, icon: BookOpen, gradient: 'from-sky-500/20 to-indigo-500/20', iconColor: 'text-sky-400', link: '/admin/docs' },
  ]

  const quickLinks = [
    { label: 'Manage Users', description: 'Promote, ban, or remove users', to: '/admin/users', icon: Users, color: 'text-blue-400' },
    { label: 'Manage Projects', description: 'Feature, edit, or delete projects', to: '/admin/projects', icon: FolderKanban, color: 'text-emerald-400' },
    { label: 'Manage Reviews', description: 'Feature or moderate reviews', to: '/admin/reviews', icon: MessageSquare, color: 'text-amber-400' },
    { label: 'Manage Blog', description: 'Publish or unpublish blog posts', to: '/admin/blog', icon: PenLine, color: 'text-pink-400' },
    { label: 'Manage Referrals', description: 'Add, edit, or remove referrals', to: '/admin/referrals', icon: Link2, color: 'text-cyan-400' },
    { label: 'Manage Docs', description: 'Create and organize documentation', to: '/admin/docs', icon: BookOpen, color: 'text-sky-400' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            A snapshot of your portfolio data.
          </p>
        </div>
        <div className="section-badge hidden sm:flex">
          <Sparkles className="h-3 w-3" />
          Admin Panel
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-foreground/[0.02] p-5 transition-all duration-300 hover:border-primary/20 hover:bg-foreground/[0.04]"
          >
            {/* Subtle gradient bg */}
            <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight">
                  {card.value}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.04] transition-colors group-hover:bg-foreground/[0.06]">
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors group-hover:text-primary/70">
              <span>View all</span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {quickLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-center gap-3 rounded-xl border border-border/30 bg-foreground/[0.01] px-4 py-3.5 transition-all duration-200 hover:border-primary/20 hover:bg-foreground/[0.03]"
            >
              <item.icon className={`h-4 w-4 shrink-0 ${item.color}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="truncate text-xs text-muted-foreground/70">{item.description}</p>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
