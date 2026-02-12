import { useEffect, useState, useCallback } from 'react'
import { Terminal, Loader2 } from 'lucide-react'

function useTypingEffect(lines: string[], speed = 30, lineDelay = 200) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let cancelled = false
    let lineIdx = 0
    let charIdx = 0

    function tick() {
      if (cancelled) return
      if (lineIdx >= lines.length) {
        setDone(true)
        return
      }

      const currentLine = lines[lineIdx]
      if (charIdx <= currentLine.length) {
        setDisplayed(
          lines
            .slice(0, lineIdx)
            .concat(currentLine.slice(0, charIdx))
            .join('\n'),
        )
        charIdx++
        setTimeout(tick, speed)
      } else {
        lineIdx++
        charIdx = 0
        setTimeout(tick, lineDelay)
      }
    }

    // Small initial delay before typing starts
    setTimeout(tick, 400)

    return () => {
      cancelled = true
    }
  }, [lines, speed, lineDelay])

  return { displayed, done }
}

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  const terminalLines = [
    '$ initializing codemeapixel...',
    '> loading modules ████████████████ done',
    '> compiling routes... ok',
    '> hydrating components...',
    '> establishing connections...',
    '$ status --check',
    `[${new Date().toISOString()}] ALL_SYSTEMS_NOMINAL`,
    '$ launch --mode=production',
    '> Ready.',
  ]

  const { displayed, done } = useTypingEffect(terminalLines, 18, 120)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Progress bar animation
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        // Accelerate as typing progresses
        const increment = done ? 15 : (100 - prev) * 0.04
        return Math.min(prev + increment, done ? 100 : 92)
      })
    }, 40)

    return () => clearInterval(interval)
  }, [mounted, done])

  // When typing is done and progress hits 100, start fade-out
  useEffect(() => {
    if (done && progress >= 100) {
      const timer = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => setVisible(false), 400)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [done, progress])

  // First-time vs returning visitor timing
  useEffect(() => {
    if (!mounted) return

    const hasVisited = localStorage.getItem('pxl-visited')

    if (hasVisited) {
      // Returning visitor — skip the loading screen
      setVisible(false)
      return
    }

    // First-time visitor — mark as visited when done
    if (!visible) {
      localStorage.setItem('pxl-visited', 'true')
    }
  }, [mounted, visible])

  if (!mounted || !visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-400 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-float absolute -top-40 -right-40 h-75 w-75 rounded-full blur-[140px] sm:h-125 sm:w-125"
          style={{ background: 'color-mix(in srgb, var(--glow) 12%, transparent)' }}
        />
        <div
          className="animate-float absolute -bottom-40 -left-40 h-62.5 w-62.5 rounded-full blur-[120px] sm:h-100 sm:w-100"
          style={{
            background: 'color-mix(in srgb, var(--glow-secondary) 10%, transparent)',
            animationDelay: '-3s',
          }}
        />
        <div className="dot-pattern absolute inset-0 opacity-40" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Terminal card */}
        <div className="mb-6 w-full max-w-md px-4">
          <div className="glass-card overflow-hidden rounded-xl">
            {/* Title bar */}
            <div
              className="flex items-center gap-2 border-b px-4 py-2.5"
              style={{ borderColor: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }}
            >
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <Terminal className="h-3 w-3" />
                codemeapixel — loading
              </span>
            </div>
            {/* Terminal body */}
            <div className="p-4 text-left">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                {displayed}
                <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-primary" />
              </pre>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 sm:w-72">
          <div
            className="h-1 overflow-hidden rounded-full"
            style={{ background: 'color-mix(in srgb, var(--foreground) 6%, transparent)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-100 gradient-brand"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground/60">
              {!done && <Loader2 className="h-3 w-3 animate-spin" />}
              {done ? 'Launching...' : 'Loading...'}
            </span>
            <span className="font-mono text-primary/70">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
