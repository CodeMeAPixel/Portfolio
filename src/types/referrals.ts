export interface Referral {
    id: string;
    title: string;
    description: string;
    company: string;
    bannerImage?: string;
    color?: string; // Tailwind color class
    url: string;
    code?: string; // Promo/referral code
    discount?: string; // Description of the discount (e.g., "20% off first month")
    benefits?: string[]; // List of benefits for using this referral
    featured?: boolean;
    category: string;
    categoryName: string; // Display name for the category
    expiryDate?: string; // ISO date string for when the referral expires
    new?: boolean; // Flag for highlighting new referrals
}

export interface ReferralCategory {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string; // Tailwind color class
}
