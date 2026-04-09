import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'

// ── Projects ──────────────────────────────────────────────

export const getFeaturedProjects = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.project.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { createdAt: 'desc' },
    })
  },
)

export const getAllProjects = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.project.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  },
)

export const getProjectBySlug = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const project = await db.project.findUnique({
      where: { slug: data.slug },
      include: { testimonials: true },
    })
    if (!project) throw new Error('Project not found')
    return project
  })

// ── Products / Shop ───────────────────────────────────────

export const getAllProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.product.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  },
)

export const getProductBySlug = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const product = await db.product.findUnique({
      where: { slug: data.slug },
    })
    if (!product) throw new Error('Product not found')
    return product
  })

// ── Blog ──────────────────────────────────────────────────

export const getAllBlogPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 200,
    })
  },
)

export const getBlogPostBySlug = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data: { slug } }) => {
    return db.blogPost.findUnique({ where: { slug } })
  })

// ── Reviews ───────────────────────────────────────────────

export const getAllReviews = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.clientReview.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 200,
    })
  },
)

// ── Referrals ─────────────────────────────────────────────

export const getReferralCategories = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.referralCategory.findMany({
      include: { referrals: true },
      orderBy: { name: 'asc' },
    })
  },
)

// ── Docs ──────────────────────────────────────────────────

export const getDocSections = createServerFn({ method: 'GET' }).handler(
  async () => {
    return db.docSection.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        icon: true,
        createdAt: true,
        categories: {
          select: {
            id: true,
            title: true,
            slug: true,
            icon: true,
            sortOrder: true,
            items: {
              where: { parentId: null },
              select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                keywords: true,
                sortOrder: true,
                createdAt: true,
              },
              orderBy: { sortOrder: 'asc' },
            },
          },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    })
  },
)

export const getDocItemBySlug = createServerFn({ method: 'GET' })
  .inputValidator((data: { sectionSlug: string; categorySlug: string; itemSlug: string; subSlug?: string }) => data)
  .handler(async ({ data: { sectionSlug, categorySlug, itemSlug, subSlug } }) => {
    const section = await db.docSection.findUnique({
      where: { slug: sectionSlug },
      include: {
        categories: {
          where: { slug: categorySlug },
          include: {
            items: {
              where: { slug: itemSlug, parentId: null },
              include: {
                children: { orderBy: { sortOrder: 'asc' } },
              },
            },
          },
        },
      },
    })
    if (!section) throw new Error('Doc section not found')
    const category = section.categories[0]
    if (!category) throw new Error('Doc category not found')
    const parentItem = category.items[0]
    if (!parentItem) throw new Error('Doc item not found')

    // If requesting a sub-page, find it among children
    if (subSlug) {
      const child = parentItem.children.find((c) => c.slug === subSlug)
      if (!child) throw new Error('Doc sub-item not found')
      return {
        ...child,
        sectionName: section.name,
        sectionSlug: section.slug,
        sectionDescription: section.description,
        categoryName: category.title,
        categorySlug: category.slug,
        parentName: parentItem.title,
        parentSlug: parentItem.slug,
        siblings: parentItem.children.map((c) => ({ slug: c.slug, title: c.title, sortOrder: c.sortOrder })),
      }
    }

    // Return the parent item with its children list
    return {
      ...parentItem,
      sectionName: section.name,
      sectionSlug: section.slug,
      sectionDescription: section.description,
      categoryName: category.title,
      categorySlug: category.slug,
      parentName: null,
      parentSlug: null,
      siblings: [],
    }
  })

// ── Discord / Lanyard ─────────────────────────────────────

const LANYARD_DISCORD_ID = '510065483693817867'

export const getLanyardPresence = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_DISCORD_ID}`)
    if (!res.ok) return null
    const json = await res.json()
    return json.success ? (json.data as LanyardData) : null
  } catch {
    return null
  }
})

/** Shared query options — used by the home loader (server prefetch) and DiscordPresence (client polling). */
export const lanyardQueryOptions = {
  queryKey: ['lanyard'] as const,
  queryFn: () => getLanyardPresence(),
  staleTime: 0,
  refetchInterval: 30_000,
  retry: false,
} as const

// Minimal type re-exported so DiscordPresence can import from one place.
export interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string
    discriminator: string
    global_name?: string
  }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Array<{
    name: string
    type: number
    state?: string
    details?: string
    timestamps?: { start?: number; end?: number }
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
    application_id?: string
  }>
  listening_to_spotify: boolean
  spotify?: {
    song: string
    artist: string
    album: string
    album_art_url: string
    timestamps: { start: number; end: number }
    track_id: string
  }
}
