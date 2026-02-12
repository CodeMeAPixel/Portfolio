import { useCallback, useEffect, useState } from 'react'
import { themes, getStoredTheme, applyTheme, categoryConfig, type Theme, type ThemeCategory } from '~/lib/theme'
import { Palette, Settings, Sparkles } from 'lucide-react'

const categories = Object.keys(categoryConfig) as ThemeCategory[]

export function ThemeSelector() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>('indigo')
  const [tab, setTab] = useState<'themes' | 'settings'>('themes')
  const [category, setCategory] = useState<ThemeCategory | null>(null)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  useEffect(() => {
    setCurrent(getStoredTheme())
    setAnimationsEnabled(localStorage.getItem('portfolio-animations') !== 'false')
  }, [])

  const selectTheme = useCallback((t: Theme) => {
    applyTheme(t.id)
    setCurrent(t.id)
  }, [])

  const toggleAnimations = useCallback(() => {
    const next = !animationsEnabled
    setAnimationsEnabled(next)
    localStorage.setItem('portfolio-animations', String(next))
    document.documentElement.classList.toggle('animations-disabled', !next)
  }, [animationsEnabled])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-theme-selector]')) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const currentTheme = themes.find((t) => t.id === current)
  const filteredThemes = category ? themes.filter((t) => t.category === category) : themes

  return (
    <div className="relative" data-theme-selector>
      <button
        onClick={() => setOpen(!open)}
        className="glass flex h-9 items-center gap-2 rounded-lg px-2.5 text-xs font-medium transition-all hover:border-primary/30 hover:glow sm:rounded-full sm:px-3"
        aria-label="Select theme"
        aria-expanded={open}
      >
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-white/20 sm:h-3 sm:w-3"
          style={{ background: currentTheme?.color }}
        />
        <span className="hidden sm:inline text-muted-foreground">
          {currentTheme?.label}
        </span>
        <svg
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform sm:h-3 sm:w-3 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="animate-slide-down glass-strong absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl sm:w-80">
          {/* ── Tabs ── */}
          <div className="flex border-b border-border/30">
            <button
              onClick={() => setTab('themes')}
              className={`flex flex-1 items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-all ${
                tab === 'themes' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              Themes
            </button>
            <button
              onClick={() => setTab('settings')}
              className={`flex flex-1 items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold transition-all ${
                tab === 'settings' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </button>
          </div>

          {tab === 'themes' ? (
            <div className="p-2.5 space-y-2.5">
              {/* Category filters */}
              <div className="flex gap-1">
                <button
                  onClick={() => setCategory(null)}
                  className={`rounded-md px-2 py-1 text-[10px] font-medium transition-all ${
                    !category ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  All ({themes.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(category === cat ? null : cat)}
                    className={`rounded-md px-2 py-1 text-[10px] font-medium transition-all ${
                      category === cat ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    {categoryConfig[cat].icon} {categoryConfig[cat].label}
                  </button>
                ))}
              </div>

              {/* Theme grid */}
              <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto scrollbar-thin pr-0.5">
                {filteredThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => selectTheme(t)}
                    className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-all ${
                      current === t.id
                        ? 'bg-primary/15 text-foreground ring-1 ring-primary/30'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                    }`}
                  >
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ring-1 transition-all ${
                        current === t.id ? 'ring-primary scale-110' : 'ring-white/15 group-hover:ring-white/30'
                      }`}
                      style={{ background: t.color }}
                    />
                    <span className="truncate">{t.label}</span>
                    {current === t.id && (
                      <span className="ml-auto text-[8px] text-primary">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border/30 pt-2 px-1">
                <span className="text-[10px] text-muted-foreground">
                  {themes.length} themes available
                </span>
                <span className="flex items-center gap-1 text-[10px] text-primary">
                  <span className="h-2 w-2 rounded-full" style={{ background: currentTheme?.color }} />
                  {currentTheme?.label}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Animations toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Animations</p>
                    <p className="text-[10px] text-muted-foreground">Motion & transitions</p>
                  </div>
                </div>
                <button
                  onClick={toggleAnimations}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    animationsEnabled ? 'bg-primary' : 'bg-foreground/15'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform shadow-sm ${
                      animationsEnabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Current config summary */}
              <div className="rounded-lg p-3 space-y-2" style={{ background: 'color-mix(in srgb, var(--foreground) 4%, transparent)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Current Config</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: currentTheme?.color }} />
                    {currentTheme?.label}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium text-muted-foreground" style={{ background: 'color-mix(in srgb, var(--foreground) 5%, transparent)' }}>
                    {animationsEnabled ? '✨ Animations On' : '⏸ Animations Off'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
