/**
 * Theme-aware placeholder banners for content without images.
 * Uses CSS custom properties to adapt to all 57+ site themes.
 *
 * Design language matches the site:
 *   – Glass morphism backgrounds using --card / --background
 *   – Dot pattern overlay via foreground color
 *   – Radial glow bloom using --glow / --glow-secondary
 *   – Floating decorative pixel squares with theme colors
 *   – Lucide React icons per variant
 *   – Gradient text + label badges matching section-badge aesthetic
 */

import { useMemo } from 'react'
import {
  PenLine,
  ShoppingBag,
  Code2,
  Link2,
  BookOpen,
  Layers,
  type LucideIcon,
} from 'lucide-react'

type Variant = 'blog' | 'product' | 'project' | 'referral' | 'doc' | 'generic'

interface PlaceholderBannerProps {
  /** Title text rendered in the center */
  title?: string
  /** Secondary label (category, tag, etc.) */
  label?: string
  /** Visual variant – determines icon and accent treatment */
  variant?: Variant
  /** Extra className forwarded to the root element */
  className?: string
}

/* ─── Variant icon mapping ─────────────────────────────── */

const variantConfig: Record<Variant, { icon: LucideIcon; label: string }> = {
  blog:     { icon: PenLine,     label: 'Blog' },
  product:  { icon: ShoppingBag, label: 'Product' },
  project:  { icon: Code2,       label: 'Project' },
  referral: { icon: Link2,       label: 'Referral' },
  doc:      { icon: BookOpen,    label: 'Docs' },
  generic:  { icon: Layers,      label: '' },
}

/* ─── Deterministic pseudo-random from string ──────────── */

function seededRandom(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return () => {
    hash = (hash * 16807) % 2147483647
    return (hash & 0x7fffffff) / 0x7fffffff
  }
}

/* ─── Pixel scatter positions ──────────────────────────── */

interface Pixel {
  x: string     // percentage left
  y: string     // percentage top
  size: number   // px
  opacity: number
  delay: number  // animation delay in seconds
}

function generatePixels(count: number, rand: () => number): Pixel[] {
  const pixels: Pixel[] = []
  for (let i = 0; i < count; i++) {
    // Bias toward edges: 60% chance to be near an edge
    let xPct = rand() * 100
    let yPct = rand() * 100
    if (rand() > 0.4) {
      if (rand() > 0.5) {
        xPct = rand() > 0.5 ? rand() * 15 : 85 + rand() * 15
      } else {
        yPct = rand() > 0.5 ? rand() * 20 : 80 + rand() * 20
      }
    }
    pixels.push({
      x: `${xPct.toFixed(1)}%`,
      y: `${yPct.toFixed(1)}%`,
      size: 3 + rand() * 6,
      opacity: 0.06 + rand() * 0.14,
      delay: rand() * 6,
    })
  }
  return pixels
}

/* ─── Main Component ───────────────────────────────────── */

export function PlaceholderBanner({
  title,
  label,
  variant = 'generic',
  className,
}: PlaceholderBannerProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  const seed = `${variant}-${title || 'placeholder'}-${label || ''}`
  const pixels = useMemo(() => {
    const rand = seededRandom(seed)
    return generatePixels(14, rand)
  }, [seed])

  const displayTitle =
    title && title.length > 50 ? title.slice(0, 47) + '…' : title

  return (
    <div
      className={`relative flex h-full w-full select-none items-center justify-center overflow-hidden ${className || ''}`}
      style={{ background: 'var(--card)' }}
      role="img"
      aria-label={title || `${variant} placeholder`}
    >
      {/* ═══ BASE GRADIENT ═══ */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, var(--background) 0%, var(--card) 50%, var(--background) 100%)`,
        }}
      />

      {/* ═══ DOT PATTERN ═══ */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* ═══ GRID LINES ═══ */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--foreground) 3%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 3%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: '12.5% 12.5%',
        }}
      />

      {/* ═══ CENTER GLOW BLOOM ═══ */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '60%',
          height: '80%',
          background: `radial-gradient(ellipse at center, color-mix(in srgb, var(--glow) 12%, transparent) 0%, color-mix(in srgb, var(--glow) 4%, transparent) 40%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* ═══ SECONDARY GLOW (top-left accent) ═══ */}
      <div
        className="absolute left-0 top-0"
        style={{
          width: '50%',
          height: '50%',
          background: `radial-gradient(ellipse at 20% 20%, color-mix(in srgb, var(--glow-secondary) 8%, transparent) 0%, transparent 60%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* ═══ SCATTERED PIXELS ═══ */}
      {pixels.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-sm"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: i % 2 === 0 ? 'var(--glow)' : 'var(--glow-secondary)',
            opacity: p.opacity,
            animation: `float-slow ${6 + (i % 3) * 2}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ═══ CENTER CONTENT ═══ */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        {/* Decorative icon */}
        <div
          className="flex items-center justify-center rounded-2xl p-4"
          style={{
            background: 'color-mix(in srgb, var(--glow) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--glow) 15%, transparent)',
            boxShadow: '0 0 40px color-mix(in srgb, var(--glow) 10%, transparent)',
          }}
        >
          <Icon
            className="h-8 w-8 sm:h-10 sm:w-10"
            style={{ color: 'var(--glow-secondary)' }}
            strokeWidth={1.5}
          />
        </div>

        {/* Divider line */}
        <div
          className="h-px w-24 sm:w-32"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 50%, transparent), color-mix(in srgb, var(--glow) 50%, transparent), transparent)`,
          }}
        />

        {/* Title */}
        {displayTitle && (
          <h3
            className="max-w-xs text-sm font-bold tracking-tight sm:max-w-sm sm:text-base md:text-lg"
            style={{
              color: 'var(--foreground)',
              textShadow: '0 0 20px color-mix(in srgb, var(--glow) 30%, transparent)',
            }}
          >
            {displayTitle}
          </h3>
        )}

        {/* Label badge */}
        {(label || config.label) && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
            style={{
              background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--primary) 20%, transparent)',
              color: 'var(--glow-secondary)',
            }}
          >
            <Icon className="h-3 w-3" strokeWidth={2} />
            {label || config.label}
          </span>
        )}
      </div>

      {/* ═══ TOP EDGE HIGHLIGHT ═══ */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, color-mix(in srgb, var(--foreground) 6%, transparent) 30%, color-mix(in srgb, var(--foreground) 6%, transparent) 70%, transparent)`,
        }}
      />

      {/* ═══ BOTTOM GRADIENT FADE ═══ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4"
        style={{
          background: `linear-gradient(to top, color-mix(in srgb, var(--background) 80%, transparent), transparent)`,
        }}
      />

      {/* ═══ CORNER ACCENTS ═══ */}
      <div
        className="absolute left-3 top-3 h-6 w-6 rounded-sm border-l-2 border-t-2"
        style={{
          borderColor: 'color-mix(in srgb, var(--glow) 15%, transparent)',
        }}
      />
      <div
        className="absolute bottom-3 right-3 h-6 w-6 rounded-sm border-b-2 border-r-2"
        style={{
          borderColor: 'color-mix(in srgb, var(--glow) 15%, transparent)',
        }}
      />
    </div>
  )
}

/* ─── Convenience wrappers ─────────────────────────────── */

/** Blog post placeholder */
export function BlogPlaceholder({
  title,
  category,
  className,
}: {
  title?: string
  category?: string
  className?: string
}) {
  return (
    <PlaceholderBanner
      variant="blog"
      title={title}
      label={category}
      className={className}
    />
  )
}

/** Product card placeholder */
export function ProductPlaceholder({
  title,
  status,
  className,
}: {
  title?: string
  status?: string
  className?: string
}) {
  return (
    <PlaceholderBanner
      variant="product"
      title={title}
      label={status}
      className={className}
    />
  )
}

/** Project card placeholder */
export function ProjectPlaceholder({
  title,
  className,
}: {
  title?: string
  className?: string
}) {
  return (
    <PlaceholderBanner
      variant="project"
      title={title}
      className={className}
    />
  )
}

/** Referral card placeholder */
export function ReferralPlaceholder({
  company,
  className,
}: {
  company?: string
  className?: string
}) {
  return (
    <PlaceholderBanner
      variant="referral"
      title={company}
      className={className}
    />
  )
}

/** Doc section placeholder */
export function DocPlaceholder({
  title,
  className,
}: {
  title?: string
  className?: string
}) {
  return (
    <PlaceholderBanner
      variant="doc"
      title={title}
      className={className}
    />
  )
}
