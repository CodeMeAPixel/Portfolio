import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShoppingCart,
  MessageSquare,
  PenLine,
  ArrowLeft,
  Shield,
  Menu,
  X,
  Sparkles,
  Link2,
  BookOpen,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getServerSession } from '~/lib/admin-fns'
import { PanelNotFound, PanelError } from '~/components/PanelPages'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const session = await getServerSession()
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      throw redirect({ to: '/login' })
    }
    return { session }
  },
  component: AdminLayout,
  notFoundComponent: () => <PanelNotFound backTo="/admin" backLabel="Back to Admin" />,
  errorComponent: (props) => <PanelError {...props} backTo="/admin" backLabel="Back to Admin" />,
})

const sidebarLinks = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/products', label: 'Products', icon: ShoppingCart },
  { to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/admin/blog', label: 'Blog Posts', icon: PenLine },
  { to: '/admin/referrals', label: 'Referrals', icon: Link2 },
  { to: '/admin/docs', label: 'Docs', icon: BookOpen },
]

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = router.state.location.pathname
  const { session } = Route.useRouteContext()

  const isActive = (to: string, end?: boolean) =>
    end ? pathname === to : pathname.startsWith(to)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[50%] rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-[0.03]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(ellipse,var(--glow-secondary)_0%,transparent_70%)] opacity-[0.03]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-foreground lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-brand">
              <Shield className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-tight text-foreground">Admin</span>
              <span className="mx-1.5 text-border">·</span>
              <span className="text-xs text-muted-foreground">CodeMeAPixel</span>
            </div>
          </div>

          <div className="flex-1" />

          {session?.user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted-foreground sm:block">
                {(session.user as any).name}
              </span>
              {(session.user as any).image ? (
                <img
                  src={(session.user as any).image}
                  alt={(session.user as any).name || 'Admin'}
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {((session.user as any).name || 'A')[0].toUpperCase()}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-0">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col overflow-y-auto border-r border-border/50 py-4 pr-2 pl-4 lg:flex">
          <nav className="flex-1 space-y-0.5">
            {sidebarLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 ${
                  isActive(link.to, link.end)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground'
                }`}
              >
                {isActive(link.to, link.end) && (
                  <span className="absolute inset-y-1 left-0 w-[3px] rounded-full gradient-brand" />
                )}
                <link.icon className={`h-4 w-4 shrink-0 transition-colors ${isActive(link.to, link.end) ? 'text-primary' : 'text-muted-foreground/70 group-hover:text-muted-foreground'}`} />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-border/30 pt-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 top-14 z-30 lg:hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-64 overflow-y-auto border-r border-border/50 bg-background p-4">
              <nav className="space-y-0.5">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive(link.to, link.end)
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    {isActive(link.to, link.end) && (
                      <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full gradient-brand" />
                    )}
                    <link.icon className={`h-4 w-4 shrink-0 ${isActive(link.to, link.end) ? 'text-primary' : ''}`} />
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 border-t border-border/30 pt-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to site
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="relative min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
