import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────── */

interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'default'
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

/* ─── Context ────────────────────────────────────────── */

const ConfirmContext = createContext<ConfirmContextValue | null>(null)

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within a ConfirmProvider')
  return ctx.confirm
}

/* ─── Provider ───────────────────────────────────────── */

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    open: boolean
    options: ConfirmOptions
    resolve: ((value: boolean) => void) | null
  }>({
    open: false,
    options: { message: '' },
    resolve: null,
  })

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setState({ open: true, options, resolve })
    })
  }, [])

  const handleConfirm = useCallback(() => {
    state.resolve?.(true)
    setState((s) => ({ ...s, open: false, resolve: null }))
  }, [state.resolve])

  const handleCancel = useCallback(() => {
    state.resolve?.(false)
    setState((s) => ({ ...s, open: false, resolve: null }))
  }, [state.resolve])

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state.open && (
        <ConfirmDialog
          {...state.options}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  )
}

/* ─── Dialog ─────────────────────────────────────────── */

interface ConfirmDialogProps extends ConfirmOptions {
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => confirmRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel])

  const variantConfig = {
    danger: {
      icon: <Trash2 className="h-5 w-5" />,
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-400',
      buttonBg: 'bg-red-500 hover:bg-red-600',
      defaultTitle: 'Confirm Delete',
      defaultConfirmLabel: 'Delete',
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5" />,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      buttonBg: 'bg-amber-500 hover:bg-amber-600',
      defaultTitle: 'Are you sure?',
      defaultConfirmLabel: 'Continue',
    },
    default: {
      icon: <AlertTriangle className="h-5 w-5" />,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      buttonBg: 'bg-primary hover:bg-primary/90',
      defaultTitle: 'Confirm',
      defaultConfirmLabel: 'Confirm',
    },
  }

  const config = variantConfig[variant]
  const displayTitle = title || config.defaultTitle
  const displayConfirmLabel = confirmLabel || config.defaultConfirmLabel

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-border/50 bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Icon + Title */}
          <div className="flex items-start gap-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconBg} ${config.iconColor}`}>
              {config.icon}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-lg font-semibold text-foreground">{displayTitle}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{message}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              onClick={onCancel}
              className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {cancelLabel}
            </button>
            <button
              ref={confirmRef}
              onClick={onConfirm}
              className={`rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors ${config.buttonBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${variant === 'danger' ? 'focus:ring-red-500/50' : variant === 'warning' ? 'focus:ring-amber-500/50' : 'focus:ring-primary/50'}`}
            >
              {displayConfirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
