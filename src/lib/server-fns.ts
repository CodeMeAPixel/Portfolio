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
          include: {
            items: {
              where: { parentId: null },
              include: { children: { orderBy: { sortOrder: 'asc' } } },
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
