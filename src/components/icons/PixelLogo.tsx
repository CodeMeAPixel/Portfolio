import { cn } from '../../lib/utils'

interface PixelLogoProps {
  className?: string
  /** Show just the "P" mark without background */
  bare?: boolean
}

/**
 * Pixel "P" logo mark — respects theming via CSS custom properties.
 *
 * - Default: rendered inside a rounded gradient container (for nav etc.)
 * - `bare`: standalone glyph, inherits `currentColor`
 */
export function PixelLogo({ className, bare }: PixelLogoProps) {
  if (bare) {
    return (
      <svg
        className={cn('h-6 w-6', className)}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CodeMeAPixel"
      >
        <g filter="url(#pxl-glow)">
          {/* Vertical stem */}
          <rect x="28" y="24" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="28" y="44" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="28" y="64" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="28" y="84" width="14" height="14" rx="2" fill="currentColor" />
          {/* Top horizontal */}
          <rect x="48" y="24" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="68" y="24" width="14" height="14" rx="2" fill="currentColor" />
          {/* Right curve of P bowl */}
          <rect x="82" y="34" width="14" height="14" rx="2" fill="currentColor" opacity="0.85" />
          <rect x="82" y="54" width="14" height="14" rx="2" fill="currentColor" opacity="0.5" />
          {/* Middle horizontal */}
          <rect x="48" y="64" width="14" height="14" rx="2" fill="currentColor" />
          <rect x="68" y="64" width="14" height="14" rx="2" fill="currentColor" opacity="0.55" />
        </g>
        {/* Accent pixels */}
        <rect x="98" y="20" width="10" height="10" rx="2" fill="currentColor" opacity="0.15" />
        <rect x="98" y="98" width="10" height="10" rx="2" fill="currentColor" opacity="0.08" />
        <defs>
          <filter id="pxl-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    )
  }

  return (
    <div className={cn('relative flex h-8 w-8 items-center justify-center rounded-lg', className)}>
      {/* Gradient background using theme colours */}
      <div className="absolute inset-0 rounded-lg gradient-brand" />
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 glow" />
      {/* The mark itself */}
      <svg
        className="relative z-10 h-5 w-5 text-white"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CodeMeAPixel"
      >
        {/* Vertical stem */}
        <rect x="28" y="24" width="14" height="14" rx="2" fill="currentColor" />
        <rect x="28" y="44" width="14" height="14" rx="2" fill="currentColor" />
        <rect x="28" y="64" width="14" height="14" rx="2" fill="currentColor" />
        <rect x="28" y="84" width="14" height="14" rx="2" fill="currentColor" />
        {/* Top horizontal */}
        <rect x="48" y="24" width="14" height="14" rx="2" fill="currentColor" />
        <rect x="68" y="24" width="14" height="14" rx="2" fill="currentColor" />
        {/* Right curve of P bowl */}
        <rect x="82" y="34" width="14" height="14" rx="2" fill="currentColor" opacity="0.85" />
        <rect x="82" y="54" width="14" height="14" rx="2" fill="currentColor" opacity="0.5" />
        {/* Middle horizontal */}
        <rect x="48" y="64" width="14" height="14" rx="2" fill="currentColor" />
        <rect x="68" y="64" width="14" height="14" rx="2" fill="currentColor" opacity="0.55" />
        {/* Accent pixels */}
        <rect x="98" y="20" width="10" height="10" rx="2" fill="currentColor" opacity="0.15" />
        <rect x="98" y="98" width="10" height="10" rx="2" fill="currentColor" opacity="0.08" />
      </svg>
    </div>
  )
}
