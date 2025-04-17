"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PostMetadata } from '@/lib/mdx';
import { calculateReadingTime } from '@/lib/mdx';
import { IoTimeOutline, IoCalendarOutline, IoArrowForward, IoBookmarkOutline, IoChevronDown } from 'react-icons/io5';
import { useRef, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface BlogContentProps {
    posts: Array<{ content: string; metadata: PostMetadata }>;
}

export default function BlogContent({ posts }: BlogContentProps) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');

    // Extract all unique tags from posts
    const allTags = posts.reduce((tags, post) => {
        post.metadata.tags?.forEach(tag => {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        });
        return tags;
    }, ['All'] as string[]);

    // Filter posts based on selected tag
    const filteredPosts = activeFilter === 'All'
        ? posts
        : posts.filter(post => post.metadata.tags?.includes(activeFilter));

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
                            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} on web development and technology
                        </p>
                    </div>

                    {/* Category filter dropdown */}
                    <div className="hidden md:block">
                        <DropdownMenu.Root open={filterOpen} onOpenChange={setFilterOpen}>
                            <DropdownMenu.Trigger asChild>
                                <button className="relative px-4 py-2 rounded-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 text-sm flex items-center gap-2 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all focus:outline-none">
                                    <IoBookmarkOutline className="w-4 h-4" />
                                    <span>{activeFilter === 'All' ? 'All categories' : activeFilter}</span>
                                    <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }} />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                                className="z-50 min-w-[180px] p-1 bg-card border border-color-border shadow-lg rounded-lg overflow-hidden animate-in fade-in-80 slide-in-from-top-5"
                                align="end"
                                sideOffset={5}
                            >
                                {allTags.map(tag => (
                                    <DropdownMenu.Item
                                        key={tag}
                                        className={`
                                            text-sm px-3 py-2 cursor-pointer rounded-md outline-none
                                            ${activeFilter === tag
                                                ? 'bg-primary-800/20 text-primary-300 font-medium'
                                                : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                            }
                                        `}
                                        onClick={() => {
                                            setActiveFilter(tag);
                                            setFilterOpen(false);
                                        }}
                                    >
                                        {tag}
                                        {activeFilter === tag && (
                                            <span className="ml-2 text-xs">✓</span>
                                        )}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </motion.div>

                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredPosts.map((post, index) => {
                            const readingTime = calculateReadingTime(post.content);
                            const formattedDate = new Date(post.metadata.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });

                            const isHovered = hoveredCard === post.metadata.slug;

                            return (
                                <CardItem
                                    key={post.metadata.slug}
                                    post={post}
                                    index={index}
                                    readingTime={readingTime}
                                    formattedDate={formattedDate}
                                    isHovered={isHovered}
                                    onHover={setHoveredCard}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center p-10 bg-card border border-color-border rounded-xl"
                    >
                        <h3 className="text-xl font-semibold mb-2">No posts found in this category</h3>
                        <p className="text-color-text-muted mb-6">Try selecting a different category or check back later.</p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="btn-secondary text-sm py-2"
                        >
                            Show all posts
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

interface CardItemProps {
    post: { content: string; metadata: PostMetadata };
    index: number;
    readingTime: string;
    formattedDate: string;
    isHovered: boolean;
    onHover: (slug: string | null) => void;
}

function CardItem({ post, index, readingTime, formattedDate, isHovered, onHover }: CardItemProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
            onMouseEnter={() => onHover(post.metadata.slug)}
            onMouseLeave={() => onHover(null)}
        >
            <Link href={`/blog/${post.metadata.slug}`} className="block h-full">
                <div className="relative h-full overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-900/10">
                    {/* Top gradient accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>

                    <div className="pt-6 px-6 pb-5 h-full flex flex-col">
                        {/* Top section - Tags and badge */}
                        <div className="flex flex-wrap justify-between items-center mb-4">
                            <div className="flex flex-wrap gap-2">
                                {post.metadata.tags && post.metadata.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* New post badge - conditional rendering */}
                            {isNew(post.metadata.date) && (
                                <span className="px-2 py-1 bg-primary-500/10 text-primary-300 text-xs font-medium rounded-md border border-primary-500/20">
                                    New
                                </span>
                            )}
                        </div>

                        {/* Title with hover effect */}
                        <motion.h2
                            className="text-xl sm:text-2xl font-bold mb-3 text-color-text group-hover:text-primary-300 transition-colors"
                            animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {post.metadata.title}
                        </motion.h2>

                        {/* Description with line clamp */}
                        {post.metadata.description && (
                            <p className="text-color-text-muted mb-6 line-clamp-3 flex-grow">
                                {post.metadata.description}
                            </p>
                        )}

                        {/* Bottom metadata section - now wider to accommodate content */}
                        <div className="mt-auto pt-4 border-t border-primary-800/20">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap items-center gap-4 text-color-text-muted">
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <IoCalendarOutline className="text-primary-400 w-3.5 h-3.5 flex-shrink-0" />
                                        <time dateTime={new Date(post.metadata.date).toISOString()}>{formattedDate}</time>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs">
                                        <IoTimeOutline className="text-primary-400 w-3.5 h-3.5 flex-shrink-0" />
                                        <span>{readingTime}</span>
                                    </div>
                                </div>

                                <motion.div
                                    className="relative flex-shrink-0 ml-2"
                                    animate={isHovered ? { x: 3 } : { x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="flex items-center gap-1 text-primary-400 text-sm font-medium transition-all duration-300 whitespace-nowrap">
                                        Read post
                                        <IoArrowForward className={`w-3.5 h-3.5 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Subtle hover glow effect */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            boxShadow: 'inset 0 0 20px rgba(var(--color-primary-500), 0.1)'
                        }}
                    />

                    {/* Subtle corner decoration */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-primary-500 rotate-45 translate-x-[10px] -translate-y-[10px]"></div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// Helper function to check if a post is less than 2 weeks old
function isNew(dateString: string): boolean {
    const postDate = new Date(dateString);
    const now = new Date();
    const twoWeeksAgo = new Date(now.setDate(now.getDate() - 14));
    return postDate > twoWeeksAgo;
}
