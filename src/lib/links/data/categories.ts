import { LinkCategory } from "@/types/links";

export const categories: LinkCategory[] = [
    {
        id: "projects",
        name: "Projects",
        icon: "IoCodeSlashOutline",
        color: "text-purple-500",
        links: [
            {
                id: "portfolio",
                title: "Portfolio Website",
                url: "https://codemeapixel.dev",
                icon: "IoGlobeOutline",
                description: "My personal portfolio built with Next.js",
                color: "bg-blue-500"
            },
            {
                id: "nodebyte-ltd",
                title: "NodeByte LTD",
                url: "https://nodebyte.co.uk",
                icon: "IoGlobeOutline",
                description: "Professional web development company",
                color: "bg-green-500"
            },
            {
                id: "nodebyte-hosting",
                title: "NodeByte Hosting",
                url: "https://nodebyte.host",
                icon: "IoGlobeOutline",
                description: "",
                color: "bg-green-600"
            }
        ]
    },
    {
        id: "services",
        name: "Services",
        icon: "IoServerOutline",
        color: "text-blue-500",
        links: [
            {
                id: "fivem",
                title: "FiveM Scripts",
                url: "/fivem",
                icon: "IoGameControllerOutline",
                description: "Custom scripts for FiveM servers",
                color: "bg-orange-500"
            },
            {
                id: "web-development",
                title: "Web Development",
                url: "/contact",
                icon: "IoCodeOutline",
                description: "Custom web development services",
                color: "bg-indigo-500"
            }
        ]
    },
    {
        id: "resources",
        name: "Resources",
        icon: "IoBookOutline",
        color: "text-green-500",
        links: [
            {
                id: "blog",
                title: "Blog",
                url: "/blog",
                icon: "IoNewspaperOutline",
                description: "Tutorials and articles on web development",
                color: "bg-pink-500"
            },
            {
                id: "github",
                title: "GitHub Repositories",
                url: "https://github.com/codemeapixel",
                icon: "IoLogoGithub",
                description: "Open source projects and code examples",
                color: "bg-gray-800"
            }
        ]
    }
];
