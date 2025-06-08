import { getAllProjects, getAllProjectTags } from '@/data/projectsData';
import ProjectsContent from '@/components/projects/ProjectsContent';

export const metadata = {
    title: 'Projects',
    description: 'Explore my portfolio of web development and software engineering projects.',
    openGraph: {
        title: 'Projects',
        description: 'Explore my portfolio of web development and software engineering projects.',
        type: 'website',
    },
};

export default function ProjectsPage() {
    const projects = getAllProjects();
    const allTags = getAllProjectTags();

    return <ProjectsContent projects={projects} allTags={allTags} />;
}
