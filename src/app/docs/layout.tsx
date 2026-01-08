"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearch, IoMenu, IoClose, IoChevronForward } from "react-icons/io5";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsSearch from "@/components/docs/DocsSearch";
import { docsConfig } from "@/config/docs";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on route change on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            // Escape to close search
            if (e.key === "Escape") {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
        <div className="bg-bg min-h-screen relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-aurora opacity-20"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

            {/* Mobile sidebar toggle */}
            <div className="fixed top-20 left-4 z-40 md:hidden">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2.5 rounded-lg bg-gray-950/90 border border-white/10 text-color-text-muted hover:text-primary-400 transition-all"
                    aria-label="Toggle sidebar"
                >
                    {isSidebarOpen ? (
                        <IoClose className="w-5 h-5" />
                    ) : (
                        <IoMenu className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Documentation layout with sidebar */}
            <div className="container-section pt-24 pb-24 flex flex-col md:flex-row relative z-10">
                {/* Sidebar - visible on desktop, conditionally visible on mobile */}
                <aside
                    className={`
                        w-64 flex-shrink-0 md:block fixed md:sticky top-24 left-0 bottom-0 
                        md:h-[calc(100vh-6rem)] overflow-y-auto z-30 bg-bg md:bg-transparent
                        transition-all duration-300 transform custom-scrollbar
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                        md:pr-6
                    `}
                >
                    <DocsSidebar />
                </aside>

                {/* Main content */}
                <main className="flex-grow md:pl-8 w-full">
                    {/* Breadcrumb and search bar */}
                    <div className="flex items-center justify-between mb-8 sticky top-20 z-20 bg-bg py-3 border-b border-white/10">
                        <div className="text-sm flex items-center">
                            {breadcrumbs.map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center">
                                    {index > 0 && (
                                        <IoChevronForward className="mx-2 text-color-text-muted w-3 h-3" />
                                    )}
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="text-primary-400">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="text-color-text-muted hover:text-primary-400 transition-colors">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-color-text-muted rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/30 hover:bg-white/10 transition-all"
                        >
                            <IoSearch className="w-4 h-4" />
                            <span className="hidden sm:inline">Search docs...</span>
                            <span className="text-xs border border-white/10 rounded-lg px-2 py-0.5 ml-2 bg-white/5">
                                ⌘K
                            </span>
                        </button>
                    </div>

                    {/* Documentation content */}
                    <div className="docs-content">
                        <div
                            className="animate-fade-in"
                            key={pathname}
                        >
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Search modal */}
            {isSearchOpen && (
                <DocsSearch onClose={() => setIsSearchOpen(false)} />
            )}
        </div>
    );
}
