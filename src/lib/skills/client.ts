import { Skill, SkillCategory } from "@/types/skills";
import { allSkillCategories } from "./data";

export class SkillsClient {
    private static instance: SkillsClient;
    private skillCategoriesCache: SkillCategory[] | null = null;

    private constructor() { }

    public static getInstance(): SkillsClient {
        if (!SkillsClient.instance) {
            SkillsClient.instance = new SkillsClient();
        }
        return SkillsClient.instance;
    }

    public getAllSkillCategories(): SkillCategory[] {
        if (this.skillCategoriesCache) {
            return this.skillCategoriesCache;
        }

        // Use the statically imported skill categories
        this.skillCategoriesCache = allSkillCategories;
        return this.skillCategoriesCache;
    }

    public getSkillCategoryByName(name: string): SkillCategory | undefined {
        return this.getAllSkillCategories().find(category =>
            category.name.toLowerCase() === name.toLowerCase()
        );
    }

    public getAllSkills(): Skill[] {
        return this.getAllSkillCategories().flatMap(category => category.skills);
    }

    public getSkillByName(name: string): Skill | undefined {
        return this.getAllSkills().find(skill =>
            skill.name.toLowerCase() === name.toLowerCase()
        );
    }

    public getSkillsByLevel(level: number): Skill[] {
        return this.getAllSkills().filter(skill => skill.level === level);
    }

    public getExpertSkills(): Skill[] {
        return this.getSkillsByLevel(5);
    }

    public getAllSkillNames(): string[] {
        return this.getAllSkills().map(skill => skill.name);
    }

    public getAllCategoryNames(): string[] {
        return this.getAllSkillCategories().map(category => category.name);
    }

    public searchSkills(query: string): Skill[] {
        const lowerQuery = query.toLowerCase();
        return this.getAllSkills().filter(skill =>
            skill.name.toLowerCase().includes(lowerQuery) ||
            (skill.description && skill.description.toLowerCase().includes(lowerQuery))
        );
    }
}

export default SkillsClient.getInstance();
