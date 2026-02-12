import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
  Star, StarOff, Trash2, Search, MessageSquare, CheckCircle2,
  XCircle, AlertTriangle, Clock, Send,
} from 'lucide-react'
import {
  getAdminReviews, deleteReview, toggleReviewFeatured,
  approveReview, denyReview, requestReviewChanges,
  getReviewComments, addReviewComment,
} from '~/lib/admin-fns'
import { createMeta } from '~/lib/meta'

const reviewsQueryOptions = {
  queryKey: ['admin', 'reviews'],
  queryFn: () => getAdminReviews(),
}

export const Route = createFileRoute('/admin/reviews')({
  head: () => createMeta({ title: 'Reviews - Admin', path: '/admin/reviews' }),
  component: AdminReviews,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(reviewsQueryOptions)
  },
})

type StatusFilter = 'ALL' | 'PENDING' | 'APPROVED' | 'DENIED' | 'CHANGES_REQUESTED' | 'FEATURED'

const statusConfig = {
  PENDING:           { label: 'Pending',            icon: Clock,         color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  APPROVED:          { label: 'Approved',           icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  DENIED:            { label: 'Denied',             icon: XCircle,       color: 'text-red-400', bg: 'bg-red-500/10' },
  CHANGES_REQUESTED: { label: 'Changes Requested',  icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
} as const

function AdminReviews() {
  const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<StatusFilter>('ALL')
  const [denyModalId, setDenyModalId] = useState<string | null>(null)
  const [denyReason, setDenyReason] = useState('')
  const [changesModalId, setChangesModalId] = useState<string | null>(null)
  const [changesComment, setChangesComment] = useState('')
  const [threadId, setThreadId] = useState<string | null>(null)

  const filtered = reviews.filter((r: any) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.review.toLowerCase().includes(search.toLowerCase()) ||
      (r.projectName?.toLowerCase().includes(search.toLowerCase()) ?? false)
    if (filter === 'ALL') return matchesSearch
    if (filter === 'FEATURED') return matchesSearch && r.featured
    return matchesSearch && r.status === filter
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] })

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setLoading(id)
    try {
      await toggleReviewFeatured({ data: { reviewId: id, featured: !current } })
      invalidate()
    } finally { setLoading(null) }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review by "${name}"? This cannot be undone.`)) return
    setLoading(id)
    try {
      await deleteReview({ data: { reviewId: id } })
      invalidate()
    } finally { setLoading(null) }
  }

  const handleApprove = async (id: string) => {
    setLoading(id)
    try {
      await approveReview({ data: { reviewId: id } })
      invalidate()
    } finally { setLoading(null) }
  }

  const handleDeny = async () => {
    if (!denyModalId) return
    setLoading(denyModalId)
    try {
      await denyReview({ data: { reviewId: denyModalId, reason: denyReason.trim() || undefined } })
      invalidate()
      setDenyModalId(null)
      setDenyReason('')
    } finally { setLoading(null) }
  }

  const handleRequestChanges = async () => {
    if (!changesModalId || !changesComment.trim()) return
    setLoading(changesModalId)
    try {
      await requestReviewChanges({ data: { reviewId: changesModalId, comment: changesComment.trim() } })
      invalidate()
      setChangesModalId(null)
      setChangesComment('')
    } finally { setLoading(null) }
  }

  const counts = {
    total: reviews.length,
    pending: reviews.filter((r: any) => r.status === 'PENDING').length,
    approved: reviews.filter((r: any) => r.status === 'APPROVED').length,
    denied: reviews.filter((r: any) => r.status === 'DENIED').length,
    changesRequested: reviews.filter((r: any) => r.status === 'CHANGES_REQUESTED').length,
    featured: reviews.filter((r: any) => r.featured).length,
  }
  const avgRating = reviews.length > 0 ? (reviews.reduce((a: number, r: any) => a + r.rating, 0) / reviews.length).toFixed(1) : '0'

  const filters: { key: StatusFilter; label: string; count: number }[] = [
    { key: 'ALL', label: 'All', count: counts.total },
    { key: 'PENDING', label: 'Pending', count: counts.pending },
    { key: 'APPROVED', label: 'Approved', count: counts.approved },
    { key: 'DENIED', label: 'Denied', count: counts.denied },
    { key: 'CHANGES_REQUESTED', label: 'Changes', count: counts.changesRequested },
    { key: 'FEATURED', label: 'Featured', count: counts.featured },
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-amber-400" />
          <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{counts.total} total</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{counts.pending} pending</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {avgRating} avg
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search by name, review, or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/50 bg-foreground/[0.02] pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/[0.04]"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto rounded-lg border border-border/50 bg-foreground/[0.02] p-0.5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
                filter === f.key ? 'bg-foreground/[0.08] text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${filter === f.key ? 'bg-foreground/[0.08]' : 'bg-foreground/[0.04]'}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((review: any) => {
          const sc = statusConfig[review.status as keyof typeof statusConfig] || statusConfig.PENDING
          const StatusIcon = sc.icon
          return (
            <div key={review.id} className="group relative overflow-hidden rounded-xl border border-border/50 bg-foreground/[0.02] p-4 transition-all duration-200 hover:border-primary/20 hover:bg-foreground/[0.04]">
              <div className="mb-3 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc.color} ${sc.bg}`}>
                  <StatusIcon className="h-3 w-3" />
                  {sc.label}
                </span>
                {review._count?.comments > 0 && (
                  <button
                    onClick={() => setThreadId(threadId === review.id ? null : review.id)}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors bg-foreground/[0.04]"
                  >
                    <MessageSquare className="h-3 w-3" />
                    {review._count.comments}
                  </button>
                )}
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.name} className="h-8 w-8 rounded-full object-cover ring-1 ring-border/50" />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-xs font-bold text-amber-400">
                      {review.name[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium">{review.name}</p>
                      {review.featured && <Star className="h-3 w-3 fill-amber-400 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground/60">
                      {[review.position, review.company].filter(Boolean).join(' · ') || review.projectName || '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-foreground/[0.08]'}`} />
                ))}
              </div>

              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground line-clamp-3">{review.review}</p>

              {review.status === 'DENIED' && review.denialReason && (
                <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 p-2.5">
                  <p className="text-[11px] font-medium text-red-400 mb-1">Denial Reason</p>
                  <p className="text-[12px] text-red-300/80">{review.denialReason}</p>
                </div>
              )}

              {threadId === review.id && <ReviewThread reviewId={review.id} />}

              <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-border/30 pt-3">
                {review.status !== 'APPROVED' && (
                  <button onClick={() => handleApprove(review.id)} disabled={loading === review.id} className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-emerald-400 transition-all hover:bg-emerald-500/10 disabled:opacity-40" title="Approve">
                    <CheckCircle2 className="h-3 w-3" /> Approve
                  </button>
                )}
                {review.status !== 'DENIED' && (
                  <button onClick={() => { setDenyModalId(review.id); setDenyReason('') }} disabled={loading === review.id} className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-red-400 transition-all hover:bg-red-500/10 disabled:opacity-40" title="Deny">
                    <XCircle className="h-3 w-3" /> Deny
                  </button>
                )}
                <button onClick={() => { setChangesModalId(review.id); setChangesComment('') }} disabled={loading === review.id} className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-orange-400 transition-all hover:bg-orange-500/10 disabled:opacity-40" title="Request Changes">
                  <AlertTriangle className="h-3 w-3" /> Request Changes
                </button>
                <div className="ml-auto flex items-center gap-0.5">
                  <button onClick={() => handleToggleFeatured(review.id, review.featured)} disabled={loading === review.id} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-amber-400 disabled:opacity-40" title={review.featured ? 'Unfeature' : 'Feature'}>
                    {review.featured ? <StarOff className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => handleDelete(review.id, review.name)} disabled={loading === review.id} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="mb-3 h-8 w-8 text-muted-foreground/20" />
          <p className="text-sm text-muted-foreground/60">No reviews found</p>
        </div>
      )}

      {denyModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDenyModalId(null)}>
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-background p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-red-400" />
              <h2 className="text-lg font-semibold">Deny Review</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Optionally provide a reason. This will be visible to the reviewer.</p>
            <textarea value={denyReason} onChange={(e) => setDenyReason(e.target.value)} rows={3} placeholder="Reason for denial (optional)..." className="w-full rounded-lg border border-border/50 bg-foreground/[0.02] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-red-500/30 focus:bg-foreground/[0.04]" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setDenyModalId(null)} className="rounded-lg border border-border/50 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Cancel</button>
              <button onClick={handleDeny} disabled={loading === denyModalId} className="rounded-lg bg-red-500/10 px-3.5 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 disabled:opacity-50">Deny Review</button>
            </div>
          </div>
        </div>
      )}

      {changesModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setChangesModalId(null)}>
          <div className="w-full max-w-md rounded-2xl border border-border/50 bg-background p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <h2 className="text-lg font-semibold">Request Changes</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Describe what changes need to be made. The reviewer can reply and update their review.</p>
            <textarea value={changesComment} onChange={(e) => setChangesComment(e.target.value)} rows={4} placeholder="What changes do you need?" className="w-full rounded-lg border border-border/50 bg-foreground/[0.02] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-orange-500/30 focus:bg-foreground/[0.04]" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setChangesModalId(null)} className="rounded-lg border border-border/50 px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Cancel</button>
              <button onClick={handleRequestChanges} disabled={loading === changesModalId || !changesComment.trim()} className="rounded-lg bg-orange-500/10 px-3.5 py-2 text-sm font-medium text-orange-400 transition-all hover:bg-orange-500/20 disabled:opacity-50">Send Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ReviewThread({ reviewId }: { reviewId: string }) {
  const queryClient = useQueryClient()
  const [comments, setComments] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loadingComments, setLoadingComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [sending, setSending] = useState(false)

  const loadComments = async () => {
    setLoadingComments(true)
    try {
      const data = await getReviewComments({ data: { reviewId } })
      setComments(data)
      setLoaded(true)
    } finally { setLoadingComments(false) }
  }

  const handleSend = async () => {
    if (!newComment.trim()) return
    setSending(true)
    try {
      await addReviewComment({ data: { reviewId, content: newComment.trim() } })
      setNewComment('')
      await loadComments()
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] })
    } finally { setSending(false) }
  }

  if (!loaded) {
    return (
      <div className="mt-3 border-t border-border/30 pt-3">
        <button onClick={loadComments} disabled={loadingComments} className="flex items-center gap-1.5 text-[12px] font-medium text-primary/70 hover:text-primary transition-colors">
          <MessageSquare className="h-3 w-3" />
          {loadingComments ? 'Loading...' : 'View conversation'}
        </button>
      </div>
    )
  }

  return (
    <div className="mt-3 space-y-3 border-t border-border/30 pt-3">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Conversation</p>
      <div className="max-h-60 space-y-2 overflow-y-auto pr-1">
        {comments.map((c: any) => (
          <div key={c.id} className={`rounded-lg p-2.5 text-[12px] ${c.authorRole === 'ADMIN' ? 'border border-primary/20 bg-primary/5' : 'border border-border/30 bg-foreground/[0.02]'}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`font-semibold ${c.authorRole === 'ADMIN' ? 'text-primary' : 'text-foreground'}`}>{c.authorName}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${c.authorRole === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-foreground/[0.06] text-muted-foreground'}`}>{c.authorRole}</span>
              <span className="ml-auto text-[10px] text-muted-foreground/50">
                {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{c.content}</p>
          </div>
        ))}
        {comments.length === 0 && <p className="text-[11px] text-muted-foreground/40 text-center py-3">No messages yet</p>}
      </div>
      <div className="flex gap-2">
        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} placeholder="Write a reply..." className="h-8 flex-1 rounded-md border border-border/50 bg-foreground/[0.02] px-2.5 text-[12px] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30" />
        <button onClick={handleSend} disabled={sending || !newComment.trim()} className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-all hover:bg-primary/20 disabled:opacity-40">
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
