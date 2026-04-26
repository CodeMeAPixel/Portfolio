import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, Code2, Cloud } from "lucide-react";
import type { ReactElement } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGo,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiVercel,
  SiGit,
  SiTailwindcss,
} from "react-icons/si";

export const DATA = {
  name: "Tyler H",
  initials: "TJ",
  url: "https://codemeapixel.dev",
  location: "Alberta, Canada",
  locationLink: "https://www.google.com/maps/place/Alberta,+Canada",
  description:
    "Canadian based Software Engineer who's best served hot with a side of homelab experiments.",
  summary:
    "I have a strong background in both frontend and backend development, and I enjoy working on projects that challenge me to learn new technologies and push the boundaries of what's possible on the web. When I'm not coding, you can find me spending time with my wife and kids, experimenting with new tech in my homelab or sharing my knowledge through blogging and open source contributions.",
  avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express.js", icon: SiExpress },
    { name: "Go", icon: SiGo },
    { name: "Python", icon: SiPython },
    { name: "Java", icon: Code2 },
    { name: "C#", icon: Code2 },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Redis", icon: SiRedis },
    { name: "Docker", icon: SiDocker },
    { name: "Kubernetes", icon: SiKubernetes },
    { name: "AWS", icon: Cloud },
    { name: "Vercel", icon: SiVercel },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: Icons.github },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hey@codemeapixel.dev",
    tel: "+44 7874 267096",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/codemeapixel",
        icon: Icons.github,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://twitter.com/codemeapixel",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:hey@codemeapixel.dev",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "NodeByte LTD",
      href: "https://nodebyte.co.uk",
      badges: ["Leadership", "Architecture", "Product Strategy"],
      location: "Remote",
      title: "Chief Executive Officer",
      logoUrl: "https://nodebyte.co.uk/logo.png",
      start: "Nov 2024",
      end: "Present",
      description:
        "Lead the company across product strategy, engineering direction, and day-to-day operations. I set the technical roadmap, guide full-stack architecture decisions, and work closely with the team on delivery standards, mentoring, and long-term platform growth.",
    },
    {
      company: "Purrquinox Technologies",
      href: "https://purrquinox.com",
      badges: ["Infrastructure", "Security", "Systems Administration"],
      location: "Remote",
      title: "System Administrator",
      logoUrl: "https://purrquinox.com/_next/image?url=%2Flogo.png&w=48&q=75",
      start: "Jan 2025",
      end: "Present",
      description:
        "Maintain and improve core infrastructure with a focus on uptime, security, and operational stability. My responsibilities include server administration, network management, system hardening, monitoring, and hands-on support to keep internal services running reliably.",
    },
    {
      company: "Omniplex (Infinity Bot List)",
      href: "https://omniplex.gg",
      badges: ["Founder", "Open Source", "Community Platform"],
      location: "Remote",
      title: "Founder & Lead Developer",
      logoUrl: "/omniplex.png",
      start: "Feb 2021",
      end: "Present",
      description:
        "Built and launched a Discord bot discovery platform from the ground up, covering product direction, branding, platform development, and community growth. The project gave me early experience shipping user-facing features, running an online service, and iterating quickly based on feedback from bot developers and server owners.",
    },
    {
      company: "Paradise Bot List",
      href: "https://github.com/ParadiseBotLists",
      badges: ["Founder", "Open Source", "Community Platform"],
      location: "Remote",
      title: "Founder & Lead Developer",
      logoUrl: "/paradise.png",
      start: "Jan 2019",
      end: "Feb 2021",
      description:
        "Built and launched a Discord bot discovery platform from the ground up, covering product direction, branding, platform development, and community growth. The project gave me early experience shipping user-facing features, running an online service, and iterating quickly based on feedback from bot developers and server owners.",
    },
    {
      company: "South America Roleplay (SARP)",
      href: "",
      badges: ["Lead Developer", "Sysadmin", "FiveM"],
      location: "Remote",
      title: "Lead Developer",
      logoUrl: "/fivem.png",
      start: "Jan 2017",
      end: "Feb 2018",
      description:
        "Led development and infrastructure for a FiveM roleplay community, handling both the technical platform and day-to-day server operations. I worked on gameplay systems, server configuration, performance and stability issues, and the administration required to keep the community reliable for players and staff.",
    },
  ],
  education: [],
  projects: [
    {
      title: "Mocha",
      href: "https://mocha.embrly.ca",
      dates: "April 2026",
      active: true,
      technologies: [
        "Docker",
        "Next.js",
        "Fastify",
        "Mintlify",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Prisma",
      ],
      links: [
        {
          type: "Website",
          href: "https://mocha.embrly.ca",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/mocha/dashboard.png",
      video: "",
    },
    {
      title: "ByteSend",
      href: "https://bytesend.cloud",
      dates: "April 2026",
      active: true,
      technologies: [
        "Docker",
        "Next.js",
        "Fastify",
        "Mintlify",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Prisma",
      ],
      links: [
        {
          type: "Website",
          href: "https://bytesend.cloud",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/bytesend/dashboard.png",
      video: "",
    },
    {
      title: "Emberly",
      href: "https://embrly.ca",
      dates: "2022 - Present",
      active: true,
      technologies: [
        "Next.js",
        "Docker",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Amazon S3",
        "Prisma",
        "Sentry",
        "Stripe",
      ],
      links: [
        {
          type: "Website",
          href: "https://emberly.ca",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/emberly/home.png",
      video: "",
    },
    {
      title: "NodeByte Hosting",
      href: "https://nodebyte.host",
      dates: "2024 - Present",
      active: true,
      technologies: [
        "Next.js",
        "Coderabbit",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Prisma",
        "Sentry",
        "Stripe",
        "PayPal",
        "PHP",
      ],
      links: [
        {
          type: "Website",
          href: "https://nodebyte.host",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/nodebyte-host/home.png",
      video: "",
    }
  ],
  hackathons: [] as {
    title: string;
    dates: string;
    location?: string;
    description?: string;
    image?: string;
    links?: {
      title: string;
      href: string;
      icon: ReactElement;
    }[];
  }[],
} as const;
