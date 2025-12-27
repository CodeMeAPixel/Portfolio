import { Project } from "@/types/project";

const project: Project = {
    id: "emberly",
    title: "Emberly",
    description: "File Sharing, Forged in Fire.",
    longDescription: `Emberly is an open-source file sharing platform designed for developers, teams, and communities who value privacy and simplicity. Built with modern web technologies, it offers a self-hostable alternative to traditional cloud storage services. Upload files, set expirations, point custom domains, and serve your content with confidence.`,
    images: [
        "/previews/emberly/home.png",
        "/previews/emberly/about.png",
        "/previews/emberly/dashboard.png",
        "/previews/emberly/analytics.png"
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
        { name: "Next.js", description: "Full-stack React framework with Turbopack for blazing fast development and SSR." },
        { name: "React", description: "Building an intuitive, responsive user interface with React 18 features." },
        { name: "TypeScript", description: "Type-safe development ensuring code reliability and better developer experience." },
        { name: "PostgreSQL", description: "Storing user profiles, permissions, and upload metadata with ACID compliance." },
        { name: "Prisma", description: "Type-safe database ORM with PostgreSQL adapter for seamless operations." },
        { name: "AWS S3", description: "Scalable cloud storage for file uploads with presigned URLs for secure access." },
        { name: "Redis", description: "High-performance caching layer for session management and rate limiting." },
        { name: "Next Auth", description: "Secure authentication with OAuth providers and session management." },
        { name: "Stripe", description: "Payment processing for Spark, Glow, Flare, and Blaze subscription tiers." },
        { name: "Radix UI", description: "Accessible, unstyled UI primitives for dialogs, dropdowns, toasts, and more." },
        { name: "Tailwind CSS", description: "Utility-first CSS framework with custom animations and typography plugin." },
        { name: "React Query", description: "TanStack Query for powerful data fetching, caching, and synchronization." },
        { name: "CodeMirror", description: "Feature-rich code editor supporting 15+ languages for paste viewing." },
        { name: "Zod", description: "TypeScript-first schema validation with React Hook Form integration." },
        { name: "Resend", description: "Modern email API for transactional emails and notifications." },
        { name: "Recharts", description: "Composable charting library for analytics dashboards and usage statistics." },
        { name: "Tesseract.js", description: "OCR engine for extracting text from uploaded images." },
        { name: "React Markdown", description: "Markdown rendering with GFM support and syntax highlighting." }
    ],
    challenges: [
        "Building a privacy-first platform that never scans, indexes, or monetizes user content.",
        "Implementing chunked uploads and edge caching for large file transfers.",
        "Creating a fully self-hostable solution with Docker and bare metal support.",
        "Designing rich embeds that work beautifully on Discord, Twitter, Slack, and more."
    ],
    solutions: [
        "End-to-end encryption with optional password protection and configurable file expirations.",
        "CDN-backed delivery with optimized upload flows and instant short URL generation.",
        "Open-source codebase under GPL 3.0 license allowing full audit, fork, and self-hosting.",
        "Customizable metadata and preview generation for beautiful social media embeds."
    ],
    keyFeatures: [
        "Custom domain and CNAME support with full SSL for branded file hosting.",
        "Password-protected files with configurable expiration times.",
        "Rich embeds and beautiful previews on Discord, Twitter, and Slack.",
        "Chunked uploads for large files with instant short URL generation.",
        "Developer-friendly REST API with ShareX/Flameshot support and webhooks.",
        "Team collaboration with permissions management and usage analytics.",
        "Self-hostable with Docker or bare metal deployment options.",
        "Drag & drop uploads with real-time progress tracking."
    ],
    date: "2022-01-01",
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
    partners: ["Purrquinox", "VeloxVPN", "Octoflow", "Lexicon", "Lynkr", "Planova", "Cryptica", "NodeByte"]
};

export default project;