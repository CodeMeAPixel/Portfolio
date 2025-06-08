import { SkillCategory } from "@/types/skills";

const authSkills: SkillCategory = {
    name: "Authentication & Security",
    description: "Implementing secure authentication and authorization systems.",
    icon: "IoShieldCheckmarkOutline",
    color: "text-red-400",
    skills: [
        {
            name: "OAuth 2.0",
            icon: "oauth",
            level: 4,
            description: "Industry-standard protocol for authorization."
        },
        {
            name: "JWT",
            icon: "jwt",
            level: 4,
            description: "JSON Web Tokens for secure data transmission and authentication."
        },
        {
            name: "NextAuth.js",
            icon: "nextauth",
            level: 4,
            description: "Authentication solution for Next.js applications."
        },
        {
            name: "Clerk",
            icon: "clerk",
            level: 4,
            description: "Complete user management solution with authentication and user profiles."
        },
        {
            name: "Auth0",
            icon: "auth0",
            level: 3,
            description: "Identity platform for authentication, authorization, and user management."
        },
        {
            name: "Firebase Auth",
            icon: "firebase",
            level: 4,
            description: "Authentication service with multiple sign-in methods."
        }
    ]
};

export default authSkills;
