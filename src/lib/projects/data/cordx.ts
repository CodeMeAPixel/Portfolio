import { Project } from "@/types/project";

const project: Project = {
    id: "cordx",
    title: "CordX",
    description: "The all-in-one platform for seamless file sharing and media hosting with customizable features.",
    longDescription: `
# CordX

**CordX** is revolutionizing media sharing by providing a fast, secure, and highly customizable file hosting platform tailored for communities, creators, and developers alike. Whether you're sharing large media files, hosting images, or managing uploads for projects, CordX makes it effortless with a focus on speed, security, and user control.

## Key Features

For users and organizations, CordX offers:

- **Custom Domains & CNAMEs**: Fully configurable domains for branding and ease of access.
- **Fast Uploads & Downloads**: Powered by streamlined server architecture designed for large files and high traffic.
- **Secure Uploads**: Supports authentication, permissions, and encrypted transfers.
- **Rich Media Support**: Automatic handling for images, videos, and other media types with preview capabilities.
- **API Access**: Robust REST API for integrating uploads, management, and retrieval into your own apps.

## Technology Stack

CordX is built for reliability and scalability, leveraging:

- **Node.js & Express**: For fast, scalable backend API endpoints.
- **React & Next.js**: For an intuitive, responsive user interface.
- **PostgreSQL**: Robust relational database for storing user data, upload metadata, and permissions.
- **Cloud Storage Solutions**: Integration with services like AWS S3 or equivalent for file hosting.
- **OAuth2 & JWT**: For secure user authentication and permissions management.
- **CDN & Caching**: To ensure fast delivery of media content worldwide.
- **Webhooks & API Hooks**: Automate workflows and integrations.

## Impact

CordX aims to be the go-to decentralized media hosting platform for artists, developers, and communities looking for privacy, speed, and customization. It empowers users to deploy their own branded upload solutions, integrate with existing tools, and manage media efficiently, all in a secure environment.

> With CordX, sharing your digital world has never been easier or more customizable!

## Development Journey

This project showcases my expertise in:

1. **Full-stack Development** - Combining React for front-end and Node.js for backend APIs.
2. **Cloud & Infrastructure Management** - Deploying scalable solutions with cloud storage and CDN.
3. **Security Best Practices** - Implementing secure file transfers, authentication, and user permissions.
4. **API Design & Integration** - Building comprehensive and developer-friendly APIs.
5. **User Experience** - Focusing on accessibility, mobile-first design, and smooth workflows.

The platform continues to evolve, adding new features to give users complete control over their media sharing experience.
`,
    images: [
        "/previews/cordx.ca/home.png",
        "/previews/cordx.ca/features.png",
        "/previews/cordx.ca/dashboard.png",
        "/previews/cordx.ca/metrics.png"
    ],
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    links: {
        demo: "https://cordx.ca",
        github: "https://github.com/CordXApp",
        documentation: "https://docs.cordx.ca",
        support: "https://discord.gg/cordx"
    },
    featured: true,
    technologies: [
        { name: "Next.js", description: "For server-side rendering and frontend optimization." },
        { name: "React", description: "Building an intuitive, responsive user interface." },
        { name: "Node.js", description: "Backend API development for upload management." },
        { name: "Fastify", description: "Fast and low overhead web framework for Node.js with high-performance routing." },
        { name: "PostgreSQL", description: "Storing user profiles, permissions, and upload metadata with ACID compliance." },
        { name: "Prisma", description: "Type-safe database ORM for seamless database operations and migrations." },
        { name: "Next Auth", description: "Secure authentication with OAuth providers and session management." },
        { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development and consistent design." },
        { name: "Radix", description: "Unstyled, accessible UI components for building custom design systems." },
        { name: "Framer", description: "Production-ready motion library for React animations and interactions." },
        { name: "Zustand", description: "Small, fast, and scalable state management solution for React applications." },
        { name: "Zod", description: "TypeScript-first schema validation with static type inference for data validation." }
    ],
    challenges: [
        " Ensuring secure, scalable uploads handling media of various sizes.",
        " Implementing flexible domain configurations for user customization.",
        " Maintaining high speed and low latency for large media files.",
        " Providing comprehensive permissions and access controls."
    ],
    solutions: [
        " Leveraged cloud storage optimized for large file hosting with CDN integration.",
        " Developed a microservice-based architecture with OAuth2 for secure auth.",
        " Built an adaptive, responsive UI with React and Next.js for a seamless user experience.",
        " Implemented role-based permissions and comprehensive API controls."
    ],
    keyFeatures: [
        "Custom domain and CNAME support for branding.",
        "Fast, secure media uploads and downloads.",
        "Media previews, thumbnail generation, and auto-optimization.",
        "User authentication with OAuth2 and JWT.",
        "API access for integration into other tools and workflows.",
        "Robust permissions and privacy controls."
    ],
    date: "2021-07-31",
    role: "Founder & Lead Developer",
    teamSize: 5
};

export default project;