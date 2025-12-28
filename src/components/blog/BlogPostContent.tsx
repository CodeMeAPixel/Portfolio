"use client";

import Link from 'next/link';
import type { PostMetadata } from '@/lib/mdx';
import type { BlogPost } from '@/types/blog';
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
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-40 right-1/4 w-72 h-72 bg-gradient-to-br from-primary-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse"
                />
                <div
                    className="absolute bottom-60 left-1/4 w-80 h-80 bg-gradient-to-br from-accent-500/10 to-primary-500/15 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '2s' }}
                />
            </div>

            <div className="relative z-10 container-section max-w-4xl mx-auto py-24">
                {/* Premium Back Button */}
                <div className="animate-fade-up">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 glass-frost rounded-full text-primary-400 hover:text-primary-300 hover:bg-white/10 transition-all duration-300 mb-8 group"
                    >
                        <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all posts</span>
                    </Link>
                </div>

                <article>
                    <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            <span className="animated-gradient-text text-shadow-glow">{metadata.title}</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <div className="flex items-center gap-2 px-3 py-1.5 glass-frost rounded-full text-color-text-muted">
                                <IoCalendarOutline className="text-primary-400 w-4 h-4" />
                                <time className="text-sm">
                                    {new Date(metadata.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 glass-frost rounded-full text-color-text-muted">
                                <IoTimeOutline className="text-primary-400 w-4 h-4" />
                                <span className="text-sm">{readingTime}</span>
                            </div>

                            {metadata.tags && (
                                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                    {metadata.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 glass-frost rounded-full text-xs font-medium text-primary-300 border border-primary-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="glass-ultra rounded-2xl p-6 md:p-10 animate-fade-in"
                        style={{ animationDelay: '0.2s' }}
                    >
                        {isMounted && (
                            <MDXContent source={content} />
                        )}
                    </div>

                    {/* Share and tags section at the bottom - Premium */}
                    <div
                        className="mt-8 glass-ultra rounded-2xl p-6 animate-fade-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="flex flex-wrap justify-between items-center gap-6">
                            <div>
                                <h4 className="text-sm font-semibold text-color-text mb-3 flex items-center gap-2">
                                    <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                                    Tags
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {metadata.tags?.map(tag => (
                                        <span key={tag} className="px-3 py-1.5 glass-frost rounded-full text-xs font-medium text-primary-300 border border-primary-500/20 hover:border-primary-500/40 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-color-text mb-3 flex items-center gap-2">
                                    <IoShareSocialOutline className="text-primary-400 w-4 h-4" />
                                    Share
                                </h4>
                                <div className="flex gap-2">
                                    <button
                                        className="w-10 h-10 glass-frost rounded-xl flex items-center justify-center text-color-text-muted hover:text-primary-400 hover:bg-white/10 transition-all duration-300 group"
                                        aria-label="Share on Twitter"
                                    >
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="w-10 h-10 glass-frost rounded-xl flex items-center justify-center text-color-text-muted hover:text-primary-400 hover:bg-white/10 transition-all duration-300 group"
                                        aria-label="Share on Facebook"
                                    >
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </button>
                                    <button
                                        className="w-10 h-10 glass-frost rounded-xl flex items-center justify-center text-color-text-muted hover:text-primary-400 hover:bg-white/10 transition-all duration-300 group"
                                        aria-label="Share on LinkedIn"
                                    >
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
