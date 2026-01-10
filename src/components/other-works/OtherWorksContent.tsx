"use client";

import { useState, useEffect } from 'react';
import type { GitHubRepo, GitHubRepoStats } from '@/types/github';
import {
    IoSearch, IoClose, IoGridOutline, IoListOutline, IoSwapVertical,
    IoChevronDown, IoStarOutline, IoGitBranchOutline, IoCodeSlashOutline,
    IoSparkles, IoCheckmarkCircleOutline, IoLogoGithub, IoTimeOutline,
    IoLinkOutline, IoEyeOutline, IoAlertCircleOutline, IoRefresh,
    IoOpenOutline, IoChevronBack, IoChevronForward
} from 'react-icons/io5';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type LayoutType = 'grid' | 'table';
type SortOption = 'updated' | 'stars' | 'forks' | 'alphabetical' | 'created';

// Language color mapping
const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Rust: '#dea584',
    Go: '#00ADD8',
    Java: '#b07219',
    'C#': '#178600',
    'C++': '#f34b7d',
    C: '#555555',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Vue: '#41b883',
    Lua: '#000080',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    MDX: '#fcb32c',
};

function getLanguageColor(language: string | null): string {
    if (!language) return '#6e7681';
    return languageColors[language] || '#6e7681';
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative glass-ultra rounded-2xl p-5 border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 shine-sweep overflow-hidden h-full flex flex-col"
        >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 flex-shrink-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <IoLogoGithub className="w-5 h-5 text-color-text-muted flex-shrink-0" />
                        <h3 className="font-bold text-color-text group-hover:text-primary-400 transition-colors truncate">
                            {repo.name}
                        </h3>
                    </div>
                    <IoOpenOutline className="w-4 h-4 text-color-text-muted group-hover:text-primary-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 ml-2" />
                </div>

                {/* Description */}
                <p className="text-sm text-color-text-muted line-clamp-2 mb-4 h-[2.5rem] flex-shrink-0">
                    {repo.description || 'No description provided'}
                </p>

                {/* Topics - Fixed height */}
                <div className="mb-4 h-[2rem] flex-shrink-0 overflow-hidden">
                    {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {repo.topics.slice(0, 3).map((topic) => (
                                <span
                                    key={topic}
                                    className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/20 whitespace-nowrap"
                                >
                                    {topic}
                                </span>
                            ))}
                            {repo.topics.length > 3 && (
                                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-color-text-muted whitespace-nowrap">
                                    +{repo.topics.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Spacer to push footer down */}
                <div className="flex-grow" />

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-color-text-muted mb-3 flex-shrink-0 border-t border-white/5 pt-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        {repo.language && (
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <span
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                                />
                                <span className="text-xs">{repo.language}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 whitespace-nowrap">
                            <IoStarOutline className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="text-xs">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1 whitespace-nowrap">
                            <IoGitBranchOutline className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="text-xs">{repo.forks_count}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] whitespace-nowrap ml-2 flex-shrink-0">
                        <IoTimeOutline className="w-3 h-3 flex-shrink-0" />
                        <span>{formatDate(repo.updated_at)}</span>
                    </div>
                </div>

                {/* Homepage link */}
                {repo.homepage && (
                    <div className="flex-shrink-0">
                        <span
                            className="inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 transition-colors truncate w-full"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(repo.homepage!, '_blank');
                            }}
                        >
                            <IoLinkOutline className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{repo.homepage.replace(/^https?:\/\//, '')}</span>
                        </span>
                    </div>
                )}
            </div>
        </a>
    );
}

function RepoRow({ repo }: { repo: GitHubRepo }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 glass-ultra rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 hover:bg-white/5"
        >
            <IoLogoGithub className="w-5 h-5 text-color-text-muted flex-shrink-0" />

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-color-text group-hover:text-primary-400 transition-colors truncate">
                        {repo.name}
                    </h3>
                    {repo.homepage && (
                        <span
                            className="text-primary-400 hover:text-primary-300"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(repo.homepage!, '_blank');
                            }}
                        >
                            <IoLinkOutline className="w-3.5 h-3.5" />
                        </span>
                    )}
                </div>
                <p className="text-xs text-color-text-muted truncate mt-0.5">
                    {repo.description || 'No description'}
                </p>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs text-color-text-muted flex-shrink-0">
                {repo.language && (
                    <div className="flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span>{repo.language}</span>
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <IoStarOutline className="w-3.5 h-3.5" />
                    <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                    <IoGitBranchOutline className="w-3.5 h-3.5" />
                    <span>{repo.forks_count}</span>
                </div>
                <span className="text-[10px]">{formatDate(repo.updated_at)}</span>
            </div>

            <IoOpenOutline className="w-4 h-4 text-color-text-muted group-hover:text-primary-400 transition-colors flex-shrink-0" />
        </a>
    );
}

export default function OtherWorksContent() {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [stats, setStats] = useState<GitHubRepoStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [layout, setLayout] = useState<LayoutType>('grid');
    const [sortBy, setSortBy] = useState<SortOption>('updated');
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [languageFilter, setLanguageFilter] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        fetchRepos();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        setCurrentPage(1);
    }, [languageFilter, sortBy, layout]);

    const fetchRepos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/github/repos');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setRepos(data.repos);
            setStats(data.stats);
        } catch {
            setError('Failed to load repositories. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const filteredRepos = repos
        .filter(repo => languageFilter === 'All' || repo.language === languageFilter)
        .filter(repo => {
            if (!debouncedSearchQuery) return true;
            const query = debouncedSearchQuery.toLowerCase();
            return (
                repo.name.toLowerCase().includes(query) ||
                (repo.description && repo.description.toLowerCase().includes(query)) ||
                repo.topics.some(topic => topic.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'updated':
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                case 'stars':
                    return b.stargazers_count - a.stargazers_count;
                case 'forks':
                    return b.forks_count - a.forks_count;
                case 'alphabetical':
                    return a.name.localeCompare(b.name);
                case 'created':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                default:
                    return 0;
            }
        });

    const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRepos = filteredRepos.slice(startIndex, endIndex);

    const getVisiblePages = () => {
        const pages = [];
        const showPages = 3; // Show 3 page numbers at a time
        const halfShow = Math.floor(showPages / 2);

        let start = Math.max(1, currentPage - halfShow);
        let end = Math.min(totalPages, start + showPages - 1);

        // Adjust start if we're near the end
        if (end - start + 1 < showPages) {
            start = Math.max(1, end - showPages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        if (!isSearching) {
            setTimeout(() => {
                const searchInput = document.getElementById('repo-search');
                if (searchInput) searchInput.focus();
            }, 100);
        } else {
            setSearchQuery('');
        }
    };

    const getSortOptionText = (option: SortOption): string => {
        switch (option) {
            case 'updated': return 'Recently updated';
            case 'stars': return 'Most stars';
            case 'forks': return 'Most forks';
            case 'alphabetical': return 'A-Z';
            case 'created': return 'Recently created';
            default: return 'Sort';
        }
    };

    const languages = stats?.languages || [];

    return (
        <section className="pt-20 pb-24 md:pt-24 md:pb-32 bg-bg relative overflow-hidden">
            {/* Premium background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Floating orbs */}
            <div
                className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px] animate-pulse"
            />
            <div
                className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px] animate-pulse"
                style={{ animationDelay: '2s' }}
            />

            <div className="container-section relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 animate-fade-up">
                    <div>
                        <div className="flex justify-center md:justify-start mb-8">
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-ultra rounded-full border border-primary-500/20 shadow-lg shadow-primary-500/10 shine-sweep animate-fade-in">
                                <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500/30 to-accent-500/30">
                                    <IoLogoGithub className="w-4 h-4" />
                                </div>
                                Open Source
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-4">
                            <span className="text-color-text">Other </span>
                            <span className="animated-gradient-text text-shadow-glow">Works</span>
                        </h1>
                        <p className="text-color-text-muted text-center md:text-left text-lg md:text-xl max-w-xl">
                            {loading ? (
                                <span>Loading repositories...</span>
                            ) : error ? (
                                <span className="text-red-400">{error}</span>
                            ) : (
                                <>
                                    <span className="text-primary-400 font-semibold">{filteredRepos.length}</span> public {filteredRepos.length !== 1 ? 'repositories' : 'repository'} on GitHub
                                </>
                            )}
                        </p>
                    </div>

                    {/* Desktop Controls */}
                    {!loading && !error && (
                        <div className="flex gap-3 mt-8 md:mt-0 justify-center md:justify-end items-center flex-wrap">
                            {/* Refresh button */}
                            <button
                                onClick={fetchRepos}
                                className="p-2.5 rounded-xl glass-frost border border-white/10 text-color-text-muted hover:text-primary-400 hover:bg-white/10 transition-all duration-300"
                                aria-label="Refresh"
                            >
                                <IoRefresh className="w-5 h-5" />
                            </button>

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
                                <DropdownMenu.Root open={sortOpen} onOpenChange={setSortOpen} modal={false}>
                                    <DropdownMenu.Trigger asChild>
                                        <button className="px-4 py-2.5 rounded-xl glass-frost border border-white/10 text-color-text text-sm flex items-center gap-2 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 focus:outline-none" type="button">
                                            <IoSwapVertical className="w-4 h-4 text-primary-400" />
                                            <span>{getSortOptionText(sortBy)}</span>
                                            <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none' }} />
                                        </button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                            className="dropdown-animate z-[200] min-w-[220px] p-2 bg-bg border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden"
                                            align="end"
                                            sideOffset={8}
                                        >
                                            {(['updated', 'stars', 'forks', 'created', 'alphabetical'] as SortOption[]).map((option) => (
                                                <DropdownMenu.Item
                                                    key={option}
                                                    className={`group text-sm px-4 py-3 cursor-pointer rounded-xl outline-none transition-all duration-300 flex items-center justify-between ${sortBy === option ? 'bg-primary-500/15 text-primary-300 font-semibold ring-1 ring-primary-500/20' : 'text-color-text-muted hover:bg-white/5 hover:text-color-text'}`}
                                                    onClick={() => setSortBy(option)}
                                                >
                                                    <span>{getSortOptionText(option)}</span>
                                                    {sortBy === option && <IoCheckmarkCircleOutline className="w-4 h-4 text-primary-400" />}
                                                </DropdownMenu.Item>
                                            ))}
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                            </div>

                            {/* Search */}
                            <div className="hidden md:flex relative items-center">
                                {isSearching ? (
                                    <div className="flex items-center animate-fade-in">
                                        <input
                                            id="repo-search"
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search repos..."
                                            className="w-[200px] px-4 py-2.5 rounded-l-xl glass-frost border border-r-0 border-white/10 text-color-text placeholder:text-color-text-muted/70 text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 outline-none transition-all duration-300"
                                            onKeyDown={(e) => e.key === 'Escape' && toggleSearch()}
                                        />
                                        <button
                                            onClick={toggleSearch}
                                            className="px-3 py-2.5 rounded-r-xl glass-frost border border-l-0 border-white/10 text-primary-300 hover:bg-white/10 hover:text-primary-200 transition-all duration-300"
                                            aria-label="Close search"
                                        >
                                            <IoClose className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={toggleSearch}
                                        className="px-4 py-2.5 rounded-xl glass-frost border border-white/10 text-primary-300 text-sm flex items-center gap-2 hover:bg-white/10 hover:border-primary-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none"
                                        aria-label="Search repos"
                                    >
                                        <IoSearch className="w-4 h-4" />
                                        <span className="hidden sm:inline">Search</span>
                                    </button>
                                )}
                            </div>

                            {/* Language filter */}
                            {languages.length > 0 && (
                                <div className="hidden md:block">
                                    <DropdownMenu.Root open={filterOpen} onOpenChange={setFilterOpen} modal={false}>
                                        <DropdownMenu.Trigger asChild>
                                            <button className="relative px-4 py-2.5 rounded-xl glass-frost border border-white/10 text-primary-300 text-sm flex items-center gap-2 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 focus:outline-none" type="button">
                                                <IoCodeSlashOutline className="w-4 h-4" />
                                                <span className="hidden sm:inline">{languageFilter === 'All' ? 'All languages' : languageFilter}</span>
                                                <span className="sm:hidden">Filter</span>
                                                <IoChevronDown className="w-3 h-3 ml-1 transition-transform duration-300" style={{ transform: filterOpen ? 'rotate(180deg)' : 'none' }} />
                                            </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.Content
                                                className="dropdown-animate z-[200] min-w-[220px] max-h-[300px] overflow-y-auto p-2 bg-bg border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl custom-scrollbar"
                                                align="end"
                                                sideOffset={8}
                                            >
                                                <DropdownMenu.Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-400 px-4 py-3">
                                                    Languages
                                                </DropdownMenu.Label>
                                                <DropdownMenu.Item
                                                    className={`group text-sm px-4 py-3 cursor-pointer rounded-xl outline-none transition-all duration-300 flex items-center justify-between ${languageFilter === 'All'
                                                        ? 'bg-primary-500/15 text-primary-300 font-semibold ring-1 ring-primary-500/20'
                                                        : 'text-color-text-muted hover:bg-white/5 hover:text-color-text'
                                                        }`}
                                                    onClick={() => { setLanguageFilter('All'); setFilterOpen(false); }}
                                                >
                                                    <span>All languages</span>
                                                    {languageFilter === 'All' && <IoCheckmarkCircleOutline className="w-4 h-4 text-primary-400" />}
                                                </DropdownMenu.Item>
                                                {languages.map(({ name, count }) => (
                                                    <DropdownMenu.Item
                                                        key={name}
                                                        className={`group text-sm px-4 py-3 cursor-pointer rounded-xl outline-none transition-all duration-300 flex items-center justify-between ${languageFilter === name
                                                            ? 'bg-primary-500/15 text-primary-300 font-semibold ring-1 ring-primary-500/20'
                                                            : 'text-color-text-muted hover:bg-white/5 hover:text-color-text'
                                                            }`}
                                                        onClick={() => { setLanguageFilter(name); setFilterOpen(false); }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                className="w-2.5 h-2.5 rounded-full"
                                                                style={{ backgroundColor: getLanguageColor(name) }}
                                                            />
                                                            <span>{name}</span>
                                                            <span className="text-[10px] text-color-text-muted">({count})</span>
                                                        </div>
                                                        {languageFilter === name && <IoCheckmarkCircleOutline className="w-4 h-4 text-primary-400" />}
                                                    </DropdownMenu.Item>
                                                ))}
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Stats Cards */}
                {stats && !loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in">
                        <div className="glass-ultra rounded-xl p-4 border border-white/10 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-primary-400">{stats.totalRepos}</div>
                            <div className="text-xs text-color-text-muted mt-1">Repositories</div>
                        </div>
                        <div className="glass-ultra rounded-xl p-4 border border-white/10 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-amber-400 flex items-center justify-center gap-1.5">
                                <IoStarOutline className="w-5 h-5" />
                                {stats.totalStars}
                            </div>
                            <div className="text-xs text-color-text-muted mt-1">Total Stars</div>
                        </div>
                        <div className="glass-ultra rounded-xl p-4 border border-white/10 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-green-400 flex items-center justify-center gap-1.5">
                                <IoGitBranchOutline className="w-5 h-5" />
                                {stats.totalForks}
                            </div>
                            <div className="text-xs text-color-text-muted mt-1">Total Forks</div>
                        </div>
                        <div className="glass-ultra rounded-xl p-4 border border-white/10 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-violet-400">{stats.languages.length}</div>
                            <div className="text-xs text-color-text-muted mt-1">Languages</div>
                        </div>
                    </div>
                )}

                {/* Mobile Controls */}
                {!loading && !error && (
                    <div className="flex flex-col gap-4 mb-8 md:hidden">
                        {/* Search input mobile */}
                        <div className="relative">
                            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-color-text-muted" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search repos..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl glass-frost border border-white/10 text-color-text placeholder:text-color-text-muted/70 text-sm focus:ring-2 focus:ring-primary-500/50 outline-none transition-all"
                            />
                        </div>

                        <div className="flex justify-between items-center gap-2">
                            {/* Layout toggle */}
                            <div className="flex rounded-xl overflow-hidden glass-frost border border-white/10 p-1 gap-1">
                                <button
                                    onClick={() => setLayout('grid')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${layout === 'grid'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                        : 'text-color-text-muted hover:bg-white/10'
                                        }`}
                                >
                                    <IoGridOutline className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setLayout('table')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${layout === 'table'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                        : 'text-color-text-muted hover:bg-white/10'
                                        }`}
                                >
                                    <IoListOutline className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Sort & Filter dropdowns */}
                            <div className="flex gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="px-3 py-2 rounded-xl glass-frost border border-white/10 text-color-text text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 bg-transparent"
                                >
                                    <option value="updated">Recently updated</option>
                                    <option value="stars">Most stars</option>
                                    <option value="forks">Most forks</option>
                                    <option value="created">Recently created</option>
                                    <option value="alphabetical">A-Z</option>
                                </select>
                                <select
                                    value={languageFilter}
                                    onChange={(e) => setLanguageFilter(e.target.value)}
                                    className="px-3 py-2 rounded-xl glass-frost border border-white/10 text-color-text text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/50 bg-transparent"
                                >
                                    <option value="All">All</option>
                                    {languages.map(({ name }) => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin"></div>
                            <IoLogoGithub className="absolute inset-0 m-auto w-6 h-6 text-primary-400" />
                        </div>
                        <p className="mt-6 text-color-text-muted">Fetching repositories from GitHub...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
                            <IoAlertCircleOutline className="w-12 h-12 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-color-text mb-2">Failed to Load</h3>
                        <p className="text-color-text-muted mb-6 max-w-md">{error}</p>
                        <button
                            onClick={fetchRepos}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center gap-2"
                        >
                            <IoRefresh className="w-5 h-5" />
                            Try Again
                        </button>
                    </div>
                )}

                {/* Repos Grid/List */}
                {!loading && !error && (
                    <>
                        {filteredRepos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                                    <IoSearch className="w-12 h-12 text-color-text-muted" />
                                </div>
                                <h3 className="text-xl font-bold text-color-text mb-2">No Repositories Found</h3>
                                <p className="text-color-text-muted max-w-md">
                                    {debouncedSearchQuery
                                        ? `No repositories match "${debouncedSearchQuery}"`
                                        : 'No repositories match the selected filters.'}
                                </p>
                                {(languageFilter !== 'All' || debouncedSearchQuery) && (
                                    <button
                                        onClick={() => { setLanguageFilter('All'); setSearchQuery(''); }}
                                        className="mt-4 px-4 py-2 rounded-xl glass-frost border border-white/10 text-primary-400 hover:bg-white/10 transition-all"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        ) : layout === 'grid' ? (
                            <>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
                                    {paginatedRepos.map((repo) => (
                                        <RepoCard key={repo.id} repo={repo} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                                        <div className="text-sm text-color-text-muted">
                                            Showing <span className="text-primary-300 font-semibold">{startIndex + 1}</span>-<span className="text-primary-300 font-semibold">{Math.min(endIndex, filteredRepos.length)}</span> of <span className="text-primary-300 font-semibold">{filteredRepos.length}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className={`p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${currentPage === 1
                                                    ? 'text-color-text-muted/50 cursor-not-allowed bg-white/5'
                                                    : 'text-primary-300 hover:bg-white/10 hover:text-primary-200 glass-frost border border-white/10'
                                                    }`}
                                                aria-label="Previous page"
                                            >
                                                <IoChevronBack className="w-4 h-4" />
                                                <span className="hidden sm:inline text-sm font-medium">Previous</span>
                                            </button>

                                            <div className="flex items-center gap-2">
                                                {getVisiblePages().map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-10 h-10 rounded-lg transition-all duration-300 text-sm font-medium ${currentPage === page
                                                            ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                                                            : 'glass-frost text-color-text-muted border border-white/10 hover:bg-white/10 hover:text-primary-300'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                                className={`p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${currentPage === totalPages
                                                    ? 'text-color-text-muted/50 cursor-not-allowed bg-white/5'
                                                    : 'text-primary-300 hover:bg-white/10 hover:text-primary-200 glass-frost border border-white/10'
                                                    }`}
                                                aria-label="Next page"
                                            >
                                                <span className="hidden sm:inline text-sm font-medium">Next</span>
                                                <IoChevronForward className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-3 animate-fade-in">
                                    {paginatedRepos.map((repo) => (
                                        <RepoRow key={repo.id} repo={repo} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                                        <div className="text-sm text-color-text-muted">
                                            Showing <span className="text-primary-300 font-semibold">{startIndex + 1}</span>-<span className="text-primary-300 font-semibold">{Math.min(endIndex, filteredRepos.length)}</span> of <span className="text-primary-300 font-semibold">{filteredRepos.length}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className={`p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${currentPage === 1
                                                    ? 'text-color-text-muted/50 cursor-not-allowed bg-white/5'
                                                    : 'text-primary-300 hover:bg-white/10 hover:text-primary-200 glass-frost border border-white/10'
                                                    }`}
                                                aria-label="Previous page"
                                            >
                                                <IoChevronBack className="w-4 h-4" />
                                                <span className="hidden sm:inline text-sm font-medium">Previous</span>
                                            </button>

                                            <div className="flex items-center gap-2">
                                                {getVisiblePages().map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`w-10 h-10 rounded-lg transition-all duration-300 text-sm font-medium ${currentPage === page
                                                            ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                                                            : 'glass-frost text-color-text-muted border border-white/10 hover:bg-white/10 hover:text-primary-300'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                                className={`p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 ${currentPage === totalPages
                                                    ? 'text-color-text-muted/50 cursor-not-allowed bg-white/5'
                                                    : 'text-primary-300 hover:bg-white/10 hover:text-primary-200 glass-frost border border-white/10'
                                                    }`}
                                                aria-label="Next page"
                                            >
                                                <span className="hidden sm:inline text-sm font-medium">Next</span>
                                                <IoChevronForward className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

                {/* GitHub Profile CTA */}
                {!loading && !error && (
                    <div className="mt-16 text-center animate-fade-in">
                        <a
                            href="https://github.com/CodeMeAPixel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl glass-ultra border border-white/10 hover:border-primary-500/30 text-color-text hover:text-primary-400 transition-all duration-300 group"
                        >
                            <IoLogoGithub className="w-5 h-5" />
                            <span>View Full GitHub Profile</span>
                            <IoOpenOutline className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
