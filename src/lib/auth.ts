import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { admin } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '@/db'

/* ─── Admin identifiers ─────────────────────────────── */
const ADMIN_EMAILS = [
  'hey@codemeapixel.dev',
  'toxic.dev09@gmail.com',
]
const ADMIN_DISCORD_ID = '510065483693817867'

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const isAdmin =
            ADMIN_EMAILS.includes(user.email.toLowerCase())
          if (isAdmin) {
            await db.user.update({
              where: { id: user.id },
              data: { role: 'ADMIN' },
            })
          }
        },
      },
    },
    account: {
      create: {
        after: async (account) => {
          // Promote to admin if Discord account matches owner ID
          if (
            account.providerId === 'discord' &&
            account.accountId === ADMIN_DISCORD_ID
          ) {
            await db.user.update({
              where: { id: account.userId },
              data: { role: 'ADMIN' },
            })
          }
        },
      },
    },
  },
  plugins: [
    tanstackStartCookies(),
    admin({
      defaultRole: 'MEMBER',
      adminRole: 'ADMIN',
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'MEMBER',
        input: false,
      },
    },
  },
})
