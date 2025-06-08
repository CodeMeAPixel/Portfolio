import { SkillCategory } from "@/types/skills";

const databaseSkills: SkillCategory = {
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
        },
        {
            name: "Supabase",
            icon: "supabase",
            level: 4,
            description: "Open-source Firebase alternative with PostgreSQL database, authentication, and storage."
        },
        {
            name: "Prisma",
            icon: "prisma",
            level: 4,
            description: "Next-generation ORM for Node.js and TypeScript."
        },
        {
            name: "Drizzle ORM",
            icon: "drizzle",
            level: 3,
            description: "TypeScript ORM with a focus on type safety and developer experience."
        }
    ]
};

export default databaseSkills;
