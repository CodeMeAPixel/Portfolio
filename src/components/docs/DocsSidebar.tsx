"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { docsConfig } from "../../config/docs";

export default function DocsSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [isSectionDropdownOpen, setSectionDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Determine current section based on pathname
    useEffect(() => {
        const currentSection = docsConfig.sections.find(section =>
            pathname.includes(`/docs/${section.slug}`)
        ) || (pathname === "/docs" || pathname === "/docs/" ? docsConfig.sections[0] : undefined);

        if (currentSection) {
            const newExpandedSections: Record<string, boolean> = {};
            currentSection.categories.forEach(category => {
                const isActive = category.items.some(item => pathname === item.href);
                if (isActive) {
                    newExpandedSections[category.title] = true;
                }
            });
            setExpandedSections(newExpandedSections);
        }
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setSectionDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSection = (title: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const handleSectionChange = (sectionSlug: string) => {
        setSectionDropdownOpen(false);
        const section = docsConfig.sections.find(s => s.slug === sectionSlug);
        if (section && section.categories.length > 0 && section.categories[0].items.length > 0) {
            router.push(section.categories[0].items[0].href);
        }
    };

    const sectionSlugFromPath = pathname.split('/')[2];
    const currentSection = sectionSlugFromPath
        ? docsConfig.sections.find(section => section.slug === sectionSlugFromPath)
        : docsConfig.sections[0];

    if (!currentSection) return null;

    return (
        <div className="flex flex-col h-full py-5 px-4">
            {/* Section selector */}
            <div className="mb-5 relative" ref={dropdownRef}>
                <button
                    onClick={() => setSectionDropdownOpen(!isSectionDropdownOpen)}
                    className="docs-section-switcher w-full flex items-center justify-between rounded-xl px-3 py-2.5 border border-color-border bg-card hover:bg-card-alt hover:border-primary-500/20 transition-all group"
                >
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-500/15 text-primary-400">
                            {currentSection.icon && <currentSection.icon className="w-3.5 h-3.5" />}
                        </div>
                        <span className="font-medium text-[13px] text-color-text">{currentSection.name}</span>
                    </div>
                    <IoChevronDown className={`w-3.5 h-3.5 text-color-text-muted/50 transition-transform duration-200 ${isSectionDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isSectionDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-bg border border-color-border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 py-1.5 max-h-72 overflow-y-auto docs-scrollbar docs-dropdown-enter">
                        {docsConfig.sections.map((section) => {
                            const isSelected = section.slug === currentSection.slug;
                            return (
                                <button
                                    key={section.slug}
                                    onClick={() => handleSectionChange(section.slug)}
                                    className={`w-full text-left px-3 py-2.5 flex items-center gap-2.5 transition-colors ${isSelected ? 'text-primary-400' : 'text-color-text-muted hover:text-color-text hover:bg-card-alt'}`}
                                >
                                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${isSelected ? 'bg-primary-500/20 text-primary-400' : 'bg-card-alt'}`}>
                                        {section.icon && <section.icon className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[13px] font-medium truncate">{section.name}</span>
                                        <span className="text-[11px] opacity-50 truncate">{section.description}</span>
                                    </div>
                                    {
                                        isSelected && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                                        )
                                    }
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 min-h-0 overflow-y-auto docs-scrollbar space-y-0.5 docs-nav -mx-4 px-4">
                {currentSection.categories.map((category) => {
                    const isExpanded = expandedSections[category.title];
                    const hasActiveChild = category.items.some(item => pathname === item.href);

                    return (
                        <div key={category.title} className="mb-1">
                            <button
                                onClick={() => toggleSection(category.title)}
                                className={`docs-nav-category flex items-center justify-between w-full py-2 px-2.5 text-[12px] font-semibold uppercase tracking-wider rounded-lg transition-colors ${isExpanded || hasActiveChild ? 'text-color-text' : 'text-color-text-muted/60 hover:text-color-text-muted'}`}
                            >
                                <span>{category.title}</span>
                                <IoChevronForward className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            <div className={`docs-nav-items overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <ul className="relative ml-2.5 mt-0.5 mb-2">
                                    {/* Tree line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-color-border" />

                                    {category.items.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <li key={item.href} className="relative">
                                                {/* Active indicator on tree line */}
                                                {isActive && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-5 bg-primary-400 shadow-[0_0_6px_1px] shadow-primary-500/40 z-10" />
                                                )}

                                                <Link
                                                    href={item.href}
                                                    className={`
                                                        docs-nav-link flex items-center gap-2 py-[7px] pl-4 pr-2.5 ml-px text-[13px] rounded-md transition-all duration-150
                                                        ${isActive
                                                            ? "text-primary-400 font-medium bg-primary-500/[0.08]"
                                                            : "text-color-text-muted hover:text-color-text hover:bg-card"
                                                        }
                                                    `}
                                                >
                                                    {item.icon && (
                                                        <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-primary-400' : 'opacity-40'}`} />
                                                    )}
                                                    <span className="truncate">{item.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* Quick links */}
            <div className="mt-auto pt-5 border-t border-color-border">
                <div className="text-[11px] font-semibold text-color-text-muted/40 mb-3 uppercase tracking-widest px-2.5">Links</div>
                <div className="flex flex-col gap-0.5">
                    {docsConfig.quickLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="docs-quick-link flex items-center gap-2.5 px-2.5 py-2 text-[13px] text-color-text-muted/70 hover:text-color-text rounded-md hover:bg-card transition-all group"
                        >
                            {link.icon && <link.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity" />}
                            <span>{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div >
    );
}
