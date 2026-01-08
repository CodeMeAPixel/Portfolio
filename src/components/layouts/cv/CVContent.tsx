"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CVDocument from "@/components/cv/CVDocument";
import { IoDownloadOutline, IoPrintOutline, IoShareSocialOutline, IoSparkles, IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export default function CVContent() {
    const cvRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: cvRef,
        documentTitle: "Tyler_CodeMeAPixel_CV",
    });

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Tyler's CV - CodeMeAPixel",
                    text: "Check out my CV/Resume - Fullstack Developer with 10+ years of experience",
                    url: window.location.href,
                });
            } catch {
                // User cancelled or error occurred
                copyToClipboard();
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("CV link copied to clipboard!");
    };

    return (
        <section className="pt-20 pb-24 md:pt-24 md:pb-32 bg-bg relative z-10 overflow-hidden min-h-screen">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs */}
            <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container-section max-w-6xl relative">
                {/* Header */}
                <div className="mb-12 animate-fade-up">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
                    >
                        <IoArrowBack className="w-5 h-5" />
                        <span>Back to About</span>
                    </Link>

                    <div className="flex justify-center md:justify-start mb-8">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-frost rounded-full animate-fade-in">
                            <IoSparkles className="w-4 h-4" />
                            Curriculum Vitae
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-6">
                        <span className="text-color-text">My </span>
                        <span className="animated-gradient-text text-shadow-glow">Resume</span>
                    </h1>
                    <p className="text-color-text-muted text-center md:text-left max-w-2xl text-lg leading-relaxed mb-8">
                        Download or share my CV to learn more about my professional experience, skills, and qualifications.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => handlePrint()}
                            className="group relative px-6 py-3 rounded-xl font-bold text-white overflow-hidden shine-sweep"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-[length:200%_100%] animate-[gradient-x_3s_linear_infinite]"></span>
                            <span className="absolute inset-[2px] rounded-[10px] bg-gradient-to-r from-primary-600 to-primary-500"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                <IoDownloadOutline className="w-5 h-5" />
                                <span>Download PDF</span>
                            </span>
                        </button>

                        <button
                            onClick={() => handlePrint()}
                            className="group px-6 py-3 rounded-xl font-bold text-primary-400 glass-frost hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <IoPrintOutline className="w-5 h-5" />
                            <span>Print</span>
                        </button>

                        <button
                            onClick={handleShare}
                            className="group px-6 py-3 rounded-xl font-bold text-primary-400 glass-frost hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            <IoShareSocialOutline className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* CV Document */}
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30 glass-ultra">
                        <div ref={cvRef}>
                            <CVDocument />
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 text-center text-color-text-muted text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <p>Click &quot;Download PDF&quot; to save as PDF or use your browser&apos;s print function (Ctrl/Cmd + P)</p>
                </div>
            </div>
        </section>
    );
}
