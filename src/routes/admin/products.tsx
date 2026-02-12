import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Trash2, Search, Eye, DollarSign, ShoppingCart, Plus, Pencil } from 'lucide-react'
import { getAdminProducts, deleteProduct, createProduct, updateProduct } from '~/lib/admin-fns'
import { createMeta } from '~/lib/meta'
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

const productsQueryOptions = {
  queryKey: ['admin', 'products'],
  queryFn: () => getAdminProducts(),
}

export const Route = createFileRoute('/admin/products')({
  head: () => createMeta({ title: 'Products - Admin', path: '/admin/products' }),
  component: AdminProducts,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(productsQueryOptions)
  },
})

type Product = Awaited<ReturnType<typeof getAdminProducts>>[number]

const emptyForm = {
  slug: '',
  title: '',
  description: '',
  longDescription: '',
  price: '',
  currency: 'USD' as const,
  isFree: true,
  platforms: ['FiveM'] as string[],
  frameworks: ['Standalone'] as string[],
  status: 'Released' as const,
  version: '1.0.0',
  images: [] as string[],
  video: '',
  tags: [] as string[],
  features: [] as string[],
  purchaseUrl: '',
  githubUrl: '',
  docsUrl: '',
  discordUrl: '',
  demoUrl: '',
  requirements: [] as string[],
  language: '',
  license: '',
  deprecated: false,
  deprecationMessage: '',
  successorUrl: '',
  migrationSuccessor: '',
  migrationSteps: [] as string[],
  successorFeatures: [] as string[],
}

function AdminProducts() {
  const { data: products } = useSuspenseQuery(productsQueryOptions)
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  )

  const openCreate = () => {
    setEditingProduct(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    const mg = product.migrationGuide as { successor?: string; steps?: string[]; successorFeatures?: string[] } | null
    setForm({
      slug: product.slug,
      title: product.title,
      description: product.description,
      longDescription: product.longDescription || '',
      price: product.price?.toString() || '',
      currency: product.currency as any,
      isFree: product.isFree,
      platforms: product.platforms as string[] || [],
      frameworks: product.frameworks as string[] || [],
      status: product.status as any,
      version: product.version,
      images: product.images,
      video: product.video || '',
      tags: product.tags,
      features: product.features,
      purchaseUrl: product.purchaseUrl || '',
      githubUrl: product.githubUrl || '',
      docsUrl: product.docsUrl || '',
      discordUrl: product.discordUrl || '',
      demoUrl: product.demoUrl || '',
      requirements: product.requirements,
      language: product.language || '',
      license: product.license || '',
      deprecated: product.deprecated,
      deprecationMessage: product.deprecationMessage || '',
      successorUrl: product.successorUrl || '',
      migrationSuccessor: mg?.successor || '',
      migrationSteps: mg?.steps || [],
      successorFeatures: mg?.successorFeatures || [],
    })
    setDrawerOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.description) return
    setSaving(true)
    try {
      const migrationGuide =
        form.migrationSuccessor || form.migrationSteps.length > 0 || form.successorFeatures.length > 0
          ? {
              successor: form.migrationSuccessor || undefined,
              steps: form.migrationSteps.length > 0 ? form.migrationSteps : undefined,
              successorFeatures: form.successorFeatures.length > 0 ? form.successorFeatures : undefined,
            }
          : undefined
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : undefined,
        deprecated: form.deprecated,
        deprecationMessage: form.deprecationMessage || undefined,
        successorUrl: form.successorUrl || undefined,
        migrationGuide,
      }
      // Remove the decomposed migration fields before sending
      const { migrationSuccessor, migrationSteps, successorFeatures, ...cleanPayload } = payload as any
      if (editingProduct) {
        await updateProduct({ data: { productId: editingProduct.id, ...cleanPayload } })
      } else {
        await createProduct({ data: cleanPayload as any })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
      setDrawerOpen(false)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete product "${title}"? This cannot be undone.`)) return
    setLoading(id)
    try {
      await deleteProduct({ data: { productId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
    } finally {
      setLoading(null)
    }
  }

  const statusStyle: Record<string, { dot: string; text: string }> = {
    Released: { dot: 'bg-emerald-400', text: 'text-emerald-400' },
    InDevelopment: { dot: 'bg-blue-400', text: 'text-blue-400' },
    ComingSoon: { dot: 'bg-amber-400', text: 'text-amber-400' },
    Deprecated: { dot: 'bg-red-400', text: 'text-red-400' },
    Archived: { dot: 'bg-muted-foreground/40', text: 'text-muted-foreground/60' },
  }

  const freeCount = products.filter((p) => p.isFree).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-violet-400" />
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{products.length} total</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{freeCount} free</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{products.length - freeCount} paid</span>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-lg gradient-brand px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          New Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
        <input
          type="text"
          placeholder="Search by title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full rounded-lg border border-border/50 bg-foreground/[0.02] pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary/30 focus:bg-foreground/[0.04] sm:max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-foreground/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Product</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">Status</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Platform</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground lg:table-cell">Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((product) => {
                const style = statusStyle[product.status] || statusStyle.Released
                return (
                  <tr key={product.id} className="group transition-colors hover:bg-foreground/[0.02]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-9 w-9 rounded-lg object-cover ring-1 ring-border/50"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-bold text-violet-400">
                            {product.title[0]}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{product.title}</p>
                          <p className="truncate text-xs text-muted-foreground/50">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className={`inline-flex items-center gap-1.5 text-xs ${style.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {product.status.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground/70">
                          {(product as any).platforms?.join(', ') || '—'}
                        </span>
                        <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground/70">
                          {(product as any).frameworks?.join(', ') || '—'}
                        </span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      {product.isFree ? (
                        <span className="text-xs font-medium text-emerald-400">Free</span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-xs font-medium text-amber-400">
                          <DollarSign className="h-3 w-3" />
                          {product.price?.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="hidden xl:inline">Edit</span>
                        </button>
                        <Link
                          to="/shop/$slug"
                          params={{ slug: product.slug }}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.title)}
                          disabled={loading === product.id}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No products found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Drawer */}
      <AdminFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingProduct ? 'Edit Product' : 'New Product'}
        onSubmit={handleSubmit}
        loading={saving}
        submitLabel={editingProduct ? 'Update Product' : 'Create Product'}
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
                  ...(!editingProduct ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
                }))
              }}
              placeholder="My FiveM Script"
            />
          </FormField>
          <FormField label="Slug" required hint="URL-friendly identifier">
            <FormInput
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="my-fivem-script"
            />
          </FormField>
        </FormRow>

        <FormField label="Description" required>
          <FormTextarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="A short description..."
            rows={2}
          />
        </FormField>

        <FormField label="Long Description">
          <FormTextarea
            value={form.longDescription}
            onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
            placeholder="Detailed description..."
            rows={5}
          />
        </FormField>

        <FormRow>
          <FormField label="Platforms" required>
            <div className="flex flex-wrap gap-2">
              {['FiveM', 'RedM'].map((p) => (
                <label key={p} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-all ${
                  form.platforms.includes(p)
                    ? 'border-primary/40 bg-primary/5 text-foreground'
                    : 'border-border/50 bg-foreground/[0.02] text-muted-foreground hover:border-border'
                }`}>
                  <input
                    type="checkbox"
                    checked={form.platforms.includes(p)}
                    onChange={(e) => {
                      const checked = (e.target as HTMLInputElement).checked
                      setForm((f) => ({
                        ...f,
                        platforms: checked
                          ? [...f.platforms, p]
                          : f.platforms.filter((v) => v !== p),
                      }))
                    }}
                    className="sr-only"
                  />
                  <span className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                    form.platforms.includes(p)
                      ? 'border-primary bg-primary text-white'
                      : 'border-border/70'
                  }`}>
                    {form.platforms.includes(p) && (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                  </span>
                  {p}
                </label>
              ))}
            </div>
          </FormField>
          <FormField label="Frameworks" required>
            <div className="flex flex-wrap gap-2">
              {['Standalone', 'QBCore', 'QBox', 'ESX'].map((fw) => (
                <label key={fw} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-all ${
                  form.frameworks.includes(fw)
                    ? 'border-primary/40 bg-primary/5 text-foreground'
                    : 'border-border/50 bg-foreground/[0.02] text-muted-foreground hover:border-border'
                }`}>
                  <input
                    type="checkbox"
                    checked={form.frameworks.includes(fw)}
                    onChange={(e) => {
                      const checked = (e.target as HTMLInputElement).checked
                      setForm((f) => ({
                        ...f,
                        frameworks: checked
                          ? [...f.frameworks, fw]
                          : f.frameworks.filter((v) => v !== fw),
                      }))
                    }}
                    className="sr-only"
                  />
                  <span className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${
                    form.frameworks.includes(fw)
                      ? 'border-primary bg-primary text-white'
                      : 'border-border/70'
                  }`}>
                    {form.frameworks.includes(fw) && (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                  </span>
                  {fw}
                </label>
              ))}
            </div>
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Status">
            <FormSelect
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
            >
              <option value="Released">Released</option>
              <option value="InDevelopment">In Development</option>
              <option value="ComingSoon">Coming Soon</option>
              <option value="Deprecated">Deprecated</option>
              <option value="Archived">Archived</option>
            </FormSelect>
          </FormField>
          <FormField label="Version">
            <FormInput
              value={form.version}
              onChange={(e) => setForm((f) => ({ ...f, version: e.target.value }))}
              placeholder="1.0.0"
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Price">
            <FormInput
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0.00"
            />
          </FormField>
          <FormField label="Currency">
            <FormSelect
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as any }))}
            >
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </FormSelect>
          </FormField>
        </FormRow>

        <FormCheckbox
          label="Free product"
          checked={form.isFree}
          onChange={(e) => setForm((f) => ({ ...f, isFree: (e.target as HTMLInputElement).checked }))}
        />

        <FormField label="Tags" hint="Press Enter or comma to add">
          <FormTagInput
            value={form.tags}
            onChange={(tags) => setForm((f) => ({ ...f, tags }))}
            placeholder="fivem, script, qbcore..."
          />
        </FormField>

        <FormField label="Features" hint="Press Enter or comma to add">
          <FormTagInput
            value={form.features}
            onChange={(features) => setForm((f) => ({ ...f, features }))}
            placeholder="Feature 1, Feature 2..."
          />
        </FormField>

        <FormField label="Requirements" hint="Press Enter or comma to add">
          <FormTagInput
            value={form.requirements}
            onChange={(requirements) => setForm((f) => ({ ...f, requirements }))}
            placeholder="oxmysql, qb-core..."
          />
        </FormField>

        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">URLs</h3>
        <FormRow>
          <FormField label="Purchase URL">
            <FormInput
              value={form.purchaseUrl}
              onChange={(e) => setForm((f) => ({ ...f, purchaseUrl: e.target.value }))}
              placeholder="https://..."
            />
          </FormField>
          <FormField label="GitHub URL">
            <FormInput
              value={form.githubUrl}
              onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
              placeholder="https://github.com/..."
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Docs URL">
            <FormInput
              value={form.docsUrl}
              onChange={(e) => setForm((f) => ({ ...f, docsUrl: e.target.value }))}
              placeholder="https://docs..."
            />
          </FormField>
          <FormField label="Demo URL">
            <FormInput
              value={form.demoUrl}
              onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
              placeholder="https://demo..."
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Language">
            <FormInput
              value={form.language}
              onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
              placeholder="Lua"
            />
          </FormField>
          <FormField label="License">
            <FormInput
              value={form.license}
              onChange={(e) => setForm((f) => ({ ...f, license: e.target.value }))}
              placeholder="MIT"
            />
          </FormField>
        </FormRow>

        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">Deprecation &amp; Successor</h3>

        <FormCheckbox
          label="Mark as deprecated"
          checked={form.deprecated}
          onChange={(e) => setForm((f) => ({ ...f, deprecated: (e.target as HTMLInputElement).checked }))}
        />

        {form.deprecated && (
          <>
            <FormField label="Deprecation Message">
              <FormTextarea
                value={form.deprecationMessage}
                onChange={(e) => setForm((f) => ({ ...f, deprecationMessage: e.target.value }))}
                placeholder="This product is no longer maintained..."
                rows={2}
              />
            </FormField>

            <FormRow>
              <FormField label="Successor Name" hint="Name of the replacement product">
                <FormInput
                  value={form.migrationSuccessor}
                  onChange={(e) => setForm((f) => ({ ...f, migrationSuccessor: e.target.value }))}
                  placeholder="Pixel Logs"
                />
              </FormField>
              <FormField label="Successor URL" hint="Link to the successor">
                <FormInput
                  value={form.successorUrl}
                  onChange={(e) => setForm((f) => ({ ...f, successorUrl: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </FormField>
            </FormRow>

            <FormField label="Migration Steps" hint="Press Enter or comma to add">
              <FormTagInput
                value={form.migrationSteps}
                onChange={(steps) => setForm((f) => ({ ...f, migrationSteps: steps }))}
                placeholder="Step 1, Step 2..."
              />
            </FormField>

            <FormField label="Successor Features" hint="Press Enter or comma to add">
              <FormTagInput
                value={form.successorFeatures}
                onChange={(features) => setForm((f) => ({ ...f, successorFeatures: features }))}
                placeholder="Feature 1, Feature 2..."
              />
            </FormField>
          </>
        )}
      </AdminFormDrawer>
    </div>
  )
}
