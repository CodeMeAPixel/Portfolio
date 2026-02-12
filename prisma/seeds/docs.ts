import type { PrismaClient } from '../../src/generated/prisma/client.js'

export async function seedDocs(prisma: PrismaClient) {
  await prisma.docSection.create({
    data: {
      slug: 'portfolio',
      name: 'Portfolio',
      description: 'Documentation for this portfolio website',
      icon: 'IoLayers',
      projectUrl: 'https://github.com/CodeMeAPixel/Portfolio',
      sortOrder: 0,
      categories: {
        create: [
          {
            title: 'Getting Started',
            sortOrder: 0,
            items: {
              create: [
                { title: 'Overview', slug: 'portfolio', description: "Learn about this portfolio's architecture and features.", icon: 'IoBook', sortOrder: 0 },
                { title: 'Installation', slug: 'portfolio/installation', description: 'Get the portfolio running locally on your machine.', icon: 'IoTerminal', sortOrder: 1 },
                { title: 'Configuration', slug: 'portfolio/configuration', description: 'Customize themes, content, and settings.', icon: 'IoExtensionPuzzle', sortOrder: 2 },
              ],
            },
          },
          {
            title: 'Features',
            sortOrder: 1,
            items: {
              create: [
                { title: 'Theme System', slug: 'portfolio/themes', description: '26 unique themes with custom color palettes.', icon: 'IoLayers', sortOrder: 0 },
                { title: 'Blog System', slug: 'portfolio/blog', description: 'MDX-powered blog with syntax highlighting.', icon: 'IoBook', sortOrder: 1 },
                { title: 'Components', slug: 'portfolio/components', description: 'Reusable UI components and glassmorphism effects.', icon: 'IoCube', sortOrder: 2 },
              ],
            },
          },
        ],
      },
    },
  })

  await prisma.docSection.create({
    data: {
      slug: 'fivem',
      name: 'FiveM Scripts',
      description: 'Documentation for FiveM/GTA V scripts',
      icon: 'IoGameController',
      sortOrder: 1,
      categories: {
        create: [
          {
            title: 'Getting Started',
            sortOrder: 0,
            items: {
              create: [
                { title: 'Overview', slug: 'fivem', description: 'Introduction to my FiveM script collection.', icon: 'IoBook', sortOrder: 0 },
                { title: 'Installation', slug: 'fivem/installation', description: 'How to install scripts on your FiveM server.', icon: 'IoTerminal', sortOrder: 1 },
              ],
            },
          },
          {
            title: 'Scripts',
            sortOrder: 1,
            items: {
              create: [
                { title: 'pxl-mdt', slug: 'fivem/pxl-mdt', description: 'Mobile Data Terminal for police/EMS roleplay.', icon: 'IoShield', sortOrder: 0 },
                { title: 'pxl-garage', slug: 'fivem/pxl-garage', description: 'Advanced vehicle garage system.', icon: 'IoCube', sortOrder: 1 },
                { title: 'pxl-hud', slug: 'fivem/pxl-hud', description: 'Customizable player HUD interface.', icon: 'IoSpeedometer', sortOrder: 2 },
              ],
            },
          },
        ],
      },
    },
  })

  await prisma.docSection.create({
    data: {
      slug: 'discord',
      name: 'Discord Bots',
      description: 'Documentation for Discord bot projects',
      icon: 'IoChatbubbles',
      sortOrder: 2,
      categories: {
        create: [
          {
            title: 'Overview',
            sortOrder: 0,
            items: {
              create: [
                { title: 'Introduction', slug: 'discord', description: 'Overview of my Discord bot projects.', icon: 'IoBook', sortOrder: 0 },
              ],
            },
          },
          {
            title: 'Bots',
            sortOrder: 1,
            items: {
              create: [
                { title: 'Pixel Bot', slug: 'discord/pixel-bot', description: 'Multi-purpose Discord bot with moderation features.', icon: 'IoCodeSlash', sortOrder: 0 },
                { title: 'Music Bot', slug: 'discord/music-bot', description: 'High-quality music streaming bot.', icon: 'IoRocket', sortOrder: 1 },
              ],
            },
          },
        ],
      },
    },
  })

  await prisma.docSection.create({
    data: {
      slug: 'web',
      name: 'Web Projects',
      description: 'Documentation for web applications',
      icon: 'IoGlobe',
      sortOrder: 3,
      categories: {
        create: [
          {
            title: 'Overview',
            sortOrder: 0,
            items: {
              create: [
                { title: 'Introduction', slug: 'web', description: 'Overview of my web development projects.', icon: 'IoBook', sortOrder: 0 },
              ],
            },
          },
          {
            title: 'Projects',
            sortOrder: 1,
            items: {
              create: [
                { title: 'API Services', slug: 'web/api-services', description: 'RESTful API documentation and examples.', icon: 'IoServer', sortOrder: 0 },
                { title: 'UI Libraries', slug: 'web/ui-libraries', description: 'Custom UI component libraries.', icon: 'IoCube', sortOrder: 1 },
              ],
            },
          },
        ],
      },
    },
  })

  console.log('  -> Docs seeded')
}
