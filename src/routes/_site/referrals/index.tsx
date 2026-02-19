import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ExternalLink, Sparkles, Heart, CheckCircle2, Gift, ArrowUpRight, Search, Copy, Check, ArrowUpDown, ChevronDown, LayoutGrid, List } from 'lucide-react'
import { useState, useMemo, useCallback } from 'react'
import { getReferralCategories } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'
import { ReferralPlaceholder } from '~/components/PlaceholderBanner'

type SortOption = 'a-z' | 'z-a' | 'newest' | 'oldest'
type Layout = 'grid' | 'list'

const referralsQueryOptions = {
  queryKey: ['referrals'],
  queryFn: () => getReferralCategories(),
}

export const Route = createFileRoute('/_site/referrals/')({
  head: () => createMeta({ title: 'Referrals', description: 'Services, tools, and platforms I personally recommend.', path: '/referrals' }),
  component: ReferralsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(referralsQueryOptions)
  },
})

function ReferralsPage() {
  const { data: categories } = useSuspenseQuery(referralsQueryOptions)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>('a-z')
  const [layout, setLayout] = useState<Layout>('grid')
  const [sortOpen, setSortOpen] = useState(false)

  const totalReferrals = categories?.reduce((sum: number, cat: any) => sum + (cat.referrals?.length || 0), 0) || 0

  const copyCode = useCallback((code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  // Categories that actually have referrals (for pill filtering)
  const availableCategories = useMemo(() => {
    if (!categories) return []
    return categories.filter((c: any) => c.referrals && c.referrals.length > 0)
  }, [categories])

  // Filter + sort referrals across all categories
  const filteredCategories = useMemo(() => {
    if (!categories) return []
    let cats = categories.filter((c: any) => c.referrals && c.referrals.length > 0)

    if (selectedCategory) {
      cats = cats.filter((c: any) => c.id === selectedCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      cats = cats
        .map((cat: any) => ({
          ...cat,
          referrals: cat.referrals.filter(
            (r: any) =>
              r.company?.toLowerCase().includes(q) ||
              r.title?.toLowerCase().includes(q) ||
              r.description?.toLowerCase().includes(q),
          ),
        }))
        .filter((cat: any) => cat.referrals.length > 0)
    }

    // Sort referrals within each category
    cats = cats.map((cat: any) => ({
      ...cat,
      referrals: [...cat.referrals].sort((a: any, b: any) => {
        switch (sort) {
          case 'z-a':
            return (b.company || '').localeCompare(a.company || '')
          case 'newest':
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          case 'oldest':
            return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
          default: // a-z
            return (a.company || '').localeCompare(b.company || '')
        }
      }),
    }))

    return cats
  }, [categories, search, selectedCategory, sort])

  const filteredTotal = filteredCategories.reduce((sum: number, cat: any) => sum + (cat.referrals?.length || 0), 0)

  return (
    <div className="space-y-16">
      {/* ═══ HERO HEADER ═══ */}
      <section className="relative">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]" style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-8 left-[15%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute top-16 right-[10%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2s' }} />
          <div className="animate-float absolute bottom-4 left-[20%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-4s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge"><Heart className="h-3.5 w-3.5" />Recommended</span>
          </div>
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Referral{' '}<span className="relative inline-block"><span className="text-shine">Links</span><span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" /></span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Services and tools I <span className="text-foreground font-medium">personally use</span> and{' '}
              <span className="text-foreground font-medium">recommend</span>. Some links include referral codes that support my work.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Gift className="h-4 w-4 text-primary" /><span className="font-semibold text-foreground">{totalReferrals}</span><span className="text-muted-foreground">Referrals</span>
            </div>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" /><span className="font-semibold text-foreground">{categories?.length || 0}</span><span className="text-muted-foreground">Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOOLBAR ═══ */}
      <div className="relative z-20 space-y-4 animate-fade-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input type="text" placeholder="Search referrals..." value={search} onChange={(e) => setSearch(e.target.value)} className="glass w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <div className={`relative ${sortOpen ? 'z-50' : ''}`}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm text-foreground transition-colors hover:text-primary"
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                {({ 'a-z': 'A → Z', 'z-a': 'Z → A', newest: 'Newest', oldest: 'Oldest' } as Record<SortOption, string>)[sort]}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-1 w-40 glass-strong rounded-xl p-1 shadow-xl animate-fade-up">
                    {([['a-z', 'A → Z'], ['z-a', 'Z → A'], ['newest', 'Newest'], ['oldest', 'Oldest']] as [SortOption, string][]).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => { setSort(key); setSortOpen(false) }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${sort === key ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
                        style={sort === key ? { background: 'color-mix(in srgb, var(--primary) 10%, transparent)' } : {}}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Layout toggle */}
            <div className="glass flex rounded-xl p-0.5">
              <button
                onClick={() => setLayout('grid')}
                className={`rounded-lg p-2 transition-colors ${layout === 'grid' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                style={layout === 'grid' ? { background: 'color-mix(in srgb, var(--primary) 12%, transparent)' } : {}}
                title="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`rounded-lg p-2 transition-colors ${layout === 'list' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                style={layout === 'list' ? { background: 'color-mix(in srgb, var(--primary) 12%, transparent)' } : {}}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category pills — only categories that have referrals */}
        {availableCategories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${!selectedCategory ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
              style={!selectedCategory ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
            >
              All
            </button>
            {availableCategories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${selectedCategory === cat.id ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
                style={selectedCategory === cat.id ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {(search || selectedCategory) && (
          <p className="text-sm text-muted-foreground">
            {filteredTotal} {filteredTotal === 1 ? 'referral' : 'referrals'} found
            {search && <> matching "<span className="text-foreground font-medium">{search}</span>"</>}
          </p>
        )}
      </div>

      {/* ═══ CATEGORY SECTIONS ═══ */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((cat: any, catIdx: number) => (
          <section key={cat.id} className="space-y-8">
            <div className="flex items-center gap-3 animate-fade-up">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{cat.name}</h2>
                {cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}
              </div>
              <div className="ml-auto h-px flex-1 max-w-32 gradient-brand opacity-30" />
            </div>

            <div className={layout === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
              {cat.referrals.map((ref: any, i: number) =>
                layout === 'grid' ? (
                  /* ═══ GRID CARD ═══ */
                  <a
                    key={ref.id}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl animate-fade-up"
                    style={{ animationDelay: `${(catIdx * 0.1) + (i * 0.06)}s` }}
                  >
                    <div className="relative aspect-3/1 overflow-hidden">
                      {ref.bannerImage ? (
                        <img src={ref.bannerImage} alt={ref.company} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                      ) : (
                        <ReferralPlaceholder company={ref.company} className="h-full w-full object-cover" />
                      )}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 15%, transparent), transparent)' }} />
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="font-bold transition-colors group-hover:text-primary">{ref.company}</h3>
                          <p className="text-sm text-muted-foreground">{ref.title}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{ref.description}</p>

                      <div className="flex flex-wrap items-center gap-2">
                        {ref.discount && (
                          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}>
                            <Sparkles className="h-3 w-3" />{ref.discount}
                          </span>
                        )}
                        {ref.code && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyCode(ref.code, ref.id) }}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium glass text-foreground transition-all hover:text-primary"
                            title="Copy promo code"
                          >
                            {copiedId === ref.id ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                            <code className="font-mono">{ref.code}</code>
                          </button>
                        )}
                      </div>

                      {ref.benefits && ref.benefits.length > 0 && (
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          {ref.benefits.slice(0, 3).map((b: string, j: number) => (
                            <li key={j} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </a>
                ) : (
                  /* ═══ LIST CARD ═══ */
                  <a
                    key={ref.id}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-card flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up sm:gap-6 sm:p-5"
                    style={{ animationDelay: `${(catIdx * 0.1) + (i * 0.04)}s` }}
                  >
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                      {ref.bannerImage ? (
                        <img src={ref.bannerImage} alt={ref.company} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                      ) : (
                        <ReferralPlaceholder company={ref.company} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <h3 className="text-base font-bold transition-colors group-hover:text-primary line-clamp-1 sm:text-lg">{ref.company}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{ref.title}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">{ref.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {ref.discount && (
                          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}>
                            <Sparkles className="h-3 w-3" />{ref.discount}
                          </span>
                        )}
                        {ref.code && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); copyCode(ref.code, ref.id) }}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium glass text-foreground transition-all hover:text-primary"
                            title="Copy promo code"
                          >
                            {copiedId === ref.id ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                            <code className="font-mono">{ref.code}</code>
                          </button>
                        )}
                      </div>
                    </div>
                  </a>
                ),
              )}
            </div>
          </section>
        ))
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-3">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No referrals match your search.</p>
          <button onClick={() => { setSearch(''); setSelectedCategory(null); setSort('a-z') }} className="text-sm font-medium text-primary hover:underline">Clear filters</button>
        </div>
      )}

      {/* Empty state (no referrals at all) */}
      {(!categories || categories.length === 0) && (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">No referrals yet</p>
          <p className="text-sm text-muted-foreground">Check back soon.</p>
        </div>
      )}
    </div>
  )
}
