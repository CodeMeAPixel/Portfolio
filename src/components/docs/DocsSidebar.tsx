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
            (pathname === "/docs" && section.slug === "portfolio")
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

    // Get current section data - default to "portfolio" instead of "getting-started"
    const currentSection = docsConfig.sections.find(section =>
        section.slug === (pathname.split('/')[2] || "portfolio")
    );

    if (!currentSection) return null;

    return (
        <div className="py-4 px-4 md:px-0">
            {/* Section selector dropdown */}
            <div className="mb-6 relative">
                <button
                    onClick={() => setSectionDropdownOpen(!isSectionDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-xl p-3 glass-ultra border border-white/10 hover:border-primary-500/30 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary-500/20">
                            {currentSection.icon && <currentSection.icon className="w-4 h-4 text-primary-400" />}
                        </div>
                        <span className="font-medium text-color-text">{currentSection.name}</span>
                    </div>
                    <IoChevronDown className={`w-4 h-4 text-color-text-muted transition-transform duration-200 ${isSectionDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSectionDropdownOpen && (
                    <div
                        className="absolute top-full left-0 right-0 mt-2 glass-ultra border border-white/10 rounded-xl shadow-2xl z-10 py-2 max-h-64 overflow-y-auto custom-scrollbar animate-fade-in"
                    >
                        {docsConfig.sections.map((section) => (
                            <button
                                key={section.slug}
                                onClick={() => handleSectionChange(section.slug)}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${section.slug === currentSection.slug ? 'text-primary-400 bg-primary-500/10' : 'text-color-text-muted'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${section.slug === currentSection.slug ? 'bg-primary-500/20' : 'bg-white/5'}`}>
                                    {section.icon && <section.icon className="w-4 h-4" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{section.name}</span>
                                    <span className="text-xs opacity-60 line-clamp-1">{section.description}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Category navigation for current section */}
            <nav className="space-y-2">
                {currentSection.categories.map((category) => (
                    <div key={category.title} className="mb-3">
                        <button
                            onClick={() => toggleSection(category.title)}
                            className="flex items-center justify-between w-full py-2 px-3 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors group"
                        >
                            <span className={expandedSections[category.title] ? 'text-primary-400' : 'text-color-text-muted group-hover:text-color-text'}>
                                {category.title}
                            </span>
                            <div className={`p-1 rounded transition-colors ${expandedSections[category.title] ? 'bg-primary-500/20' : 'bg-transparent group-hover:bg-white/5'}`}>
                                {expandedSections[category.title] ? (
                                    <IoChevronDown className="w-3 h-3 text-primary-400" />
                                ) : (
                                    <IoChevronForward className="w-3 h-3 text-color-text-muted group-hover:text-color-text" />
                                )}
                            </div>
                        </button>

                        {expandedSections[category.title] && (
                            <ul
                                className="ml-3 space-y-1 border-l-2 border-white/10 pl-3 pt-2 pb-1 animate-fade-in"
                            >
                                {category.items.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={`
                                                    flex items-center gap-2.5 py-2 px-3 text-sm rounded-lg transition-all duration-200
                                                    ${isActive
                                                        ? "text-primary-400 font-medium bg-primary-500/15 border-l-2 border-primary-400 -ml-[2px] pl-[14px]"
                                                        : "text-color-text-muted hover:text-color-text hover:bg-white/5"
                                                    }
                                                `}
                                            >
                                                {item.icon && <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-400' : ''}`} />}
                                                <span className="line-clamp-1">{item.title}</span>
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
            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-xs font-semibold text-color-text-muted mb-4 uppercase tracking-wider">Quick Links</div>
                <div className="flex flex-col gap-1">
                    {docsConfig.quickLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-color-text-muted hover:text-primary-400 hover:bg-white/5 rounded-lg transition-all group"
                        >
                            <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-primary-500/20 transition-colors">
                                {link.icon && <link.icon className="w-4 h-4" />}
                            </div>
                            <span>{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
