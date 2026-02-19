import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createMeta } from '~/lib/meta'
import { useConfirm } from '~/components/ConfirmDialog'
import { useToast } from '~/components/Toast'
import {
  Link2,
  Trash2,
  Search,
  Plus,
  Pencil,
  Star,
  StarOff,
  ExternalLink,
  Tag,
  EyeOff,
  Eye,
} from 'lucide-react'
import {
  getAdminReferrals,
  getAdminReferralCategories,
  createReferral,
  updateReferral,
  deleteReferral,
  createReferralCategory,
  deleteReferralCategory,
} from '~/lib/admin-fns'
import {
  AdminFormDrawer,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormTagInput,
  FormRow,
} from '~/components/admin/AdminFormDrawer'

const referralsQueryOptions = {
  queryKey: ['admin', 'referrals'],
  queryFn: () => getAdminReferrals(),
}

const categoriesQueryOptions = {
  queryKey: ['admin', 'referral-categories'],
  queryFn: () => getAdminReferralCategories(),
}

export const Route = createFileRoute('/admin/referrals')({
  head: () => createMeta({ title: 'Referrals - Admin', path: '/admin/referrals' }),
  component: AdminReferrals,
  loader: async ({ context: { queryClient } }) => {
    return Promise.all([
      queryClient.ensureQueryData(referralsQueryOptions),
      queryClient.ensureQueryData(categoriesQueryOptions),
    ])
  },
})

type Referral = Awaited<ReturnType<typeof getAdminReferrals>>[number]

const emptyForm = {
  title: '',
  description: '',
  company: '',
  bannerImage: '',
  color: '',
  url: '',
  code: '',
  discount: '',
  benefits: [] as string[],
  featured: false,
  isNew: false,
  expiryDate: '',
  categoryId: '',
}

const emptyCategoryForm = {
  slug: '',
  name: '',
  description: '',
  icon: '',
  color: '',
}

function AdminReferrals() {
  const { data: referrals } = useSuspenseQuery(referralsQueryOptions)
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions)
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'FEATURED'>('ALL')
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL')

  // Referral form drawer
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  // Category form drawer
  const [catDrawerOpen, setCatDrawerOpen] = useState(false)
  const [catForm, setCatForm] = useState(emptyCategoryForm)
  const [catSaving, setCatSaving] = useState(false)

  const filtered = referrals.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'ALL' || (filter === 'FEATURED' && r.featured)
    const matchesCategory = categoryFilter === 'ALL' || r.categoryId === categoryFilter
    return matchesSearch && matchesFilter && matchesCategory
  })

  const openCreate = () => {
    setEditingReferral(null)
    setForm({ ...emptyForm, categoryId: categories[0]?.id || '' })
    setDrawerOpen(true)
  }

  const openEdit = (referral: Referral) => {
    setEditingReferral(referral)
    setForm({
      title: referral.title,
      description: referral.description,
      company: referral.company,
      bannerImage: referral.bannerImage || '',
      color: referral.color || '',
      url: referral.url,
      code: referral.code || '',
      discount: referral.discount || '',
      benefits: referral.benefits,
      featured: referral.featured,
      isNew: referral.isNew,
      expiryDate: referral.expiryDate || '',
      categoryId: referral.categoryId,
    })
    setDrawerOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.company || !form.url || !form.categoryId) return
    setSaving(true)
    try {
      if (editingReferral) {
        await updateReferral({ data: { referralId: editingReferral.id, ...form } })
      } else {
        await createReferral({ data: form })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'referrals'] })
      setDrawerOpen(false)
      toast.success(editingReferral ? 'Referral updated' : 'Referral created')
    } catch (err) {
      console.error('Failed to save referral:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to save referral')
    } finally {
      setSaving(false)
    }
  }

  const confirm = useConfirm()
  const toast = useToast()

  const handleDelete = async (id: string, title: string) => {
    if (!(await confirm({ message: `Delete referral "${title}"? This cannot be undone.` }))) return
    setLoading(id)
    try {
      await deleteReferral({ data: { referralId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'referrals'] })
      toast.success(`Referral "${title}" deleted`)
    } catch (err) {
      console.error('Failed to delete referral:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete referral')
    } finally {
      setLoading(null)
    }
  }

  const handleToggleFeatured = async (referral: Referral) => {
    setLoading(referral.id)
    try {
      await updateReferral({ data: { referralId: referral.id, featured: !referral.featured } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'referrals'] })
      toast.success(referral.featured ? 'Removed from featured' : 'Marked as featured')
    } catch (err) {
      console.error('Failed to toggle featured:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to toggle featured')
    } finally {
      setLoading(null)
    }
  }

  const handleCategorySubmit = async () => {
    if (!catForm.name || !catForm.slug) return
    setCatSaving(true)
    try {
      await createReferralCategory({ data: catForm })
      queryClient.invalidateQueries({ queryKey: ['admin', 'referral-categories'] })
      setCatDrawerOpen(false)
      toast.success('Category created')
    } catch (err) {
      console.error('Failed to create category:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to create category')
    } finally {
      setCatSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!(await confirm({ title: 'Delete Category', message: `Delete category "${name}"? All referrals in this category will also be deleted.` }))) return
    setLoading(id)
    try {
      await deleteReferralCategory({ data: { categoryId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'referral-categories'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'referrals'] })
      toast.success(`Category "${name}" deleted`)
    } catch (err) {
      console.error('Failed to delete category:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete category')
    } finally {
      setLoading(null)
    }
  }

  const featuredCount = referrals.filter((r) => r.featured).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-tight">Referrals</h1>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{referrals.length} total</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{featuredCount} featured</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{categories.length} categories</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCatForm(emptyCategoryForm)
              setCatDrawerOpen(true)
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-foreground/[0.04] hover:text-foreground"
          >
            <Tag className="h-3.5 w-3.5" />
            New Category
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-1.5 rounded-lg gradient-brand px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            New Referral
          </button>
        </div>
      </div>

      {/* Categories bar */}
      {categories.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`group flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all ${
                  categoryFilter === cat.id
                    ? 'border-primary/30 bg-primary/5 text-foreground'
                    : 'border-border/50 bg-foreground/[0.02] text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                <button onClick={() => setCategoryFilter(categoryFilter === cat.id ? 'ALL' : cat.id)}>
                  {cat.name}
                  <span className="ml-1 text-muted-foreground/50">({(cat as any)._count?.referrals || 0})</span>
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id, cat.name)}
                  className="hidden text-muted-foreground/40 transition-colors hover:text-red-400 group-hover:inline-block"
                  title="Delete category"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Search by title, company, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border/50 bg-foreground/[0.02] pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/[0.04]"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-foreground/[0.02] p-0.5">
          {(['ALL', 'FEATURED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-foreground/[0.08] text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'ALL' ? 'All' : 'Featured'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-foreground/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Referral</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">Category</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Code</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((referral) => (
                <tr key={referral.id} className="group transition-colors hover:bg-foreground/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {referral.bannerImage ? (
                        <img
                          src={referral.bannerImage}
                          alt={referral.title}
                          className="h-9 w-9 rounded-lg object-cover ring-1 ring-border/50"
                        />
                      ) : (
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
                          style={{ backgroundColor: referral.color || '#06b6d4' }}
                        >
                          {referral.company[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{referral.title}</p>
                        <p className="truncate text-xs text-muted-foreground/50">{referral.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground/70">
                      {referral.category?.name || '—'}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    {referral.code ? (
                      <code className="rounded bg-foreground/[0.04] px-1.5 py-0.5 text-xs font-mono text-cyan-400">
                        {referral.code}
                      </code>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <div className="flex items-center gap-2">
                      {referral.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400" />
                          Featured
                        </span>
                      )}
                      {referral.isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                          New
                        </span>
                      )}
                      {!referral.featured && !referral.isNew && (
                        <span className="text-xs text-muted-foreground/40">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(referral)}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="hidden xl:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(referral)}
                        disabled={loading === referral.id}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-amber-400 disabled:opacity-40"
                        title={referral.featured ? 'Unfeature' : 'Feature'}
                      >
                        {referral.featured ? <StarOff className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                      </button>
                      <a
                        href={referral.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                        title="Visit"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(referral.id, referral.title)}
                        disabled={loading === referral.id}
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
            <Link2 className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No referrals found</p>
          </div>
        )}
      </div>

      {/* Referral Create/Edit Drawer */}
      <AdminFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingReferral ? 'Edit Referral' : 'New Referral'}
        onSubmit={handleSubmit}
        loading={saving}
        submitLabel={editingReferral ? 'Update Referral' : 'Create Referral'}
      >
        <FormRow>
          <FormField label="Title" required>
            <FormInput
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Get $100 in credits"
            />
          </FormField>
          <FormField label="Company" required>
            <FormInput
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              placeholder="DigitalOcean"
            />
          </FormField>
        </FormRow>

        <FormField label="Description" required>
          <FormTextarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Description of the referral offer..."
            rows={3}
          />
        </FormField>

        <FormRow>
          <FormField label="Category" required>
            <FormSelect
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </FormSelect>
          </FormField>
          <FormField label="Referral URL" required>
            <FormInput
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              placeholder="https://..."
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Referral Code">
            <FormInput
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              placeholder="CODEMEAPIXEL"
            />
          </FormField>
          <FormField label="Discount">
            <FormInput
              value={form.discount}
              onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))}
              placeholder="$100 free credits"
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Banner Image" hint="URL or /public path">
            <FormInput
              value={form.bannerImage}
              onChange={(e) => setForm((f) => ({ ...f, bannerImage: e.target.value }))}
              placeholder="/referrals/banner.png or https://..."
            />
          </FormField>
          <FormField label="Brand Color" hint="Hex color code">
            <FormInput
              value={form.color}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
              placeholder="#06b6d4"
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Expiry Date">
            <FormInput
              value={form.expiryDate}
              onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))}
              placeholder="2026-12-31"
            />
          </FormField>
          <div className="flex items-end gap-4 pb-1">
            <FormCheckbox
              label="Featured"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: (e.target as HTMLInputElement).checked }))}
            />
            <FormCheckbox
              label="New"
              checked={form.isNew}
              onChange={(e) => setForm((f) => ({ ...f, isNew: (e.target as HTMLInputElement).checked }))}
            />
          </div>
        </FormRow>

        <FormField label="Benefits" hint="Press Enter to add each benefit">
          <FormTagInput
            value={form.benefits}
            onChange={(benefits) => setForm((f) => ({ ...f, benefits }))}
            placeholder="Free credits, 24/7 support..."
          />
        </FormField>
      </AdminFormDrawer>

      {/* Category Create Drawer */}
      <AdminFormDrawer
        open={catDrawerOpen}
        onClose={() => setCatDrawerOpen(false)}
        title="New Category"
        onSubmit={handleCategorySubmit}
        loading={catSaving}
        submitLabel="Create Category"
      >
        <FormRow>
          <FormField label="Name" required>
            <FormInput
              value={catForm.name}
              onChange={(e) => {
                const name = e.target.value
                setCatForm((f) => ({
                  ...f,
                  name,
                  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                }))
              }}
              placeholder="Cloud Hosting"
            />
          </FormField>
          <FormField label="Slug" required hint="URL-friendly identifier">
            <FormInput
              value={catForm.slug}
              onChange={(e) => setCatForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="cloud-hosting"
            />
          </FormField>
        </FormRow>

        <FormField label="Description">
          <FormTextarea
            value={catForm.description}
            onChange={(e) => setCatForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Category description..."
            rows={2}
          />
        </FormField>

        <FormRow>
          <FormField label="Icon" hint="Lucide icon name">
            <FormInput
              value={catForm.icon}
              onChange={(e) => setCatForm((f) => ({ ...f, icon: e.target.value }))}
              placeholder="cloud"
            />
          </FormField>
          <FormField label="Color" hint="Hex color code">
            <FormInput
              value={catForm.color}
              onChange={(e) => setCatForm((f) => ({ ...f, color: e.target.value }))}
              placeholder="#06b6d4"
            />
          </FormField>
        </FormRow>
      </AdminFormDrawer>
    </div>
  )
}
