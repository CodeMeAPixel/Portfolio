"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import {
    IoSearch, IoClose, IoGridOutline, IoListOutline, IoSwapVertical,
    IoChevronDown, IoBookmarkOutline, IoCalendarOutline, IoSparkles
} from 'react-icons/io5';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ComingSoon from '@/components/ui/ComingSoon';
import ProjectCard, { ProjectCardCompact } from './ProjectCard';

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
    const [activeFilter, setActiveFilter] = useState('All');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');

    const filterTags = ['All', ...allTags];

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

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

    if (projects.length === 0 && showComingSoonIfEmpty) {
        return (
            <ComingSoon
                title="Projects Coming Soon"
                description="I'm currently working on adding my projects to this portfolio. Check back soon to see my work!"
                completionPercentage={30}
                customBackLink={{ href: "/", label: "Back to Homepage" }}
                showNotification={false}
            />
        );
    }

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (!isSearching) {
            setTimeout(() => {
                const searchInput = document.getElementById('project-search');
                if (searchInput) searchInput.focus();
            }, 100);
        } else {
            setSearchQuery('');
        }
    };

    const getSortOptionText = (option: SortOption): string => {
        switch (option) {
            case 'date-desc': return 'Newest first';
            case 'date-asc': return 'Oldest first';
            case 'alphabetical': return 'A-Z';
            default: return 'Sort';
        }
    };

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Floating orbs */}
            <motion.div
                className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <div className="container-section relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-14"
                >
                    <div>
                        <div className="flex justify-center md:justify-start mb-8">
                            <motion.span
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-ultra rounded-full border border-primary-500/20 shadow-lg shadow-primary-500/10 shine-sweep"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500/30 to-accent-500/30">
                                    <IoSparkles className="w-4 h-4" />
                                </div>
                                Portfolio Showcase
                            </motion.span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-4">
                            <span className="text-color-text">My </span>
                            <span className="animated-gradient-text text-shadow-glow">Projects</span>
                        </h1>
                        <p className="text-color-text-muted text-center md:text-left text-lg md:text-xl max-w-xl">
                            <span className="text-primary-400 font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''} showcasing my skills and experience
                        </p>
                    </div>

                    {/* Desktop Controls */}
                    <div className="flex gap-3 mt-8 md:mt-0 justify-center md:justify-end items-center flex-wrap">
                        {/* Layout switcher */}
                        <div className="hidden md:flex rounded-xl overflow-hidden glass-frost border border-white/10 p-1 gap-1">
                            <button
                                onClick={() => setLayout('grid')}
                                className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 ${layout === 'grid'
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-color-text-muted hover:bg-white/10 hover:text-primary-300'
                                    }`}
                                aria-label="Grid view"
                            >
                                <IoGridOutline className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setLayout('table')}
                                className={`p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 ${layout === 'table'
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-color-text-muted hover:bg-white/10 hover:text-primary-300'
                                    }`}
                                aria-label="Table view"
                            >
                                <IoListOutline className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Sort dropdown */}
                        <div className="hidden md:block">
                            <DropdownMenu.Root open={sortOpen} onOpenChange={setSortOpen}>
                                <DropdownMenu.Trigger asChild>
                                    <button className="px-4 py-2.5 rounded-xl glass-frost border border-white/10 text-color-text text-sm flex items-center gap-2 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 focus:outline-none">
                                        <IoSwapVertical className="w-4 h-4 text-primary-400" />
                                        <span>{getSortOptionText(sortBy)}</span>
                                        <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none' }} />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    className="z-50 min-w-[200px] p-2 glass-ultra border border-white/10 shadow-2xl shadow-black/40 rounded-xl overflow-hidden animate-in fade-in-80 slide-in-from-top-5"
                                    align="end"
                                    sideOffset={5}
                                >
                                    {(['date-desc', 'date-asc', 'alphabetical'] as SortOption[]).map((option) => (
                                        <DropdownMenu.Item
                                            key={option}
                                            className={`text-sm px-3 py-2.5 cursor-pointer rounded-lg outline-none transition-all duration-200 ${sortBy === option ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 font-medium border border-primary-500/20' : 'text-color-text-muted hover:bg-white/10 hover:text-color-text'}`}
                                            onClick={() => setSortBy(option)}
                                        >
                                            <div className="flex items-center">
                                                <IoCalendarOutline className="w-4 h-4 mr-2" />
                                                {getSortOptionText(option)}
                                                {sortBy === option && <span className="ml-auto text-primary-400">✓</span>}
                                            </div>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>

                        {/* Search */}
                        <div className="hidden md:flex relative items-center">
                            {isSearching ? (
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
                                        className="w-[220px] px-4 py-2.5 rounded-l-xl glass-frost border border-r-0 border-white/10 text-color-text placeholder:text-color-text-muted/70 text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 outline-none transition-all duration-300"
                                        onKeyDown={(e) => e.key === 'Escape' && toggleSearch()}
                                    />
                                    <button
                                        onClick={toggleSearch}
                                        className="px-3 py-2.5 rounded-r-xl glass-frost border border-l-0 border-white/10 text-primary-300 hover:bg-white/10 hover:text-primary-200 transition-all duration-300"
                                        aria-label="Close search"
                                    >
                                        <IoClose className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    onClick={toggleSearch}
                                    className="px-4 py-2.5 rounded-xl glass-frost border border-white/10 text-primary-300 text-sm flex items-center gap-2 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 focus:outline-none"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    aria-label="Search projects"
                                >
                                    <IoSearch className="w-4 h-4" />
                                    <span className="hidden sm:inline">Search</span>
                                </motion.button>
                            )}
                        </div>

                        {/* Filter dropdown */}
                        <div className={`hidden md:block ${isSearching ? 'md:hidden' : ''}`}>
                            <DropdownMenu.Root open={filterOpen} onOpenChange={setFilterOpen}>
                                <DropdownMenu.Trigger asChild>
                                    <button className="relative px-4 py-2.5 rounded-xl glass-frost border border-white/10 text-primary-300 text-sm flex items-center gap-2 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 focus:outline-none">
                                        <IoBookmarkOutline className="w-4 h-4" />
                                        <span className="hidden sm:inline">{activeFilter === 'All' ? 'All technologies' : activeFilter}</span>
                                        <span className="sm:hidden">Filter</span>
                                        <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }} />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    className="z-50 min-w-[200px] max-h-[300px] overflow-y-auto p-2 glass-ultra border border-white/10 shadow-2xl shadow-black/40 rounded-xl animate-in fade-in-80 slide-in-from-top-5"
                                    align="end"
                                    sideOffset={5}
                                >
                                    {filterTags.map(tag => (
                                        <DropdownMenu.Item
                                            key={tag}
                                            className={`text-sm px-3 py-2.5 cursor-pointer rounded-lg outline-none transition-all duration-200 ${activeFilter === tag
                                                ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 font-medium border border-primary-500/20'
                                                : 'text-color-text-muted hover:bg-white/10 hover:text-color-text'
                                                }`}
                                            onClick={() => { setActiveFilter(tag); setFilterOpen(false); }}
                                        >
                                            <span className="flex items-center justify-between">
                                                {tag}
                                                {activeFilter === tag && <span className="text-primary-400">✓</span>}
                                            </span>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile Controls */}
                <div className="flex flex-col gap-4 mb-8 md:hidden">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-color-text-muted">View:</span>
                        <div className="flex rounded-xl overflow-hidden glass-frost border border-white/10 p-1 gap-1">
                            <button
                                onClick={() => setLayout('grid')}
                                className={`p-2 rounded-lg transition-all duration-300 ${layout === 'grid'
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-color-text-muted hover:bg-white/10 hover:text-primary-300'
                                    }`}
                            >
                                <IoGridOutline className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setLayout('table')}
                                className={`p-2 rounded-lg transition-all duration-300 ${layout === 'table'
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-color-text-muted hover:bg-white/10 hover:text-primary-300'
                                    }`}
                            >
                                <IoListOutline className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400">
                            <IoSearch className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-11 pr-10 py-3 rounded-xl glass-frost border border-white/10 text-color-text placeholder:text-color-text-muted/70 text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 outline-none transition-all duration-300"
                            onKeyDown={(e) => e.key === 'Escape' && setSearchQuery('')}
                        />
                        {searchQuery && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-color-text-muted hover:text-primary-400 transition-colors"
                                onClick={() => setSearchQuery('')}
                            >
                                <IoClose className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto pb-2 -mx-4 px-4">
                        <div className="flex gap-2 min-w-max">
                            {filterTags.map(tag => (
                                <button
                                    key={tag}
                                    className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-all duration-300 ${activeFilter === tag
                                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/30 shadow-lg shadow-primary-500/10'
                                        : 'glass-frost text-color-text-muted border border-white/10 hover:bg-white/10 hover:text-primary-300'
                                        }`}
                                    onClick={() => setActiveFilter(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-color-text-muted">
                            <IoSwapVertical className="w-4 h-4 text-primary-400" />
                            <span>Sort:</span>
                        </div>
                        <div className="flex gap-2">
                            {(['date-desc', 'date-asc', 'alphabetical'] as SortOption[]).map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${sortBy === option
                                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/30'
                                        : 'glass-frost text-color-text-muted border border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    {option === 'date-desc' ? 'Newest' : option === 'date-asc' ? 'Oldest' : 'A-Z'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search Results Summary */}
                {debouncedSearchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 glass-ultra rounded-xl border border-white/10 flex justify-between items-center"
                    >
                        <p className="text-color-text-muted text-sm">
                            Found <span className="text-primary-300 font-semibold">{filteredProjects.length}</span> result{filteredProjects.length !== 1 ? 's' : ''} for &quot;<span className="text-color-text font-medium">{debouncedSearchQuery}</span>&quot;
                            {activeFilter !== 'All' && <> in <span className="text-primary-300 font-semibold">{activeFilter}</span></>}
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="p-2 rounded-lg glass-frost text-color-text-muted hover:text-primary-400 hover:bg-white/10 transition-all duration-300"
                        >
                            <IoClose className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Projects Grid/List */}
                {filteredProjects.length > 0 ? (
                    <AnimatePresence mode="wait">
                        {layout === 'grid' ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        searchQuery={debouncedSearchQuery}
                                        onHover={setHoveredProject}
                                        isHovered={hoveredProject === project.id}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="table"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-5"
                            >
                                {filteredProjects.map((project, index) => (
                                    <ProjectCardCompact
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        searchQuery={debouncedSearchQuery}
                                        onHover={setHoveredProject}
                                        isHovered={hoveredProject === project.id}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center p-12 glass-ultra border border-white/10 rounded-2xl shine-sweep"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                            <IoSearch className="w-8 h-8 text-primary-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 animated-gradient-text">
                            No projects found
                        </h3>
                        <p className="text-color-text-muted mb-8 max-w-md mx-auto">
                            {debouncedSearchQuery
                                ? `No results for "${debouncedSearchQuery}". Try different search terms or clear your search.`
                                : "No projects match the selected filter. Try a different category."}
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {debouncedSearchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-3 rounded-xl glass-frost border border-white/10 text-color-text hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 flex items-center gap-2"
                                >
                                    <IoClose className="w-4 h-4" />
                                    Clear Search
                                </button>
                            )}
                            {activeFilter !== 'All' && (
                                <button
                                    onClick={() => setActiveFilter('All')}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] transition-all duration-300"
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
