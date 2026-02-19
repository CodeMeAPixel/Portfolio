import { ChevronDown, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface AdminFormDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => void
  loading?: boolean
  submitLabel?: string
}

export function AdminFormDrawer({
  open,
  onClose,
  title,
  children,
  onSubmit,
  loading,
  submitLabel = 'Save',
}: AdminFormDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative flex h-full w-full max-w-2xl flex-col border-l border-border/50 bg-background shadow-2xl animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/6 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="space-y-5">{children}</div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-border/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/4 hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg gradient-brand px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
            >
              {loading ? 'Saving...' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Reusable form field components ─────────────────── */

export function FormField({
  label,
  children,
  required,
  hint,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
  hint?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs text-muted-foreground/60">{hint}</p>
      )}
    </div>
  )
}

export function FormInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`h-9 w-full rounded-lg border border-border/50 bg-foreground/2 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/4 ${props.className || ''}`}
    />
  )
}

export function FormTextarea({
  rows = 3,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={`w-full rounded-lg border border-border/50 bg-foreground/2 px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/4 ${props.className || ''}`}
    />
  )
}

export function FormSelect({
  children,
  value,
  onChange,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Extract options from children
  const options: { value: string; label: string }[] = []
  const extractOptions = (nodes: React.ReactNode) => {
    const arr = Array.isArray(nodes) ? nodes : [nodes]
    arr.forEach((child: any) => {
      if (!child) return
      if (child.type === 'option') {
        options.push({
          value: child.props.value ?? '',
          label:
            typeof child.props.children === 'string'
              ? child.props.children
              : String(child.props.children ?? child.props.value ?? ''),
        })
      }
      if (child.props?.children && child.type !== 'option') {
        extractOptions(child.props.children)
      }
    })
  }
  extractOptions(children)

  const selectedLabel =
    options.find((o) => o.value === value)?.label || options[0]?.label || ''

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-9 w-full items-center justify-between rounded-lg border border-border/50 bg-foreground/2 px-3 text-sm outline-none transition-colors hover:border-border focus:border-primary/30 focus:bg-foreground/4 ${props.className || ''}`}
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground/60'}>
          {selectedLabel}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground/50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-52 overflow-y-auto rounded-lg border border-border/50 bg-background shadow-xl shadow-black/20 backdrop-blur-sm">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.({
                  target: { value: opt.value },
                } as React.ChangeEvent<HTMLSelectElement>)
                setOpen(false)
              }}
              className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors ${
                opt.value === value
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-foreground/6'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {/* Hidden native select for form semantics */}
      <select
        {...props}
        value={value}
        onChange={onChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      >
        {children}
      </select>
    </div>
  )
}

export function FormCheckbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-border/50 bg-foreground/2 accent-primary"
      />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  )
}

export function FormTagInput({
  value,
  onChange,
  placeholder = 'Type and press Enter...',
}: {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = inputRef.current?.value.trim()
      if (val && !value.includes(val)) {
        onChange([...value, val])
        if (inputRef.current) inputRef.current.value = ''
      }
    }
    if (e.key === 'Backspace' && !inputRef.current?.value && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/50 bg-foreground/2 px-2 py-1.5 transition-colors focus-within:border-primary/30 focus-within:bg-foreground/4">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-md bg-foreground/6 px-2 py-0.5 text-xs text-foreground"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="ml-0.5 text-muted-foreground/50 hover:text-red-400"
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        placeholder={value.length === 0 ? placeholder : ''}
        onKeyDown={handleKeyDown}
        className="min-w-25 flex-1 bg-transparent py-0.5 text-sm outline-none placeholder:text-muted-foreground/40"
      />
    </div>
  )
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}
