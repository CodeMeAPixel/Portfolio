"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { IoColorPaletteOutline, IoChevronDown, IoCheckmark, IoGameController, IoSparkles, IoCodeSlash } from "react-icons/io5";

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
  {
    name: "warzone",
    label: "Warzone",
    color: "rgb(255, 140, 0)",
    gradient: "from-orange-500 via-yellow-500 to-orange-600",
    category: "gaming",
    icon: "🎯"
  },
  {
    name: "valorant",
    label: "Valorant",
    color: "rgb(255, 70, 85)",
    gradient: "from-red-500 to-red-700",
    category: "gaming",
    icon: "⚔️"
  },
  {
    name: "minecraft",
    label: "Minecraft",
    color: "rgb(100, 180, 80)",
    gradient: "from-green-500 to-emerald-600",
    category: "gaming",
    icon: "⛏️"
  },
  {
    name: "fortnite",
    label: "Fortnite",
    color: "rgb(150, 80, 255)",
    gradient: "from-purple-500 via-blue-500 to-purple-600",
    category: "gaming",
    icon: "🎮"
  },
  {
    name: "gta",
    label: "GTA Vice",
    color: "rgb(255, 100, 200)",
    gradient: "from-pink-400 via-purple-500 to-cyan-400",
    category: "gaming",
    icon: "🌴"
  },

  // 🎬 Pop Culture Inspired Themes
  {
    name: "stranger",
    label: "Stranger Things",
    color: "rgb(230, 50, 40)",
    gradient: "from-red-600 to-red-400",
    category: "popculture",
    icon: "👾"
  },
  {
    name: "matrix",
    label: "Matrix",
    color: "rgb(0, 230, 0)",
    gradient: "from-green-500 to-green-300",
    category: "popculture",
    icon: "💊"
  },
  {
    name: "synthwave",
    label: "Synthwave",
    color: "rgb(255, 50, 180)",
    gradient: "from-pink-500 to-cyan-400",
    category: "popculture",
    icon: "🌆"
  },
  {
    name: "hacker",
    label: "Mr. Robot",
    color: "rgb(0, 200, 150)",
    gradient: "from-teal-400 to-green-500",
    category: "popculture",
    icon: "🎭"
  },
  {
    name: "blood",
    label: "Blade Runner",
    color: "rgb(255, 60, 100)",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    category: "popculture",
    icon: "🦇"
  },

  // 💻 Developer Themes
  {
    name: "dracula",
    label: "Dracula",
    color: "rgb(189, 147, 249)",
    gradient: "from-purple-400 to-pink-400",
    category: "developer",
    icon: "🧛"
  },
  {
    name: "monokai",
    label: "Monokai",
    color: "rgb(166, 226, 46)",
    gradient: "from-yellow-400 to-green-400",
    category: "developer",
    icon: "📝"
  },
  {
    name: "nord",
    label: "Nord",
    color: "rgb(49, 112, 179)",
    gradient: "from-blue-700 to-blue-500",
    category: "developer",
    icon: "❄️"
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    color: "rgb(236, 236, 0)",
    gradient: "from-yellow-400 to-fuchsia-600",
    category: "developer",
    icon: "⚡"
  },

  // 🎨 Premium Nature/Abstract Themes  
  {
    name: "ocean",
    label: "Deep Ocean",
    color: "rgb(0, 150, 200)",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    category: "classic",
    icon: "🌊"
  },
  {
    name: "aurora",
    label: "Northern Lights",
    color: "rgb(100, 255, 180)",
    gradient: "from-green-400 via-teal-400 to-purple-500",
    category: "classic",
    icon: "✨"
  },
  {
    name: "neon",
    label: "Neon City",
    color: "rgb(255, 0, 255)",
    gradient: "from-fuchsia-500 via-purple-500 to-cyan-500",
    category: "classic",
    icon: "🌃"
  },

  // Classic Color Themes
  {
    name: "blue",
    label: "Blue",
    color: "rgb(37, 99, 235)",
    gradient: "from-blue-600 to-blue-400",
    category: "classic"
  },
  {
    name: "purple",
    label: "Purple",
    color: "rgb(147, 51, 234)",
    gradient: "from-purple-600 to-purple-400",
    category: "classic"
  },
  {
    name: "teal",
    label: "Teal",
    color: "rgb(13, 148, 136)",
    gradient: "from-teal-600 to-teal-400",
    category: "classic"
  },
  {
    name: "rose",
    label: "Rose",
    color: "rgb(225, 29, 72)",
    gradient: "from-rose-600 to-rose-400",
    category: "classic"
  },
  {
    name: "amber",
    label: "Amber",
    color: "rgb(217, 119, 6)",
    gradient: "from-amber-600 to-amber-400",
    category: "classic"
  },
  {
    name: "sunset",
    label: "Sunset",
    color: "rgb(234, 88, 12)",
    gradient: "from-orange-600 to-orange-400",
    category: "classic"
  },
  {
    name: "emerald",
    label: "Emerald",
    color: "rgb(5, 150, 105)",
    gradient: "from-emerald-600 to-emerald-400",
    category: "classic"
  },
  {
    name: "crimson",
    label: "Crimson",
    color: "rgb(220, 38, 38)",
    gradient: "from-red-600 to-red-400",
    category: "classic"
  },
  {
    name: "mint",
    label: "Mint",
    color: "rgb(34, 197, 94)",
    gradient: "from-green-600 to-green-400",
    category: "classic"
  }
];

const categoryConfig: Record<ThemeCategory, { label: string; icon: React.ReactNode }> = {
  gaming: { label: "Gaming", icon: <IoGameController className="w-3 h-3" /> },
  popculture: { label: "Pop Culture", icon: <IoSparkles className="w-3 h-3" /> },
  developer: { label: "Developer", icon: <IoCodeSlash className="w-3 h-3" /> },
  classic: { label: "Classic", icon: <IoColorPaletteOutline className="w-3 h-3" /> }
};

export default function ThemeSelector({ minimal = false }: { minimal?: boolean }) {
  const { themeColor, setThemeColor, isLoaded } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ThemeCategory | "all">("all");

  // Don't render anything until client-side theme is loaded
  if (!isLoaded) {
    return minimal ? (
      <div className="btn-icon relative" aria-hidden="true" />
    ) : (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" aria-hidden="true" />
    );
  }

  const currentTheme = themeOptions.find(option => option.name === themeColor) || themeOptions[0];
  const filteredThemes = activeCategory === "all"
    ? themeOptions
    : themeOptions.filter(t => t.category === activeCategory);

  if (minimal) {
    return (
      <Tooltip.Provider delayDuration={300}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.button
              className="btn-icon relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Change theme color"
              onClick={() => setIsOpen(true)}
            >
              <div
                className="w-full h-full absolute inset-0 rounded-full opacity-75"
                style={{ backgroundColor: currentTheme.color }}
              />
              <IoColorPaletteOutline className="w-5 h-5 relative z-10 text-white mix-blend-difference" />
            </motion.button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="bg-card border border-color-border rounded-md px-3 py-2 text-sm shadow-md z-50"
              sideOffset={5}
              side="bottom"
              align="center"
            >
              Change theme
              <Tooltip.Arrow className="fill-card" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <motion.button
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: currentTheme.color }}
          />
          <span className="text-xs font-medium text-color-text-muted flex items-center gap-1">
            {currentTheme.icon && <span>{currentTheme.icon}</span>}
            {currentTheme.label}
          </span>
          <IoChevronDown className="w-4 h-4 text-color-text-muted" />
        </motion.button>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[280px] max-h-[500px] overflow-hidden bg-bg/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 z-50"
              sideOffset={8}
              align="end"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                {/* Category Tabs */}
                <div className="flex items-center gap-1 p-2 border-b border-white/10 overflow-x-auto">
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
                <div className="p-2 max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-1.5">
                    {filteredThemes.map((option) => (
                      <DropdownMenu.Item
                        key={option.name}
                        className={`
                          flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs
                          focus:outline-none cursor-pointer transition-all duration-200
                          ${themeColor === option.name
                            ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 text-primary-300 ring-1 ring-primary-500/30'
                            : 'text-color-text-muted hover:bg-white/5'
                          }
                        `}
                        onClick={() => {
                          setThemeColor(option.name as any);
                          setIsOpen(false);
                        }}
                      >
                        <div className="relative w-5 h-5 rounded-lg overflow-hidden ring-1 ring-white/20 flex-shrink-0">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${option.gradient}`}
                          />
                          {themeColor === option.name && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <IoCheckmark className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium truncate flex items-center gap-1">
                            {option.icon && <span className="text-[10px]">{option.icon}</span>}
                            {option.label}
                          </span>
                        </div>
                      </DropdownMenu.Item>
                    ))}
                  </div>
                </div>

                {/* Current Theme Info */}
                <div className="p-2 border-t border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 text-[10px] text-color-text-muted">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${currentTheme.gradient}`}
                    />
                    <span>Current: <strong className="text-primary-300">{currentTheme.label}</strong></span>
                  </div>
                </div>
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
