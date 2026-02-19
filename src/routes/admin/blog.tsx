import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Eye, EyeOff, Trash2, Search, PenLine, Plus, Pencil } from 'lucide-react'
import { createMeta } from '~/lib/meta'
import { useConfirm } from '~/components/ConfirmDialog'
import { useToast } from '~/components/Toast'
import {
  getAdminBlogPosts,
  deleteBlogPost,
  toggleBlogPostPublished,
  createBlogPost,
  updateBlogPost,
} from '~/lib/admin-fns'
import {
  AdminFormDrawer,
  FormField,
  FormInput,
  FormTextarea,
  FormCheckbox,
  FormTagInput,
  FormRow,
} from '~/components/admin/AdminFormDrawer'

const blogQueryOptions = {
  queryKey: ['admin', 'blog'],
  queryFn: () => getAdminBlogPosts(),
}

export const Route = createFileRoute('/admin/blog')({
  head: () => createMeta({ title: 'Blog - Admin', path: '/admin/blog' }),
  component: AdminBlog,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(blogQueryOptions)
  },
})

type BlogPost = Awaited<ReturnType<typeof getAdminBlogPosts>>[number]

const emptyForm = {
  slug: '',
  title: '',
  description: '',
  content: '',
  image: '',
  author: 'Tyler. H',
  tags: [] as string[],
  categories: [] as string[],
  featured: false,
  published: false,
  readingTime: '',
}

function AdminBlog() {
  const { data: posts } = useSuspenseQuery(blogQueryOptions)
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'PUBLISHED' && p.published) ||
      (filter === 'DRAFT' && !p.published)
    return matchesSearch && matchesFilter
  })

  const openCreate = () => {
    setEditingPost(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  const openEdit = (post: BlogPost) => {
    setEditingPost(post)
    setForm({
      slug: post.slug,
      title: post.title,
      description: post.description || '',
      content: post.content,
      image: post.image || '',
      author: post.author,
      tags: post.tags,
      categories: post.categories,
      featured: post.featured,
      published: post.published,
      readingTime: post.readingTime || '',
    })
    setDrawerOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.content) return
    setSaving(true)
    try {
      if (editingPost) {
        await updateBlogPost({ data: { postId: editingPost.id, ...form } })
      } else {
        await createBlogPost({ data: form })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
      setDrawerOpen(false)
      toast.success(editingPost ? 'Post updated' : 'Post created')
    } catch (err) {
      console.error('Failed to save post:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePublished = async (id: string, current: boolean) => {
    setLoading(id)
    try {
      await toggleBlogPostPublished({ data: { postId: id, published: !current } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
      toast.success(current ? 'Post unpublished' : 'Post published')
    } catch (err) {
      console.error('Failed to toggle publish:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to toggle publish status')
    } finally {
      setLoading(null)
    }
  }

  const confirm = useConfirm()
  const toast = useToast()

  const handleDelete = async (id: string, title: string) => {
    if (!(await confirm({ message: `Delete post "${title}"? This cannot be undone.` }))) return
    setLoading(id)
    try {
      await deleteBlogPost({ data: { postId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] })
      toast.success(`Post "${title}" deleted`)
    } catch (err) {
      console.error('Failed to delete post:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete post')
    } finally {
      setLoading(null)
    }
  }

  const publishedCount = posts.filter((p) => p.published).length
  const draftCount = posts.length - publishedCount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <PenLine className="h-5 w-5 text-pink-400" />
            <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{posts.length} total</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-emerald-400">{publishedCount} published</span>
            {draftCount > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>{draftCount} draft{draftCount !== 1 ? 's' : ''}</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-lg gradient-brand px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/50 bg-foreground/2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/4"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-foreground/2 p-0.5">
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-foreground/8 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'ALL' ? 'All' : f === 'PUBLISHED' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-foreground/2">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Post</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Tags</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((post) => (
                <tr key={post.id} className="group transition-colors hover:bg-foreground/2">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-9 w-9 rounded-lg object-cover ring-1 ring-border/50"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 text-xs font-bold text-pink-400">
                          {post.title[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{post.title}</p>
                        <p className="truncate text-xs text-muted-foreground/50">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-md bg-foreground/4 px-1.5 py-0.5 text-[10px] text-muted-foreground/70">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-[10px] text-muted-foreground/40">+{post.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[11px] font-semibold text-muted-foreground/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(post)}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="hidden xl:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleTogglePublished(post.id, post.published)}
                        disabled={loading === post.id}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground disabled:opacity-40"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        <span className="hidden xl:inline">{post.published ? 'Unpublish' : 'Publish'}</span>
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={loading === post.id}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <PenLine className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No blog posts found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Drawer */}
      <AdminFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingPost ? 'Edit Blog Post' : 'New Blog Post'}
        onSubmit={handleSubmit}
        loading={saving}
        submitLabel={editingPost ? 'Update Post' : 'Create Post'}
      >
        <FormRow>
          <FormField label="Title" required>
            <FormInput
              value={form.title}
              onChange={(e) => {
                const title = e.target.value
                setForm((f) => ({
                  ...f,
                  title,
                  ...(!editingPost ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
                }))
              }}
              placeholder="My Awesome Post"
            />
          </FormField>
          <FormField label="Slug" required hint="URL-friendly identifier">
            <FormInput
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="my-awesome-post"
            />
          </FormField>
        </FormRow>

        <FormField label="Description">
          <FormTextarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="A brief description of the post..."
            rows={2}
          />
        </FormField>

        <FormField label="Content" required hint="Markdown or HTML content">
          <FormTextarea
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            placeholder="Write your post content here..."
            rows={12}
          />
        </FormField>

        <FormRow>
          <FormField label="Cover Image" hint="URL or /public path">
            <FormInput
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="/previews/cover.png or https://..."
            />
          </FormField>
          <FormField label="Author">
            <FormInput
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              placeholder="Tyler. H"
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Reading Time">
            <FormInput
              value={form.readingTime}
              onChange={(e) => setForm((f) => ({ ...f, readingTime: e.target.value }))}
              placeholder="5 min read"
            />
          </FormField>
          <div className="flex items-end gap-4 pb-1">
            <FormCheckbox
              label="Featured"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: (e.target as HTMLInputElement).checked }))}
            />
            <FormCheckbox
              label="Published"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: (e.target as HTMLInputElement).checked }))}
            />
          </div>
        </FormRow>

        <FormField label="Tags" hint="Press Enter or comma to add">
          <FormTagInput
            value={form.tags}
            onChange={(tags) => setForm((f) => ({ ...f, tags }))}
            placeholder="react, nextjs, typescript..."
          />
        </FormField>

        <FormField label="Categories" hint="Press Enter or comma to add">
          <FormTagInput
            value={form.categories}
            onChange={(categories) => setForm((f) => ({ ...f, categories }))}
            placeholder="tutorial, guide..."
          />
        </FormField>
      </AdminFormDrawer>
    </div>
  )
}
