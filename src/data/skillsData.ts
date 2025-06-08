import { Skill, SkillCategory } from "@/types/skills";
import skillsClient from "@/lib/skills/client";

export function getAllSkillCategories(): SkillCategory[] {
    return skillsClient.getAllSkillCategories();
}

export function getSkillCategoryByName(name: string): SkillCategory | undefined {
    return skillsClient.getSkillCategoryByName(name);
}

export function getAllSkills(): Skill[] {
    return skillsClient.getAllSkills();
}

export function getSkillByName(name: string): Skill | undefined {
    return skillsClient.getSkillByName(name);
}

export function getExpertSkills(): Skill[] {
    return skillsClient.getExpertSkills();
}

export function getAllSkillNames(): string[] {
    return skillsClient.getAllSkillNames();
}

export function getAllCategoryNames(): string[] {
    return skillsClient.getAllCategoryNames();
}

export function searchSkills(query: string): Skill[] {
    return skillsClient.searchSkills(query);
}
