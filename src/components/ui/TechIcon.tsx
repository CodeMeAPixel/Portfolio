"use client";

import { DiAppcelerator, DiAndroid, DiApple } from 'react-icons/di';
import { AiOutlineCode } from 'react-icons/ai';
import { FaServer, FaAws, FaDatabase, FaGithub, FaNodeJs, FaJava, FaBootstrap, FaPython, FaPhp } from 'react-icons/fa';

import {
    SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte, SiJavascript,
    SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiJquery,
    SiSass, SiFramer, SiMui, SiRedux, SiGatsby, SiNodedotjs, SiExpress,
    SiDjango, SiFlask, SiRubyonrails, SiPhp, SiLaravel, SiGo, SiSpringboot,
    SiDotnet, SiGraphql, SiNestjs, SiFastify, SiMongodb, SiMysql,
    SiPostgresql, SiSqlite, SiFirebase, SiRedis, SiSupabase,
    SiDocker, SiKubernetes, SiGooglecloud,
    SiTerraform, SiJenkins, SiCircleci, SiGithubactions, SiWebpack,
    SiVite, SiBabel, SiEslint, SiStripe, SiPaypal, SiCloudflare,
    SiVercel, SiNetlify, SiHeroku, SiDigitalocean, SiPython,
    SiCplusplus, SiRust, SiSwift, SiKotlin, SiRuby, SiWordpress,
    SiContentful, SiStrapi, SiSanity, SiMarkdown, SiJest, SiCypress, SiMocha,
    SiSelenium, SiFlutter, SiIonic, SiRadixui, SiGit,
    SiFigma, SiStorybook
} from 'react-icons/si';

// Tech icon mapping with properly imported icons
const techIcons: Record<string, React.ElementType> = {
    // Frontend
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'Vue': SiVuedotjs,
    'Vue.js': SiVuedotjs,
    'Angular': SiAngular,
    'Svelte': SiSvelte,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'HTML': SiHtml5,
    'HTML5': SiHtml5,
    'CSS': SiCss3,
    'CSS3': SiCss3,
    'Tailwind': SiTailwindcss,
    'Tailwind CSS': SiTailwindcss,
    'Bootstrap': SiBootstrap,
    'jQuery': SiJquery,
    'SASS': SiSass,
    'Framer': SiFramer,
    'Framer Motion': SiFramer,
    'Material UI': SiMui,
    'MUI': SiMui,
    'Redux': SiRedux,
    'Gatsby': SiGatsby,

    // Backend
    'Node': SiNodedotjs,
    'Node.js': SiNodedotjs,
    'Express': SiExpress,
    'Django': SiDjango,
    'Flask': SiFlask,
    'Ruby on Rails': SiRubyonrails,
    'Rails': SiRubyonrails,
    'PHP': SiPhp,
    'Laravel': SiLaravel,
    'Go': SiGo,
    'Golang': SiGo,
    'Spring': SiSpringboot,
    'Spring Boot': SiSpringboot,
    'ASP.NET': SiDotnet,
    '.NET': SiDotnet,
    'GraphQL': SiGraphql,
    'REST': FaServer,
    'NestJS': SiNestjs,
    'Fastify': SiFastify,

    // Database
    'MongoDB': SiMongodb,
    'MySQL': SiMysql,
    'PostgreSQL': SiPostgresql,
    'Postgres': SiPostgresql,
    'SQLite': SiSqlite,
    'Firebase': SiFirebase,
    'Redis': SiRedis,
    'Supabase': SiSupabase,
    'DynamoDB': FaAws,
    'Cassandra': FaDatabase,

    // DevOps & Tools
    'Docker': SiDocker,
    'Kubernetes': SiKubernetes,
    'K8s': SiKubernetes,
    'AWS': FaAws,
    'Amazon Web Services': FaAws,
    'GCP': SiGooglecloud,
    'Google Cloud': SiGooglecloud,
    'Terraform': SiTerraform,
    'Jenkins': SiJenkins,
    'CircleCI': SiCircleci,
    'GitHub Actions': SiGithubactions,
    'Webpack': SiWebpack,
    'Vite': SiVite,
    'Babel': SiBabel,
    'ESLint': SiEslint,

    // Payment & Services
    'Stripe': SiStripe,
    'PayPal': SiPaypal,
    'Cloudflare': SiCloudflare,
    'Vercel': SiVercel,
    'Netlify': SiNetlify,
    'Heroku': SiHeroku,
    'Digital Ocean': SiDigitalocean,
    'DigitalOcean': SiDigitalocean,

    // Languages
    'Python': SiPython,
    'C++': SiCplusplus,
    'CPP': SiCplusplus,
    'Rust': SiRust,
    'Swift': SiSwift,
    'Kotlin': SiKotlin,
    'Ruby': SiRuby,

    // CMS & Content
    'WordPress': SiWordpress,
    'Contentful': SiContentful,
    'Strapi': SiStrapi,
    'Sanity': SiSanity,
    'MDX': SiMarkdown,
    'Markdown': SiMarkdown,

    // Testing
    'Jest': SiJest,
    'Cypress': SiCypress,
    'Mocha': SiMocha,
    'Selenium': SiSelenium,

    // Mobile
    'React Native': SiReact,
    'Flutter': SiFlutter,
    'Ionic': SiIonic,
    'Android': DiAndroid,
    'iOS': DiApple,

    // Additional icons needed for Skills page
    'GitHub': FaGithub,
    'Github': FaGithub,
    'git': SiGit,
    'Git': SiGit,
    'Radix UI': SiRadixui,
    'Radix': SiRadixui,
    'radix': SiRadixui,
    'Figma': SiFigma,
    'figma': SiFigma,
    'Storybook': SiStorybook,
    'storybook': SiStorybook,
    'Headless UI': SiRadixui,
    'headless': SiRadixui,

    // Additional aliases for common technologies
    'nodejs': SiNodedotjs,
    'node': SiNodedotjs,
    'python': SiPython,
    'java': FaJava,
    'php': SiPhp,
    'api': FaServer,
    'REST API': FaServer,
    'rest api': FaServer,
    'database': FaDatabase,
    'sql': FaDatabase,
    'SQL': FaDatabase,
    'bootstrap': SiBootstrap,
    'mui': SiMui,
    'material-ui': SiMui,
    'Material UI': SiMui,
    'framer': SiFramer,
    'gcp': SiGooglecloud,

    // Default
    'default': AiOutlineCode
};

interface TechIconProps {
    name: string;
    className?: string;
    size?: number;
}

export default function TechIcon({ name, className = "", size = 24 }: TechIconProps) {
    // Find the correct icon component
    const Icon = findIconForTech(name);

    return (
        <Icon className={className} style={{ width: size, height: size }} />
    );
}

// Helper function to get icon for a tech name
export function findIconForTech(techName: string): React.ElementType {
    // Strip any extra whitespace and try exact match first
    const normalizedName = techName.trim();

    if (techIcons[normalizedName]) {
        return techIcons[normalizedName];
    }

    // Try case-insensitive match
    const lowerCaseName = normalizedName.toLowerCase();
    const caseInsensitiveMatch = Object.keys(techIcons).find(
        key => key.toLowerCase() === lowerCaseName
    );

    if (caseInsensitiveMatch) {
        return techIcons[caseInsensitiveMatch];
    }

    // Try partial match
    const partialMatch = Object.keys(techIcons).find(key =>
        lowerCaseName.includes(key.toLowerCase()) ||
        key.toLowerCase().includes(lowerCaseName)
    );

    return partialMatch ? techIcons[partialMatch] : techIcons.default;
}
