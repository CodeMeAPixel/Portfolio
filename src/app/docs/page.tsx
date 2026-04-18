"use client"

import { docsConfig } from "../../config/docs";
import Link from "next/link";
import { IoArrowForward, IoLogoGithub } from "react-icons/io5";

export default function DocsPage() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Hero */}
            <div className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-color-text tracking-tight mb-4 docs-animate-in">
                    Documentation
                </h1>
                <p className="text-color-text-muted text-lg sm:text-xl leading-relaxed max-w-2xl docs-animate-in">
                    Guides and references for my open-source projects, FiveM scripts, Discord bots, and web applications.
                </p>
            </div>

            {/* Project grid */}
            <div className="grid sm:grid-cols-2 gap-5 mb-16">
                {docsConfig.sections.map((section) => (
                    <Link
                        key={section.slug}
                        href={section.categories[0]?.items[0]?.href || `/docs/${section.slug}`}
                        className="group relative flex flex-col p-6 rounded-2xl border border-color-border bg-card hover:bg-card-alt hover:border-primary-500/15 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/15 transition-colors">
                                <section.icon className="w-5 h-5" />
                            </div>
                            {section.projectUrl && (
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(section.projectUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                    className="p-2 rounded-lg text-color-text-muted/30 hover:text-color-text-muted hover:bg-card-alt transition-all cursor-pointer"
                                >
                                    <IoLogoGithub className="w-4.5 h-4.5" />
                                </span>
                            )}
                        </div>

                        <h3 className="text-base font-semibold text-color-text mb-1.5 group-hover:text-primary-300 transition-colors">
                            {section.name}
                        </h3>
                        <p className="text-sm text-color-text-muted/60 leading-relaxed mb-5 flex-1">
                            {section.description}
                        </p>

                        {/* Category count */}
                        <div className="flex items-center gap-2.5 text-[13px] text-color-text-muted/40">
                            <span>{section.categories.reduce((acc, c) => acc + c.items.length, 0)} pages</span>
                            <span>·</span>
                            <span>{section.categories.length} sections</span>
                        </div>

                        {/* Hover arrow */}
                        <IoArrowForward className="absolute top-6 right-6 w-4.5 h-4.5 text-primary-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 py-7 px-7 rounded-2xl border border-color-border bg-card">
                <div>
                    <h3 className="text-base font-semibold text-color-text mb-1.5">Looking for something specific?</h3>
                    <p className="text-sm text-color-text-muted/50">
                        Use <kbd className="px-1.5 py-0.5 text-xs border border-color-border rounded bg-card-alt font-mono mx-0.5">⌘K</kbd> to search across all documentation.
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <Link
                        href="/projects"
                        className="px-5 py-2.5 rounded-xl bg-primary-500/10 text-primary-400 text-sm font-medium hover:bg-primary-500/15 transition-colors"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="px-5 py-2.5 rounded-xl border border-color-border text-color-text-muted text-sm font-medium hover:bg-card hover:text-color-text transition-all"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
}
