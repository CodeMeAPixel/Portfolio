import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createMeta } from '~/lib/meta'
import {
  BookOpen,
  Trash2,
  Plus,
  Pencil,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  FileText,
  GripVertical,
} from 'lucide-react'
import {
  getAdminDocSections,
  createDocSection,
  updateDocSection,
  deleteDocSection,
  createDocCategory,
  updateDocCategory,
  deleteDocCategory,
  createDocItem,
  updateDocItem,
  deleteDocItem,
} from '~/lib/admin-fns'
import {
  AdminFormDrawer,
  FormField,
  FormInput,
  FormTextarea,
  FormTagInput,
  FormRow,
} from '~/components/admin/AdminFormDrawer'

const docsQueryOptions = {
  queryKey: ['admin', 'docs'],
  queryFn: () => getAdminDocSections(),
}

export const Route = createFileRoute('/admin/docs')({
  head: () => createMeta({ title: 'Docs - Admin', path: '/admin/docs' }),
  component: AdminDocs,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(docsQueryOptions)
  },
})

type Section = Awaited<ReturnType<typeof getAdminDocSections>>[number]
type Category = Section['categories'][number]
type Item = Category['items'][number]

/* ─── Empty form states ──────────────────────────────── */

const emptySectionForm = {
  slug: '',
  name: '',
  description: '',
  icon: '',
  projectUrl: '',
  sortOrder: '0',
}

const emptyCategoryForm = {
  title: '',
  sortOrder: '0',
  sectionId: '',
}

const emptyItemForm = {
  title: '',
  slug: '',
  description: '',
  icon: '',
  content: '',
  keywords: [] as string[],
  sortOrder: '0',
  categoryId: '',
}

/* ─── Main component ────────────────────────────────── */

function AdminDocs() {
  const { data: sections } = useSuspenseQuery(docsQueryOptions)
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState<string | null>(null)

  // Expanded state
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  // Drawer state
  const [drawerType, setDrawerType] = useState<'section' | 'category' | 'item' | null>(null)
  const [sectionForm, setSectionForm] = useState(emptySectionForm)
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm)
  const [itemForm, setItemForm] = useState(emptyItemForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalItems = sections.reduce(
    (acc, s) => acc + s.categories.reduce((a, c) => a + c.items.length, 0),
    0,
  )
  const totalCategories = sections.reduce((acc, s) => acc + s.categories.length, 0)

  /* ─── Section CRUD ─────────────────────────────────── */

  const openCreateSection = () => {
    setEditingId(null)
    setSectionForm(emptySectionForm)
    setDrawerType('section')
  }

  const openEditSection = (section: Section) => {
    setEditingId(section.id)
    setSectionForm({
      slug: section.slug,
      name: section.name,
      description: section.description,
      icon: section.icon,
      projectUrl: section.projectUrl || '',
      sortOrder: section.sortOrder.toString(),
    })
    setDrawerType('section')
  }

  const handleSubmitSection = async () => {
    if (!sectionForm.name || !sectionForm.slug || !sectionForm.description || !sectionForm.icon) return
    setSaving(true)
    try {
      const payload = { ...sectionForm, sortOrder: parseInt(sectionForm.sortOrder) || 0 }
      if (editingId) {
        await updateDocSection({ data: { sectionId: editingId, ...payload } })
      } else {
        await createDocSection({ data: payload })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'docs'] })
      setDrawerType(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSection = async (id: string, name: string) => {
    if (!confirm(`Delete section "${name}" and ALL its categories & items? This cannot be undone.`)) return
    setLoading(id)
    try {
      await deleteDocSection({ data: { sectionId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'docs'] })
    } finally {
      setLoading(null)
    }
  }

  /* ─── Category CRUD ────────────────────────────────── */

  const openCreateCategory = (sectionId: string) => {
    setEditingId(null)
    setCategoryForm({ ...emptyCategoryForm, sectionId })
    setDrawerType('category')
  }

  const openEditCategory = (category: Category) => {
    setEditingId(category.id)
    setCategoryForm({
      title: category.title,
      sortOrder: category.sortOrder.toString(),
      sectionId: category.sectionId,
    })
    setDrawerType('category')
  }

  const handleSubmitCategory = async () => {
    if (!categoryForm.title || !categoryForm.sectionId) return
    setSaving(true)
    try {
      const payload = {
        title: categoryForm.title,
        sectionId: categoryForm.sectionId,
        sortOrder: parseInt(categoryForm.sortOrder) || 0,
      }
      if (editingId) {
        await updateDocCategory({ data: { categoryId: editingId, ...payload } })
      } else {
        await createDocCategory({ data: payload })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'docs'] })
      setDrawerType(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string, title: string) => {
    if (!confirm(`Delete category "${title}" and ALL its items? This cannot be undone.`)) return
    setLoading(id)
    try {
      await deleteDocCategory({ data: { categoryId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'docs'] })
    } finally {
      setLoading(null)
    }
  }

  /* ─── Item CRUD ────────────────────────────────────── */

  const openCreateItem = (categoryId: string) => {
    setEditingId(null)
    setItemForm({ ...emptyItemForm, categoryId })
    setDrawerType('item')
  }

  const openEditItem = (item: Item) => {
    setEditingId(item.id)
    setItemForm({
      title: item.title,
      slug: item.slug,
      description: item.description,
      icon: item.icon || '',
      content: item.content || '',
      keywords: item.keywords,
      sortOrder: item.sortOrder.toString(),
      categoryId: item.categoryId,
    })
    setDrawerType('item')
  }

  const handleSubmitItem = async () => {
    if (!itemForm.title || !itemForm.slug || !itemForm.description || !itemForm.categoryId) return
    setSaving(true)
    try {
      const payload = {
        ...itemForm,
        sortOrder: parseInt(itemForm.sortOrder) || 0,
      }
      if (editingId) {
        await updateDocItem({ data: { itemId: editingId, ...payload } })
      } else {
        await createDocItem({ data: payload })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'docs'] })
      setDrawerType(null)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (id: string, title: string) => {
    if (!confirm(`Delete doc item "${title}"? This cannot be undone.`)) return
    setLoading(id)
    try {
      await deleteDocItem({ data: { itemId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'docs'] })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-sky-400" />
            <h1 className="text-2xl font-bold tracking-tight">Documentation</h1>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{sections.length} section{sections.length !== 1 ? 's' : ''}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{totalCategories} categor{totalCategories !== 1 ? 'ies' : 'y'}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <button
          onClick={openCreateSection}
          className="flex items-center gap-1.5 rounded-lg gradient-brand px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          New Section
        </button>
      </div>

      {/* Tree view */}
      <div className="space-y-2">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id)
          return (
            <div key={section.id} className="overflow-hidden rounded-xl border border-border/50">
              {/* Section header */}
              <div className="flex items-center gap-2 bg-foreground/[0.02] px-4 py-3 transition-colors hover:bg-foreground/[0.04]">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06]"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                <span className="text-lg">{section.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{section.name}</span>
                    <span className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground/60">
                      /{section.slug}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground/60">{section.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-2 text-xs text-muted-foreground/50">
                    {section.categories.length} cat · {section.categories.reduce((a, c) => a + c.items.length, 0)} items
                  </span>
                  <button
                    onClick={() => openCreateCategory(section.id)}
                    className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                    title="Add category"
                  >
                    <Plus className="h-3 w-3" />
                    <span className="hidden sm:inline">Category</span>
                  </button>
                  <button
                    onClick={() => openEditSection(section)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                    title="Edit section"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id, section.name)}
                    disabled={loading === section.id}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                    title="Delete section"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Categories */}
              {isExpanded && (
                <div className="border-t border-border/30">
                  {section.categories.length === 0 ? (
                    <div className="px-12 py-6 text-center text-xs text-muted-foreground/50">
                      No categories yet.{' '}
                      <button
                        onClick={() => openCreateCategory(section.id)}
                        className="text-primary/70 hover:text-primary"
                      >
                        Add one
                      </button>
                    </div>
                  ) : (
                    section.categories.map((category) => {
                      const catExpanded = expandedCategories.has(category.id)
                      return (
                        <div key={category.id}>
                          {/* Category header */}
                          <div className="flex items-center gap-2 border-t border-border/20 bg-foreground/[0.01] px-4 py-2.5 pl-10 transition-colors hover:bg-foreground/[0.03]">
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground/60 transition-colors hover:bg-foreground/[0.06]"
                            >
                              {catExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                              )}
                            </button>
                            <FolderOpen className="h-3.5 w-3.5 text-amber-400/70" />
                            <span className="flex-1 text-sm font-medium text-foreground/90">
                              {category.title}
                            </span>
                            <span className="mr-1 text-[10px] text-muted-foreground/40">
                              {category.items.length} item{category.items.length !== 1 ? 's' : ''}
                            </span>
                            <button
                              onClick={() => openCreateItem(category.id)}
                              className="flex h-6 items-center gap-0.5 rounded px-1.5 text-[11px] text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                              title="Add item"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => openEditCategory(category)}
                              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/40 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                              title="Edit category"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id, category.title)}
                              disabled={loading === category.id}
                              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/40 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                              title="Delete category"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Items */}
                          {catExpanded &&
                            (category.items.length === 0 ? (
                              <div className="border-t border-border/10 px-16 py-4 text-center text-xs text-muted-foreground/40">
                                No items yet.{' '}
                                <button
                                  onClick={() => openCreateItem(category.id)}
                                  className="text-primary/60 hover:text-primary"
                                >
                                  Add one
                                </button>
                              </div>
                            ) : (
                              category.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="group flex items-center gap-2 border-t border-border/10 px-4 py-2 pl-16 transition-colors hover:bg-foreground/[0.02]"
                                >
                                  <FileText className="h-3.5 w-3.5 shrink-0 text-sky-400/50" />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[13px] font-medium text-foreground/80">
                                        {item.title}
                                      </span>
                                      <span className="hidden rounded bg-foreground/[0.03] px-1 py-0.5 text-[9px] text-muted-foreground/40 sm:inline">
                                        /{item.slug}
                                      </span>
                                    </div>
                                    <p className="truncate text-[11px] text-muted-foreground/50">
                                      {item.description}
                                    </p>
                                  </div>
                                  {item.keywords.length > 0 && (
                                    <div className="hidden items-center gap-1 md:flex">
                                      {item.keywords.slice(0, 2).map((kw) => (
                                        <span
                                          key={kw}
                                          className="rounded bg-foreground/[0.03] px-1 py-0.5 text-[9px] text-muted-foreground/40"
                                        >
                                          {kw}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                      onClick={() => openEditItem(item)}
                                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/40 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                                      title="Edit item"
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item.id, item.title)}
                                      disabled={loading === item.id}
                                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground/40 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                                      title="Delete item"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ))}
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}

        {sections.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 py-16 text-center">
            <BookOpen className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No documentation sections yet</p>
            <button
              onClick={openCreateSection}
              className="mt-3 flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/[0.04] hover:text-foreground"
            >
              <Plus className="h-3 w-3" />
              Create your first section
            </button>
          </div>
        )}
      </div>

      {/* Section Drawer */}
      <AdminFormDrawer
        open={drawerType === 'section'}
        onClose={() => setDrawerType(null)}
        title={editingId ? 'Edit Section' : 'New Section'}
        onSubmit={handleSubmitSection}
        loading={saving}
        submitLabel={editingId ? 'Update Section' : 'Create Section'}
      >
        <FormRow>
          <FormField label="Name" required>
            <FormInput
              value={sectionForm.name}
              onChange={(e) => {
                const name = e.target.value
                setSectionForm((f) => ({
                  ...f,
                  name,
                  ...(!editingId ? { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
                }))
              }}
              placeholder="Getting Started"
            />
          </FormField>
          <FormField label="Slug" required hint="URL-friendly identifier">
            <FormInput
              value={sectionForm.slug}
              onChange={(e) => setSectionForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="getting-started"
            />
          </FormField>
        </FormRow>

        <FormField label="Description" required>
          <FormTextarea
            value={sectionForm.description}
            onChange={(e) => setSectionForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="A brief description of this section..."
            rows={2}
          />
        </FormField>

        <FormRow>
          <FormField label="Icon" required hint="Emoji or icon name">
            <FormInput
              value={sectionForm.icon}
              onChange={(e) => setSectionForm((f) => ({ ...f, icon: e.target.value }))}
              placeholder="📚"
            />
          </FormField>
          <FormField label="Sort Order">
            <FormInput
              type="number"
              value={sectionForm.sortOrder}
              onChange={(e) => setSectionForm((f) => ({ ...f, sortOrder: e.target.value }))}
              placeholder="0"
            />
          </FormField>
        </FormRow>

        <FormField label="Project URL" hint="Link to the project this documents">
          <FormInput
            value={sectionForm.projectUrl}
            onChange={(e) => setSectionForm((f) => ({ ...f, projectUrl: e.target.value }))}
            placeholder="https://github.com/..."
          />
        </FormField>
      </AdminFormDrawer>

      {/* Category Drawer */}
      <AdminFormDrawer
        open={drawerType === 'category'}
        onClose={() => setDrawerType(null)}
        title={editingId ? 'Edit Category' : 'New Category'}
        onSubmit={handleSubmitCategory}
        loading={saving}
        submitLabel={editingId ? 'Update Category' : 'Create Category'}
      >
        <FormField label="Title" required>
          <FormInput
            value={categoryForm.title}
            onChange={(e) => setCategoryForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Installation"
          />
        </FormField>

        <FormField label="Sort Order">
          <FormInput
            type="number"
            value={categoryForm.sortOrder}
            onChange={(e) => setCategoryForm((f) => ({ ...f, sortOrder: e.target.value }))}
            placeholder="0"
          />
        </FormField>
      </AdminFormDrawer>

      {/* Item Drawer */}
      <AdminFormDrawer
        open={drawerType === 'item'}
        onClose={() => setDrawerType(null)}
        title={editingId ? 'Edit Doc Item' : 'New Doc Item'}
        onSubmit={handleSubmitItem}
        loading={saving}
        submitLabel={editingId ? 'Update Item' : 'Create Item'}
      >
        <FormRow>
          <FormField label="Title" required>
            <FormInput
              value={itemForm.title}
              onChange={(e) => {
                const title = e.target.value
                setItemForm((f) => ({
                  ...f,
                  title,
                  ...(!editingId ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
                }))
              }}
              placeholder="Quick Start Guide"
            />
          </FormField>
          <FormField label="Slug" required hint="URL-friendly identifier">
            <FormInput
              value={itemForm.slug}
              onChange={(e) => setItemForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="quick-start-guide"
            />
          </FormField>
        </FormRow>

        <FormField label="Description" required>
          <FormTextarea
            value={itemForm.description}
            onChange={(e) => setItemForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="A brief summary of this doc..."
            rows={2}
          />
        </FormField>

        <FormField label="Content" hint="Markdown content for the documentation page">
          <FormTextarea
            value={itemForm.content}
            onChange={(e) => setItemForm((f) => ({ ...f, content: e.target.value }))}
            placeholder="# Getting Started\n\nWrite your documentation here..."
            rows={12}
          />
        </FormField>

        <FormRow>
          <FormField label="Icon" hint="Emoji or icon name">
            <FormInput
              value={itemForm.icon}
              onChange={(e) => setItemForm((f) => ({ ...f, icon: e.target.value }))}
              placeholder="📄"
            />
          </FormField>
          <FormField label="Sort Order">
            <FormInput
              type="number"
              value={itemForm.sortOrder}
              onChange={(e) => setItemForm((f) => ({ ...f, sortOrder: e.target.value }))}
              placeholder="0"
            />
          </FormField>
        </FormRow>

        <FormField label="Keywords" hint="Press Enter or comma to add search keywords">
          <FormTagInput
            value={itemForm.keywords}
            onChange={(keywords) => setItemForm((f) => ({ ...f, keywords }))}
            placeholder="setup, install, config..."
          />
        </FormField>
      </AdminFormDrawer>
    </div>
  )
}
