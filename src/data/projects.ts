import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "NodeByte LTD",
    description: "Helping businesses transform their digital presence with cutting edge solutions.",
    images: [
      "/NodeByteLTD/home.png",
      "/NodeByteLTD/about.png",
      "/NodeByteLTD/services.png",
      "/NodeByteLTD/discord.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "RadixUI"],
    links: {
      slug: "nodebyte-ltd",
      demo: "https://nodebyte.co.uk",
      github: "https://github.com/NodeByteHosting"
    },
    featured: true
  },
  {
    id: "2",
    title: "NodeByte Hosting",
    description: "Fast, reliable, scalable and secure hosting services for your gaming experience.",
    images: [
      "/NodeByte/Home.png",
      "/NodeByte/MCServers.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion"],
    links: {
      slug: "nodebyte-hosting",
      demo: "https://nodebyte.host",
      github: "https://github.com/NodeByteHosting/Website"
    },
    featured: true
  }
];