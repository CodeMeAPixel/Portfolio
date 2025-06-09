import { Referral, ReferralCategory } from "@/types/referrals";
import { referrals, categories } from "./data";

export class ReferralsClient {
    private static instance: ReferralsClient;
    private referralsCache: Referral[] | null = null;
    private categoriesCache: ReferralCategory[] | null = null;

    private constructor() { }

    public static getInstance(): ReferralsClient {
        if (!ReferralsClient.instance) {
            ReferralsClient.instance = new ReferralsClient();
        }
        return ReferralsClient.instance;
    }

    public getAllReferrals(): Referral[] {
        if (this.referralsCache) {
            return this.referralsCache;
        }

        this.referralsCache = referrals;
        return this.referralsCache;
    }

    public getAllCategories(): ReferralCategory[] {
        if (this.categoriesCache) {
            return this.categoriesCache;
        }

        this.categoriesCache = categories;
        return this.categoriesCache;
    }

    public getReferralById(id: string): Referral | undefined {
        return this.getAllReferrals().find(referral => referral.id === id);
    }

    public getReferralsByCategory(categoryId: string): Referral[] {
        return this.getAllReferrals().filter(referral => referral.category === categoryId);
    }

    public getFeaturedReferrals(): Referral[] {
        return this.getAllReferrals().filter(referral => referral.featured);
    }

    public getNewReferrals(): Referral[] {
        return this.getAllReferrals().filter(referral => referral.new);
    }

    public getCategoryById(id: string): ReferralCategory | undefined {
        return this.getAllCategories().find(category => category.id === id);
    }

    public getAllCategoryIds(): string[] {
        return this.getAllCategories().map(category => category.id);
    }
}

export default ReferralsClient.getInstance();
