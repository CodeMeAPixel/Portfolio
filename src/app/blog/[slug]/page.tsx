import { getPostBySlug, getPostSlugs, calculateReadingTime } from '@/lib/mdx';
import BlogPostContent from '@/components/blog/BlogPostContent';

interface Props {
    params: { slug: string };
}

export async function generateStaticParams() {
    const slugs = await getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = params;
    const { metadata } = await getPostBySlug(slug);
    return {
        title: metadata.title,
        description: metadata.description || '',
        authors: [{ name: metadata.author || 'Author' }],
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            type: 'article',
            publishedTime: metadata.date,
            tags: metadata.tags || [],
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = params;
    const { content, metadata } = await getPostBySlug(slug);
    const readingTime = calculateReadingTime(content);

    return <BlogPostContent
        content={content}
        metadata={metadata}
        readingTime={readingTime}
    />;
}
