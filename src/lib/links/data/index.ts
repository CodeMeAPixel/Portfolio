import { LinkHubProfile } from "@/types/links";
import { socialLinks } from "./social-links";
import { categories } from "./categories";

export const linkHubProfile: LinkHubProfile = {
    name: "CodeMeAPixel",
    avatar: "/character.png",
    title: "Full Stack Developer & Designer",
    bio: "I build web applications and design user experiences. Connect with me on these platforms or check out my projects.",
    featuredLinks: [
        {
            id: "portfolio",
            title: "Portfolio",
            url: "https://codemeapixel.dev",
            icon: "IoGlobeOutline",
            description: "Check out my portfolio website",
            color: "bg-blue-500",
            featured: true
        },
        {
            id: "github",
            title: "GitHub",
            url: "https://github.com/codemeapixel",
            icon: "IoLogoGithub",
            description: "View my open source projects",
            color: "bg-gray-800",
            featured: true
        },
        {
            id: "projects",
            title: "Projects",
            url: "/projects",
            icon: "IoCodeSlashOutline",
            description: "See my latest work",
            color: "bg-purple-500",
            featured: true
        }
    ],
    socialLinks,
    categories
};
