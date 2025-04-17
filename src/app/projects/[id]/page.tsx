import { getProjectById, getAllProjectIds } from '@/data/projectsData';
import ProjectDetail from '@/components/projects/ProjectDetail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
    params: { id: string };
}

export async function generateStaticParams() {
    const projectIds = getAllProjectIds();
    return projectIds.map(id => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Await the params object to ensure it's fully resolved
    const { id } = await Promise.resolve(params);
    const project = getProjectById(id);

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.'
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.images[0] ? [{ url: project.images[0] }] : [],
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    // Also await params here for consistency
    const { id } = await Promise.resolve(params);
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}
