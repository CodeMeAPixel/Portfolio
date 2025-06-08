import { Project } from "@/types/project";
import projectsClient from "@/lib/projects/client";

export function getProjectById(id: string): Project | undefined {
    return projectsClient.getProjectById(id);
}

export function getAllProjectIds(): string[] {
    return projectsClient.getAllProjectIds();
}

export function getAllProjects(): Project[] {
    return projectsClient.getAllProjects();
}

export function getFeaturedProjects(): Project[] {
    return projectsClient.getFeaturedProjects();
}

export function getProjectsByTag(tag: string): Project[] {
    return projectsClient.getProjectsByTag(tag);
}

export function getAllProjectTags(): string[] {
    return projectsClient.getAllProjectTags();
}
