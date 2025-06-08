import { FivemScript } from "@/types/fivem";
import { allScripts } from "./data";

export class FivemScriptsClient {
    private static instance: FivemScriptsClient;
    private scriptsCache: FivemScript[] | null = null;

    private constructor() { }

    public static getInstance(): FivemScriptsClient {
        if (!FivemScriptsClient.instance) {
            FivemScriptsClient.instance = new FivemScriptsClient();
        }
        return FivemScriptsClient.instance;
    }

    public getAllScripts(): FivemScript[] {
        if (this.scriptsCache) {
            return this.scriptsCache;
        }

        // Use the statically imported scripts
        this.scriptsCache = allScripts;
        return this.scriptsCache;
    }

    public getScriptById(id: string): FivemScript | undefined {
        return this.getAllScripts().find(script => script.id === id);
    }

    public getScriptBySlug(slug: string): FivemScript | undefined {
        return this.getAllScripts().find(script => script.links.slug === slug);
    }

    public getReleasedScripts(): FivemScript[] {
        return this.getAllScripts().filter(script => script.status === "Released");
    }

    public getInDevelopmentScripts(): FivemScript[] {
        return this.getAllScripts().filter(script => script.status === "In Development");
    }

    public getComingSoonScripts(): FivemScript[] {
        return this.getAllScripts().filter(script => script.status === "Coming Soon");
    }

    public getScriptsByFramework(framework: string): FivemScript[] {
        return this.getAllScripts().filter(script =>
            script.framework === framework || script.framework === "Both"
        );
    }

    public getScriptsByTag(tag: string): FivemScript[] {
        return this.getAllScripts().filter(script => script.tags.includes(tag));
    }

    public getAllScriptTags(): string[] {
        const tags = new Set<string>();
        this.getAllScripts().forEach(script => {
            script.tags.forEach(tag => {
                tags.add(tag);
            });
        });
        return Array.from(tags).sort();
    }

    public getAllScriptSlugs(): string[] {
        return this.getAllScripts().map(script => script.links.slug);
    }

    public getAllFrameworks(): string[] {
        const frameworks = new Set<string>();
        this.getAllScripts().forEach(script => {
            frameworks.add(script.framework);
        });
        return Array.from(frameworks).sort();
    }
}

export default FivemScriptsClient.getInstance();
