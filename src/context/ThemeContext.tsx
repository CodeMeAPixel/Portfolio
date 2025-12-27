"use client";

import { createContext, useContext, useEffect, useState } from "react";

// All available theme options
export const VALID_THEMES = [
  "blue", "purple", "teal", "rose", "amber", "sunset", "emerald", "crimson", "nord", "cyberpunk", "mint",
  "stranger", "matrix", "synthwave", "dracula", "monokai",
  "warzone", "valorant", "minecraft", "fortnite", "gta", "hacker", "ocean", "aurora", "blood", "neon"
] as const;

type ThemeColor = typeof VALID_THEMES[number];

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isLoaded: boolean;
}

const defaultTheme: ThemeColor = "stranger";

const ThemeContext = createContext<ThemeContextType>({
  themeColor: defaultTheme,
  setThemeColor: () => { },
  isLoaded: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with the default theme to match SSR
  const [themeColor, setThemeColor] = useState<ThemeColor>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);

  // Only run on client-side after initial render
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("themeColor") as ThemeColor;
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        setThemeColor(savedTheme);
      }
    } catch (error) {
      console.error("Error reading theme from localStorage:", error);
    }

    setIsLoaded(true);
  }, []);

  // Sync the theme attribute whenever themeColor changes
  useEffect(() => {
    if (isLoaded) {
      try {
        document.documentElement.setAttribute("data-theme", themeColor);
      } catch (error) {
        console.error("Error setting theme attribute:", error);
      }
    }
  }, [themeColor, isLoaded]);

  const handleSetThemeColor = (color: ThemeColor) => {
    try {
      setThemeColor(color);
      localStorage.setItem("themeColor", color);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor: handleSetThemeColor, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
