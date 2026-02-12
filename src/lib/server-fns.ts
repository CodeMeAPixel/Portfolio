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
    return db.project.findMany({ orderBy: { createdAt: 'desc' } })
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
    return db.product.findMany({ orderBy: { createdAt: 'desc' } })
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
      include: {
        categories: {
          include: { items: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    })
  },
)

export const getDocItemBySlug = createServerFn({ method: 'GET' })
  .inputValidator((data: { sectionSlug: string; itemSlug: string }) => data)
  .handler(async ({ data: { sectionSlug, itemSlug } }) => {
    const section = await db.docSection.findUnique({
      where: { slug: sectionSlug },
      include: {
        categories: {
          include: {
            items: {
              where: { slug: itemSlug },
            },
          },
        },
      },
    })
    if (!section) throw new Error('Doc section not found')
    const item = section.categories.flatMap((c) => c.items).find((i) => i.slug === itemSlug)
    if (!item) throw new Error('Doc item not found')
    return {
      ...item,
      sectionName: section.name,
      sectionSlug: section.slug,
      sectionDescription: section.description,
    }
  })
