"use client";

import { useTheme } from "../context/ThemeContext";

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
        isLoaded,
    } = useTheme();

    if (!isLoaded) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 p-3 bg-card border border-color-border rounded-lg text-xs text-color-text-muted space-y-1 max-w-[250px]">
            <div className="font-bold text-color-text mb-2">Customization Debug</div>
            <div>Theme: <span className="text-primary-400">{themeColor}</span></div>
            <div>Font: <span className="text-primary-400">{font}</span></div>
            <div>Density: <span className="text-primary-400">{density}</span></div>
            <div>Animations: <span className="text-primary-400">{animationsEnabled ? "On" : "Off"}</span></div>
            <div className="text-color-text-muted/50 text-[10px] mt-2">
                HTML attrs: data-theme="{themeColor}", data-font="{font}", data-density="{density}"
            </div>
        </div>
    );
}
