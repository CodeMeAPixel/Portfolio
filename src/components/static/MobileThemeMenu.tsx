"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { IoClose, IoColorPaletteOutline, IoGameController, IoSparkles, IoCodeSlash, IoCheckmark, IoCheckmarkCircleOutline } from "react-icons/io5";

type ThemeCategory = "gaming" | "popculture" | "classic" | "developer";

type ThemeOption = {
    name: string;
    label: string;
    color: string;
    gradient: string;
    category: ThemeCategory;
    icon?: string;
};

const themeOptions: ThemeOption[] = [
    // 🎮 Gaming Inspired Themes
    { name: "warzone", label: "Warzone", color: "rgb(255, 140, 0)", gradient: "from-orange-500 via-yellow-500 to-orange-600", category: "gaming", icon: "🎯" },
    { name: "valorant", label: "Valorant", color: "rgb(255, 70, 85)", gradient: "from-red-500 to-red-700", category: "gaming", icon: "⚔️" },
    { name: "minecraft", label: "Minecraft", color: "rgb(100, 180, 80)", gradient: "from-green-500 to-emerald-600", category: "gaming", icon: "⛏️" },
    { name: "fortnite", label: "Fortnite", color: "rgb(150, 80, 255)", gradient: "from-purple-500 via-blue-500 to-purple-600", category: "gaming", icon: "🎮" },
    { name: "gta", label: "GTA Vice", color: "rgb(255, 100, 200)", gradient: "from-pink-400 via-purple-500 to-cyan-400", category: "gaming", icon: "🌴" },

    // 🎬 Pop Culture Themes
    { name: "stranger", label: "Stranger Things", color: "rgb(230, 50, 40)", gradient: "from-red-600 to-red-400", category: "popculture", icon: "👾" },
    { name: "matrix", label: "Matrix", color: "rgb(0, 230, 0)", gradient: "from-green-500 to-green-300", category: "popculture", icon: "💊" },
    { name: "synthwave", label: "Synthwave", color: "rgb(255, 50, 180)", gradient: "from-pink-500 to-cyan-400", category: "popculture", icon: "🌆" },
    { name: "hacker", label: "Mr. Robot", color: "rgb(0, 200, 150)", gradient: "from-teal-400 to-green-500", category: "popculture", icon: "🎭" },
    { name: "blood", label: "Blade Runner", color: "rgb(255, 60, 100)", gradient: "from-rose-500 via-red-500 to-orange-500", category: "popculture", icon: "🦇" },

    // 💻 Developer Themes
    { name: "dracula", label: "Dracula", color: "rgb(189, 147, 249)", gradient: "from-purple-400 to-pink-400", category: "developer", icon: "🧛" },
    { name: "monokai", label: "Monokai", color: "rgb(166, 226, 46)", gradient: "from-yellow-400 to-green-400", category: "developer", icon: "📝" },
    { name: "nord", label: "Nord", color: "rgb(49, 112, 179)", gradient: "from-blue-700 to-blue-500", category: "developer", icon: "❄️" },
    { name: "cyberpunk", label: "Cyberpunk", color: "rgb(236, 236, 0)", gradient: "from-yellow-400 to-fuchsia-600", category: "developer", icon: "⚡" },

    // 🎨 Classic Themes
    { name: "ocean", label: "Deep Ocean", color: "rgb(0, 150, 200)", gradient: "from-cyan-500 via-blue-600 to-indigo-700", category: "classic", icon: "🌊" },
    { name: "aurora", label: "Northern Lights", color: "rgb(100, 255, 180)", gradient: "from-green-400 via-teal-400 to-purple-500", category: "classic", icon: "✨" },
    { name: "neon", label: "Neon City", color: "rgb(255, 0, 255)", gradient: "from-fuchsia-500 via-purple-500 to-cyan-500", category: "classic", icon: "🌃" },
    { name: "blue", label: "Blue", color: "rgb(37, 99, 235)", gradient: "from-blue-600 to-blue-400", category: "classic" },
    { name: "purple", label: "Purple", color: "rgb(147, 51, 234)", gradient: "from-purple-600 to-purple-400", category: "classic" },
    { name: "teal", label: "Teal", color: "rgb(13, 148, 136)", gradient: "from-teal-600 to-teal-400", category: "classic" },
    { name: "rose", label: "Rose", color: "rgb(225, 29, 72)", gradient: "from-rose-600 to-rose-400", category: "classic" },
    { name: "amber", label: "Amber", color: "rgb(217, 119, 6)", gradient: "from-amber-600 to-amber-400", category: "classic" },
    { name: "sunset", label: "Sunset", color: "rgb(234, 88, 12)", gradient: "from-orange-600 to-orange-400", category: "classic" },
    { name: "emerald", label: "Emerald", color: "rgb(5, 150, 105)", gradient: "from-emerald-600 to-emerald-400", category: "classic" },
    { name: "crimson", label: "Crimson", color: "rgb(220, 38, 38)", gradient: "from-red-600 to-red-400", category: "classic" },
    { name: "mint", label: "Mint", color: "rgb(34, 197, 94)", gradient: "from-green-600 to-green-400", category: "classic" }
];

const categoryConfig: Record<ThemeCategory, { label: string; icon: React.ReactNode }> = {
    gaming: { label: "Gaming", icon: <IoGameController className="w-3 h-3" /> },
    popculture: { label: "Pop Culture", icon: <IoSparkles className="w-3 h-3" /> },
    developer: { label: "Developer", icon: <IoCodeSlash className="w-3 h-3" /> },
    classic: { label: "Classic", icon: <IoColorPaletteOutline className="w-3 h-3" /> }
};

export default function MobileThemeMenu() {
    const { themeColor, setThemeColor, isLoaded } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<ThemeCategory | "all">("all");

    if (!isLoaded) {
        return <div className="w-10 h-10" aria-hidden="true" />;
    }

    const currentTheme = themeOptions.find(option => option.name === themeColor) || themeOptions[0];
    const filteredThemes = activeCategory === "all"
        ? themeOptions
        : themeOptions.filter(t => t.category === activeCategory);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <button
                    className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:scale-105 active:scale-95 transition-transform bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                    aria-label="Open theme menu"
                >
                    <div
                        className="absolute inset-0 rounded-lg opacity-40 blur-md"
                        style={{ backgroundColor: currentTheme.color }}
                    />
                    <IoColorPaletteOutline className="w-5 h-5 relative z-10 text-color-text hover:text-primary-400 transition-colors" />
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed -inset-0 bg-black/90 z-[10000] animate-fade-in" />
                <Dialog.Content className="fixed inset-x-4 bottom-auto top-1/2 -translate-y-1/2 max-h-[80vh] bg-gray-950/95 border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-[10001] overflow-hidden animate-in fade-in zoom-in-90 duration-300 focus:outline-none">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gray-900/80">
                        <Dialog.Title className="flex items-center gap-2 text-sm font-semibold">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${currentTheme.gradient}`} />
                            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                Choose Theme
                            </span>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button
                                className="p-1.5 rounded-lg text-color-text-muted hover:text-color-text hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                                aria-label="Close"
                            >
                                <IoClose className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-1 p-3 border-b border-white/10 bg-gray-900/60 overflow-x-auto">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${activeCategory === "all"
                                ? "bg-gradient-to-r from-primary-500/30 to-accent-500/20 text-primary-300 border border-primary-500/30"
                                : "text-color-text-muted hover:bg-white/5"
                                }`}
                        >
                            All
                        </button>
                        {(Object.keys(categoryConfig) as ThemeCategory[]).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-1 ${activeCategory === cat
                                    ? "bg-gradient-to-r from-primary-500/30 to-accent-500/20 text-primary-300 border border-primary-500/30"
                                    : "text-color-text-muted hover:bg-white/5"
                                    }`}
                            >
                                {categoryConfig[cat].icon}
                                {categoryConfig[cat].label}
                            </button>
                        ))}
                    </div>

                    {/* Theme Grid */}
                    <div className="p-4 overflow-y-auto max-h-[55vh] custom-scrollbar bg-gray-950/50">
                        <div className="grid grid-cols-2 gap-3 pb-8">
                            {filteredThemes.map((option) => {
                                const isActive = themeColor === option.name;

                                return (
                                    <button
                                        key={option.name}
                                        onClick={() => {
                                            setThemeColor(option.name as any);
                                            setIsOpen(false);
                                        }}
                                        className={`
                                            flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300
                                            hover:scale-[1.02] active:scale-[0.98]
                                            ${isActive
                                                ? 'bg-primary-500/20 ring-1.5 ring-primary-500/50 text-primary-300'
                                                : 'bg-white/8 hover:bg-white/15 text-color-text-muted hover:text-color-text'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="relative">
                                                <div
                                                    className={`w-10 h-10 rounded-xl ring-1 overflow-hidden transition-all ${isActive ? 'ring-primary-400' : 'ring-white/10'
                                                        }`}
                                                >
                                                    <div className={`w-full h-full bg-gradient-to-br ${option.gradient}`} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start min-w-0">
                                                <span className={`text-xs font-bold truncate ${isActive ? 'text-primary-300' : 'text-color-text'}`}>
                                                    {option.label}
                                                </span>
                                                <span className="text-[10px] opacity-70 capitalize text-color-text-muted">
                                                    {categoryConfig[option.category].label}
                                                </span>
                                            </div>
                                        </div>
                                        {isActive && (
                                            <IoCheckmarkCircleOutline className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10 bg-gray-900/80">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-color-text-muted">
                                <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${currentTheme.gradient}`} />
                                <span>Current: <strong className="text-primary-300 font-semibold">{currentTheme.label}</strong></span>
                            </div>
                            <span className="text-[10px] text-color-text-muted">
                                {themeOptions.length} themes
                            </span>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
