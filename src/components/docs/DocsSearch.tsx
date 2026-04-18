"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { IoSearch, IoClose, IoReturnDownBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { docsConfig } from "../../config/docs";

interface DocsSearchProps {
    onClose: () => void;
}

const searchableItems = docsConfig?.sections
    ? docsConfig.sections.flatMap(section =>
        section.categories.flatMap(category =>
            category.items.map(item => ({
                ...item,
                section: section.name,
                category: category.title,
            }))
        )
    )
    : [];

export default function DocsSearch({ onClose }: DocsSearchProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState(searchableItems);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults(searchableItems);
            setSelectedIndex(0);
            return;
        }

        const q = searchQuery.toLowerCase();
        const filtered = searchableItems.filter(item => {
            const text = `${item.title} ${item.description} ${item.keywords?.join(" ") || ""}`.toLowerCase();
            return text.includes(q);
        });

        setResults(filtered);
        setSelectedIndex(0);
    }, [searchQuery]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSelect = useCallback((href: string) => {
        router.push(href);
        onClose();
    }, [router, onClose]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === "Enter" && results[selectedIndex]) {
                e.preventDefault();
                handleSelect(results[selectedIndex].href);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [results, selectedIndex, handleSelect]);

    // Scroll selected item into view
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const item = list.children[selectedIndex] as HTMLElement;
        item?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    return createPortal(
        <div
            className="fixed inset-0 bg-bg/80 z-50 flex items-start justify-center pt-[15vh]"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{ animation: 'docs-dropdown-in 0.15s ease-out' }}
        >
            <div className="w-full max-w-lg max-h-[60vh] overflow-hidden flex flex-col rounded-xl border border-color-border bg-bg shadow-[0_16px_64px_rgba(0,0,0,0.5)]">
                {/* Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-color-border">
                    <IoSearch className="w-4 h-4 text-color-text-muted/40 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search documentation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none flex-grow text-color-text placeholder:text-color-text-muted/40 text-[15px]"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-card transition-colors"
                    >
                        <IoClose className="w-4 h-4 text-color-text-muted/40" />
                    </button>
                </div>

                {/* Results */}
                <div className="overflow-y-auto docs-scrollbar flex-1">
                    {results.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-[13px] text-color-text-muted/40">No results for &ldquo;{searchQuery}&rdquo;</p>
                        </div>
                    ) : (
                        <ul ref={listRef} className="py-1.5">
                            {results.map((item, index) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleSelect(item.href)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${index === selectedIndex ? 'bg-primary-500/[0.07]' : 'hover:bg-card'}`}
                                    >
                                        <div className={`flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 transition-colors ${index === selectedIndex ? 'bg-primary-500/15 text-primary-400' : 'bg-card text-color-text-muted/40'}`}>
                                            {item.icon && <item.icon className="w-3.5 h-3.5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-[13px] font-medium truncate transition-colors ${index === selectedIndex ? 'text-color-text' : 'text-color-text-muted/70'}`}>
                                                {item.title}
                                            </div>
                                            <div className="text-[11px] text-color-text-muted/30 truncate">
                                                {item.section} · {item.category}
                                            </div>
                                        </div>
                                        {index === selectedIndex && (
                                            <IoReturnDownBack className="w-3.5 h-3.5 text-color-text-muted/30 flex-shrink-0" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-color-border px-4 py-2.5 flex items-center justify-between text-[11px] text-color-text-muted/30">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1 py-0.5 rounded border border-color-border bg-card font-mono text-[10px]">↑↓</kbd>
                            navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1 py-0.5 rounded border border-color-border bg-card font-mono text-[10px]">↵</kbd>
                            open
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 rounded border border-color-border bg-card font-mono text-[10px]">esc</kbd>
                        close
                    </span>
                </div>
            </div>
        </div >,
        document.body
    );
}
