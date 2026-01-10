import { Project } from "@/types/project";

const project: Project = {
    id: "noadmin",
    title: "NoAdmin",
    description: "Stop requesting Administrator permission. Build secure Discord bots.",
    longDescription: `
# NoAdmin

NoAdmin is an educational resource built to address a critical security problem in the Discord bot community: too many bots request Administrator permission when they only need a handful of specific permissions.

## The Vision

I created noadmin.info because I saw countless bots requesting Administrator permission "for convenience," creating unnecessary security risks and eroding user trust. This site teaches Discord bot developers the principle of least privilege and provides tools to implement it properly.

## What I Built

### Educational Content
A comprehensive guide explaining:
- Why requesting Administrator permission is harmful
- How Discord permissions actually work
- Real-world security implications
- Best practices for bot development

### Interactive Tools

**Permission Calculator** — An interactive tool that lets developers calculate the exact permission integers their bots need:
- Visual checklist of all Discord permissions
- Real-time permission integer calculation
- Copy-to-clipboard functionality for easy integration

**OAuth2 URL Generator** — Quickly generate invite links with calculated permissions:
- Input your Bot ID
- Select specific permissions needed
- Get a ready-to-use invite URL
- Share with users who have the principle of least privilege in mind

### Bot Examples
Real-world examples showing what permissions different bot types actually need:
- Moderation bots
- Music bots
- Utility bots
- Custom command bots

### Modern Experience
Built with Next.js 16 and React 19:
- Mobile-responsive design
- Dark theme matching Discord's aesthetic
- Fast, snappy interactions
- Accessible UI with Radix UI components
- Open Graph image generation for social sharing

## Technical Highlights

### Performance
- Server-rendered React for optimal performance
- Minimal JavaScript on the client
- Fast permission calculations with bitwise operations
- Static generation for fast page loads

### Developer Experience
- Clean, minimal UI focused on the task
- One-click copy for generated permission integers
- Direct links to Discord documentation
- Educational content that explains the "why"

### Accessibility
- Built with Radix UI for accessible components
- Keyboard navigation throughout
- Semantic HTML structure
- ARIA labels and roles properly implemented

## Why This Matters

**The Problem:** Bots requesting Administrator permission unnecessarily:
- 🔓 Create security vulnerabilities if compromised
- 😰 Make users distrust the bot and the developer
- ❌ Get rejected from bot lists (top.gg, discord.bots.gg)
- 💥 Can lead to catastrophic damage if the bot is hacked

**The Solution:** NoAdmin teaches developers that specific permissions are:
- ✅ More secure
- ✅ More user-friendly
- ✅ Required by bot listing services
- ✅ Better for bot reputation

## Impact

NoAdmin represents my commitment to improving the Discord developer community by promoting security best practices. It's a simple site with a powerful message: developers should only request the permissions they actually need.

## What I Learned

Building NoAdmin taught me:
- **Community Advocacy** — Using educational tools to promote best practices
- **Discord API Design** — Deep understanding of Discord's permission system
- **User Education** — Designing interfaces that teach while they help
- **Minimalism** — Creating impact with a focused, simple solution

This project shows that sometimes the most important tools aren't complex systems—they're simple, focused solutions that help developers make better choices.
    `,
    images: [
        "/previews/noadmin/preview-1.png",
        "/previews/noadmin/preview-2.png",
        "/previews/noadmin/preview-3.png",
        "/previews/noadmin/preview-4.png",
        "/previews/noadmin/preview-5.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Discord", "Educational", "Open Source"],
    links: {
        demo: "https://noadmin.info",
        github: "https://github.com/CodeMeAPixel/NoAdmin",
    },
    featured: false,
    technologies: [
        { name: "Next.js", description: "React framework with App Router for server-rendered pages" },
        { name: "React 19", description: "UI library for interactive components" },
        { name: "TypeScript", description: "Type-safe development throughout" },
        { name: "Tailwind CSS 4", description: "Utility-first styling matching Discord's aesthetic" },
        { name: "Radix UI", description: "Accessible UI component primitives" },
        { name: "Biome", description: "Fast linter and code formatter" }
    ],
    challenges: [
        "Explaining complex permission systems in an accessible way",
        "Creating an intuitive permission calculator interface",
        "Generating correct permission integers with bitwise operations",
        "Building educational content that actually changes developer behavior"
    ],
    solutions: [
        "Visual checklist with clear descriptions for each permission",
        "Real-time calculation and copy-to-clipboard for ease of use",
        "Robust bitwise operation library with verification",
        "Practical examples showing the benefits of least privilege"
    ],
    keyFeatures: [
        "Interactive permission calculator with visual checklist",
        "OAuth2 invite URL generator with calculated permissions",
        "Real-world bot examples with exact permission requirements",
        "Educational content explaining why Administrator permission is harmful",
        "Mobile-responsive design for all devices",
        "Dark theme matching Discord's aesthetic",
        "Open Graph image generation for social sharing",
        "Fast, minimal JavaScript implementation",
        "Accessible components using Radix UI",
        "Direct links to Discord documentation"
    ],
    date: "2026-01-08",
};

export default project;
