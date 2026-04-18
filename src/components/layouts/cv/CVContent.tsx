"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import CVDocument from "../../cv/CVDocument";
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
            {/* Background */}
            <div className="absolute inset-0 bg-dot-pattern opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

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
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 border border-color-border bg-card/50 rounded-full animate-fade-in">
                            <IoSparkles className="w-4 h-4" />
                            Curriculum Vitae
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-6">
                        <span className="text-color-text">My </span>
                        <span className="animated-gradient-text">Resume</span>
                    </h1>
                    <p className="text-color-text-muted text-center md:text-left max-w-2xl text-lg leading-relaxed mb-8">
                        Download or share my CV to learn more about my professional experience, skills, and qualifications.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => handlePrint()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-colors duration-150"
                        >
                            <IoDownloadOutline className="w-5 h-5" />
                            <span>Download PDF</span>
                        </button>

                        <button
                            onClick={() => handlePrint()}
                            className="border border-color-border bg-card hover:bg-card-alt text-color-text-muted hover:text-color-text transition-all duration-150 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2"
                        >
                            <IoPrintOutline className="w-5 h-5" />
                            <span>Print</span>
                        </button>

                        <button
                            onClick={handleShare}
                            className="border border-color-border bg-card hover:bg-card-alt text-color-text-muted hover:text-color-text transition-all duration-150 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2"
                        >
                            <IoShareSocialOutline className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* CV Document */}
                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="border border-color-border bg-card rounded-2xl overflow-hidden">
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
