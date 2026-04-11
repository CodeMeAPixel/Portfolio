"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();
    const tocRef = useRef<HTMLElement>(null);

    // Extract headings from the page
    useEffect(() => {
        // Small delay to ensure content is mounted
        const timer = setTimeout(() => {
            const elements = Array.from(document.querySelectorAll(".docs-content h2, .docs-content h3"))
                .map((element) => ({
                    id: element.id,
                    text: element.textContent || "",
                    level: Number(element.tagName.substring(1)),
                }))
                .filter((h) => h.id && h.text);

            setHeadings(elements);
        }, 100);

        return () => clearTimeout(timer);
    }, [pathname]);

    // Track scroll progress & active heading
    useEffect(() => {
        if (headings.length === 0) return;

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

            // Find active heading
            let current = headings[0]?.id || "";
            for (const heading of headings) {
                const el = document.getElementById(heading.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100) {
                        current = heading.id;
                    }
                }
            }
            setActiveId(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener("scroll", handleScroll);
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav ref={tocRef} className="docs-toc" aria-label="Table of contents">
            {/* Header with progress */}
            <div className="flex items-center gap-2.5 mb-4 px-1">
                <div className="relative w-5 h-5 flex-shrink-0">
                    <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                        <circle
                            cx="10" cy="10" r="8" fill="none"
                            stroke="rgb(var(--color-primary-400))"
                            strokeWidth="2"
                            strokeDasharray={`${progress * 50.3} 50.3`}
                            strokeLinecap="round"
                            className="transition-all duration-150"
                        />
                    </svg>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-color-text-muted/40">
                    On this page
                </span>
            </div>

            {/* Links */}
            <ul className="relative space-y-px">
                {/* Vertical track line */}
                <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/[0.04]" />

                {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    const indent = heading.level === 3 ? 'pl-5' : 'pl-0';

                    return (
                        <li key={heading.id} className={`relative ${indent}`}>
                            {/* Active line indicator */}
                            {heading.level === 2 && (
                                <div
                                    className={`absolute left-[2px] top-1/2 -translate-y-1/2 w-[3px] h-3.5 rounded-full transition-all duration-200 ${isActive ? 'bg-primary-400 shadow-[0_0_8px_2px] shadow-primary-500/30 opacity-100' : 'opacity-0'}`}
                                />
                            )}

                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`
                                    docs-toc-link block py-1.5 pl-4 pr-2 text-[13px] leading-snug rounded-md transition-all duration-150
                                    ${isActive
                                        ? "text-primary-300 font-medium"
                                        : "text-color-text-muted/60 hover:text-color-text-muted"
                                    }
                                    ${heading.level === 3 ? 'text-[12px]' : ''}
                                `}
                            >
                                <span className="line-clamp-2">{heading.text}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
