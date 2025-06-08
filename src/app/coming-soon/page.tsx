"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/static/Navbar";
import ComingSoon from "@/components/ui/ComingSoon";
import { getRouteInfo } from "@/lib/routes";

export default function ComingSoonPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [title, setTitle] = useState("Coming Soon");
    const [description, setDescription] = useState("We're working hard to finish the development of this page. Stay tuned for something amazing!");
    const [completionPercentage, setCompletionPercentage] = useState(45);
    const [mounted, setMounted] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Verify this page was accessed through proper channels
        const token = searchParams.get('token');
        const fromPath = searchParams.get('from');

        // If we don't have both token and fromPath, this is likely a direct access
        if (!token || !fromPath) {
            console.log("Unauthorized direct access to coming-soon page");
            router.replace('/');
            return;
        }

        // Otherwise, we'll let the middleware handle validation
        setIsAuthorized(true);
        setMounted(true);

        // Get route info from our centralized route configuration
        const routeInfo = getRouteInfo(fromPath);

        if (routeInfo) {
            setTitle(routeInfo.title);
            setDescription(routeInfo.description);
            setCompletionPercentage(routeInfo.completionPercentage);
        }
    }, [searchParams, router]);

    // Don't render anything while checking authorization or if unauthorized
    if (!mounted || !isAuthorized) return null;

    // Parse the launch date from query parameter, or use default (30 days from now)
    const launchDateParam = searchParams.get('launchDate');
    let launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    if (launchDateParam) {
        try {
            const parsedDate = new Date(launchDateParam);
            if (!isNaN(parsedDate.getTime())) {
                launchDate = parsedDate;
            }
        } catch (e) {
            console.error("Error parsing launch date:", e);
        }
    }

    // Parse notification preference
    const showNotification = searchParams.get('notify') !== 'false';

    return (
        <>
            <Navbar />
            <ComingSoon
                title={title}
                description={description}
                launchDate={launchDate}
                completionPercentage={completionPercentage}
                showBackToHome={true}
                showNotification={showNotification}
                customBackLink={{
                    href: "/",
                    label: "Return to Homepage"
                }}
            />
        </>
    );
}
