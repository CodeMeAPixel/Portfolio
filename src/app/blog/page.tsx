import { getAllPosts } from '@/lib/mdx';
import BlogContent from '@/components/blog/BlogContent';

export const metadata = {
    title: 'Blog',
    description: 'Explore articles and tutorials on web development, programming, and technology.',
    openGraph: {
        title: 'Blog',
        description: 'Explore articles and tutorials on web development, programming, and technology.',
        type: 'website',
    },
};

export default async function BlogIndexPage() {
    const posts = await getAllPosts();

    return <BlogContent posts={posts} />;
}
