import { createFileRoute } from '@tanstack/react-router'
import { Briefcase, GraduationCap, Mail, MapPin, Globe, Download, Code, Layers, ChevronRight, Github } from 'lucide-react'
import { createMeta } from '~/lib/meta'

const cv = {
  personal: {
    name: 'Tyler. H',
    title: 'Fullstack Developer',
    location: 'Canada',
    email: 'hey@codemeapixel.dev',
    website: 'https://codemeapixel.dev',
    github: 'https://github.com/CodeMeAPixel',
    summary:
      'Passionate fullstack developer with 10+ years of experience crafting exceptional digital experiences. Specializing in modern, responsive, and accessible web applications using cutting-edge technologies. Proven track record of leading development teams, managing complex projects, and delivering high-quality products.',
  },
  experience: [
    {
      title: 'System Administrator',
      company: 'Purrquinox Technologies',
      location: 'Remote',
      period: 'Present',
      description:
        'Manage and maintain IT infrastructure, ensuring system reliability and security. Handle network administration, server management, and user support.',
      highlights: [
        'Maintain 99.9% uptime across all managed systems',
        'Implement security protocols and best practices',
        'Provide technical support and documentation',
      ],
    },
    {
      title: 'Chief of Operations',
      company: 'NodeByte',
      location: 'Remote',
      period: '2024 - Present',
      description:
        'Lead the development team, contribute to daily operations, and ensure product quality. Mentor junior developers and oversee project delivery.',
      highlights: [
        'Lead a team of developers on multiple concurrent projects',
        'Implement agile development practices',
        'Mentor and guide junior team members',
      ],
    },
    {
      title: 'Chief Executive Officer',
      company: 'ByteBrush Studios',
      location: 'Remote',
      period: '2020 - Present',
      description:
        'Oversee strategic direction, manage client relationships, and ensure successful project delivery.',
      highlights: [
        'Founded and grew the company from the ground up',
        'Manage client relationships and project scoping',
        'Lead technical architecture decisions',
      ],
    },
    {
      title: 'Founder',
      company: 'Emberly',
      location: 'Remote',
      period: '2024 - Present',
      description:
        'Created Emberly, a modern file hosting platform with advanced features for developers and creators.',
      highlights: [
        'Built full-stack platform with Next.js and PostgreSQL',
        'Developed desktop companion app (Flicker) with Tauri',
        'Implemented secure authentication and file management',
      ],
    },
  ],
  certifications: [
    {
      title: 'Fullstack Development',
      issuer: 'Free Code Camp',
      period: '2020 - 2021',
      description:
        'Comprehensive curriculum covering HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
    },
    {
      title: 'Frontend Development',
      issuer: 'Free Code Camp',
      period: '2017 - 2018',
      description:
        'Curriculum covering HTML, CSS, JavaScript, and responsive design principles.',
    },
    {
      title: 'Backend Development',
      issuer: 'Free Code Camp',
      period: '2016 - 2017',
      description: 'Focused on Node.js, Express, and MongoDB. Developed RESTful APIs.',
    },
  ],
  skills: {
    frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'Bun', 'Elysia', 'Go', 'Python', 'REST APIs', 'GraphQL'],
    database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'MySQL'],
    devops: ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'Linux', 'Nginx'],
    tools: ['VS Code', 'Figma', 'Postman', 'Tauri', 'Rust'],
  },
}

const skillIcons: Record<string, any> = {
  frontend: Code,
  backend: Layers,
  database: Layers,
  devops: Globe,
  tools: Briefcase,
}

export const Route = createFileRoute('/_site/cv/')({
  head: () => createMeta({ title: 'Curriculum Vitae', description: 'My professional experience, skills, and education — Tyler H., Fullstack Developer.', path: '/cv' }),
  component: CVPage,
})

function CVPage() {
  return (
    <div className="space-y-16">
      {/* ═══ HERO HEADER ═══ */}
      <section className="relative">
        {/* Glow blob */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />

        {/* Floating dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-10 left-[8%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '0s' }} />
          <div className="animate-float absolute top-4 right-[12%] h-1.5 w-1.5 rounded-full opacity-15" style={{ background: 'var(--glow-secondary)', animationDelay: '-2s' }} />
          <div className="animate-float absolute bottom-0 left-[25%] h-2 w-2 rounded-full opacity-20" style={{ background: 'var(--glow)', animationDelay: '-3s' }} />
        </div>

        <div className="relative space-y-6">
          <div className="animate-fade-up">
            <span className="section-badge">
              <Briefcase className="h-3.5 w-3.5" />
              Resume
            </span>
          </div>

          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-shine">{cv.personal.name}</span>
            </h1>
            <p className="text-xl text-primary font-light sm:text-2xl">{cv.personal.title}</p>
          </div>

          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed animate-fade-up sm:text-lg" style={{ animationDelay: '0.15s' }}>
            {cv.personal.summary}
          </p>

          {/* Contact + CTA row */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> {cv.personal.location}
              </span>
              <a href={`mailto:${cv.personal.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4 text-primary" /> {cv.personal.email}
              </a>
              <a href={cv.personal.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Globe className="w-4 h-4 text-primary" /> codemeapixel.dev
              </a>
              <a href={cv.personal.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Github className="w-4 h-4 text-primary" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE TIMELINE ═══ */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 animate-fade-up">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
          >
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Experience</h2>
          <div className="ml-auto h-px flex-1 max-w-48 gradient-brand opacity-30" />
        </div>

        {/* Timeline */}
        <div className="relative ml-2 border-l-2 pl-5 space-y-6 sm:ml-4 sm:pl-8 sm:space-y-8" style={{ borderColor: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}>
          {cv.experience.map((job, i) => (
            <div
              key={job.title + job.company}
              className="relative group animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-6.75 top-1 flex h-3 w-3 items-center justify-center rounded-full sm:-left-9.25"
                style={{ background: 'var(--primary)' }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-background" />
              </div>

              <div className="glass-card rounded-2xl p-4 space-y-3 sm:p-6 sm:space-y-4 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-medium text-primary"
                      style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                    >
                      {job.period}
                    </span>
                    <span className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground glass">
                      {job.location}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>

                <ul className="space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 animate-fade-up">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
          >
            <Code className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Skills & Expertise</h2>
          <div className="ml-auto h-px flex-1 max-w-48 gradient-brand opacity-30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(cv.skills).map(([category, items], i) => {
            const Icon = skillIcons[category] || Code
            return (
              <div
                key={category}
                className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {/* Category header */}
                <div
                  className="flex items-center gap-3 p-5 pb-4"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--glow) 8%, transparent), color-mix(in srgb, var(--glow-secondary) 5%, transparent))`,
                  }}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="font-bold capitalize">{category}</h3>
                  <span className="ml-auto text-xs text-muted-foreground">{items.length}</span>
                </div>

                <div className="p-5 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span
                        key={s}
                        className="group/pill relative overflow-hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:-translate-y-0.5 glass"
                      >
                        <span className="relative z-10">{s}</span>
                        <span
                          className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover/pill:translate-x-0 opacity-10"
                          style={{ background: 'linear-gradient(90deg, transparent, var(--glow), transparent)' }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 animate-fade-up">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
          >
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Certifications</h2>
          <div className="ml-auto h-px flex-1 max-w-48 gradient-brand opacity-30" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cv.certifications.map((cert, i) => (
            <div
              key={cert.title}
              className="group glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Gradient accent */}
              <div
                className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
                style={{ background: 'linear-gradient(90deg, var(--glow), var(--glow-secondary))' }}
              />

              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold">{cert.title}</h3>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium text-primary"
                    style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                  >
                    {cert.period}
                  </span>
                </div>
                <p className="text-primary text-sm font-medium">{cert.issuer}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
