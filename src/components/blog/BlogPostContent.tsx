"use client";

import Link from 'next/link';
import type { PostMetadata } from '../../lib/mdx';
import type { BlogPost } from '../../types/blog';
import { useState, useEffect } from 'react';
import { IoTimeOutline, IoCalendarOutline, IoArrowBack, IoLogoTwitter, IoLogoLinkedin, IoShareSocialOutline } from 'react-icons/io5';
import { MDXContent } from '../mdx/MDXContent';

interface BlogPostContentProps {
    content: string;
    metadata: PostMetadata;
    readingTime: string;
    relatedPosts: BlogPost[];
}

export default function BlogPostContent({ content, metadata, readingTime, relatedPosts }: BlogPostContentProps) {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure hydration is complete before rendering content
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-dot-pattern opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            <div className="relative z-10 container-section max-w-4xl mx-auto py-24">
                {/* Premium Back Button */}
                <div className="animate-fade-up">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-color-border bg-card rounded-lg text-primary-400 hover:text-primary-300 hover:bg-card-alt transition-colors mb-8 group"
                    >
                        <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all posts</span>
                    </Link>
                </div>

                <article>
                    <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            <span className="animated-gradient-text">{metadata.title}</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-color-text-muted">
                            <span className="flex items-center gap-1.5">
                                <IoCalendarOutline className="text-primary-400 w-4 h-4" />
                                <time>
                                    {new Date(metadata.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </span>
                            <span className="text-color-border">·</span>
                            <span className="flex items-center gap-1.5">
                                <IoTimeOutline className="text-primary-400 w-4 h-4" />
                                <span>{readingTime}</span>
                            </span>
                            {metadata.tags && metadata.tags.length > 0 && (
                                <>
                                    <span className="text-color-border">·</span>
                                    {metadata.tags.map(tag => (
                                        <span key={tag} className="text-color-text-muted">#{tag}</span>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    <div
                        className="animate-fade-in"
                        style={{ animationDelay: '0.2s' }}
                    >
                        {isMounted && (
                            <MDXContent source={content} />
                        )}
                    </div>

                    {/* Share and tags section */}
                    <div
                        className="mt-12 pt-8 border-t border-color-border animate-fade-up flex flex-wrap justify-between items-start gap-6"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div>
                            <p className="text-xs uppercase tracking-widest text-color-text-muted mb-3">Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {metadata.tags?.map(tag => (
                                    <span key={tag} className="text-sm text-color-text-muted hover:text-primary-400 transition-colors">#{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-widest text-color-text-muted mb-3">Share</p>
                            <div className="flex gap-3">
                                <button className="text-color-text-muted hover:text-primary-400 transition-colors" aria-label="Share on Twitter">
                                    <IoLogoTwitter className="w-5 h-5" />
                                </button>
                                <button className="text-color-text-muted hover:text-primary-400 transition-colors" aria-label="Share on LinkedIn">
                                    <IoLogoLinkedin className="w-5 h-5" />
                                </button>
                                <button className="text-color-text-muted hover:text-primary-400 transition-colors" aria-label="Share">
                                    <IoShareSocialOutline className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
