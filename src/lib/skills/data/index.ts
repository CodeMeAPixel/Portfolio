import { SkillCategory } from "@/types/skills";
import frontendSkills from "./frontend";
import backendSkills from "./backend";
import databaseSkills from "./database";
import devopsSkills from "./devops";
import toolsSkills from "./tools";
import uiLibrariesSkills from "./ui-libraries";
import emailSkills from "./email";
import authSkills from "./auth";
import testingSkills from "./testing";

export const allSkillCategories: SkillCategory[] = [
    frontendSkills,
    backendSkills,
    databaseSkills,
    devopsSkills,
    toolsSkills,
    uiLibrariesSkills,
    emailSkills,
    authSkills,
    testingSkills
];
