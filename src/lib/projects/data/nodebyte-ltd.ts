import { Project } from "@/types/project";

const project: Project = {
    id: "nodebyte-ltd",
    title: "NodeByte LTD",
    description: "Helping businesses transform their digital presence with cutting edge solutions.",
    longDescription: "A passionate team of tech experts dedicated to helping businesses succeed through innovative technology solutions.",
    images: [
        "/NodeByteLTD/home.png",
        "/NodeByteLTD/about.png",
        "/NodeByteLTD/services.png",
        "/NodeByteLTD/discord.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "RadixUI"],
    links: {
        demo: "https://nodebyte.co.uk",
        github: "https://github.com/NodeByteHosting"
    },
    featured: true,
    technologies: [
        { name: "Next.js", description: "For server-side rendering and static site generation" },
        { name: "React", description: "Building interactive user interfaces" },
        { name: "TypeScript", description: "Type-safe code development" },
        { name: "Framer Motion", description: "Creating smooth animations" },
        { name: "RadixUI", description: "Accessible component primitives" }
    ],
    keyFeatures: [
        "Responsive web design",
        "Custom software solutions",
        "Business process automation",
        "Digital transformation consulting"
    ],
    date: "2022-05-15"
};

export default project;
