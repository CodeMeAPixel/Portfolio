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
  Link2,
  BookOpen,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from 'lucide-react'
import { useState, useEffect, useLayoutEffect } from 'react'
import { getServerSession } from '~/lib/admin-fns'
import { PanelNotFound, PanelError } from '~/components/PanelPages'
import { signOut } from '~/lib/auth-client'

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

const navItems = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/products', label: 'Products', icon: ShoppingCart },
  { to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/admin/blog', label: 'Blog Posts', icon: PenLine },
  { to: '/admin/referrals', label: 'Referrals', icon: Link2 },
  { to: '/admin/docs', label: 'Docs', icon: BookOpen },
]

const SIDEBAR_KEY = 'admin-sidebar-collapsed'

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  // Start uncollapsed; useLayoutEffect will sync from localStorage before first paint
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = router.state.location.pathname
  const { session } = Route.useRouteContext()
  const user = session?.user as any

  const isActive = (to: string, end?: boolean) =>
    end ? pathname === to : pathname.startsWith(to)

  // Restore persisted sidebar state before first paint to avoid flicker
  useLayoutEffect(() => {
    setCollapsed(localStorage.getItem(SIDEBAR_KEY) === 'true')
  }, [])

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(SIDEBAR_KEY, String(next))
      return next
    })
  }

  // Close mobile drawer on navigation
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const sidebarWidth = collapsed ? 'w-16' : 'w-60'

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Subtle background gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[50%] rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-[0.025]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(ellipse,var(--glow-secondary)_0%,transparent_70%)] opacity-[0.025]" />
      </div>

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside
        className={`group/sidebar hidden lg:flex flex-col sticky top-0 h-screen shrink-0 border-r border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300 ${sidebarWidth}`}
      >
        {/* Logo / brand area */}
        <div className={`flex h-14 items-center border-b border-border/40 px-3 ${collapsed ? 'justify-center' : 'gap-2.5 px-4'}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-brand shadow-lg">
            <Shield className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-tight text-foreground">Admin Panel</p>
              <p className="truncate text-[11px] text-muted-foreground">CodeMeAPixel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
          {!collapsed && (
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Navigation
            </p>
          )}
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item.to, item.end)
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    title={collapsed ? item.label : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                      active
                        ? 'text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    } ${collapsed ? 'justify-center' : ''}`}
                    style={active ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${active ? 'text-primary-foreground' : 'text-muted-foreground/70 group-hover:text-foreground'}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg border border-border/50 bg-popover px-2.5 py-1.5 text-xs font-medium text-foreground shadow-xl opacity-0 transition-opacity group-hover:opacity-100">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Divider */}
          <div className="my-3 mx-1 h-px bg-border/40" />

          {/* Back to site */}
          <Link
            to="/"
            title={collapsed ? 'Back to site' : undefined}
            className={`group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[13px] font-medium text-muted-foreground transition-all duration-150 hover:bg-foreground/5 hover:text-foreground ${collapsed ? 'justify-center' : ''}`}
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground" />
            {!collapsed && <span className="truncate">Back to site</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg border border-border/50 bg-popover px-2.5 py-1.5 text-xs font-medium text-foreground shadow-xl opacity-0 transition-opacity group-hover:opacity-100">
                Back to site
              </span>
            )}
          </Link>
        </nav>

        {/* User profile card */}
        {!collapsed && user && (
          <div className="border-t border-border/40 p-3">
            <div className="flex items-center gap-2.5 rounded-xl p-2.5" style={{ background: 'color-mix(in srgb, var(--foreground) 3%, transparent)' }}>
              {user.image ? (
                <img src={user.image} alt={user.name || 'Admin'} className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-primary/20" />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {(user.name || 'A')[0].toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">{user.name || 'Admin'}</p>
                <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
              </div>
              <button
                onClick={() => signOut()}
                title="Sign out"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Collapsed avatar */}
        {collapsed && user && (
          <div className="border-t border-border/40 p-3 flex justify-center">
            {user.image ? (
              <img src={user.image} alt={user.name || 'Admin'} className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {(user.name || 'A')[0].toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapsed}
          className={`flex h-10 w-full items-center border-t border-border/40 px-3 text-muted-foreground transition-colors hover:bg-foreground/4 hover:text-foreground ${collapsed ? 'justify-center' : 'gap-2'}`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              <span className="text-[12px]">Collapse</span>
            </>
          )}
        </button>
      </aside>

      {/* ── Mobile Sidebar Drawer ────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border/50 bg-card shadow-2xl">
            {/* Mobile header */}
            <div className="flex h-14 items-center justify-between border-b border-border/40 px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg gradient-brand">
                  <Shield className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-bold text-foreground">Admin Panel</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile nav */}
            <nav className="flex-1 overflow-y-auto px-2 py-3">
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Navigation
              </p>
              <ul className="space-y-0.5">
                {navItems.map((item) => {
                  const active = isActive(item.to, item.end)
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={`group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                          active
                            ? 'text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                        }`}
                        style={active ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
                      >
                        <item.icon className={`h-4 w-4 shrink-0 ${active ? 'text-primary-foreground' : ''}`} />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="my-3 mx-1 h-px bg-border/40" />

              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to site
              </Link>
            </nav>

            {/* Mobile user card */}
            {user && (
              <div className="border-t border-border/40 p-3">
                <div className="flex items-center gap-2.5 rounded-xl p-2 " style={{ background: 'color-mix(in srgb, var(--foreground) 3%, transparent)' }}>
                  {user.image ? (
                    <img src={user.image} alt={user.name || 'Admin'} className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-primary/20" />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                      {(user.name || 'A')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    title="Sign out"
                    className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ── Main area ───────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

            {/* Breadcrumb / page context */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-border">/</span>
              <span className="font-medium text-foreground">
                {navItems.find((n) => isActive(n.to, n.end))?.label ?? 'Admin'}
              </span>
            </div>

            <div className="flex-1" />

            {user && (
              <div className="flex items-center gap-2.5">
                <span className="hidden text-xs text-muted-foreground sm:block">{user.name}</span>
                {user.image ? (
                  <img src={user.image} alt={user.name || 'Admin'} className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20" />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {(user.name || 'A')[0].toUpperCase()}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
