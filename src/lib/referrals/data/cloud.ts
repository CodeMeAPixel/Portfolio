import { Referral } from "@/types/referrals";

const cloudReferrals: Referral[] = [
    {
        id: "railway-cloud",
        title: 'Railway',
        description: 'Railway is a deployment platform designed to streamline the software development life-cycle, starting with instant deployments and effortless scaling.',
        company: 'Railway',
        url: 'https://railway.com?referralCode=pixelateme',
        discount: '$5/30 Day Credit',
        code: 'pixelateme',
        benefits: [
            'Instant deployments from Git',
            'Auto-scaling infrastructure',
            'Built-in databases',
            'Zero-config deployments',
            'Pay-per-use pricing'
        ],
        featured: false,
        category: 'cloud',
        categoryName: 'Cloud Platform',
        color: 'bg-purple-500',
        bannerImage: '/referrals/railway/banner.png',
        new: false
    },
];

export default cloudReferrals;
