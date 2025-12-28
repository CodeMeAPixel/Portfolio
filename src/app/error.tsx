"use client";

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
    }, [error]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-bg relative overflow-hidden">
                {/* Premium multi-layer background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-aurora opacity-40"></div>
                    <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                </div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>

                {/* Animated floating orbs - red tinted for error */}
                <div
                    className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-red-500/15 to-primary-600/5 blur-[100px] animate-pulse"
                />
                <div
                    className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-primary-400/15 to-red-500/10 blur-[80px] animate-pulse"
                    style={{ animationDelay: '2s' }}
                />

                {/* Decorative elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute text-red-500/5 text-[10rem] md:text-[14rem] font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none animate-fade-in"
                    >
                        Error
                    </div>

                    <div
                        className="absolute top-[20%] md:top-[25%] right-[8%] md:right-[18%] transform rotate-12 animate-fade-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <div className="text-xs md:text-sm glass-frost px-4 py-2 rounded-xl text-red-300 font-mono border border-red-500/20">
                            {errorId}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                    <div
                        className="animate-fade-up"
                    >
                        <div className="inline-flex items-center justify-center mb-6 glass-frost px-5 py-2.5 rounded-full border border-red-500/20">
                            <IoClose className="w-4 h-4 mr-2 text-red-400" />
                            <span className="text-sm font-semibold text-red-300">Something went wrong</span>
                        </div>
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 animate-fade-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <span className="text-color-text">Application </span>
                        <span className="bg-gradient-to-r from-red-400 via-primary-400 to-primary-300 bg-clip-text text-transparent">Error</span>
                    </h1>

                    <p
                        className="text-base sm:text-lg md:text-xl text-color-text-muted mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Whoops, it seems something went wrong while processing your request. This could be due to a temporary issue or an unexpected error in the application.
                    </p>

                    <div
                        className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <button
                            onClick={() => reset()}
                            className="group relative px-6 py-3 rounded-xl font-semibold overflow-hidden glass-ultra border border-primary-500/30 hover:border-primary-500/50 transition-all duration-300"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center text-primary-300 group-hover:text-primary-200">
                                <IoReload className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                Try Again
                            </span>
                        </button>

                        <Link
                            href="/"
                            className="group px-6 py-3 rounded-xl font-semibold glass-frost border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center text-color-text-muted hover:text-color-text"
                        >
                            <IoHome className="mr-2 w-5 h-5" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Premium error details card */}
                    <div
                        className="mx-auto max-w-xl overflow-hidden animate-fade-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <div className="glass-ultra rounded-2xl overflow-hidden border border-red-500/20 shadow-2xl shadow-black/20">
                            <div className="flex items-center px-4 py-3 bg-red-500/5 border-b border-red-500/10">
                                <div className="flex gap-2 mr-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-lg shadow-red-500/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-lg shadow-amber-400/20"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/20"></div>
                                </div>
                                <span className="text-xs font-medium text-red-300">Error Details</span>
                            </div>
                            <div className="p-5 space-y-3 font-mono text-xs sm:text-sm overflow-x-auto">
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
                                <div className="pt-3 border-t border-white/10">
                                    <span className="text-primary-400">$</span>
                                    <span className="ml-2 text-color-text-muted">
                                        <TypewriterEffect text="npm run fix-errors && refresh" delay={40} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Typewriter effect component
function TypewriterEffect({ text, delay = 50 }: { text: string; delay?: number }) {
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
