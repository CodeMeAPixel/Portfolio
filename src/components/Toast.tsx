import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────── */

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  title?: string
  message: string
  variant?: ToastVariant
  duration?: number // ms, 0 = persistent
}

interface ToastItem extends Required<Pick<ToastOptions, 'message' | 'variant'>> {
  id: string
  title?: string
  duration: number
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
}

/* ─── Context ────────────────────────────────────────── */

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

/* ─── Provider ───────────────────────────────────────── */

let toastId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((options: ToastOptions) => {
    const id = `toast-${++toastId}`
    const item: ToastItem = {
      id,
      message: options.message,
      variant: options.variant || 'info',
      title: options.title,
      duration: options.duration ?? 5000,
    }
    setToasts((prev) => [...prev, item])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((options: ToastOptions) => addToast(options), [addToast])
  const success = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'success' }), [addToast])
  const error = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'error', duration: 8000 }), [addToast])
  const warning = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'warning', duration: 6000 }), [addToast])
  const info = useCallback((message: string, title?: string) => addToast({ message, title, variant: 'info' }), [addToast])

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      {/* Toast container — bottom-right */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-[110] flex flex-col-reverse gap-2.5 pointer-events-none">
          {toasts.map((t) => (
            <ToastCard key={t.id} item={t} onDismiss={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

/* ─── Toast Card ─────────────────────────────────────── */

const variantConfig: Record<ToastVariant, {
  icon: React.ReactNode
  borderColor: string
  iconColor: string
  iconBg: string
  progressColor: string
}> = {
  success: {
    icon: <CheckCircle2 className="h-4.5 w-4.5" />,
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    progressColor: 'bg-emerald-500',
  },
  error: {
    icon: <XCircle className="h-4.5 w-4.5" />,
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10',
    progressColor: 'bg-red-500',
  },
  warning: {
    icon: <AlertTriangle className="h-4.5 w-4.5" />,
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    progressColor: 'bg-amber-500',
  },
  info: {
    icon: <Info className="h-4.5 w-4.5" />,
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    progressColor: 'bg-blue-500',
  },
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [exiting, setExiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const config = variantConfig[item.variant]

  const dismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => onDismiss(item.id), 200)
  }, [item.id, onDismiss])

  useEffect(() => {
    if (item.duration > 0) {
      timerRef.current = setTimeout(dismiss, item.duration)
      return () => clearTimeout(timerRef.current)
    }
  }, [item.duration, dismiss])

  // Pause timer on hover
  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }
  const handleMouseLeave = () => {
    if (item.duration > 0) {
      timerRef.current = setTimeout(dismiss, 2000)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border bg-background shadow-xl transition-all duration-200 ${config.borderColor} ${
        exiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100 animate-in slide-in-from-right-full fade-in duration-300'
      }`}
    >
      <div className="flex items-start gap-3 p-3.5">
        {/* Icon */}
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.iconBg} ${config.iconColor}`}>
          {config.icon}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 pt-0.5">
          {item.title && (
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
          )}
          <p className={`text-sm leading-relaxed text-muted-foreground ${item.title ? 'mt-0.5' : ''}`}>
            {item.message}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      {item.duration > 0 && (
        <div className="h-0.5 w-full bg-foreground/5">
          <div
            className={`h-full ${config.progressColor} opacity-60`}
            style={{
              animation: `toast-progress ${item.duration}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  )
}
