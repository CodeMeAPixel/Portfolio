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

// Map of tech names to their corresponding icon components
const iconMap: Record<string, IconType> = {
    javascript: SiJavascript,
    typescript: SiTypescript,
    react: SiReact,
    nextjs: SiNextdotjs,
    vuejs: SiVuedotjs,
    angular: SiAngular,
    svelte: SiSvelte,
    tailwindcss: SiTailwindcss,
    css3: SiCss3,
    html5: SiHtml5,
    nodejs: SiNodedotjs,
    express: SiExpress,
    fastify: FaServer,
    go: SiGo,
    python: SiPython,
    java: FaJava,
    php: SiPhp,
    graphql: SiGraphql,
    mongodb: SiMongodb,
    postgresql: SiPostgresql,
    mysql: SiMysql,
    redis: SiRedis,
    firebase: SiFirebase,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    github: DiGithub,
    git: SiGit,
    vscode: DiVisualstudio,
    figma: SiFigma,
    webpack: SiWebpack,
    jest: SiJest,
    cypress: SiCypress,
    storybook: SiStorybook,
    mui: DiMaterializecss,
    chakra: SiChakraui,
    bootstrap: SiBootstrap,
    aws: SiAmazonwebservices,
    vercel: SiVercel,
    netlify: SiNetlify,
    gcp: SiGooglecloud,
    prisma: SiPrisma,
    supabase: SiSupabase,
    auth0: SiAuth0,
    twilio: SiTwilio,
    mailchimp: SiMailchimp,
    microsoft: BsMicrosoft,
    framer: PiFramerLogoFill,
    bun: FaCode, // Generic icon for Bun
    nestjs: FaCode, // Generic icon for NestJS
    drizzle: FaDatabase, // Generic icon for Drizzle
    terraform: FaCode, // Generic icon for Terraform
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
    clerk: FaKey,
    "testing-library": FaCode,
    playwright: FaCode,
    vitest: FaCode,
    radix: TbBrandRadixUi,
    reactquery: SiReactquery,
    "githubactions": SiGithubactions,
    "githubapi": SiGithub,
};

interface TechIconProps {
    name: string;
    size?: number;
    className?: string;
}

export function TechIcon({ name, size = 20, className = '' }: TechIconProps) {
    // Normalize the name by converting to lowercase and removing spaces
    const normalizedName = name.toLowerCase().replace(/\s+/g, '');

    // Find the icon component
    const IconComponent = iconMap[normalizedName];

    if (IconComponent) {
        return <IconComponent size={size} className={className} />;
    }

    // Default fallback for unknown technologies
    return (
        <div
            className={`inline-flex items-center justify-center bg-primary-800/50 rounded-full ${className}`}
            style={{ width: size, height: size, fontSize: size * 0.5 }}
        >
            {name.charAt(0).toUpperCase()}
        </div>
    );
}
