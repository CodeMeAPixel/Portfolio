import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FivemScriptDetailsContent from '@/components/layouts/fivem/FivemScriptDetailsContent';
import { getScriptBySlug, getAllScriptSlugs } from '@/data/fivemScriptsData';

// Generate static params for all script slugs
export async function generateStaticParams() {
    const slugs = getAllScriptSlugs();

    return slugs.map(slug => ({
        slug
    }));
}

// Generate metadata for each script
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const script = getScriptBySlug(params.slug);

    if (!script) {
        return {
            title: 'Script Not Found',
            description: 'The requested FiveM script could not be found.'
        };
    }

    return {
        title: `${script.title} | FiveM Script`,
        description: script.description,
        openGraph: {
            title: `${script.title} | FiveM Script`,
            description: script.description,
            images: script.images[0] ? [script.images[0]] : [],
            type: 'website',
        },
    };
}

export default function ScriptPage({ params }: { params: { slug: string } }) {
    const script = getScriptBySlug(params.slug);

    if (!script) {
        notFound();
    }

    return <FivemScriptDetailsContent script={script} />;
}
