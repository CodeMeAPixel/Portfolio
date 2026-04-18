"use client";

import Navbar from "../../components/static/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoHome, IoArrowBack, IoCodeSlash } from "react-icons/io5";

export default function NotFoundPage() {
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

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative bg-bg overflow-hidden">
                <div className="absolute inset-0 bg-dot-pattern opacity-20" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-color-border to-transparent" />

                {/* Decorative elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Large 404 background text - very subtle */}
                    <div
                        className="absolute text-white/10 text-[12rem] md:text-[18rem] font-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none animate-fade-in"
                    >
                        404
                    </div>

                    {/* Code brackets with glow */}
                    <div
                        className="absolute top-[15%] left-[8%] text-primary-500/[0.05] text-6xl md:text-8xl font-bold animate-fade-in"
                        style={{ animationDelay: '0.3s' }}
                    >
                        {'<'}
                    </div>

                    <div
                        className="absolute bottom-[15%] right-[8%] text-primary-500/[0.05] text-6xl md:text-8xl font-bold animate-fade-in"
                        style={{ animationDelay: '0.3s' }}
                    >
                        {'>'}
                    </div>

                    <div
                        className="absolute bottom-[25%] md:bottom-[30%] left-[10%] md:left-[15%] transform -rotate-6 animate-fade-up"
                        style={{ animationDelay: '0.7s' }}
                    >
                        <div className="text-xs md:text-sm border border-color-border bg-card px-4 py-2 rounded-xl text-primary-400 font-mono">
                            {'<NotFound />'}
                        </div>
                    </div>
                </div>

                {/* Main content - higher z-index to ensure it's above the background */}
                <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
                    <div
                        className="animate-fade-up"
                    >
                        <div className="inline-flex items-center justify-center mb-6 border border-color-border bg-card/50 px-4 py-2 rounded-full">
                            <IoCodeSlash className="w-4 h-4 mr-2 text-primary-400" />
                            <span className="text-sm font-medium text-primary-400">Error 404</span>
                        </div>
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 animate-fade-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <span className="text-color-text">Page </span>
                        <span className="animated-gradient-text">Not Found</span>
                    </h1>

                    <p
                        className="text-base sm:text-lg md:text-xl text-color-text-muted mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Looks like you&apos;ve ventured into uncharted territory. The page you&apos;re looking for might have been moved, deleted, or never existed in the first place.
                    </p>

                    <div
                        className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <Link
                            href="/"
                            className="px-6 py-3 rounded-lg font-semibold bg-primary-500 hover:bg-primary-400 text-white transition-colors duration-150 flex items-center"
                        >
                            <IoHome className="mr-2 w-5 h-5" />
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 rounded-lg font-semibold border border-color-border bg-card hover:bg-card-alt transition-colors duration-150 flex items-center text-color-text-muted hover:text-color-text"
                        >
                            <IoArrowBack className="mr-2 w-5 h-5" />
                            Go Back
                        </button>
                    </div>

                    {/* Premium terminal card */}
                    <div
                        className="mx-auto max-w-xl overflow-hidden animate-fade-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <div className="border border-color-border bg-card rounded-2xl overflow-hidden">
                            <div className="flex items-center px-4 py-3 bg-card-alt border-b border-color-border">
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
                    </div>
                </div>
            </div >
        </>
    );
}

// Typing animation effect - simplified for better performance
function TypingEffect({ text, delay = 50, startDelay = 0 }: { text: string; delay?: number; startDelay?: number }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
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