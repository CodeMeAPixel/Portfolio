import { Project } from "@/types/project";

const project: Project = {
    id: "nodebyte-ltd",
    title: "NodeByte LTD",
    description: "Helping businesses transform their digital presence with cutting edge solutions.",
    longDescription: "A passionate team of tech experts dedicated to helping businesses succeed through innovative technology solutions.",
    images: [
        "/previews/nodebyte.co.uk/home.png",
        "/previews/nodebyte.co.uk/about.png",
        "/previews/nodebyte.co.uk/careers.png",
        "/previews/nodebyte.co.uk/faqs.png",
        "/previews/nodebyte.co.uk/legal.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "RadixUI"],
    links: {
        demo: "https://nodebyte.co.uk",
        github: "https://github.com/NodeByteHosting"
    },
    featured: false,
    technologies: [
        { name: "Next.js", description: "For server-side rendering and static site generation" },
        { name: "Node.js", description: "Backend API development for upload management." },
        { name: "React", description: "Building interactive user interfaces" },
        { name: "TypeScript", description: "Type-safe code development" },
        { name: "Framer", description: "Creating smooth animations" },
        { name: "Radix", description: "Accessible component primitives" }
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
