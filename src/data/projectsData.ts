import { Project } from "@/types/project";

export const projectsData: Project[] = [
    {
        id: "infinity-list",
        title: "Infinity List",
        description: "Begin your Discord journey with our extensive directory, featuring a wide array of bots and servers.",
        longDescription: "The future of Discord Bot Listing Services. We make it easier for you to advertise and grow your bots using vanity links, widgets, bot packs, and more! Search our vast list of bots to find the perfect match for your Discord server. Filter by name, category, tags, and description to find a bot that suits your needs!",
        images: [
            "/previews/infinitybots.gg/ibl-preview-1.png",
            "/previews/infinitybots.gg/ibl-preview-2.png",
            "/previews/infinitybots.gg/ibl-preview-3.png",
            "/previews/infinitybots.gg/ibl-preview-4.png"
        ],
        tags: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Go"],
        links: {
            demo: "https://infinitybots.gg",
            github: "https://github.com/InfinityBotList"
        },
        featured: true,
        technologies: [
            { name: "Next.js", description: "Used for server-side rendering and optimized performance" },
            { name: "Go", description: "Powers the high-performance backend API" },
            { name: "PostgreSQL", description: "Stores user data, bot listings, and analytics" },
            { name: "Tailwind CSS", description: "Provides consistent, responsive styling" },
            { name: "TypeScript", description: "Ensures type safety throughout the codebase" },
            { name: "Rust", description: "Handles performance-critical microservices and background processing" }
        ],
        challenges: [
            "Scaling to handle thousands of concurrent users and bot listings",
            "Creating a responsive design that works across all devices",
            "Implementing real-time updates for bot statuses and metrics"
        ],
        solutions: [
            "Implemented efficient database indexing and query optimization",
            "Developed a component-based UI system with Tailwind for consistent responsiveness",
            "Created a WebSocket system for real-time status updates with minimal overhead"
        ],
        keyFeatures: [
            "Advanced bot and server discovery with smart filters",
            "User-friendly bot addition and management dashboard",
            "Detailed analytics and performance metrics",
            "OAuth2 integration with Discord for seamless authentication"
        ],
        date: "2020-09-24",
        role: "Founder",
        teamSize: 9
    },
    {
        id: "nodebyte-hosting",
        title: "NodeByte Hosting",
        description: "Fast, reliable, scalable and secure hosting services for your gaming experience.",
        longDescription: "NodeByte Hosting provides premium game server hosting solutions with an emphasis on performance, reliability, and ease of use. The platform offers one-click deployment of popular game servers with custom control panels that simplify server management for both novice and experienced users.",
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
            { name: "TypeScript", description: "Ensures type safety and improves developer experience" },
            { name: "Framer Motion", description: "Creates smooth, polished animations and transitions" },
            { name: "Radix UI", description: "Provides accessible, unstyled UI components" },
            { name: "Tailwind CSS", description: "Enables rapid UI development with utility-first approach" },
            { name: "React Query", description: "Manages server state and caching for optimized data fetching" },
            { name: "Node.js", description: "Runs the backend API for game server management" },
            { name: "GitHub Actions", description: "Automates testing, building, and deployment workflows" },
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
                quote: "The excellent panel design - Fast response from staff members seeking support. Good prices for what they offer.",
                author: "Ollie",
                position: "21 March 2024"
            }
        ]
    }
];

export function getProjectById(id: string): Project | undefined {
    return projectsData.find(project => project.id === id);
}

export function getAllProjectIds(): string[] {
    return projectsData.map(project => project.id);
}

export function getAllProjects(): Project[] {
    return projectsData;
}

export function getFeaturedProjects(): Project[] {
    return projectsData.filter(project => project.featured);
}

export function getProjectsByTag(tag: string): Project[] {
    return projectsData.filter(project => project.tags.includes(tag));
}

export function getAllProjectTags(): string[] {
    const tags = new Set<string>();
    projectsData.forEach(project => {
        project.tags.forEach(tag => {
            tags.add(tag);
        });
    });
    return Array.from(tags);
}
