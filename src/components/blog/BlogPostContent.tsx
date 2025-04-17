"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { PostMetadata } from '@/lib/mdx';
import { useState, useEffect } from 'react';
import { IoTimeOutline, IoCalendarOutline } from 'react-icons/io5';
import { MDXContent } from '../mdx/MDXContent';

interface BlogPostContentProps {
    content: string;
    metadata: PostMetadata;
    readingTime: string;
}

export default function BlogPostContent({ content, metadata, readingTime }: BlogPostContentProps) {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure hydration is complete before rendering content
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="py-24 bg-bg-alt relative z-10">
            <div className="container-section max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2 mb-8"
                >
                    <span className="text-xs">←</span>
                    <span>Back to all posts</span>
                </Link>

                <article>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="heading-primary mb-4">{metadata.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 mb-8 text-color-text-muted">
                            <div className="flex items-center gap-1.5">
                                <IoCalendarOutline className="text-primary-400 w-4 h-4" />
                                <time className="text-sm">
                                    {new Date(metadata.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <IoTimeOutline className="text-primary-400 w-4 h-4" />
                                <span className="text-sm">{readingTime}</span>
                            </div>

                            {metadata.tags && (
                                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                    {metadata.tags.map(tag => (
                                        <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {isMounted && (
                            <MDXContent source={content} />
                        )}
                    </motion.div>

                    {/* Share and tags section at the bottom */}
                    <div className="mt-12 pt-6 border-t border-primary-800/20">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="mb-4 sm:mb-0">
                                <h4 className="text-sm font-semibold text-color-text-muted mb-2">Tags:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {metadata.tags?.map(tag => (
                                        <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-color-text-muted mb-2">Share:</h4>
                                <div className="flex gap-2">
                                    <button className="btn-icon w-8 h-8" aria-label="Share on Twitter">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </button>
                                    <button className="btn-icon w-8 h-8" aria-label="Share on Facebook">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                    </button>
                                    <button className="btn-icon w-8 h-8" aria-label="Share on LinkedIn">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
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
