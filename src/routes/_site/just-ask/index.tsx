import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Clock, CheckCircle2, XCircle, MessageSquare, Zap, Heart, Sparkles,
  Copy, Check,
} from 'lucide-react'
import { createMeta } from '~/lib/meta'

export const Route = createFileRoute('/_site/just-ask/')({
  head: () =>
    createMeta({
      title: 'Just Ask',
      description:
        "Skip the pleasantries. Respect my time, and I'll respect yours. Let's communicate efficiently.",
      path: '/just-ask',
    }),
  component: JustAskPage,
})

/* ─── Chat Bubble ─── */
interface ChatMessage {
  text: string
  time: string
  day?: string
}

function ChatBubble({
  messages,
  isRight = false,
  avatar,
  name,
  delay = 0,
}: {
  messages: ChatMessage[]
  isRight?: boolean
  avatar: string
  name: string
  delay?: number
}) {
  return (
    <div
      className={`flex gap-3 ${isRight ? 'flex-row-reverse' : ''} animate-fade-up`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-primary-foreground ${
          isRight ? 'gradient-brand' : 'bg-foreground/10'
        }`}
      >
        {avatar}
      </div>
      <div className={`flex max-w-70 flex-col gap-1.5 ${isRight ? 'items-end' : 'items-start'}`}>
        <span className={`px-1 text-xs text-muted-foreground ${isRight ? 'text-right' : ''}`}>{name}</span>
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            {msg.day && (
              <span className="px-2 py-1 text-center text-[10px] text-muted-foreground/60">{msg.day}</span>
            )}
            <div
              className={`rounded-2xl px-4 py-2.5 ${
                isRight
                  ? 'rounded-br-md gradient-brand text-primary-foreground'
                  : 'glass rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
            <span className={`px-2 text-[10px] text-muted-foreground/60 ${isRight ? 'text-right' : ''}`}>
              {msg.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Page ─── */
function JustAskPage() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://codemeapixel.dev/just-ask')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const keyPoints = [
    {
      icon: Zap,
      title: 'Include Context',
      description: "Put your question in the first message. Don't make me wait to find out what you need.",
    },
    {
      icon: Heart,
      title: 'Still Be Polite',
      description: "Being efficient doesn't mean being rude. A friendly tone is always welcome.",
    },
    {
      icon: Clock,
      title: 'Respect Time',
      description: 'Every unnecessary message adds delay. Context-switching has a real cost.',
    },
    {
      icon: Sparkles,
      title: 'Be Specific',
      description: 'The more details you provide upfront, the faster I can give you a helpful answer.',
    },
  ]

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
              <Zap className="h-3.5 w-3.5" />
              Communication Etiquette
            </span>
          </div>
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Just{' '}
              <span className="relative inline-block">
                <span className="text-shine">Ask</span>
                <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full gradient-brand" />
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Skip the pleasantries. Respect my time, and I&apos;ll respect yours.
              Let&apos;s communicate efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHY ═══ */}
      <section className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
            >
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">Why?</h2>
          </div>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Unnecessary pleasantries waste time in task-based conversations. When you message just
              &ldquo;Hello&rdquo; and wait for a response before asking your actual question, you&apos;re
              creating unnecessary back-and-forth that can stretch a simple exchange over hours or even days.
            </p>
            <p>
              If someone shared this link with you or you see it in my profile, it means
              <span className="font-medium text-primary"> I won&apos;t be offended</span> if you skip
              the pleasantries and get straight to the point. Do still be polite, and feel free to have
              social conversations when appropriate!
            </p>
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON ═══ */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Bad Example */}
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card relative overflow-hidden rounded-2xl border-destructive/20 p-6 md:p-8">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-red-500 to-orange-500" />
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold">The Painful Way</h3>
                <p className="text-xs text-muted-foreground">9 messages over 3 days</p>
              </div>
            </div>

            <div className="custom-scrollbar max-h-100 space-y-4 overflow-y-auto pr-2">
              <ChatBubble avatar="Y" name="You" isRight messages={[{ text: 'Hey', time: '14:30', day: 'Monday' }]} delay={0.1} />
              <ChatBubble avatar="C" name="CodeMeAPixel" messages={[{ text: 'Hi there!', time: '16:45' }]} delay={0.2} />
              <ChatBubble avatar="Y" name="You" isRight messages={[{ text: "How's it going?", time: '16:52' }]} delay={0.3} />
              <ChatBubble avatar="C" name="CodeMeAPixel" messages={[{ text: 'Good, you?', time: '17:30' }]} delay={0.4} />
              <ChatBubble avatar="Y" name="You" isRight messages={[{ text: 'Great! So I have a question about React...', time: '10:15', day: 'Tuesday' }]} delay={0.5} />
              <ChatBubble avatar="C" name="CodeMeAPixel" messages={[{ text: "Sure, what's up?", time: '15:08' }]} delay={0.6} />
              <ChatBubble avatar="Y" name="You" isRight messages={[{ text: 'How do I fix hydration errors in Next.js?', time: '15:22' }]} delay={0.7} />
              <ChatBubble avatar="C" name="CodeMeAPixel" messages={[{ text: 'Add suppressHydrationWarning to the html tag and use a mounted state for client-only code.', time: '11:30', day: 'Wednesday' }]} delay={0.8} />
              <ChatBubble avatar="Y" name="You" isRight messages={[{ text: 'That fixed it! Thanks!', time: '14:15' }]} delay={0.9} />
            </div>

            <div className="mt-6 border-t border-red-500/10 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total time wasted:</span>
                <span className="font-bold text-red-400">~3 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Good Example */}
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="glass-card relative overflow-hidden rounded-2xl border-emerald-500/20 p-6 md:p-8">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-green-500 to-emerald-500" />
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold">The Better Way</h3>
                <p className="text-xs text-muted-foreground">3 messages in 10 minutes</p>
              </div>
            </div>

            <div className="space-y-4">
              <ChatBubble
                avatar="Y"
                name="You"
                isRight
                messages={[{
                  text: "Hey! Quick question - I'm getting hydration errors in Next.js when using localStorage. The error says server/client mismatch. Any ideas?",
                  time: '14:30',
                  day: 'Monday',
                }]}
                delay={0.2}
              />
              <ChatBubble
                avatar="C"
                name="CodeMeAPixel"
                messages={[{
                  text: 'Hey! Classic issue. Add a mounted state, return null until mounted, then access localStorage in useEffect. Also add suppressHydrationWarning to your html tag.',
                  time: '14:42',
                }]}
                delay={0.4}
              />
              <ChatBubble
                avatar="Y"
                name="You"
                isRight
                messages={[{ text: 'Perfect, that fixed it! Appreciate the quick help', time: '14:55' }]}
                delay={0.6}
              />
            </div>

            <div className="mt-6 border-t border-green-500/10 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total time:</span>
                <span className="font-bold text-green-400">10 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ KEY POINTS ═══ */}
      <section className="animate-fade-up" style={{ animationDelay: '0.35s' }}>
        <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: 'color-mix(in srgb, var(--primary) 15%, transparent)' }}
            >
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">The Key Points</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {keyPoints.map((point, i) => (
              <div
                key={point.title}
                className="flex gap-4 animate-fade-up"
                style={{ animationDelay: `${0.4 + i * 0.08}s` }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
                >
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="animate-fade-up" style={{ animationDelay: '0.45s' }}>
        <div className="glass-card rounded-2xl p-6 text-center sm:p-8 md:p-10">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Share This Philosophy</h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            Feel free to share this page with others. Let&apos;s make async communication more
            efficient, together.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={handleCopyLink}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-4 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] gradient-brand"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Link
                </>
              )}
            </button>
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-4 font-semibold glass transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="h-5 w-5" />
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <p className="text-center text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.5s' }}>
        Inspired by{' '}
        <a
          href="https://nohello.club"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors hover:text-primary/80"
        >
          nohello.club
        </a>
      </p>
    </div>
  )
}
