import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ShoppingCart, Github, Package, Cpu, ArrowUpRight, CheckCircle2, Box, Search, ArrowUpDown, ChevronDown, LayoutGrid, List, ChevronLeft, ChevronRight as ChevronRightIcon, Archive } from 'lucide-react'
import { useState, useMemo } from 'react'
import { getAllProducts } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'
import { ProductPlaceholder } from '~/components/PlaceholderBanner'

const productsQueryOptions = {
  queryKey: ['products'],
  queryFn: () => getAllProducts(),
}

export const Route = createFileRoute('/_site/shop/')({
  head: () => createMeta({ title: 'Shop', description: 'FiveM scripts, tools, and resources available for download or purchase.', path: '/shop' }),
  component: ShopPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(productsQueryOptions)
  },
})

const statusColors: Record<string, string> = {
  RELEASED: 'text-green-400',
  BETA: 'text-amber-400',
  ALPHA: 'text-blue-400',
  IN_DEVELOPMENT: 'text-purple-400',
  DISCONTINUED: 'text-red-400',
}

const statusLabels: Record<string, string> = {
  RELEASED: 'Released',
  BETA: 'Beta',
  ALPHA: 'Alpha',
  IN_DEVELOPMENT: 'In Development',
  COMING_SOON: 'Coming Soon',
  DISCONTINUED: 'Discontinued',
  DEPRECATED: 'Deprecated',
  ARCHIVED: 'Archived',
}

const ITEMS_PER_PAGE = 9
const HIDDEN_STATUSES = ['ARCHIVED', 'DEPRECATED', 'DISCONTINUED']

type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a' | 'price-asc' | 'price-desc'
type Layout = 'grid' | 'list'

function ShopPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [showArchived, setShowArchived] = useState(false)
  const [layout, setLayout] = useState<Layout>('grid')
  const [sortOpen, setSortOpen] = useState(false)
  const [page, setPage] = useState(1)

  const allPlatforms = useMemo(() => Array.from(new Set(products?.flatMap((p: any) => p.platforms || []).filter(Boolean) || [])).sort() as string[], [products])
  const allFrameworks = useMemo(() => Array.from(new Set(products?.flatMap((p: any) => p.frameworks || []).filter(Boolean) || [])).sort() as string[], [products])
  const allStatuses = useMemo(() => Array.from(new Set(products?.map((p: any) => p.status).filter(Boolean) || [])).sort() as string[], [products])

  const platformIcons: Record<string, any> = { FiveM: Cpu, Web: Package, Discord: Box }

  const filtered = useMemo(() => {
    let items = products || []
    // Hide archived/deprecated/discontinued by default
    if (!showArchived) items = items.filter((p: any) => !HIDDEN_STATUSES.includes(p.status))
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((p: any) => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.tags?.some((t: string) => t.toLowerCase().includes(q)))
    }
    if (selectedPlatform) items = items.filter((p: any) => p.platforms?.includes(selectedPlatform))
    if (selectedFramework) items = items.filter((p: any) => p.frameworks?.includes(selectedFramework))
    if (selectedStatus) items = items.filter((p: any) => p.status === selectedStatus)
    items = [...items].sort((a: any, b: any) => {
      switch (sort) {
        case 'oldest': return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        case 'a-z': return (a.title || '').localeCompare(b.title || '')
        case 'z-a': return (b.title || '').localeCompare(a.title || '')
        case 'price-asc': return (a.price || 0) - (b.price || 0)
        case 'price-desc': return (b.price || 0) - (a.price || 0)
        default: return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })
    return items
  }, [products, search, selectedPlatform, selectedFramework, selectedStatus, showArchived, sort])

  const archivedCount = useMemo(() => (products || []).filter((p: any) => HIDDEN_STATUSES.includes(p.status)).length, [products])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(page, totalPages)
  const paginatedItems = filtered.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE)

  const hasActiveFilters = search || selectedPlatform || selectedFramework || selectedStatus || showArchived
  const sortLabels: Record<SortOption, string> = { newest: 'Newest', oldest: 'Oldest', 'a-z': 'A → Z', 'z-a': 'Z → A', 'price-asc': 'Price ↑', 'price-desc': 'Price ↓' }

  return (
    <div className="space-y-16">
      {/* ═══ HERO HEADER ═══ */}
      <section className="relative">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]" style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-8 left-[10%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute top-16 right-[8%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2.5s' }} />
          <div className="animate-float absolute bottom-4 left-[22%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-1s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge"><ShoppingCart className="h-3.5 w-3.5" />Store</span>
          </div>
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              The{' '}<span className="relative inline-block"><span className="text-shine">Shop</span><span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" /></span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Explore my collection of <span className="text-foreground font-medium">tools</span> and{' '}
              <span className="text-foreground font-medium">scripts</span>. Open-source and premium resources for developers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Package className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{products?.length || 0}</span>
              <span className="text-muted-foreground">Products</span>
            </div>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{allPlatforms.length}</span>
              <span className="text-muted-foreground">Platforms</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOOLBAR ═══ */}
      <div className="relative z-20 space-y-4 animate-fade-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input type="text" placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="glass w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex items-center gap-2">
            <div className={`relative ${sortOpen ? 'z-50' : ''}`}>
              <button onClick={() => setSortOpen(!sortOpen)} className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm text-foreground transition-colors hover:text-primary">
                <ArrowUpDown className="h-3.5 w-3.5" />{sortLabels[sort]}<ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-1 w-40 glass-strong rounded-xl p-1 shadow-xl animate-fade-up">
                    {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                      <button key={key} onClick={() => { setSort(key); setSortOpen(false); setPage(1) }} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${sort === key ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`} style={sort === key ? { background: 'color-mix(in srgb, var(--primary) 10%, transparent)' } : {}}>{label}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="glass flex rounded-xl p-0.5">
              <button onClick={() => setLayout('grid')} className={`rounded-lg p-2 transition-colors ${layout === 'grid' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} style={layout === 'grid' ? { background: 'color-mix(in srgb, var(--primary) 12%, transparent)' } : {}} title="Grid view"><LayoutGrid className="h-4 w-4" /></button>
              <button onClick={() => setLayout('list')} className={`rounded-lg p-2 transition-colors ${layout === 'list' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} style={layout === 'list' ? { background: 'color-mix(in srgb, var(--primary) 12%, transparent)' } : {}} title="List view"><List className="h-4 w-4" /></button>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {/* Platform pills */}
          {allPlatforms.length > 1 && allPlatforms.map((p) => (
            <button key={p} onClick={() => { setSelectedPlatform(selectedPlatform === p ? null : p); setPage(1) }} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${selectedPlatform === p ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`} style={selectedPlatform === p ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}>
              {p}
            </button>
          ))}
          {allPlatforms.length > 1 && allFrameworks.length > 0 && <div className="h-6 w-px bg-border/50" />}
          {/* Framework pills */}
          {allFrameworks.map((f) => (
            <button key={f} onClick={() => { setSelectedFramework(selectedFramework === f ? null : f); setPage(1) }} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${selectedFramework === f ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`} style={selectedFramework === f ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}>
              {f}
            </button>
          ))}
          {allStatuses.length > 1 && <div className="h-6 w-px bg-border/50" />}
          {/* Status pills */}
          {allStatuses.length > 1 && allStatuses.map((s) => (
            <button key={s} onClick={() => { setSelectedStatus(selectedStatus === s ? null : s); setPage(1) }} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${selectedStatus === s ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`} style={selectedStatus === s ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}>
              {statusLabels[s] || s.replace('_', ' ')}
            </button>
          ))}
          {/* Archived toggle */}
          {archivedCount > 0 && (
            <>
              <div className="h-6 w-px bg-border/50" />
              <button
                onClick={() => { setShowArchived(!showArchived); setPage(1) }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${showArchived ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
                style={showArchived ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
              >
                <Archive className="h-3 w-3" />
                Show Archived ({archivedCount})
              </button>
            </>
          )}
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'product' : 'products'} found</p>
            <button onClick={() => { setSearch(''); setSelectedPlatform(null); setSelectedFramework(null); setSelectedStatus(null); setShowArchived(false); setPage(1) }} className="text-xs font-medium text-primary hover:underline">Clear filters</button>
          </div>
        )}
      </div>

      {/* ═══ PRODUCT GRID / LIST ═══ */}
      {paginatedItems.length > 0 ? (
        <div className={layout === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
          {paginatedItems.map((product: any, i: number) =>
            layout === 'grid' ? (
              <Link key={product.id} to="/shop/$slug" params={{ slug: product.slug }} className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl animate-fade-up block" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="relative aspect-3/2 overflow-hidden">
                  {(product.banner || (product.images && product.images.length > 0)) ? (
                    <img src={product.banner || product.images[0]} alt={product.title} className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <ProductPlaceholder title={product.title} status={product.status} className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`glass-strong inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColors[product.status] || 'text-muted-foreground'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />{statusLabels[product.status] || product.status?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 15%, transparent), transparent)' }} />
                </div>
                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold transition-colors group-hover:text-primary">{product.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="rounded-md px-2 py-0.5 text-[10px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>{product.frameworks?.join(' / ') || '—'}</span>
                    <div className="flex items-center gap-2">
                      {product.githubUrl && (
                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(product.githubUrl, '_blank') }} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-primary hover:bg-foreground/5 cursor-pointer"><Github className="h-4 w-4" /></span>
                      )}
                      <span className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all gradient-brand hover:scale-[1.02]">View<ArrowUpRight className="h-3 w-3" /></span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              /* ═══ LIST LAYOUT ═══ */
              <Link key={product.id} to="/shop/$slug" params={{ slug: product.slug }} className="group glass-card flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up sm:gap-6 sm:p-5" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                  {(product.banner || (product.images && product.images.length > 0)) ? (
                    <img src={product.banner || product.images[0]} alt={product.title} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <ProductPlaceholder title={product.title} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold transition-colors group-hover:text-primary line-clamp-1 sm:text-lg">{product.title}</h3>
                    <span className={`glass-strong inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0 ${statusColors[product.status] || 'text-muted-foreground'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />{statusLabels[product.status] || product.status?.replace('_', ' ')}
                    </span>
                  </div>
                  {product.description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">{product.description}</p>}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}>{product.frameworks?.join(' / ') || '—'}</span>
                    <span>{product.platforms?.join(' / ') || '—'}</span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-3">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No products match your filters.</p>
          <button onClick={() => { setSearch(''); setSelectedPlatform(null); setSelectedFramework(null); setSelectedStatus(null); setShowArchived(false); setPage(1) }} className="text-sm font-medium text-primary hover:underline">Clear filters</button>
        </div>
      )}

      {/* ═══ PAGINATION ═══ */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 animate-fade-up">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage <= 1}
            className="glass rounded-xl p-2.5 text-foreground transition-colors hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${n === safeCurrentPage ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
              style={n === safeCurrentPage ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage >= totalPages}
            className="glass rounded-xl p-2.5 text-foreground transition-colors hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Empty state (no products at all) */}
      {(!products || products.length === 0) && (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
            <ShoppingCart className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">No products yet</p>
          <p className="text-sm text-muted-foreground">Check back soon for new tools and scripts.</p>
        </div>
      )}
    </div>
  )
}
