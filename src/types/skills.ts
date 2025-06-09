export interface Skill {
    name: string;
    icon?: string;  // Icon name for the TechIcon component
    level?: number; // 1-5 scale
    description?: string;
    url?: string;  // URL to the technology's documentation
}

export interface SkillCategory {
    name: string;
    description: string;
    skills: Skill[];
    icon: string;  // React Icons name
    color: string; // Tailwind color class for the category
}
