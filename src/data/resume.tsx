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
    "Software Engineer with 15+ years of experience. Best served hot with a side of homelab experiments.",
  summary:
    "My journey in web development began over 10 years ago, driven by curiosity and a desire to build things that people love to use. I specialize in creating modern, responsive, and accessible web applications that not only look great but also deliver outstanding user experiences.\n\nI have a strong background in both frontend and backend development, and I enjoy working on projects that challenge me to learn new technologies and push the boundaries of what's possible on the web. When I'm not coding, you can find me spending time with my wife and kids, experimenting with new tech in my homelab or sharing my knowledge through blogging and open source contributions.",
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

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/codemeapixel",
        icon: Icons.linkedin,

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
      badges: [],
      location: "Remote",
      title: "Chief Executive Officer",
      logoUrl: "https://nodebyte.co.uk/logo.png",
      start: "2024",
      end: "Present",
      description:
        "Driving the company's strategic vision and technical roadmap. I oversee full-stack architectural decisions, lead high-level operations, and foster a culture of excellence through direct mentorship of the engineering team.",
    },
    {
      company: "Purrquinox Technologies",
      href: "https://purrquinox.com",
      badges: [],
      location: "Remote",
      title: "System Administrator",
      logoUrl: "https://purrquinox.com/_next/image?url=%2Flogo.png&w=48&q=75",
      start: "2025",
      end: "Present",
      description:
        "Manage and maintain the IT infrastructure, ensuring system reliability and security. I also handle network administration, server management, and user support.",
    },
    {
      company: "Paradise Bot List",
      href: "https://github.com/ParadiseBotLists",
      badges: [],
      location: "Remote",
      title: "Founder",
      logoUrl: "https://avatars.githubusercontent.com/u/77776335?s=400&u=c3008f2586bdbfcd1b37657d1ce64e0b59fbfca8&v=4",
      start: "Jan 2019",
      end: "Feb 2021",
      description: "",
    },
  ],
  education: [],
  projects: [
    {
      title: "Mocha",
      href: "https://mocha.embrly.ca",
      dates: "April 2026",
      active: true,
      description: "",
      technologies: [
        "Docker",
        "Next.js",
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
      description: "",
      technologies: [
        "Docker",
        "Next.js",
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
      title: "NodeByte Hosting",
      href: "https://nodebyte.host",
      dates: "2024 - Present",
      active: true,
      description: "",
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
    },
    {
      title: "Emberly",
      href: "https://embrly.ca",
      dates: "2022 - Present",
      active: true,
      description: "",
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
          href: "https://nodebyte.host",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/emberly/home.png",
      video: "",
    },
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
