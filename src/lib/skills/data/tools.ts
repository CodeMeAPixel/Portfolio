import { SkillCategory } from "@/types/skills";

const toolsSkills: SkillCategory = {
    name: "Tools & Utilities",
    description: "Essential tools and utilities that support the development workflow.",
    icon: "IoHammerOutline",
    color: "text-rose-400",
    skills: [
        {
            name: "Git",
            icon: "git",
            level: 5,
            description: "Version control and collaborative development workflows."
        },
        {
            name: "GitHub",
            icon: "github",
            level: 5,
            description: "Collaborative development using pull requests, issues, and project management."
        },
        {
            name: "VS Code",
            icon: "vscode",
            level: 5,
            description: "Primary code editor with advanced extensions and customizations."
        },
        {
            name: "Figma",
            icon: "figma",
            level: 4,
            description: "UI/UX design and collaboration with design teams."
        },
        {
            name: "Webpack",
            icon: "webpack",
            level: 4,
            description: "Module bundling and asset optimization for web applications."
        },
        {
            name: "Jest",
            icon: "jest",
            level: 4,
            description: "JavaScript testing framework for unit and integration tests."
        },
        {
            name: "Cypress",
            icon: "cypress",
            level: 3,
            description: "End-to-end testing for web applications."
        },
        {
            name: "Storybook",
            icon: "storybook",
            level: 4,
            description: "Component development and documentation in isolation."
        }
    ]
};

export default toolsSkills;
