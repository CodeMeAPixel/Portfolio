import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Code2, ExternalLink, Star, ArrowRight, Mail, MapPin, Briefcase, Layers, Code } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { getFeaturedProjects } from '~/lib/server-fns'
import { DiscordPresence } from '~/components/DiscordPresence'
import { createMeta } from '~/lib/meta'

const featuredProjectsQueryOptions = {
  queryKey: ['projects', 'featured'],
  queryFn: () => getFeaturedProjects(),
}

export const Route = createFileRoute('/_site/')({
  head: () => createMeta({ title: 'CodeMeAPixel | Fullstack Developer', rawTitle: true, path: '/' }),
  component: Home,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(featuredProjectsQueryOptions)
  },
})

/* ─── Rotating titles ───────────────────────────────── */
const titles = [
  'Fullstack Developer',
  'Graphics Designer',
  'Full Time Father',
  'Ice Cold Canadian',
  'Open Source Advocate',
  'Coffee to Code Converter',
  'Bug Whisperer',
  'Pixel Perfectionist',
  'TypeScript Enthusiast',
  'Professional Googler',
  'CEO of ByteBrush Studios',
  'Ctrl+Z Specialist',
  'Sleep Deprived Coder',
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS',
  'PostgreSQL', 'Prisma', 'Lua', 'TanStack', 'Cloudflare',
]

const stats = [
  { label: 'Years Experience', value: '10+', icon: Briefcase, delay: '0.1s' },
  { label: 'Projects Completed', value: '50+', icon: Layers, delay: '0.2s' },
  { label: 'Technologies', value: '20+', icon: Code, delay: '0.3s' },
]

/* ─── Typing Effect Hook ────────────────────────────── */
function useRotatingTitle(items: string[], intervalMs = 3000) {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setFading(false)
      }, 300)
    }, intervalMs)
    return () => clearInterval(id)
  }, [items.length, intervalMs])

  return { text: items[index], fading }
}

/* ─── Scroll Indicator ──────────────────────────────── */
function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 150)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollDown = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={scrollDown}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-opacity hover:text-foreground"
      aria-label="Scroll down"
    >
      <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-current p-1">
        <div className="h-2 w-1 rounded-full bg-current animate-fade-up" />
      </div>
    </button>
  )
}

/* ─── Home ──────────────────────────────────────────── */
function Home() {
  const { data: projects } = useSuspenseQuery(featuredProjectsQueryOptions)
  const { text: rotatingTitle, fading } = useRotatingTitle(titles)

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32">
      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex flex-col justify-center sm:min-h-[85vh]">
        {/* Extra hero glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-75 w-100 -translate-x-1/2 rounded-full blur-[180px] opacity-30 sm:h-125 sm:w-200"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />

        {/* Floating decorative dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-20 left-[10%] h-2 w-2 rounded-full opacity-20" style={{ background: "var(--glow)", animationDelay: "0s" }} />
          <div className="animate-float absolute top-40 right-[15%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: "var(--glow-secondary)", animationDelay: "-2s" }} />
          <div className="animate-float absolute bottom-32 left-[20%] h-2.5 w-2.5 rounded-full opacity-20" style={{ background: "var(--glow)", animationDelay: "-4s" }} />
          <div className="animate-float absolute bottom-20 right-[25%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: "var(--glow-secondary)", animationDelay: "-1s" }} />
        </div>

        <div className="relative space-y-8">
          {/* Status badge */}
          <div className="animate-fade-up">
            <span className="section-badge">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available for work
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="text-shine">Tyler</span>
                <span
                  className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand animate-fade-up"
                  style={{ animationDelay: '0.8s' }}
                />
              </span>
            </h1>

            {/* Rotating subtitle */}
            <div className="h-10 flex items-center">
              <p
                className={`text-xl font-light text-primary md:text-2xl transition-all duration-300 ${
                  fading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                {rotatingTitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p
            className="max-w-xl text-base leading-relaxed text-muted-foreground animate-fade-up md:text-lg"
            style={{ animationDelay: '0.2s' }}
          >
            Building modern web applications, FiveM scripts, and open-source tools.
            Passionate about{' '}
            <span className="text-foreground font-medium">clean code</span>,{" "}
            <span className="text-foreground font-medium">performance</span>, and{" "}
            <span className="text-foreground font-medium">great user experiences</span>.
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {techStack.map((tech, i) => (
              <span
                key={tech}
                className="group relative overflow-hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground glass"
                style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              >
                <span className="relative z-10">{tech}</span>
                <span
                  className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0 opacity-10"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--glow), transparent)' }}
                />
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground transition-all gradient-brand hover:glow-strong hover:scale-[1.02] active:scale-[0.98]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/codemeapixel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
            <Link
              to="/cv"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium glass transition-all hover:border-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Resume
            </Link>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ═══ ABOUT ══════════════════════════════════════ */}
      <section id="about" className="space-y-12 scroll-mt-24">
        <div className="space-y-3">
          <span className="section-badge">About</span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Who I Am</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          {/* Profile card */}
          <div className="mx-auto max-w-xs sm:max-w-sm md:col-span-2 md:mx-0 md:max-w-none">
            <div className="group relative overflow-hidden rounded-2xl gradient-border">
              <div
                className="aspect-square w-full overflow-hidden rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, var(--glow) 25%, transparent), color-mix(in srgb, var(--glow-secondary) 15%, transparent))`,
                }}
              >
                <img
                  src="/character.png"
                  alt="Tyler H."
                  width={2048}
                  height={2048}
                  className="h-full w-full object-cover"
                  style={{ minHeight: '100%', minWidth: '100%' }}
                />
              </div>
              {/* Shine sweep on hover */}
              <div
                className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--glow-secondary) 15%, transparent), transparent)' }}
              />
              {/* Floating badges */}
              <div
                className="absolute top-3 left-3 animate-fade-up"
                style={{ animationDelay: '0.5s' }}
              >
                <span className="glass-strong rounded-lg px-2.5 py-1 text-[11px] font-semibold text-foreground">
                  10+ Years Exp.
                </span>
              </div>
              <div
                className="absolute right-3 bottom-3 animate-fade-up"
                style={{ animationDelay: '0.6s' }}
              >
                <span className="glass-strong inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-green-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Bio + stats */}
          <div className="space-y-6 md:col-span-3">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hey, I'm <span className='font-semibold text-foreground'>Tyler</span> a fullstack developer based in{' '}
                <span className="font-semibold text-foreground">Canada</span>. I've been building things
                on the web for over a decade, from SaaS platforms and Discord bots to FiveM game servers
                and open source libraries.
              </p>
              <p>
                My stack revolves around <span className="text-primary">React</span>,{" "}
                <span className="text-primary">TypeScript</span>, and{" "}
                <span className="text-primary">Node.js</span>, but I'm
                always exploring new tech. Currently deep into TanStack Start, Cloudflare Workers, and edge computing.
              </p>
              <p>
                When I'm not coding, I'm probably spending time with my family, drinking an unreasonable
                amount of coffee, or tinkering with my homelab.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group glass-card rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: stat.delay }}
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                  <p className="text-lg font-bold text-foreground sm:text-2xl">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground sm:text-[11px]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Location + email */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Canada
              </span>
              <a href="mailto:hey@codemeapixel.dev" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                <Mail className="h-3.5 w-3.5 text-primary" />
                hey@codemeapixel.dev
              </a>
            </div>

            {/* Discord Presence */}
            <DiscordPresence />
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PROJECTS ══════════════════════════ */}
      <section className="space-y-8">
        <div className="space-y-3">
          <span className="section-badge">Work</span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Projects</h2>
          <p className="text-muted-foreground">A selection of things I've built recently.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects?.slice(0, 4).map((project: any) => (
            <Link
              key={project.id}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group glass-card overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Visual header */}
              <div className="relative aspect-2/1 overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, color-mix(in srgb, var(--glow) 15%, transparent), color-mix(in srgb, var(--glow-secondary) 10%, transparent))`,
                      }}
                    />
                    <Code2 className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-foreground/10 transition-all group-hover:text-primary/30 group-hover:scale-110" />
                  </>
                )}
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-base transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Star className="h-4 w-4 shrink-0 fill-primary text-primary" />
                  )}
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags?.slice(0, 4).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-md px-2 py-0.5 text-[11px] font-medium text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
        >
          View All Projects
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* ═══ CONTACT ════════════════════════════════════ */}
      <section className="space-y-8">
        <div className="space-y-3">
          <span className="section-badge">Connect</span>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Get in Touch</h2>
          <p className="max-w-lg text-muted-foreground">
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="mailto:hey@codemeapixel.dev"
            className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-brand">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-foreground transition-colors group-hover:text-primary">Email</p>
              <p className="text-sm text-muted-foreground">hey@codemeapixel.dev</p>
            </div>
          </a>

          <a
            href="https://discord.gg/2C2q8bbBuR"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#5865F2]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground transition-colors group-hover:text-primary">Discord</p>
              <p className="text-sm text-muted-foreground">Join the server</p>
            </div>
          </a>

          <a
            href="https://github.com/codemeapixel"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#333]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground transition-colors group-hover:text-primary">GitHub</p>
              <p className="text-sm text-muted-foreground">Check out my repos</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}
