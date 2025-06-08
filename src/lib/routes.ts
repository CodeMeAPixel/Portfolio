interface RouteInfo {
    title: string;
    description: string;
    completionPercentage: number;
    inDevelopment: boolean;
    launchDate?: Date;
    showNotification?: boolean;
}

export const routeConfig: Record<string, RouteInfo> = {
    docs: {
        title: "Documentation Coming Soon",
        description: "My comprehensive documentation is currently under development. Check back soon for detailed guides and resources.",
        completionPercentage: 10,
        inDevelopment: true,
        launchDate: new Date(new Date().setDate(new Date().getDate() + 120)),
        showNotification: false
    },
    fivem: {
        title: "FiveM Resources Coming Soon",
        description: "I am working on an exciting new section where you can browse, purchase and download my FiveM scripts, view instructions for adding them to your server and more.",
        completionPercentage: 25,
        inDevelopment: true,
        launchDate: new Date(new Date().setDate(new Date().getDate() + 60)),
        showNotification: false
    },
};

/**
 * Check if a route is in development mode
 * @param path The route path to check
 * @returns Boolean indicating if the route is in development
 */
export function isRouteInDevelopment(path: string): boolean {
    // Extract the first segment of the path
    const segment = path.split('/')[1];

    // Check if this segment exists in our route config and is marked as in development
    return !!routeConfig[segment]?.inDevelopment;
}

/**
 * Get route information for a specific path
 * @param path The route path
 * @returns Route information or undefined if not found
 */
export function getRouteInfo(path: string): RouteInfo | undefined {
    const segment = path.split('/')[1];
    return routeConfig[segment];
}
