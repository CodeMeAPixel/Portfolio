"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { SkillCategory } from '@/types/skills';
import { TechIcon } from '@/components/ui/TechIcon';
import { IoSearch, IoCodeSlashOutline, IoServerOutline, IoCloudUploadOutline, IoHammerOutline, IoLayersOutline, IoShieldCheckmarkOutline, IoMailOutline, IoFlaskOutline, IoGridOutline, IoClose, IoChevronDown, IoSparkles, IoCheckmark } from 'react-icons/io5';

interface SkillsContentProps {
    skills: SkillCategory[];
}

// Skill level labels
const levelLabels = ['Beginner', 'Familiar', 'Proficient', 'Advanced', 'Expert'];

export default function SkillsContent({ skills }: SkillsContentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Category icon mapping with larger icons for headers
    const getCategoryIcon = (name: string, size: 'sm' | 'md' = 'sm') => {
        const sizeClass = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
        const iconMap: Record<string, React.ReactNode> = {
            'Frontend Development': <IoCodeSlashOutline className={sizeClass} />,
            'Backend Development': <IoServerOutline className={sizeClass} />,
            'Database & Storage': <IoServerOutline className={sizeClass} />,
            'DevOps & Deployment': <IoCloudUploadOutline className={sizeClass} />,
            'Tools & Utilities': <IoHammerOutline className={sizeClass} />,
            'UI Libraries & Frameworks': <IoLayersOutline className={sizeClass} />,
            'Authentication & Security': <IoShieldCheckmarkOutline className={sizeClass} />,
            'Email & Communications': <IoMailOutline className={sizeClass} />,
            'Testing & Quality Assurance': <IoFlaskOutline className={sizeClass} />,
        };
        return iconMap[name] || <IoGridOutline className={sizeClass} />;
    };

    // Get short category name for pills
    const getShortName = (name: string) => {
        const shortNames: Record<string, string> = {
            'Frontend Development': 'Frontend',
            'Backend Development': 'Backend',
            'Database & Storage': 'Database',
            'DevOps & Deployment': 'DevOps',
            'Tools & Utilities': 'Tools',
            'UI Libraries & Frameworks': 'UI Libs',
            'Authentication & Security': 'Auth',
            'Email & Communications': 'Email',
            'Testing & Quality Assurance': 'Testing',
        };
        return shortNames[name] || name.split(' ')[0];
    };

    // Filter skills based on search and active category
    const filteredCategories = useMemo(() => {
        return skills
            .map(category => ({
                ...category,
                skills: category.skills.filter(skill =>
                    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (skill.description?.toLowerCase().includes(searchQuery.toLowerCase()))
                )
            }))
            .filter(category =>
                activeCategory === 'all' || category.name.toLowerCase() === activeCategory
            );
    }, [skills, searchQuery, activeCategory]);

    // Stats
    const totalSkills = skills.reduce((acc, c) => acc + c.skills.length, 0);
    const expertSkills = skills.flatMap(c => c.skills).filter(s => s.level === 5).length;
    const uniqueSkills = Array.from(new Set(skills.flatMap(c => c.skills.map(s => s.name.toLowerCase())))).length;

    return (
        <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs */}
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px] animate-float-slow" />
            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px] animate-float-medium" />
            <div className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary-300/10 to-transparent blur-[60px] animate-float-fast" />

            <div className="container-section relative">
                {/* Premium Header */}
                <div className="mb-12 md:mb-16 animate-fade-in">
                    {/* Premium Badge */}
                    <div className="flex justify-center md:justify-start mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-300 glass-frost rounded-full animate-fade-in-up">
                            <IoSparkles className="w-4 h-4" />
                            Technical Expertise
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-4">
                        <span className="text-color-text">Skills & </span>
                        <span className="animated-gradient-text text-shadow-glow">Expertise</span>
                    </h1>
                    <p className="text-color-text-muted text-center md:text-left max-w-3xl text-lg md:text-xl leading-relaxed">
                        I&apos;ve worked with a variety of technologies across the stack.
                        Here&apos;s a comprehensive overview of my technical skills and proficiency levels.
                    </p>
                </div>

                {/* Premium Search Box */}
                <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="relative w-full max-w-xl mx-auto md:mx-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 via-primary-400/10 to-primary-600/20 rounded-2xl blur-lg opacity-60"></div>
                        <div className="relative glass-ultra rounded-xl overflow-hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <IoSearch className="w-5 h-5 text-primary-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full p-4 pl-12 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none transition-all text-color-text placeholder:text-color-text-muted"
                                placeholder="Search skills or technologies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-color-text-muted hover:text-primary-400 transition-colors"
                                >
                                    <span className="text-xs font-medium px-2 py-1 rounded-lg glass-frost">Clear</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Filter - Mobile Dropdown + Desktop Pills */}
                <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                    {/* Mobile: Custom Dropdown */}
                    <div className="md:hidden" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium glass-ultra rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 text-color-text"
                        >
                            <span className="flex items-center gap-2">
                                {activeCategory === 'all' ? (
                                    <>
                                        <IoGridOutline className="w-4 h-4 text-primary-400" />
                                        All Categories
                                    </>
                                ) : (
                                    <>
                                        {getCategoryIcon(skills.find(c => c.name.toLowerCase() === activeCategory)?.name || '')}
                                        <span className="text-primary-300">{skills.find(c => c.name.toLowerCase() === activeCategory)?.name}</span>
                                    </>
                                )}
                            </span>
                            <IoChevronDown className={`w-5 h-5 text-primary-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute left-4 right-4 mt-2 py-2 bg-card rounded-xl border border-white/10 shadow-xl shadow-black/20 z-50 max-h-80 overflow-y-auto">
                                <button
                                    onClick={() => { setActiveCategory('all'); setIsDropdownOpen(false); }}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${activeCategory === 'all'
                                        ? 'text-primary-300 bg-primary-500/10'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/5'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <IoGridOutline className="w-4 h-4" />
                                        All Categories
                                    </span>
                                    {activeCategory === 'all' && <IoCheckmark className="w-4 h-4 text-primary-400" />}
                                </button>
                                {skills.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => { setActiveCategory(category.name.toLowerCase()); setIsDropdownOpen(false); }}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${activeCategory === category.name.toLowerCase()
                                            ? 'text-primary-300 bg-primary-500/10'
                                            : 'text-color-text-muted hover:text-color-text hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            {getCategoryIcon(category.name)}
                                            {category.name}
                                        </span>
                                        {activeCategory === category.name.toLowerCase() && <IoCheckmark className="w-4 h-4 text-primary-400" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Desktop: Premium Horizontal Tabs */}
                    <div className="hidden md:block">
                        <div className="flex items-center overflow-x-auto gap-2 pb-2 -mx-4 px-4 md:-mx-0 md:px-0">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap relative overflow-hidden flex-shrink-0 group
                                    ${activeCategory === 'all'
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/5 border border-white/5'
                                    }`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <IoGridOutline className="w-4 h-4" />
                                    All
                                </span>
                                {activeCategory === 'all' && <div className="absolute inset-0 shine-sweep" />}
                            </button>

                            {skills.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setActiveCategory(category.name.toLowerCase())}
                                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 relative overflow-hidden flex-shrink-0 group
                                        ${activeCategory === category.name.toLowerCase()
                                            ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                                            : 'text-color-text-muted hover:text-color-text hover:bg-white/5 border border-white/5 hover:border-primary-500/20'
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {getCategoryIcon(category.name)}
                                        <span className="hidden lg:inline">{getShortName(category.name)}</span>
                                        <span className="lg:hidden">{getShortName(category.name).substring(0, 3)}</span>
                                    </span>
                                    {activeCategory === category.name.toLowerCase() && <div className="absolute inset-0 shine-sweep" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="space-y-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    {filteredCategories.map((category, categoryIndex) => (
                        category.skills.length > 0 && (
                            <div key={category.name} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                                {/* Category Header */}
                                {activeCategory === 'all' && (
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-xl glass-frost text-primary-300">
                                            {getCategoryIcon(category.name, 'md')}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-color-text">{category.name}</h2>
                                            <p className="text-color-text-muted text-sm mt-1">{category.description}</p>
                                        </div>
                                        <span className="ml-auto px-3 py-1.5 text-xs font-semibold rounded-full glass-frost text-primary-300">
                                            {category.skills.length} skills
                                        </span>
                                    </div>
                                )}

                                {/* Premium Skills Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div
                                            key={skill.name}
                                            className="group relative p-5 md:p-6 rounded-2xl glass-ultra overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in"
                                            style={{ animationDelay: `${skillIndex * 50}ms` }}
                                        >
                                            {/* Animated glow border on hover */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Spotlight effect */}
                                            <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                                            {/* Shine sweep on hover */}
                                            <div className="absolute inset-0 shine-sweep opacity-0 group-hover:opacity-100"></div>

                                            {/* Decorative orb */}
                                            <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                                <div className="flex-shrink-0 p-3 rounded-xl glass-frost text-primary-300 group-hover:scale-110 group-hover:text-primary-200 transition-all duration-300">
                                                    <TechIcon name={skill.icon || skill.name} className="w-6 h-6 md:w-7 md:h-7" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-2">
                                                        <h3 className="text-base md:text-lg font-bold text-color-text group-hover:text-primary-300 transition-colors truncate">
                                                            {skill.name}
                                                        </h3>
                                                        {skill.level && (
                                                            <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-lg bg-primary-500/15 text-primary-300 border border-primary-500/20">
                                                                {levelLabels[skill.level - 1]}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {skill.level && (
                                                        <div className="flex items-center gap-1.5">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-7 md:w-8 h-1.5 md:h-2 rounded-full transition-all duration-500 ${i < skill.level!
                                                                        ? 'bg-gradient-to-r from-primary-500 to-primary-400 group-hover:shadow-sm group-hover:shadow-primary-500/50'
                                                                        : 'bg-white/10'
                                                                        }`}
                                                                    style={{ transitionDelay: `${i * 50}ms` }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {skill.description && (
                                                <p className="text-sm text-color-text-muted leading-relaxed relative z-10 line-clamp-2">
                                                    {skill.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Empty state */}
                {filteredCategories.every(c => c.skills.length === 0) && (
                    <div className="text-center p-12 md:p-16 glass-ultra rounded-3xl animate-fade-in">
                        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl glass-frost flex items-center justify-center">
                            <IoSearch className="w-8 h-8 md:w-10 md:h-10 text-primary-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3">No skills found</h3>
                        <p className="text-color-text-muted mb-6 md:mb-8 text-base md:text-lg">Try a different search query or category.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                            className="relative px-6 md:px-8 py-3 rounded-xl font-semibold overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                            <span className="absolute inset-0 shine-sweep"></span>
                            <span className="relative z-10 text-white">Clear search</span>
                        </button>
                    </div>
                )}

                {/* Premium Statistics Section */}
                <div className="mt-20 md:mt-24 pt-12 md:pt-16 border-t border-primary-500/10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-300 glass-frost rounded-full mb-4">
                            <IoSparkles className="w-4 h-4" />
                            At a Glance
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-color-text">Quick Statistics</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                        {[
                            { value: totalSkills, label: "Total Skills", color: "from-blue-500 to-blue-600" },
                            { value: skills.length, label: "Categories", color: "from-purple-500 to-purple-600" },
                            { value: expertSkills, label: "Expert Level", color: "from-amber-500 to-amber-600" },
                            { value: uniqueSkills, label: "Technologies", color: "from-emerald-500 to-emerald-600" }
                        ].map((stat, index) => (
                            <div
                                key={stat.label}
                                className="group relative p-6 md:p-8 rounded-2xl glass-ultra text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] animate-fade-in-up"
                                style={{ animationDelay: `${500 + index * 100}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                                <div className={`absolute -top-10 -right-10 w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <h3 className={`text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                        {stat.value}
                                    </h3>
                                    <p className="text-color-text-muted text-xs md:text-sm font-semibold tracking-wide uppercase">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 md:mt-20 text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                    <div className="relative inline-flex flex-col items-center p-8 md:p-10 rounded-3xl glass-ultra overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"></div>

                        <h4 className="relative z-10 text-xl md:text-2xl font-bold text-color-text mb-2">Interested in working together?</h4>
                        <p className="relative z-10 text-color-text-muted mb-6">Let&apos;s build something amazing</p>
                        <a
                            href="/contact"
                            className="relative px-8 py-3 rounded-xl font-semibold overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                            <span className="absolute inset-0 shine-sweep opacity-0 group-hover:opacity-100"></span>
                            <span className="relative z-10 text-white">Get in Touch</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
