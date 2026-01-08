"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
    images: string[];
    className?: string;
}

export function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Handle empty images array
    if (!images || images.length === 0) {
        return (
            <div className={`relative ${className} w-full h-full overflow-hidden bg-gradient-to-br from-primary-900/30 to-bg rounded-xl flex items-center justify-center`}>
                <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl glass-frost flex items-center justify-center">
                        <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-color-text-muted text-sm">No preview available</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setIsTransitioning(false);
            }, 200);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length, isHovered]);

    const handleNext = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setIsTransitioning(false);
        }, 200);
    };

    const handlePrevious = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            setIsTransitioning(false);
        }, 200);
    };

    const goToIndex = (index: number) => {
        if (index === currentIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 200);
    };

    return (
        <div
            className={`relative ${className} group/carousel w-full h-full overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Premium inner shadow and glow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] pointer-events-none z-30 rounded-t-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent pointer-events-none z-25 rounded-t-xl"></div>

            {/* Image with CSS transitions */}
            <div
                className={`w-full h-full transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
                    }`}
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
            </div>

            {/* Navigation Controls */}
            {images.length > 1 && (
                <>
                    {/* Previous/Next Buttons */}
                    <div className="absolute inset-y-0 inset-x-4 flex items-center justify-between z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={handlePrevious}
                            className="h-10 w-10 rounded-full glass-frost text-color-text flex items-center justify-center shadow-lg shadow-black/20 border border-white/10 hover:border-primary-500/40 hover:shadow-primary-500/20 hover:scale-110 hover:-translate-x-0.5 active:scale-90 transition-all duration-300"
                            aria-label="Previous image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="h-10 w-10 rounded-full glass-frost text-color-text flex items-center justify-center shadow-lg shadow-black/20 border border-white/10 hover:border-primary-500/40 hover:shadow-primary-500/20 hover:scale-110 hover:translate-x-0.5 active:scale-90 transition-all duration-300"
                            aria-label="Next image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Counter for Visual Context - Premium styling */}
                    <div className="absolute top-3 right-3 glass-frost px-3 py-1.5 rounded-full text-xs font-semibold text-primary-300 border border-white/10 z-20 shadow-lg shadow-black/20">
                        <span className="text-white/90">{currentIndex + 1}</span>
                        <span className="text-white/50 mx-1">/</span>
                        <span className="text-white/70">{images.length}</span>
                    </div>

                    {/* Navigation Dots - Premium glass style */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 glass-frost px-4 py-2 rounded-full border border-white/10 shadow-xl shadow-black/30 animate-fade-in-up">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToIndex(index)}
                                className={`rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-gradient-to-r from-primary-400 to-accent-400 w-7 h-2 shadow-lg shadow-primary-500/40"
                                    : "bg-white/20 w-2 h-2 hover:bg-white/40 hover:scale-125 active:scale-90"
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
