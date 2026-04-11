import { Project } from "../../../types/project";

const project: Project = {
    id: "emberly",
    title: "Emberly",
    description: "File sharing, evolved into a developer ecosystem.",
    longDescription: `
# Emberly

As the **Founder and Lead Developer** of Emberly, I built this platform from the ground up starting with a problem I faced personally: existing file sharing solutions were too complex, too expensive, or didn't respect user privacy. Emberly was my answer to that. What I didn't expect was where it would grow.

## The Journey

Emberly launched in late 2025 as a **developer-focused file sharing platform**. v1.0 delivered secure file hosting, paste collaboration, rich social embeds, and a complete billing system. What started as "just file sharing" expanded quickly  and in **April 2026, v2.0 shipped Nexium**: a full talent discovery and opportunity platform layered directly on top of Emberly. The platform had grown from a file host into a developer ecosystem.

## What I Built

### Core Platform
I architected and developed a full-stack application using **Next.js 16** with the App Router, **TypeScript** throughout, and **PostgreSQL** with Prisma ORM. Storage is powered by a named-bucket system supporting local disk or any S3-compatible provider (Cloudflare R2, MinIO, Wasabi). **Redis** handles session caching, rate-limiting, upload metadata, and cross-domain session sharing.

### Authentication & Security
Auth is built on NextAuth.js with credentials login, magic links, and OAuth via GitHub and Discord. Security includes TOTP two-factor authentication with QR setup and recovery code batches, password history enforcement, login history with device fingerprinting and geo tracking (new device triggers an email alert), and session versioning for instant invalidation across all clients.

### File Sharing & URL Shortener
A full file hosting pipeline with drag-and-drop uploads, chunked multi-part uploads with Redis-cached metadata, OCR text extraction via Tesseract.js, and paste/code collaboration with editor and suggester roles (backed by a suggestion approval flow). Files support visibility controls, bcrypt-hashed password protection, configurable expiration with delete or privatize actions, and custom vanity domains. A companion URL shortener handles short codes with click analytics and plan-gated reporting.

### Nexium — Talent Discovery (v2.0)
The flagship v2 feature. Developers create a \`@handle\` profile with up to 30 categorized skills (with level bars and 100+ brand icons via Simple Icons and devicons), up to 20 proof-of-work signals (auto-enriched from GitHub repos with live stars, forks, and language color dots), and post or apply to opportunities across full-time, contract, collab, and bounty types. Applications move through a \`PENDING → SHORTLISTED → ACCEPTED / REJECTED\` workflow. The discovery dashboard surfaces talent globally with filters and availability status.

### Squads (v2.3)
Teams operate as first-class platform entities with their own branding, custom domain slots, dedicated file storage with quota tracking, \`nsk_\`-prefixed SHA-256-hashed API keys, ShareX upload tokens, Stripe subscriptions, and a token-based invite system with a full \`FORMING → ACTIVE → COMPLETED / DISBANDED\` lifecycle.

### Public Profiles & Community
Every user gets a public profile with five tabs: Overview (bio, perk badges, socials, testimonial), Files, URLs, Contributions (live GitHub stats lines of code, repos, additions/deletions), and Talent (Nexium profile). A composite-score leaderboard ranks contributors by uploads, downloads, and link clicks. A testimonial system, community applications (staff, partner, verification, ban appeal), and a report/moderation layer round out the social layer.

### Subscription System
Complete billing built on Stripe: multiple subscription tiers (Spark, Glow, Flare, Blaze) with add-ons for extra storage and custom domain slots, promo codes, a referral credit ledger, customer portal, full webhook handler, and 13 transactional email lifecycle events (subscription created/cancelled, payment failed, refund issued, etc.).

### Theme System
A CSS variable-driven theming engine with HSL-based palette generation, multiple named presets (Royal Purple, Hawkins Neon, and more), per-user persistent theme storage, and full custom color overrides. The glassmorphism design language was fully redesigned for v2.

## Technical Highlights

### Infrastructure
- **Event system**: DB-backed async event bus with priority queuing, retry logic, sequential processing, and pluggable per-category handlers (email, per-user Discord webhooks, admin alerts)
- **Status monitoring**: Kener integration for real-time service health
- **Error tracking**: Sentry across client, server, and edge runtimes
- **Email**: 30+ typed React Email templates delivered via Resend, covering the full user lifecycle

### Developer Experience
- REST API with auto-generated ShareX, Flameshot, and Spectacle configs per user and squad
- \`nsk_\`-prefixed API keys for squad programmatic access with last-used tracking
- Webhook support with per-category Discord delivery and per-user toggle controls

### Self-Hosting
AGPL-3.0 licensed and open source. Deploy on bare metal or Docker, point to any S3-compatible bucket, configure your own Stripe keys, and run \`prisma migrate deploy\`. A built-in setup wizard handles first-run configuration.
    `,
    images: [
        "/previews/emberly/home.png",
        "/previews/emberly/about.png",
        "/previews/emberly/pricing.png",
        "/previews/emberly/discovery.png",
        "/previews/emberly/leaderboard.png",
        "/previews/emberly/dashboard.png",
        "/previews/emberly/analytics.png",
        "/previews/emberly/nexium.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Open Source"],
    links: {
        demo: "https://embrly.ca",
        github: "https://github.com/EmberlyOSS/Emberly",
        documentation: "https://docs.embrly.ca",
        support: "https://embrly.ca/contact"
    },
    featured: true,
    technologies: [
        { name: "Next.js", description: "Full-stack React framework with App Router and Turbopack for fast development" },
        { name: "TypeScript", description: "Type-safe development across the entire codebase" },
        { name: "PostgreSQL", description: "Primary database for users, files, and metadata with ACID compliance" },
        { name: "Prisma", description: "Type-safe ORM with migrations and schema management" },
        { name: "NextAuth.js", description: "Authentication with OAuth providers, JWT sessions, and 2FA support" },
        { name: "Tailwind CSS", description: "Utility-first styling with shadcn/ui component library" },
        { name: "Stripe", description: "Subscription billing with multiple tiers and add-on support" },
        { name: "AWS S3", description: "Multi-provider file storage with presigned URLs" },
        { name: "Resend", description: "Transactional email with React Email templates" },
        { name: "Radix UI", description: "Accessible UI primitives for dialogs, dropdowns, and more" },
        { name: "React Query", description: "Data fetching, caching, and synchronization" },
        { name: "Recharts", description: "Analytics dashboards and usage statistics visualization" },
        { name: "Tesseract.js", description: "OCR engine for extracting text from uploaded images" },
        { name: "CodeMirror", description: "Code editor supporting 15+ languages for paste viewing" },
        { name: "CodeRabbit", description: "" },
        { name: "Zod", description: "Schema validation with React Hook Form integration" },
        { name: "Kener", description: "Status page integration for service health monitoring" },
        { name: "Redis", description: "" },
        { name: "Stripe", description: "" },
        { name: "Sentry", description: "" }
    ],
    challenges: [
        "Architecting a platform that works both as a cloud service and self-hosted solution",
        "Extending a file-sharing platform into a talent marketplace without fracturing existing infrastructure",
        "Implementing chunked multi-part uploads with Redis-cached metadata and real-time progress",
        "Building a distributed event system with retry logic, prioritization, and pluggable per-category handlers",
        "Designing rich embeds that render correctly across Discord, Twitter, and Slack with platform-specific strategies"
    ],
    solutions: [
        "Abstracted storage, auth, and config into provider-agnostic layers with a named-bucket system",
        "Designed Nexium as a modular layer sharing the existing user, auth, billing, and domain infrastructure",
        "Built a Redis-backed chunked upload pipeline with presigned S3 URLs and instant delivery",
        "Implemented a DB-backed async event bus with sequential processing and email + Discord handler registry",
        "Developed platform-specific embed strategies with dynamic 1200×630 OG and Twitter card generation"
    ],
    keyFeatures: [
        "Custom domains with CNAME support and automatic SSL provisioning",
        "Password-protected files with configurable expiration times",
        "Rich embeds with customizable metadata for social media",
        "Developer API with ShareX, Flameshot, and Spectacle integration",
        "Team collaboration with permissions and usage analytics",
        "20+ theme presets with gaming-inspired options",
        "Self-hostable with Docker or bare metal deployment",
        "Two-factor authentication with TOTP support"
    ],
    date: "2025-07-10",
    role: "Founder & Lead Developer",
    teamSize: 8,
    testimonials: [],
    partners: [
        {
            name: "NodeByte",
            url: "https://nodebyte.host",
            description: "Game server hosting partner providing infrastructure support"
        },
        {
            name: "ByteSend",
            url: "https://bytesend.cloud",
            description: "Email Infrastructure That Just Works."
        }
    ]
};

export default project;