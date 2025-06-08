import blogClient from '@/lib/blog/client';
import { BlogPost } from '@/types/blog';

export async function getAllPosts(): Promise<BlogPost[]> {
    return blogClient.getAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    return blogClient.getPostBySlug(slug);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
    return blogClient.getPostsByCategory(category);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    return blogClient.getPostsByTag(tag);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
    return blogClient.getFeaturedPosts();
}

export async function getRecentPosts(count: number = 5): Promise<BlogPost[]> {
    return blogClient.getRecentPosts(count);
}

export async function getAllCategories(): Promise<{ name: string; count: number; slug: string }[]> {
    return blogClient.getAllCategories();
}

export async function getAllTags(): Promise<string[]> {
    return blogClient.getAllTags();
}

export async function getPostSlugs(): Promise<string[]> {
    return blogClient.getPostSlugs();
}
