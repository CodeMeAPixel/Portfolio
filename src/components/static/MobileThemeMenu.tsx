"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

type ThemeOption = {
  name: "blue" | "purple" | "teal" | "rose" | "amber";
  label: string;
  color: string;
  gradient: string;
};

const themeOptions: ThemeOption[] = [
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
    label: "Emerald",
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
          className="btn-icon relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Change theme color"
        >
          <div
            className="w-full h-full absolute inset-0 rounded-full opacity-75"
            style={{ backgroundColor: themeOptions.find(opt => opt.name === themeColor)?.color }}
          />
          <IoColorPaletteOutline className="w-5 h-5 relative z-10 text-white mix-blend-difference" />
        </motion.button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 bg-card border border-color-border shadow-lg rounded-xl p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="text-xl font-semibold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
            Choose Your Theme
          </Dialog.Title>

          <Dialog.Description className="text-color-text-muted text-sm">
            Personalize your experience with a color theme that matches your style.
          </Dialog.Description>

          <div className="grid gap-3">
            {themeOptions.map((option) => (
              <motion.button
                key={option.name}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-lg border 
                  transition-all duration-200
                  ${themeColor === option.name
                    ? 'border-primary-500 bg-primary-900/20'
                    : 'border-color-border hover:border-primary-500/50'
                  }
                `}
                onClick={() => {
                  setThemeColor(option.name);
                  setOpen(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${option.gradient} shadow-sm`}></div>
                <div className="text-left">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-color-text-muted">
                    {themeColor === option.name ? 'Currently active' : 'Click to activate'}
                  </div>
                </div>
                {themeColor === option.name && (
                  <IoCheckmark className="w-5 h-5 ml-auto text-primary-400" />
                )}
              </motion.button>
            ))}
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 rounded-full p-1 text-color-text-muted hover:text-color-text transition-colors"
              aria-label="Close"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
