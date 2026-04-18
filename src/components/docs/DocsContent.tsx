import React from 'react';
import Link from 'next/link';
import { IoCalendarOutline, IoTimeOutline, IoArrowBack, IoArrowForward } from "react-icons/io5";

interface DocsMeta {
    title: string;
    description?: string;
    lastUpdated?: string;
    readingTime?: string;
    authors?: Array<{ name: string; url?: string }>;
}

interface DocsContentProps {
    meta: DocsMeta;
    children: React.ReactNode;
    toc?: React.ReactNode;
    nextDoc?: { title: string; href: string };
    prevDoc?: { title: string; href: string };
}

export default function DocsContent({ meta, children, nextDoc, prevDoc }: DocsContentProps) {
    return (
        <div className="w-full">
            {/* Document header */}
            <header className="docs-page-header mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-color-text tracking-tight mb-3 leading-[1.15]">
                    {meta.title}
                </h1>
                {meta.description && (
                    <p className="text-color-text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-5">{meta.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-color-text-muted/60">
                    {meta.lastUpdated && (
                        <div className="flex items-center gap-1.5">
                            <IoCalendarOutline className="w-3.5 h-3.5" />
                            <span>{meta.lastUpdated}</span>
                        </div>
                    )}
                    {meta.readingTime && (
                        <div className="flex items-center gap-1.5">
                            <IoTimeOutline className="w-3.5 h-3.5" />
                            <span>{meta.readingTime}</span>
                        </div>
                    )}
                    {meta.authors && meta.authors.length > 0 && (
                        <div className="flex items-center gap-1.5">
                            <span>
                                {meta.authors.map((author, i) => (
                                    <React.Fragment key={author.name}>
                                        {i > 0 && ", "}
                                        {author.url ? (
                                            <a
                                                href={author.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-400/80 hover:text-primary-300 transition-colors"
                                            >
                                                {author.name}
                                            </a>
                                        ) : (
                                            author.name
                                        )}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    )}
                </div>

                {/* Subtle separator */}
                <div className="mt-6 h-px bg-color-border" />
            </header>

            {/* Article content */}
            <article className="docs-prose prose prose-invert max-w-none">
                {children}
            </article>

            {/* Previous/next navigation */}
            {(prevDoc || nextDoc) && (
                <div className="docs-pagination mt-16 pt-8 border-t border-color-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prevDoc ? (
                        <Link
                            href={prevDoc.href}
                            className="docs-pagination-link group flex flex-col gap-2 p-5 rounded-xl border border-color-border bg-card hover:bg-card-alt hover:border-primary-500/20 transition-all"
                        >
                            <div className="flex items-center gap-1.5 text-[12px] text-color-text-muted/50 uppercase tracking-wider font-medium">
                                <IoArrowBack className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                                Previous
                            </div>
                            <div className="text-sm font-medium text-color-text group-hover:text-primary-300 transition-colors">{prevDoc.title}</div>
                        </Link>
                    ) : <div />}

                    {nextDoc && (
                        <Link
                            href={nextDoc.href}
                            className="docs-pagination-link group flex flex-col gap-2 p-5 rounded-xl border border-color-border bg-card hover:bg-card-alt hover:border-primary-500/20 transition-all text-right sm:ml-auto"
                        >
                            <div className="flex items-center justify-end gap-1.5 text-[12px] text-color-text-muted/50 uppercase tracking-wider font-medium">
                                Next
                                <IoArrowForward className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div className="text-sm font-medium text-color-text group-hover:text-primary-300 transition-colors">{nextDoc.title}</div>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
