import { getPostBySlug, getPostSlugs, getRecentPosts } from '@/data/blogData';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { calculateReadingTime } from '@/lib/mdx';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({
        slug: String(slug)
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.'
        };
    }

    const { metadata } = post;

    return {
        title: metadata.title,
        description: metadata.description || '',
        authors: [{ name: metadata.author || 'Author' }],
        openGraph: {
            title: metadata.title,
            description: metadata.description || '',
            type: 'article',
            publishedTime: metadata.date,
            tags: metadata.tags || [],
            images: metadata.image ? [metadata.image] : [],
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { content, metadata } = post;
    const readingTime = calculateReadingTime(content);
    const relatedPosts = await getRecentPosts(3);

    return (
        <BlogPostContent
            content={content}
            metadata={{
                ...metadata,
                readingTime
            }}
            relatedPosts={relatedPosts.filter(p => p.slug !== slug)}
        />
    );
}
