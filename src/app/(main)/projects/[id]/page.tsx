import { getProjectById, getAllProjectIds } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/projects/ProjectDetail';

// Generate static params for all project IDs
export async function generateStaticParams() {
    const ids = await getAllProjectIds();

    return ids.map(id => ({
        id: id
    }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);

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
            images: project.images[0] ? [project.images[0]] : [],
            type: 'website',
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}
