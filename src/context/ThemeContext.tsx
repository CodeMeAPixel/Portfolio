"use client";

import { createContext, useContext, useEffect, useState } from "react";

// All available theme options
export const VALID_THEMES = [
  // Classic Colors
  "blue", "purple", "teal", "rose", "amber", "sunset", "emerald", "crimson", "nord", "cyberpunk", "mint",
  "indigo", "violet", "coral", "sage", "slate", "peach", "lavender", "rust", "lime", "ocean", "aurora", "neon", "blood", "everforest", "kanagawa",
  // Pop Culture
  "stranger", "matrix", "synthwave", "dracula", "monokai", "winter-coming", "tron", "vaporwave", "evangelion",
  // Gaming
  "warzone", "valorant", "minecraft", "fortnite", "gta", "hacker", "elden-ring", "dark-souls", "apex-legends", "csgo",
  // Developer
  "tokyo-night", "gruvbox", "solarized", "one-dark", "palenight", "atom", "vscode",
  "rose-pine", "catppuccin", "nightfox", "github-dark", "flexoki"
] as const;

export const VALID_FONTS = ["system", "monospace", "serif", "rounded"] as const;
export const VALID_DENSITIES = ["compact", "normal", "spacious"] as const;

type ThemeColor = typeof VALID_THEMES[number];
type FontChoice = typeof VALID_FONTS[number];
type LayoutDensity = typeof VALID_DENSITIES[number];

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  font: FontChoice;
  setFont: (font: FontChoice) => void;
  density: LayoutDensity;
  setDensity: (density: LayoutDensity) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  soundsEnabled: boolean;
  setSoundsEnabled: (enabled: boolean) => void;
  isLoaded: boolean;
}

const defaultTheme: ThemeColor = "fortnite";
const defaultFont: FontChoice = "system";
const defaultDensity: LayoutDensity = "normal";

const ThemeContext = createContext<ThemeContextType>({
  themeColor: defaultTheme,
  setThemeColor: () => { },
  font: defaultFont,
  setFont: () => { },
  density: defaultDensity,
  setDensity: () => { },
  animationsEnabled: true,
  setAnimationsEnabled: () => { },
  soundsEnabled: true,
  setSoundsEnabled: () => { },
  isLoaded: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>(defaultTheme);
  const [font, setFont] = useState<FontChoice>(defaultFont);
  const [density, setDensity] = useState<LayoutDensity>(defaultDensity);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load all settings from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("themeColor") as ThemeColor;
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        setThemeColor(savedTheme);
      }

      const savedFont = localStorage.getItem("fontChoice") as FontChoice;
      if (savedFont && VALID_FONTS.includes(savedFont)) {
        setFont(savedFont);
      }

      const savedDensity = localStorage.getItem("layoutDensity") as LayoutDensity;
      if (savedDensity && VALID_DENSITIES.includes(savedDensity)) {
        setDensity(savedDensity);
      }

      const savedAnimations = localStorage.getItem("animationsEnabled");
      if (savedAnimations !== null) {
        setAnimationsEnabled(savedAnimations === "true");
      }

      const savedSounds = localStorage.getItem("soundsEnabled");
      if (savedSounds !== null) {
        setSoundsEnabled(savedSounds === "true");
      }
    } catch (error) {
      console.error("Error reading settings from localStorage:", error);
    }

    setIsLoaded(true);
  }, []);

  // Apply settings to DOM
  useEffect(() => {
    if (isLoaded) {
      try {
        document.documentElement.setAttribute("data-theme", themeColor);
        document.documentElement.setAttribute("data-font", font);
        document.documentElement.setAttribute("data-density", density);
        document.documentElement.classList.toggle("animations-disabled", !animationsEnabled);
      } catch (error) {
        console.error("Error applying settings:", error);
      }
    }
  }, [themeColor, font, density, animationsEnabled, isLoaded]);

  const handleSetThemeColor = (color: ThemeColor) => {
    try {
      setThemeColor(color);
      localStorage.setItem("themeColor", color);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  const handleSetFont = (newFont: FontChoice) => {
    try {
      setFont(newFont);
      localStorage.setItem("fontChoice", newFont);
    } catch (error) {
      console.error("Error setting font:", error);
    }
  };

  const handleSetDensity = (newDensity: LayoutDensity) => {
    try {
      setDensity(newDensity);
      localStorage.setItem("layoutDensity", newDensity);
    } catch (error) {
      console.error("Error setting density:", error);
    }
  };

  const handleSetAnimationsEnabled = (enabled: boolean) => {
    try {
      setAnimationsEnabled(enabled);
      localStorage.setItem("animationsEnabled", enabled.toString());
    } catch (error) {
      console.error("Error setting animations:", error);
    }
  };

  const handleSetSoundsEnabled = (enabled: boolean) => {
    try {
      setSoundsEnabled(enabled);
      localStorage.setItem("soundsEnabled", enabled.toString());
    } catch (error) {
      console.error("Error setting sounds:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{
      themeColor,
      setThemeColor: handleSetThemeColor,
      font,
      setFont: handleSetFont,
      density,
      setDensity: handleSetDensity,
      animationsEnabled,
      setAnimationsEnabled: handleSetAnimationsEnabled,
      soundsEnabled,
      setSoundsEnabled: handleSetSoundsEnabled,
      isLoaded
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
