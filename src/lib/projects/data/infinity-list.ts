import { Project } from "@/types/project";

const project: Project = {
    id: "infinity-list",
    title: "Infinity List",
    description: "Begin your Discord journey with our extensive directory, featuring a wide array of bots and servers.",
    longDescription: `
# Infinity List

**Infinity List** is pioneering the future of Discord bot and server discovery. As one of the most comprehensive platforms in the ecosystem, it empowers developers to showcase their bots with custom vanity links, attractive widgets, and tailored packs, making promotion effortless and effective.

## Key Features

For server owners and community managers, Infinity List offers:

- **Smart Discovery**: Intuitive filters by category, tags, or keywords enabling lightning-fast discovery of the perfect bots
- **Custom Widgets**: Beautiful, customizable widgets for bot promotion
- **Vanity Links**: Professional custom URLs for your bots and servers
- **Real-time Analytics**: Comprehensive dashboards with live statistics

## Technology Stack

Beyond simple listings, Infinity List emphasizes transparency and engagement through:

- **Real-time Updates**: Powered by WebSockets for instant status changes
- **Seamless Authentication**: OAuth2 integration with Discord for effortless management
- **Scalable Architecture**: Ensures performance remains smooth regardless of traffic
- **Advanced Search**: Lightning-fast discovery with intelligent filtering

## Impact

Making it the go-to hub for **millions of users worldwide**.

Whether you're a developer eager to grow your bot's reach or a server owner seeking the best tools for your community, Infinity List provides an all-in-one solution that simplifies growth, fosters discovery, and enhances your Discord experience.

> Join us on the forefront of Discord's bot ecosystem where discovery meets innovation!

## Development Journey

This project showcases my expertise in:

1. **Full-stack Development** - Next.js frontend with Go backend
2. **Database Design** - PostgreSQL optimization for millions of records
3. **Real-time Systems** - WebSocket implementation for live updates
4. **Community Building** - Growing from 0 to millions of users
5. **Team Leadership** - Managing a team of 9 developers

The platform continues to evolve, setting new standards for Discord bot and server discovery.
    `,
    images: [
        "/previews/infinitybots.gg/ibl-preview-1.png",
        "/previews/infinitybots.gg/ibl-preview-2.png",
        "/previews/infinitybots.gg/ibl-preview-3.png",
        "/previews/infinitybots.gg/ibl-preview-4.png"
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Go", "WebSocket", "OAuth2"],
    links: {
        demo: "https://infinitybots.gg",
        github: "https://github.com/InfinityBotList",
        documentation: "https://docs.infinitybots.gg",
        support: "https://discord.gg/infinitybots"
    },
    featured: true,
    technologies: [
        { name: "Next.js", description: "React framework for server-side rendering, static site generation, and high-performance frontend." },
        { name: "React", description: "Component-based UI library for building interactive user interfaces." },
        { name: "TypeScript", description: "Typed superset of JavaScript for safer, more maintainable code." },
        { name: "Python", description: "Used for Discord bots and automation tasks within the ecosystem." },
        { name: "Go", description: "Backend API and worker services, chosen for concurrency and performance." },
        { name: "Rust", description: "Performance-critical microservices and background jobs." },
        { name: "PostgreSQL", description: "Relational database for storing user data, bot/server info, and analytics." },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid, responsive UI development." },
        { name: "WebSocket", description: "Real-time updates for bot status, metrics, and notifications." },
        { name: "OAuth2", description: "Secure Discord authentication for bot and server management." },
        { name: "Redis", description: "In-memory data store used for caching in the website and API for fast data access." },
        { name: "SWR", description: "React Hooks library for remote data fetching and caching, used as a query client from the website to the API." }
    ],
    challenges: [
        "Scaling infrastructure to support millions of bot and server listings efficiently.",
        "Maintaining real-time data synchronization globally with minimal latency.",
        "Creating an intuitive UI that balances simplicity with advanced search and filter options.",
        "Moderation and community engagement while ensuring data privacy and security."
    ],
    solutions: [
        "Implemented horizontal scaling with load balancers and database sharding.",
        "Developed websocket-based real-time updates for bot statuses and user interactions.",
        "Built an accessible, mobile-optimized UI with Tailwind CSS components and state management.",
        "Integrated OAuth2 for secure login and permissions, leveraging Discord's API."
    ],
    keyFeatures: [
        "Smart search filters for bots and servers based on categories, tags, or custom keywords.",
        "Custom widget and vanity link generation for easier bot promotion.",
        "Comprehensive analytics dashboard for bot owners and server admins.",
        "Automated moderation tools and community moderation support.",
        "Seamless Discord OAuth2 login for effortless bot management.",
        "Powerful API for developers to integrate platform features into their own tools."
    ],
    date: "2020-09-24",
    role: "Founder & Lead Developer",
    teamSize: 9
};

export default project;