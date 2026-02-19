import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Star, StarOff, Trash2, Search, Eye, FolderKanban, Plus, Pencil } from 'lucide-react'
import { createMeta } from '~/lib/meta'
import { useConfirm } from '~/components/ConfirmDialog'
import { useToast } from '~/components/Toast'
import {
  getAdminProjects,
  deleteProject,
  toggleProjectFeatured,
  createProject,
  updateProject,
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

const projectsQueryOptions = {
  queryKey: ['admin', 'projects'],
  queryFn: () => getAdminProjects(),
}

export const Route = createFileRoute('/admin/projects')({
  head: () => createMeta({ title: 'Projects - Admin', path: '/admin/projects' }),
  component: AdminProjects,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(projectsQueryOptions)
  },
})

type ProjectType = Awaited<ReturnType<typeof getAdminProjects>>[number]

const emptyForm = {
  slug: '',
  title: '',
  description: '',
  longDescription: '',
  images: [] as string[],
  tags: [] as string[],
  featured: false,
  date: '',
  role: '',
  teamSize: '',
  demoUrl: '',
  githubUrl: '',
  docsUrl: '',
  supportUrl: '',
  challenges: [] as string[],
  solutions: [] as string[],
  keyFeatures: [] as string[],
}

function AdminProjects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions)
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'FEATURED'>('ALL')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'ALL' || (filter === 'FEATURED' && p.featured)
    return matchesSearch && matchesFilter
  })

  const openCreate = () => {
    setEditingProject(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  const openEdit = (project: ProjectType) => {
    setEditingProject(project)
    setForm({
      slug: project.slug,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || '',
      images: project.images,
      tags: project.tags,
      featured: project.featured,
      date: project.date || '',
      role: project.role || '',
      teamSize: project.teamSize?.toString() || '',
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      docsUrl: project.docsUrl || '',
      supportUrl: project.supportUrl || '',
      challenges: project.challenges,
      solutions: project.solutions,
      keyFeatures: project.keyFeatures,
    })
    setDrawerOpen(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.description) return
    setSaving(true)
    try {
      const payload = {
        ...form,
        teamSize: form.teamSize ? parseInt(form.teamSize) : undefined,
      }
      if (editingProject) {
        await updateProject({ data: { projectId: editingProject.id, ...payload } })
      } else {
        await createProject({ data: payload })
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
      setDrawerOpen(false)
      toast.success(editingProject ? 'Project updated' : 'Project created')
    } catch (err) {
      console.error('Failed to save project:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    setLoading(id)
    try {
      await toggleProjectFeatured({ data: { projectId: id, featured: !current } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
      toast.success(current ? 'Removed from featured' : 'Marked as featured')
    } catch (err) {
      console.error('Failed to toggle featured:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to toggle featured')
    } finally {
      setLoading(null)
    }
  }

  const confirm = useConfirm()
  const toast = useToast()

  const handleDelete = async (id: string, title: string) => {
    if (!(await confirm({ message: `Delete project "${title}"? This cannot be undone.` }))) return
    setLoading(id)
    try {
      await deleteProject({ data: { projectId: id } })
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] })
      toast.success(`Project "${title}" deleted`)
    } catch (err) {
      console.error('Failed to delete project:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete project')
    } finally {
      setLoading(null)
    }
  }

  const featuredCount = projects.filter((p) => p.featured).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{projects.length} total</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{featuredCount} featured</span>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 rounded-lg gradient-brand px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          New Project
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
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Project</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground md:table-cell">Tags</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((project) => (
                <tr key={project.id} className="group transition-colors hover:bg-foreground/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {project.images[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="h-9 w-9 rounded-lg object-cover ring-1 ring-border/50"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                          {project.title[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{project.title}</p>
                        <p className="truncate text-xs text-muted-foreground/50">/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-md bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground/70">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] text-muted-foreground/40">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {project.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-400">
                        <Star className="h-3 w-3 fill-amber-400" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(project)}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="hidden xl:inline">Edit</span>
                      </button>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/50 transition-all hover:bg-foreground/[0.06] hover:text-foreground"
                        title="View"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => handleToggleFeatured(project.id, project.featured)}
                        disabled={loading === project.id}
                        className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground transition-all hover:bg-foreground/[0.06] hover:text-foreground disabled:opacity-40"
                        title={project.featured ? 'Unfeature' : 'Feature'}
                      >
                        {project.featured ? <StarOff className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                        <span className="hidden xl:inline">{project.featured ? 'Unfeature' : 'Feature'}</span>
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={loading === project.id}
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
            <FolderKanban className="mb-3 h-8 w-8 text-muted-foreground/20" />
            <p className="text-sm text-muted-foreground/60">No projects found</p>
          </div>
        )}
      </div>

      {/* Create/Edit Drawer */}
      <AdminFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingProject ? 'Edit Project' : 'New Project'}
        onSubmit={handleSubmit}
        loading={saving}
        submitLabel={editingProject ? 'Update Project' : 'Create Project'}
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
                  ...(!editingProject ? { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
                }))
              }}
              placeholder="My Awesome Project"
            />
          </FormField>
          <FormField label="Slug" required hint="URL-friendly identifier">
            <FormInput
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="my-awesome-project"
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
            placeholder="Detailed project description..."
            rows={5}
          />
        </FormField>

        <FormRow>
          <FormField label="Date">
            <FormInput
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              placeholder="2025"
            />
          </FormField>
          <FormField label="Role">
            <FormInput
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              placeholder="Lead Developer"
            />
          </FormField>
        </FormRow>

        <FormRow>
          <FormField label="Team Size">
            <FormInput
              type="number"
              value={form.teamSize}
              onChange={(e) => setForm((f) => ({ ...f, teamSize: e.target.value }))}
              placeholder="1"
            />
          </FormField>
          <div className="flex items-end pb-1">
            <FormCheckbox
              label="Featured"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: (e.target as HTMLInputElement).checked }))}
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

        <FormField label="Key Features" hint="Press Enter to add each feature">
          <FormTagInput
            value={form.keyFeatures}
            onChange={(keyFeatures) => setForm((f) => ({ ...f, keyFeatures }))}
            placeholder="Responsive design, Dark mode..."
          />
        </FormField>

        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pt-2">URLs</h3>
        <FormRow>
          <FormField label="Demo URL">
            <FormInput
              value={form.demoUrl}
              onChange={(e) => setForm((f) => ({ ...f, demoUrl: e.target.value }))}
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
          <FormField label="Support URL">
            <FormInput
              value={form.supportUrl}
              onChange={(e) => setForm((f) => ({ ...f, supportUrl: e.target.value }))}
              placeholder="https://support..."
            />
          </FormField>
        </FormRow>

        <FormField label="Challenges" hint="Press Enter to add each challenge">
          <FormTagInput
            value={form.challenges}
            onChange={(challenges) => setForm((f) => ({ ...f, challenges }))}
            placeholder="Performance optimization..."
          />
        </FormField>

        <FormField label="Solutions" hint="Press Enter to add each solution">
          <FormTagInput
            value={form.solutions}
            onChange={(solutions) => setForm((f) => ({ ...f, solutions }))}
            placeholder="Implemented caching..."
          />
        </FormField>
      </AdminFormDrawer>
    </div>
  )
}
