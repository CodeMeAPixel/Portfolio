export interface FivemScript {
    id: string;
    title: string;
    author?: string;
    description: string;
    longDescription: string;
    price?: string;
    framework: "ESX" | "QBCore" | "Standalone";
    status: "Released" | "In Development" | "Coming Soon" | "Deprecated" | "Archived";
    version: string;
    lastUpdated: string;
    features: string[];
    images: string[];
    video?: string;
    tags: string[];
    links: {
        demo?: string;
        purchase?: string;
        github?: string;
        documentation?: string;
        discord?: string;
        successor?: string;
        slug?: string;
    };
    requirements?: string[];
    installation?: {
        requirements?: string[];
        steps?: string[];
    } | string;
    deprecated?: boolean;
    deprecationMessage?: string;
    deprecatedMessage?: string;
    migrationGuide?: {
        successor: string;
        steps: string[];
        successorFeatures?: string[];
    };
    language?: string;
    license?: string;
}

