import type { PrismaClient } from '../../src/generated/prisma/client.js'

export async function seedProjects(prisma: PrismaClient) {
  await prisma.project.create({
    data: {
      slug: 'emberly',
      title: 'Emberly',
      description: 'File Sharing, Forged in Fire.',
      longDescription: `# Emberly

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
- GitHub powered changelog system that pulls from releases`,
      images: [
        '/previews/emberly/home.png',
        '/previews/emberly/about.png',
        '/previews/emberly/dashboard.png',
        '/previews/emberly/analytics.png',
        '/previews/emberly/blog.png',
        '/previews/emberly/docs.png',
        '/previews/emberly/press.png',
        '/previews/emberly/mk.png',
        '/previews/emberly/upload.png',
        '/previews/emberly/paste.png',
        '/previews/emberly/shortener.png',
        '/previews/emberly/domains.png',
        '/previews/emberly/pricing.png',
        '/previews/emberly/changes.png',
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Open Source'],
      featured: true,
      date: '2025-07-10',
      role: 'Founder & Lead Developer',
      teamSize: 3,
      demoUrl: 'https://embrly.ca',
      githubUrl: 'https://github.com/EmberlyOSS',
      docsUrl: 'https://embrly.ca/docs',
      supportUrl: 'https://discord.gg/Dmrkt7NBXt',
      technologies: [
        { name: 'Next.js', description: 'Full-stack React framework with App Router and Turbopack for fast development' },
        { name: 'TypeScript', description: 'Type-safe development across the entire codebase' },
        { name: 'PostgreSQL', description: 'Primary database for users, files, and metadata with ACID compliance' },
        { name: 'Prisma', description: 'Type-safe ORM with migrations and schema management' },
        { name: 'NextAuth.js', description: 'Authentication with OAuth providers, JWT sessions, and 2FA support' },
        { name: 'Tailwind CSS', description: 'Utility-first styling with shadcn/ui component library' },
        { name: 'Stripe', description: 'Subscription billing with multiple tiers and add-on support' },
        { name: 'AWS S3', description: 'Multi-provider file storage with presigned URLs' },
        { name: 'Resend', description: 'Transactional email with React Email templates' },
        { name: 'Radix UI', description: 'Accessible UI primitives for dialogs, dropdowns, and more' },
        { name: 'React Query', description: 'Data fetching, caching, and synchronization' },
        { name: 'Recharts', description: 'Analytics dashboards and usage statistics visualization' },
        { name: 'Tesseract.js', description: 'OCR engine for extracting text from uploaded images' },
        { name: 'CodeMirror', description: 'Code editor supporting 15+ languages for paste viewing' },
        { name: 'Zod', description: 'Schema validation with React Hook Form integration' },
        { name: 'Instatus', description: 'Status page integration for service health monitoring' },
      ],
      challenges: [
        'Architecting a platform that works both as a cloud service and self-hosted solution',
        'Implementing chunked uploads with real-time progress for large file transfers',
        'Building a flexible theming system with 20+ presets and custom color support',
        'Designing rich embeds that render beautifully across Discord, Twitter, and Slack',
      ],
      solutions: [
        'Abstracted storage, auth, and config layers to support multiple deployment modes',
        'Built CDN-backed delivery with optimized upload flows and instant short URLs',
        'Created a theme engine with HSL-based colors, background effects, and animation controls',
        'Developed customizable metadata and OG image generation for social platforms',
      ],
      keyFeatures: [
        'Custom domains with CNAME support and automatic SSL provisioning',
        'Password-protected files with configurable expiration times',
        'Rich embeds with customizable metadata for social media',
        'Developer API with ShareX, Flameshot, and Spectacle integration',
        'Team collaboration with permissions and usage analytics',
        '20+ theme presets with gaming-inspired options',
        'Self-hostable with Docker or bare metal deployment',
        'Two-factor authentication with TOTP support',
      ],
      partners: [
        { name: 'NodeByte', url: 'https://nodebyte.host', description: 'Game server hosting partner providing infrastructure support' },
      ],
      testimonials: {
        create: [
          {
            quote: "The best there is. I've been using Emberly since around 2022, never have I ever been disappointed. It has been my go-to solution for screenshot and video sharing.",
            author: 'Ran',
            position: 'Community Member',
            avatar: '/testimonials/ran.png',
          },
        ],
      },
    },
  })

  await prisma.project.create({
    data: {
      slug: 'nodebyte-hosting',
      title: 'NodeByte Hosting',
      description: 'Fast, reliable, scalable and secure hosting services for your gaming experience. Built for Humans. Powered by Bytes.',
      longDescription: `# NodeByte Hosting

As **Chief Operations Officer** at NodeByte Hosting, I've played a key role in helping scale this game server hosting platform. Since joining the team in 2024, I've worn many hats from infrastructure coordination to customer experience improvements.

## My Role & Responsibilities

### Operations & Infrastructure
I oversee day to day operations ensuring our hosting infrastructure runs smoothly. This includes coordinating with our infrastructure partner FyfeWeb, monitoring system performance, and contributing to strategic decisions about capacity planning and resource allocation.

### Product Development
I work closely with the development team on the customer facing experience. This has involved contributing to the control panel UX, helping architect the knowledge base, and ensuring our 60 second deployment system delivers on its promise.`,
      images: [
        '/previews/nodebyte-host/home.png',
        '/previews/nodebyte-host/about.png',
        '/previews/nodebyte-host/minecraft.png',
        '/previews/nodebyte-host/kb.png',
        '/previews/nodebyte-host/changelogs.png',
        '/previews/nodebyte-host/dashboard.png',
        '/previews/nodebyte-host/account.png',
        '/previews/nodebyte-host/admin.png',
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Radix UI'],
      featured: true,
      date: '2025-12-12',
      role: 'Chief Operations Officer',
      teamSize: 6,
      demoUrl: 'https://nodebyte.host',
      githubUrl: 'https://github.com/NodeByteHosting/Website',
      docsUrl: 'https://nodebyte.host/kb',
      supportUrl: 'https://discord.gg/wN58bTzzpW',
      technologies: [
        { name: 'Next.js', description: 'Powers the frontend with server-side rendering and static site generation' },
        { name: 'React', description: 'Building an intuitive, responsive user interface' },
        { name: 'TypeScript', description: 'Ensures type safety and improves developer experience' },
        { name: 'Framer Motion', description: 'Creates smooth, polished animations and transitions' },
        { name: 'Radix UI', description: 'Provides accessible, unstyled UI components' },
        { name: 'Tailwind CSS', description: 'Enables rapid UI development with utility-first approach' },
        { name: 'GitHub API', description: 'Powers the Knowledge Base, Legal Pages and changelog' },
        { name: 'Crowdin', description: 'Enables internationalization and localization support' },
      ],
      challenges: [
        'Building infrastructure optimized specifically for multiplayer gaming workloads',
        'Creating an intuitive control panel accessible to both technical and non technical users',
        'Implementing enterprise grade DDoS protection without impacting latency',
        'Providing 24/7 human first support across multiple channels',
      ],
      solutions: [
        'Partnered with FyfeWeb for UK data centers with London POPs and optimized routing',
        'Developed a powerful yet intuitive UI with live console, file manager, and scheduled tasks',
        'Integrated automatic DDoS scrubbing at the network edge with real-time monitoring',
        'Built multi-channel support via Discord, ticket system, and comprehensive knowledge base',
      ],
      keyFeatures: [
        '60 second server deployment with pre built templates',
        'Enterprise DDoS protection powered by FyfeWeb',
        'Live console access with file management and backups',
        '99.6% uptime SLA with ~50ms average latency',
        'Support for Minecraft, Rust, and upcoming Hytale',
        '24/7 human support via Discord and ticket system',
        'Mod support including Forge, Fabric, and Oxide/uMod',
        'Free trials available for new users',
      ],
      partners: [
        { name: 'FyfeWeb', url: 'https://fyfeweb.com', description: 'Network infrastructure and DDoS protection partner' },
      ],
      testimonials: {
        create: [
          {
            quote: 'Quick and easy support system. I opened a ticket and in under 10 minutes I got a response. I was very pleasantly surprised as today is Christmas Eve so I\'m certain the team is working with limited members.',
            author: 'Wolfie_Gamer',
            position: 'Trustpilot Review - January 2024',
          },
          {
            quote: 'The excellent panel design. Fast response from staff members seeking support. Good prices for what they offer.',
            author: 'Ollie',
            position: 'Trustpilot Review - March 2024',
          },
        ],
      },
    },
  })

  await prisma.project.create({
    data: {
      slug: 'lexicon',
      title: 'Lexicon',
      description: 'Your AI powered writing assistant for rephrasing and enhancing text with ease.',
      longDescription: `# Lexicon (Lexi)

As the **Creator and Lead Developer** of Lexicon, I built this AI powered writing assistant to help users refine their grammar abilities using cutting edge AI technology. The platform offers personalized suggestions to improve writing skills.

## The Vision

I created Lexicon in 2025 with a simple mission: make English clearer and more approachable. Whether you're rewriting a sentence to be more formal, shortening a long message, or finding a more natural phrasing, Lexi offers focused, privacy minded suggestions that keep your original meaning intact.

The word "lexicon" comes from the Greek *lexikon*, meaning "of words." In modern English it usually refers to a vocabulary or the set of words used within a language. Lexi is built around that idea: helping you choose the right words, shape clear sentences, and express ideas with confidence.

## What I Built

### Core Tools
- **Sentence Rephraser** - AI powered tool that rewrites sentences with customizable tone (Casual, Formal, Informal, Creative) and length options, streaming results in real time
- **Definer** - Public definitions system where users can create and share word definitions with the community
- **Spellcheck** - AI powered spell and grammar correction with saved results and public sharing
- **TL;DR Tool** - Condense long text into concise summaries

### User Experience
- Clean glass panel UI with custom design tokens
- Real time streaming for instant AI responses
- Dashboard with activity history and usage statistics
- Public sharing capabilities for all tools

### Authentication & Accounts
- Full authentication system with NextAuth.js
- Email verification flow with custom email templates
- User dashboard with personalized settings
- Password reset functionality

## Technical Implementation

### Stack
- **Framework**: Next.js (App Router) with React and TypeScript
- **Styling**: Tailwind CSS with custom palette and glass-panel design system
- **Authentication**: NextAuth with JWT sessions and email verification
- **AI**: OpenAI integrations with centralized helpers for streaming responses
- **Email**: React Email templates with Microsoft Graph/Azure integration
- **Storage**: S3 compatible object storage for avatars and file uploads
- **Database**: PostgreSQL with Prisma ORM

## Privacy & Trust

Lexi emphasizes privacy and clarity:
- Preserves named entities (names, dates, numbers) when requested
- Doesn't invent facts or hallucinate information
- Surfaces concise rewrites for user choice
- GDPR, CCPA, and ePrivacy compliant`,
      images: [
        '/previews/lexicon/home.png',
        '/previews/lexicon/about.png',
        '/previews/lexicon/dashboard.png',
        '/previews/lexicon/rephraser.png',
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'AI'],
      featured: false,
      date: '2025-08-15',
      role: 'Creator & Lead Developer',
      teamSize: 1,
      demoUrl: 'https://lexiapp.space',
      githubUrl: 'https://github.com/CodeMeAPixel/Lexi',
      supportUrl: 'https://discord.gg/Vv2bdC44Ge',
      technologies: [
        { name: 'Next.js', description: 'Full-stack React framework with App Router for modern web development' },
        { name: 'TypeScript', description: 'Type-safe development across the entire codebase' },
        { name: 'PostgreSQL', description: 'Primary database for users, definitions, and AI results' },
        { name: 'Prisma', description: 'Type-safe ORM with migrations and schema management' },
        { name: 'NextAuth.js', description: 'Authentication with email verification and JWT sessions' },
        { name: 'OpenAI', description: 'AI integrations for rephrasing, spellcheck, and definitions' },
        { name: 'Tailwind CSS', description: 'Utility-first styling with custom glass-panel design system' },
        { name: 'React Email', description: 'Email templates for verification and notifications' },
        { name: 'Radix UI', description: 'Accessible UI primitives for accordions and dialogs' },
      ],
      challenges: [
        'Implementing real time AI streaming responses for instant user feedback',
        'Building a comprehensive authentication system with email verification',
        'Designing a consistent glass-panel UI system across all pages',
        'Creating public sharing capabilities while maintaining user privacy',
      ],
      solutions: [
        'Centralized OpenAI helpers with streaming logic for maintainable AI code',
        'NextAuth with custom email templates and verification flows',
        'Custom design tokens and Tailwind configuration for consistent styling',
        'Privacy-first approach with user control over public/private content',
      ],
      keyFeatures: [
        'AI powered sentence rephrasing with tone and length customization',
        'Public definitions system for community word definitions',
        'Spell and grammar correction with AI suggestions',
        'Real time streaming responses for instant feedback',
        'Activity history dashboard with usage analytics',
        'Email verification and password reset flows',
        'Admin panel for user management',
        '100% free to use',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'flicker',
      title: 'Flicker',
      description: 'A powerful, cross platform screenshot and upload tool for Emberly, built with Tauri for desktop and mobile.',
      tags: ['Tauri', 'React', 'TypeScript', 'Rust', 'Desktop App', 'Open Source', 'WIP'],
      featured: false,
      date: '2026-01-01',
      role: 'Developer',
      teamSize: 2,
      githubUrl: 'https://github.com/EmberlyOSS/Flicker',
      demoUrl: 'https://embrly.ca',
      supportUrl: 'https://embrly.ca/discord',
      images: ['/previews/flicker/preview-1.png'],
      technologies: [
        { name: 'Tauri', description: 'Secure, lightweight framework for desktop applications' },
        { name: 'React', description: 'Modern frontend library for the UI' },
        { name: 'TypeScript', description: 'Type-safe development for the frontend' },
        { name: 'Rust', description: 'Backend for screenshot capture and file handling' },
        { name: 'Tailwind CSS', description: 'Utility-first styling with custom theme support' },
      ],
      challenges: [
        'Implementing global hotkeys that work system-wide across platforms',
        'Handling multi threaded screenshot capture and upload in Rust',
        'Creating a polished splash screen experience',
        'Supporting multiple authentication methods including 2FA',
      ],
      solutions: [
        "Tauri's global shortcut plugin with platform specific key handling",
        "Rust's async runtime with channels for upload progress",
        'React state machine for multi phase loading with smooth animations',
        'NextAuth compatible login flow with TOTP support',
      ],
      keyFeatures: [
        'Fullscreen screenshot capture with global hotkeys',
        'Automatic upload to Emberly',
        'Desktop notifications with preview',
        '15 built in color themes',
        'System tray integration (desktop)',
        'Two factor authentication support',
        'Upload history tracking',
        'Cross platform (Windows, macOS, Linux, iOS, Android)',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'byteproxy',
      title: 'ByteProxy',
      description: 'A powerful, extensible web proxy for seamless API forwarding to Discord, GitHub, and more.',
      tags: ['Bun', 'TypeScript', 'Elysia', 'Proxy', 'API Gateway', 'Open Source'],
      featured: false,
      date: '2025-07-08',
      role: 'Lead Developer',
      teamSize: 2,
      githubUrl: 'https://github.com/ByteBrushStudios/ByteProxy',
      docsUrl: 'https://proxy.bytebrush.dev',
      supportUrl: 'https://discord.gg/Vv2bdC44Ge',
      technologies: [
        { name: 'Bun', description: 'Fast JavaScript runtime with built-in bundler and package manager' },
        { name: 'TypeScript', description: 'Type-safe development across the entire codebase' },
        { name: 'Elysia', description: 'High-performance TypeScript web framework for Bun' },
        { name: 'Swagger', description: 'Interactive API documentation with OpenAPI spec' },
      ],
      challenges: [
        'Building a flexible proxy that supports multiple authentication methods',
        'Implementing per service rate limiting without blocking other services',
        'Creating a developer friendly debugging experience for API issues',
        'Supporting runtime service configuration without restarts',
      ],
      solutions: [
        'Modular authentication middleware supporting Bearer, API key, Bot, and Basic auth',
        'Service isolated rate limit tracking with sliding windows',
        'Comprehensive debug endpoints with masked credentials and troubleshooting hints',
        'Dynamic service registry with management API endpoints',
      ],
      keyFeatures: [
        'Multi-service API proxy (Discord, GitHub, custom)',
        'Per-service rate limiting with configurable windows',
        'Multiple authentication methods',
        'Dynamic service management at runtime',
        'Interactive Swagger documentation',
        'Health monitoring and diagnostics',
        'WebSocket proxy support',
        'CORS configuration',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'socket0',
      title: 'Socket0',
      description: 'A robust, lightweight WebSocket server for building real time applications with authorization, broadcasting, and channel management.',
      tags: ['Go', 'WebSocket', 'Real-time', 'Redis', 'Pub/Sub', 'Open Source'],
      featured: false,
      date: '2025-05-08',
      role: 'Lead Developer',
      teamSize: 2,
      githubUrl: 'https://github.com/ByteBrushStudios/socket0',
      supportUrl: 'https://discord.gg/Vv2bdC44Ge',
      technologies: [
        { name: 'Go', description: 'High performance systems programming language' },
        { name: 'Redis', description: 'In memory data store for distributed pub/sub messaging' },
        { name: 'WebSocket', description: 'Full duplex communication protocol for real time data' },
        { name: 'Echo', description: 'High performance Go web framework' },
        { name: 'Docker', description: 'Containerization for consistent deployments' },
      ],
      challenges: [
        'Managing goroutine lifecycles without memory leaks',
        'Supporting multiple broker backends with a unified interface',
        'Implementing external authorization without blocking connections',
        'Handling graceful shutdown with active WebSocket connections',
      ],
      solutions: [
        'Context based cancellation with proper channel cleanup on disconnect',
        'Driver interface pattern allowing memory and Redis backends',
        'Non blocking webhook calls with configurable timeout',
        'Signal handling with connection draining before shutdown',
      ],
      keyFeatures: [
        'Simple JSON-based messaging protocol',
        'Webhook based authorization',
        'Multiple broker support (Memory, Redis)',
        'Channel management (join, leave, broadcast)',
        'HTTP broadcasting API',
        'Graceful shutdown support',
        'Health check endpoint',
        'Docker and Kubernetes ready',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'void',
      title: 'Void',
      description: 'A modern, high performance reverse proxy and maintenance system with intelligent traffic routing and beautiful maintenance pages.',
      tags: ['Go', 'Reverse Proxy', 'DevOps', 'Infrastructure', 'Open Source'],
      featured: false,
      date: '2025-05-08',
      role: 'Lead Developer',
      teamSize: 2,
      githubUrl: 'https://github.com/ByteBrushStudios/void',
      supportUrl: 'https://discord.gg/Vv2bdC44Ge',
      images: ['/previews/void/preview-1.png', '/previews/void/preview-2.png'],
      technologies: [
        { name: 'HTML', description: 'Semantic markup for the maintenance page structure' },
        { name: 'Go', description: 'High performance systems programming language for the proxy core' },
        { name: 'Chi Router', description: 'Lightweight HTTP router for Go' },
        { name: 'Tailwind CSS', description: 'Utility first CSS for the maintenance UI' },
        { name: 'Docker', description: 'Container support for easy deployment' },
      ],
      challenges: [
        'Detecting backend health without blocking user requests',
        'Serving appropriate responses for both browsers and API clients',
        'Creating a visually appealing maintenance page that is also informative',
        'Supporting multiple deployment scenarios (Nginx, Traefik, K8s)',
      ],
      solutions: [
        'Async health checking with configurable timeouts and fallback',
        'Content type detection and API URL matching for response format',
        'Glassmorphic UI with animated backgrounds and expandable debug panel',
        'Comprehensive configuration examples for all major platforms',
      ],
      keyFeatures: [
        'Intelligent reverse proxy with auto-failover',
        'Beautiful glassmorphic maintenance pages',
        'Domain based multi-service routing',
        'JSON responses for API endpoints',
        'Debug panel with client/server info',
        'GitHub release update checking',
        'Health check endpoints',
        'Docker and Kubernetes ready',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'noadmin',
      title: 'NoAdmin',
      description: 'Stop requesting Administrator permission. Build secure Discord bots.',
      tags: ['Next.js', 'React', 'TypeScript', 'Discord', 'Educational', 'Open Source'],
      featured: false,
      date: '2026-01-08',
      demoUrl: 'https://noadmin.info',
      githubUrl: 'https://github.com/CodeMeAPixel/NoAdmin',
      images: [
        '/previews/noadmin/preview-1.png',
        '/previews/noadmin/preview-2.png',
        '/previews/noadmin/preview-3.png',
        '/previews/noadmin/preview-4.png',
        '/previews/noadmin/preview-5.png',
      ],
      technologies: [
        { name: 'Next.js', description: 'React framework with App Router for server-rendered pages' },
        { name: 'React 19', description: 'UI library for interactive components' },
        { name: 'TypeScript', description: 'Type-safe development throughout' },
        { name: 'Tailwind CSS 4', description: "Utility-first styling matching Discord's aesthetic" },
        { name: 'Radix UI', description: 'Accessible UI component primitives' },
        { name: 'Biome', description: 'Fast linter and code formatter' },
      ],
      challenges: [
        'Explaining complex permission systems in an accessible way',
        'Creating an intuitive permission calculator interface',
        'Generating correct permission integers with bitwise operations',
        'Building educational content that actually changes developer behavior',
      ],
      solutions: [
        'Visual checklist with clear descriptions for each permission',
        'Real-time calculation and copy-to-clipboard for ease of use',
        'Robust bitwise operation library with verification',
        'Practical examples showing the benefits of least privilege',
      ],
      keyFeatures: [
        'Interactive permission calculator with visual checklist',
        'OAuth2 invite URL generator with calculated permissions',
        'Real-world bot examples with exact permission requirements',
        'Educational content explaining why Administrator permission is harmful',
        'Mobile-responsive design for all devices',
        "Dark theme matching Discord's aesthetic",
        'Open Graph image generation for social sharing',
        'Fast, minimal JavaScript implementation',
        'Accessible components using Radix UI',
        'Direct links to Discord documentation',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'infinity-list',
      title: 'Infinity List',
      description: 'Begin your Discord journey with our extensive directory, featuring a wide array of bots and servers.',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL', 'Go', 'WebSocket', 'OAuth2'],
      featured: false,
      date: '2020-09-24',
      role: 'Founder & Lead Developer',
      teamSize: 9,
      demoUrl: 'https://infinitybots.gg',
      githubUrl: 'https://github.com/InfinityBotList',
      docsUrl: 'https://docs.infinitybots.gg',
      supportUrl: 'https://discord.gg/infinitybots',
      images: [
        '/previews/infinitybots.gg/ibl-preview-1.png',
        '/previews/infinitybots.gg/ibl-preview-2.png',
        '/previews/infinitybots.gg/ibl-preview-3.png',
        '/previews/infinitybots.gg/ibl-preview-4.png',
      ],
      technologies: [
        { name: 'Next.js', description: 'React framework for server-side rendering, static site generation, and high-performance frontend.' },
        { name: 'React', description: 'Component-based UI library for building interactive user interfaces.' },
        { name: 'TypeScript', description: 'Typed superset of JavaScript for safer, more maintainable code.' },
        { name: 'Python', description: 'Used for Discord bots and automation tasks within the ecosystem.' },
        { name: 'Go', description: 'Backend API and worker services, chosen for concurrency and performance.' },
        { name: 'Rust', description: 'Performance-critical microservices and background jobs.' },
        { name: 'PostgreSQL', description: 'Relational database for storing user data, bot/server info, and analytics.' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid, responsive UI development.' },
        { name: 'WebSocket', description: 'Real-time updates for bot status, metrics, and notifications.' },
        { name: 'OAuth2', description: 'Secure Discord authentication for bot and server management.' },
        { name: 'Redis', description: 'In-memory data store used for caching in the website and API for fast data access.' },
        { name: 'SWR', description: 'React Hooks library for remote data fetching and caching.' },
      ],
      challenges: [
        'Scaling infrastructure to support millions of bot and server listings efficiently.',
        'Maintaining real-time data synchronization globally with minimal latency.',
        'Creating an intuitive UI that balances simplicity with advanced search and filter options.',
        'Moderation and community engagement while ensuring data privacy and security.',
      ],
      solutions: [
        'Implemented horizontal scaling with load balancers and database sharding.',
        'Developed websocket-based real-time updates for bot statuses and user interactions.',
        'Built an accessible, mobile-optimized UI with Tailwind CSS components and state management.',
        "Integrated OAuth2 for secure login and permissions, leveraging Discord's API.",
      ],
      keyFeatures: [
        'Smart search filters for bots and servers based on categories, tags, or custom keywords.',
        'Custom widget and vanity link generation for easier bot promotion.',
        'Comprehensive analytics dashboard for bot owners and server admins.',
        'Automated moderation tools and community moderation support.',
        'Seamless Discord OAuth2 login for effortless bot management.',
        'Powerful API for developers to integrate platform features into their own tools.',
      ],
    },
  })

  await prisma.project.create({
    data: {
      slug: 'nodebyte-ltd',
      title: 'NodeByte LTD',
      description: 'Helping businesses transform their digital presence with cutting edge solutions.',
      longDescription: 'A passionate team of tech experts dedicated to helping businesses succeed through innovative technology solutions.',
      tags: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'RadixUI'],
      featured: false,
      date: '2022-05-15',
      demoUrl: 'https://nodebyte.co.uk',
      githubUrl: 'https://github.com/NodeByteHosting',
      images: [
        '/previews/nodebyte.co.uk/home.png',
        '/previews/nodebyte.co.uk/about.png',
        '/previews/nodebyte.co.uk/careers.png',
        '/previews/nodebyte.co.uk/faqs.png',
        '/previews/nodebyte.co.uk/legal.png',
      ],
      technologies: [
        { name: 'Next.js', description: 'For server-side rendering and static site generation' },
        { name: 'Node.js', description: 'Backend API development for upload management.' },
        { name: 'React', description: 'Building interactive user interfaces' },
        { name: 'TypeScript', description: 'Type-safe code development' },
        { name: 'Framer', description: 'Creating smooth animations' },
        { name: 'Radix', description: 'Accessible component primitives' },
      ],
      keyFeatures: [
        'Responsive web design',
        'Custom software solutions',
        'Business process automation',
        'Digital transformation consulting',
      ],
    },
  })

  console.log('  -> Projects seeded')
}
