"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/types/project';
import {
    IoArrowForward, IoBookmarkOutline, IoChevronDown, IoSearch, IoClose,
    IoGridOutline, IoListOutline, IoTimeOutline, IoCalendarOutline, IoSwapVertical,
    IoGlobeOutline
} from 'react-icons/io5';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import ComingSoon from '@/components/ui/ComingSoon';
import { TechIcon } from '../ui/TechIcon';
import { format } from 'date-fns';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

type LayoutType = 'grid' | 'table';
type SortOption = 'date-desc' | 'date-asc' | 'alphabetical';

interface ProjectsContentProps {
    projects: Project[];
    allTags: string[];
    showComingSoonIfEmpty?: boolean;
}

export default function ProjectsContent({
    projects,
    allTags,
    showComingSoonIfEmpty = true
}: ProjectsContentProps) {
    // State for filtering and display
    const [activeFilter, setActiveFilter] = useState('All');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');

    // Add "All" to the tags list
    const filterTags = ['All', ...allTags];

    // Debounce search query to prevent excessive filtering during typing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Filter projects based on selected tag and search query
    const filteredProjects = projects
        .filter(project => activeFilter === 'All' || project.tags.includes(activeFilter))
        .filter(project => {
            if (!debouncedSearchQuery) return true;

            const query = debouncedSearchQuery.toLowerCase();
            return (
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.tags.some(tag => tag.toLowerCase().includes(query)) ||
                (project.longDescription && project.longDescription.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => {
            // Sort by selected sort option
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
                case 'date-asc':
                    return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
                case 'alphabetical':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    // If we have no projects and showComingSoonIfEmpty is true, show the coming soon component
    if (projects.length === 0 && showComingSoonIfEmpty) {
        return (
            <ComingSoon
                title="Projects Coming Soon"
                description="I'm currently working on adding my projects to this portfolio. Check back soon to see my work!"
                completionPercentage={30}
                customBackLink={{
                    href: "/",
                    label: "Back to Homepage"
                }}
                showNotification={false}
            />
        );
    }

    // Toggle search input visibility
    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (!isSearching) {
            // Focus the search input when it becomes visible
            setTimeout(() => {
                const searchInput = document.getElementById('project-search');
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
            <BackgroundEffects />

            <div className="container-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12"
                >
                    <div>
                        <h1 className="heading-primary text-center md:text-left mb-2">
                            My Projects
                        </h1>
                        <p className="text-color-text-muted text-center md:text-left">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} showcasing my skills and experience
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
                                onClick={() => setLayout('table')}
                                className={`p-2 flex items-center justify-center transition-colors ${layout === 'table'
                                    ? 'bg-primary-800/40 text-primary-300'
                                    : 'bg-primary-800/20 text-primary-400/70 hover:bg-primary-800/30 hover:text-primary-300'
                                    }`}
                                aria-label="Table view"
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
                                        id="project-search"
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search projects..."
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
                                    aria-label="Search projects"
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
                                        <span className="hidden sm:inline">{activeFilter === 'All' ? 'All technologies' : activeFilter}</span>
                                        <span className="sm:hidden">Filter</span>
                                        <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }} />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    className="z-50 min-w-[180px] p-1 bg-card border border-color-border shadow-lg rounded-lg overflow-hidden animate-in fade-in-80 slide-in-from-top-5"
                                    align="end"
                                    sideOffset={5}
                                >
                                    {filterTags.map(tag => (
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
                                onClick={() => setLayout('table')}
                                className={`p-2 flex items-center justify-center transition-colors ${layout === 'table'
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
                            placeholder="Search projects..."
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

                    {/* Mobile tag filter */}
                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-2 min-w-max">
                            {filterTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${activeFilter === tag
                                        ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                        : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                        }`}
                                    onClick={() => setActiveFilter(tag)}
                                >
                                    {tag}
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
                            Found <span className="text-primary-300 font-medium">{filteredProjects.length}</span> result{filteredProjects.length !== 1 ? 's' : ''} for "<span className="text-color-text font-medium">{debouncedSearchQuery}</span>"
                            {activeFilter !== 'All' && (
                                <> with tag <span className="text-primary-300 font-medium">{activeFilter}</span></>
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

                {filteredProjects.length > 0 ? (
                    <AnimatePresence mode="wait">
                        {layout === 'grid' ? (
                            // Grid layout
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="h-full"
                                        onMouseEnter={() => setHoveredProject(project.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <div className="relative h-full overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 group hover:shadow-lg hover:shadow-primary-900/10">
                                            {/* Top gradient accent bar */}
                                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                                            <div className="overflow-hidden">
                                                {/* Image carousel */}
                                                <div className="h-72 relative overflow-hidden border-b border-color-border">
                                                    <ImageCarousel
                                                        images={project.images}
                                                        className="w-full h-full"
                                                    />
                                                    {project.date && (
                                                        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-color-border px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center">
                                                            <IoTimeOutline className="mr-1 w-3.5 h-3.5" />
                                                            {format(new Date(project.date), 'MMM yyyy')}
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80 pointer-events-none"></div>
                                                </div>
                                            </div>

                                            {/* Content section */}
                                            <div className="p-7 relative">
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {project.tags.slice(0, 4).map(tag => (
                                                        <span
                                                            key={tag}
                                                            className={`tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors ${debouncedSearchQuery && tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                                                                ? 'bg-primary-800/60 border-primary-600/60 text-primary-200'
                                                                : ''
                                                                }`}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {project.tags.length > 4 && (
                                                        <span className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                                            +{project.tags.length - 4}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title with hover effect */}
                                                <Link href={`/projects/${project.id}`} className="block mb-4">
                                                    <motion.h2
                                                        className="text-2xl font-bold text-color-text group-hover:text-primary-300 transition-colors leading-tight"
                                                        animate={hoveredProject === project.id ? { scale: 1.01 } : { scale: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        {highlightMatchedText(project.title, debouncedSearchQuery)}
                                                    </motion.h2>
                                                </Link>

                                                {/* Description */}
                                                <p className="text-color-text-muted mb-8 line-clamp-3 text-base leading-relaxed">
                                                    {highlightMatchedText(project.description, debouncedSearchQuery)}
                                                </p>

                                                {/* View Project Button */}
                                                <motion.div
                                                    className="flex justify-end mt-auto"
                                                    animate={hoveredProject === project.id ? { x: 3 } : { x: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Link
                                                        href={`/projects/${project.id}`}
                                                        className="flex items-center gap-1.5 text-primary-400 font-medium transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-lg bg-primary-900/20 border border-primary-800/30 hover:bg-primary-800/30 hover:border-primary-700/40"
                                                    >
                                                        View Project
                                                        <IoArrowForward className={`w-4 h-4 transition-all duration-300 ${hoveredProject === project.id ? 'translate-x-1' : ''}`} />
                                                    </Link>
                                                </motion.div>
                                            </div>

                                            {/* Subtle hover glow effect */}
                                            <div
                                                className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                                                style={{
                                                    boxShadow: 'inset 0 0 20px rgba(var(--color-primary-500), 0.1)'
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            // Table layout
                            <motion.div
                                key="table"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-4"
                            >
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="group"
                                        onMouseEnter={() => setHoveredProject(project.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <div className="relative overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/10 group-hover:border-primary-700/30">
                                            {/* Top gradient accent bar */}
                                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                                            <div className="flex flex-col sm:flex-row">
                                                {/* Project thumbnail */}
                                                <div className="sm:w-48 h-48 sm:h-auto overflow-hidden relative border-b sm:border-b-0 sm:border-r border-color-border">
                                                    <div className="w-full h-full">
                                                        <img
                                                            src={project.images[0]}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                                </div>

                                                {/* Project content */}
                                                <div className="flex-1 p-6 flex flex-col justify-between">
                                                    <div>
                                                        {/* Title and date */}
                                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                                            <Link href={`/projects/${project.id}`} className="block">
                                                                <motion.h2
                                                                    className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors"
                                                                    animate={hoveredProject === project.id ? { scale: 1.01 } : { scale: 1 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    {highlightMatchedText(project.title, debouncedSearchQuery)}
                                                                </motion.h2>
                                                            </Link>
                                                            {project.date && (
                                                                <div className="text-xs text-color-text-muted flex items-center whitespace-nowrap">
                                                                    <IoTimeOutline className="mr-1 w-3.5 h-3.5" />
                                                                    {format(new Date(project.date), 'MMMM yyyy')}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Description */}
                                                        <p className="text-color-text-muted mb-4 line-clamp-2 text-sm leading-relaxed">
                                                            {highlightMatchedText(project.description, debouncedSearchQuery)}
                                                        </p>

                                                        {/* Tags */}
                                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                                            {project.tags.map(tag => (
                                                                <span
                                                                    key={tag}
                                                                    className={`px-2 py-0.5 rounded-full text-xs bg-primary-900/30 border border-primary-700/30 group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors ${debouncedSearchQuery && tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                                                                        ? 'bg-primary-800/60 border-primary-600/60 text-primary-200'
                                                                        : 'text-primary-300'
                                                                        }`}
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Links */}
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex gap-3">
                                                            {project.links?.github && (
                                                                <a
                                                                    href={project.links.github}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-color-text-muted hover:text-primary-400 transition-colors"
                                                                    aria-label="GitHub repository"
                                                                >
                                                                    <TechIcon name="github" size={18} />
                                                                </a>
                                                            )}
                                                            {project.links?.demo && (
                                                                <a
                                                                    href={project.links.demo}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-color-text-muted hover:text-primary-400 transition-colors"
                                                                    aria-label="Live demo"
                                                                >
                                                                    <IoGlobeOutline className="w-[18px] h-[18px]" />
                                                                </a>
                                                            )}
                                                        </div>

                                                        <motion.div
                                                            animate={hoveredProject === project.id ? { x: 3 } : { x: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <Link
                                                                href={`/projects/${project.id}`}
                                                                className="text-sm text-primary-400 font-medium flex items-center gap-1 group-hover:text-primary-300 transition-colors"
                                                            >
                                                                View Details
                                                                <IoArrowForward className={`w-3.5 h-3.5 transition-all duration-300 ${hoveredProject === project.id ? 'translate-x-0.5 opacity-100' : 'opacity-80'}`} />
                                                            </Link>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Subtle hover glow effect */}
                                            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                                                style={{
                                                    boxShadow: 'inset 0 0 20px rgba(var(--color-primary-500), 0.1)'
                                                }}
                                            />

                                            {/* Subtle corner decoration */}
                                            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                                                <div className="absolute top-0 right-0 w-8 h-8 bg-primary-500 rotate-45 translate-x-[10px] -translate-y-[10px]"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
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
                                ? `No projects found matching "${debouncedSearchQuery}"`
                                : "No projects found with this technology"}
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
                                    Show All Projects
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
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
