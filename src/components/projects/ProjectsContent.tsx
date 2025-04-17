"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/types/project';
import { IoArrowForward, IoBookmarkOutline, IoChevronDown } from 'react-icons/io5';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

interface ProjectsContentProps {
    projects: Project[];
    allTags: string[];
}

export default function ProjectsContent({ projects, allTags }: ProjectsContentProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filterOpen, setFilterOpen] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Add "All" to the tags list
    const filterTags = ['All', ...allTags];

    // Filter projects based on selected tag
    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(project => project.tags.includes(activeFilter));

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
                            My Projects
                        </h1>
                        <p className="text-color-text-muted text-center md:text-left">
                            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} showcasing my skills and experience
                        </p>
                    </div>

                    {/* Category filter dropdown */}
                    <div className="hidden md:block">
                        <DropdownMenu.Root open={filterOpen} onOpenChange={setFilterOpen}>
                            <DropdownMenu.Trigger asChild>
                                <button className="relative px-4 py-2 rounded-xl bg-primary-800/20 border border-primary-700/20 text-primary-300 text-sm flex items-center gap-2 hover:bg-primary-800/30 hover:border-primary-700/30 transition-all focus:outline-none">
                                    <IoBookmarkOutline className="w-4 h-4" />
                                    <span>{activeFilter === 'All' ? 'All technologies' : activeFilter}</span>
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
                </motion.div>

                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Content section - NO LONGER a Link wrapper */}
                                    <div className="p-7 relative">
                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {project.tags.slice(0, 4).map(tag => (
                                                <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 4 && (
                                                <span className="tag bg-primary-900/30 border-primary-700/30 text-xs group-hover:bg-primary-800/40 group-hover:border-primary-600/40 transition-colors">
                                                    +{project.tags.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title with hover effect - NOW as a Link */}
                                        <Link href={`/projects/${project.id}`} className="block mb-4">
                                            <motion.h2
                                                className="text-2xl font-bold text-color-text group-hover:text-primary-300 transition-colors leading-tight"
                                                animate={hoveredProject === project.id ? { scale: 1.01 } : { scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {project.title}
                                            </motion.h2>
                                        </Link>

                                        {/* Description */}
                                        <p className="text-color-text-muted mb-8 line-clamp-3 text-base leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* View Project Button - Now as a Link */}
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
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center p-10 bg-card border border-color-border rounded-xl"
                    >
                        <h3 className="text-xl font-semibold mb-2">No projects found with this technology</h3>
                        <p className="text-color-text-muted mb-6">Try selecting a different filter or check back later.</p>
                        <button
                            onClick={() => setActiveFilter('All')}
                            className="btn-secondary text-sm py-2"
                        >
                            Show all projects
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
