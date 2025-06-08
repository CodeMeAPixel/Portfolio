"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillCategory } from '@/data/skills';
import { TechIcon } from '@/components/ui/TechIcon';
import { IoSearch, IoBookmarkOutline, IoCodeSlashOutline, IoServerOutline, IoCloudUploadOutline, IoHammerOutline, IoLayersOutline } from 'react-icons/io5';
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
        <section className="py-24 bg-bg-alt relative z-10">
            <div className="container-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="heading-primary text-center md:text-left mb-4">
                        Skills & Expertise
                    </h1>
                    <p className="text-color-text-muted text-center md:text-left max-w-3xl">
                        I&apos;e worked with a variety of technologies across the stack.
                        Here&apos;s a comprehensive overview of my technical skills and proficiency levels.
                    </p>
                </motion.div>

                {/* Search and filter section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="relative w-full sm:max-w-md mx-auto md:mx-0 mb-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IoSearch className="w-5 h-5 text-primary-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full p-3 pl-10 text-sm rounded-lg bg-card border border-color-border focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors text-color-text placeholder:text-color-text-muted"
                            placeholder="Search skills or technologies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Skills Tabs */}
                <Tabs.Root
                    defaultValue="all"
                    onValueChange={setActiveCategory}
                    className="mb-12"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Tabs.List
                            className="flex flex-wrap gap-2 sm:gap-2 border-b border-color-border pb-2 mb-8 overflow-x-auto scrollbar-hidden"
                            aria-label="Skill categories"
                        >
                            <Tabs.Trigger
                                value="all"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${activeCategory === 'all'
                                        ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                                        : 'text-color-text-muted hover:bg-card hover:text-color-text'
                                    }`}
                            >
                                All Categories
                            </Tabs.Trigger>

                            {skills.map((category, index) => (
                                <Tabs.Trigger
                                    key={index}
                                    value={category.name.toLowerCase()}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5
                    ${activeCategory === category.name.toLowerCase()
                                            ? 'bg-primary-500/10 text-primary-300 border border-primary-500/20'
                                            : 'text-color-text-muted hover:bg-card hover:text-color-text'
                                        }`}
                                >
                                    {getCategoryIcon(category.name)}
                                    {category.name}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </motion.div>

                    <Tabs.Content value="all">
                        {filteredSkills.map((category, categoryIndex) => (
                            category.skills.length > 0 && (
                                <motion.div
                                    key={categoryIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.1 }}
                                    className="mb-16 last:mb-0"
                                >
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('400', '900/30')} ${category.color}`}>
                                            {getCategoryIcon(category.name)}
                                        </div>
                                        <h2 className="text-2xl font-bold text-color-text">{category.name}</h2>
                                    </div>
                                    <p className="text-color-text-muted mb-8 max-w-3xl">{category.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skillIndex}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 + skillIndex * 0.05 }}
                                                className="p-5 rounded-xl bg-card border border-color-border hover:border-primary-500/30 transition-all duration-300 group hover:shadow-lg relative overflow-hidden"
                                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            >
                                                {/* Subtle decoration */}
                                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:bg-primary-500/10 transition-colors duration-300" />

                                                <div className="flex items-start gap-4 mb-4 relative z-10">
                                                    <div className="flex-shrink-0 p-2 mt-1 rounded-lg bg-primary-900/30 text-primary-300">
                                                        <TechIcon name={skill.icon || skill.name} className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-color-text mb-1 group-hover:text-primary-300 transition-colors">
                                                            {skill.name}
                                                        </h3>
                                                        {skill.level && (
                                                            <div className="flex items-center gap-1 mb-1">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-8 h-1.5 rounded-full transition-colors duration-300 ${i < skill.level!
                                                                            ? 'bg-primary-500/70 group-hover:bg-primary-400'
                                                                            : 'bg-primary-900/30'
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {skill.description && (
                                                    <p className="text-sm text-color-text-muted leading-relaxed mt-2 relative z-10">
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-').replace('400', '900/30')} ${category.color}`}>
                                        {getCategoryIcon(category.name)}
                                    </div>
                                    <h2 className="text-2xl font-bold text-color-text">{category.name}</h2>
                                </div>
                                <p className="text-color-text-muted mb-8 max-w-3xl">{category.description}</p>
                            </motion.div>

                            {filteredSkills.find(c => c.name === category.name)?.skills.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center p-10 bg-card border border-color-border rounded-xl"
                                >
                                    <h3 className="text-xl font-semibold mb-2">No skills found</h3>
                                    <p className="text-color-text-muted mb-6">Try a different search query or category.</p>
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="btn-secondary text-sm py-2"
                                    >
                                        Clear search
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {filteredSkills.find(c => c.name === category.name)?.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skillIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 + skillIndex * 0.05 }}
                                            className="p-5 rounded-xl bg-card border border-color-border hover:border-primary-500/30 transition-all duration-300 group hover:shadow-lg relative overflow-hidden"
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        >
                                            {/* Subtle decoration */}
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full -translate-y-12 translate-x-12 group-hover:bg-primary-500/10 transition-colors duration-300" />

                                            <div className="flex items-start gap-4 mb-4 relative z-10">
                                                <div className="flex-shrink-0 p-2 mt-1 rounded-lg bg-primary-900/30 text-primary-300">
                                                    <TechIcon name={skill.icon || skill.name} className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-color-text mb-1 group-hover:text-primary-300 transition-colors">
                                                        {skill.name}
                                                    </h3>
                                                    {skill.level && (
                                                        <div className="flex items-center gap-1 mb-1">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-8 h-1.5 rounded-full transition-colors duration-300 ${i < skill.level!
                                                                        ? 'bg-primary-500/70 group-hover:bg-primary-400'
                                                                        : 'bg-primary-900/30'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {skill.description && (
                                                <p className="text-sm text-color-text-muted leading-relaxed mt-2 relative z-10">
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

                {/* Skills Statistics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-20 pt-12 border-t border-color-border"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-6 rounded-xl bg-card border border-color-border text-center">
                            <h3 className="heading-primary mb-3 text-5xl">{skills.reduce((acc, category) => acc + category.skills.length, 0)}</h3>
                            <p className="text-color-text-muted font-medium">Total Skills</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card border border-color-border text-center">
                            <h3 className="heading-primary mb-3 text-5xl">{skills.length}</h3>
                            <p className="text-color-text-muted font-medium">Skill Categories</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card border border-color-border text-center">
                            <h3 className="heading-primary mb-3 text-5xl">{skills.flatMap(c => c.skills).filter(s => s.level === 5).length}</h3>
                            <p className="text-color-text-muted font-medium">Expert Level Skills</p>
                        </div>
                        <div className="p-6 rounded-xl bg-card border border-color-border text-center">
                            <h3 className="heading-primary mb-3 text-5xl">{uniqueSkills.length}</h3>
                            <p className="text-color-text-muted font-medium">Unique Technologies</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
