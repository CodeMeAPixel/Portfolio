import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Home, RotateCcw, Terminal, AlertTriangle } from 'lucide-react'

function useTypingEffect(text: string, speed = 30) {
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

export function ErrorPage({ error, reset }: ErrorComponentProps) {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

  const terminalLines = [
    '$ node app.js',
    `Uncaught Error: ${errorMessage}`,
    `    at renderPage (routes/current:1:1)`,
    `    at processRequest (server:42:13)`,
    `$ echo "Status: CRASHED"`,
    `Status: CRASHED`,
    `$ suggest --recovery`,
    `> Try refreshing the page or going home.`,
  ]

  const fullText = terminalLines.join('\n')
  const typedText = useTypingEffect(fullText, 20)

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      {/* Giant error text */}
      <div className="relative mb-8 select-none">
        <span className="text-[7rem] font-black leading-none text-red-500/4 sm:text-[10rem] md:text-[14rem]">
          ERR
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'color-mix(in srgb, #ef4444 12%, transparent)' }}>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Something went{' '}
              <span className="text-red-500">wrong</span>
            </h1>
            <p className="max-w-md text-muted-foreground">
              An error occurred while rendering this page. Don't worry — it's probably not your fault.
            </p>
          </div>
        </div>
      </div>

      {/* Error badge */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono" style={{ borderColor: 'color-mix(in srgb, #ef4444 25%, transparent)', color: '#ef4444', background: 'color-mix(in srgb, #ef4444 5%, transparent)' }}>
          <AlertTriangle className="h-3 w-3" />
          RUNTIME_ERROR
        </span>
      </div>

      {/* Terminal card with red tint */}
      <div className="mb-8 w-full max-w-lg">
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'color-mix(in srgb, #ef4444 15%, transparent)', background: 'color-mix(in srgb, var(--card) 80%, #ef444406)' }}>
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: 'color-mix(in srgb, #ef4444 10%, transparent)' }}>
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-red-400/80 font-mono">
              <Terminal className="h-3 w-3" />
              error — terminal
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-4 text-left">
            <pre className="font-mono text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {typedText}
              <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-red-500" />
            </pre>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all bg-red-600 hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180 duration-500" />
          Try Again
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
