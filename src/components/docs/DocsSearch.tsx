"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { docsConfig } from "@/config/docs";

interface DocsSearchProps {
    onClose: () => void;
}

// Flatten docs items for search with null check
const searchableItems = docsConfig?.sidebarNav
    ? docsConfig.sidebarNav.flatMap(section =>
        section.items.map(item => ({
            ...item,
            section: section.title,
        }))
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
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
                onClick={handleBackdropClick}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border border-color-border rounded-lg w-full max-w-xl max-h-[70vh] overflow-hidden flex flex-col"
                >
                    {/* Search input */}
                    <div className="flex items-center border-b border-color-border p-4">
                        <IoSearch className="w-5 h-5 text-color-text-muted mr-3 flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search documentation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none flex-grow text-color-text placeholder:text-color-text-muted"
                        />
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-bg-alt transition-colors"
                        >
                            <IoClose className="w-5 h-5 text-color-text-muted" />
                        </button>
                    </div>

                    {/* Search results */}
                    <div className="overflow-y-auto">
                        {results.length === 0 ? (
                            <div className="p-6 text-center text-color-text-muted">
                                No results found for "{searchQuery}"
                            </div>
                        ) : (
                            <ul className="py-2">
                                {results.map((item) => (
                                    <li key={item.href}>
                                        <button
                                            onClick={() => handleSelectResult(item.href)}
                                            className="w-full text-left px-4 py-3 hover:bg-bg-alt transition-colors flex items-start gap-3"
                                        >
                                            {item.icon && <item.icon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />}
                                            <div>
                                                <div className="font-medium text-color-text">{item.title}</div>
                                                <div className="text-sm text-color-text-muted">{item.description}</div>
                                                <div className="text-xs text-primary-400 mt-1">{item.section}</div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Keyboard shortcut help */}
                    <div className="border-t border-color-border p-3 text-xs text-color-text-muted flex justify-between items-center">
                        <div>Press <kbd className="px-2 py-1 bg-bg-alt rounded border border-color-border">↑</kbd> <kbd className="px-2 py-1 bg-bg-alt rounded border border-color-border">↓</kbd> to navigate</div>
                        <div>Press <kbd className="px-2 py-1 bg-bg-alt rounded border border-color-border">ESC</kbd> to close</div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}
