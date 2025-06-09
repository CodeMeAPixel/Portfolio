"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoHome, IoReload, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import Navbar from "@/components/static/Navbar";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorId, setErrorId] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Set a clean error message for display
        const cleanMessage = error.message || "An unexpected error occurred";
        setErrorMessage(cleanMessage.replace(/^Error:\s*/i, ""));

        // Use the error digest or generate a random ID
        setErrorId(error.digest || `ERR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);

        // Log the error to console in development
        if (process.env.NODE_ENV === "development") {
            console.error("Application error:", error);
        }

        setMounted(true);
    }, [error]);

    if (!mounted) return null;

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-bg-alt relative">
                {/* Background grid effect */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 pixel-grid-layer-1"></div>
                    <div className="absolute inset-0 pixel-grid-layer-2"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden blur-lg">
                    <motion.div
                        className="absolute text-primary-900/10 text-[10rem] md:text-[15rem] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Error
                    </motion.div>

                    <motion.div
                        className="absolute top-[15%] md:top-[25%] right-[10%] md:right-[20%] text-primary-700/30 font-mono transform rotate-12 pointer-events-none z-0"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="text-xs md:text-base bg-primary-900/10 px-3 py-1 rounded-md border border-primary-700/20">
                            {errorId}
                        </div>
                    </motion.div>
                </div>

                {/* Main content */}
                <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center mb-6 bg-red-900/20 text-red-300 px-4 py-2 rounded-lg border border-red-700/30">
                            <IoClose className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Something went wrong</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-primary-300 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Application Error
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-color-text-muted mb-8 max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Whoops, it seems something went wrong while processing your request. This could be due to a temporary issue or an unexpected error in the application.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4 justify-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button
                            onClick={() => reset()}
                            className="btn-primary group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center">
                                <IoReload className="mr-2 w-5 h-5" />
                                Try Again
                            </span>
                            <motion.span
                                className="absolute inset-0 bg-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </button>

                        <Link href="/" className="btn-secondary flex items-center">
                            <IoHome className="mr-2 w-5 h-5" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Error details console */}
                    <motion.div
                        className="mx-auto max-w-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="bg-card border border-red-800/30 rounded-lg overflow-hidden shadow-lg text-left font-mono text-sm">
                            <div className="flex items-center px-4 py-2 bg-card-alt border-b border-red-800/30 text-red-300">
                                <div className="flex gap-1.5 mr-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/70"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                                </div>
                                <span className="text-xs sm:text-sm">Error Details</span>
                            </div>
                            <div className="p-4 space-y-2 text-color-text-muted text-xs sm:text-sm overflow-x-auto">
                                <div>
                                    <span className="text-red-400">Error ID:</span>
                                    <span className="ml-2">{errorId}</span>
                                </div>
                                <div>
                                    <span className="text-red-400">Message:</span>
                                    <span className="ml-2">{errorMessage}</span>
                                </div>
                                <div>
                                    <span className="text-red-400">Location:</span>
                                    <span className="ml-2">{typeof window !== 'undefined' ? window.location.pathname : ''}</span>
                                </div>
                                <div className="pt-2 border-t border-red-800/20">
                                    <span className="text-primary-400">$</span>
                                    <span className="ml-2">
                                        <TypewriterEffect text="npm run fix-errors && refresh" delay={40} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

// Typewriter effect component
function TypewriterEffect({ text, delay = 50 }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, delay);

        return () => clearInterval(timer);
    }, [text, delay]);

    return <span>{displayText}</span>;
}
