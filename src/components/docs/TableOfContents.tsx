"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const pathname = usePathname();

    // Extract headings from the page
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
            (element) => ({
                id: element.id,
                text: element.textContent || "",
                level: Number(element.tagName.substring(1)),
            })
        );

        setHeadings(elements);
    }, [pathname]);

    // Track active heading based on scroll position
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "0px 0px -80% 0px",
                threshold: 1.0,
            }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) observer.unobserve(element);
            });
        };
    }, [headings]);

    if (headings.length === 0) {
        return null;
    }

    return (
        <nav className="relative">
            {/* Decorative gradient line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent"></div>

            <ul className="space-y-1 text-sm pl-4">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                        className="relative"
                    >
                        {/* Active indicator */}
                        {activeId === heading.id && (
                            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-gradient-to-b from-primary-400 to-accent-500 shadow-lg shadow-primary-500/50"></span>
                        )}
                        <a
                            href={`#${heading.id}`}
                            className={`
                                block py-1.5 px-2 rounded-lg transition-all duration-300
                                ${activeId === heading.id
                                    ? "text-primary-300 font-medium bg-primary-500/10 border-l-0"
                                    : "text-color-text-muted hover:text-primary-400 hover:bg-white/5"}
                            `}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
