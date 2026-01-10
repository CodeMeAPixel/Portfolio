"use client";

import { useTheme } from "@/context/ThemeContext";

/**
 * Debug component to verify customization system is working
 * Remove or hide this in production
 */
export function CustomizationDebug() {
    const {
        themeColor,
        font,
        density,
        animationsEnabled,
        darkMode,
        isLoaded,
    } = useTheme();

    if (!isLoaded) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 p-3 bg-gray-950/90 border border-gray-700 rounded-lg text-xs text-gray-300 space-y-1 max-w-[250px]">
            <div className="font-bold text-gray-200 mb-2">Customization Debug</div>
            <div>Theme: <span className="text-primary-400">{themeColor}</span></div>
            <div>Font: <span className="text-primary-400">{font}</span></div>
            <div>Density: <span className="text-primary-400">{density}</span></div>
            <div>Animations: <span className="text-primary-400">{animationsEnabled ? "On" : "Off"}</span></div>
            <div>Dark Mode: <span className="text-primary-400">{darkMode ? "On" : "Off"}</span></div>
            <div className="text-gray-500 text-[10px] mt-2">
                HTML attrs: data-theme="{themeColor}", data-font="{font}", data-density="{density}"
            </div>
        </div>
    );
}
