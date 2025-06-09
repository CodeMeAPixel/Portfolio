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
        <nav>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`
                block py-1 transition-colors hover:text-primary-400
                ${activeId === heading.id
                                    ? "text-primary-400 font-medium"
                                    : "text-color-text-muted"}
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
