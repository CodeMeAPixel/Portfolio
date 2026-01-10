import { Project } from "@/types/project";

const project: Project = {
    id: "emberly",
    title: "Emberly",
    description: "File Sharing, Forged in Fire.",
    longDescription: `
# Emberly

As the **Founder and Lead Developer** of Emberly, I built this platform from the ground up to solve a problem I personally experienced: existing file sharing solutions were either too complex, too expensive, or didn't respect user privacy. Emberly is my answer to that.

## The Vision

I started Emberly in 2022 with a simple goal: create a file sharing platform that developers would actually enjoy using. No bloat, no dark patterns, just straightforward file hosting with the features that matter.

## What I Built

### Core Platform
I architected and developed a full stack application using Next.js 16 with the App Router, TypeScript throughout, and PostgreSQL with Prisma ORM. The platform supports multiple storage providers (local filesystem and S3 compatible services) giving users flexibility in deployment.

### Authentication & Security
Implemented NextAuth.js with JWT sessions, OAuth provider support, and two factor authentication (TOTP) using otplib. Security was never an afterthought it's baked into every layer of the application.

### Subscription System
Built a complete billing system with Stripe integration, supporting multiple subscription tiers (Spark, Glow, Flare, Blaze) with add ons for extra storage and custom domains. The pricing page dynamically renders based on active plans and available add ons.

### Theme System
Developed an extensive theming engine with 20+ preset themes including gaming inspired options, each with configurable background effects, animations, and color palettes. Users can fully customize their experience.

## Technical Highlights

### File Processing Pipeline
- Chunked uploads for large files with real time progress tracking
- Presigned URL generation for secure S3 access
- OCR extraction using Tesseract.js for image text detection
- Automatic metadata extraction and preview generation

### Developer Experience
- REST API with ShareX, Flameshot, and Spectacle integration
- Webhook support for automation workflows
- Comprehensive documentation system built into the platform

### Infrastructure
- Status page integration with Instatus API for real time service health
- Email system with React Email templates and Resend delivery
- GitHub powered changelog system that pulls from releases

## Challenges I Overcame

1. **Multi tenant Architecture** - Designing a system that supports both cloud hosting and self deployment required careful abstraction of storage, authentication, and configuration layers.

2. **Custom Domain Routing** - Implementing CNAME support with automatic SSL provisioning and DNS validation was one of the trickier infrastructure problems.

3. **Real time Features** - Building live upload progress, file analytics, and collaborative features required thoughtful state management and optimistic updates.

4. **Open Source Balance** - Maintaining a GPL 3.0 open source project while also running a sustainable cloud service taught me a lot about business models in open source.

## Impact & Growth

- Built and maintained a growing community on Discord
- Received positive feedback from users who've relied on Emberly since 2022
- Established partnerships with other projects and services
- Created a comprehensive media kit and press resources for visibility

## What I Learned

Building Emberly has been the most comprehensive full stack project of my career. I've grown as a developer in areas like:

- **System Design** - Architecting for both simplicity and scalability
- **DevOps** - Docker deployments, CI/CD pipelines, monitoring
- **Product Thinking** - Prioritizing features that users actually need
- **Community Building** - Supporting users and fostering contributions

This project represents everything I believe about software: it should be fast, respect privacy, and put users in control.
    `,
    images: [
        "/previews/emberly/home.png",
        "/previews/emberly/about.png",
        "/previews/emberly/dashboard.png",
        "/previews/emberly/analytics.png",
        "/previews/emberly/blog.png",
        "/previews/emberly/docs.png",
        "/previews/emberly/press.png",
        "/previews/emberly/mk.png",
        "/previews/emberly/upload.png",
        "/previews/emberly/paste.png",
        "/previews/emberly/shortener.png",
        "/previews/emberly/domains.png",
        "/previews/emberly/pricing.png",
        "/previews/emberly/changes.png",
    ],
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Open Source"],
    links: {
        demo: "https://embrly.ca",
        github: "https://github.com/EmberlyOSS",
        documentation: "https://embrly.ca/docs",
        support: "https://discord.gg/Dmrkt7NBXt"
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
        { name: "Zod", description: "Schema validation with React Hook Form integration" },
        { name: "Instatus", description: "Status page integration for service health monitoring" }
    ],
    challenges: [
        "Architecting a platform that works both as a cloud service and self-hosted solution",
        "Implementing chunked uploads with real-time progress for large file transfers",
        "Building a flexible theming system with 20+ presets and custom color support",
        "Designing rich embeds that render beautifully across Discord, Twitter, and Slack"
    ],
    solutions: [
        "Abstracted storage, auth, and config layers to support multiple deployment modes",
        "Built CDN-backed delivery with optimized upload flows and instant short URLs",
        "Created a theme engine with HSL-based colors, background effects, and animation controls",
        "Developed customizable metadata and OG image generation for social platforms"
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
    teamSize: 3,
    testimonials: [
        {
            author: "Ran",
            position: "Community Member",
            quote: "The best there is. I've been using Emberly since around 2022, never have I ever been disappointed. It has been my go-to solution for screenshot and video sharing.",
            avatar: "/testimonials/ran.png"
        }
    ],
    partners: [
        {
            name: "NodeByte",
            url: "https://nodebyte.host",
            description: "Game server hosting partner providing infrastructure support"
        }
    ]
};

export default project;