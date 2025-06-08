import React from 'react';
import Link from 'next/link';
import { IoTimeOutline, IoCalendarOutline, IoInformationCircleOutline } from "react-icons/io5";

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

export default function DocsContent({ meta, children, toc, nextDoc, prevDoc }: DocsContentProps) {
    return (
        <div className="max-w-3xl">
            {/* Document header */}
            <div className="mb-8 pb-6 border-b border-color-border">
                <h1 className="heading-primary mb-3">{meta.title}</h1>
                {meta.description && (
                    <p className="text-color-text-muted text-lg mb-4">{meta.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-color-text-muted">
                    {meta.lastUpdated && (
                        <div className="flex items-center gap-1.5">
                            <IoCalendarOutline className="text-primary-400 w-4 h-4" />
                            <span>Updated: {meta.lastUpdated}</span>
                        </div>
                    )}

                    {meta.readingTime && (
                        <div className="flex items-center gap-1.5">
                            <IoTimeOutline className="text-primary-400 w-4 h-4" />
                            <span>{meta.readingTime}</span>
                        </div>
                    )}

                    {meta.authors && meta.authors.length > 0 && (
                        <div className="flex items-center gap-1.5">
                            <IoInformationCircleOutline className="text-primary-400 w-4 h-4" />
                            <span>
                                By:{" "}
                                {meta.authors.map((author, i) => (
                                    <React.Fragment key={author.name}>
                                        {i > 0 && ", "}
                                        {author.url ? (
                                            <a
                                                href={author.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-400 hover:text-primary-300 transition-colors"
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
            </div>

            {/* Main content with optional table of contents */}
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-grow order-2 lg:order-1">
                    <div className="prose prose-invert max-w-none mb-10">
                        {children}
                    </div>

                    {/* Previous/next navigation */}
                    {(prevDoc || nextDoc) && (
                        <div className="border-t border-color-border pt-6 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {prevDoc && (
                                <Link
                                    href={prevDoc.href}
                                    className="card p-4 hover:border-primary-700/30 transition-colors"
                                >
                                    <div className="text-sm text-color-text-muted mb-1">Previous</div>
                                    <div className="font-medium text-color-text">{prevDoc.title}</div>
                                </Link>
                            )}

                            {nextDoc && (
                                <Link
                                    href={nextDoc.href}
                                    className="card p-4 hover:border-primary-700/30 transition-colors sm:ml-auto"
                                >
                                    <div className="text-sm text-color-text-muted mb-1 text-right">Next</div>
                                    <div className="font-medium text-color-text">{nextDoc.title}</div>
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                {/* Table of contents sidebar */}
                {toc && (
                    <div className="order-1 lg:order-2 lg:w-64 flex-shrink-0">
                        <div className="lg:sticky lg:top-28">
                            <div className="card p-4">
                                <div className="text-sm font-medium mb-3 text-primary-400">On this page</div>
                                {toc}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
