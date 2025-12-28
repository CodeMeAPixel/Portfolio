"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronDown, IoChevronForward, IoApps } from "react-icons/io5";
import { docsConfig } from "@/config/docs";

export default function DocsSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [selectedSection, setSelectedSection] = useState<string>("");
    const [isSectionDropdownOpen, setSectionDropdownOpen] = useState(false);

    // Determine current section based on pathname
    useEffect(() => {
        const currentSection = docsConfig.sections.find(section =>
            pathname.includes(`/docs/${section.slug}`) ||
            (pathname === "/docs" && section.slug === "getting-started")
        );

        if (currentSection) {
            setSelectedSection(currentSection.name);

            // Only expand the relevant categories in the current section
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

    const toggleSection = (title: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const handleSectionChange = (sectionSlug: string) => {
        setSectionDropdownOpen(false);

        // Navigate to the first page of the selected section
        const section = docsConfig.sections.find(s => s.slug === sectionSlug);
        if (section && section.categories.length > 0 && section.categories[0].items.length > 0) {
            router.push(section.categories[0].items[0].href);
        }
    };

    // Get current section data
    const currentSection = docsConfig.sections.find(section =>
        section.slug === (pathname.split('/')[2] || "getting-started")
    );

    if (!currentSection) return null;

    return (
        <div className="py-4 px-4 md:px-0">
            {/* Section selector dropdown */}
            <div className="mb-6 relative">
                <button
                    onClick={() => setSectionDropdownOpen(!isSectionDropdownOpen)}
                    className="w-full flex items-center justify-between bg-card rounded-lg p-2.5 border border-color-border hover:border-primary-600/30 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        {currentSection.icon && <currentSection.icon className="w-4 h-4 text-primary-400" />}
                        <span className="font-medium text-color-text">{currentSection.name}</span>
                    </div>
                    <IoChevronDown className={`w-4 h-4 text-color-text-muted transition-transform ${isSectionDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSectionDropdownOpen && (
                    <div
                        className="absolute top-full left-0 right-0 mt-1 bg-card border border-color-border rounded-lg shadow-lg z-10 py-1.5 max-h-64 overflow-y-auto animate-fade-in"
                    >
                        {docsConfig.sections.map((section) => (
                            <button
                                key={section.slug}
                                onClick={() => handleSectionChange(section.slug)}
                                className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-bg-alt transition-colors ${section.slug === currentSection.slug ? 'text-primary-400 bg-bg-alt/50' : 'text-color-text-muted'
                                    }`}
                            >
                                {section.icon && <section.icon className="w-4 h-4" />}
                                <span>{section.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Category navigation for current section */}
            <nav className="space-y-1">
                {currentSection.categories.map((category) => (
                    <div key={category.title} className="mb-2">
                        <button
                            onClick={() => toggleSection(category.title)}
                            className="flex items-center justify-between w-full py-1.5 px-2 text-sm font-medium rounded-md hover:bg-bg-alt transition-colors group"
                        >
                            <span className={expandedSections[category.title] ? 'text-primary-400' : 'text-color-text-muted group-hover:text-color-text'}>
                                {category.title}
                            </span>
                            {expandedSections[category.title] ? (
                                <IoChevronDown className="w-3.5 h-3.5 text-primary-400" />
                            ) : (
                                <IoChevronForward className="w-3.5 h-3.5 text-color-text-muted group-hover:text-color-text" />
                            )}
                        </button>

                        {expandedSections[category.title] && (
                            <ul
                                className="ml-2 space-y-0.5 border-l border-color-border pl-3 pt-1 pb-1 animate-fade-in"
                            >
                                {category.items.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`
                                                    block py-1 text-sm rounded-md pl-2 transition-colors
                                                    ${isActive
                                                        ? "text-primary-400 font-medium bg-primary-900/20"
                                                        : "text-color-text-muted hover:text-color-text hover:bg-bg-alt"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {item.icon && <item.icon className="w-3.5 h-3.5 flex-shrink-0" />}
                                                    <span className="line-clamp-1">{item.title}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                ))}
            </nav>

            {/* Quick links at the bottom */}
            <div className="mt-8 pt-4 border-t border-color-border">
                <div className="text-xs font-medium text-color-text-muted mb-2 uppercase tracking-wider">Quick Links</div>
                <div className="grid grid-cols-2 gap-2">
                    {docsConfig.quickLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-color-text-muted hover:text-primary-400 transition-colors"
                        >
                            {link.icon && <link.icon className="w-3 h-3" />}
                            <span>{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
