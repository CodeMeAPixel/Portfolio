import { Project } from "@/types/project";

const project: Project = {
    id: "nodebyte-hosting",
    title: "NodeByte Hosting",
    description: "Fast, reliable, scalable and secure hosting services for your gaming experience. Built for Humans. Powered by Bytes.",
    longDescription: `
# NodeByte Hosting

**NodeByte Hosting** is a premium game server hosting platform built by gamers, for gamers. Founded in 2024, NodeByte was born from frustration with laggy servers, unresponsive support, and complex control panels. We assembled a team of passionate gamers and experienced ops engineers with one goal: build the game hosting platform we always wished existed.

## Built for Performance

Our infrastructure is tuned specifically for multiplayer gaming with enterprise-grade features:

- **DDoS Protection**: Enterprise-grade mitigation powered by FyfeWeb with automatic scrubbing at the network edge
- **Low Latency Network**: Optimized routes through FyfeWeb's UK network with London POPs for ~50ms average ping
- **Instant Setup**: 60-second deploys with one-click templates and automated mod installs
- **UK Data Centers**: Strategically located with London POPs powered by FyfeWeb for excellent UK and Europe coverage
- **Control Panel**: Powerful UI for live console access, file management, backups, and metrics
- **24/7 Support**: Human-first expert support available any time via Discord, tickets, and knowledge base

## Game Server Offerings

### Minecraft (Most Popular)
- Java & Bedrock servers with one-click mod loaders
- Forge & Fabric support with plugin management
- Auto backups and custom JAR uploads
- Starting at $2.54/month

### Rust (High Performance)
- High-performance servers with Oxide/uMod support
- Custom maps, wipe scheduler, and RCON access
- Starting at $10.16/month

### Hytale (Coming Soon)
- Mod support, custom maps, and easy configuration
- 24/7 support included

## Core Values

### Built for Players
Our infrastructure prioritizes low latency routing, predictable performance, and strong uptime so your communities stay online and responsive.

### Community & Mod Support
Seamless mod installs, snapshot support, and community tooling to help you run modded worlds and persistent servers with minimal effort.

### Open by Design
We value transparency from clear SLA commitments to open tooling. Our platform provides APIs and integrations to automate server workflows.

## Key Stats

- **99.6% Uptime SLA** - Enterprise redundancy keeping servers online
- **~50ms Avg Latency** - Optimized routing for low-latency gameplay  
- **1000+ Active Servers** - Trusted by gaming communities worldwide
- **4.8/5 Trustpilot Rating** - Consistently high customer satisfaction

## Company Information

NodeByte LTD is a registered UK company (Company No. 15432941) committed to transparent business practices and customer trust.

## Innovation Journey

This project demonstrates expertise in:

1. **Infrastructure Design** - Building gaming-optimized hosting with FyfeWeb partnership
2. **User Experience** - Creating intuitive control panels for technical and non-technical users
3. **Performance Engineering** - Ensuring sub-50ms latency and 99.6% uptime
4. **Security Implementation** - Enterprise DDoS protection and secure isolation
5. **Community Building** - Growing a thriving Discord community and support ecosystem
    `,
    images: [
        "/previews/nodebyte-host/home.png",
        "/previews/nodebyte-host/about.png",
        "/previews/nodebyte-host/minecraft.png",
        "/previews/nodebyte-host/kb.png"
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
        "Creating an intuitive control panel accessible to both technical and non-technical users",
        "Implementing enterprise-grade DDoS protection without impacting latency",
        "Providing 24/7 human-first support across multiple channels"
    ],
    solutions: [
        "Partnered with FyfeWeb for UK data centers with London POPs and optimized routing",
        "Developed a powerful yet intuitive UI with live console, file manager, and scheduled tasks",
        "Integrated automatic DDoS scrubbing at the network edge with real-time monitoring",
        "Built multi-channel support via Discord, ticket system, and comprehensive knowledge base"
    ],
    keyFeatures: [
        "60-second server deployment with pre-built templates",
        "Enterprise DDoS protection powered by FyfeWeb",
        "Live console access with file management and backups",
        "99.6% uptime SLA with ~50ms average latency",
        "Support for Minecraft, Rust, and upcoming Hytale",
        "24/7 human support via Discord and ticket system",
        "Mod support including Forge, Fabric, and Oxide/uMod",
        "Free trials available for new users"
    ],
    date: "2024-01-01",
    role: "Chief Operations Officer",
    teamSize: 6,
    partners: [
        { name: "FyfeWeb", url: "https://fyfeweb.com", description: "Network infrastructure and DDoS protection partner" }
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
