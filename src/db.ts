import { PrismaClient } from './generated/prisma/client.js'

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

declare global {
  var __db: PrismaClient | undefined
}

export const db = globalThis.__db || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__db = db
}
