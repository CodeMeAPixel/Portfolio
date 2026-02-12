import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
  User,
} from 'lucide-react'
import { getBlogPostBySlug } from '~/lib/server-fns'
import { BlogPlaceholder } from '~/components/PlaceholderBanner'
import { Markdown } from '~/components/Markdown'
import { useState } from 'react'
import { createMeta } from '~/lib/meta'

const blogPostQueryOptions = (slug: string) => ({
  queryKey: ['blog', slug],
  queryFn: () => getBlogPostBySlug({ data: { slug } }),
})

export const Route = createFileRoute('/_site/blog/$slug')({
  component: BlogPostPage,
  head: ({ loaderData }) => {
    const p = loaderData as any
    return createMeta({
      title: p?.title ?? 'Blog Post',
      description: p?.excerpt ?? p?.description ?? 'Read this blog post.',
      path: `/blog/${p?.slug ?? ''}`,
      image: p?.coverImage,
      type: 'article',
      publishedTime: p?.date,
      author: p?.author,
      tags: p?.tags,
    })
  },
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(blogPostQueryOptions(slug))
  },
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const { data: post } = useSuspenseQuery(blogPostQueryOptions(slug))
  const [copied, setCopied] = useState(false)

  if (!post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
        >
          <Tag className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary transition-all hover:gap-3 glass"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = encodeURIComponent(post.title)

  return (
    <div className="min-w-0 space-y-10">
      {/* ═══ BACK NAV ═══ */}
      <div className="animate-fade-up">
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary glass"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Blog
        </Link>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="relative space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {/* Glow blob */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-60 w-full max-w-100 -translate-x-1/2 rounded-full blur-[120px] opacity-20"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />

        <div className="relative space-y-4">
          <h1 className="text-3xl font-black tracking-tight wrap-break-word sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-shine">{post.title}</span>
          </h1>

          {post.description && (
            <p className="max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
              {post.description}
            </p>
          )}

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5 text-primary" />
              <span>{post.author}</span>
            </div>

            {post.publishedAt && (
              <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            )}

            {post.readingTime && (
              <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>{post.readingTime}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-primary"
                  style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ═══ COVER IMAGE ═══ */}
      <div className="animate-fade-up overflow-hidden rounded-2xl" style={{ animationDelay: '0.15s' }}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <BlogPlaceholder title={post.title} />
        )}
      </div>

      {/* ═══ CONTENT ═══ */}
      <article
        className="glass-card overflow-hidden rounded-2xl p-6 sm:p-8 md:p-10 animate-fade-up"
        style={{ animationDelay: '0.2s' }}
      >
        <Markdown content={post.content} />
      </article>

      {/* ═══ FOOTER / SHARE ═══ */}
      <div
        className="glass-card rounded-2xl p-6 animate-fade-up"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Tags recap */}
          {post.tags && post.tags.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-0.5 w-6 rounded-full gradient-brand" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-[11px] font-medium text-primary"
                    style={{ background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share buttons */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
              <Share2 className="h-3.5 w-3.5 text-primary" />
              Share
            </h4>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:text-primary glass"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:text-primary glass"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <button
                onClick={handleCopyLink}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:text-primary glass"
                aria-label="Copy link"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BACK LINK ═══ */}
      <div className="text-center animate-fade-up" style={{ animationDelay: '0.35s' }}>
        <Link
          to="/blog"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary transition-all hover:gap-3 glass"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to all articles
        </Link>
      </div>
    </div>
  )
}
