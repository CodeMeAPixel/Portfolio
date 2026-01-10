import { Project } from "@/types/project";

const project: Project = {
    id: "nodebyte-hosting",
    title: "NodeByte Hosting",
    description: "Fast, reliable, scalable and secure hosting services for your gaming experience. Built for Humans. Powered by Bytes.",
    longDescription: `
# NodeByte Hosting

As **Chief Operations Officer** at NodeByte Hosting, I've played a key role in helping scale this game server hosting platform. Since joining the team in 2024, I've worn many hats from infrastructure coordination to customer experience improvements.

## My Role & Responsibilities

### Operations & Infrastructure
I oversee day to day operations ensuring our hosting infrastructure runs smoothly. This includes coordinating with our infrastructure partner FyfeWeb, monitoring system performance, and contributing to strategic decisions about capacity planning and resource allocation.

### Product Development
I work closely with the development team on the customer facing experience. This has involved contributing to the control panel UX, helping architect the knowledge base, and ensuring our 60 second deployment system delivers on its promise.

## Technical Contributions

While my role is primarily operational, I've contributed technically in several areas:

- **Website Development**: Worked on the Next.js, React, and TypeScript frontend
- **Documentation System**: Helped architect the GitHub powered knowledge base that pulls content dynamically
- **Internationalization**: Contributed to Crowdin integration for multi language support

## Challenges I've Helped Tackle

Being part of a growing hosting company has taught me a lot about:

1. **Balancing UX with Technical Depth** - Our users range from first time server owners to experienced admins running complex modpacks. Contributing to solutions that serve both audiences has been rewarding.

2. **Building Trust** - In an industry with many unreliable providers, I've helped establish credibility through transparency, clear SLAs, public status pages, and honest communication during incidents.

## Impact & Results

- Contributed to maintaining **4.8/5 Trustpilot rating** through focus on customer experience
- Helped achieve **99.6% uptime** through careful operational practices
- Supported building a thriving community on Discord with responsive support

## What I Learned

This role has been an incredible learning experience in startup operations, customer success, and cross functional collaboration. Working alongside the NodeByte team has reinforced my belief that great products come from understanding your users deeply.
    `,
    images: [
        "/previews/nodebyte-host/home.png",
        "/previews/nodebyte-host/about.png",
        "/previews/nodebyte-host/minecraft.png",
        "/previews/nodebyte-host/kb.png",
        "/previews/nodebyte-host/changelogs.png",
        "/previews/nodebyte-host/dashboard.png",
        "/previews/nodebyte-host/account.png",
        "/previews/nodebyte-host/admin.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Radix UI"],
    links: {
        demo: "https://nodebyte.host",
        github: "https://github.com/NodeByteHosting/Website",
        documentation: "https://nodebyte.host/kb",
        support: "https://discord.gg/wN58bTzzpW"
    },
    featured: true,
    technologies: [
        { name: "Next.js", description: "Powers the frontend with server-side rendering and static site generation" },
        { name: "React", description: "Building an intuitive, responsive user interface" },
        { name: "TypeScript", description: "Ensures type safety and improves developer experience" },
        { name: "Framer Motion", description: "Creates smooth, polished animations and transitions" },
        { name: "Radix UI", description: "Provides accessible, unstyled UI components" },
        { name: "Tailwind CSS", description: "Enables rapid UI development with utility-first approach" },
        { name: "GitHub API", description: "Powers the Knowledge Base, Legal Pages and changelog" },
        { name: "Crowdin", description: "Enables internationalization and localization support" }
    ],
    challenges: [
        "Building infrastructure optimized specifically for multiplayer gaming workloads",
        "Creating an intuitive control panel accessible to both technical and non technical users",
        "Implementing enterprise grade DDoS protection without impacting latency",
        "Providing 24/7 human first support across multiple channels"
    ],
    solutions: [
        "Partnered with FyfeWeb for UK data centers with London POPs and optimized routing",
        "Developed a powerful yet intuitive UI with live console, file manager, and scheduled tasks",
        "Integrated automatic DDoS scrubbing at the network edge with real-time monitoring",
        "Built multi-channel support via Discord, ticket system, and comprehensive knowledge base"
    ],
    keyFeatures: [
        "60 second server deployment with pre built templates",
        "Enterprise DDoS protection powered by FyfeWeb",
        "Live console access with file management and backups",
        "99.6% uptime SLA with ~50ms average latency",
        "Support for Minecraft, Rust, and upcoming Hytale",
        "24/7 human support via Discord and ticket system",
        "Mod support including Forge, Fabric, and Oxide/uMod",
        "Free trials available for new users"
    ],
    date: "2025-12-12",
    role: "Chief Operations Officer",
    teamSize: 6,
    partners: [
        {
            name: "FyfeWeb",
            url: "https://fyfeweb.com",
            description: "Network infrastructure and DDoS protection partner"
        }
    ],
    testimonials: [
        {
            quote: "Quick and easy support system. I opened a ticket and in under 10 minutes I got a response. I was very pleasantly surprised as today is Christmas Eve so I'm certain the team is working with limited members.",
            author: "Wolfie_Gamer",
            position: "Trustpilot Review - January 2024"
        },
        {
            quote: "The excellent panel design. Fast response from staff members seeking support. Good prices for what they offer.",
            author: "Ollie",
            position: "Trustpilot Review - March 2024"
        }
    ]
};

export default project;
