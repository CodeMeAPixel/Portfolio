import { Link, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ThemeSelector } from './ThemeSelector'
import { Code2, Briefcase, PenLine, ShoppingCart, MessageSquare, FileText, Heart, BookOpen, LogIn, LogOut, LayoutDashboard, Shield, Zap, Mail } from 'lucide-react'
import { PixelLogo } from './icons/PixelLogo'
import { useSession, signOut } from '~/lib/auth-client'

const primaryLinks = [
  { to: '/', label: 'Home', icon: null },
  { to: '/projects', label: 'Projects', icon: Code2 },
  { to: '/blog', label: 'Blog', icon: PenLine },
  { to: '/shop', label: 'Shop', icon: ShoppingCart },
]

const secondaryLinks = [
  { to: '/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/cv', label: 'CV', icon: Briefcase },
  { to: '/referrals', label: 'Referrals', icon: Heart },
  { to: '/docs', label: 'Docs', icon: BookOpen },
  { to: '/contact', label: 'Contact', icon: Mail },
  { to: '/just-ask', label: 'Just Ask', icon: Zap },
]

const allLinks = [...primaryLinks, ...secondaryLinks]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = router.state.location.pathname
  const { data: session } = useSession()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close dropdowns on route change
  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  // Close 'More' dropdown on outside click
  useEffect(() => {
    if (!moreOpen && !userMenuOpen) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (moreOpen && !target.closest('[data-more-menu]')) setMoreOpen(false)
      if (userMenuOpen && !target.closest('[data-user-menu]')) setUserMenuOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [moreOpen, userMenuOpen])

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
        >
          <PixelLogo />
          <span className="text-shine text-base font-bold tracking-tight">
            CodeMeAPixel
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive(link.to) && (
                <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full gradient-brand" />
              )}
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" data-more-menu>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                secondaryLinks.some((l) => isActive(l.to))
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              More
              <svg
                className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {secondaryLinks.some((l) => isActive(l.to)) && (
                <span className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full gradient-brand" />
              )}
            </button>

            {moreOpen && (
              <div className="animate-slide-down glass-strong absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl p-1.5 shadow-xl">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                      isActive(link.to)
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    {link.icon && <link.icon className="h-3.5 w-3.5 text-primary" />}
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side: auth + theme + mobile toggle */}
        <div className="flex items-center gap-2">
          {session?.user ? (
            <div className="relative" data-user-menu>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="glass flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg transition-all hover:border-primary/30 hover:glow"
                aria-label="User menu"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    {(session.user.name || 'U')[0].toUpperCase()}
                  </span>
                )}
              </button>

              {userMenuOpen && (
                <div className="animate-slide-down glass-strong absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl p-1.5 shadow-xl">
                  <div className="border-b border-border/50 px-3 py-2">
                    <p className="truncate text-sm font-medium text-foreground">{session.user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{session.user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className={`mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                      isActive('/dashboard')
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                  </Link>
                  {(session.user as any).role === 'ADMIN' && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                        isActive('/admin')
                          ? 'bg-primary/10 text-foreground'
                          : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                      }`}
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Admin Panel
                    </Link>
                  )}
                  <div className="my-1 h-px bg-border/30" />
                  <button
                    onClick={async () => {
                      await signOut()
                      setUserMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="glass flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground hover:glow"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          <ThemeSelector />

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 12h16M4 6h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slide-down glass-strong border-t border-border/50 px-4 pb-4 pt-2 md:hidden">
          <div className="space-y-0.5">
            {allLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                {isActive(link.to) && (
                  <span className="h-1.5 w-1.5 rounded-full gradient-brand" />
                )}
                {link.icon && <link.icon className={`h-4 w-4 ${isActive(link.to) ? 'text-primary' : ''}`} />}
                {link.label}
              </Link>
            ))}

            {/* Auth link in mobile menu */}
            <div className="my-1 h-px bg-border/30" />
            {session?.user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive('/dashboard')
                      ? 'bg-primary/10 text-foreground'
                      : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                {(session.user as any).role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive('/admin')
                        ? 'bg-primary/10 text-foreground'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={async () => {
                    await signOut()
                    setMobileOpen(false)
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive('/login')
                    ? 'bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
