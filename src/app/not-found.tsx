"use client";

import Navbar from "@/components/static/Navbar";
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
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative bg-bg overflow-hidden">
                {/* Premium multi-layer background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-aurora opacity-40"></div>
                    <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

                {/* Animated floating orbs */}
                <motion.div
                    className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Decorative elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Large 404 background text */}
                    <motion.div
                        className="absolute text-primary-500/5 text-[12rem] md:text-[18rem] font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        404
                    </motion.div>

                    {/* Code brackets with glow */}
                    <motion.div
                        className="absolute top-[15%] left-[8%] text-primary-500/10 text-6xl md:text-8xl font-bold"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {'<'}
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[15%] right-[8%] text-primary-500/10 text-6xl md:text-8xl font-bold"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {'>'}
                    </motion.div>

                    {/* Floating error badges */}
                    <motion.div
                        className="absolute top-[20%] md:top-[25%] right-[8%] md:right-[18%] transform rotate-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="text-xs md:text-sm glass-frost px-4 py-2 rounded-xl text-primary-300 font-mono border border-primary-500/20">
                            {errorCode}
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[25%] md:bottom-[30%] left-[10%] md:left-[15%] transform -rotate-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <div className="text-xs md:text-sm glass-frost px-4 py-2 rounded-xl text-primary-300 font-mono border border-primary-500/20">
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
                        <div className="inline-flex items-center justify-center mb-6 glass-frost px-5 py-2.5 rounded-full border border-primary-500/20">
                            <IoCodeSlash className="w-4 h-4 mr-2 text-primary-400" />
                            <span className="text-sm font-semibold text-primary-300">Error 404</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
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
                        Looks like you&apos;ve ventured into uncharted territory. The page you&apos;re looking for might have been moved, deleted, or never existed in the first place.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4 justify-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link
                            href="/"
                            className="group relative px-6 py-3 rounded-xl font-semibold overflow-hidden glass-ultra border border-primary-500/30 hover:border-primary-500/50 transition-all duration-300"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center text-primary-300 group-hover:text-primary-200">
                                <IoHome className="mr-2 w-5 h-5" />
                                Back to Home
                            </span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="group px-6 py-3 rounded-xl font-semibold glass-frost border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center text-color-text-muted hover:text-color-text"
                        >
                            <IoArrowBack className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </button>
                    </motion.div>

                    {/* Premium terminal card */}
                    <motion.div
                        className="mx-auto max-w-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="glass-ultra rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
                            <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                                <div className="flex gap-2 mr-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-lg shadow-amber-400/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></div>
                                </div>
                                <span className="text-xs font-medium text-color-text-muted">Terminal</span>
                            </div>
                            <div className="p-5 space-y-3 font-mono text-xs sm:text-sm overflow-x-auto text-color-text-muted">
                                <div className="flex">
                                    <span className="text-primary-400">$</span>
                                    <span className="ml-2">find /path/to/page</span>
                                </div>
                                <div className="text-red-400">Error: No such file or directory</div>
                                <div className="flex">
                                    <span className="text-primary-400">$</span>
                                    <span className="ml-2">cat error.log</span>
                                </div>
                                <div className="text-amber-300/80">
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
        </>
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