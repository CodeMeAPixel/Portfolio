import { SkillCategory } from "@/types/skills";

const frontendSkills: SkillCategory = {
    name: "Frontend Development",
    description: "Building responsive and performant user interfaces with modern frameworks and libraries.",
    icon: "IoCodeSlashOutline",
    color: "text-blue-400",
    skills: [
        {
            name: "React",
            icon: "react",
            level: 5,
            description: "Building complex, interactive UIs with React and its ecosystem including hooks, context, and state management libraries."
        },
        {
            name: "Next.js",
            icon: "nextjs",
            level: 5,
            description: "Creating high-performance web applications with server-side rendering, static generation, and API routes."
        },
        {
            name: "TypeScript",
            icon: "typescript",
            level: 4,
            description: "Developing type-safe applications with TypeScript for improved code quality and developer experience."
        },
        {
            name: "JavaScript",
            icon: "javascript",
            level: 5,
            description: "Extensive experience with modern JavaScript (ES6+) features and patterns."
        },
        {
            name: "HTML5",
            icon: "html5",
            level: 5,
            description: "Semantic markup and accessible web development."
        },
        {
            name: "CSS3",
            icon: "css3",
            level: 5,
            description: "Advanced styling including Flexbox, Grid, and CSS animations."
        },
        {
            name: "Tailwind CSS",
            icon: "tailwindcss",
            level: 5,
            description: "Rapid UI development using utility classes and customizing design systems."
        },
        {
            name: "Framer Motion",
            icon: "framer",
            level: 4,
            description: "Creating fluid animations and interactive UI components."
        },
        {
            name: "Redux",
            icon: "redux",
            level: 4,
            description: "State management for complex applications."
        },
        {
            name: "Vue.js",
            icon: "vuejs",
            level: 3,
            description: "Building reactive interfaces with Vue's component system."
        },
        {
            name: "Angular",
            icon: "angular",
            level: 3,
            description: "Developing enterprise-grade applications with Angular's comprehensive framework."
        },
        {
            name: "Svelte",
            icon: "svelte",
            level: 3,
            description: "Building highly efficient reactive applications with minimal boilerplate."
        }
    ]
};

export default frontendSkills;
