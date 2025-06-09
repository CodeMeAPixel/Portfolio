import { Project } from "@/types/project";

const project: Project = {
    id: "nodebyte-hosting",
    title: "NodeByte Hosting",
    description: "Fast, reliable, scalable and secure hosting services for your gaming experience.",
    longDescription: `
# NodeByte Hosting

**NodeByte Hosting** delivers premium game server hosting solutions with an unwavering focus on performance, reliability, and user experience. Built from the ground up to cater to both casual gamers and professional esports teams, our platform simplifies server management while providing enterprise-grade infrastructure.

## Core Features

Our hosting platform offers comprehensive solutions for the gaming community:

- **One-Click Deployment**: Instant setup for popular games including Minecraft, Rust, ARK, and more
- **Custom Control Panel**: Intuitive interface with real-time server monitoring and management
- **Live Console Access**: Direct server console access with command history and auto-completion
- **Automatic Backups**: Scheduled backups with one-click restoration capabilities
- **DDoS Protection**: Enterprise-grade protection ensuring uninterrupted gameplay

## Technical Excellence

NodeByte Hosting leverages cutting-edge technology to deliver exceptional performance:

- **High-Performance Hardware**: NVMe SSD storage with DDR4 RAM for lightning-fast load times
- **Global Network**: Strategic server locations worldwide for minimal latency
- **Container Isolation**: Secure, isolated environments with dedicated resource allocation
- **Auto-Scaling**: Dynamic resource allocation based on server load and player count
- **99.9% Uptime SLA**: Redundant infrastructure with automatic failover systems

## Developer Experience

Built with modern web technologies to ensure a seamless user experience:

- **React & Next.js**: Server-side rendering for optimal performance and SEO
- **TypeScript**: Type-safe development ensuring reliability and maintainability
- **Framer Motion**: Smooth, polished animations enhancing user interaction
- **Real-time Updates**: Live server status and player count updates
- **GitHub Integration**: Automated deployments and version control integration

## Impact & Growth

Since launch, NodeByte Hosting has achieved remarkable milestones:

> **6-person team** managing game servers across multiple continents

## Customer Success

Our commitment to excellence is reflected in customer feedback:

- **Sub-10 minute support response times** - even on holidays
- **Intuitive panel design** praised by both technical and non-technical users
- **Competitive pricing** with transparent, no-hidden-fees structure
- **Community-focused approach** with dedicated Discord support

## Innovation Journey

This project demonstrates expertise in:

1. **System Architecture** - Designing scalable, fault-tolerant hosting infrastructure
2. **User Experience** - Creating intuitive interfaces for complex server management
3. **Performance Optimization** - Ensuring minimal latency and maximum uptime
4. **Security Implementation** - Protecting customer data and server environments
5. **Team Leadership** - Coordinating development and operations across multiple time zones

NodeByte Hosting continues to push the boundaries of game server hosting, setting new standards for performance, reliability, and customer satisfaction in the gaming industry.
    `,
    images: [
        "/previews/nodebyte.host/nbh-preview-1.png",
        "/previews/nodebyte.host/nbh-preview-2.png",
        "/previews/nodebyte.host/nbh-preview-3.png",
        "/previews/nodebyte.host/nbh-preview-4.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion"],
    links: {
        demo: "https://nodebyte.host",
        github: "https://github.com/NodeByteHosting/Website"
    },
    featured: true,
    technologies: [
        { name: "Next.js", description: "Powers the frontend with server-side rendering and static site generation" },
        { name: "React", description: "Building an intuitive, responsive user interface." },
        { name: "Node.js", description: "Runs the backend API for game server management" },
        { name: "TypeScript", description: "Ensures type safety and improves developer experience" },
        { name: "Framer", description: "Creates smooth, polished animations and transitions" },
        { name: "Radix", description: "Provides accessible, unstyled UI components" },
        { name: "Tailwind CSS", description: "Enables rapid UI development with utility-first approach" },
        { name: "React Query", description: "Manages server state and caching for optimized data fetching" },
        { name: "GitHub API", description: "Powers the Knowledge Base, Legal Pages and more." }
    ],
    challenges: [
        "Creating an intuitive control panel for non-technical users",
        "Ensuring high uptime and performance for game servers",
        "Implementing secure isolation between customer environments"
    ],
    solutions: [
        "Developed a custom UI with real-time server controls and status monitoring",
        "Built a distributed architecture with automatic failover systems",
        "Implemented containerization with resource limits and network isolation"
    ],
    keyFeatures: [
        "One-click game server deployment",
        "Custom control panel with live console access",
        "Automatic backups and server snapshots",
        "DDoS protection for all game servers",
        "24/7 server monitoring and alerting"
    ],
    date: "2024-01-22",
    role: "Chief Operations Officer",
    teamSize: 6,
    testimonials: [
        {
            quote: "Quick and easy support system. I opened a ticket and in under 10 minutes I got a response. I was very pleasantly surprised as today is Christmas Eve so I'm certain the team is working with limited members.",
            author: "Wolfie_Gamer",
            position: "24 January 2024"
        },
        {
            quote: "The excellent panel design Fast response from staff members seeking support. Good prices for what they offer.",
            author: "Ollie",
            position: "21 March 2024"
        }
    ]
};

export default project;
