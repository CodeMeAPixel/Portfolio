"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillCategory } from '@/types/skills';
import { TechIcon } from '@/components/ui/TechIcon';
import { IoSearch, IoBookmarkOutline, IoCodeSlashOutline, IoServerOutline, IoCloudUploadOutline, IoHammerOutline, IoLayersOutline, IoSparkles } from 'react-icons/io5';
import * as Tabs from '@radix-ui/react-tabs';

interface SkillsContentProps {
    skills: SkillCategory[];
}

export default function SkillsContent({ skills }: SkillsContentProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Get all unique skill tags across all categories
    const allSkills = skills.flatMap(category =>
        category.skills.map(skill => skill.name.toLowerCase())
    );
    const uniqueSkills = Array.from(new Set(allSkills));

    // Filter skills based on search query
    const filteredSkills = skills.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }));

    // Get icon component based on category name
    const getCategoryIcon = (name: string) => {
        const icons: Record<string, React.ReactNode> = {
            'Frontend Development': <IoCodeSlashOutline className="w-5 h-5" />,
            'Backend Development': <IoServerOutline className="w-5 h-5" />,
            'Database & Storage': <IoServerOutline className="w-5 h-5" />,
            'DevOps & Deployment': <IoCloudUploadOutline className="w-5 h-5" />,
            'Tools & Utilities': <IoHammerOutline className="w-5 h-5" />,
            'UI Libraries & Frameworks': <IoLayersOutline className="w-5 h-5" />
        };

        return icons[name] || <IoBookmarkOutline className="w-5 h-5" />;
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
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, 50, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15], y: [0, -30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary-300/10 to-transparent blur-[60px]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />

            <div className="container-section relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    {/* Premium Badge */}
                    <div className="flex justify-center md:justify-start mb-8">
                        <motion.span
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-frost rounded-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <IoSparkles className="w-4 h-4" />
                            Technical Expertise
                        </motion.span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center md:text-left mb-6">
                        <span className="text-color-text">Skills & </span>
                        <span className="animated-gradient-text text-shadow-glow">Expertise</span>
                    </h1>
                    <p className="text-color-text-muted text-center md:text-left max-w-3xl text-lg md:text-xl leading-relaxed">
                        I&apos;ve worked with a variety of technologies across the stack.
                        Here&apos;s a comprehensive overview of my technical skills and proficiency levels.
                    </p>
                </motion.div>

                {/* Premium Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-14"
                >
                    <div className="relative w-full sm:max-w-lg mx-auto md:mx-0 mb-6">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 via-primary-400/20 to-primary-600/30 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative glass-ultra rounded-2xl overflow-hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                                <IoSearch className="w-5 h-5 text-primary-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full p-4 pl-14 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none transition-all text-color-text placeholder:text-color-text-muted"
                                placeholder="Search skills or technologies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 flex items-center pr-5 text-color-text-muted hover:text-primary-400 transition-colors"
                                >
                                    <span className="text-xs font-medium px-2 py-1 rounded-lg glass-frost">Clear</span>
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Premium Skill Tabs */}
                <Tabs.Root
                    defaultValue="all"
                    onValueChange={setActiveCategory}
                    className="mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Tabs.List
                            className="flex flex-wrap gap-3 p-3 rounded-2xl glass-ultra mb-10 overflow-x-auto scrollbar-hidden"
                            aria-label="Skill categories"
                        >
                            <Tabs.Trigger
                                value="all"
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap relative overflow-hidden
                  ${activeCategory === 'all'
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-xl shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text glass-frost hover:scale-105'
                                    }`}
                            >
                                <span className="relative z-10">All Categories</span>
                                {activeCategory === 'all' && (
                                    <motion.div
                                        className="absolute inset-0 shine-sweep"
                                        layoutId="activeTab"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Tabs.Trigger>

                            {skills.map((category, index) => (
                                <Tabs.Trigger
                                    key={index}
                                    value={category.name.toLowerCase()}
                                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 relative overflow-hidden
                    ${activeCategory === category.name.toLowerCase()
                                            ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-xl shadow-primary-500/30'
                                            : 'text-color-text-muted hover:text-color-text glass-frost hover:scale-105'
                                        }`}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {getCategoryIcon(category.name)}
                                        {category.name}
                                    </span>
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </motion.div>

                    <Tabs.Content value="all">
                        {filteredSkills.map((category, categoryIndex) => (
                            category.skills.length > 0 && (
                                <motion.div
                                    key={categoryIndex}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 + categoryIndex * 0.1 }}
                                    className="mb-20 last:mb-0"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-3 rounded-xl glass-frost text-primary-300`}>
                                            {getCategoryIcon(category.name)}
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-color-text">{category.name}</h2>
                                        <span className="px-3 py-1.5 text-xs font-semibold rounded-full glass-frost text-primary-300">
                                            {category.skills.length} skills
                                        </span>
                                    </div>
                                    <p className="text-color-text-muted mb-10 max-w-3xl text-lg leading-relaxed">{category.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skillIndex}
                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.4, delay: 0.1 + skillIndex * 0.05 }}
                                                className="group relative p-6 rounded-2xl glass-ultra overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                                                whileHover={{ y: -8 }}
                                            >
                                                {/* Animated glow border */}
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[gradient-x_3s_linear_infinite]"></div>

                                                {/* Spotlight effect */}
                                                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                                                {/* Shine sweep */}
                                                <div className="absolute inset-0 shine-sweep opacity-0 group-hover:opacity-100"></div>

                                                {/* Decorative orb */}
                                                <motion.div
                                                    className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                />

                                                <div className="flex items-start gap-4 mb-4 relative z-10">
                                                    <div className="flex-shrink-0 p-3 rounded-xl glass-frost text-primary-300 group-hover:scale-110 transition-transform duration-300">
                                                        <TechIcon name={skill.icon || skill.name} className="w-7 h-7" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-color-text mb-3 group-hover:text-primary-300 transition-colors">
                                                            {skill.name}
                                                        </h3>
                                                        {skill.level && (
                                                            <div className="flex items-center gap-1.5">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-8 h-2 rounded-full transition-all duration-500 ${i < skill.level!
                                                                            ? 'bg-gradient-to-r from-primary-500 to-primary-400 group-hover:shadow-md group-hover:shadow-primary-500/50'
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
                                                    <p className="text-sm text-color-text-muted leading-relaxed relative z-10">
                                                        {skill.description}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </Tabs.Content>

                    {skills.map((category, categoryIndex) => (
                        <Tabs.Content key={categoryIndex} value={category.name.toLowerCase()}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-10"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-xl glass-frost text-primary-300`}>
                                        {getCategoryIcon(category.name)}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-color-text">{category.name}</h2>
                                    <span className="px-3 py-1.5 text-xs font-semibold rounded-full glass-frost text-primary-300">
                                        {category.skills.length} skills
                                    </span>
                                </div>
                                <p className="text-color-text-muted mb-10 max-w-3xl text-lg leading-relaxed">{category.description}</p>
                            </motion.div>

                            {filteredSkills.find(c => c.name === category.name)?.skills.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center p-16 glass-ultra rounded-3xl"
                                >
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass-frost flex items-center justify-center">
                                        <IoSearch className="w-10 h-10 text-primary-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">No skills found</h3>
                                    <p className="text-color-text-muted mb-8 text-lg">Try a different search query or category.</p>
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="relative px-8 py-3 rounded-xl font-semibold overflow-hidden shine-sweep"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                                        <span className="relative z-10 text-white">Clear search</span>
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {filteredSkills.find(c => c.name === category.name)?.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skillIndex}
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.1 + skillIndex * 0.05 }}
                                            className="group relative p-6 rounded-2xl glass-ultra overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                                            whileHover={{ y: -8 }}
                                        >
                                            {/* Animated glow border */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[gradient-x_3s_linear_infinite]"></div>

                                            {/* Spotlight effect */}
                                            <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                                            {/* Shine sweep */}
                                            <div className="absolute inset-0 shine-sweep opacity-0 group-hover:opacity-100"></div>

                                            {/* Decorative orb */}
                                            <motion.div
                                                className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />

                                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                                <div className="flex-shrink-0 p-3 rounded-xl glass-frost text-primary-300 group-hover:scale-110 transition-transform duration-300">
                                                    <TechIcon name={skill.icon || skill.name} className="w-7 h-7" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-color-text mb-3 group-hover:text-primary-300 transition-colors">
                                                        {skill.name}
                                                    </h3>
                                                    {skill.level && (
                                                        <div className="flex items-center gap-1.5">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-8 h-2 rounded-full transition-all duration-500 ${i < skill.level!
                                                                        ? 'bg-gradient-to-r from-primary-500 to-primary-400 group-hover:shadow-md group-hover:shadow-primary-500/50'
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
                                                <p className="text-sm text-color-text-muted leading-relaxed relative z-10">
                                                    {skill.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </Tabs.Content>
                    ))}
                </Tabs.Root>

                {/* Premium Skills Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-24 pt-16 border-t border-primary-500/10"
                >
                    {/* Stats section header */}
                    <div className="text-center mb-12">
                        <motion.span
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-300 glass-frost rounded-full mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <IoSparkles className="w-4 h-4" />
                            At a Glance
                        </motion.span>
                        <h3 className="text-2xl md:text-3xl font-bold text-color-text">Quick Statistics</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {[
                            { value: skills.reduce((acc, category) => acc + category.skills.length, 0), label: "Total Skills", color: "from-blue-500 to-blue-600" },
                            { value: skills.length, label: "Categories", color: "from-purple-500 to-purple-600" },
                            { value: skills.flatMap(c => c.skills).filter(s => s.level === 5).length, label: "Expert Level", color: "from-amber-500 to-amber-600" },
                            { value: uniqueSkills.length, label: "Technologies", color: "from-emerald-500 to-emerald-600" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="group relative p-8 rounded-2xl glass-ultra text-center overflow-hidden"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                {/* Animated gradient background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                {/* Spotlight effect */}
                                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Decorative orb */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color} opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <motion.h3
                                        className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.6 + index * 0.1, type: "spring", bounce: 0.4 }}
                                    >
                                        {stat.value}
                                    </motion.h3>
                                    <p className="text-color-text-muted text-sm font-semibold tracking-wide uppercase">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
