// Imports for server-side processing only
import matter from 'gray-matter';

// This will be true in a browser environment (client-side), false in Node.js (server-side)
const isClient = typeof window !== 'undefined';

export interface PostMetadata {
    title: string;
    date: string;
    slug: string;
    description?: string;
    tags?: string[];
    [key: string]: any;
}

// Mock data for development and fallback in client-side rendering
const mockPosts = [
    {
        metadata: {
            title: 'Building a Real-Time Chat Application',
            date: '2025-02-02',
            slug: 'real-time-chat',
            description: 'Learn how to build a real-time chat application using Socket.io and React.',
            tags: ['React', 'Socket.io', 'JavaScript']
        },
        content: `# Building a Real-Time Chat Application\n\nReal-time chat applications are essential in today's web landscape. This guide will show you how to build one using Socket.io and React.`
    },
    {
        metadata: {
            title: 'Getting Started with Next.js and MDX',
            date: '2025-01-15',
            slug: 'nextjs-mdx-blog',
            description: 'A guide to creating a blog with Next.js and MDX for rich content.',
            tags: ['Next.js', 'MDX', 'React']
        },
        content: `# Getting Started with Next.js and MDX\n\nMDX combines the power of Markdown with JSX components, making it perfect for rich content blogs.`
    }
];

export async function getPostSlugs(): Promise<string[]> {
    // Client-side: Return mock slugs or fetch from API
    if (isClient) {
        console.log("Client-side: Using mock post slugs");
        return mockPosts.map(post => post.metadata.slug);
    }

    // Server-side: Use file system
    try {
        // Dynamic import fs and path modules server-side only
        const fs = await import('fs/promises');
        const path = await import('path');

        const postsDirectory = path.join(process.cwd(), 'src', 'posts');

        // Create directory if it doesn't exist
        try {
            await fs.access(postsDirectory);
        } catch (error) {
            console.log("Posts directory doesn't exist, creating at:", postsDirectory);
            await fs.mkdir(postsDirectory, { recursive: true });
            return [];
        }

        const files = await fs.readdir(postsDirectory);
        console.log("Found files in posts directory:", files);

        const slugs = files
            .filter(file => path.extname(file) === '.mdx')
            .map(file => file.replace(/\.mdx$/, ''));

        console.log("Found slugs:", slugs);
        return slugs;
    } catch (error) {
        console.error("Error getting post slugs:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<{ content: string; metadata: PostMetadata }> {
    // Client-side: Return mock post or fetch from API
    if (isClient) {
        console.log("Client-side: Looking for mock post with slug:", slug);
        const post = mockPosts.find(post => post.metadata.slug === slug);

        if (post) {
            return { content: post.content, metadata: post.metadata };
        }

        return {
            content: "# Post Not Found\n\nThe requested post could not be found.",
            metadata: {
                title: "Post Not Found",
                date: new Date().toISOString(),
                slug: slug
            }
        };
    }

    // Server-side: Use file system
    try {
        // Dynamic import fs and path modules server-side only
        const fs = await import('fs/promises');
        const path = await import('path');

        const postsDirectory = path.join(process.cwd(), 'src', 'posts');
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);

        try {
            await fs.access(fullPath);
        } catch (error) {
            console.error("Post file does not exist:", fullPath);
            return {
                content: "# Post not found\n\nThe requested post could not be found.",
                metadata: {
                    title: "Post Not Found",
                    date: new Date().toISOString(),
                    slug: slug
                }
            };
        }

        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const metadata: PostMetadata = {
            title: data.title || 'Untitled Post',
            date: data.date || new Date().toISOString(),
            slug: slug,
            description: data.description || '',
            tags: data.tags || [],
            ...data,
        };

        return { content, metadata };
    } catch (error) {
        console.error("Error getting post by slug:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
            content: `# Error Loading Post\n\nThere was an error loading this post: ${errorMessage}`,
            metadata: {
                title: "Error Loading Post",
                date: new Date().toISOString(),
                slug: slug
            }
        };
    }
}

export async function getAllPosts(): Promise<{ content: string; metadata: PostMetadata }[]> {
    // Client-side: Return mock posts or fetch from API
    if (isClient) {
        console.log("Client-side: Using mock posts");
        return mockPosts;
    }

    // Server-side: Use file system
    try {
        const slugs = await getPostSlugs();

        if (slugs.length === 0) {
            console.log("No posts found, returning example post");
            return [{
                content: `# Welcome to the Blog\n\nThis is a default post.`,
                metadata: {
                    title: "Welcome to the Blog",
                    date: new Date().toISOString(),
                    slug: "example-post",
                    tags: ["Welcome"]
                }
            }];
        }

        const postsPromises = slugs.map(slug => getPostBySlug(slug));
        const posts = await Promise.all(postsPromises);

        // Sort posts by date in descending order
        return posts.sort((post1, post2) =>
            (new Date(post1.metadata.date) > new Date(post2.metadata.date) ? -1 : 1)
        );
    } catch (error) {
        console.error("Error getting all posts:", error);
        return mockPosts;
    }
}

// Calculate reading time based on the content
export function calculateReadingTime(content: string): string {
    if (!content) return "1 min read";

    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${readingTime} min read`;
}
