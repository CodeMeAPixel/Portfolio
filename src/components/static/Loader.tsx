"use client";

import { useEffect, useState } from "react";
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

      // Reduced loading time to 1.5 seconds for better mobile experience
      setTimeout(() => {
        setForceLoading(false);
      }, 1500);

      const timer = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);

        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("hasVisited", "true");
          document.body.style.overflow = "auto";
          if (content) content.classList.add('loaded');
        }, 300);
      }, 2000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
        document.body.style.overflow = "auto";
        if (content) content.classList.add('loaded');
      };
    } else {
      // Quick loader for returning visitors - reduced to 400ms
      document.body.style.overflow = "hidden";
      if (content) content.classList.remove('loaded');
      setShowContent(true);

      const quickProgressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 - prev) * 0.25;
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
        }, 100);
      }, 400);

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
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg animate-fade-in"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-3xl animate-pulse"
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* Logo container */}
        {showContent && (
          <div
            className="flex flex-col items-center animate-fade-up"
          >
            {/* Animated logo */}
            <div className="relative mb-6 animate-fade-in">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(var(--color-primary-500), 0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />

              <CMAP className="w-20 h-20 text-primary-400 fill-primary-500 relative z-10" />

              {/* Pulse rings */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary-500/30 animate-ping"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>

            {/* Brand name */}
            <h1
              className="text-2xl md:text-3xl font-bold mb-2 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="animated-gradient-text">CodeMeAPixel</span>
            </h1>

            {/* Tagline */}
            <p
              className="text-sm text-color-text-muted mb-8 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Crafting Digital Experiences
            </p>

            {/* Progress bar */}
            <div
              className="w-64 md:w-72 animate-fade-in"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="h-1 bg-primary-900/30 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Progress text */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-color-text-muted">Loading...</span>
                <span className="text-primary-400 font-mono">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
