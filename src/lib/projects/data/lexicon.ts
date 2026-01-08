import { Project } from "@/types/project";

const project: Project = {
    id: "lexicon",
    title: "Lexicon",
    description: "Your AI powered writing assistant for rephrasing and enhancing text with ease.",
    longDescription: `
# Lexicon (Lexi)

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

### Key Technical Features
- Streaming AI responses for real time user feedback
- Centralized OpenAI helpers for maintainable AI code
- Custom toast system with icons, actions, and accessibility
- Activity tracking and analytics dashboard
- Admin panel for user management and audit logs

## Privacy & Trust

Lexi emphasizes privacy and clarity:
- Preserves named entities (names, dates, numbers) when requested
- Doesn't invent facts or hallucinate information
- Surfaces concise rewrites for user choice
- GDPR, CCPA, and ePrivacy compliant

## What I Learned

Building Lexicon taught me:
- **AI Integration** - Streaming OpenAI responses and prompt engineering for consistent results
- **Full Stack Architecture** - Next.js App Router patterns with TypeScript
- **User Experience** - Designing for real-time feedback and accessibility
- **Authentication Flows** - Email verification, password resets, and session management
    `,
    images: [
        "/previews/lexicon/home.png",
        "/previews/lexicon/about.png",
        "/previews/lexicon/dashboard.png",
        "/previews/lexicon/rephraser.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "OpenAI", "PostgreSQL", "Prisma", "Tailwind CSS", "AI"],
    links: {
        demo: "https://lexiapp.space",
        github: "https://github.com/CodeMeAPixel/Lexi",
        support: "https://discord.gg/Vv2bdC44Ge"
    },
    featured: false,
    technologies: [
        { name: "Next.js", description: "Full-stack React framework with App Router for modern web development" },
        { name: "TypeScript", description: "Type-safe development across the entire codebase" },
        { name: "PostgreSQL", description: "Primary database for users, definitions, and AI results" },
        { name: "Prisma", description: "Type-safe ORM with migrations and schema management" },
        { name: "NextAuth.js", description: "Authentication with email verification and JWT sessions" },
        { name: "OpenAI", description: "AI integrations for rephrasing, spellcheck, and definitions" },
        { name: "Tailwind CSS", description: "Utility-first styling with custom glass-panel design system" },
        { name: "React Email", description: "Email templates for verification and notifications" },
        { name: "Radix UI", description: "Accessible UI primitives for accordions and dialogs" }
    ],
    challenges: [
        "Implementing real time AI streaming responses for instant user feedback",
        "Building a comprehensive authentication system with email verification",
        "Designing a consistent glass-panel UI system across all pages",
        "Creating public sharing capabilities while maintaining user privacy"
    ],
    solutions: [
        "Centralized OpenAI helpers with streaming logic for maintainable AI code",
        "NextAuth with custom email templates and verification flows",
        "Custom design tokens and Tailwind configuration for consistent styling",
        "Privacy-first approach with user control over public/private content"
    ],
    keyFeatures: [
        "AI powered sentence rephrasing with tone and length customization",
        "Public definitions system for community word definitions",
        "Spell and grammar correction with AI suggestions",
        "Real time streaming responses for instant feedback",
        "Activity history dashboard with usage analytics",
        "Email verification and password reset flows",
        "Admin panel for user management",
        "100% free to use"
    ],
    date: "2025-08-15",
    role: "Creator & Lead Developer",
    teamSize: 1
};

export default project;
