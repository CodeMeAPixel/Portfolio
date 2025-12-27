"use client";

import Image from 'next/image';
import { FaServer, FaDatabase, FaCode, FaEnvelope, FaKey, FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

import {
    DiAngularSimple, DiBootstrap, DiDjango, DiExpressjs,
    DiFastify, DiFramer, DiGithubBadge, DiGit, DiGoogleCloudPlatform,
    DiHtml5, DiJavascript1, DiJqueryLogo, DiLaravel, DiMaterializecss,
    DiMicrosoft, DiNodejsSmall, DiPhp, DiPostgresql, DiRedis, DiRuby,
    DiSass, DiServer, DiStripe, DiTwilio, DiVsCode, DiWebpack, DiAmazonAws,
    DiVisualstudio, DiDocker, DiGithub
} from 'react-icons/di';

import {
    SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte, SiJavascript,
    SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiJquery,
    SiSass, SiFramer, SiMui, SiRedux, SiGatsby, SiNodedotjs, SiExpress,
    SiDjango, SiFlask, SiRubyonrails, SiPhp, SiLaravel, SiGo, SiSpringboot,
    SiDotnet, SiGraphql, SiNestjs, SiFastify, SiMongodb, SiMysql,
    SiPostgresql, SiSqlite, SiFirebase, SiRedis, SiSupabase,
    SiDocker, SiKubernetes, SiGooglecloud, SiChakraui,
    SiTerraform, SiJenkins, SiCircleci, SiGithubactions, SiWebpack,
    SiVite, SiBabel, SiEslint, SiStripe, SiPaypal, SiCloudflare,
    SiVercel, SiNetlify, SiHeroku, SiDigitalocean, SiPython,
    SiCplusplus, SiRust, SiSwift, SiKotlin, SiRuby, SiWordpress,
    SiContentful, SiStrapi, SiSanity, SiMarkdown, SiJest, SiCypress, SiMocha,
    SiSelenium, SiFlutter, SiIonic, SiRadixui, SiGit, SiFigma, SiStorybook,
    SiAmazonwebservices, SiPrisma, SiAuth0, SiTwilio, SiMailchimp, SiReactquery,
    SiGithub
} from 'react-icons/si';

import { PiFramerLogoFill } from 'react-icons/pi';
import { BsMicrosoft } from 'react-icons/bs';
import { TbBrandRadixUi } from 'react-icons/tb';

// Improved: More aliases, better normalization, fallback SVG, and iconMap enhancements
const iconMap: Record<string, IconType> = {
    javascript: SiJavascript,
    typescript: SiTypescript,
    react: SiReact,
    nextjs: SiNextdotjs,
    "next.js": SiNextdotjs,
    vue: SiVuedotjs,
    vuejs: SiVuedotjs,
    angular: SiAngular,
    svelte: SiSvelte,
    tailwind: SiTailwindcss,
    tailwindcss: SiTailwindcss,
    css: SiCss3,
    css3: SiCss3,
    html: SiHtml5,
    html5: SiHtml5,
    node: SiNodedotjs,
    nodejs: SiNodedotjs,
    express: SiExpress,
    fastify: SiFastify,
    go: SiGo,
    python: SiPython,
    java: FaJava,
    php: SiPhp,
    graphql: SiGraphql,
    mongodb: SiMongodb,
    postgresql: SiPostgresql,
    postgres: SiPostgresql,
    mysql: SiMysql,
    redis: SiRedis,
    firebase: SiFirebase,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    github: SiGithub,
    git: SiGit,
    vscode: DiVisualstudio,
    figma: SiFigma,
    webpack: SiWebpack,
    jest: SiJest,
    cypress: SiCypress,
    storybook: SiStorybook,
    mui: SiMui,
    chakra: SiChakraui,
    bootstrap: SiBootstrap,
    aws: SiAmazonwebservices,
    amazonwebservices: SiAmazonwebservices,
    vercel: SiVercel,
    netlify: SiNetlify,
    heroku: SiHeroku,
    digitalocean: SiDigitalocean,
    gcp: SiGooglecloud,
    googlecloud: SiGooglecloud,
    prisma: SiPrisma,
    supabase: SiSupabase,
    auth0: SiAuth0,
    twilio: SiTwilio,
    mailchimp: SiMailchimp,
    microsoft: BsMicrosoft,
    framer: PiFramerLogoFill,
    "framer motion": PiFramerLogoFill,
    bun: FaCode,
    nestjs: SiNestjs,
    drizzle: FaDatabase,
    terraform: SiTerraform,
    api: FaCode,
    database: FaDatabase,
    headless: FaCode,
    shadcn: FaCode,
    hono: FaServer,
    cicd: FaCode,
    postmark: FaEnvelope,
    resend: FaEnvelope,
    sendgrid: FaEnvelope,
    oauth: FaKey,
    jwt: FaKey,
    nextauth: FaKey,
    "nextauth.js": FaKey,
    clerk: FaKey,
    "testing-library": FaCode,
    playwright: FaCode,
    vitest: FaCode,
    radix: TbBrandRadixUi,
    "radix ui": TbBrandRadixUi,
    reactquery: SiReactquery,
    "githubactions": SiGithubactions,
    "githubapi": SiGithub,
    rust: SiRust,
    swift: SiSwift,
    kotlin: SiKotlin,
    ruby: SiRuby,
    wordpress: SiWordpress,
    contentful: SiContentful,
    strapi: SiStrapi,
    sanity: SiSanity,
    markdown: SiMarkdown,
    mocha: SiMocha,
    selenium: SiSelenium,
    flutter: SiFlutter,
    ionic: SiIonic,
    zustand: FaCode,
    zod: FaCode,
};

function normalizeName(name: string) {
    return name.toLowerCase().replace(/[\s\.\-]/g, '');
}

interface TechIconProps {
    name: string;
    size?: number;
    className?: string;
}

export function TechIcon({ name, size = 20, className = '' }: TechIconProps) {
    const normalizedName = normalizeName(name);

    const IconComponent = iconMap[normalizedName];

    if (IconComponent) {
        return <IconComponent size={size} className={className} />;
    }

    // Fallback: show a premium styled badge with the first letter
    return (
        <span
            className={`inline-flex items-center justify-center bg-gradient-to-br from-primary-500/30 to-accent-500/20 backdrop-blur-sm rounded-lg font-bold text-primary-300 border border-primary-500/20 shadow-sm shadow-primary-500/10 ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.55 }}
            title={name}
        >
            {name.charAt(0).toUpperCase()}
        </span>
    );
}
