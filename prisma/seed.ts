import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

import { seedProjects } from './seeds/projects.js'
import { seedProducts } from './seeds/products.js'
import { seedBlogPosts } from './seeds/blog.js'
import { seedReferrals } from './seeds/referrals.js'
import { seedReviews } from './seeds/reviews.js'
import { seedDocs } from './seeds/docs.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Cleaning database...')
  await prisma.docItem.deleteMany()
  await prisma.docCategory.deleteMany()
  await prisma.docSection.deleteMany()
  await prisma.referral.deleteMany()
  await prisma.referralCategory.deleteMany()
  await prisma.clientReview.deleteMany()
  await prisma.product.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.projectTestimonial.deleteMany()
  await prisma.project.deleteMany()

  console.log('Seeding...')
  await seedProjects(prisma)
  await seedProducts(prisma)
  await seedBlogPosts(prisma)
  await seedReferrals(prisma)
  await seedReviews(prisma)
  await seedDocs(prisma)

  console.log('Seed complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
