export const cvData = {
    personal: {
        name: "Tyler. H",
        title: "Fullstack Developer",
        location: "Canada",
        email: "hello@codemeapixel.dev",
        website: "https://codemeapixel.dev",
        github: "https://github.com/CodeMeAPixel",
        summary: "Passionate fullstack developer with 10+ years of experience crafting exceptional digital experiences. Specializing in modern, responsive, and accessible web applications using cutting-edge technologies. Proven track record of leading development teams, managing complex projects, and delivering high-quality products."
    },
    experience: [
        {
            title: "System Administrator",
            company: "Purrquinox Technologies",
            location: "Remote",
            period: "Present",
            description: "Manage and maintain IT infrastructure, ensuring system reliability and security. Handle network administration, server management, and user support.",
            highlights: [
                "Maintain 99.9% uptime across all managed systems",
                "Implement security protocols and best practices",
                "Provide technical support and documentation"
            ]
        },
        {
            title: "Chief of Operations",
            company: "NodeByte",
            location: "Remote",
            period: "2024 - Present",
            description: "Lead the development team, contribute to daily operations, and ensure product quality. Mentor junior developers and oversee project delivery.",
            highlights: [
                "Lead a team of developers on multiple concurrent projects",
                "Implement agile development practices",
                "Mentor and guide junior team members"
            ]
        },
        {
            title: "Chief Executive Officer",
            company: "ByteBrush Studios",
            location: "Remote",
            period: "2020 - Present",
            description: "Oversee strategic direction, manage client relationships, and ensure successful project delivery.",
            highlights: [
                "Founded and grew the company from the ground up",
                "Manage client relationships and project scoping",
                "Lead technical architecture decisions"
            ]
        },
        {
            title: "Founder",
            company: "Emberly",
            location: "Remote",
            period: "2024 - Present",
            description: "Created Emberly, a modern file hosting platform with advanced features for developers and creators.",
            highlights: [
                "Built full-stack platform with Next.js and PostgreSQL",
                "Developed desktop companion app (Flicker) with Tauri",
                "Implemented secure authentication and file management"
            ]
        }
    ],
    certifications: [
        {
            title: "Fullstack Development",
            issuer: "Free Code Camp",
            period: "2020 - 2021",
            description: "Comprehensive curriculum covering HTML, CSS, JavaScript, React, Node.js, and MongoDB."
        },
        {
            title: "Frontend Development",
            issuer: "Free Code Camp",
            period: "2017 - 2018",
            description: "Curriculum covering HTML, CSS, JavaScript, and responsive design principles."
        },
        {
            title: "Backend Development",
            issuer: "Free Code Camp",
            period: "2016 - 2017",
            description: "Focused on Node.js, Express, and MongoDB. Developed RESTful APIs."
        }
    ],
    skills: {
        frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
        backend: ["Node.js", "Express", "Bun", "Elysia", "Go", "Python", "REST APIs", "GraphQL"],
        database: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"],
        devops: ["Docker", "Git", "GitHub Actions", "Vercel", "Linux", "Nginx"],
        tools: ["VS Code", "Figma", "Postman", "Tauri", "Rust"]
    },
    projects: [
        {
            name: "Emberly",
            description: "Modern file hosting platform for developers and creators",
            technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"]
        },
        {
            name: "Lexicon",
            description: "AI-powered writing assistant for content creators",
            technologies: ["React", "TypeScript", "AI/ML", "Node.js"]
        },
        {
            name: "Flicker",
            description: "Cross-platform screenshot and upload tool built with Tauri",
            technologies: ["Tauri", "React", "Rust", "TypeScript"]
        },
        {
            name: "ByteProxy",
            description: "Extensible web proxy for Discord and GitHub APIs",
            technologies: ["Bun", "Elysia", "TypeScript"]
        }
    ]
};

export type CVData = typeof cvData;
