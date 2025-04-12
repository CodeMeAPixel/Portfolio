"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeColor = "blue" | "purple" | "teal" | "rose" | "amber";

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  isLoaded: boolean;
}

const defaultTheme: ThemeColor = "purple";

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
      if (savedTheme && ["blue", "purple", "teal", "rose", "amber"].includes(savedTheme)) {
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
