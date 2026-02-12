const SITE_URL = 'https://codemeapixel.dev'
const SITE_NAME = 'CodeMeAPixel'
const DEFAULT_DESCRIPTION =
  'Portfolio of Tyler H. — Fullstack Developer based in Canada. Building modern web applications, FiveM scripts, and open-source tools.'
const OG_IMAGE = `${SITE_URL}/banner-twitter.png`

interface MetaOptions {
  title: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
  author?: string
  rawTitle?: boolean
}

/**
 * Generate a `head()` return value for a TanStack Start route.
 *
 * Usage in a route:
 * ```ts
 * head: () => createMeta({ title: 'Projects', path: '/projects' })
 * ```
 *
 * For dynamic routes:
 * ```ts
 * head: ({ loaderData }) => createMeta({
 *   title: loaderData.title,
 *   description: loaderData.description,
 *   path: `/projects/${loaderData.slug}`,
 *   image: loaderData.images?.[0],
 * })
 * ```
 */
export function createMeta(options: MetaOptions) {
  const {
    title: rawPageTitle,
    description = DEFAULT_DESCRIPTION,
    path = '/',
    image = OG_IMAGE,
    type = 'website',
    publishedTime,
    tags,
    author,
    rawTitle = false,
  } = options

  const title = rawTitle ? rawPageTitle : `${rawPageTitle} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  const meta: Array<Record<string, string>> = [
    { title },
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: imageUrl },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:url', content: url },
    { name: 'twitter:site', content: '@CodeMeAPixel' },
    { name: 'twitter:creator', content: '@CodeMeAPixel' },
  ]

  if (type === 'article') {
    if (publishedTime) {
      meta.push({ property: 'article:published_time', content: publishedTime })
    }
    if (author) {
      meta.push({ property: 'article:author', content: author })
    }
    if (tags?.length) {
      tags.forEach((tag) => {
        meta.push({ property: 'article:tag', content: tag })
      })
    }
  }

  return {
    meta,
    links: [{ rel: 'canonical', href: url }],
  }
}
