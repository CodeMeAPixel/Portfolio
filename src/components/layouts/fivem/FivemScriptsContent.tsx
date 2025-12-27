"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
    IoArrowForward, IoFilterOutline, IoGridOutline, IoListOutline, IoSearch, IoClose,
    IoTimeOutline, IoChevronDown, IoSwapVertical, IoCalendarOutline, IoLogoGithub, IoGlobeOutline
} from 'react-icons/io5';
import type { FivemScript } from '@/types/fivem';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import { TechIcon } from '@/components/ui/TechIcon';

interface FivemScriptsContentProps {
    scripts: FivemScript[];
    allTags: string[];
}

type ViewMode = 'grid' | 'list';
type Filter = 'All' | 'ESX' | 'QBCore' | 'Standalone' | 'Released' | 'In Development' | 'Coming Soon';
type SortOption = 'date-desc' | 'date-asc' | 'alphabetical' | 'price-asc' | 'price-desc';

export default function FivemScriptsContent({ scripts, allTags }: FivemScriptsContentProps) {
    // State for filtering and display
    const [viewMode, setViewMode] = useState<ViewMode>('list'); // Default to table/list view
    const [filter, setFilter] = useState<Filter>('All');
    const [hoveredScript, setHoveredScript] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');

    // Extract all frameworks and statuses
    const frameworks = ['ESX', 'QBCore', 'Standalone'];
    const statuses = ['Released', 'In Development', 'Coming Soon'];

    // Debounce search query to prevent excessive filtering during typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Filter scripts based on selected filter, search query, and sort
    const filteredScripts = scripts
        .filter(script => {
            // Filter by framework or status
            if (filter === 'All') return true;
            if (filter === 'ESX' || filter === 'QBCore' || filter === 'Standalone') {
                return script.framework === filter || script.framework === 'Both';
            }
            return script.status === filter;
        })
        .filter(script => {
            // Filter by search query
            if (!debouncedSearchQuery) return true;

            const query = debouncedSearchQuery.toLowerCase();
            return (
                script.title.toLowerCase().includes(query) ||
                script.description.toLowerCase().includes(query) ||
                script.tags.some(tag => tag.toLowerCase().includes(query)) ||
                (script.longDescription && script.longDescription.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => {
            // Sort by selected option
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.lastUpdated || '').getTime() - new Date(a.lastUpdated || '').getTime();
                case 'date-asc':
                    return new Date(a.lastUpdated || '').getTime() - new Date(b.lastUpdated || '').getTime();
                case 'alphabetical':
                    return a.title.localeCompare(b.title);
                case 'price-asc':
                    return extractPriceNumber(a.price) - extractPriceNumber(b.price);
                case 'price-desc':
                    return extractPriceNumber(b.price) - extractPriceNumber(a.price);
                default:
                    return 0;
            }
        });

    // Helper function to extract numeric price for sorting
    function extractPriceNumber(price: string): number {
        const match = price.match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : 0;
    }

    // Toggle search input visibility
    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (!isSearching) {
            // Focus the search input when it becomes visible
            setTimeout(() => {
                const searchInput = document.getElementById('script-search');
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
            case 'price-asc': return 'Price: Low to High';
            case 'price-desc': return 'Price: High to Low';
            default: return 'Sort';
        }
    };

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs */}
            <motion.div
                className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <div className="container-section relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    {/* Premium Badge */}
                    <div className="flex justify-center md:justify-start mb-8">
                        <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-frost rounded-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <IoGridOutline className="w-4 h-4" />
                            FiveM Resources
                        </motion.span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-6">
                        <span className="text-color-text">FiveM </span>
                        <span className="animated-gradient-text text-shadow-glow">Scripts</span>
                    </h1>
                    <p className="text-color-text-muted text-center md:text-left max-w-3xl text-lg md:text-xl leading-relaxed">
                        Premium scripts for your FiveM roleplay server. Browse my collection of high-quality scripts
                        compatible with ESX and QBCore frameworks.
                    </p>
                </motion.div>

                {/* Desktop controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="hidden md:flex justify-between items-center mb-10 gap-4"
                >
                    {/* Filter dropdown */}
                    <DropdownMenu.Root open={filterOpen} onOpenChange={setFilterOpen}>
                        <DropdownMenu.Trigger asChild>
                            <button className="px-4 py-2 rounded-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 text-sm flex items-center gap-2 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all focus:outline-none">
                                <IoFilterOutline className="w-4 h-4" />
                                <span>{filter === 'All' ? 'All Scripts' : filter}</span>
                                <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }} />
                            </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content
                                className="z-50 min-w-[180px] p-2 bg-card border border-color-border shadow-lg rounded-lg animate-in fade-in-80 slide-in-from-top-5"
                                align="start"
                                sideOffset={5}
                            >
                                <DropdownMenu.Label className="text-xs font-semibold uppercase tracking-wider text-color-text-muted px-2 py-1.5">
                                    Filter Options
                                </DropdownMenu.Label>
                                <DropdownMenu.Item
                                    className={`text-sm px-3 py-2 rounded-md cursor-pointer outline-none
                                        ${filter === 'All'
                                            ? 'bg-primary-800/20 text-primary-300 font-medium'
                                            : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                        }`}
                                    onClick={() => setFilter('All')}
                                >
                                    All Scripts
                                    {filter === 'All' && <span className="ml-2 text-xs">✓</span>}
                                </DropdownMenu.Item>

                                <DropdownMenu.Separator className="h-px bg-color-border my-1" />
                                <DropdownMenu.Label className="text-xs font-semibold uppercase tracking-wider text-color-text-muted px-2 py-1.5">
                                    By Framework
                                </DropdownMenu.Label>

                                {frameworks.map(framework => (
                                    <DropdownMenu.Item
                                        key={framework}
                                        className={`text-sm px-3 py-2 rounded-md cursor-pointer outline-none
                                            ${filter === framework as Filter
                                                ? 'bg-primary-800/20 text-primary-300 font-medium'
                                                : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                            }`}
                                        onClick={() => setFilter(framework as Filter)}
                                    >
                                        {framework}
                                        {filter === framework && <span className="ml-2 text-xs">✓</span>}
                                    </DropdownMenu.Item>
                                ))}

                                <DropdownMenu.Separator className="h-px bg-color-border my-1" />
                                <DropdownMenu.Label className="text-xs font-semibold uppercase tracking-wider text-color-text-muted px-2 py-1.5">
                                    By Status
                                </DropdownMenu.Label>

                                {statuses.map(status => (
                                    <DropdownMenu.Item
                                        key={status}
                                        className={`text-sm px-3 py-2 rounded-md cursor-pointer outline-none
                                            ${filter === status as Filter
                                                ? 'bg-primary-800/20 text-primary-300 font-medium'
                                                : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'
                                            }`}
                                        onClick={() => setFilter(status as Filter)}
                                    >
                                        {status}
                                        {filter === status && <span className="ml-2 text-xs">✓</span>}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                    <div className="flex items-center gap-3">
                        {/* Search button and input */}
                        <div className="relative flex items-center">
                            {isSearching && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="flex items-center"
                                >
                                    <input
                                        id="script-search"
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search scripts..."
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
                                    aria-label="Search scripts"
                                >
                                    <IoSearch className="w-4 h-4" />
                                    <span>Search</span>
                                </motion.button>
                            )}
                        </div>

                        {/* Sort dropdown */}
                        <DropdownMenu.Root open={sortOpen} onOpenChange={setSortOpen}>
                            <DropdownMenu.Trigger asChild>
                                <button className="px-4 py-2 rounded-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 text-sm flex items-center gap-2 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all focus:outline-none">
                                    <IoSwapVertical className="w-4 h-4" />
                                    <span>{getSortOptionText(sortBy)}</span>
                                    <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none' }} />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                                className="z-50 min-w-[200px] p-1 bg-card border border-color-border shadow-lg rounded-lg overflow-hidden animate-in fade-in-80 slide-in-from-top-5"
                                align="end"
                                sideOffset={5}
                            >
                                <DropdownMenu.Item
                                    className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'date-desc' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                    onClick={() => setSortBy('date-desc')}
                                >
                                    <div className="flex items-center">
                                        <IoCalendarOutline className="w-4 h-4 mr-2" />
                                        Newest first
                                        {sortBy === 'date-desc' && <span className="ml-2 text-xs">✓</span>}
                                    </div>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'date-asc' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                    onClick={() => setSortBy('date-asc')}
                                >
                                    <div className="flex items-center">
                                        <IoCalendarOutline className="w-4 h-4 mr-2" />
                                        Oldest first
                                        {sortBy === 'date-asc' && <span className="ml-2 text-xs">✓</span>}
                                    </div>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'alphabetical' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                    onClick={() => setSortBy('alphabetical')}
                                >
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs font-bold">A</span>
                                        Alphabetical (A-Z)
                                        {sortBy === 'alphabetical' && <span className="ml-2 text-xs">✓</span>}
                                    </div>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'price-asc' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                    onClick={() => setSortBy('price-asc')}
                                >
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs font-bold">$</span>
                                        Price: Low to High
                                        {sortBy === 'price-asc' && <span className="ml-2 text-xs">✓</span>}
                                    </div>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className={`text-sm px-3 py-2 cursor-pointer rounded-md outline-none ${sortBy === 'price-desc' ? 'bg-primary-800/20 text-primary-300 font-medium' : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                    onClick={() => setSortBy('price-desc')}
                                >
                                    <div className="flex items-center">
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs font-bold">$</span>
                                        Price: High to Low
                                        {sortBy === 'price-desc' && <span className="ml-2 text-xs">✓</span>}
                                    </div>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>

                        {/* View mode toggle */}
                        <div className="flex items-center bg-card border border-color-border rounded-lg overflow-hidden">
                            <button
                                className={`p-2 ${viewMode === 'grid'
                                    ? 'bg-primary-900/20 text-primary-300'
                                    : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                onClick={() => setViewMode('grid')}
                                aria-label="Grid view"
                            >
                                <IoGridOutline className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2 ${viewMode === 'list'
                                    ? 'bg-primary-900/20 text-primary-300'
                                    : 'text-color-text-muted hover:bg-card-alt hover:text-color-text'}`}
                                onClick={() => setViewMode('list')}
                                aria-label="List view"
                            >
                                <IoListOutline className="w-5 h-5" />
                            </button>
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
                                onClick={() => setViewMode('grid')}
                                className={`p-2 flex items-center justify-center transition-colors ${viewMode === 'grid'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="Grid view"
                            >
                                <IoGridOutline className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 flex items-center justify-center transition-colors ${viewMode === 'list'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="Table view"
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
                            placeholder="Search scripts..."
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

                    {/* Mobile filter buttons */}
                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-2 min-w-max">
                            <button
                                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${filter === 'All'
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                    }`}
                                onClick={() => setFilter('All')}
                            >
                                All Scripts
                            </button>
                            {frameworks.map(framework => (
                                <button
                                    key={framework}
                                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${filter === framework as Filter
                                        ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                        : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                        }`}
                                    onClick={() => setFilter(framework as Filter)}
                                >
                                    {framework}
                                </button>
                            ))}
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${filter === status as Filter
                                        ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                        : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                        }`}
                                    onClick={() => setFilter(status as Filter)}
                                >
                                    {status}
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
                        <div className="flex gap-2 overflow-x-auto pb-1">
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
                                onClick={() => setSortBy('alphabetical')}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${sortBy === 'alphabetical'
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border'
                                    }`}
                            >
                                A-Z
                            </button>
                            <button
                                onClick={() => setSortBy('price-asc')}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${sortBy === 'price-asc'
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border'
                                    }`}
                            >
                                $ Low-High
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search result summary */}
                {debouncedSearchQuery && (
                    <div className="mb-6 p-3 bg-card border border-color-border rounded-lg flex justify-between items-center">
                        <p className="text-color-text-muted text-sm">
                            Found <span className="text-primary-300 font-medium">{filteredScripts.length}</span> result{filteredScripts.length !== 1 ? 's' : ''} for "<span className="text-color-text font-medium">{debouncedSearchQuery}</span>"
                            {filter !== 'All' && (
                                <> with filter <span className="text-primary-300 font-medium">{filter}</span></>
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

                {filteredScripts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-card border border-color-border rounded-xl p-8 text-center"
                    >
                        <h3 className="text-xl font-semibold mb-2">No scripts found</h3>
                        <p className="text-color-text-muted mb-6">
                            {debouncedSearchQuery
                                ? "No scripts match your search query. Try different search terms or clear your search."
                                : "No scripts match your current filter. Try selecting a different filter."}
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
                            {filter !== 'All' && (
                                <button
                                    onClick={() => setFilter('All')}
                                    className="btn-secondary text-sm py-2"
                                >
                                    Show All Scripts
                                </button>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        {viewMode === 'grid' ? (
                            // Grid layout
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredScripts.map((script, index) => (
                                    <ScriptGridCard
                                        key={script.id}
                                        script={script}
                                        index={index}
                                        isHovered={hoveredScript === script.id}
                                        onHover={setHoveredScript}
                                        searchQuery={debouncedSearchQuery}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            // Table/List layout
                            <motion.div
                                key="table"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-4"
                            >
                                {filteredScripts.map((script, index) => (
                                    <ScriptListItem
                                        key={script.id}
                                        script={script}
                                        index={index}
                                        isHovered={hoveredScript === script.id}
                                        onHover={setHoveredScript}
                                        searchQuery={debouncedSearchQuery}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </section>
    );
}

interface ScriptCardProps {
    script: FivemScript;
    index: number;
    isHovered: boolean;
    onHover: (id: string | null) => void;
    searchQuery: string;
}

function ScriptGridCard({ script, index, isHovered, onHover }: ScriptCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="h-full"
            onMouseEnter={() => onHover(script.id)}
            onMouseLeave={() => onHover(null)}
        >
            <Link href={`/fivem/${script.links.slug}`} className="block h-full">
                <div className="relative h-full overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 group hover:shadow-lg hover:shadow-primary-900/10">
                    {/* Top gradient accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4 z-20">
                        <StatusBadge status={script.status} />
                    </div>

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={script.images[0] || '/projects/fivem/placeholder.jpg'}
                            alt={script.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                        {/* Framework badges */}
                        <div className="flex gap-2 mb-4">
                            <FrameworkBadge framework={script.framework} />
                        </div>

                        {/* Title with hover effect */}
                        <motion.h3
                            className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors mb-2"
                            animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {script.title}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-color-text-muted mb-4 line-clamp-2">
                            {script.description}
                        </p>

                        {/* Price and version info */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-primary-300 font-semibold">
                                {script.price}
                            </div>
                            <div className="text-xs text-color-text-muted">
                                v{script.version}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                            {script.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                    {tag}
                                </span>
                            ))}
                            {script.tags.length > 3 && (
                                <span className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                    +{script.tags.length - 3}
                                </span>
                            )}
                        </div>

                        {/* View details link */}
                        <motion.div
                            className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-sm font-medium"
                            animate={isHovered ? { x: 3 } : { x: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>View details</span>
                            <IoArrowForward className={`w-3.5 h-3.5 transition-all duration-300 ${isHovered ? 'translate-x-0.5 opacity-100' : 'opacity-80'}`} />
                        </motion.div>
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

function ScriptListItem({ script, index, isHovered, onHover }: ScriptCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group"
            onMouseEnter={() => onHover(script.id)}
            onMouseLeave={() => onHover(null)}
        >
            <Link href={`/fivem/${script.links.slug}`}>
                <div className="relative overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/10 group-hover:border-primary-700/30">
                    {/* Top gradient accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                    <div className="flex flex-col md:flex-row">
                        {/* Image (only shown on md screens and up) */}
                        <div className="relative md:w-64 h-40 md:h-auto overflow-hidden">
                            <Image
                                src={script.images[0] || '/projects/fivem/placeholder.jpg'}
                                alt={script.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 256px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card opacity-0 md:opacity-80"></div>

                            {/* Status badge (mobile position) */}
                            <div className="absolute top-4 right-4 md:hidden">
                                <StatusBadge status={script.status} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 relative">
                            <div className="flex flex-wrap justify-between items-start mb-2">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <FrameworkBadge framework={script.framework} />

                                    {/* Status badge (desktop position) */}
                                    <div className="hidden md:block">
                                        <StatusBadge status={script.status} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-primary-300 font-semibold">
                                        {script.price}
                                    </div>
                                    <div className="text-xs text-color-text-muted bg-primary-900/30 px-2 py-1 rounded-full">
                                        v{script.version}
                                    </div>
                                </div>
                            </div>

                            {/* Title with hover animation */}
                            <motion.h3
                                className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors mb-2"
                                animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {script.title}
                            </motion.h3>

                            {/* Description */}
                            <p className="text-color-text-muted mb-4 line-clamp-2">
                                {script.description}
                            </p>

                            <div className="flex flex-wrap justify-between items-center">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                    {script.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                    {script.tags.length > 3 && (
                                        <span className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                            +{script.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* View details link */}
                                <motion.div
                                    className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1 text-sm font-medium mt-2 sm:mt-0"
                                    animate={isHovered ? { x: 3 } : { x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span>View details</span>
                                    <IoArrowForward className={`w-3.5 h-3.5 transition-all duration-300 ${isHovered ? 'translate-x-0.5 opacity-100' : 'opacity-80'}`} />
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

function StatusBadge({ status }: { status: FivemScript['status'] }) {
    let bgColor = 'bg-primary-900/30';
    let textColor = 'text-primary-300';
    let borderColor = 'border-primary-700/30';

    if (status === 'Released') {
        bgColor = 'bg-green-900/30';
        textColor = 'text-green-300';
        borderColor = 'border-green-700/30';
    } else if (status === 'In Development') {
        bgColor = 'bg-amber-900/30';
        textColor = 'text-amber-300';
        borderColor = 'border-amber-700/30';
    } else if (status === 'Coming Soon') {
        bgColor = 'bg-purple-900/30';
        textColor = 'text-purple-300';
        borderColor = 'border-purple-700/30';
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${borderColor} border`}>
            {status}
        </span>
    );
}

function FrameworkBadge({ framework }: { framework: FivemScript['framework'] }) {
    if (framework === 'Both') {
        return (
            <>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-700/30">
                    ESX
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-700/30">
                    QBCore
                </span>
            </>
        );
    }

    let bgColor = 'bg-primary-900/30';
    let textColor = 'text-primary-300';
    let borderColor = 'border-primary-700/30';

    if (framework === 'ESX') {
        bgColor = 'bg-blue-900/30';
        textColor = 'text-blue-300';
        borderColor = 'border-blue-700/30';
    } else if (framework === 'QBCore') {
        bgColor = 'bg-green-900/30';
        textColor = 'text-green-300';
        borderColor = 'border-green-700/30';
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${borderColor} border`}>
            {framework}
        </span>
    );
}
