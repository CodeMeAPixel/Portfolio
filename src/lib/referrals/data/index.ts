import { Referral, ReferralCategory } from "@/types/referrals";
import { categories } from "./categories";
import hostingReferrals from "./hosting";
import toolsReferrals from "./tools";
import servicesReferrals from "./services";
import gamingReferrals from "./gaming";
import educationReferrals from "./education";

// Combine all referrals from different categories
export const referrals: Referral[] = [
    ...hostingReferrals,
    ...toolsReferrals,
    ...servicesReferrals,
    ...gamingReferrals,
    ...educationReferrals
];

export { categories };
