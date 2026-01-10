"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";

/**
 * This component applies all customization settings to the document root.
 * It should be placed in the root layout for site-wide effect.
 */
export function ApplyCustomizations() {
    const {
        themeColor,
        font,
        density,
        animationsEnabled,
        isLoaded
    } = useTheme();

    useEffect(() => {
        if (!isLoaded) return;

        const html = document.documentElement;

        try {
            // Apply theme color
            html.setAttribute("data-theme", themeColor);

            // Apply font choice
            html.setAttribute("data-font", font);

            // Apply layout density
            html.setAttribute("data-density", density);

            // Toggle animations
            if (animationsEnabled) {
                html.classList.remove("animations-disabled");
            } else {
                html.classList.add("animations-disabled");
            }
        } catch (error) {
            console.error("Error applying customizations:", error);
        }
    }, [themeColor, font, density, animationsEnabled, isLoaded]);

    return null;
}
