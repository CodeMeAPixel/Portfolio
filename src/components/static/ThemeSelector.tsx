"use client";

import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";

type ThemeOption = {
  name: "blue" | "purple" | "teal" | "rose" | "amber";
  label: string;
  color: string;
  gradient: string;
};

const themeOptions: ThemeOption[] = [
  {
    name: "blue",
    label: "Blue",
    color: "rgb(37, 99, 235)",
    gradient: "from-blue-600 to-blue-400"
  },
  {
    name: "purple",
    label: "Purple",
    color: "rgb(147, 51, 234)",
    gradient: "from-purple-600 to-purple-400"
  },
  {
    name: "teal",
    label: "Teal",
    color: "rgb(13, 148, 136)",
    gradient: "from-teal-600 to-teal-400"
  },
  {
    name: "rose",
    label: "Rose",
    color: "rgb(225, 29, 72)",
    gradient: "from-rose-600 to-rose-400"
  },
  {
    name: "amber",
    label: "Amber",
    color: "rgb(217, 119, 6)",
    gradient: "from-amber-600 to-amber-400"
  },
];

export default function ThemeSelector({ minimal = false }: { minimal?: boolean }) {
  const { themeColor, setThemeColor, isLoaded } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render anything until client-side theme is loaded
  if (!isLoaded) {
    return minimal ? (
      <div className="btn-icon relative" aria-hidden="true" />
    ) : (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" aria-hidden="true" />
    );
  }

  const currentTheme = themeOptions.find(option => option.name === themeColor) || themeOptions[0];

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
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-color-border hover:border-primary-500 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: currentTheme.color }}
          />
          <span className="text-sm font-medium text-color-text-muted">
            {currentTheme.label}
          </span>
          <IoChevronDown className="w-4 h-4 text-color-text-muted" />
        </motion.button>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-card border border-color-border rounded-lg shadow-lg backdrop-blur-lg p-2 z-50"
              sideOffset={5}
              align="center"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownMenu.Label className="text-xs font-semibold uppercase tracking-wider text-color-text-muted px-2 py-1.5">
                  Theme Colors
                </DropdownMenu.Label>

                {themeOptions.map((option) => (
                  <DropdownMenu.Item
                    key={option.name}
                    className={`
                      flex items-center gap-3 px-2 py-2 my-0.5 rounded-md text-sm 
                      focus:outline-none cursor-pointer
                      ${themeColor === option.name
                        ? 'bg-primary-900/20 text-primary-300'
                        : 'text-color-text-muted hover:bg-card-alt'
                      }
                    `}
                    onClick={() => {
                      setThemeColor(option.name);
                      setIsOpen(false);
                    }}
                  >
                    <div className="relative w-5 h-5 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${option.gradient}`}
                      />
                      {themeColor === option.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IoCheckmark className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>

                    {themeColor === option.name && (
                      <span className="ml-auto text-xs bg-primary-800/30 text-primary-300 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </DropdownMenu.Item>
                ))}

                <DropdownMenu.Arrow className="fill-card" />
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
}
