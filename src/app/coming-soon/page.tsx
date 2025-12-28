"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/static/Navbar";
import ComingSoon from "@/components/ui/ComingSoon";
import { getRouteInfo } from "@/lib/routes";

// Create a separate client component for the content that uses useSearchParams
const ComingSoonContent = () => {
    const { useSearchParams } = require("next/navigation");
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
    );
};

// Main page component with Suspense boundary
export default function ComingSoonPage() {
    return (
        <>
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <ComingSoonContent />
            </Suspense>
        </>
    );
}
