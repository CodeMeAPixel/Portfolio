import { SkillCategory } from "@/types/skills";

const backendSkills: SkillCategory = {
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
            name: "Fastify",
            icon: "fastify",
            level: 4,
            description: "High-performance, low-overhead web framework for Node.js."
        },
        {
            name: "Elysia.js",
            icon: "bun",
            level: 3,
            description: "TypeScript-first, Bun-focused framework for building blazing fast web services."
        },
        {
            name: "NestJS",
            icon: "nestjs",
            level: 3,
            description: "Progressive Node.js framework for scalable server-side applications."
        },
        {
            name: "Hono",
            icon: "hono",
            level: 3,
            description: "Ultrafast web framework for the Edges, supporting all JavaScript runtimes."
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
};

export default backendSkills;
