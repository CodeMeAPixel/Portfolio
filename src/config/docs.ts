import {
    IoBook,
    IoBrowsers,
    IoServer,
    IoHammer,
    IoTerminal,
    IoGitBranch,
    IoRocket,
    IoSpeedometer,
    IoLayers,
    IoCodeSlash,
    IoGlobe,
    IoLogoGithub,
    IoCloud,
    IoHelpCircle,
    IoExtensionPuzzle,
    IoGrid,
    IoPulse,
    IoShield,
    IoColorPalette,
} from "react-icons/io5";
import { IconType } from "react-icons";

interface DocItem {
    title: string;
    href: string;
    icon?: IconType;
    description: string;
    keywords?: string[];
}

interface DocCategory {
    title: string;
    items: DocItem[];
}

interface DocSection {
    name: string;
    slug: string;
    icon: IconType;
    description: string;
    categories: DocCategory[];
}

interface QuickLink {
    name: string;
    href: string;
    icon: IconType;
}

export const docsConfig: {
    sections: DocSection[];
    quickLinks: QuickLink[];
} = {
    sections: [
        {
            name: "Getting Started",
            slug: "getting-started",
            icon: IoRocket,
            description: "Start your journey with our platform",
            categories: [
                {
                    title: "Introduction",
                    items: [
                        {
                            title: "Overview",
                            href: "/docs/getting-started",
                            icon: IoBook,
                            description: "Learn about the purpose and structure of this documentation.",
                        },
                        {
                            title: "Quick Start Guide",
                            href: "/docs/getting-started/quick-start",
                            icon: IoRocket,
                            description: "Get up and running quickly with our starter templates.",
                        },
                        {
                            title: "Installation",
                            href: "/docs/getting-started/installation",
                            icon: IoHammer,
                            description: "Step-by-step installation instructions for different platforms.",
                        },
                    ],
                },
                {
                    title: "Core Concepts",
                    items: [
                        {
                            title: "Project Structure",
                            href: "/docs/getting-started/structure",
                            icon: IoGrid,
                            description: "Understanding the organization of project files and directories.",
                        },
                        {
                            title: "Configuration",
                            href: "/docs/getting-started/config",
                            icon: IoTerminal,
                            description: "Configuring your environment and application settings.",
                        },
                    ],
                },
            ],
        },
        {
            name: "Frontend",
            slug: "frontend",
            icon: IoBrowsers,
            description: "Build beautiful user interfaces",
            categories: [
                {
                    title: "UI Components",
                    items: [
                        {
                            title: "Component Library",
                            href: "/docs/frontend/components",
                            icon: IoExtensionPuzzle,
                            description: "Explore the component library and usage examples.",
                            keywords: ["ui", "interface", "react", "jsx", "tsx"],
                        },
                        {
                            title: "Styling System",
                            href: "/docs/frontend/styling",
                            icon: IoColorPalette,
                            description: "Learn how to use the styling system with Tailwind CSS.",
                        },
                        {
                            title: "Animations",
                            href: "/docs/frontend/animations",
                            icon: IoSpeedometer,
                            description: "Add motion and animations to your application.",
                        },
                    ],
                },
                {
                    title: "Data & State",
                    items: [
                        {
                            title: "State Management",
                            href: "/docs/frontend/state",
                            icon: IoPulse,
                            description: "Managing application state effectively.",
                        },
                        {
                            title: "Data Fetching",
                            href: "/docs/frontend/data-fetching",
                            icon: IoCloud,
                            description: "Strategies for fetching and caching data.",
                        },
                    ],
                },
            ],
        },
        {
            name: "Backend",
            slug: "backend",
            icon: IoServer,
            description: "Server-side development and APIs",
            categories: [
                {
                    title: "API",
                    items: [
                        {
                            title: "API Reference",
                            href: "/docs/backend/api",
                            icon: IoGlobe,
                            description: "Complete API documentation with examples.",
                        },
                        {
                            title: "Authentication",
                            href: "/docs/backend/auth",
                            icon: IoShield,
                            description: "Learn about authentication methods and implementation.",
                        },
                        {
                            title: "Database Models",
                            href: "/docs/backend/models",
                            icon: IoLayers,
                            description: "Database schema and model reference.",
                        },
                    ],
                },
                {
                    title: "Server",
                    items: [
                        {
                            title: "Server Configuration",
                            href: "/docs/backend/server-config",
                            icon: IoTerminal,
                            description: "Configuring and optimizing your server.",
                        },
                        {
                            title: "Middleware",
                            href: "/docs/backend/middleware",
                            icon: IoExtensionPuzzle,
                            description: "Using and creating custom middleware.",
                        },
                    ],
                },
            ],
        },
        {
            name: "Deployment",
            slug: "deployment",
            icon: IoCloud,
            description: "Deploy your application to production",
            categories: [
                {
                    title: "Build & Deploy",
                    items: [
                        {
                            title: "Build Process",
                            href: "/docs/deployment/build",
                            icon: IoHammer,
                            description: "Learn how to build your application for production.",
                        },
                        {
                            title: "Hosting Options",
                            href: "/docs/deployment/hosting",
                            icon: IoCloud,
                            description: "Compare different hosting providers and deployment strategies.",
                        },
                        {
                            title: "CI/CD Pipeline",
                            href: "/docs/deployment/ci-cd",
                            icon: IoGitBranch,
                            description: "Set up continuous integration and deployment workflows.",
                        },
                    ],
                },
                {
                    title: "Production",
                    items: [
                        {
                            title: "Performance",
                            href: "/docs/deployment/performance",
                            icon: IoSpeedometer,
                            description: "Optimizing performance in production environments.",
                        },
                        {
                            title: "Monitoring",
                            href: "/docs/deployment/monitoring",
                            icon: IoPulse,
                            description: "Monitoring and maintaining your application.",
                        },
                    ],
                },
            ],
        },
    ],
    quickLinks: [
        {
            name: "GitHub",
            href: "https://github.com/codemeapixel",
            icon: IoLogoGithub,
        },
        {
            name: "Support",
            href: "/contact",
            icon: IoHelpCircle,
        },
        {
            name: "API Status",
            href: "/status",
            icon: IoPulse,
        },
        {
            name: "Examples",
            href: "/examples",
            icon: IoCodeSlash,
        },
    ],
};
