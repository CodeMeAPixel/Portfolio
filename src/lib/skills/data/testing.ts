import { SkillCategory } from "@/types/skills";

const testingSkills: SkillCategory = {
    name: "Testing & Quality Assurance",
    description: "Ensuring application quality through comprehensive testing strategies.",
    icon: "IoCheckmarkCircleOutline",
    color: "text-amber-400",
    skills: [
        {
            name: "Jest",
            icon: "jest",
            level: 4,
            description: "JavaScript testing framework for unit and integration tests."
        },
        {
            name: "React Testing Library",
            icon: "testing-library",
            level: 4,
            description: "Testing utilities focused on user behavior for React applications."
        },
        {
            name: "Cypress",
            icon: "cypress",
            level: 3,
            description: "End-to-end testing framework for web applications."
        },
        {
            name: "Playwright",
            icon: "playwright",
            level: 3,
            description: "Framework for reliable end-to-end testing for modern web apps."
        },
        {
            name: "Vitest",
            icon: "vitest",
            level: 3,
            description: "Next-generation testing framework powered by Vite."
        },
        {
            name: "Storybook",
            icon: "storybook",
            level: 4,
            description: "Tool for developing UI components in isolation."
        }
    ]
};

export default testingSkills;
