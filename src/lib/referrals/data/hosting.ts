import { Referral } from "@/types/referrals";

const hostingReferrals: Referral[] = [
    {
        id: "linode-cloud-credits",
        title: 'Linode',
        description: 'Get $100 in free cloud credits when you sign up for Linode. Perfect for testing and deploying your applications with high-performance cloud infrastructure.',
        company: 'Linode',
        url: 'https://www.linode.com/lp/free-credit-100/?promo=sitelin100-02162023&promo_value=100&promo_length=60&utm_source=google&utm_medium=cpc&utm_campaign=f-mc-65659&utm_id=cloud&utm_content=US-EN_NB_CL_PLG_VPS&utm_placement=NORAM&gad_source=1&gad_campaignid=1706209438&gbraid=0AAAAAD_kTnU_6NOh2232VK6X1aifmopsu&gclid=CjwKCAjw6ZTCBhBOEiwAqfwJd_vB7YSVVRGC3YdUCYBTg08Q0gDRNwZHeGzxJKn7r9h0jXH0cpRDTxoCfx0QAvD_BwE',
        code: 'sitelin100-02162023',
        discount: '$100/60 Day Credit',
        benefits: [
            'High-performance SSD storage',
            '11 global data centers',
            '24/7 customer support',
            'Easy-to-use cloud manager'
        ],
        featured: true,
        category: 'hosting',
        categoryName: 'Cloud Hosting',
        color: 'bg-green-500',
        bannerImage: '/referrals/linode/banner.png',
        new: true
    },
    {
        id: "digitalocean-free-credits",
        title: 'Digital Ocean',
        description: 'Cloud platform to deploy, manage & scale applications. Get free $200 credit over 60 days to build and scale your projects.',
        company: 'DigitalOcean',
        url: 'https://m.do.co/c/a7f497dd62e5',
        discount: '$200/60 Day Credit',
        code: 'a7f497dd62e5',
        benefits: [
            'Simple cloud computing',
            'Predictable pricing',
            'Developer-friendly tools',
            'Global data centers'
        ],
        featured: true,
        category: 'hosting',
        categoryName: 'Cloud Hosting',
        color: 'bg-blue-500',
        bannerImage: '/referrals/digital-ocean/banner.png',
        new: false
    },
    {
        id: "nodebyte-free-month",
        title: 'NodeByte',
        description: 'Fast, reliable, scalable and secure hosting services for your business or gaming experience. Get 10% off at checkout.',
        company: 'NodeByte',
        url: 'https://nodebyte.host',
        code: 'INFINITY',
        discount: '10% off at checkout',
        benefits: [
            '10% discount on all plans',
            'High-performance hardware',
            'Custom modpack support',
            '24/7 server monitoring',
            'Easy server management panel'
        ],
        featured: true,
        category: 'hosting',
        categoryName: 'Game Hosting',
        color: 'bg-green-600',
        bannerImage: '/referrals/nodebyte/banner.png',
        new: true
    },
    {
        id: "cybrancee-hosting",
        title: 'Cybrancee',
        description: 'Cybrancee provides users with a powerful platform to host their digital projects. Get one month free with our exclusive code.',
        company: 'Cybrancee',
        url: 'https://cybrancee.com',
        code: 'INFINITYBOTS',
        discount: 'One month free',
        benefits: [
            'One month free hosting',
            'Powerful hosting platform',
            'Digital project hosting',
            'Reliable infrastructure',
            'Easy project management'
        ],
        featured: false,
        category: 'hosting',
        categoryName: 'Web Hosting',
        color: 'bg-purple-600',
        bannerImage: '/referrals/cybrancee/banner.png',
        new: false
    },
    {
        id: "zap-hosting-affiliate",
        title: 'ZAP-Hosting',
        description: 'Get a 20% discount for the entire duration of all rental servers (excluding dedicated servers).',
        company: 'ZAP-Hosting',
        url: 'https://zap-hosting.com',
        code: 'CodeMeAPixel-a-2410',
        discount: '20% off rental servers',
        benefits: [
            '20% discount for entire duration',
            'All rental servers included',
            'Game server hosting',
            'Web hosting solutions',
            'DDoS protection included'
        ],
        featured: true,
        category: 'hosting',
        categoryName: 'Game Hosting',
        color: 'bg-red-500',
        bannerImage: '/referrals/zap/banner.png',
        new: true
    }
];

export default hostingReferrals;
