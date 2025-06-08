import { Referral, ReferralCategory } from "@/types/referrals";
import referralsClient from "@/lib/referrals/client";

export function getAllReferrals(): Referral[] {
    return referralsClient.getAllReferrals();
}

export function getAllCategories(): ReferralCategory[] {
    return referralsClient.getAllCategories();
}

export function getReferralById(id: string): Referral | undefined {
    return referralsClient.getReferralById(id);
}

export function getReferralsByCategory(categoryId: string): Referral[] {
    return referralsClient.getReferralsByCategory(categoryId);
}

export function getFeaturedReferrals(): Referral[] {
    return referralsClient.getFeaturedReferrals();
}

export function getNewReferrals(): Referral[] {
    return referralsClient.getNewReferrals();
}

export function getCategoryById(id: string): ReferralCategory | undefined {
    return referralsClient.getCategoryById(id);
}

export function getAllCategoryIds(): string[] {
    return referralsClient.getAllCategoryIds();
}
