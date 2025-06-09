"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { PostMetadata } from '@/lib/mdx';
import { calculateReadingTime } from '@/lib/mdx';
import {
    IoTimeOutline, IoCalendarOutline, IoArrowForward, IoBookmarkOutline,
    IoChevronDown, IoGridOutline, IoListOutline, IoSearch, IoClose,
    IoSwapVertical
} from 'react-icons/io5';
import { useRef, useState, useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

interface BlogContentProps {
    posts: Array<{ content: string; metadata: PostMetadata }>;
    categories: string[];
    tags: string[];
}

type LayoutType = 'grid' | 'list';
type SortOption = 'date-desc' | 'date-asc' | 'alphabetical';

export default function BlogContent({ posts, categories, tags }: BlogContentProps) {
    // State for filtering and display
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [layout, setLayout] = useState<LayoutType>('list'); // Changed to 'list' as default
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');

    // Include 'All' at the beginning of the categories and tags arrays
    const allCategories = ['All', ...categories];
    const allTags = ['All', ...tags];

    // Debounce search query to prevent excessive filtering during typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Filter posts based on selected category/tag and search query
    const filteredPosts = posts
        .filter(post => {
            if (activeFilter === 'All') return true;
            return post.metadata.category === activeFilter ||
                post.metadata.tags?.includes(activeFilter);
        })
        .filter(post => {
            if (!debouncedSearchQuery) return true;

            const query = debouncedSearchQuery.toLowerCase();
            return (
                post.metadata.title.toLowerCase().includes(query) ||
                (post.metadata.description && post.metadata.description.toLowerCase().includes(query)) ||
                post.metadata.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => {
            // Sort by selected sort option
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
                case 'date-asc':
                    return new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime();
                case 'alphabetical':
                    return a.metadata.title.localeCompare(b.metadata.title);
                default:
                    return 0;
            }
        });

    // Toggle search input visibility
    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (!isSearching) {
            // Focus the search input when it becomes visible
            setTimeout(() => {
                const searchInput = document.getElementById('blog-search');
                if (searchInput) searchInput.focus();
            }, 100);
        } else {
            // Clear search when closing
            setSearchQuery('');
        }
    };

    // Get text for the active sort option
    const getSortOptionText = (option: SortOption): string => {
        switch (option) {
            case 'date-desc': return 'Newest first';
            case 'date-asc': return 'Oldest first';
            case 'alphabetical': return 'A-Z';
            default: return 'Sort';
        }
    };

    return (
        <section className="py-24 bg-bg-alt relative z-10">
            <BackgroundEffects className="absolute inset-0 -z-10" />

            {/* Header section */}
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

                    <div className="flex gap-3 mt-6 md:mt-0 justify-center md:justify-end items-center flex-wrap">
                        {/* Layout switcher - Hidden on mobile */}
                        <div className="hidden md:flex rounded-xl overflow-hidden border border-primary-700/20">
                            <button
                                onClick={() => setLayout('grid')}
                                className={`p-2 flex items-center justify-center transition-colors ${layout === 'grid'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="Grid view"
                                title="Grid view"
                            >
                                <IoGridOutline className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setLayout('list')}
                                className={`p-2 flex items-center justify-center transition-colors ${layout === 'list'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="List view"
                                title="List view"
                            >
                                <IoListOutline className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sort dropdown - Hidden on mobile */}
                        <div className="hidden md:block">
                            <DropdownMenu.Root open={sortOpen} onOpenChange={setSortOpen}>
                                <DropdownMenu.Trigger asChild>
                                    <button className="px-4 py-2 rounded-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 text-sm flex items-center gap-2 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all focus:outline-none">
                                        <IoSwapVertical className="w-4 h-4" />
                                        <span>{getSortOptionText(sortBy)}</span>
                                        <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none' }} />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    className="z-50 min-w-[180px] p-1 bg-card border border-color-border shadow-lg rounded-lg overflow-hidden animate-in fade-in-80 slide-in-from-top-5"
                                    align="end"
                                    sideOffset={5}
                                >
                                    <DropdownMenu.Item
                                        className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'date-desc' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                            }`}
                                        onClick={() => setSortBy('date-desc')}
                                    >
                                        <div className="flex items-center">
                                            <IoCalendarOutline className="w-4 h-4 mr-2" />
                                            Newest first
                                            {sortBy === 'date-desc' && <span className="ml-2 text-xs">✓</span>}
                                        </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'date-asc' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                            }`}
                                        onClick={() => setSortBy('date-asc')}
                                    >
                                        <div className="flex items-center">
                                            <IoCalendarOutline className="w-4 h-4 mr-2" />
                                            Oldest first
                                            {sortBy === 'date-asc' && <span className="ml-2 text-xs">✓</span>}
                                        </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item
                                        className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'alphabetical' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                            }`}
                                        onClick={() => setSortBy('alphabetical')}
                                    >
                                        <div className="flex items-center">
                                            <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs font-bold">A</span>
                                            Alphabetical (A-Z)
                                            {sortBy === 'alphabetical' && <span className="ml-2 text-xs">✓</span>}
                                        </div>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>

                        {/* Search button and input - Hidden on mobile */}
                        <div className="hidden md:flex relative items-center">
                            {isSearching && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex items-center"
                                >
                                    <input
                                        id="blog-search"
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search articles..."
                                        className="w-[200px] px-3 py-2 rounded-l-xl bg-card border border-r-0 border-primary-700/20 text-color-text placeholder:text-color-text-muted text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Escape') {
                                                toggleSearch();
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={toggleSearch}
                                        className="px-3 py-2 rounded-r-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all"
                                        aria-label="Close search"
                                    >
                                        <IoClose className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {!isSearching && (
                                <motion.button
                                    onClick={toggleSearch}
                                    className="px-4 py-2 rounded-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 text-sm flex items-center gap-2 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all focus:outline-none"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    aria-label="Search articles"
                                >
                                    <IoSearch className="w-4 h-4" />
                                    <span className="hidden sm:inline">Search</span>
                                </motion.button>
                            )}
                        </div>

                        {/* Category filter dropdown - Hidden on mobile */}
                        <div className={`hidden md:block ${isSearching ? 'md:hidden' : ''}`}>
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
                                    {/* Categories section */}
                                    <DropdownMenu.Label className="text-xs font-semibold uppercase tracking-wider text-color-text-muted px-2 py-1.5">
                                        Categories
                                    </DropdownMenu.Label>

                                    {allCategories.map(category => (
                                        <DropdownMenu.Item
                                            key={category}
                                            className={`
                                                text-sm px-3 py-2 cursor-pointer rounded-md outline-none
                                                ${activeFilter === category
                                                    ? 'bg-primary-800/20 text-primary-300 font-medium'
                                                    : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                                }
                                            `}
                                            onClick={() => {
                                                setActiveFilter(category);
                                                setFilterOpen(false);
                                            }}
                                        >
                                            {category}
                                            {activeFilter === category && (
                                                <span className="ml-2 text-xs">✓</span>
                                            )}
                                        </DropdownMenu.Item>
                                    ))}

                                    {/* Tags section - if we have tags */}
                                    {tags.length > 0 && (
                                        <>
                                            <DropdownMenu.Separator className="h-px bg-color-border my-1" />
                                            <DropdownMenu.Label className="text-xs font-semibold uppercase tracking-wider text-color-text-muted px-2 py-1.5">
                                                Tags
                                            </DropdownMenu.Label>

                                            {allTags.slice(1).map(tag => (
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
                                        </>
                                    )}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile controls section */}
                <div className="flex flex-col gap-4 mb-8 md:hidden">
                    {/* Layout switcher for mobile */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-color-text-muted">
                            <span>View:</span>
                        </div>
                        <div className="flex rounded-xl overflow-hidden border border-primary-700/20">
                            <button
                                onClick={() => setLayout('grid')}
                                className={`p-2 flex items-center justify-center transition-colors ${layout === 'grid'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="Grid view"
                            >
                                <IoGridOutline className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setLayout('list')}
                                className={`p-2 flex items-center justify-center transition-colors ${layout === 'list'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="List view"
                            >
                                <IoListOutline className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Search input for mobile */}
                    <div className="relative w-full">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-color-text-muted">
                            <IoSearch className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-primary-700/20 text-color-text placeholder:text-color-text-muted text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setSearchQuery('');
                                }
                            }}
                        />
                        {searchQuery && (
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-color-text-muted hover:text-color-text"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                <IoClose className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Mobile filter tabs (categories and tags) */}
                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-2 min-w-max">
                            {allCategories.map(category => (
                                <button
                                    key={category}
                                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${activeFilter === category
                                        ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                        : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                        }`}
                                    onClick={() => setActiveFilter(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile sort options */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-color-text-muted">
                            <IoSwapVertical className="w-4 h-4" />
                            <span>Sort by:</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSortBy('date-desc')}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${sortBy === 'date-desc'
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border'
                                    }`}
                            >
                                Newest
                            </button>
                            <button
                                onClick={() => setSortBy('date-asc')}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${sortBy === 'date-asc'
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border'
                                    }`}
                            >
                                Oldest
                            </button>
                            <button
                                onClick={() => setSortBy('alphabetical')}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${sortBy === 'alphabetical'
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border'
                                    }`}
                            >
                                A-Z
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search result summary */}
                {debouncedSearchQuery && (
                    <div className="mb-6 p-3 bg-card border border-color-border rounded-lg flex justify-between items-center">
                        <p className="text-color-text-muted text-sm">
                            Found <span className="text-primary-300 font-medium">{filteredPosts.length}</span> result{filteredPosts.length !== 1 ? 's' : ''} for "<span className="text-color-text font-medium">{debouncedSearchQuery}</span>"
                            {activeFilter !== 'All' && (
                                <> with {allTags.includes(activeFilter) ? 'tag' : 'category'} <span className="text-primary-300 font-medium">{activeFilter}</span></>
                            )}
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-color-text-muted hover:text-color-text p-1 rounded-full hover:bg-card-alt"
                            aria-label="Clear search"
                        >
                            <IoClose className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {filteredPosts.length > 0 ? (
                    <AnimatePresence mode="wait">
                        {layout === 'grid' ? (
                            // Grid layout - our classic card view
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                            >
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
                                            searchQuery={debouncedSearchQuery}
                                        />
                                    );
                                })}
                            </motion.div>
                        ) : (
                            // List layout - more compact view
                            <motion.div
                                key="list"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-4"
                            >
                                {filteredPosts.map((post, index) => {
                                    const readingTime = calculateReadingTime(post.content);
                                    const formattedDate = new Date(post.metadata.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    });

                                    const isHovered = hoveredCard === post.metadata.slug;

                                    return (
                                        <ListItem
                                            key={post.metadata.slug}
                                            post={post}
                                            index={index}
                                            readingTime={readingTime}
                                            formattedDate={formattedDate}
                                            isHovered={isHovered}
                                            onHover={setHoveredCard}
                                            searchQuery={debouncedSearchQuery}
                                        />
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center p-10 bg-card border border-color-border rounded-xl"
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            {debouncedSearchQuery
                                ? `No articles found matching "${debouncedSearchQuery}"`
                                : "No articles found in this category"}
                        </h3>
                        <p className="text-color-text-muted mb-6">
                            {debouncedSearchQuery
                                ? "Try different search terms or clear your search"
                                : "Try selecting a different filter or check back later."}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {debouncedSearchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="btn-secondary text-sm py-2"
                                >
                                    Clear Search
                                </button>
                            )}
                            {activeFilter !== 'All' && (
                                <button
                                    onClick={() => setActiveFilter('All')}
                                    className="btn-secondary text-sm py-2"
                                >
                                    Show All Articles
                                </button>
                            )}
                        </div>
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
    searchQuery: string;
}

function CardItem({ post, index, readingTime, formattedDate, isHovered, onHover, searchQuery }: CardItemProps) {
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
                                    <span
                                        key={tag}
                                        className={`tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors ${searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())
                                            ? 'bg-primary-800/60 border-primary-600/60 text-primary-200'
                                            : ''
                                            }`}
                                    >
                                        {highlightMatchedText(tag, searchQuery)}
                                    </span>
                                ))}
                                {post.metadata.tags && post.metadata.tags.length > 3 && (
                                    <span className="tag bg-primary-900/30 border-primary-700/30 text-xs">
                                        +{post.metadata.tags.length - 3}
                                    </span>
                                )}
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
                            {highlightMatchedText(post.metadata.title, searchQuery)}
                        </motion.h2>

                        {/* Description with line clamp */}
                        {post.metadata.description && (
                            <p className="text-color-text-muted mb-6 line-clamp-3 flex-grow">
                                {highlightMatchedText(post.metadata.description, searchQuery)}
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

function ListItem({ post, index, readingTime, formattedDate, isHovered, onHover, searchQuery }: CardItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group"
            onMouseEnter={() => onHover(post.metadata.slug)}
            onMouseLeave={() => onHover(null)}
        >
            <Link href={`/blog/${post.metadata.slug}`} className="block">
                <div className="relative overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/10 group-hover:border-primary-700/30">
                    {/* Top gradient accent bar - same as grid view */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                    <div className="p-6">
                        {/* Top section with date and reading time */}
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex flex-wrap gap-3 text-color-text-muted text-xs">
                                <div className="flex items-center gap-1.5">
                                    <IoCalendarOutline className="text-primary-400 w-3.5 h-3.5 flex-shrink-0" />
                                    <time dateTime={new Date(post.metadata.date).toISOString()}>{formattedDate}</time>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <IoTimeOutline className="text-primary-400 w-3.5 h-3.5 flex-shrink-0" />
                                    <span>{readingTime}</span>
                                </div>
                            </div>

                            {/* New badge */}
                            {isNew(post.metadata.date) && (
                                <span className="px-2 py-1 bg-primary-500/10 text-primary-300 text-xs font-medium rounded-md border border-primary-500/20">
                                    New
                                </span>
                            )}
                        </div>

                        {/* Title with hover effect - same as grid view */}
                        <motion.h2
                            className="text-xl font-bold mb-3 text-color-text group-hover:text-primary-300 transition-colors"
                            animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {highlightMatchedText(post.metadata.title, searchQuery)}
                        </motion.h2>

                        {/* Description */}
                        {post.metadata.description && (
                            <p className="text-color-text-muted mb-4 line-clamp-2">
                                {highlightMatchedText(post.metadata.description, searchQuery)}
                            </p>
                        )}

                        {/* Tags and read more */}
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="flex flex-wrap gap-2">
                                {post.metadata.tags && post.metadata.tags.slice(0, 4).map(tag => (
                                    <span
                                        key={tag}
                                        className={`tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors ${searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())
                                            ? 'bg-primary-800/60 border-primary-600/60 text-primary-200'
                                            : ''
                                            }`}
                                    >
                                        {highlightMatchedText(tag, searchQuery)}
                                    </span>
                                ))}
                            </div>

                            <motion.div
                                className="relative flex-shrink-0 ml-2"
                                animate={isHovered ? { x: 3 } : { x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="flex items-center gap-1 text-primary-400 text-sm font-medium transition-all duration-300 whitespace-nowrap">
                                    Read post
                                    <IoArrowForward className={`w-3.5 h-3.5 transition-all duration-300 ${isHovered ? 'translate-x-0.5 opacity-100' : 'opacity-0'}`} />
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Subtle hover glow effect - same as grid view */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            boxShadow: 'inset 0 0 20px rgba(var(--color-primary-500), 0.1)'
                        }}
                    />

                    {/* Subtle corner decoration - same as grid view */}
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

// Helper function to highlight matched text
function highlightMatchedText(text: string, query: string): React.ReactNode {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase()
                    ? <mark key={index} className="bg-primary-900/30 text-primary-200 px-0.5 rounded">{part}</mark>
                    : part
            )}
        </>
    );
}
