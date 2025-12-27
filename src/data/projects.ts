import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "emberly",
    title: "Emberly",
    description: "File Sharing, Forged in Fire.",
    images: [
      "/previews/emberly/home.png",
      "/previews/emberly/about.png",
      "/previews/emberly/dashboard.png",
      "/previews/emberly/analytics.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Open Source"],
    links: {
      slug: "emberly",
      demo: "https://embrly.ca",
      github: "https://github.com/EmberlyOSS"
    },
    featured: true
  },
  {
    id: "nodebyte-hosting",
    title: "NodeByte Hosting",
    description: "Fast, reliable, scalable and secure hosting services for your gaming experience. Built for Humans. Powered by Bytes.",
    images: [
      "/previews/nodebyte-host/home.png",
      "/previews/nodebyte-host/about.png",
      "/previews/nodebyte-host/minecraft.png",
      "/previews/nodebyte-host/kb.png"
    ],
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Radix UI"],
    links: {
      slug: "nodebyte-hosting",
      demo: "https://nodebyte.host",
      github: "https://github.com/NodeByteHosting/Website"
    },
    featured: true,
    date: "2024-01-01"
  }
];