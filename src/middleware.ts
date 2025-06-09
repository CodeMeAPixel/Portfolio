import { NextRequest, NextResponse } from 'next/server';
import { getRouteInfo } from './lib/routes';

const REDIRECT_SECRET = process.env.REDIRECT_SECRET;

/**
 * Generate a secure token for authorized redirects using Web Crypto API
 * @param path The original path being redirected from
 * @returns A secure token
 */
async function generateRedirectToken(path: string): Promise<string> {
    // Create a token string by combining the path and secret
    const tokenData = `${path}:${REDIRECT_SECRET}`;

    // Convert the string to a buffer
    const encoder = new TextEncoder();
    const data = encoder.encode(tokenData);

    // Use Web Crypto API to hash the data (SHA-256)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash buffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Return the first 32 chars of the hash
    return hashHex.substring(0, 32);
}

/**
 * Simplified token generation for synchronous use in middleware
 * This is less secure but works in the edge runtime without async
 */
function generateSimpleToken(path: string): string {
    // Create a simple hash by combining the path and our secret
    const combined = `${path}:${REDIRECT_SECRET}`;

    // Simple hash function that's available in the edge runtime
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    // Convert to a hex string and add some of the original text to make it more unique
    const hexHash = Math.abs(hash).toString(16);

    // Ensure the token is long enough by repeating if necessary
    const tokenBase = hexHash + combined.replace(/[^a-zA-Z0-9]/g, '');
    return tokenBase.substring(0, 32);
}

export function middleware(request: NextRequest) {
    // Get the pathname from the URL
    const path = request.nextUrl.pathname;

    // CASE 1: Direct access to coming-soon page without proper redirect token
    if (path === '/coming-soon') {
        const token = request.nextUrl.searchParams.get('token');
        const fromPath = request.nextUrl.searchParams.get('from');

        // If there's no token or from parameter, or token doesn't match what we expect
        if (!token || !fromPath || token !== generateSimpleToken(fromPath)) {
            // Redirect unauthorized access to home page
            return NextResponse.redirect(new URL('/', request.url));
        }

        // If token is valid, allow access to the coming-soon page
        return NextResponse.next();
    }

    // CASE 2: Access to under construction pages (docs or fivem)
    const isUnderConstruction = path.startsWith('/docs') || path.startsWith('/fivem');

    // Redirect in production mode (or if we want to test in development)
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Toggle this to true if you want to test the coming soon page in development
    const forceRedirectInDev = false;

    if (isUnderConstruction && (!isDevelopment || forceRedirectInDev)) {
        // Clone the current URL
        const url = request.nextUrl.clone();

        // Get route info to pass along as parameters
        const routeInfo = getRouteInfo(path);

        // Change the pathname to /coming-soon
        url.pathname = '/coming-soon';

        // Add the original path as a query parameter
        url.searchParams.set('from', path);

        // Generate and add a secure token to validate this is a legitimate redirect
        url.searchParams.set('token', generateSimpleToken(path));

        // Add notification preference if specified in route config
        if (routeInfo?.showNotification !== undefined) {
            url.searchParams.set('notify', routeInfo.showNotification.toString());
        }

        // Add launch date if specified in route config
        if (routeInfo?.launchDate) {
            url.searchParams.set('launchDate', routeInfo.launchDate.toISOString());
        }

        // Return a redirect response
        return NextResponse.redirect(url);
    }

    // Otherwise, continue with the request
    return NextResponse.next();
}

// Update the matcher to include the coming-soon page
export const config = {
    matcher: ['/docs/:path*', '/fivem/:path*', '/coming-soon'],
};
