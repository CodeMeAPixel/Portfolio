import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Mail, MapPin, Send, User, CheckCircle2, XCircle, ArrowRight,
  Sparkles, Github, MessageSquare,
} from 'lucide-react'
import { createMeta } from '~/lib/meta'

export const Route = createFileRoute('/_site/contact/')({
  head: () =>
    createMeta({
      title: 'Contact',
      description:
        'Have a question or want to work together? Get in touch with me.',
      path: '/contact',
    }),
  component: ContactPage,
})

function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    try {
      const subject = encodeURIComponent(formData.subject)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      window.location.href = `mailto:hey@codemeapixel.dev?subject=${subject}&body=${body}`
      setFormState('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className="space-y-16">
      {/* ═══ HERO ═══ */}
      <section className="relative">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-60 w-80 -translate-x-1/2 rounded-full blur-[120px] opacity-25 sm:h-100 sm:w-175 sm:blur-[160px]"
          style={{ background: 'linear-gradient(135deg, var(--glow), var(--glow-secondary))' }}
        />
        <div className="relative space-y-6 text-center">
          <div className="animate-fade-up">
            <span className="section-badge">
              <Sparkles className="h-3.5 w-3.5" />
              Let&apos;s Connect
            </span>
          </div>
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Get In{' '}
              <span className="relative inline-block">
                <span className="text-shine">Touch</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" />
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have a question or want to work together? Feel free to reach out using the form
              below or connect with me on social media.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Contact Info */}
        <div className="space-y-6 lg:col-span-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="glass-card relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'color-mix(in srgb, var(--primary) 20%, transparent)' }}
            />
            <div className="relative">
              <h2 className="mb-8 text-xl font-bold sm:text-2xl">Contact Information</h2>
              <ul className="space-y-6">
                <li className="group">
                  <a href="mailto:hey@codemeapixel.dev" className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <span className="text-sm text-primary transition-colors group-hover:text-primary/80">
                        hey@codemeapixel.dev
                      </span>
                    </div>
                  </a>
                </li>
                <li className="group flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Location</h3>
                    <p className="text-sm text-muted-foreground">In a Igloo in Canada</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      <span className="text-xs font-medium text-green-400">Available for remote work</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Social links */}
          <div className="glass-card relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="relative">
              <h2 className="mb-6 text-xl font-bold sm:text-2xl">Connect With Me</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Github, label: 'GitHub', href: 'https://github.com/codemeapixel' },
                  {
                    icon: () => (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                    label: 'Twitter',
                    href: 'https://twitter.com/codemeapixel',
                  },
                  {
                    icon: () => (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                    label: 'LinkedIn',
                    href: 'https://linkedin.com/in/codemeapixel',
                  },
                  {
                    icon: () => (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                      </svg>
                    ),
                    label: 'Discord',
                    href: 'https://discord.gg/2C2q8bbBuR',
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:border-primary/30 hover:scale-105 active:scale-95"
                  >
                    <s.icon className="h-4 w-4 text-primary" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card relative overflow-hidden rounded-2xl p-6 sm:p-8 md:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
            />

            <div className="relative">
              <h2 className="mb-8 text-xl font-bold sm:text-2xl">Send Me a Message</h2>

              {formState === 'success' ? (
                <div className="flex flex-col items-center py-12 text-center animate-fade-up">
                  <div
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
                    style={{ background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Message Sent!</h3>
                  <p className="mb-8 text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible!
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground transition-transform gradient-brand hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Another Message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              ) : formState === 'error' ? (
                <div className="flex flex-col items-center py-12 text-center animate-fade-up">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10">
                    <XCircle className="h-10 w-10 text-red-400" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">Something Went Wrong</h3>
                  <p className="mb-8 text-muted-foreground">
                    There was an error sending your message. Please try again or email me directly.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground transition-transform gradient-brand hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2.5 block text-sm font-semibold">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="glass w-full rounded-xl border-0 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2.5 block text-sm font-semibold">
                        Your Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="glass w-full rounded-xl border-0 py-3.5 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2.5 block text-sm font-semibold">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="glass w-full rounded-xl border-0 py-3.5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="How can I help you?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2.5 block text-sm font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="glass w-full resize-y rounded-xl border-0 py-3.5 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your message here..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-8 py-3.5 font-semibold text-primary-foreground transition-transform gradient-brand hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
