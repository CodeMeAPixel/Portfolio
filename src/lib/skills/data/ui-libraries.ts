import { SkillCategory } from "@/types/skills";

const uiLibrariesSkills: SkillCategory = {
    name: "UI Libraries & Frameworks",
    description: "Component libraries and frameworks for building consistent UI experiences.",
    icon: "IoLayersOutline",
    color: "text-indigo-400",
    skills: [
        {
            name: "Shadcn UI",
            icon: "shadcn",
            level: 4,
            description: "Building beautiful, accessible components with Radix UI and Tailwind CSS."
        },
        {
            name: "Material UI",
            icon: "mui",
            level: 4,
            description: "React component library based on Google's Material Design."
        },
        {
            name: "Radix UI",
            icon: "radix",
            level: 4,
            description: "Unstyled, accessible components for building design systems."
        },
        {
            name: "Chakra UI",
            icon: "chakra",
            level: 4,
            description: "Component library focused on accessibility and ease of use."
        },
        {
            name: "Headless UI",
            icon: "headless",
            level: 4,
            description: "Unstyled, accessible UI components with great flexibility."
        },
        {
            name: "Tailwind CSS",
            icon: "tailwindcss",
            level: 5,
            description: "Utility-first CSS framework for rapid UI development."
        },
        {
            name: "Bootstrap",
            icon: "bootstrap",
            level: 4,
            description: "Component-based CSS framework for responsive designs."
        }
    ]
};

export default uiLibrariesSkills;
