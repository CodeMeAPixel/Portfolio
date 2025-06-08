export interface BlogPostMetadata {
    title: string;
    date: string;
    slug: string;
    description?: string;
    content?: string;
    image?: string;
    author?: string;
    readingTime?: string;
    tags?: string[];
    categories?: string[];
    featured?: boolean;
}

export interface BlogPost {
    content: string;
    metadata: BlogPostMetadata;
    slug?: string;
}

export interface BlogCategory {
    name: string;
    count: number;
    slug: string;
}
