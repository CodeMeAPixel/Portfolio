export interface FivemScript {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    price: string;
    framework: "ESX" | "QBCore" | "Both" | "Standalone";
    status: "Released" | "In Development" | "Coming Soon";
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
        slug: string;
    };
    requirements?: string[];
    installation?: string;
}
