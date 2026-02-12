import { Link } from '@tanstack/react-router'
import { useEffect, useState, useMemo } from 'react'
import { Home, ArrowLeft, Terminal } from 'lucide-react'

const errorCodes = [
  'ERR_PAGE_NOT_FOUND',
  'ERR_ROUTE_MISSING',
  'ERR_NULL_POINTER',
  'ERR_COFFEE_EMPTY',
  'ERR_SLEEP_NEEDED',
  'ERR_BRAIN_OVERFLOW',
  'ERR_TODO_OVERFLOW',
  'ERR_STACK_UNDERFLOW',
  'ERR_WIFI_HAUNTED',
  'ERR_MONDAY_DETECTED',
]

function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(id)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return displayed
}

export function NotFoundPage() {
  const errorCode = useMemo(
    () => errorCodes[Math.floor(Math.random() * errorCodes.length)],
    [],
  )

  const terminalLines = [
    '$ cd /requested-page',
    `bash: cd: /requested-page: No such file or directory`,
    `$ echo $?`,
    `404`,
    `$ cat error.log`,
    `[${new Date().toISOString()}] ${errorCode}`,
    `$ suggest --fix`,
    `> Try heading back home or checking the URL.`,
  ]

  const fullText = terminalLines.join('\n')
  const typedText = useTypingEffect(fullText, 25)

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      {/* Giant 404 */}
      <div className="relative mb-8 select-none">
        <span className="text-[7rem] font-black leading-none text-foreground/3 sm:text-[10rem] md:text-[14rem]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2">
            <p className="text-sm font-mono text-muted-foreground">
              <span className="text-primary">&lt;</span>
              {' '}page_not_found {' '}
              <span className="text-primary">/&gt;</span>
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Lost in the{' '}
              <span className="text-primary">void</span>
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>
      </div>

      {/* Error code badge */}
      <div className="mb-6">
        <span className="section-badge font-mono text-xs">{errorCode}</span>
      </div>

      {/* Terminal card */}
      <div className="mb-8 w-full max-w-lg">
        <div className="glass-card overflow-hidden rounded-xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: 'color-mix(in srgb, var(--foreground) 8%, transparent)' }}>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
              <Terminal className="h-3 w-3" />
              terminal
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-4 text-left">
            <pre className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {typedText}
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-primary" />
            </pre>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground transition-all gradient-brand hover:glow-strong hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  )
}
