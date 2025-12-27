"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CMAP } from "@/components/icons/CMAP";

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);
  const [forceLoading, setForceLoading] = useState(true);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const hasVisited = localStorage.getItem("hasVisited");
    const content = document.querySelector('.loader-content');

    if (!hasVisited) {
      document.body.style.overflow = "hidden";
      if (content) content.classList.remove('loaded');

      setTimeout(() => setShowContent(true), 300);

      // Smoother progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          const increment = (100 - prev) * 0.03;
          return Math.min(prev + increment, 100);
        });
      }, 40);

      // Minimum loading time of 3 seconds
      setTimeout(() => {
        setForceLoading(false);
      }, 3000);

      const timer = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);

        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("hasVisited", "true");
          document.body.style.overflow = "auto";
          if (content) content.classList.add('loaded');
        }, 300);
      }, 3500);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
        document.body.style.overflow = "auto";
        if (content) content.classList.add('loaded');
      };
    } else {
      // Quick loader for returning visitors
      document.body.style.overflow = "hidden";
      if (content) content.classList.remove('loaded');
      setShowContent(true);

      const quickProgressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.15;
          return newProgress > 99 ? 100 : newProgress;
        });
      }, 30);

      setTimeout(() => {
        setForceLoading(false);
        clearInterval(quickProgressInterval);
        setProgress(100);

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "auto";
          if (content) content.classList.add('loaded');
        }, 200);
      }, 1000);

      return () => {
        clearInterval(quickProgressInterval);
        document.body.style.overflow = "auto";
        if (content) content.classList.add('loaded');
      };
    }
  }, [mounted]);

  // Don't render anything on server or before mount
  if (!mounted) return null;

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
        {/* Background effects */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-50"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <div className="relative flex flex-col items-center justify-center">
          {/* Logo container */}
          {showContent && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Animated logo */}
              <motion.div
                className="relative mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(var(--color-primary-500), 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <CMAP className="w-20 h-20 text-primary-400 fill-primary-500 relative z-10" />

                {/* Pulse rings */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-primary-500/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                      scale: [1, 1.5 + i * 0.3],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Brand name */}
              <motion.h1
                className="text-2xl md:text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="animated-gradient-text">CodeMeAPixel</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-sm text-color-text-muted mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Crafting Digital Experiences
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="w-64 md:w-72"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="h-1 bg-primary-900/30 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Progress text */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-color-text-muted">Loading...</span>
                  <span className="text-primary-400 font-mono">{Math.round(progress)}%</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}