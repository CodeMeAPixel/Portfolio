"use client"

import { docsConfig } from "@/config/docs";
import Link from "next/link";
import { IoArrowForward, IoSearch, IoLogoGithub, IoSparkles, IoBook } from "react-icons/io5";

export default function DocsPage() {
    return (
        <div className="max-w-4xl">
            {/* Hero section */}
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-primary-300 glass-frost rounded-full">
                    <IoBook className="w-4 h-4" />
                    Project Documentation
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-color-text mb-4">
                    <span className="animated-gradient-text">Documentation</span>
                </h1>
                <p className="text-color-text-muted text-lg mb-8 max-w-2xl">
                    Explore documentation for my open-source projects, FiveM scripts, Discord bots, and web applications.
                </p>

                {/* Search box */}
                <div className="glass-ultra rounded-xl p-1 mb-8 flex items-center border border-white/10 hover:border-primary-500/30 transition-colors">
                    <div className="bg-primary-500/20 rounded-lg p-2.5 mx-2">
                        <IoSearch className="w-5 h-5 text-primary-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        className="bg-transparent border-none w-full py-2.5 text-color-text placeholder:text-color-text-muted focus:outline-none"
                    />
                    <div className="text-xs border border-white/10 rounded-lg px-2 py-1 mr-3 text-color-text-muted bg-white/5">
                        ⌘K
                    </div>
                </div>
            </div>

            {/* Project documentation grid */}
            <h2 className="text-xl font-bold mb-6 text-color-text flex items-center gap-2">
                <IoSparkles className="w-5 h-5 text-primary-400" />
                Browse by Project
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {docsConfig.sections.map((section, index) => {
                    return (
                        <div
                            key={section.slug}
                            className="animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="group h-full p-6 rounded-2xl glass-ultra border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-primary-500/20 text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                                        <section.icon className="w-6 h-6" />
                                    </div>
                                    {section.projectUrl && (
                                        <a
                                            href={section.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-lg text-color-text-muted hover:text-primary-400 hover:bg-white/5 transition-all"
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
                                <p className="text-color-text-muted text-sm mb-5">{section.description}</p>

                                {/* Quick links */}
                                <div className="space-y-2 mb-5">
                                    {section.categories[0]?.items.slice(0, 3).map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center gap-2 text-sm text-color-text-muted hover:text-primary-400 transition-colors py-1"
                                            >
                                                {Icon && <Icon className="w-3.5 h-3.5 text-primary-500/70" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>

                                {/* View all link */}
                                <Link
                                    href={section.categories[0]?.items[0]?.href || `/docs/${section.slug}`}
                                    className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium group/link"
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
            <div className="glass-ultra rounded-2xl border border-white/10 p-6 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-color-text mb-1">Looking for something specific?</h3>
                        <p className="text-color-text-muted text-sm">
                            Check out my projects page or get in touch if you have questions.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/projects"
                            className="px-4 py-2 rounded-lg bg-primary-500/20 text-primary-300 text-sm font-medium hover:bg-primary-500/30 transition-colors"
                        >
                            View Projects
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-2 rounded-lg bg-white/5 text-color-text-muted text-sm font-medium hover:bg-white/10 hover:text-color-text transition-colors"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
