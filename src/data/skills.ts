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

export const skillsData: SkillCategory[] = [
    {
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
            }
        ]
    },
    {
        name: "Backend Development",
        description: "Creating scalable server-side applications and APIs to power web experiences.",
        icon: "IoServerOutline",
        color: "text-green-400",
        skills: [
            {
                name: "Node.js",
                icon: "nodejs",
                level: 4,
                description: "Building server-side applications and APIs with JavaScript/TypeScript."
            },
            {
                name: "Express.js",
                icon: "express",
                level: 4,
                description: "Creating REST APIs and web servers with the Express framework."
            },
            {
                name: "Go",
                icon: "go",
                level: 3,
                description: "Developing high-performance microservices and APIs."
            },
            {
                name: "Python",
                icon: "python",
                level: 3,
                description: "Server-side development and automation scripting."
            },
            {
                name: "Java",
                icon: "java",
                level: 3,
                description: "Backend development with Spring Boot and enterprise applications."
            },
            {
                name: "PHP",
                icon: "php",
                level: 3,
                description: "Web development with PHP frameworks like Laravel."
            },
            {
                name: "GraphQL",
                icon: "graphql",
                level: 4,
                description: "Designing and implementing GraphQL APIs for flexible data fetching."
            },
            {
                name: "REST API",
                icon: "api",
                level: 5,
                description: "Designing and implementing RESTful services following best practices."
            }
        ]
    },
    {
        name: "Database & Storage",
        description: "Managing and optimizing data storage solutions for applications.",
        icon: "IoServerOutline",
        color: "text-yellow-400",
        skills: [
            {
                name: "MongoDB",
                icon: "mongodb",
                level: 4,
                description: "Document-based NoSQL database design and optimization."
            },
            {
                name: "PostgreSQL",
                icon: "postgresql",
                level: 4,
                description: "Relational database design, optimization, and advanced queries."
            },
            {
                name: "MySQL",
                icon: "mysql",
                level: 4,
                description: "Relational database management and optimization."
            },
            {
                name: "Redis",
                icon: "redis",
                level: 3,
                description: "In-memory data structure store used for caching and real-time applications."
            },
            {
                name: "Firestore",
                icon: "firebase",
                level: 4,
                description: "Cloud-hosted NoSQL database with real-time capabilities."
            },
            {
                name: "SQL",
                icon: "database",
                level: 4,
                description: "Writing complex queries, joins, and optimizing database performance."
            }
        ]
    },
    {
        name: "DevOps & Deployment",
        description: "Automating, deploying, and maintaining applications in production environments.",
        icon: "IoCloudUploadOutline",
        color: "text-purple-400",
        skills: [
            {
                name: "Docker",
                icon: "docker",
                level: 4,
                description: "Containerizing applications for consistent development and deployment."
            },
            {
                name: "Kubernetes",
                icon: "kubernetes",
                level: 3,
                description: "Orchestrating containerized applications for scaling and management."
            },
            {
                name: "AWS",
                icon: "aws",
                level: 3,
                description: "Cloud infrastructure including EC2, S3, Lambda, and more."
            },
            {
                name: "Vercel",
                icon: "vercel",
                level: 5,
                description: "Deploying and scaling frontend applications and serverless functions."
            },
            {
                name: "Netlify",
                icon: "netlify",
                level: 4,
                description: "Continuous deployment for static sites and serverless functions."
            },
            {
                name: "GitHub Actions",
                icon: "github",
                level: 4,
                description: "CI/CD workflows for automated testing and deployment."
            },
            {
                name: "Google Cloud",
                icon: "gcp",
                level: 3,
                description: "Cloud infrastructure and services for application hosting."
            }
        ]
    },
    {
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
    },
    {
        name: "UI Libraries & Frameworks",
        description: "Component libraries and frameworks for building consistent UI experiences.",
        icon: "IoLayersOutline",
        color: "text-indigo-400",
        skills: [
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
    }
];
