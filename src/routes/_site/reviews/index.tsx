import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Star, Quote, MessageSquare, TrendingUp, Award, Search, ArrowUpDown, ChevronDown, LayoutGrid, List, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import { getAllReviews } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'

const ITEMS_PER_PAGE = 8

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest'
type Layout = 'grid' | 'list'

const reviewsQueryOptions = {
  queryKey: ['reviews'],
  queryFn: () => getAllReviews(),
}

export const Route = createFileRoute('/_site/reviews/')({
  head: () => createMeta({ title: 'Reviews', description: 'What clients and collaborators have to say about working with me.', path: '/reviews' }),
  component: ReviewsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(reviewsQueryOptions)
  },
})

function ReviewsPage() {
  const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [layout, setLayout] = useState<Layout>('grid')
  const [sortOpen, setSortOpen] = useState(false)
  const [page, setPage] = useState(1)

  const avgRating =
    reviews && reviews.length > 0
      ? (reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : '0'
  const fiveStarCount = reviews?.filter((r: any) => r.rating === 5).length || 0

  // Filter + sort
  const filtered = useMemo(() => {
    let items = reviews || []

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (r: any) =>
          r.name?.toLowerCase().includes(q) ||
          r.review?.toLowerCase().includes(q) ||
          r.company?.toLowerCase().includes(q) ||
          r.projectName?.toLowerCase().includes(q),
      )
    }

    if (ratingFilter) {
      items = items.filter((r: any) => r.rating === ratingFilter)
    }

    items = [...items].sort((a: any, b: any) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        case 'highest':
          return (b.rating || 0) - (a.rating || 0)
        case 'lowest':
          return (a.rating || 0) - (b.rating || 0)
        default: // newest
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })

    return items
  }, [reviews, search, sort, ratingFilter])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(page, totalPages)
  const paginatedItems = filtered.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE)

  const sortLabels: Record<SortOption, string> = { newest: 'Newest', oldest: 'Oldest', highest: 'Highest Rated', lowest: 'Lowest Rated' }

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
          <div className="animate-float absolute top-8 right-[14%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2s' }} />
          <div className="animate-float absolute bottom-8 left-[28%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-3.5s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <MessageSquare className="h-3.5 w-3.5" />
              Testimonials
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Client{' '}
              <span className="relative inline-block">
                <span className="text-shine">Reviews</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" />
              </span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              What <span className="text-foreground font-medium">clients</span> have said about working with me on{' '}
              <span className="text-foreground font-medium">projects</span>.
            </p>
          </div>

          {/* Rating summary */}
          {reviews && reviews.length > 0 && (
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold text-foreground">{avgRating}</span>
                <span className="text-muted-foreground">Average</span>
              </div>
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{reviews.length}</span>
                <span className="text-muted-foreground">Reviews</span>
              </div>
              <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">{fiveStarCount}</span>
                <span className="text-muted-foreground">5-Star</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ TOOLBAR ═══ */}
      {reviews && reviews.length > 0 && (
        <div className="relative z-20 space-y-4 animate-fade-up">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
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
                    <div className="absolute left-0 sm:left-auto sm:right-0 z-50 mt-1 w-44 glass-strong rounded-xl p-1 shadow-xl animate-fade-up">
                      {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => { setSort(key); setSortOpen(false); setPage(1) }}
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

          {/* Rating filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setRatingFilter(null); setPage(1) }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${!ratingFilter ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
              style={!ratingFilter ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
            >
              All Ratings
            </button>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                onClick={() => { setRatingFilter(ratingFilter === star ? null : star); setPage(1) }}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${ratingFilter === star ? 'text-primary-foreground shadow-sm' : 'glass text-muted-foreground hover:text-foreground'}`}
                style={ratingFilter === star ? { background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' } : {}}
              >
                <Star className="h-3 w-3 fill-current" />{star}
              </button>
            ))}
          </div>

          {/* Results count */}
          {(search || ratingFilter) && (
            <p className="text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'} found
              {search && <> matching "<span className="text-foreground font-medium">{search}</span>"</>}
              {ratingFilter && <> with <span className="text-primary font-medium">{ratingFilter} stars</span></>}
            </p>
          )}
        </div>
      )}

      {/* ═══ REVIEWS ═══ */}
      {paginatedItems.length > 0 ? (
        <div className={layout === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2' : 'space-y-4'}>
          {paginatedItems.map((review: any, i: number) =>
            layout === 'grid' ? (
              /* ═══ GRID CARD ═══ */
              <div
                key={review.id}
                className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Gradient top accent */}
                <div
                  className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                  style={{ background: 'linear-gradient(90deg, var(--glow), var(--glow-secondary))' }}
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <Quote className="h-8 w-8 text-primary/20 transition-colors group-hover:text-primary/40" />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 transition-all duration-300 ${j < review.rating ? 'fill-primary text-primary' : 'text-foreground/10'} ${j < review.rating ? 'group-hover:scale-110' : ''}`}
                          style={{ transitionDelay: `${j * 30}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="italic leading-relaxed text-muted-foreground">
                    &ldquo;{review.review}&rdquo;
                  </p>

                  <div className="border-t border-border/50 pt-4">
                    <div className="flex items-center gap-3">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-primary"
                          style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
                        >
                          {review.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{review.name}</p>
                        {(review.position || review.company) && (
                          <p className="text-sm text-muted-foreground">
                            {[review.position, review.company].filter(Boolean).join(' @ ')}
                          </p>
                        )}
                      </div>
                    </div>
                    {review.projectName && (
                      <p className="mt-2 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-primary"
                        style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
                      >
                        Project: {review.projectName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* ═══ LIST CARD ═══ */
              <div
                key={review.id}
                className="group glass-card flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up sm:gap-6 sm:p-5"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
                    >
                      {review.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-foreground transition-colors group-hover:text-primary">{review.name}</p>
                      {(review.position || review.company) && (
                        <p className="text-xs text-muted-foreground">
                          {[review.position, review.company].filter(Boolean).join(' @ ')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-3.5 w-3.5 ${j < review.rating ? 'fill-primary text-primary' : 'text-foreground/10'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic leading-relaxed text-muted-foreground line-clamp-2">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  {review.projectName && (
                    <p className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
                    >
                      Project: {review.projectName}
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center space-y-3">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No reviews match your filters.</p>
          <button onClick={() => { setSearch(''); setRatingFilter(null); setSort('newest'); setPage(1) }} className="text-sm font-medium text-primary hover:underline">Clear filters</button>
        </div>
      ) : null}

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
  )
}
