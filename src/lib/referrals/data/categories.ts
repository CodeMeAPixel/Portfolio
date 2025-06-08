import { ReferralCategory } from "@/types/referrals";

export const categories: ReferralCategory[] = [
    {
        id: "hosting",
        name: "Web Hosting",
        description: "Hosting services for your websites and applications",
        icon: "IoServerOutline",
        color: "text-blue-500"
    },
    {
        id: "tools",
        name: "Development Tools",
        description: "Software and tools for developers",
        icon: "IoCodeSlashOutline",
        color: "text-purple-500"
    },
    {
        id: "services",
        name: "Online Services",
        description: "Subscription services and SaaS products",
        icon: "IoCloudOutline",
        color: "text-green-500"
    },
    {
        id: "gaming",
        name: "Gaming",
        description: "Gaming platforms and services",
        icon: "IoGameControllerOutline",
        color: "text-red-500"
    },
    {
        id: "education",
        name: "Education",
        description: "Learning platforms and courses",
        icon: "IoSchoolOutline",
        color: "text-yellow-500"
    }
];
