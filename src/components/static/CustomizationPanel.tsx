"use client";

import { useTheme, VALID_FONTS, VALID_DENSITIES } from "@/context/ThemeContext";
import { IoVolumeHigh, IoVolumeMute, IoText, IoResize, IoMusicalNote } from "react-icons/io5";
import { useSounds } from "@/hooks/useSounds";

export function CustomizationPanel() {
    const {
        font,
        setFont,
        density,
        setDensity,
        animationsEnabled,
        setAnimationsEnabled,
        soundsEnabled,
        setSoundsEnabled
    } = useTheme();

    const { playSound } = useSounds();

    const fontLabels: Record<string, string> = {
        "system": "System",
        "monospace": "Monospace",
        "serif": "Serif",
        "rounded": "Rounded"
    };

    const densityLabels: Record<string, string> = {
        "compact": "Compact",
        "normal": "Normal",
        "spacious": "Spacious"
    };

    const handleToggle = (callback: (value: boolean) => void, value: boolean) => {
        playSound("click");
        callback(value);
    };

    const handleSelect = (callback: (value: any) => void, value: any) => {
        playSound("click");
        callback(value);
    };

    return (
        <div className="space-y-6 p-4 overflow-auto overflow-x-auto overflow-y-auto max-h-[400px]">
            {/* Animations Toggle */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                    {animationsEnabled ? <IoVolumeHigh size={16} /> : <IoVolumeMute size={16} />}
                    Animations
                </label>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleToggle(setAnimationsEnabled, true)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${animationsEnabled
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        On
                    </button>
                    <button
                        onClick={() => handleToggle(setAnimationsEnabled, false)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${!animationsEnabled
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        Off
                    </button>
                </div>
            </div>

            {/* Sounds Toggle */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                    <IoMusicalNote size={16} />
                    Sound Effects
                </label>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleToggle(setSoundsEnabled, true)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${soundsEnabled
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        On
                    </button>
                    <button
                        onClick={() => handleToggle(setSoundsEnabled, false)}
                        className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${!soundsEnabled
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        Off
                    </button>
                </div>
            </div>

            {/* Font Selection */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                    <IoText size={16} />
                    Font
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {VALID_FONTS.map((fontOption) => (
                        <button
                            key={fontOption}
                            onClick={() => handleSelect(setFont, fontOption)}
                            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${font === fontOption
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            {fontLabels[fontOption]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Layout Density Selection */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-200">
                    <IoResize size={16} />
                    Density
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {VALID_DENSITIES.map((densityOption) => (
                        <button
                            key={densityOption}
                            onClick={() => handleSelect(setDensity, densityOption)}
                            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${density === densityOption
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            {densityLabels[densityOption]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Settings Summary */}
            <div className="border-t border-gray-700 pt-4 text-xs text-gray-400 space-y-1">
                <p>• Animations: {animationsEnabled ? "On" : "Off"}</p>
                <p>• Sounds: {soundsEnabled ? "On" : "Off"}</p>
                <p>• Font: {fontLabels[font]}</p>
                <p>• Density: {densityLabels[density]}</p>
            </div>
        </div>
    );
}
