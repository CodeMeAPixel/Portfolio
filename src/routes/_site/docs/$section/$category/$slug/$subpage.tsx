import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  BookOpen,
  ChevronRight,
  ArrowLeft,
  FileText,
  Calendar,
  Tag,
} from 'lucide-react'
import { getDocItemBySlug } from '~/lib/server-fns'
import { Markdown } from '~/components/Markdown'
import { createMeta } from '~/lib/meta'

const docSubItemQueryOptions = (
  sectionSlug: string,
  categorySlug: string,
  itemSlug: string,
  subSlug: string,
) => ({
  queryKey: ['doc-item', sectionSlug, categorySlug, itemSlug, subSlug],
  queryFn: () =>
    getDocItemBySlug({
      data: { sectionSlug, categorySlug, itemSlug, subSlug },
    }),
})

export const Route = createFileRoute(
  '/_site/docs/$section/$category/$slug/$subpage',
)({
  head: ({ loaderData }) => {
    const item = loaderData as any
    return createMeta({
      title: item?.title || 'Documentation',
      description: item?.description || 'Documentation article.',
      path: `/docs/${item?.sectionSlug || ''}/${item?.categorySlug || ''}/${item?.parentSlug || ''}/${item?.slug || ''}`,
    })
  },
  component: DocSubPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      docSubItemQueryOptions(
        params.section,
        params.category,
        params.slug,
        params.subpage,
      ),
    )
  },
  errorComponent: () => (
    <div className="space-y-6">
      <Link
        to="/docs"
        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Documentation
      </Link>
      <div className="glass-card rounded-2xl p-8 text-center space-y-3 sm:p-16">
        <p className="text-lg font-medium">Document not found</p>
        <p className="text-sm text-muted-foreground">
          The documentation page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  ),
})

function DocSubPage() {
  const { section, category, slug, subpage } = Route.useParams()
  const { data: item } = useSuspenseQuery(
    docSubItemQueryOptions(section, category, slug, subpage),
  )
  const data = item as any

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-up flex-wrap">
        <Link to="/docs" className="hover:text-primary transition-colors">
          Docs
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-foreground font-medium">
          {data?.sectionName}
        </span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-foreground/80">{data?.categoryName}</span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link
          to="/docs/$section/$category/$slug"
          params={{ section, category, slug }}
          className="hover:text-primary transition-colors"
        >
          {data?.parentName}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-primary font-medium truncate">
          {data?.title}
        </span>
      </nav>

      {/* Header */}
      <section className="relative">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]"
          style={{
            background:
              'linear-gradient(135deg, var(--glow), var(--glow-secondary))',
          }}
        />

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <BookOpen className="h-3.5 w-3.5" />
              {data?.parentName || data?.sectionName || 'Documentation'}
            </span>
          </div>

          <div
            className="space-y-3 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              {data?.title}
            </h1>
            {data?.description && (
              <p className="max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
                {data.description}
              </p>
            )}
          </div>

          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {data?.keywords && data.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {data.keywords.map((kw: string) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-primary"
                    style={{
                      background:
                        'color-mix(in srgb, var(--primary) 10%, transparent)',
                    }}
                  >
                    <Tag className="h-2.5 w-2.5" />
                    {kw}
                  </span>
                ))}
              </div>
            )}
            {data?.updatedAt && (
              <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Updated{' '}
                {new Date(data.updatedAt).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      {data?.content ? (
        <article
          className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 animate-fade-up prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:glass prose-pre:rounded-xl prose-pre:p-4 prose-strong:text-foreground prose-li:text-muted-foreground"
          style={{ animationDelay: '0.15s' }}
        >
          <Markdown content={data.content} />
        </article>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center space-y-4 animate-fade-up">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background:
                'color-mix(in srgb, var(--primary) 10%, transparent)',
            }}
          >
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">
            Content coming soon
          </p>
          <p className="text-sm text-muted-foreground">
            This documentation article is being written.
          </p>
        </div>
      )}

      {/* Sibling Navigation */}
      {data?.siblings && data.siblings.length > 1 && (
        <div
          className="space-y-3 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            In this section
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.siblings.map((s: any) => (
              <Link
                key={s.slug}
                to="/docs/$section/$category/$slug/$subpage"
                params={{ section, category, slug, subpage: s.slug }}
                className={`glass rounded-xl px-3.5 py-2 text-sm transition-all hover:-translate-y-0.5 ${
                  s.slug === subpage
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={
                  s.slug === subpage
                    ? {
                        background:
                          'color-mix(in srgb, var(--primary) 10%, transparent)',
                        borderColor:
                          'color-mix(in srgb, var(--primary) 25%, transparent)',
                      }
                    : {}
                }
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back Links */}
      <div
        className="flex flex-wrap gap-4 animate-fade-up"
        style={{ animationDelay: '0.25s' }}
      >
        <Link
          to="/docs/$section/$category/$slug"
          params={{ section, category, slug }}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to {data?.parentName || 'Project'}
        </Link>
        <Link
          to="/docs"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All Documentation
        </Link>
      </div>
    </div>
  )
}
