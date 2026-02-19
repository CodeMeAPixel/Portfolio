import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  ExternalLink, Github, ArrowLeft, CheckCircle2, Sparkles, Zap, Shield,
  ChevronLeft, ChevronRight, Image, AlertTriangle, ArrowUpRight,
  BookOpen, Package, Cpu, FileText, Play, Download, Info, List,
} from 'lucide-react'
import { useState } from 'react'
import { getProductBySlug } from '~/lib/server-fns'
import { Markdown } from '~/components/Markdown'
import { ProductPlaceholder } from '~/components/PlaceholderBanner'
import { createMeta } from '~/lib/meta'

const productQueryOptions = (slug: string) => ({
  queryKey: ['products', slug],
  queryFn: () => getProductBySlug({ data: { slug } }),
})

export const Route = createFileRoute('/_site/shop/$slug')({
  component: ProductDetailPage,
  head: ({ loaderData }) => {
    const p = loaderData as any
    return createMeta({
      title: p?.name ?? 'Product',
      description: p?.description ?? 'View product details.',
      path: `/shop/${p?.slug ?? ''}`,
      image: p?.banner || p?.images?.[0],
    })
  },
  loader: async ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(productQueryOptions(params.slug))
  },
  errorComponent: () => (
    <div className="space-y-6">
      <Link to="/shop" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Shop
      </Link>
      <div className="glass-card rounded-2xl p-8 text-center space-y-3 sm:p-16">
        <p className="text-lg font-medium">Product not found</p>
        <p className="text-sm text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    </div>
  ),
})

/* ─── Status badge colors ─── */
const statusStyles: Record<string, { color: string; label: string }> = {
  Released:      { color: 'text-green-400',  label: 'Released' },
  InDevelopment: { color: 'text-amber-400',  label: 'In Development' },
  ComingSoon:    { color: 'text-blue-400',   label: 'Coming Soon' },
  Deprecated:    { color: 'text-red-400',    label: 'Deprecated' },
  Archived:      { color: 'text-red-400',    label: 'Archived' },
}

/* ─── Image Gallery ─── */
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl glass-card">
        <img
          src={images[active]}
          alt={`${title} screenshot ${active + 1}`}
          className="w-full aspect-video object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 glass-strong flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-all hover:scale-110"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 glass-strong flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-all hover:scale-110"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 right-3 glass-strong rounded-full px-2.5 py-1 text-xs font-medium text-foreground">
              <Image className="mr-1 inline h-3 w-3" />
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                i === active ? 'ring-2 ring-primary scale-[1.02]' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${title} thumb ${i + 1}`} className="h-14 w-22 object-cover sm:h-16 sm:w-28" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Tabs ─── */
type Tab = 'overview' | 'features' | 'installation' | 'requirements'

function ProductDetailPage() {
  const { slug } = Route.useParams()
  const { data: product } = useSuspenseQuery(productQueryOptions(slug))
  const [tab, setTab] = useState<Tab>('overview')

  const status = statusStyles[product.status] || { color: 'text-muted-foreground', label: product.status }
  const migration = product.migrationGuide as { successor?: string; steps?: string[]; successorFeatures?: string[] } | null
  const installation = product.installation as { requirements?: string[]; steps?: string[] } | string | null

  const tabs: { id: Tab; label: string; icon: any; show: boolean }[] = [
    { id: 'overview',      label: 'Overview',      icon: FileText, show: !!product.longDescription },
    { id: 'features',      label: 'Features',      icon: List,     show: product.features.length > 0 },
    { id: 'installation',  label: 'Installation',  icon: Download, show: !!installation },
    { id: 'requirements',  label: 'Requirements',  icon: Info,     show: product.requirements.length > 0 },
  ]

  const visibleTabs = tabs.filter((t) => t.show)

  return (
    <div className="min-w-0 space-y-10">
      {/* Back link */}
      <Link
        to="/shop"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary animate-fade-up"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Shop
      </Link>

      {/* ═══ DEPRECATION BANNER ═══ */}
      {product.deprecated && (
        <div className="glass-card rounded-2xl border-destructive/30 p-4 animate-fade-up" style={{ animationDelay: '0.05s', background: 'color-mix(in srgb, var(--destructive) 8%, transparent)' }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">This product has been {product.status === 'Archived' ? 'archived' : 'deprecated'}</p>
              {product.deprecationMessage && (
                <p className="text-sm text-muted-foreground">{product.deprecationMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SUCCESSOR BANNER ═══ */}
      {product.deprecated && product.successorUrl && migration?.successor && (
        <div
          className="glass-card rounded-2xl p-5 sm:p-6 animate-fade-up"
          style={{
            animationDelay: '0.08s',
            background: 'color-mix(in srgb, var(--primary) 6%, transparent)',
            borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-primary">Successor Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This product has been replaced by{' '}
                  <span className="font-semibold text-foreground">{migration.successor}</span>, which
                  offers improved features and continued support.
                </p>
              </div>
              <a
                href={product.successorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary transition-all hover:opacity-80"
                style={{
                  background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)',
                }}
              >
                <Github className="h-4 w-4" />
                View {migration.successor}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative overflow-hidden rounded-2xl animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full blur-[120px] opacity-25"
          style={{ background: 'var(--glow)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full blur-[100px] opacity-20"
          style={{ background: 'var(--glow-secondary)' }}
        />

        {product.banner && (
          <div className="absolute inset-0 z-0">
            <img
              src={product.banner}
              alt={`${product.title} banner`}
              className="h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--card) 30%, transparent 100%)' }} />
          </div>
        )}

        <div
          className="relative z-10 space-y-5 p-5 sm:p-8 md:p-10"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--glow) 12%, var(--card)), color-mix(in srgb, var(--glow-secondary) 8%, var(--card)))`,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="section-badge">
              <Cpu className="h-3.5 w-3.5" />
              {product.platforms?.join(' / ') || product.platform || '—'}
            </span>
            <span className={`glass-strong inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.color}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {status.label}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight wrap-break-word sm:text-4xl md:text-5xl">
            <span className="text-shine">{product.title}</span>
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">{product.description}</p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-strong rounded-full px-3 py-1 text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {product.purchaseUrl && !product.deprecated && (
              <a
                href={product.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all gradient-brand hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3"
              >
                <Download className="h-4 w-4" />
                {product.isFree ? 'Download Free' : `Buy — $${product.price}`}
              </a>
            )}
            {product.demoUrl && (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all gradient-brand hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {product.githubUrl && (
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:py-3"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            )}
            {product.docsUrl && (
              <a
                href={product.docsUrl}
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
      {(() => {
        const galleryImages = product.previewImages?.length > 0 ? product.previewImages : product.images
        return galleryImages.length > 0 ? (
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <ImageGallery images={galleryImages} title={product.title} />
          </div>
        ) : (
          <div className="animate-fade-up overflow-hidden rounded-2xl" style={{ animationDelay: '0.1s' }}>
            <ProductPlaceholder title={product.title} />
          </div>
        )
      })()}

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
          {tab === 'overview' && product.longDescription && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Markdown content={product.longDescription} />
            </div>
          )}

          {/* Tab: Features */}
          {tab === 'features' && product.features.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                Features
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {product.features.map((f, i) => (
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

          {/* Tab: Installation */}
          {tab === 'installation' && installation && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Download className="h-4 w-4 text-primary" />
                </div>
                Installation
              </h2>
              {typeof installation === 'string' ? (
                <Markdown content={installation} />
              ) : (
                <div className="space-y-4">
                  {installation.requirements && installation.requirements.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-foreground">Prerequisites</h3>
                      <ul className="space-y-1.5">
                        {installation.requirements.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {installation.steps && installation.steps.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-foreground">Steps</h3>
                      <ol className="space-y-2">
                        {installation.steps.map((s, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span
                              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-primary"
                              style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                            >
                              {i + 1}
                            </span>
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab: Requirements */}
          {tab === 'requirements' && product.requirements.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Info className="h-4 w-4 text-primary" />
                </div>
                Requirements
              </h2>
              <ul className="space-y-2">
                {product.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-muted-foreground rounded-xl p-3 transition-all hover:bg-foreground/2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Migration Guide */}
          {migration && migration.steps && migration.steps.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4 sm:p-7 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}>
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                Migration Guide
                {migration.successor && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">→ {migration.successor}</span>
                )}
              </h2>
              <ol className="space-y-2">
                {migration.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                    >
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              {migration.successorFeatures && migration.successorFeatures.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">What you get with {migration.successor}:</h3>
                  <div className="grid gap-1.5 sm:grid-cols-2">
                    {migration.successorFeatures.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══ SIDEBAR ═══ */}
        <div className="min-w-0 space-y-6">
          {/* Script details */}
          <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <h3 className="font-bold flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Script Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-muted-foreground">Author</span>
                <span className="truncate font-medium text-foreground">{product.author}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-muted-foreground">Platform</span>
                <span className="truncate font-medium text-foreground">{product.platforms?.join(', ') || product.platform || '—'}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-muted-foreground">Framework</span>
                <span className="truncate font-medium text-foreground">{product.frameworks?.join(', ') || product.framework || '—'}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-muted-foreground">Version</span>
                <span className="truncate font-medium text-foreground">{product.version}</span>
              </div>
              {product.language && (
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-muted-foreground">Language</span>
                  <span className="truncate font-medium text-foreground">{product.language}</span>
                </div>
              )}
              {product.license && (
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-muted-foreground">License</span>
                  <span className="truncate font-medium text-foreground">{product.license}</span>
                </div>
              )}
              {product.lastUpdated && (
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 text-muted-foreground">Updated</span>
                  <span className="truncate font-medium text-foreground">{product.lastUpdated}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-muted-foreground">Price</span>
                <span className="font-semibold text-primary">{product.isFree ? 'Free' : `$${product.price}`}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="glass-card rounded-2xl p-5 space-y-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Links
            </h3>
            <div className="space-y-2">
              {product.githubUrl && (
                <a href={product.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <Github className="h-4 w-4" />
                  GitHub Repository
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
              {product.docsUrl && (
                <a href={product.docsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <BookOpen className="h-4 w-4" />
                  Documentation
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
              {product.discordUrl && (
                <a href={product.discordUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                  </svg>
                  Discord Server
                  <ArrowUpRight className="ml-auto h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
