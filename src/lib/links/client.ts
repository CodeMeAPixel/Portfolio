import { LinkHubProfile, LinkItem, SocialLink, LinkCategory } from "@/types/links";
import { linkHubProfile } from "./data";

export class LinksClient {
    private static instance: LinksClient;
    private profile: LinkHubProfile;

    private constructor() {
        this.profile = linkHubProfile;
    }

    public static getInstance(): LinksClient {
        if (!LinksClient.instance) {
            LinksClient.instance = new LinksClient();
        }
        return LinksClient.instance;
    }

    public getProfile(): LinkHubProfile {
        return this.profile;
    }

    public getAllLinks(): LinkItem[] {
        const featuredLinks = this.profile.featuredLinks;
        const categoryLinks = this.profile.categories.flatMap(category => category.links);
        return [...featuredLinks, ...categoryLinks];
    }

    public getSocialLinks(): SocialLink[] {
        return this.profile.socialLinks;
    }

    public getFeaturedLinks(): LinkItem[] {
        return this.profile.featuredLinks;
    }

    public getCategories(): LinkCategory[] {
        return this.profile.categories;
    }

    public getLinksByCategory(categoryId: string): LinkItem[] {
        const category = this.profile.categories.find(cat => cat.id === categoryId);
        return category ? category.links : [];
    }

    public getLinkById(linkId: string): LinkItem | undefined {
        const allLinks = this.getAllLinks();
        return allLinks.find(link => link.id === linkId);
    }

    public updateDiscordStatus(discordStatus: any): void {
        this.profile.discord = discordStatus;
    }
}

export default LinksClient.getInstance();
