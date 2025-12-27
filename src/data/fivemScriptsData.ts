import { FivemScript } from "@/types/fivem";
import fivemScriptsClient from "@/lib/fivem/client";

export function getScriptBySlug(slug: string): FivemScript | undefined {
    return fivemScriptsClient.getScriptBySlug(slug);
}

export function getScriptById(id: string): FivemScript | undefined {
    return fivemScriptsClient.getScriptById(id);
}

export function getAllScripts(): FivemScript[] {
    return fivemScriptsClient.getAllScripts();
}

export function getAllScriptSlugs(): string[] {
    return fivemScriptsClient.getAllScriptSlugs();
}

export function getAllScriptTags(): string[] {
    return fivemScriptsClient.getAllScriptTags();
}

export function getReleasedScripts(): FivemScript[] {
    return fivemScriptsClient.getReleasedScripts();
}

export function getInDevelopmentScripts(): FivemScript[] {
    return fivemScriptsClient.getInDevelopmentScripts();
}

export function getComingSoonScripts(): FivemScript[] {
    return fivemScriptsClient.getComingSoonScripts ? fivemScriptsClient.getComingSoonScripts() : [];
}

export function getScriptsByTag(tag: string): FivemScript[] {
    return fivemScriptsClient.getScriptsByTag(tag);
}

export function getAllFrameworks(): string[] {
    return fivemScriptsClient.getAllFrameworks();
}
