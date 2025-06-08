"use client";

import Navbar from "@/components/static/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoHome, IoArrowBack, IoWarning } from "react-icons/io5";

export const metadata = {
    title: "Error Page",
    description: "An error has occurred while processing your request.",
};

export default function GeneralErrorPage() {
    const [mounted, setMounted] = useState(false);
    const [errorCode, setErrorCode] = useState("500");

    useEffect(() => {
        setMounted(true);

        // Extract error code from URL if present
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
            setErrorCode(code);
        }
    }, []);

    if (!mounted) return null;

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative bg-bg-alt">
                {/* Background grid effect */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 pixel-grid-layer-1"></div>
                    <div className="absolute inset-0 pixel-grid-layer-2"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Large background text */}
                    <motion.div
                        className="absolute text-primary-900/10 text-[15rem] md:text-[20rem] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {errorCode}
                    </motion.div>

                    {/* Code brackets */}
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

                    {/* Floating "error" elements */}
                    <motion.div
                        className="absolute top-[15%] md:top-[25%] right-[10%] md:right-[20%] text-primary-700/30 font-mono transform rotate-12 pointer-events-none z-0"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="text-xs md:text-base bg-primary-900/10 px-3 py-1 rounded-md border border-primary-700/20">
                            {`ERROR_${errorCode}`}
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[20%] md:bottom-[35%] left-[15%] md:left-[20%] text-primary-500/30 font-mono transform -rotate-6 pointer-events-none z-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <div className="text-xs md:text-base bg-primary-900/10 px-3 py-1 rounded-md border border-primary-700/20">
                            {'<Error />'}
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
                        <div className="inline-flex items-center justify-center mb-6 bg-orange-900/20 text-orange-300 px-4 py-2 rounded-lg border border-orange-700/30">
                            <IoWarning className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Error {errorCode}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-primary-300 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {getErrorTitle(errorCode)}
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl text-color-text-muted mb-8 max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {getErrorMessage(errorCode)}
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

                    {/* Console-style error message */}
                    <motion.div
                        className="mx-auto max-w-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="bg-card border border-orange-800/30 rounded-lg overflow-hidden shadow-lg text-left font-mono text-sm">
                            <div className="flex items-center px-4 py-2 bg-card-alt border-b border-orange-800/30 text-orange-300">
                                <div className="flex gap-1.5 mr-3">
                                    <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/70"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                                </div>
                                <span className="text-xs sm:text-sm">Error Details</span>
                            </div>
                            <div className="p-4 space-y-2 text-color-text-muted text-xs sm:text-sm overflow-x-auto">
                                <div className="flex">
                                    <span className="text-orange-400">$</span>
                                    <span className="ml-2">error.status</span>
                                </div>
                                <div>{errorCode}</div>
                                <div className="flex">
                                    <span className="text-orange-400">$</span>
                                    <span className="ml-2">error.message</span>
                                </div>
                                <div>{getErrorMessage(errorCode)}</div>
                                <div className="flex">
                                    <span className="text-orange-400">$</span>
                                    <span className="ml-2">
                                        <TypewriterEffect text="window.location.href = '/'" delay={50} />
                                    </span>
                                </div>
                                <div className="text-green-400">
                                    <TypewriterEffect text="Redirecting to safety..." delay={30} startDelay={1500} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

// Helper functions for error messages
function getErrorTitle(code: string): string {
    const titles: Record<string, string> = {
        "400": "Bad Request",
        "401": "Unauthorized",
        "403": "Forbidden",
        "404": "Page Not Found",
        "500": "Server Error",
        "503": "Service Unavailable"
    };

    return titles[code] || "Unknown Error";
}

function getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
        "400": "The server cannot process the request due to a client error.",
        "401": "You need to be authenticated to access this resource.",
        "403": "You don't have permission to access this resource.",
        "404": "The page you're looking for doesn't exist or has been moved.",
        "500": "The server encountered an unexpected condition that prevented it from fulfilling the request.",
        "503": "The server is currently unavailable. Please try again later."
    };

    return messages[code] || "An unexpected error occurred. Please try again later.";
}

// Typewriter effect component
function TypewriterEffect({ text, delay = 50, startDelay = 0 }) {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let currentIndex = 0;

        const startTyping = () => {
            timer = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText(text.substring(0, currentIndex + 1));
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

    return <span>{displayText}</span>;
}
