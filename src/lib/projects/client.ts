import { Project } from "@/types/project";
import { allProjects } from "./data";

export class ProjectsClient {
    private static instance: ProjectsClient;
    private projectsCache: Project[] | null = null;

    private constructor() { }

    public static getInstance(): ProjectsClient {
        if (!ProjectsClient.instance) {
            ProjectsClient.instance = new ProjectsClient();
        }
        return ProjectsClient.instance;
    }

    public getAllProjects(): Project[] {
        if (this.projectsCache) {
            return this.projectsCache;
        }

        // Use the statically imported projects instead of dynamic file reading
        this.projectsCache = allProjects;
        return this.projectsCache;
    }

    public getProjectById(id: string): Project | undefined {
        return this.getAllProjects().find(project => project.id === id);
    }

    public getFeaturedProjects(): Project[] {
        return this.getAllProjects().filter(project => project.featured);
    }

    public getProjectsByTag(tag: string): Project[] {
        return this.getAllProjects().filter(project => project.tags.includes(tag));
    }

    public getAllProjectTags(): string[] {
        const tags = new Set<string>();
        this.getAllProjects().forEach(project => {
            project.tags.forEach(tag => {
                tags.add(tag);
            });
        });
        return Array.from(tags);
    }

    public getAllProjectIds(): string[] {
        return this.getAllProjects().map(project => project.id);
    }
}

export default ProjectsClient.getInstance();
