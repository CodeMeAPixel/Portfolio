import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Terminal, AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react'

function useTypingEffect(text: string, speed = 25) {
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

// ---------- Not Found ----------

export function PanelNotFound({ backTo, backLabel }: { backTo: string; backLabel: string }) {
  const terminalLines = [
    '$ resolve --route',
    'Error: Route not found in panel scope.',
    '$ echo $?',
    '404',
    '$ suggest --fix',
    `> Navigate back to ${backLabel.toLowerCase()}.`,
  ]

  const fullText = terminalLines.join('\n')
  const typedText = useTypingEffect(fullText, 20)

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative mb-6 select-none">
        <span className="text-[6rem] font-black leading-none text-foreground/3 sm:text-[8rem]">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-1.5">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">&lt;</span> route_not_found <span className="text-primary">/&gt;</span>
            </p>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Page not <span className="text-primary">found</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-6 w-full max-w-sm">
        <div className="overflow-hidden rounded-xl border border-border/50">
          <div className="flex items-center gap-2 border-b border-border/50 bg-foreground/[0.02] px-3 py-2">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
              <span className="h-2 w-2 rounded-full bg-green-500/80" />
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60">
              <Terminal className="h-2.5 w-2.5" />
              terminal
            </span>
          </div>
          <div className="p-3 text-left">
            <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-muted-foreground">
              {typedText}
              <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-primary" />
            </pre>
          </div>
        </div>
      </div>

      <Link
        to={backTo}
        className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {backLabel}
      </Link>
    </div>
  )
}

// ---------- Error ----------

export function PanelError({
  error,
  reset,
  backTo,
  backLabel,
}: ErrorComponentProps & { backTo: string; backLabel: string }) {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

  const terminalLines = [
    '$ run --panel',
    `Uncaught Error: ${errorMessage}`,
    '    at renderPanel (routes/panel:1:1)',
    '$ echo "Status: CRASHED"',
    'Status: CRASHED',
    '$ suggest --recovery',
    '> Try again or head back.',
  ]

  const fullText = terminalLines.join('\n')
  const typedText = useTypingEffect(fullText, 18)

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="relative mb-6 select-none">
        <span className="text-[6rem] font-black leading-none text-red-500/4 sm:text-[8rem]">
          ERR
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2">
            <div
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: 'color-mix(in srgb, #ef4444 12%, transparent)' }}
            >
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Something went <span className="text-red-500">wrong</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-6 w-full max-w-sm">
        <div
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: 'color-mix(in srgb, #ef4444 15%, transparent)',
            background: 'color-mix(in srgb, var(--background) 95%, #ef44440a)',
          }}
        >
          <div
            className="flex items-center gap-2 border-b px-3 py-2"
            style={{ borderColor: 'color-mix(in srgb, #ef4444 10%, transparent)' }}
          >
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
              <span className="h-2 w-2 rounded-full bg-green-500/80" />
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-red-400/80">
              <Terminal className="h-2.5 w-2.5" />
              error — terminal
            </span>
          </div>
          <div className="p-3 text-left">
            <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-muted-foreground">
              {typedText}
              <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-red-500" />
            </pre>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
          Try Again
        </button>
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/20 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backLabel}
        </Link>
      </div>
    </div>
  )
}
