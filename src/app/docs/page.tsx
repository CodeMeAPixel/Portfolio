"use client"

import { docsConfig } from "@/config/docs";
import Link from "next/link";
import { IoArrowForward, IoBookmark, IoSearch, IoRocket, IoApps } from "react-icons/io5";

export default function DocsPage() {
    return (
        <div className="max-w-4xl">
            <div className="mb-10">
                <h1 className="heading-primary mb-4">Documentation</h1>
                <p className="text-color-text-muted text-lg mb-6">
                    Comprehensive guides and resources to help you build amazing applications.
                </p>

                {/* Search box */}
                <div className="card bg-card p-1 mb-10 flex items-center border-color-border hover:border-primary-700/50 transition-colors">
                    <div className="bg-primary-900/30 rounded-md p-2 mx-2">
                        <IoSearch className="w-5 h-5 text-primary-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        className="bg-transparent border-none w-full py-2 text-color-text placeholder:text-color-text-muted focus:outline-none"
                    />
                    <div className="text-xs border border-color-border rounded px-1.5 py-0.5 mr-2 text-color-text-muted">
                        ⌘K
                    </div>
                </div>
            </div>

            {/* Featured section */}
            <div className="card border-primary-700/30 mb-12 overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-1 p-6 md:p-8">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-900/40 text-primary-300 border border-primary-700/30 mb-4">
                            New
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-color-text">Get Started With Our Platform</h2>
                        <p className="text-color-text-muted mb-6">
                            Everything you need to know to get up and running with our platform quickly. Follow our step-by-step guide to build your first application.
                        </p>
                        <Link href="/docs/getting-started/quick-start" className="btn-primary inline-flex items-center gap-2">
                            <IoRocket className="w-4 h-4" />
                            <span>Quick Start Guide</span>
                        </Link>
                    </div>
                    <div className="hidden md:block md:w-1/3 bg-gradient-to-br from-primary-900/50 to-primary-700/20 p-8">
                        <div className="flex h-full items-center justify-center">
                            <IoApps className="w-32 h-32 text-primary-400/30" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Documentation sections */}
            <h2 className="text-xl font-semibold mb-6 text-color-text">Browse Documentation</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {docsConfig.sections.map((section, index) => {
                    return (
                        <div
                            key={section.slug}
                            className="animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="docs-section-card h-full">
                                <div className="docs-section-card-icon">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-semibold mb-2 text-primary-400">{section.name}</h2>
                                <p className="text-color-text-muted text-sm mb-4">{section.description}</p>

                                <div className="space-y-4 mb-4">
                                    {section.categories.map((category) => (
                                        <div key={category.title}>
                                            <h3 className="text-sm font-medium text-color-text mb-2">{category.title}</h3>
                                            <ul className="space-y-1">
                                                {category.items.slice(0, 2).map((item) => {
                                                    const Icon = item.icon;
                                                    return (
                                                        <li key={item.href}>
                                                            <Link
                                                                href={item.href}
                                                                className="flex items-center gap-2 text-sm text-color-text-muted hover:text-primary-400 transition-colors"
                                                            >
                                                                {Icon && <Icon className="w-3.5 h-3.5 text-primary-300" />}
                                                                <span>{item.title}</span>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-2">
                                    <Link
                                        href={`/docs/${section.slug}`}
                                        className="inline-flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium"
                                    >
                                        <span>View all {section.name} docs</span>
                                        <IoArrowForward className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Popular guides */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-6 text-color-text">Popular Guides</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: "Authentication Guide",
                            description: "Learn how to implement authentication in your application",
                            href: "/docs/backend/auth",
                            icon: docsConfig.sections[2].categories[0].items[1].icon
                        },
                        {
                            title: "Component Library",
                            description: "Explore the UI component library for faster development",
                            href: "/docs/frontend/components",
                            icon: docsConfig.sections[1].categories[0].items[0].icon
                        },
                        {
                            title: "Deployment Guide",
                            description: "Learn how to deploy your application to production",
                            href: "/docs/deployment/build",
                            icon: docsConfig.sections[3].categories[0].items[0].icon
                        },
                        {
                            title: "State Management",
                            description: "Best practices for managing application state",
                            href: "/docs/frontend/state",
                            icon: docsConfig.sections[1].categories[1].items[0].icon
                        }
                    ].map((guide, index) => {
                        const Icon = guide.icon;
                        return (
                            <Link
                                key={index}
                                href={guide.href}
                                className="card p-4 border-color-border hover:border-primary-700/30 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    {Icon && <Icon className="w-5 h-5 text-primary-400 mt-0.5" />}
                                    <div>
                                        <h3 className="font-medium text-color-text mb-1">{guide.title}</h3>
                                        <p className="text-sm text-color-text-muted">{guide.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Help & support */}
            <div className="card bg-card-alt/50 border-primary-500/20 p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary-900/30 rounded-full p-3">
                        <IoBookmark className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-color-text">Need Help?</h2>
                        <p className="text-color-text-muted mb-4">
                            Can't find what you're looking for or have questions? Our support team is ready to help.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                                <span>Contact Support</span>
                            </Link>
                            <a
                                href="https://github.com/codemeapixel/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline inline-flex items-center gap-2"
                            >
                                <span>Report Issue</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
