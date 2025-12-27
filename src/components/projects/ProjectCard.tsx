"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import {
    IoArrowForward,
    IoGlobeOutline,
    IoLogoGithub,
    IoTimeOutline,
    IoStarOutline,
    IoRocketOutline,
    IoCodeSlashOutline
} from "react-icons/io5";
import { format } from "date-fns";
import { useState } from "react";

interface ProjectCardProps {
    project: Project;
    index?: number;
    variant?: "featured" | "default" | "compact";
    showFeaturedBadge?: boolean;
    searchQuery?: string;
    onHover?: (id: string | null) => void;
    isHovered?: boolean;
}

// Helper function to highlight matched text in search
function highlightMatchedText(text: string, query?: string): React.ReactNode {
    if (!query || !query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-primary-500/30 text-primary-200 px-0.5 rounded">
                {part}
            </span>
        ) : (
            part
        )
    );
}

export default function ProjectCard({
    project,
    index = 0,
    variant = "default",
    showFeaturedBadge = false,
    searchQuery,
    onHover,
    isHovered = false
}: ProjectCardProps) {
    const [internalHovered, setInternalHovered] = useState(false);
    const hovered = isHovered || internalHovered;

    const handleMouseEnter = () => {
        setInternalHovered(true);
        onHover?.(project.id);
    };

    const handleMouseLeave = () => {
        setInternalHovered(false);
        onHover?.(null);
    };

    const projectLink = `/projects/${project.links?.slug || project.id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative h-full group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Animated outer glow */}
                <div className="absolute -inset-[2px] rounded-[28px] bg-gradient-to-r from-primary-500/60 via-accent-500/40 to-primary-600/60 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />

                {/* Card container */}
                <div className="relative h-full rounded-3xl glass-ultra border border-white/10 overflow-hidden group-hover:border-primary-500/30 transition-all duration-500">
                    {/* Spotlight effect */}
                    <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Premium gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Shine sweep effect */}
                    <div className="absolute inset-0 shine-sweep pointer-events-none" />

                    {/* Image Section */}
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                        <ImageCarousel
                            images={project.images}
                            className="w-full h-full"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent pointer-events-none" />

                        {/* Top action buttons */}
                        <motion.div
                            className="absolute top-4 right-4 flex gap-2 z-10"
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{
                                opacity: hovered ? 1 : 0,
                                y: hovered ? 0 : -10,
                                scale: hovered ? 1 : 0.9
                            }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {project.links?.demo && (
                                <Link
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl glass-ultra border border-white/20 text-primary-300 hover:text-white hover:bg-primary-500/50 hover:border-primary-400/50 transition-all duration-300 hover:scale-110 shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IoGlobeOutline className="w-4 h-4" />
                                </Link>
                            )}
                            {project.links?.github && (
                                <Link
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl glass-ultra border border-white/20 text-primary-300 hover:text-white hover:bg-primary-500/50 hover:border-primary-400/50 transition-all duration-300 hover:scale-110 shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IoLogoGithub className="w-4 h-4" />
                                </Link>
                            )}
                        </motion.div>

                        {/* Featured badge */}
                        {(showFeaturedBadge || project.featured) && index === 0 && (
                            <motion.div
                                className="absolute top-4 left-4 z-10"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
                                    <IoStarOutline className="w-3.5 h-3.5" />
                                    Featured
                                </span>
                            </motion.div>
                        )}

                        {/* Date badge */}
                        {project.date && (
                            <div className="absolute bottom-4 left-4 z-10">
                                <span className="glass-ultra border border-white/20 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center text-color-text shadow-lg">
                                    <IoTimeOutline className="mr-1.5 w-3.5 h-3.5 text-primary-400" />
                                    {format(new Date(project.date), 'MMM yyyy')}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 relative">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold glass-frost border border-white/10 text-primary-300 group-hover:border-primary-500/30 group-hover:bg-primary-500/10 transition-all duration-300 ${searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())
                                        ? 'bg-primary-500/20 border-primary-500/40 text-primary-200'
                                        : ''
                                        }`}
                                >
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 4 && (
                                <span className="px-3 py-1.5 rounded-xl text-xs font-semibold glass-frost text-color-text-muted border border-white/5">
                                    +{project.tags.length - 4}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <Link href={projectLink} className="block mb-3">
                            <motion.h3
                                className="text-xl md:text-2xl font-black text-color-text group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-accent-300 transition-all duration-300 leading-tight"
                                animate={hovered ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {highlightMatchedText(project.title, searchQuery)}
                            </motion.h3>
                        </Link>

                        {/* Description */}
                        <p className="text-color-text-muted text-sm leading-relaxed mb-6 line-clamp-2">
                            {highlightMatchedText(project.description, searchQuery)}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            {/* Quick links */}
                            <div className="flex items-center gap-4">
                                {project.links?.demo && (
                                    <Link
                                        href={project.links.demo}
                                        className="text-sm text-color-text-muted hover:text-primary-300 transition-colors flex items-center gap-1.5 font-medium group/link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IoGlobeOutline className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                        <span className="hidden sm:inline">Live</span>
                                    </Link>
                                )}
                                {project.links?.github && (
                                    <Link
                                        href={project.links.github}
                                        className="text-sm text-color-text-muted hover:text-primary-300 transition-colors flex items-center gap-1.5 font-medium group/link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IoLogoGithub className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                        <span className="hidden sm:inline">Code</span>
                                    </Link>
                                )}
                                {project.technologies && project.technologies.length > 0 && (
                                    <span className="text-sm text-color-text-muted flex items-center gap-1.5 font-medium">
                                        <IoCodeSlashOutline className="w-4 h-4 text-primary-400" />
                                        <span className="hidden sm:inline">{project.technologies.length} techs</span>
                                    </span>
                                )}
                            </div>

                            {/* View button */}
                            <Link
                                href={projectLink}
                                className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-[1.02] transition-all duration-300"
                            >
                                <span>View</span>
                                <IoArrowForward className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Compact variant for list/table views
export function ProjectCardCompact({
    project,
    index = 0,
    searchQuery,
    onHover,
    isHovered = false
}: Omit<ProjectCardProps, "variant" | "showFeaturedBadge">) {
    const [internalHovered, setInternalHovered] = useState(false);
    const hovered = isHovered || internalHovered;

    const handleMouseEnter = () => {
        setInternalHovered(true);
        onHover?.(project.id);
    };

    const handleMouseLeave = () => {
        setInternalHovered(false);
        onHover?.(null);
    };

    const projectLink = `/projects/${project.links?.slug || project.id}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative overflow-hidden rounded-2xl glass-ultra border border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 group-hover:border-primary-500/30">
                {/* Top gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-400 opacity-50 group-hover:opacity-100 transition-opacity z-10" />

                {/* Shine effect */}
                <div className="absolute inset-0 shine-sweep pointer-events-none" />

                <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div className="sm:w-56 h-48 sm:h-auto overflow-hidden relative border-b sm:border-b-0 sm:border-r border-white/10">
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                        {/* Featured indicator */}
                        {project.featured && (
                            <div className="absolute top-3 left-3">
                                <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg flex items-center gap-1">
                                    <IoStarOutline className="w-3 h-3" />
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 flex flex-col justify-between relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                                <Link href={projectLink} className="block">
                                    <motion.h2
                                        className="text-lg font-bold text-color-text group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-accent-300 transition-all duration-300"
                                        animate={hovered ? { scale: 1.01 } : { scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {highlightMatchedText(project.title, searchQuery)}
                                    </motion.h2>
                                </Link>
                                {project.date && (
                                    <span className="text-xs text-color-text-muted flex items-center whitespace-nowrap glass-frost px-2.5 py-1 rounded-lg border border-white/10">
                                        <IoTimeOutline className="mr-1.5 w-3.5 h-3.5 text-primary-400" />
                                        {format(new Date(project.date), 'MMM yyyy')}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-color-text-muted text-sm mb-4 line-clamp-2">
                                {highlightMatchedText(project.description, searchQuery)}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold glass-frost border border-white/10 text-primary-300 ${searchQuery && tag.toLowerCase().includes(searchQuery.toLowerCase())
                                            ? 'bg-primary-500/20 border-primary-500/40'
                                            : ''
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className="px-2 py-1 rounded-lg text-[10px] font-semibold text-color-text-muted">
                                        +{project.tags.length - 4}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                {project.links?.demo && (
                                    <Link
                                        href={project.links.demo}
                                        className="text-xs text-color-text-muted hover:text-primary-300 transition-colors flex items-center gap-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IoGlobeOutline className="w-3.5 h-3.5" />
                                        Live
                                    </Link>
                                )}
                                {project.links?.github && (
                                    <Link
                                        href={project.links.github}
                                        className="text-xs text-color-text-muted hover:text-primary-300 transition-colors flex items-center gap-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <IoLogoGithub className="w-3.5 h-3.5" />
                                        Code
                                    </Link>
                                )}
                            </div>
                            <Link
                                href={projectLink}
                                className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] transition-all duration-300"
                            >
                                View
                                <IoArrowForward className={`w-3.5 h-3.5 transition-transform duration-300 ${hovered ? 'translate-x-0.5' : ''}`} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
