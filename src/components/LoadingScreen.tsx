import { useEffect, useState } from 'react'
import { Terminal, Loader2 } from 'lucide-react'

/**
 * Typing effect using a single requestAnimationFrame loop instead of
 * hundreds of chained setTimeout calls.  Each frame checks elapsed time
 * to decide whether to advance to the next character/line.
 */
function useTypingEffect(lines: string[], speed = 30, lineDelay = 200) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    let lineIdx = 0
    let charIdx = 0
    let raf = 0
    let lastTick = 0
    let waiting = 400 // initial delay before typing starts

    function tick(now: number) {
      if (!lastTick) {
        lastTick = now
      }

      const elapsed = now - lastTick

      if (waiting > 0) {
        if (elapsed >= waiting) {
          waiting = 0
          lastTick = now
        }
        raf = requestAnimationFrame(tick)
        return
      }

      if (lineIdx >= lines.length) {
        setDone(true)
        return
      }

      const currentLine = lines[lineIdx]
      const delay = charIdx > currentLine.length ? lineDelay : speed

      if (elapsed >= delay) {
        lastTick = now
        if (charIdx > currentLine.length) {
          lineIdx++
          charIdx = 0
        } else {
          setDisplayed(
            lines
              .slice(0, lineIdx)
              .concat(currentLine.slice(0, charIdx))
              .join('\n'),
          )
          charIdx++
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [lines, speed, lineDelay])

  return { displayed, done }
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(false)
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

  // Client-only check: useEffect (not useLayoutEffect) is SSR-safe.
  // On the server this never runs, so visible stays false and we render nothing.
  useEffect(() => {
    if (!localStorage.getItem('pxl-visited')) {
      setVisible(true)
    }
  }, [])

  // Progress bar — single rAF loop instead of 40ms setInterval
  useEffect(() => {
    if (!visible) return
    let raf = 0
    let last = 0

    function frame(now: number) {
      if (now - last >= 40) {
        last = now
        setProgress((prev) => {
          if (prev >= 100) return 100
          const increment = done ? 15 : (100 - prev) * 0.04
          return Math.min(prev + increment, done ? 100 : 92)
        })
      }
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [visible, done])

  // When typing is done and progress hits 100, start fade-out and mark visited
  useEffect(() => {
    if (!visible || !done || progress < 100) return
    const timer = setTimeout(() => {
      setFadeOut(true)
      localStorage.setItem('pxl-visited', 'true')
      setTimeout(() => setVisible(false), 400)
    }, 300)
    return () => clearTimeout(timer)
  }, [visible, done, progress])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background transition-opacity duration-400 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* No blur orbs or dot-pattern here — _site.tsx already provides them behind this overlay */}

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
