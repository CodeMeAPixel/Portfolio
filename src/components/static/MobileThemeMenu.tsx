"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

type ThemeOption = {
  name: "blue" | "purple" | "teal" | "rose" | "amber" | "sunset" | "emerald" | "crimson" | "nord" | "cyberpunk" | "mint" | "stranger" | "matrix" | "synthwave" | "dracula" | "monokai";
  label: string;
  color: string;
  gradient: string;
};

const themeOptions: ThemeOption[] = [
  // Pop Culture Themed Themes (Featured)
  {
    name: "stranger",
    label: "Stranger Things",
    color: "rgb(230, 50, 40)",
    gradient: "from-red-600 to-red-400"
  },
  {
    name: "matrix",
    label: "Matrix",
    color: "rgb(0, 230, 0)",
    gradient: "from-green-500 to-green-300"
  },
  {
    name: "synthwave",
    label: "Synthwave",
    color: "rgb(255, 50, 180)",
    gradient: "from-pink-500 to-cyan-400"
  },
  {
    name: "dracula",
    label: "Dracula",
    color: "rgb(189, 147, 249)",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    name: "monokai",
    label: "Monokai",
    color: "rgb(166, 226, 46)",
    gradient: "from-yellow-400 to-green-400"
  },
  // Classic Color Themes
  {
    name: "blue",
    label: "Azure",
    color: "rgb(37, 99, 235)",
    gradient: "from-blue-600 to-blue-400"
  },
  {
    name: "purple",
    label: "Amethyst",
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
    label: "Ruby",
    color: "rgb(225, 29, 72)",
    gradient: "from-rose-600 to-rose-400"
  },
  {
    name: "amber",
    label: "Amber",
    color: "rgb(217, 119, 6)",
    gradient: "from-amber-600 to-amber-400"
  },
  {
    name: "sunset",
    label: "Sunset",
    color: "rgb(234, 88, 12)",
    gradient: "from-orange-600 to-orange-400"
  },
  {
    name: "emerald",
    label: "Emerald",
    color: "rgb(5, 150, 105)",
    gradient: "from-emerald-600 to-emerald-400"
  },
  {
    name: "crimson",
    label: "Crimson",
    color: "rgb(220, 38, 38)",
    gradient: "from-red-600 to-red-400"
  },
  {
    name: "nord",
    label: "Nord",
    color: "rgb(49, 112, 179)",
    gradient: "from-blue-700 to-blue-500"
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    color: "rgb(236, 236, 0)",
    gradient: "from-yellow-400 to-fuchsia-600"
  },
  {
    name: "mint",
    label: "Mint",
    color: "rgb(34, 197, 94)",
    gradient: "from-green-600 to-green-400"
  }
];

export default function MobileThemeMenu() {
  const { themeColor, setThemeColor, isLoaded } = useTheme();
  const [open, setOpen] = useState(false);

  // Don't render until client-side theme is loaded
  if (!isLoaded) {
    return <div className="btn-icon relative" aria-hidden="true" />;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Change theme color"
        >
          <div
            className="w-4 h-4 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: themeOptions.find(opt => opt.name === themeColor)?.color }}
          />
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-xs translate-x-[-50%] translate-y-[-50%] bg-bg/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-2xl p-5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-lg font-bold animated-gradient-text mb-1">
            Theme Colors
          </Dialog.Title>

          <Dialog.Description className="text-color-text-muted text-xs mb-4">
            Choose a color theme
          </Dialog.Description>

          <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
            {themeOptions.map((option) => (
              <motion.button
                key={option.name}
                className={`
                  flex items-center gap-2 px-3 py-2.5 rounded-xl
                  transition-all duration-200
                  ${themeColor === option.name
                    ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 ring-1 ring-primary-500/40'
                    : 'bg-white/5 hover:bg-white/10'
                  }
                `}
                onClick={() => {
                  setThemeColor(option.name);
                  setOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${option.gradient} ring-2 ring-white/20`}></div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{option.label}</div>
                </div>
                {themeColor === option.name && (
                  <IoCheckmark className="w-4 h-4 text-primary-400 flex-shrink-0" />
                )}
              </motion.button>
            ))}
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-color-text-muted hover:text-color-text transition-all duration-200"
              aria-label="Close"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
