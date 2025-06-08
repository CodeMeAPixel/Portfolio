import { Project } from "@/types/project";

const project: Project = {
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
};

export default project;
