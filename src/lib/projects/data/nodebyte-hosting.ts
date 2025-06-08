import { Project } from "@/types/project";

const project: Project = {
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
        { name: "Nextjs", description: "Powers the frontend with server-side rendering and static site generation" },
        { name: "TypeScript", description: "Ensures type safety and improves developer experience" },
        { name: "Framer", description: "Creates smooth, polished animations and transitions" },
        { name: "Radix", description: "Provides accessible, unstyled UI components" },
        { name: "Tailwind CSS", description: "Enables rapid UI development with utility-first approach" },
        { name: "React Query", description: "Manages server state and caching for optimized data fetching" },
        { name: "Nodejs", description: "Runs the backend API for game server management" },
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
            quote: "The excellent panel design Fast response from staff members seeking support. Good prices for what they offer.",
            author: "Ollie",
            position: "21 March 2024"
        }
    ]
};

export default project;
