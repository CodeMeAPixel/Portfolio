"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CMAP } from "@/components/icons/CMAP";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPixel, setCurrentPixel] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);
  const [forceLoading, setForceLoading] = useState(true); // Force minimum loading time

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    const content = document.querySelector('.loader-content');

    if (!hasVisited) {
      // Prevent scrolling while loader is active
      document.body.style.overflow = "hidden";
      if (content) content.classList.remove('loaded');

      // Show content after a short delay
      setTimeout(() => setShowContent(true), 500);

      // Animate pixels with varying speeds and patterns
      const pixelInterval = setInterval(() => {
        setCurrentPixel((prev) => (prev + 1) % 16);
      }, 80);

      // Animate progress bar
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          // Slow down progress at certain points to make the animation more interesting
          if (prev > 70 && prev < 90) {
            return prev + (100 - prev) * 0.01; // Slow progress between 70-90%
          }
          return prev + (100 - prev) * 0.05;
        });
      }, 50);

      // Ensure minimum loading time of 4 seconds
      setTimeout(() => {
        setForceLoading(false);
      }, 4000);

      // Set timeout for loader
      const timer = setTimeout(() => {
        clearInterval(pixelInterval);
        clearInterval(progressInterval);
        setProgress(100);

        // Slight delay before dismissing the loader
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("hasVisited", "true");
          document.body.style.overflow = "auto";
          if (content) content.classList.add('loaded');
        }, 300);
      }, 5000);

      return () => {
        clearInterval(pixelInterval);
        clearInterval(progressInterval);
        clearTimeout(timer);
        document.body.style.overflow = "auto";
        if (content) content.classList.add('loaded');
      };
    } else {
      // For returning visitors, show a quicker version of the loader
      // Prevent scrolling while loader is active
      document.body.style.overflow = "hidden";
      if (content) content.classList.remove('loaded');

      // Show content right away
      setShowContent(true);

      // Animate progress quickly
      const quickProgressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress > 99 ? 100 : newProgress;
        });
      }, 30);

      // Ensure minimum loading time of 1.5 seconds for returning visitors
      setTimeout(() => {
        setForceLoading(false);
        clearInterval(quickProgressInterval);
        setProgress(100);

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "auto";
          if (content) content.classList.add('loaded');
        }, 200);
      }, 1500);

      return () => {
        clearInterval(quickProgressInterval);
        document.body.style.overflow = "auto";
        if (content) content.classList.add('loaded');
      };
    }
  }, []);

  // Always show loader until both progress completes AND minimum time passes
  if (!isLoading && !forceLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Background glow effect */}
          <motion.div
            className="absolute inset-0 bg-primary-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Pixel grid background with improved layout */}
          <div className="absolute inset-0 grid grid-cols-4 gap-1.5 p-2">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-full h-full rounded-md backdrop-blur-sm
                  ${i === currentPixel
                    ? "bg-primary-400 shadow-lg shadow-primary-500/20"
                    : "bg-primary-900/30 border border-primary-800/50"
                  }`}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{
                  scale: i === currentPixel ? 1 : 0.9,
                  opacity: i === currentPixel ? 1 : 0.5,
                  borderColor: i === currentPixel ? "rgb(var(--color-primary-500))" : "rgb(var(--color-primary-800) / 0.5)"
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Animated logo/brand */}
          {showContent && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="mb-3 relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CMAP className="w-16 h-16 text-primary-400 fill-primary-500" />

                {/* Pulse effect around logo */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary-400/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              <motion.h1
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                CodeMeAPixel
              </motion.h1>

              <motion.div
                className="flex justify-center gap-1.5 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary-400 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Progress indicator with percentage */}
          <motion.div
            className="absolute -bottom-12 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div className="w-48 h-1 bg-primary-900/30 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
            <motion.div
              className="text-xs text-primary-400/70 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        </div>

        {/* Optional tag line */}
        <motion.p
          className="text-xs text-primary-300/70 absolute bottom-8 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          CRAFTING DIGITAL EXPERIENCES
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}