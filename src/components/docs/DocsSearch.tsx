"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { docsConfig } from "@/config/docs";

interface DocsSearchProps {
    onClose: () => void;
}

// Flatten docs items for search with null check
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
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Filter results based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults(searchableItems);
            return;
        }

        const filtered = searchableItems.filter(item => {
            const searchableText = `${item.title} ${item.description} ${item.keywords?.join(" ") || ""}`.toLowerCase();
            return searchableText.includes(searchQuery.toLowerCase());
        });

        setResults(filtered);
    }, [searchQuery]);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Handle selecting a result
    const handleSelectResult = (href: string) => {
        router.push(href);
        onClose();
    };

    // Handle click outside to close
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-start justify-center pt-[12vh] animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div
                className="glass-ultra border border-white/10 rounded-2xl w-full max-w-xl max-h-[70vh] overflow-hidden flex flex-col animate-fade-in-up shadow-2xl"
            >
                {/* Search input */}
                <div className="flex items-center border-b border-white/10 p-4">
                    <div className="p-2 rounded-lg bg-primary-500/20 mr-3">
                        <IoSearch className="w-5 h-5 text-primary-400" />
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search documentation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none flex-grow text-color-text placeholder:text-color-text-muted text-lg"
                    />
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <IoClose className="w-5 h-5 text-color-text-muted hover:text-color-text" />
                    </button>
                </div>

                {/* Search results */}
                <div className="overflow-y-auto custom-scrollbar">
                    {results.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                                <IoSearch className="w-8 h-8 text-color-text-muted" />
                            </div>
                            <p className="text-color-text-muted">No results found for "{searchQuery}"</p>
                            <p className="text-sm text-color-text-muted/60 mt-2">Try different keywords or browse categories</p>
                        </div>
                    ) : (
                        <ul className="py-2">
                            {results.map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleSelectResult(item.href)}
                                        className="w-full text-left px-4 py-3.5 hover:bg-white/5 transition-all flex items-start gap-4 group border-l-2 border-transparent hover:border-primary-400"
                                    >
                                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                                            {item.icon && <item.icon className="w-5 h-5 text-color-text-muted group-hover:text-primary-400 transition-colors" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-color-text group-hover:text-primary-300 transition-colors">{item.title}</div>
                                            <div className="text-sm text-color-text-muted line-clamp-1">{item.description}</div>
                                            <div className="text-xs text-primary-400/80 mt-1.5 flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-full bg-primary-500/10">{item.section}</span>
                                                <span className="text-color-text-muted/50">•</span>
                                                <span className="text-color-text-muted/60">{item.category}</span>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Keyboard shortcut help */}
                <div className="border-t border-white/10 p-4 text-xs text-color-text-muted flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <kbd className="px-2 py-1 rounded-lg glass-frost border border-white/10 font-mono">↑</kbd>
                            <kbd className="px-2 py-1 rounded-lg glass-frost border border-white/10 font-mono">↓</kbd>
                            <span>navigate</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <kbd className="px-2 py-1 rounded-lg glass-frost border border-white/10 font-mono">↵</kbd>
                            <span>select</span>
                        </span>
                    </div>
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded-lg glass-frost border border-white/10 font-mono">esc</kbd>
                        <span>close</span>
                    </span>
                </div>
            </div>
        </div>,
        document.body
    );
}
