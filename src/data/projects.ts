import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Infinity List",
    description: "Begin your Discord journey with our extensive directory, featuring a wide array of bots and servers. ",
    images: [
      "/Infinity/Home.png",
      "/Infinity/BotPages.png"
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Go"],
    links: {
      slug: "infinity-list",
      demo: "https://infinitybots.gg",
      github: "https://github.com/InfinityBotList"
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
  },
];