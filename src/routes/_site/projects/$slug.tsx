import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  ExternalLink, Github, ArrowLeft, CheckCircle2, Quote, Sparkles, Zap, Shield,
  ChevronLeft, ChevronRight, Image, BookOpen, ArrowUpRight, FileText, List,
  Users, Calendar, Briefcase, LifeBuoy,
} from 'lucide-react'
import { useState } from 'react'
import { getProjectBySlug } from '~/lib/server-fns'
import { Markdown } from '~/components/Markdown'
import { ProjectPlaceholder } from '~/components/PlaceholderBanner'
import { createMeta } from '~/lib/meta'

const projectQueryOptions = (slug: string) => ({
  queryKey: ['projects', slug],
  queryFn: () => getProjectBySlug({ data: { slug } }),
})

export const Route = createFileRoute('/_site/projects/$slug')({
  component: ProjectDetailPage,
  head: ({ loaderData }) => {
    const p = loaderData as any
    return createMeta({
      title: p?.title ?? 'Project',
      description: p?.description ?? 'View project details.',
      path: `/projects/${p?.slug ?? ''}`,
      image: p?.images?.[0],
    })
  },
  loader: async ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(projectQueryOptions(params.slug))
  },
  errorComponent: () => (
    <div className="space-y-6">
      <Link to="/projects" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Projects
      </Link>
      <div className="glass-card rounded-2xl p-8 text-center space-y-3 sm:p-16">
        <p className="text-lg font-medium">Project not found</p>
        <p className="text-sm text-muted-foreground">The project you're looking for doesn't exist or has been removed.</p>
      </div>
    </div>
  ),
})

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl glass-card">
        <img
          src={images[active]}
          alt={`${title} screenshot ${active + 1}`}
          className="w-full aspect-video object-cover"
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 glass-strong flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-all hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 glass-strong flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-all hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 right-3 glass-strong rounded-full px-3 py-1 text-xs font-medium text-foreground">
              <Image className="mr-1.5 inline h-3 w-3" />
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                i === active
                  ? 'ring-2 ring-primary scale-[1.02]'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${title} thumb ${i + 1}`}
                className="h-16 w-24 object-cover sm:h-20 sm:w-32"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Tabs ─── */
type Tab = 'overview' | 'features' | 'challenges' | 'solutions'

function ProjectDetailPage() {
  const { slug } = Route.useParams()
  const { data: project } = useSuspenseQuery(projectQueryOptions(slug))
  const [tab, setTab] = useState<Tab>('overview')

  const technologies = project.technologies as { name: string; icon?: string }[] | string[] | null
  const partners = project.partners as { name: string; url?: string; logo?: string }[] | null

  const tabs: { id: Tab; label: string; icon: any; show: boolean }[] = [
    { id: 'overview',   label: 'Overview',   icon: FileText, show: !!project.longDescription },
    { id: 'features',   label: 'Features',   icon: List,     show: project.keyFeatures.length > 0 },
    { id: 'challenges', label: 'Challenges', icon: Zap,      show: project.challenges.length > 0 },
    { id: 'solutions',  label: 'Solutions',  icon: Shield,   show: project.solutions.length > 0 },
  ]

  const visibleTabs = tabs.filter((t) => t.show)

  return (
    <div className="min-w-0 space-y-10">
      {/* Back link */}
      <Link
        to="/projects"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary animate-fade-up"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Projects
      </Link>

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative overflow-hidden rounded-2xl animate-fade-up" style={{ animationDelay: '0.05s' }}>
        {/* Glow blob */}
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full blur-[120px] opacity-25"
          style={{ background: 'var(--glow)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full blur-[100px] opacity-20"
          style={{ background: 'var(--glow-secondary)' }}
        />

        {/* Floating dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-8 right-[15%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute bottom-12 right-[30%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2s' }} />
        </div>

        <div
          className="relative z-10 space-y-5 p-5 sm:p-8 md:p-10"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--glow) 12%, var(--card)), color-mix(in srgb, var(--glow-secondary) 8%, var(--card)))`,
          }}
        >
          <span className="section-badge">
            <Sparkles className="h-3.5 w-3.5" />
            Project
          </span>

          <h1 className="text-3xl font-black tracking-tight wrap-break-word sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-shine">{project.title}</span>
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">{project.description}</p>

          {/* Tech tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="group relative overflow-hidden glass-strong rounded-full px-3 py-1 text-sm font-medium text-primary"
                >
                  <span className="relative z-10">{tag}</span>
                  <span
                    className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0 opacity-10"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--glow), transparent)' }}
                  />
                </span>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all gradient-brand hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            )}
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3"
              >
                <BookOpen className="h-4 w-4" />
                Docs
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ═══ IMAGE GALLERY ═══ */}
      {project.images && project.images.length > 0 ? (
        <ImageGallery images={project.images} title={project.title} />
      ) : (
        <div className="animate-fade-up overflow-hidden rounded-2xl" style={{ animationDelay: '0.1s' }}>
          <ProjectPlaceholder title={project.title} />
        </div>
      )}

      {/* ═══ CONTENT ═══ */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="min-w-0 space-y-6 lg:col-span-2">
          {/* Tabs */}
          {visibleTabs.length > 1 && (
            <div className="flex gap-1 overflow-x-auto animate-fade-up" style={{ animationDelay: '0.15s' }}>
              {visibleTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                    tab === t.id
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Tab: Overview */}
          {tab === 'overview' && project.longDescription && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Markdown content={project.longDescription} />
            </div>
          )}

          {/* Tab: Features */}
          {tab === 'features' && project.keyFeatures.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                Key Features
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {project.keyFeatures.map((f: string) => (
                  <div
                    key={f}
                    className="flex items-start gap-3 rounded-xl p-3 text-sm text-muted-foreground transition-all hover:bg-foreground/2"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Challenges */}
          {tab === 'challenges' && project.challenges.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                Challenges
              </h2>
              <ul className="space-y-2">
                {project.challenges.map((c: string, i: number) => (
                  <li
                    key={c}
                    className="flex items-start gap-3 text-sm text-muted-foreground rounded-xl p-3 transition-all hover:bg-foreground/2"
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                    >
                      {i + 1}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab: Solutions */}
          {tab === 'solutions' && project.solutions.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                Solutions
              </h2>
              <ul className="space-y-2">
                {project.solutions.map((s: string) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground rounded-xl p-3 transition-all hover:bg-foreground/2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ═══ SIDEBAR ═══ */}
        <div className="min-w-0 space-y-6">
          {/* Project details */}
          <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <h3 className="font-bold flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Project Details
            </h3>
            <div className="space-y-3 text-sm">
              {project.role && (
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-muted-foreground">Role</span>
                  <span className="truncate font-medium text-foreground">{project.role}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-muted-foreground">Team Size</span>
                  <span className="truncate font-medium text-foreground">{project.teamSize}</span>
                </div>
              )}
              {project.date && (
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-muted-foreground">Date</span>
                  <span className="truncate font-medium text-foreground">{project.date}</span>
                </div>
              )}
            </div>
          </div>

          {/* Technologies */}
          {technologies && Array.isArray(technologies) && technologies.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-up" style={{ animationDelay: '0.18s' }}>
              <h3 className="font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech: any, i: number) => {
                  const name = typeof tech === 'string' ? tech : tech.name
                  return (
                    <span
                      key={i}
                      className="rounded-full px-2.5 py-1 text-xs font-medium text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                    >
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="glass-card rounded-2xl p-5 space-y-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Links
            </h3>
            <div className="space-y-2">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <Github className="h-4 w-4" />
                  GitHub Repository
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
              {project.docsUrl && (
                <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <BookOpen className="h-4 w-4" />
                  Documentation
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
              {project.supportUrl && (
                <a href={project.supportUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <LifeBuoy className="h-4 w-4" />
                  Support
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Testimonials */}
          {project.testimonials && project.testimonials.length > 0 && (
            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              <h3 className="font-bold flex items-center gap-2 px-1">
                <Quote className="h-4 w-4 text-primary" />
                Testimonials
              </h3>
              {project.testimonials.map((t: any) => (
                <div key={t.id} className="group glass-card rounded-2xl p-5 space-y-3 transition-all duration-300 hover:-translate-y-0.5">
                  <Quote className="h-5 w-5 text-primary/30 transition-colors group-hover:text-primary/50" />
                  <p className="text-sm italic leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t pt-3" style={{ borderColor: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }}>
                    <div className="flex items-center gap-2.5">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.author} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-primary"
                          style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
                        >
                          {t.author?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold">{t.author}</p>
                        {t.position && (
                          <p className="text-xs text-muted-foreground">{t.position}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Partners */}
          {partners && partners.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-up" style={{ animationDelay: '0.28s' }}>
              <h3 className="font-bold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Partners
              </h3>
              <div className="space-y-2">
                {partners.map((p: any, i: number) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {p.logo && <img src={p.logo} alt={p.name} className="h-6 w-6 rounded-md object-contain" />}
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {p.name}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-foreground">{p.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
