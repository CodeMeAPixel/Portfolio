import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { BookOpen, ChevronRight, ArrowLeft, FileText, Calendar, Tag } from 'lucide-react'
import { getDocItemBySlug } from '~/lib/server-fns'
import { createMeta } from '~/lib/meta'

const docItemQueryOptions = (sectionSlug: string, itemSlug: string) => ({
  queryKey: ['doc-item', sectionSlug, itemSlug],
  queryFn: () => getDocItemBySlug({ data: { sectionSlug, itemSlug } }),
})

export const Route = createFileRoute('/_site/docs/$section/$slug')({
  head: ({ loaderData }) => {
    const item = loaderData as any
    return createMeta({
      title: item?.title || 'Documentation',
      description: item?.description || 'Documentation article.',
      path: `/docs/${item?.sectionSlug || ''}/${item?.slug || ''}`,
    })
  },
  component: DocItemPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      docItemQueryOptions(params.section, params.slug),
    )
  },
})

function DocItemPage() {
  const { section, slug } = Route.useParams()
  const { data: item } = useSuspenseQuery(docItemQueryOptions(section, slug))

  return (
    <div className="space-y-10">
      {/* ═══ BREADCRUMB ═══ */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-up">
        <Link to="/docs" className="hover:text-primary transition-colors">
          Docs
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{(item as any)?.sectionName}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-primary font-medium truncate">{(item as any)?.title}</span>
      </nav>

      {/* ═══ HEADER ═══ */}
      <section className="relative">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <BookOpen className="h-3.5 w-3.5" />
              {(item as any)?.sectionName || 'Documentation'}
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              {(item as any)?.title}
            </h1>
            {(item as any)?.description && (
              <p className="max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
                {(item as any).description}
              </p>
            )}
          </div>

          {/* Keywords / Meta */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {(item as any)?.keywords && (item as any).keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(item as any).keywords.map((kw: string) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-primary"
                    style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {kw}
                  </span>
                ))}
              </div>
            )}
            {(item as any)?.updatedAt && (
              <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Updated {new Date((item as any).updatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      {(item as any)?.content ? (
        <article
          className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 animate-fade-up prose prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
            prose-pre:glass prose-pre:rounded-xl prose-pre:p-4
            prose-strong:text-foreground
            prose-li:text-muted-foreground"
          style={{ animationDelay: '0.15s' }}
          dangerouslySetInnerHTML={{ __html: (item as any).content }}
        />
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 animate-fade-up">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
          >
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">Content coming soon</p>
          <p className="text-sm text-muted-foreground">
            This documentation article is being written.
          </p>
        </div>
      )}

      {/* ═══ BACK LINK ═══ */}
      <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <Link
          to="/docs"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Documentation
        </Link>
      </div>
    </div>
  )
}
