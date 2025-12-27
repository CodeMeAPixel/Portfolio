import { BlogPost, BlogCategory } from "@/types/blog";
import { getAllPosts as fetchAllPosts } from "@/lib/mdx";

export class BlogClient {
    private static instance: BlogClient;
    private postsCache: BlogPost[] | null = null;
    private categoriesCache: BlogCategory[] | null = null;

    private constructor() { }

    public static getInstance(): BlogClient {
        if (!BlogClient.instance) {
            BlogClient.instance = new BlogClient();
        }
        return BlogClient.instance;
    }

    public async getAllPosts(): Promise<BlogPost[]> {
        if (this.postsCache) {
            return this.postsCache;
        }

        try {
            const posts = await fetchAllPosts();
            // Add slug from metadata to each post if it's not already there
            const postsWithSlug: BlogPost[] = posts.map(post => ({
                ...post,
                slug: post.metadata.slug || ''
            }));
            this.postsCache = postsWithSlug;
            return postsWithSlug;
        } catch (error) {
            console.error("Error fetching blog posts:", error);
            return [];
        }
    }

    public async getPostBySlug(slug: string): Promise<BlogPost | null> {
        console.log(`Looking for post with slug: "${slug}"`);
        const posts = await this.getAllPosts();
        console.log(`Total posts loaded: ${posts.length}`);

        const post = posts.find(post => {
            const postSlug = post.slug || post.metadata.slug;
            console.log(`Checking post slug: "${postSlug}" against requested: "${slug}"`);
            return postSlug === slug;
        });

        if (!post) {
            console.warn(`Post with slug "${slug}" not found. Available slugs:`,
                posts.map(p => p.slug || p.metadata.slug));
        } else {
            console.log(`Found post with slug "${slug}":`, post.metadata.title);
        }

        return post || null;
    }

    public async getPostsByCategory(category: string): Promise<BlogPost[]> {
        const posts = await this.getAllPosts();
        return posts.filter(post =>
            post.metadata.categories?.some(cat =>
                cat.toLowerCase() === category.toLowerCase()
            )
        );
    }

    public async getPostsByTag(tag: string): Promise<BlogPost[]> {
        const posts = await this.getAllPosts();
        return posts.filter(post =>
            post.metadata.tags?.some(postTag =>
                postTag.toLowerCase() === tag.toLowerCase()
            )
        );
    }

    public async getFeaturedPosts(): Promise<BlogPost[]> {
        const posts = await this.getAllPosts();
        return posts.filter(post => post.metadata.featured);
    }

    public async getRecentPosts(count: number = 5): Promise<BlogPost[]> {
        const posts = await this.getAllPosts();
        return posts
            .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
            .slice(0, count);
    }

    public async getAllCategories(): Promise<BlogCategory[]> {
        if (this.categoriesCache) {
            return this.categoriesCache;
        }

        const posts = await this.getAllPosts();
        const categoryCounts = new Map<string, number>();

        posts.forEach(post => {
            post.metadata.categories?.forEach(category => {
                const normalizedCategory = category.toLowerCase();
                categoryCounts.set(
                    normalizedCategory,
                    (categoryCounts.get(normalizedCategory) || 0) + 1
                );
            });
        });

        const categories = Array.from(categoryCounts.entries())
            .map(([name, count]) => ({
                name,
                count,
                slug: name.toLowerCase().replace(/\s+/g, '-')
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        this.categoriesCache = categories;
        return categories;
    }

    public async getAllTags(): Promise<string[]> {
        const posts = await this.getAllPosts();
        const tags = new Set<string>();

        posts.forEach(post => {
            post.metadata.tags?.forEach(tag => {
                tags.add(tag.toLowerCase());
            });
        });

        return Array.from(tags).sort();
    }

    public async getPostSlugs(): Promise<string[]> {
        const posts = await this.getAllPosts();
        return posts.map(post => post.slug);
    }

    public clearCache(): void {
        this.postsCache = null;
        this.categoriesCache = null;
    }
}

export default BlogClient.getInstance();
