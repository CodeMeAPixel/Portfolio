import {
    IoBook,
    IoLogoGithub,
    IoHelpCircle,
    IoCodeSlash,
    IoRocket,
    IoLayers,
    IoTerminal,
    IoCube,
    IoExtensionPuzzle,
    IoGlobe,
    IoServer,
    IoGameController,
    IoChatbubbles,
    IoShield,
    IoSpeedometer,
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
    projectUrl?: string;
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
            name: "Portfolio",
            slug: "portfolio",
            icon: IoLayers,
            description: "Documentation for this portfolio website",
            projectUrl: "https://github.com/CodeMeAPixel/Portfolio",
            categories: [
                {
                    title: "Getting Started",
                    items: [
                        {
                            title: "Overview",
                            href: "/docs/portfolio",
                            icon: IoBook,
                            description: "Learn about this portfolio's architecture and features.",
                        },
                        {
                            title: "Installation",
                            href: "/docs/portfolio/installation",
                            icon: IoTerminal,
                            description: "Get the portfolio running locally on your machine.",
                        },
                        {
                            title: "Configuration",
                            href: "/docs/portfolio/configuration",
                            icon: IoExtensionPuzzle,
                            description: "Customize themes, content, and settings.",
                        },
                    ],
                },
                {
                    title: "Features",
                    items: [
                        {
                            title: "Theme System",
                            href: "/docs/portfolio/themes",
                            icon: IoLayers,
                            description: "26 unique themes with custom color palettes.",
                        },
                        {
                            title: "Blog System",
                            href: "/docs/portfolio/blog",
                            icon: IoBook,
                            description: "MDX-powered blog with syntax highlighting.",
                        },
                        {
                            title: "Components",
                            href: "/docs/portfolio/components",
                            icon: IoCube,
                            description: "Reusable UI components and glassmorphism effects.",
                        },
                    ],
                },
            ],
        },
        {
            name: "FiveM Scripts",
            slug: "fivem",
            icon: IoGameController,
            description: "Documentation for FiveM/GTA V scripts",
            categories: [
                {
                    title: "Getting Started",
                    items: [
                        {
                            title: "Overview",
                            href: "/docs/fivem",
                            icon: IoBook,
                            description: "Introduction to my FiveM script collection.",
                        },
                        {
                            title: "Installation",
                            href: "/docs/fivem/installation",
                            icon: IoTerminal,
                            description: "How to install scripts on your FiveM server.",
                        },
                    ],
                },
                {
                    title: "Scripts",
                    items: [
                        {
                            title: "pxl-mdt",
                            href: "/docs/fivem/pxl-mdt",
                            icon: IoShield,
                            description: "Mobile Data Terminal for police/EMS roleplay.",
                        },
                        {
                            title: "pxl-garage",
                            href: "/docs/fivem/pxl-garage",
                            icon: IoCube,
                            description: "Advanced vehicle garage system.",
                        },
                        {
                            title: "pxl-hud",
                            href: "/docs/fivem/pxl-hud",
                            icon: IoSpeedometer,
                            description: "Customizable player HUD interface.",
                        },
                    ],
                },
            ],
        },
        {
            name: "Discord Bots",
            slug: "discord",
            icon: IoChatbubbles,
            description: "Documentation for Discord bot projects",
            categories: [
                {
                    title: "Overview",
                    items: [
                        {
                            title: "Introduction",
                            href: "/docs/discord",
                            icon: IoBook,
                            description: "Overview of my Discord bot projects.",
                        },
                    ],
                },
                {
                    title: "Bots",
                    items: [
                        {
                            title: "Pixel Bot",
                            href: "/docs/discord/pixel-bot",
                            icon: IoCodeSlash,
                            description: "Multi-purpose Discord bot with moderation features.",
                        },
                        {
                            title: "Music Bot",
                            href: "/docs/discord/music-bot",
                            icon: IoRocket,
                            description: "High-quality music streaming bot.",
                        },
                    ],
                },
            ],
        },
        {
            name: "Web Projects",
            slug: "web",
            icon: IoGlobe,
            description: "Documentation for web applications",
            categories: [
                {
                    title: "Overview",
                    items: [
                        {
                            title: "Introduction",
                            href: "/docs/web",
                            icon: IoBook,
                            description: "Overview of my web development projects.",
                        },
                    ],
                },
                {
                    title: "Projects",
                    items: [
                        {
                            title: "API Services",
                            href: "/docs/web/api-services",
                            icon: IoServer,
                            description: "RESTful API documentation and examples.",
                        },
                        {
                            title: "UI Libraries",
                            href: "/docs/web/ui-libraries",
                            icon: IoCube,
                            description: "Custom UI component libraries.",
                        },
                    ],
                },
            ],
        },
    ],
    quickLinks: [
        {
            name: "GitHub",
            href: "https://github.com/CodeMeAPixel",
            icon: IoLogoGithub,
        },
        {
            name: "Contact",
            href: "/contact",
            icon: IoHelpCircle,
        },
        {
            name: "Projects",
            href: "/projects",
            icon: IoCodeSlash,
        },
    ],
};
