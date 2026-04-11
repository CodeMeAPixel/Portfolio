"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch, IoMenu, IoClose, IoChevronForward, IoBookOutline, IoListOutline } from "react-icons/io5";
import DocsSidebar from "../../components/docs/DocsSidebar";
import DocsSearch from "../../components/docs/DocsSearch";
import TableOfContents from "../../components/docs/TableOfContents";
import { docsConfig } from "../../config/docs";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isDocsHome = pathname === '/docs' || pathname === '/docs/';

    // Close sidebar and mobile TOC on route change
    useEffect(() => {
        setIsSidebarOpen(false);
        setIsMobileTocOpen(false);
    }, [pathname]);

    // Track scroll for header styling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === "Escape") {
                setIsSearchOpen(false);
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isSidebarOpen]);

    // Get current section and breadcrumb data
    const currentPath = pathname.split('/').filter(Boolean);
    const currentSectionSlug = currentPath[1] || 'getting-started';
    const currentSection = docsConfig.sections.find(section => section.slug === currentSectionSlug);

    // Build breadcrumb items
    const breadcrumbs = [
        { label: 'Docs', href: '/docs' }
    ];

    if (currentSection && currentPath.length > 1) {
        breadcrumbs.push({
            label: currentSection.name,
            href: `/docs/${currentSection.slug}`
        });

        if (currentPath.length > 2) {
            const currentPageCategory = currentSection.categories.find(category =>
                category.items.some(item => item.href === pathname)
            );
            const currentPageItem = currentPageCategory?.items.find(item => item.href === pathname);
            if (currentPageItem) {
                breadcrumbs.push({
                    label: currentPageItem.title,
                    href: pathname
                });
            }
        }
    }

    return (
        <div className="docs-shell bg-bg min-h-screen relative">
            {/* Subtle background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.03] via-transparent to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-500/[0.04] rounded-full blur-[120px]" />
            </div>

            {/* Mobile sidebar backdrop */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'bg-black/60 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Mobile sidebar */}
            <aside
                className={`
                    w-[280px] flex-shrink-0 fixed top-0 left-0 bottom-0 md:hidden
                    overflow-y-auto z-50 bg-bg border-r border-white/[0.06]
                    transition-transform duration-300 ease-out custom-scrollbar
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="flex items-center justify-between px-5 h-14 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-primary-500/15">
                            <IoBookOutline className="w-4 h-4 text-primary-400" />
                        </div>
                        <span className="text-sm font-semibold text-color-text">Documentation</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 rounded-lg text-color-text-muted hover:text-color-text hover:bg-white/5 transition-all"
                        aria-label="Close sidebar"
                    >
                        <IoClose className="w-5 h-5" />
                    </button>
                </div>
                <DocsSidebar />
            </aside>

            {/* Top header bar */}
            <header
                className={`
                    docs-header sticky top-0 z-30 transition-all duration-200
                    ${scrolled
                        ? 'bg-bg border-b border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
                        : 'bg-bg border-b border-white/[0.04]'
                    }
                `}
            >
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Mobile sidebar toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 -ml-2 rounded-lg text-color-text-muted hover:text-primary-400 hover:bg-white/5 transition-all md:hidden"
                            aria-label="Toggle sidebar"
                        >
                            <IoMenu className="w-5 h-5" />
                        </button>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center text-[13px] min-w-0" aria-label="Breadcrumb">
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center min-w-0">
                                    {index > 0 && (
                                        <IoChevronForward className="mx-2 text-white/20 w-3 h-3 flex-shrink-0" />
                                    )}
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="text-color-text font-medium truncate">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="text-color-text-muted hover:text-color-text transition-colors truncate">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile TOC toggle - only show on doc pages, not homepage */}
                        {!isDocsHome && (
                            <button
                                onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                                className={`p-2 rounded-lg transition-all lg:hidden ${isMobileTocOpen ? 'text-primary-400 bg-primary-500/10' : 'text-color-text-muted hover:text-color-text hover:bg-white/5'}`}
                                aria-label="Toggle table of contents"
                            >
                                <IoListOutline className="w-4.5 h-4.5" />
                            </button>
                        )}

                        {/* Search trigger */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-color-text-muted rounded-xl border border-white/[0.08] hover:border-primary-500/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                        >
                            <IoSearch className="w-3.5 h-3.5 text-color-text-muted/60 group-hover:text-primary-400 transition-colors" />
                            <span className="hidden sm:inline text-[13px]">Search docs...</span>
                            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[11px] border border-white/[0.08] rounded-md px-1.5 py-0.5 bg-white/[0.03] text-color-text-muted/50 font-mono ml-4">
                                ⌘K
                            </kbd>
                        </button>
                    </div>
                </div>

                {/* Mobile TOC dropdown */}
                {isMobileTocOpen && !isDocsHome && (
                    <div className="lg:hidden border-t border-white/[0.04] px-4 py-3 max-h-[40vh] overflow-y-auto docs-scrollbar docs-dropdown-enter">
                        <TableOfContents />
                    </div>
                )}
            </header>

            {/* Main layout: sidebar + content + TOC */}
            <div className="max-w-[1800px] mx-auto flex relative z-10 min-h-[calc(100vh-3.5rem)]">
                {/* Desktop sidebar */}
                <aside className="docs-sidebar w-[260px] flex-shrink-0 hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto docs-scrollbar">
                    <div className="border-r border-white/[0.04] h-full">
                        <DocsSidebar />
                    </div>
                </aside>

                {/* Main content area */}
                <main className={`flex-1 min-w-0 px-6 pb-24 pt-10 ${isDocsHome ? 'lg:px-16' : 'lg:px-10'}`}>
                    <div className="docs-content">
                        <div className="docs-animate-in" key={pathname}>
                            {children}
                        </div>
                    </div>
                </main>

                {/* Desktop TOC - right column */}
                {!isDocsHome && (
                    <aside className="docs-toc-sidebar w-[200px] flex-shrink-0 hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto docs-scrollbar">
                        <div className="border-l border-white/[0.04] h-full py-8 pl-6 pr-4">
                            <TableOfContents />
                        </div>
                    </aside>
                )}
            </div>

            {/* Search modal */}
            {isSearchOpen && (
                <DocsSearch onClose={() => setIsSearchOpen(false)} />
            )}
        </div>
    );
}
