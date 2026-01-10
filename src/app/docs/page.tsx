"use client"

import { docsConfig } from "@/config/docs";
import Link from "next/link";
import { IoArrowForward, IoSearch, IoLogoGithub, IoSparkles, IoBook } from "react-icons/io5";

export default function DocsPage() {
    return (
        <div className="max-w-4xl">
            {/* Hero section */}
            <div className="mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary-300 glass-frost rounded-full animate-fade-in">
                    <IoBook className="w-4 h-4" />
                    Project Documentation
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-color-text mb-5 animate-fade-in-up">
                    <span className="animated-gradient-text text-shadow-glow">Documentation</span>
                </h1>
                <p className="text-color-text-muted text-lg mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Explore documentation for my open-source projects, FiveM scripts, Discord bots, and web applications.
                </p>

                {/* Search box */}
                <div className="glass-ultra rounded-2xl p-1.5 mb-10 flex items-center border border-white/10 hover:border-primary-500/30 transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: '150ms' }}>
                    <div className="bg-primary-500/20 rounded-xl p-3 mx-2 group-hover:bg-primary-500/30 transition-colors">
                        <IoSearch className="w-5 h-5 text-primary-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        className="bg-transparent border-none w-full py-3 text-color-text placeholder:text-color-text-muted focus:outline-none"
                    />
                    <div className="text-xs border border-white/10 rounded-lg px-2.5 py-1.5 mr-3 text-color-text-muted bg-white/5 font-mono">
                        ⌘K
                    </div>
                </div>
            </div>

            {/* Project documentation grid */}
            <h2 className="text-xl font-bold mb-8 text-color-text flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="p-2 rounded-lg bg-primary-500/20">
                    <IoSparkles className="w-5 h-5 text-primary-400" />
                </div>
                Browse by Project
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-14">
                {docsConfig.sections.map((section, index) => {
                    return (
                        <div
                            key={section.slug}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${250 + index * 100}ms` }}
                        >
                            <div className="group h-full p-6 rounded-2xl glass-ultra border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/5 shine-sweep">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-5">
                                    <div className="p-3.5 rounded-xl bg-primary-500/20 text-primary-400 group-hover:bg-primary-500/30 group-hover:scale-110 transition-all duration-300">
                                        <section.icon className="w-6 h-6" />
                                    </div>
                                    {section.projectUrl && (
                                        <a
                                            href={section.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl text-color-text-muted hover:text-primary-400 hover:bg-white/5 transition-all"
                                            aria-label="View on GitHub"
                                        >
                                            <IoLogoGithub className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-color-text mb-2 group-hover:text-primary-300 transition-colors">
                                    {section.name}
                                </h3>
                                <p className="text-color-text-muted text-sm mb-6 leading-relaxed">{section.description}</p>

                                {/* Quick links */}
                                <div className="space-y-2 mb-6">
                                    {section.categories[0]?.items.slice(0, 3).map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-2.5 text-sm text-color-text-muted hover:text-primary-400 transition-colors py-1.5 group/item"
                                            >
                                                {Icon && <Icon className="w-4 h-4 text-primary-500/70 group-hover/item:text-primary-400 transition-colors" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* View all link */}
                                <Link
                                    href={section.categories[0]?.items[0]?.href || `/docs/${section.slug}`}
                                    className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium group/link"
                                >
                                    <span>View documentation</span>
                                    <IoArrowForward className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick access section */}
            <div className="glass-ultra rounded-2xl border border-white/10 p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-color-text mb-2">Looking for something specific?</h3>
                        <p className="text-color-text-muted text-sm leading-relaxed">
                            Check out my projects page or get in touch if you have questions.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <Link
                            href="/projects"
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-500/25 hover:scale-[1.02] transition-all"
                        >
                            View Projects
                        </Link>
                        <Link
                            href="/contact"
                            className="px-5 py-2.5 rounded-xl glass-frost text-color-text-muted text-sm font-medium hover:bg-white/10 hover:text-color-text transition-all"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
