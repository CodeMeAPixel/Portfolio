import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { BookOpen, ExternalLink, FileText, FolderOpen, ChevronRight, Search, ArrowRight, ArrowUpDown, ChevronDown, LayoutGrid, List } from 'lucide-react'
import { DynamicIcon } from '~/components/DynamicIcon'
import { useState, useMemo } from 'react'
import { getDocSections } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'

type SortOption = 'a-z' | 'z-a' | 'newest' | 'oldest'
type Layout = 'grid' | 'list'

const docsQueryOptions = {
  queryKey: ['docs'],
  queryFn: () => getDocSections(),
}

export const Route = createFileRoute('/_site/docs/')({
  head: () => createMeta({ title: 'Documentation', description: 'Guides, references, and documentation for my projects and scripts.', path: '/docs' }),
  component: DocsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(docsQueryOptions)
  },
})

function DocsPage() {
  const { data: sections } = useSuspenseQuery(docsQueryOptions)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('a-z')
  const [layout, setLayout] = useState<Layout>('grid')
  const [sortOpen, setSortOpen] = useState(false)

  const totalItems = sections?.reduce(
    (sum: number, s: any) => sum + s.categories.reduce((cs: number, c: any) => cs + c.items.length, 0),
    0,
  ) || 0

  // Filter sections/categories/items by search + sort
  const filteredSections = useMemo(() => {
    if (!sections) return []
    let result = sections

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result
        .map((section: any) => ({
          ...section,
          categories: section.categories
            .map((cat: any) => ({
              ...cat,
              items: cat.items.filter(
                (item: any) =>
                  item.title?.toLowerCase().includes(q) ||
                  item.description?.toLowerCase().includes(q) ||
                  item.keywords?.some((k: string) => k.toLowerCase().includes(q)),
              ),
            }))
            .filter((cat: any) => cat.items.length > 0),
        }))
        .filter((section: any) => section.categories.length > 0)
    }

    // Sort items within each category
    result = result.map((section: any) => ({
      ...section,
      categories: section.categories.map((cat: any) => ({
        ...cat,
        items: [...cat.items].sort((a: any, b: any) => {
          switch (sort) {
            case 'z-a':
              return (b.title || '').localeCompare(a.title || '')
            case 'newest':
              return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            case 'oldest':
              return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
            default: // a-z
              return (a.title || '').localeCompare(b.title || '')
          }
        }),
      })),
    }))

    return result
  }, [sections, search, sort])

  const filteredTotal = filteredSections.reduce(
    (sum: number, s: any) => sum + s.categories.reduce((cs: number, c: any) => cs + c.items.length, 0),
    0,
  )

  return (
    <div className="space-y-16">
      {/* ═══ HERO HEADER ═══ */}
      <section className="relative">
        {/* Glow blob */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />

        {/* Floating dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-12 left-[10%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute top-6 right-[14%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2s' }} />
          <div className="animate-float absolute bottom-2 left-[28%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-3s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <BookOpen className="h-3.5 w-3.5" />
              Guides
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="relative inline-block">
                <span className="text-shine">Documentation</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" />
              </span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              <span className="text-foreground font-medium">Guides</span>,{' '}
              <span className="text-foreground font-medium">tutorials</span>, and{' '}
              <span className="text-foreground font-medium">documentation</span> for my projects.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <FolderOpen className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{sections?.length || 0}</span>
              <span className="text-muted-foreground">Projects</span>
            </div>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <FileText className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{totalItems}</span>
              <span className="text-muted-foreground">Articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOOLBAR ═══ */}
      <div className="relative z-20 space-y-3 animate-fade-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input type="text" placeholder="Search documentation..." value={search} onChange={(e) => setSearch(e.target.value)} className="glass w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
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
        {search && (
          <p className="text-sm text-muted-foreground">
            {filteredTotal} {filteredTotal === 1 ? 'article' : 'articles'} matching "<span className="text-foreground font-medium">{search}</span>"
          </p>
        )}
      </div>

      {/* ═══ DOC SECTIONS ═══ */}
      {filteredSections.length > 0 ? (
        <div className="space-y-16">
          {filteredSections.map((section: any, sectionIdx: number) => (
            <section key={section.id} className="space-y-8">
              {/* Section header */}
              <div className="flex items-center gap-3 animate-fade-up">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
                >
                  <DynamicIcon name={section.icon} className="h-5 w-5 text-primary" fallback={<BookOpen className="h-5 w-5 text-primary" />} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{section.name}</h2>
                  </div>
                  {section.description && (
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  )}
                </div>
                <div className="ml-auto h-px flex-1 max-w-32 gradient-brand opacity-30" />
              </div>

              {/* Categories */}
              {section.categories.map((cat: any, catIdx: number) => (
                <div key={cat.id} className="space-y-4 animate-fade-up" style={{ animationDelay: `${catIdx * 0.05}s` }}>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-primary" />
                    {cat.title}
                  </h3>

                  <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                    {cat.items.map((item: any, itemIdx: number) =>
                      layout === 'grid' ? (
                        <Link
                          key={item.id}
                          to="/docs/$section/$category/$slug"
                          params={{ section: section.slug, category: cat.slug, slug: item.slug }}
                          className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up block"
                          style={{ animationDelay: `${(catIdx * 0.05) + (itemIdx * 0.04)}s` }}
                        >
                          {/* Gradient accent */}
                          <div
                            className="h-0.5 w-full transition-all duration-300 group-hover:h-1"
                            style={{ background: 'linear-gradient(90deg, var(--glow), var(--glow-secondary))' }}
                          />

                          <div className="p-5 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <h4 className="font-semibold text-sm transition-colors group-hover:text-primary">{item.title}</h4>
                                {item.projectUrl && (
                                  <a
                                    href={item.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground/50 transition-all hover:text-primary"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ) : (
                        /* ═══ LIST LAYOUT ═══ */
                        <Link
                          key={item.id}
                          to="/docs/$section/$category/$slug"
                          params={{ section: section.slug, category: cat.slug, slug: item.slug }}
                          className="group glass-card flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up sm:p-5"
                          style={{ animationDelay: `${(catIdx * 0.05) + (itemIdx * 0.03)}s` }}
                        >
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors"
                            style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                          >
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold transition-colors group-hover:text-primary line-clamp-1">{item.title}</h4>
                              {item.projectUrl && (
                                <a
                                  href={item.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground/50 transition-all hover:text-primary"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">{item.description}</p>
                            )}
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      ) : search ? (
        <div className="glass-card rounded-2xl p-8 text-center space-y-3">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No documentation matches your search.</p>
          <button onClick={() => { setSearch(''); setSort('a-z') }} className="text-sm font-medium text-primary hover:underline">Clear search</button>
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 sm:p-16">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
          >
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">Documentation coming soon</p>
          <p className="text-sm text-muted-foreground">Check back soon for guides and tutorials.</p>
        </div>
      )}
    </div>
  )
}
