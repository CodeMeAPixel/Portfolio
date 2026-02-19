import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { auth } from './auth'
import { db } from '../db'

/* ─── Auth helper ────────────────────────────────────── */

async function requireAdmin() {
  const request = getRequest()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
  return session.user
}

async function requireAuth() {
  const request = getRequest()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session.user
}

/* ─── Admin: Stats ───────────────────────────────────── */

export const getAdminStats = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    const [users, projects, products, reviews, blogPosts, referrals, docs] =
      await Promise.all([
        db.user.count(),
        db.project.count(),
        db.product.count(),
        db.clientReview.count(),
        db.blogPost.count(),
        db.referral.count(),
        db.docItem.count(),
      ])
    return { users, projects, products, reviews, blogPosts, referrals, docs }
  },
)

/* ─── Admin: Users ───────────────────────────────────── */

export const getAdminUsers = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { accounts: { select: { providerId: true } } },
    })
  },
)

export const updateUserRole = createServerFn({ method: 'POST' })
  .inputValidator((data: { userId: string; role: 'ADMIN' | 'MEMBER' }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.user.update({
      where: { id: data.userId },
      data: { role: data.role },
    })
  })

export const toggleUserBan = createServerFn({ method: 'POST' })
  .inputValidator((data: { userId: string; banned: boolean; banReason?: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.user.update({
      where: { id: data.userId },
      data: {
        banned: data.banned,
        banReason: data.banned ? data.banReason || null : null,
      },
    })
  })

export const deleteUser = createServerFn({ method: 'POST' })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.user.delete({ where: { id: data.userId } })
  })

/* ─── Admin: Projects ────────────────────────────────── */

export const getAdminProjects = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.project.findMany({ orderBy: { createdAt: 'desc' } })
  },
)

export const deleteProject = createServerFn({ method: 'POST' })
  .inputValidator((data: { projectId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.project.delete({ where: { id: data.projectId } })
  })

export const toggleProjectFeatured = createServerFn({ method: 'POST' })
  .inputValidator((data: { projectId: string; featured: boolean }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.project.update({
      where: { id: data.projectId },
      data: { featured: data.featured },
    })
  })

export const createProject = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      slug: string
      title: string
      description: string
      longDescription?: string
      images?: string[]
      tags?: string[]
      featured?: boolean
      date?: string
      role?: string
      teamSize?: number
      demoUrl?: string
      githubUrl?: string
      docsUrl?: string
      supportUrl?: string
      challenges?: string[]
      solutions?: string[]
      keyFeatures?: string[]
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.project.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        longDescription: data.longDescription || null,
        images: data.images || [],
        tags: data.tags || [],
        featured: data.featured || false,
        date: data.date || null,
        role: data.role || null,
        teamSize: data.teamSize || null,
        demoUrl: data.demoUrl || null,
        githubUrl: data.githubUrl || null,
        docsUrl: data.docsUrl || null,
        supportUrl: data.supportUrl || null,
        challenges: data.challenges || [],
        solutions: data.solutions || [],
        keyFeatures: data.keyFeatures || [],
      },
    })
  })

export const updateProject = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      projectId: string
      slug?: string
      title?: string
      description?: string
      longDescription?: string
      images?: string[]
      tags?: string[]
      featured?: boolean
      date?: string
      role?: string
      teamSize?: number
      demoUrl?: string
      githubUrl?: string
      docsUrl?: string
      supportUrl?: string
      challenges?: string[]
      solutions?: string[]
      keyFeatures?: string[]
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { projectId, ...rest } = data
    // Filter out undefined values
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    return db.project.update({
      where: { id: projectId },
      data: updateData,
    })
  })

/* ─── Admin: Products ────────────────────────────────── */

export const getAdminProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.product.findMany({ orderBy: { createdAt: 'desc' } })
  },
)

export const deleteProduct = createServerFn({ method: 'POST' })
  .inputValidator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.product.delete({ where: { id: data.productId } })
  })

export const createProduct = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      slug: string
      title: string
      description: string
      longDescription?: string
      price?: number
      currency?: 'USD' | 'CAD' | 'EUR' | 'GBP'
      isFree?: boolean
      platforms: ('FiveM' | 'RedM')[]
      frameworks: ('Standalone' | 'QBCore' | 'QBox' | 'ESX')[]
      status?: 'Released' | 'InDevelopment' | 'ComingSoon' | 'Deprecated' | 'Archived'
      version?: string
      banner?: string
      previewImages?: string[]
      images?: string[]
      video?: string
      tags?: string[]
      features?: string[]
      purchaseUrl?: string
      githubUrl?: string
      docsUrl?: string
      discordUrl?: string
      demoUrl?: string
      requirements?: string[]
      language?: string
      license?: string
      deprecated?: boolean
      deprecationMessage?: string
      successorUrl?: string
      migrationGuide?: { successor?: string; steps?: string[]; successorFeatures?: string[] }
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.product.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        longDescription: data.longDescription || null,
        price: data.price || null,
        currency: data.currency || 'USD',
        isFree: data.isFree ?? true,
        platforms: data.platforms || [],
        frameworks: data.frameworks || [],
        status: data.status || 'Released',
        version: data.version || '1.0.0',
        banner: data.banner || null,
        previewImages: data.previewImages || [],
        images: data.images || [],
        video: data.video || null,
        tags: data.tags || [],
        features: data.features || [],
        purchaseUrl: data.purchaseUrl || null,
        githubUrl: data.githubUrl || null,
        docsUrl: data.docsUrl || null,
        discordUrl: data.discordUrl || null,
        demoUrl: data.demoUrl || null,
        requirements: data.requirements || [],
        language: data.language || null,
        license: data.license || null,
        deprecated: data.deprecated ?? false,
        deprecationMessage: data.deprecationMessage || null,
        successorUrl: data.successorUrl || null,
        migrationGuide: data.migrationGuide || null,
      },
    })
  })

export const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      productId: string
      slug?: string
      title?: string
      description?: string
      longDescription?: string
      price?: number
      currency?: 'USD' | 'CAD' | 'EUR' | 'GBP'
      isFree?: boolean
      platforms?: ('FiveM' | 'RedM')[]
      frameworks?: ('Standalone' | 'QBCore' | 'QBox' | 'ESX')[]
      status?: 'Released' | 'InDevelopment' | 'ComingSoon' | 'Deprecated' | 'Archived'
      version?: string
      banner?: string
      previewImages?: string[]
      images?: string[]
      video?: string
      tags?: string[]
      features?: string[]
      purchaseUrl?: string
      githubUrl?: string
      docsUrl?: string
      discordUrl?: string
      demoUrl?: string
      requirements?: string[]
      language?: string
      license?: string
      deprecated?: boolean
      deprecationMessage?: string
      successorUrl?: string
      migrationGuide?: { successor?: string; steps?: string[]; successorFeatures?: string[] }
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { productId, ...rest } = data
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    return db.product.update({
      where: { id: productId },
      data: updateData,
    })
  })

/* ─── Admin: Reviews ─────────────────────────────────── */

export const getAdminReviews = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.clientReview.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { comments: true } } },
    })
  },
)

export const deleteReview = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.clientReview.delete({ where: { id: data.reviewId } })
  })

export const toggleReviewFeatured = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string; featured: boolean }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.clientReview.update({
      where: { id: data.reviewId },
      data: { featured: data.featured },
    })
  })

export const approveReview = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.clientReview.update({
      where: { id: data.reviewId },
      data: { status: 'APPROVED', denialReason: null },
    })
  })

export const denyReview = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string; reason?: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.clientReview.update({
      where: { id: data.reviewId },
      data: { status: 'DENIED', denialReason: data.reason || null },
    })
  })

export const requestReviewChanges = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string; comment: string }) => data)
  .handler(async ({ data }) => {
    const admin = await requireAdmin()
    await db.$transaction([
      db.clientReview.update({
        where: { id: data.reviewId },
        data: { status: 'CHANGES_REQUESTED' },
      }),
      db.reviewComment.create({
        data: {
          content: data.comment,
          authorId: admin.id,
          authorName: admin.name,
          authorRole: 'ADMIN',
          reviewId: data.reviewId,
        },
      }),
    ])
    return { success: true }
  })

export const getReviewComments = createServerFn({ method: 'GET' })
  .inputValidator((data: { reviewId: string }) => data)
  .handler(async ({ data }) => {
    // Both admin and authenticated users can view comments for their reviews
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) throw new Error('Unauthorized')

    const review = await db.clientReview.findUnique({ where: { id: data.reviewId } })
    if (!review) throw new Error('Review not found')

    const isAdmin = (session.user as any).role === 'ADMIN'
    if (!isAdmin && review.userId !== session.user.id) throw new Error('Unauthorized')

    return db.reviewComment.findMany({
      where: { reviewId: data.reviewId },
      orderBy: { createdAt: 'asc' },
    })
  })

export const addReviewComment = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string; content: string }) => data)
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) throw new Error('Unauthorized')

    const review = await db.clientReview.findUnique({ where: { id: data.reviewId } })
    if (!review) throw new Error('Review not found')

    const isAdmin = (session.user as any).role === 'ADMIN'
    if (!isAdmin && review.userId !== session.user.id) throw new Error('Unauthorized')

    return db.reviewComment.create({
      data: {
        content: data.content,
        authorId: session.user.id,
        authorName: session.user.name,
        authorRole: isAdmin ? 'ADMIN' : 'USER',
        reviewId: data.reviewId,
      },
    })
  })

/* ─── Admin: Blog Posts ──────────────────────────────── */

export const getAdminBlogPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  },
)

export const deleteBlogPost = createServerFn({ method: 'POST' })
  .inputValidator((data: { postId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.blogPost.delete({ where: { id: data.postId } })
  })

export const toggleBlogPostPublished = createServerFn({ method: 'POST' })
  .inputValidator((data: { postId: string; published: boolean }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.blogPost.update({
      where: { id: data.postId },
      data: { published: data.published },
    })
  })

export const createBlogPost = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      slug: string
      title: string
      description?: string
      content: string
      image?: string
      author?: string
      tags?: string[]
      categories?: string[]
      featured?: boolean
      published?: boolean
      readingTime?: string
      publishedAt?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.blogPost.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description || null,
        content: data.content,
        image: data.image || null,
        author: data.author || 'Tyler. H',
        tags: data.tags || [],
        categories: data.categories || [],
        featured: data.featured || false,
        published: data.published || false,
        readingTime: data.readingTime || null,
        publishedAt: data.published ? new Date() : null,
      },
    })
  })

export const updateBlogPost = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      postId: string
      slug?: string
      title?: string
      description?: string
      content?: string
      image?: string
      author?: string
      tags?: string[]
      categories?: string[]
      featured?: boolean
      published?: boolean
      readingTime?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { postId, ...rest } = data
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    // Auto-set publishedAt when publishing
    if (rest.published === true) {
      const existing = await db.blogPost.findUnique({ where: { id: postId } })
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = new Date()
      }
    }
    return db.blogPost.update({
      where: { id: postId },
      data: updateData,
    })
  })

export const getAdminBlogPost = createServerFn({ method: 'GET' })
  .inputValidator((data: { postId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.blogPost.findUnique({ where: { id: data.postId } })
  })

export const getAdminProject = createServerFn({ method: 'GET' })
  .inputValidator((data: { projectId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.project.findUnique({ where: { id: data.projectId } })
  })

export const getAdminProduct = createServerFn({ method: 'GET' })
  .inputValidator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.product.findUnique({ where: { id: data.productId } })
  })

/* ─── Admin: Referrals ───────────────────────────────── */

export const getAdminReferrals = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.referral.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { id: true, name: true, slug: true } } },
    })
  },
)

export const getAdminReferralCategories = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.referralCategory.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { referrals: true } } },
    })
  },
)

export const createReferral = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      title: string
      description: string
      company: string
      bannerImage?: string
      color?: string
      url: string
      code?: string
      discount?: string
      benefits?: string[]
      featured?: boolean
      isNew?: boolean
      expiryDate?: string
      categoryId: string
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.referral.create({
      data: {
        title: data.title,
        description: data.description,
        company: data.company,
        bannerImage: data.bannerImage || null,
        color: data.color || null,
        url: data.url,
        code: data.code || null,
        discount: data.discount || null,
        benefits: data.benefits || [],
        featured: data.featured || false,
        isNew: data.isNew || false,
        expiryDate: data.expiryDate || null,
        categoryId: data.categoryId,
      },
    })
  })

export const updateReferral = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      referralId: string
      title?: string
      description?: string
      company?: string
      bannerImage?: string
      color?: string
      url?: string
      code?: string
      discount?: string
      benefits?: string[]
      featured?: boolean
      isNew?: boolean
      expiryDate?: string
      categoryId?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { referralId, ...rest } = data
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    return db.referral.update({
      where: { id: referralId },
      data: updateData,
    })
  })

export const deleteReferral = createServerFn({ method: 'POST' })
  .inputValidator((data: { referralId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.referral.delete({ where: { id: data.referralId } })
  })

export const createReferralCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      slug: string
      name: string
      description?: string
      icon?: string
      color?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.referralCategory.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description || null,
        icon: data.icon || null,
        color: data.color || null,
      },
    })
  })

export const deleteReferralCategory = createServerFn({ method: 'POST' })
  .inputValidator((data: { categoryId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.referralCategory.delete({ where: { id: data.categoryId } })
  })

/* ─── Admin: Docs ────────────────────────────────────── */

export const getAdminDocSections = createServerFn({ method: 'GET' }).handler(
  async () => {
    await requireAdmin()
    return db.docSection.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        categories: {
          orderBy: { sortOrder: 'asc' },
          include: {
            items: {
              where: { parentId: null },
              orderBy: { sortOrder: 'asc' },
              include: {
                children: { orderBy: { sortOrder: 'asc' } },
              },
            },
            _count: { select: { items: true } },
          },
        },
      },
    })
  },
)

export const createDocSection = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      slug: string
      name: string
      description: string
      icon: string
      sortOrder?: number
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.docSection.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        icon: data.icon,
        sortOrder: data.sortOrder || 0,
      },
    })
  })

export const updateDocSection = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      sectionId: string
      slug?: string
      name?: string
      description?: string
      icon?: string
      sortOrder?: number
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { sectionId, ...rest } = data
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    return db.docSection.update({
      where: { id: sectionId },
      data: updateData,
    })
  })

export const deleteDocSection = createServerFn({ method: 'POST' })
  .inputValidator((data: { sectionId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.docSection.delete({ where: { id: data.sectionId } })
  })

export const createDocCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      title: string
      slug: string
      sectionId: string
      sortOrder?: number
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.docCategory.create({
      data: {
        title: data.title,
        slug: data.slug,
        sectionId: data.sectionId,
        sortOrder: data.sortOrder || 0,
      },
    })
  })

export const updateDocCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      categoryId: string
      title?: string
      slug?: string
      sortOrder?: number
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { categoryId, ...rest } = data
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    return db.docCategory.update({
      where: { id: categoryId },
      data: updateData,
    })
  })

export const deleteDocCategory = createServerFn({ method: 'POST' })
  .inputValidator((data: { categoryId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.docCategory.delete({ where: { id: data.categoryId } })
  })

export const createDocItem = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      title: string
      slug: string
      description: string
      icon?: string
      content?: string
      projectUrl?: string
      keywords?: string[]
      sortOrder?: number
      categoryId: string
      parentId?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.docItem.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        icon: data.icon || null,
        content: data.content || null,
        projectUrl: data.projectUrl || null,
        keywords: data.keywords || [],
        sortOrder: data.sortOrder || 0,
        categoryId: data.categoryId,
        parentId: data.parentId || null,
      },
    })
  })

export const updateDocItem = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      itemId: string
      title?: string
      slug?: string
      description?: string
      icon?: string
      content?: string
      projectUrl?: string
      keywords?: string[]
      sortOrder?: number
      parentId?: string | null
    }) => data,
  )
  .handler(async ({ data }) => {
    await requireAdmin()
    const { itemId, ...rest } = data
    const updateData: Record<string, any> = {}
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) updateData[key] = value
    }
    return db.docItem.update({
      where: { id: itemId },
      data: updateData,
    })
  })

export const deleteDocItem = createServerFn({ method: 'POST' })
  .inputValidator((data: { itemId: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()
    return db.docItem.delete({ where: { id: data.itemId } })
  })

/* ─── User: Session check ────────────────────────────── */

export const getServerSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    return session
  },
)

/* ─── User: Reviews ──────────────────────────────────── */

export const getUserReviews = createServerFn({ method: 'GET' }).handler(
  async () => {
    const user = await requireAuth()
    return db.clientReview.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { comments: true } } },
    })
  },
)

export const submitReview = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      rating: number
      review: string
      projectName?: string
      company?: string
      position?: string
      workDone?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    const user = await requireAuth()
    return db.clientReview.create({
      data: {
        name: user.name,
        avatar: (user as any).image || null,
        rating: Math.min(5, Math.max(1, data.rating)),
        review: data.review,
        projectName: data.projectName || null,
        company: data.company || null,
        position: data.position || null,
        workDone: data.workDone || null,
        userId: user.id,
      },
    })
  })

export const deleteOwnReview = createServerFn({ method: 'POST' })
  .inputValidator((data: { reviewId: string }) => data)
  .handler(async ({ data }) => {
    const user = await requireAuth()
    const review = await db.clientReview.findUnique({
      where: { id: data.reviewId },
    })
    if (!review || review.userId !== user.id) {
      throw new Error('Review not found or not yours')
    }
    return db.clientReview.delete({ where: { id: data.reviewId } })
  })
