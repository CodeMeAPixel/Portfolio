import { PrismaClient } from './generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  var __db: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Make sure your .env file has DATABASE_URL defined.',
    )
  }
  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

function getOrCreateClient(): PrismaClient {
  if (!globalThis.__db) {
    globalThis.__db = createClient()
    // Warm the connection pool in the background so the first real request
    // doesn't pay cold-start TCP handshake latency.
    globalThis.__db.$connect().catch(() => {})
  }
  return globalThis.__db
}

export const db: PrismaClient = getOrCreateClient()
