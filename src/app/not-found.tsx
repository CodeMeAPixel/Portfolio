"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHome, IoArrowBack, IoCodeSlash } from "react-icons/io5";

export default function NotFoundPage() {
    const [mounted, setMounted] = useState(false);

    // Random error codes for the tech aesthetic
    const errorCodes = [
        "ERR_404_PAGE_NOT_FOUND",
        "EXCEPTION: NavigationError",
        "HTTP 404 Not Found",
        "ResourceNotFoundError",
        "UnresolvedPathError"
    ];

    const [errorCode] = useState(() =>
        errorCodes[Math.floor(Math.random() * errorCodes.length)]
    );

    // Ensure animations run after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative bg-bg-alt">
            {/* Background grid effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 pixel-grid-layer-1"></div>
                <div className="absolute inset-0 pixel-grid-layer-2"></div>
            </div>

            {/* Decorative elements positioned with precise z-index */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Large 404 background text */}
                <motion.div
                    className="absolute text-primary-900/10 text-[15rem] md:text-[20rem] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    404
                </motion.div>

                {/* Code brackets - properly spaced */}
                <motion.div
                    className="absolute top-[10%] left-[5%] text-primary-500/20 text-5xl md:text-9xl pointer-events-none z-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {'<'}
                </motion.div>

                <motion.div
                    className="absolute bottom-[10%] right-[5%] text-primary-500/20 text-5xl md:text-9xl pointer-events-none z-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {'>'}
                </motion.div>

                {/* Floating "error" elements - properly positioned */}
                <motion.div
                    className="absolute top-[15%] md:top-[25%] right-[10%] md:right-[20%] text-primary-700/30 font-mono transform rotate-12 pointer-events-none z-0"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="text-xs md:text-base bg-primary-900/10 px-3 py-1 rounded-md border border-primary-700/20">
                        {errorCode}
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-[20%] md:bottom-[35%] left-[15%] md:left-[20%] text-primary-500/30 font-mono transform -rotate-6 pointer-events-none z-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <div className="text-xs md:text-base bg-primary-900/10 px-3 py-1 rounded-md border border-primary-700/20">
                        {'<NotFound />'}
                    </div>
                </motion.div>
            </div>

            {/* Main content - higher z-index to ensure it's above the background */}
            <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center justify-center mb-6 bg-primary-900/20 text-primary-300 px-4 py-2 rounded-lg border border-primary-700/30">
                        <IoCodeSlash className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Error 404</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl text-color-text-muted mb-8 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Looks like you've ventured into uncharted territory. The page you're looking for might have been moved, deleted, or never existed in the first place.
                </motion.p>

                <motion.div
                    className="flex flex-wrap gap-4 justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link href="/" className="btn-primary group relative overflow-hidden">
                        <span className="relative z-10 flex items-center">
                            <IoHome className="mr-2 w-5 h-5" />
                            Back to Home
                        </span>
                        <motion.span
                            className="absolute inset-0 bg-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="btn-secondary flex items-center"
                    >
                        <IoArrowBack className="mr-2 w-5 h-5" />
                        Go Back
                    </button>
                </motion.div>

                {/* Console-style error message with reduced height */}
                <motion.div
                    className="mx-auto max-w-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="bg-card border border-primary-800/30 rounded-lg overflow-hidden shadow-lg text-left font-mono text-sm">
                        <div className="flex items-center px-4 py-2 bg-card-alt border-b border-primary-800/30 text-primary-300">
                            <div className="flex gap-1.5 mr-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400/70"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                            </div>
                            <span className="text-xs sm:text-sm">Terminal</span>
                        </div>
                        <div className="p-4 space-y-2 text-color-text-muted text-xs sm:text-sm overflow-x-auto">
                            <div className="flex">
                                <span className="text-primary-400">$</span>
                                <span className="ml-2">find /path/to/page</span>
                            </div>
                            <div className="text-red-400">Error: No such file or directory</div>
                            <div className="flex">
                                <span className="text-primary-400">$</span>
                                <span className="ml-2">cat error.log</span>
                            </div>
                            <div>
                                <TypingEffect text={`[ERROR] ${errorCode}: The requested path was not found on this server.`} delay={30} />
                            </div>
                            <div className="flex">
                                <span className="text-primary-400">$</span>
                                <span className="ml-2">
                                    <TypingEffect text="cd /home && npm run dev" delay={50} />
                                </span>
                            </div>
                            <div className="text-green-400">
                                <TypingEffect text="Redirecting to home page..." delay={30} startDelay={1500} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Typing animation effect - simplified for better performance
function TypingEffect({ text, delay = 50, startDelay = 0 }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let timer;
        let currentIndex = 0;

        const startTyping = () => {
            timer = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(timer);
                }
            }, delay);
        };

        const initialDelay = setTimeout(startTyping, startDelay);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(timer);
        };
    }, [text, delay, startDelay]);

    return <span>{displayedText}</span>;
}