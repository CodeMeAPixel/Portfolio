import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Calendar, Clock, Tag, PenLine, BookOpen, ArrowRight, Search, LayoutGrid, List, ChevronDown, ArrowUpDown, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import { getAllBlogPosts } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'
import { BlogPlaceholder } from '~/components/PlaceholderBanner'

const blogQueryOptions = {
  queryKey: ['blog'],
  queryFn: () => getAllBlogPosts(),
}

export const Route = createFileRoute('/_site/blog/')({
  head: () => createMeta({ title: 'Blog', description: 'Articles and tutorials on web development, programming, and technology.', path: '/blog' }),
  component: BlogPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(blogQueryOptions)
  },
})

const POSTS_PER_PAGE = 6

type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a'
type Layout = 'grid' | 'list'

function BlogPage() {
  const { data: posts } = useSuspenseQuery(blogQueryOptions)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [layout, setLayout] = useState<Layout>('grid')
  const [page, setPage] = useState(1)
  const [sortOpen, setSortOpen] = useState(false)

  const featured = posts?.[0]

  // Collect all unique tags
  const allTags = useMemo(() => {
    if (!posts) return []
    const tags = new Set<string>()
    posts.forEach((p: any) => p.tags?.forEach((t: string) => tags.add(t)))
    return Array.from(tags).sort()
  }, [posts])

  // Filter + sort (skip featured)
  const filtered = useMemo(() => {
    let items = posts?.slice(1) || []

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (p: any) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(q)),
      )
    }

    // Tag filter
    if (selectedTag) {
      items = items.filter((p: any) => p.tags?.includes(selectedTag))
    }

    // Sort
    items = [...items].sort((a: any, b: any) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.publishedAt || 0).getTime() - new Date(b.publishedAt || 0).getTime()
        case 'a-z':
          return (a.title || '').localeCompare(b.title || '')
        case 'z-a':
          return (b.title || '').localeCompare(a.title || '')
        default: // newest
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
      }
    })

    return items
  }, [posts, search, selectedTag, sort])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const safeCurrentPage = Math.min(page, totalPages)
  const paginatedPosts = filtered.slice((safeCurrentPage - 1) * POSTS_PER_PAGE, safeCurrentPage * POSTS_PER_PAGE)

  // Reset page when filters change
  const resetPage = () => setPage(1)

  const sortLabels: Record<SortOption, string> = { newest: 'Newest', oldest: 'Oldest', 'a-z': 'A → Z', 'z-a': 'Z → A' }

  return (
    <div className="space-y-16">
      {/* ═══ HERO HEADER ═══ */}
      <section className="relative">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-10 left-[12%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute top-4 right-[10%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2s' }} />
          <div className="animate-float absolute bottom-0 left-[30%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-4s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <PenLine className="h-3.5 w-3.5" />
              Writing
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              The{' '}
              <span className="relative inline-block">
                <span className="text-shine">Blog</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" />
              </span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              Thoughts on <span className="text-foreground font-medium">web development</span>,{' '}
              <span className="text-foreground font-medium">open source</span>, and{' '}
              <span className="text-foreground font-medium">building in public</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{posts?.length || 0}</span>
              <span className="text-muted-foreground">Articles</span>
            </div>
          </div>
        </div>
      </section>

      {posts && posts.length > 0 ? (
        <div className="space-y-12">
          {/* ═══ FEATURED POST ═══ */}
          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up block"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="grid md:grid-cols-5">
                <div className="relative md:col-span-2 overflow-hidden">
                  {featured.image ? (
                    <img src={featured.image} alt={featured.title} className="h-full min-h-50 w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <BlogPlaceholder title={featured.title} category={featured.categories?.[0]} className="h-full min-h-50 w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="glass-strong inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold text-primary">Latest Post</span>
                  </div>
                  <div className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 15%, transparent), transparent)' }} />
                </div>
                <div className="md:col-span-3 p-5 sm:p-6 md:p-8 space-y-4">
                  <h2 className="text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl md:text-3xl">{featured.title}</h2>
                  {featured.description && <p className="text-muted-foreground leading-relaxed line-clamp-3">{featured.description}</p>}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {featured.publishedAt && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        {new Date(featured.publishedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    {featured.readingTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        {featured.readingTime}
                      </span>
                    )}
                  </div>
                  {featured.tags && featured.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tags.map((tag: string) => (
                        <span key={tag} className="rounded-md px-2 py-0.5 text-[11px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* ═══ TOOLBAR: Search / Sort / Layout ═══ */}
          <div className="relative z-20 space-y-4 animate-fade-up">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); resetPage() }}
                  className="glass w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Sort dropdown */}
                <div className={`relative ${sortOpen ? 'z-50' : ''}`}>
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm text-foreground transition-colors hover:text-primary"
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    {sortLabels[sort]}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {sortOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                      <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-1 w-40 glass-strong rounded-xl p-1 shadow-xl animate-fade-up">
                        {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => { setSort(key); setSortOpen(false); resetPage() }}
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

            {/* Tag filter pills */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedTag(null); resetPage() }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${!selectedTag ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
                  style={!selectedTag ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(selectedTag === tag ? null : tag); resetPage() }}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${selectedTag === tag ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
                    style={selectedTag === tag ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Results count */}
            {(search || selectedTag) && (
              <p className="text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
                {search && <> matching "<span className="text-foreground font-medium">{search}</span>"</>}
                {selectedTag && <> tagged <span className="text-primary font-medium">{selectedTag}</span></>}
              </p>
            )}
          </div>

          {/* ═══ POST LIST ═══ */}
          {paginatedPosts.length > 0 ? (
            <div className={layout === 'grid' ? 'grid grid-cols-1 gap-5 md:grid-cols-2' : 'space-y-4'}>
              {paginatedPosts.map((post: any, i: number) =>
                layout === 'grid' ? (
                  <Link
                    key={post.id}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up block"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                      ) : (
                        <BlogPlaceholder title={post.title} category={post.categories?.[0]} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold transition-colors group-hover:text-primary line-clamp-2">{post.title}</h3>
                      {post.description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.description}</p>}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {post.publishedAt && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {new Date(post.publishedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {post.readingTime && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {post.readingTime}
                          </span>
                        )}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {post.tags.slice(0, 4).map((tag: string) => (
                            <span key={tag} className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}>
                              <Tag className="w-2.5 h-2.5" />{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ) : (
                  /* ═══ LIST LAYOUT ═══ */
                  <Link
                    key={post.id}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group glass-card flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up sm:gap-6 sm:p-5"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                      ) : (
                        <BlogPlaceholder title={post.title} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="text-base font-bold transition-colors group-hover:text-primary line-clamp-1 sm:text-lg">{post.title}</h3>
                      {post.description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">{post.description}</p>}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {post.publishedAt && (
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {new Date(post.publishedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {post.readingTime && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {post.readingTime}
                          </span>
                        )}
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="rounded-md px-2 py-0.5 text-[10px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ),
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center space-y-3">
              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No articles match your filters.</p>
              <button
                onClick={() => { setSearch(''); setSelectedTag(null); resetPage() }}
                className="text-sm font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
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
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
            <PenLine className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">No posts yet</p>
          <p className="text-sm text-muted-foreground">Check back soon for new articles.</p>
        </div>
      )}
    </div>
  )
}
