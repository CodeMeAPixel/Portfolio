import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Code2, ExternalLink, Github, Star, Layers, ArrowRight, Folder, Search, ArrowUpDown, ChevronDown, LayoutGrid, List, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import { getAllProjects } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'
import { ProjectPlaceholder } from '~/components/PlaceholderBanner'

const allProjectsQueryOptions = {
  queryKey: ['projects'],
  queryFn: () => getAllProjects(),
}

export const Route = createFileRoute('/_site/projects/')({
  head: () => createMeta({ title: 'Projects', description: 'Explore the projects I\'ve built — from full-stack web apps to open-source tools.', path: '/projects' }),
  component: ProjectsPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(allProjectsQueryOptions)
  },
})

const ITEMS_PER_PAGE = 8

type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a'
type Layout = 'grid' | 'list'

function ProjectsPage() {
  const { data: projects } = useSuspenseQuery(allProjectsQueryOptions)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string | null>(null)
  const [sort, setSort] = useState<SortOption>('newest')
  const [layout, setLayout] = useState<Layout>('grid')
  const [sortOpen, setSortOpen] = useState(false)
  const [page, setPage] = useState(1)

  const isFiltering = Boolean(search.trim() || filter)

  const allTags = useMemo(() =>
    Array.from(new Set(projects?.flatMap((p: any) => p.tags || []) || [])).sort(),
  [projects])

  // Featured projects — always shown in their own section when not filtering
  const featuredProjects = useMemo(
    () => (projects || []).filter((p: any) => p.featured),
    [projects],
  )

  // The main filterable/sortable list.
  // When not filtering: excludes featured (they have their own section).
  // When filtering: includes everything but featured always float to the top.
  const filtered = useMemo(() => {
    let items = (projects || []) as any[]

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(q)),
      )
    }

    if (filter) items = items.filter((p) => p.tags?.includes(filter))

    items = [...items].sort((a, b) => {
      // When search/filter is active, featured projects always surface first
      if (isFiltering) {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
      }
      switch (sort) {
        case 'oldest': return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        case 'a-z': return (a.title || '').localeCompare(b.title || '')
        case 'z-a': return (b.title || '').localeCompare(a.title || '')
        default: return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })

    // When not filtering, the featured section above handles featured projects
    if (!isFiltering) items = items.filter((p) => !p.featured)

    return items
  }, [projects, search, filter, sort, isFiltering])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(page, totalPages)
  const paginatedItems = filtered.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE)

  const featuredCount = featuredProjects.length
  const sortLabels: Record<SortOption, string> = { newest: 'Newest', oldest: 'Oldest', 'a-z': 'A → Z', 'z-a': 'Z → A' }

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
          <div className="animate-float absolute top-12 left-[8%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute top-6 right-[12%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-3s' }} />
          <div className="animate-float absolute bottom-4 left-[25%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-1.5s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <Folder className="h-3.5 w-3.5" />
              Portfolio
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              My{' '}
              <span className="relative inline-block">
                <span className="text-shine">Projects</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" />
              </span>
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              A collection of <span className="text-foreground font-medium">web applications</span>,{' '}
              <span className="text-foreground font-medium">tools</span>, and{' '}
              <span className="text-foreground font-medium">open-source projects</span> I've built and shipped.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Layers className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{projects?.length || 0}</span>
              <span className="text-muted-foreground">Projects</span>
            </div>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">{featuredCount}</span>
              <span className="text-muted-foreground">Featured</span>
            </div>
          </div>

          {/* Tag filter pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button
                  onClick={() => { setFilter(null); setPage(1) }}
                className={`group relative overflow-hidden rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  !filter ? 'gradient-brand text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              {allTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setFilter(filter === tag ? null : tag); setPage(1) }}
                  className={`group relative overflow-hidden rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                    filter === tag ? 'gradient-brand text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{tag}</span>
                  {filter !== tag && (
                    <span
                      className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0 opacity-10"
                      style={{ background: 'linear-gradient(90deg, transparent, var(--glow), transparent)' }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ FEATURED PROJECTS ═══ */}
      {!isFiltering && featuredProjects.length > 0 && (
        <section className="space-y-5 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <h2 className="text-lg font-bold">Featured Projects</h2>
            </div>
            <div className="h-px flex-1" style={{ background: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }} />
          </div>

          <div className={
            featuredProjects.length === 1
              ? 'grid grid-cols-1'
              : featuredProjects.length === 2
                ? 'grid grid-cols-1 gap-6 md:grid-cols-2'
                : 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
          }>
            {featuredProjects.map((project: any, i: number) => (
              <Link
                key={project.id}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-up"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  background: 'color-mix(in srgb, var(--primary) 4%, var(--card))',
                  border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)',
                }}
              >
                {/* Shimmer border accent */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: '0 0 0 1px color-mix(in srgb, var(--primary) 40%, transparent), 0 8px 40px -8px color-mix(in srgb, var(--glow) 30%, transparent)' }}
                />

                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ProjectPlaceholder
                      title={project.title}
                      className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                  {/* Featured pill */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-lg gradient-brand">
                      <Star className="h-3 w-3 fill-primary-foreground" />
                      Featured
                    </span>
                  </div>
                  {/* Hover sweep */}
                  <div
                    className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                    style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 15%, transparent), transparent)' }}
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold transition-colors group-hover:text-primary">{project.title}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                  </div>
                  {project.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{project.description}</p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 5).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-md px-2 py-0.5 text-[11px] font-medium text-primary"
                          style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          +{project.tags.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-3 border-t pt-3" style={{ borderColor: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                    {project.demoUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                        <ExternalLink className="h-3 w-3" />Live Demo
                      </span>
                    )}
                    {project.githubUrl && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Github className="h-3 w-3" />Source
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Section divider + heading for the rest */}
      {!isFiltering && filtered.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-bold">All Projects</h2>
          </div>
          <div className="h-px flex-1" style={{ background: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }} />
        </div>
      )}

      {/* ═══ TOOLBAR ═══ */}
      <div className="relative z-20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-up">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="glass w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
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

      {isFiltering && (
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} found
          {search && <> matching "<span className="text-foreground font-medium">{search}</span>"</>}
          {filter && <> tagged <span className="text-primary font-medium">{filter}</span></>}
        </p>
      )}

      {/* ═══ PROJECT GRID / LIST ═══ */}
      {paginatedItems.length > 0 ? (
        <div className={layout === 'grid' ? 'grid grid-cols-1 gap-6 md:grid-cols-2' : 'space-y-4'}>
          {paginatedItems.map((project: any, i: number) =>
            layout === 'grid' ? (
              <Link
                key={project.id}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="relative aspect-2/1 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img src={project.images[0]} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <ProjectPlaceholder title={project.title} className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  )}
                  {/* Show featured badge in search results too */}
                  {project.featured && isFiltering && (
                    <div className="absolute top-3 right-3">
                      <span className="glass-strong inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold text-primary"><Star className="h-3 w-3 fill-primary" />Featured</span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 15%, transparent), transparent)' }} />
                </div>
                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold transition-colors group-hover:text-primary">{project.title}</h3>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 5).map((tag: string) => (
                        <span key={tag} className="rounded-md px-2 py-0.5 text-[11px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>{tag}</span>
                      ))}
                      {project.tags.length > 5 && <span className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground">+{project.tags.length - 5}</span>}
                    </div>
                  )}
                  <div className="flex items-center gap-3 border-t border-border/50 pt-3">
                    {project.demoUrl && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary"><ExternalLink className="h-3 w-3" />Live</span>}
                    {project.githubUrl && <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><Github className="h-3 w-3" />Source</span>}
                  </div>
                </div>
              </Link>
            ) : (
              /* ═══ LIST LAYOUT ═══ */
              <Link
                key={project.id}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group glass-card flex gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 animate-fade-up sm:gap-6 sm:p-5"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                  {project.images && project.images.length > 0 ? (
                    <img src={project.images[0]} alt={project.title} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : (
                    <ProjectPlaceholder title={project.title} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold transition-colors group-hover:text-primary line-clamp-1 sm:text-lg">{project.title}</h3>
                    {project.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-primary text-primary" />}
                  </div>
                  {project.description && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">{project.description}</p>}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="rounded-md px-2 py-0.5 text-[10px] font-medium text-primary" style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {project.demoUrl && <span className="inline-flex items-center gap-1 text-primary"><ExternalLink className="h-3 w-3" />Live</span>}
                    {project.githubUrl && <span className="inline-flex items-center gap-1"><Github className="h-3 w-3" />Source</span>}
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}>
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">
            {isFiltering ? 'No matching projects' : 'No projects yet'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isFiltering ? 'Try adjusting your filters or search terms.' : 'Check back soon for new projects.'}
          </p>
          {isFiltering && (
            <button
              onClick={() => { setFilter(null); setSearch(''); setPage(1) }}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium text-primary-foreground transition-all gradient-brand hover:scale-[1.02]"
            >
              Clear Filters
            </button>
          )}
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
  )
}
