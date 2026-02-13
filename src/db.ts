import { PrismaClient } from './generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  var __db: PrismaClient | undefined
}

/**
 * Lazy-initialise Prisma so the adapter is only created inside a request
 * context where process.env / Worker bindings are guaranteed to be available.
 */
function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Add it as a secret via the Cloudflare dashboard or `wrangler secret put DATABASE_URL`.',
    )
  }
  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

/** Proxy that defers PrismaClient creation until first property access. */
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    if (!globalThis.__db) {
      globalThis.__db = createClient()
    }
    return Reflect.get(globalThis.__db, prop, receiver)
  },
})
