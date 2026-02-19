import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createMeta } from '~/lib/meta'
import {
  Star, Trash2, Plus, X, Send, MessageSquare, CheckCircle2,
  XCircle, AlertTriangle, Clock, Edit3,
} from 'lucide-react'
import { useConfirm } from '~/components/ConfirmDialog'
import { useToast } from '~/components/Toast'
import {
  getUserReviews, submitReview, deleteOwnReview,
  getReviewComments, addReviewComment,
} from '~/lib/admin-fns'

const reviewsQueryOptions = {
  queryKey: ['dashboard', 'reviews'],
  queryFn: () => getUserReviews(),
}

export const Route = createFileRoute('/dashboard/reviews')({
  head: () => createMeta({ title: 'My Reviews', path: '/dashboard/reviews' }),
  component: DashboardReviews,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(reviewsQueryOptions)
  },
})

const statusConfig = {
  PENDING:           { label: 'Pending Review',     icon: Clock,         color: 'text-yellow-400', bg: 'bg-yellow-500/10', desc: 'Your review is awaiting admin approval.' },
  APPROVED:          { label: 'Approved',           icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-500/10', desc: 'Your review is live and visible to everyone.' },
  DENIED:            { label: 'Denied',             icon: XCircle,       color: 'text-red-400', bg: 'bg-red-500/10', desc: 'Your review was not approved.' },
  CHANGES_REQUESTED: { label: 'Changes Requested',  icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10', desc: 'The admin has requested some changes. Check the conversation below.' },
} as const

function DashboardReviews() {
  const { data: reviews } = useSuspenseQuery(reviewsQueryOptions)
  const queryClient = useQueryClient()
  const confirm = useConfirm()
  const toast = useToast()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  // Form state
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState('')
  const [projectName, setProjectName] = useState('')
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [workDone, setWorkDone] = useState('')

  // Conversation panel
  const [threadId, setThreadId] = useState<string | null>(null)

  const resetForm = () => {
    setRating(5)
    setReview('')
    setProjectName('')
    setCompany('')
    setPosition('')
    setWorkDone('')
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!review.trim()) return
    setLoading(true)
    try {
      await submitReview({ data: {
        rating,
        review: review.trim(),
        projectName: projectName.trim() || undefined,
        company: company.trim() || undefined,
        position: position.trim() || undefined,
        workDone: workDone.trim() || undefined,
      } })
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'reviews'] })
      resetForm()
      toast.success('Review submitted for approval')
    } catch (err) {
      console.error('Failed to submit review:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!(await confirm({ message: 'Delete this review? This cannot be undone.' }))) return
    setDeleteLoading(id)
    try {
      await deleteOwnReview({ data: { reviewId: id } })
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'reviews'] })
      toast.success('Review deleted')
    } catch (err) {
      console.error('Failed to delete review:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete review')
    } finally {
      setDeleteLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-amber-400" />
            <h1 className="text-2xl font-bold tracking-tight">My Reviews</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''} submitted
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
            showForm
              ? 'border border-border/50 text-muted-foreground hover:text-foreground'
              : 'gradient-brand text-primary-foreground hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {showForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border/50 p-5">
          <h2 className="text-sm font-semibold">New Review</h2>

          {/* Rating */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-5 w-5 ${
                      i <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-foreground/10'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="mb-2 block text-xs font-medium text-muted-foreground">
              Your Review <span className="text-red-400">*</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              required
              placeholder="Tell us about your experience..."
              className="w-full rounded-lg border border-border/50 bg-foreground/[0.02] px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/[0.04]"
            />
          </div>

          {/* Optional fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Project Name', value: projectName, set: setProjectName, placeholder: 'e.g. Portfolio Website' },
              { label: 'Company', value: company, set: setCompany, placeholder: 'e.g. Acme Inc.' },
              { label: 'Your Position', value: position, set: setPosition, placeholder: 'e.g. CEO' },
              { label: 'Work Done', value: workDone, set: setWorkDone, placeholder: 'e.g. Built a custom website' },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="h-9 w-full rounded-lg border border-border/50 bg-foreground/[0.02] px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/[0.04]"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !review.trim()}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground transition-all gradient-brand hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-3">
        {reviews.map((r: any) => {
          const sc = statusConfig[r.status as keyof typeof statusConfig] || statusConfig.PENDING
          const StatusIcon = sc.icon
          return (
            <div
              key={r.id}
              className="group rounded-xl border border-border/50 p-4 transition-all hover:border-border/80"
            >
              {/* Status badge + actions row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="space-y-1.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc.color} ${sc.bg}`}>
                    <StatusIcon className="h-3 w-3" />
                    {sc.label}
                  </span>
                  <p className="text-[11px] text-muted-foreground/60">{sc.desc}</p>
                </div>
                <div className="flex items-center gap-1">
                  {r._count?.comments > 0 && (
                    <button
                      onClick={() => setThreadId(threadId === r.id ? null : r.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        threadId === r.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground bg-foreground/[0.04]'
                      }`}
                    >
                      <MessageSquare className="h-3 w-3" />
                      {r._count.comments}
                    </button>
                  )}
                  {r.status === 'CHANGES_REQUESTED' && (
                    <button
                      onClick={() => setThreadId(threadId === r.id ? null : r.id)}
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
                    >
                      <Edit3 className="h-3 w-3" />
                      View Feedback
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r.id)}
                    disabled={deleteLoading === r.id}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground/30 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100 disabled:opacity-50"
                    title="Delete review"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Review content */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {r.projectName && (
                    <span className="text-sm font-medium">{r.projectName}</span>
                  )}
                  {r.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                      <Star className="h-2.5 w-2.5 fill-amber-400" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < r.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-foreground/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.review}</p>

              {/* Denial reason */}
              {r.status === 'DENIED' && r.denialReason && (
                <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                    <p className="text-[12px] font-semibold text-red-400">Reason for Denial</p>
                  </div>
                  <p className="text-[13px] text-red-300/80 leading-relaxed">{r.denialReason}</p>
                </div>
              )}

              {/* Conversation thread (inline) */}
              {threadId === r.id && (
                <UserReviewThread reviewId={r.id} />
              )}

              <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground/40">
                {(r.company || r.position) && (
                  <>
                    <span>{[r.position, r.company].filter(Boolean).join(' at ')}</span>
                    <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/20" />
                  </>
                )}
                <span>
                  {new Date(r.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          )
        })}

        {reviews.length === 0 && !showForm && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageSquare className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No reviews yet</p>
            <p className="mt-1 text-xs text-muted-foreground/40">
              Click "Write a Review" to submit your first one.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── User Conversation Thread Component ─── */

function UserReviewThread({ reviewId }: { reviewId: string }) {
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
    } catch (err) {
      console.error('Failed to load comments:', err)
    } finally { setLoadingComments(false) }
  }

  const handleSend = async () => {
    if (!newComment.trim()) return
    setSending(true)
    try {
      await addReviewComment({ data: { reviewId, content: newComment.trim() } })
      setNewComment('')
      await loadComments()
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'reviews'] })
    } catch (err) {
      console.error('Failed to send comment:', err)
    } finally { setSending(false) }
  }

  // Auto-load on mount
  if (!loaded && !loadingComments) {
    loadComments()
  }

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-border/30 bg-foreground/[0.01] p-3">
      <div className="flex items-center gap-1.5">
        <MessageSquare className="h-3.5 w-3.5 text-primary/60" />
        <p className="text-[12px] font-semibold text-muted-foreground">Conversation with Admin</p>
      </div>

      {loadingComments && !loaded ? (
        <p className="text-[11px] text-muted-foreground/40 text-center py-3">Loading conversation...</p>
      ) : (
        <>
          {/* Messages */}
          <div className="max-h-60 space-y-2 overflow-y-auto">
            {comments.map((c: any) => (
              <div
                key={c.id}
                className={`rounded-lg p-2.5 text-[12px] ${
                  c.authorRole === 'ADMIN'
                    ? 'border border-primary/20 bg-primary/5'
                    : 'border border-border/30 bg-foreground/[0.03] ml-4'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`font-semibold ${c.authorRole === 'ADMIN' ? 'text-primary' : 'text-foreground'}`}>
                    {c.authorName}
                  </span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                    c.authorRole === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-foreground/[0.06] text-muted-foreground'
                  }`}>
                    {c.authorRole === 'ADMIN' ? 'Admin' : 'You'}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground/50">
                    {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{c.content}</p>
              </div>
            ))}
            {comments.length === 0 && loaded && (
              <p className="text-[11px] text-muted-foreground/40 text-center py-3">No messages yet</p>
            )}
          </div>

          {/* Reply input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Write a reply..."
              className="h-8 flex-1 rounded-md border border-border/50 bg-foreground/[0.02] px-2.5 text-[12px] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30"
            />
            <button
              onClick={handleSend}
              disabled={sending || !newComment.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-all hover:bg-primary/20 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
