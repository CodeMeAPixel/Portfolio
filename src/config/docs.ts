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
import { FaHome } from "react-icons/fa";

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
            name: "Game Scripts",
            slug: "game-scripts",
            icon: IoLayers,
            description: "Documentation for all my Game Scripts from FiveM to RedM, Minecraft and more.",
            categories: [
                {
                    title: "Basics",
                    items: [
                        {
                            title: "Overview",
                            href: "/docs/game-scripts",
                            icon: IoBook,
                            description: "Learn about this portfolio's architecture and features.",
                        }
                    ],
                },
            ],
        },
        {
            name: "FXServer Management",
            slug: "server-management",
            icon: IoGameController,
            description: "Documentation for FiveM/GTA V scripts",
            categories: [
                {
                    title: "Basics",
                    items: [
                        {
                            title: "Overview",
                            href: "/docs/server-management",
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
                }
            ],
        },
    ],
    quickLinks: [
        {
            name: "Home",
            href: "/",
            icon: FaHome
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
