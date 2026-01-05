"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { IoRocketOutline, IoLogoGithub, IoBookOutline, IoCalendarOutline, IoArrowForward } from "react-icons/io5";

interface ProjectCardProps {
    project: Project;
    index?: number;
    searchQuery?: string;
    onHover?: (id: string | null) => void;
    isHovered?: boolean;
    showFeaturedBadge?: boolean;
}

function highlightText(text: string, query?: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? (
            <mark key={i} className="bg-primary-500/30 text-primary-200 px-0.5 rounded">
                {part}
            </mark>
        ) : (
            part
        )
    );
}

export default function ProjectCard({
    project,
    index = 0,
    searchQuery,
    onHover,
    isHovered,
    showFeaturedBadge = false,
}: ProjectCardProps) {
    const [imageError, setImageError] = useState(false);
    const animationDelay = `${index * 0.1}s`;

    return (
        <div
            className="group relative animate-fade-up"
            style={{ animationDelay }}
            onMouseEnter={() => onHover?.(project.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            <Link href={`/projects/${project.id}`}>
                <article className="relative h-full glass-ultra border border-primary-500/20 rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary-400 hover:shadow-2xl hover:shadow-primary-500/30 hover:-translate-y-1">
                    {/* Image Section */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-900/50 to-bg">
                        {project.images?.[0] && !imageError ? (
                            <Image
                                src={project.images[0]}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900/30 to-bg">
                                <IoRocketOutline className="w-12 h-12 text-primary-500/40" />
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        {/* Featured Badge */}
                        {(project.featured || showFeaturedBadge) && (
                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-frost border border-primary-500/30 text-xs font-semibold text-primary-300 backdrop-blur-md">
                                Featured
                            </div>
                        )}

                        {/* Date Badge */}
                        {project.date && (
                            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-frost border border-white/10 text-xs text-color-text-muted backdrop-blur-md">
                                <IoCalendarOutline className="w-3.5 h-3.5" />
                                {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors duration-300">
                            {highlightText(project.title, searchQuery)}
                        </h3>

                        {/* Description */}
                        <p className="text-color-text-muted text-sm line-clamp-2 leading-relaxed">
                            {highlightText(project.description, searchQuery)}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs font-medium rounded-lg glass-frost border border-white/10 text-primary-300"
                                >
                                    {highlightText(tag, searchQuery)}
                                </span>
                            ))}
                            {project.tags.length > 4 && (
                                <span className="px-2.5 py-1 text-xs font-medium rounded-lg glass-frost border border-white/10 text-color-text-muted">
                                    +{project.tags.length - 4}
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex gap-2">
                                {project.links.demo && (
                                    <span className="p-2 rounded-lg glass-frost border border-white/10 text-primary-300 hover:bg-primary-500/20 transition-colors">
                                        <IoRocketOutline className="w-4 h-4" />
                                    </span>
                                )}
                                {project.links.github && (
                                    <span className="p-2 rounded-lg glass-frost border border-white/10 text-color-text-muted hover:text-primary-300 hover:bg-primary-500/20 transition-colors">
                                        <IoLogoGithub className="w-4 h-4" />
                                    </span>
                                )}
                                {(project.links.docs || project.links.documentation) && (
                                    <span className="p-2 rounded-lg glass-frost border border-white/10 text-color-text-muted hover:text-primary-300 hover:bg-primary-500/20 transition-colors">
                                        <IoBookOutline className="w-4 h-4" />
                                    </span>
                                )}
                            </div>
                            <span className="flex items-center gap-2 text-sm font-medium text-primary-300 group-hover:gap-3 transition-all duration-300">
                                View Details
                                <IoArrowForward className="w-4 h-4" />
                            </span>
                        </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5" />
                </article>
            </Link>
        </div>
    );
}

// Compact card for list/table view
export function ProjectCardCompact({
    project,
    index = 0,
    searchQuery,
    onHover,
    isHovered,
}: ProjectCardProps) {
    const [imageError, setImageError] = useState(false);
    const animationDelay = `${index * 0.05}s`;

    return (
        <div
            className="group animate-fade-up"
            style={{ animationDelay }}
            onMouseEnter={() => onHover?.(project.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            <Link href={project.links.slug || `/projects/${project.id}`}>
                <article className="relative flex flex-col md:flex-row gap-4 p-4 glass-ultra border border-primary-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/30">
                    {/* Thumbnail */}
                    <div className="relative w-full md:w-40 h-28 md:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary-900/50 to-bg">
                        {project.images?.[0] && !imageError ? (
                            <Image
                                src={project.images[0]}
                                alt={project.title}
                                fill
                                sizes="160px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <IoRocketOutline className="w-8 h-8 text-primary-500/40" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-bold text-color-text group-hover:text-primary-300 transition-colors truncate">
                                    {highlightText(project.title, searchQuery)}
                                </h3>
                                <p className="text-color-text-muted text-sm line-clamp-1 mt-1">
                                    {highlightText(project.description, searchQuery)}
                                </p>
                            </div>
                            <span className="hidden md:flex items-center gap-2 text-sm font-medium text-primary-300 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                                View
                                <IoArrowForward className="w-4 h-4" />
                            </span>
                        </div>

                        {/* Tags and date */}
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 text-xs font-medium rounded-md glass-frost border border-white/10 text-primary-300"
                                >
                                    {tag}
                                </span>
                            ))}
                            {project.date && (
                                <span className="flex items-center gap-1 text-xs text-color-text-muted ml-auto">
                                    <IoCalendarOutline className="w-3 h-3" />
                                    {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                </span>
                            )}
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
}
