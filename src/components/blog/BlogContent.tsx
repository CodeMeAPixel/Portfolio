"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PostMetadata } from '@/lib/mdx';
import { calculateReadingTime } from '@/lib/mdx';
import { IoTimeOutline, IoCalendarOutline } from 'react-icons/io5';

interface BlogContentProps {
    posts: Array<{ content: string; metadata: PostMetadata }>;
}

export default function BlogContent({ posts }: BlogContentProps) {
    return (
        <section className="py-24 bg-bg-alt relative z-10">
            <div className="container-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12"
                >
                    <div>
                        <h1 className="heading-primary text-center md:text-left mb-2">
                            My Blog
                        </h1>
                        <p className="text-color-text-muted text-center md:text-left">
                            {posts.length} article{posts.length !== 1 ? 's' : ''} on web development and technology
                        </p>
                    </div>

                    {/* Topic filter could go here in the future */}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post, index) => {
                        const readingTime = calculateReadingTime(post.content);

                        return (
                            <motion.div
                                key={post.metadata.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="card group relative overflow-hidden gradient-border p-6 hover:shadow-lg transition-all duration-300"
                                whileHover={{ y: -5 }}
                            >
                                <Link href={`/blog/${post.metadata.slug}`} className="block">
                                    <h2 className="heading-secondary mb-2 group-hover:text-primary-400 transition-colors">
                                        {post.metadata.title}
                                    </h2>

                                    <div className="flex items-center gap-4 mb-4 text-color-text-muted">
                                        <div className="flex items-center gap-1.5">
                                            <IoCalendarOutline className="text-primary-400 w-3.5 h-3.5" />
                                            <time className="text-xs">
                                                {new Date(post.metadata.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <IoTimeOutline className="text-primary-400 w-3.5 h-3.5" />
                                            <span className="text-xs">{readingTime}</span>
                                        </div>
                                    </div>

                                    {post.metadata.description && (
                                        <p className="text-color-text-muted mb-4 line-clamp-3">
                                            {post.metadata.description}
                                        </p>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-wrap gap-2">
                                            {post.metadata.tags && post.metadata.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 transition-colors text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <span className="text-primary-400 group-hover:text-primary-300 transition-colors flex items-center gap-1">
                                            Read more
                                            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
