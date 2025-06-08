import { Metadata } from 'next';
import BlogContent from '@/components/blog/BlogContent';
import { getAllPosts, getAllCategories, getAllTags } from '@/data/blogData';

export const metadata: Metadata = {
    title: 'Blog | Articles and Tutorials',
    description: 'Explore articles and tutorials on web development, programming, and technology.',
    openGraph: {
        title: 'Blog | Articles and Tutorials',
        description: 'Explore articles and tutorials on web development, programming, and technology.',
        type: 'website',
    },
};

export default async function BlogIndexPage() {
    const posts = await getAllPosts();
    const categories = await getAllCategories();
    const tags = await getAllTags();

    return (
        <BlogContent
            posts={posts}
            categories={categories}
            tags={tags}
        />
    );
}
