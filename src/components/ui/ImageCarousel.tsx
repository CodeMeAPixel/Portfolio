"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className={`relative ${className} group/carousel w-full h-full overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-30 rounded-t-xl"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Project screenshot ${currentIndex + 1}`}
            fill
            className="object-cover rounded-t-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentIndex === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent rounded-t-xl"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handlePrevious}
              className="h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm text-color-text flex items-center justify-center hover:bg-card/90 shadow-lg border border-primary-700/30 hover:border-primary-500/40 transition-all"
              whileHover={{ scale: 1.1, x: -1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm text-color-text flex items-center justify-center hover:bg-card/90 shadow-lg border border-primary-700/30 hover:border-primary-500/40 transition-all"
              whileHover={{ scale: 1.1, x: 1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Image Counter for Visual Context - Added to top corner */}
          <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-300 border border-primary-700/30 z-20">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Navigation Dots - Enhanced style */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-card/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary-700/30 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-primary-400 w-6 h-1.5"
                  : "bg-primary-600/40 w-2 h-1.5 hover:bg-primary-400/60"
                  }`}
                whileHover={{ scaleX: 1.2 }}
                whileTap={{ scaleX: 0.8 }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}