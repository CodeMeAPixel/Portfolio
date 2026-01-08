"use client";

import Link from 'next/link';
import { Project } from '@/types/project';
import { useState, useEffect } from 'react';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { IoArrowBack, IoCalendarOutline, IoCodeSlash, IoLogoGithub, IoGlobeOutline, IoDocumentText, IoPersonOutline, IoPeopleOutline, IoChatbubbles, IoBusinessOutline } from 'react-icons/io5';
import { TechIcon } from '@/components/ui/TechIcon';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface ProjectDetailProps {
    project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'technologies' | 'testimonials' | 'partners'>('overview');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [serializedContent, setSerializedContent] = useState<MDXRemoteSerializeResult | null>(null);
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    useEffect(() => {
        // Convert single testimonial to array format for backward compatibility
        if (project.testimonial && (!project.testimonials || project.testimonials.length === 0)) {
            project.testimonials = [project.testimonial];
        }

        // Serialize markdown content
        if (project.longDescription) {
            serialize(project.longDescription).then(setSerializedContent);
        }
    }, [project]);

    // MDX components using your existing MDX setup
    const mdxComponents = {
        h1: (props: any) => <h1 className="text-3xl font-bold text-color-text mt-8 mb-4 first:mt-0" {...props} />,
        h2: (props: any) => <h2 className="text-2xl font-semibold text-color-text mt-6 mb-3" {...props} />,
        h3: (props: any) => <h3 className="text-xl font-medium text-color-text mt-4 mb-2" {...props} />,
        p: (props: any) => <p className="text-color-text-muted leading-relaxed mb-4" {...props} />,
        ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-color-text-muted" {...props} />,
        ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-color-text-muted" {...props} />,
        li: (props: any) => <li className="leading-relaxed" {...props} />,
        blockquote: (props: any) => (
            <blockquote className="border-l-4 border-primary-500 pl-4 py-2 bg-primary-900/10 rounded-r-lg italic text-color-text-muted mb-4" {...props} />
        ),
        a: (props: any) => (
            <a
                className="text-primary-400 hover:text-primary-300 underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            />
        ),
        code: (props: any) => (
            <code className="bg-card px-1.5 py-0.5 rounded text-primary-300 text-sm" {...props} />
        ),
        pre: (props: any) => (
            <pre className="bg-card p-4 rounded-lg overflow-x-auto mb-4 border border-color-border" {...props} />
        ),
        table: (props: any) => (
            <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-color-border rounded-lg" {...props} />
            </div>
        ),
        thead: (props: any) => <thead className="bg-card" {...props} />,
        th: (props: any) => (
            <th className="px-4 py-3 text-left text-color-text font-semibold border-b border-white/10 bg-white/5" {...props} />
        ),
        td: (props: any) => (
            <td className="px-4 py-3 text-color-text-muted border-b border-white/10" {...props} />
        ),
    };

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Enhanced Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-32 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/10 rounded-full blur-[120px] animate-pulse"
                />
                <div
                    className="absolute bottom-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-500/15 to-primary-500/20 rounded-full blur-[150px] animate-pulse"
                    style={{ animationDelay: '2s' }}
                />
                <div
                    className="absolute top-1/2 right-10 w-72 h-72 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: '3s' }}
                />
            </div>

            <div className="relative z-10 container-section max-w-6xl mx-auto px-4 py-16 sm:py-24">
                {/* Premium Back Button */}
                <div
                    className="animate-fade-in"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-5 py-2.5 glass-ultra rounded-xl text-primary-400 hover:text-primary-300 border border-white/10 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300 mb-10 group shadow-lg shadow-black/10"
                    >
                        <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="font-medium">Back to all projects</span>
                    </Link>
                </div>

                <article className="w-full overflow-hidden">
                    <div
                        className="animate-fade-up"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                            <span className="animated-gradient-text text-shadow-glow">{project.title}</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 mb-10 text-color-text-muted">
                            {project.date && (
                                <div className="flex items-center gap-2 px-4 py-2 glass-ultra rounded-xl border border-white/10 shadow-lg shadow-black/10">
                                    <IoCalendarOutline className="text-primary-400 w-4 h-4 flex-shrink-0" />
                                    <time className="text-sm font-medium">
                                        {new Date(project.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </time>
                                </div>
                            )}

                            {project.role && (
                                <div className="flex items-center gap-2 px-4 py-2 glass-ultra rounded-xl border border-white/10 shadow-lg shadow-black/10">
                                    <IoPersonOutline className="text-primary-400 w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm font-medium">{project.role}</span>
                                </div>
                            )}

                            {project.teamSize && (
                                <div className="flex items-center gap-2 px-4 py-2 glass-ultra rounded-xl border border-white/10 shadow-lg shadow-black/10">
                                    <IoPeopleOutline className="text-primary-400 w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm font-medium">Team of {project.teamSize}</span>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 glass-frost rounded-xl text-xs font-semibold text-primary-300 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`grid grid-cols-1 ${project.images && project.images.length > 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6 mb-8`}>
                        {project.images && project.images.length > 0 ? (
                            <div
                                className="lg:col-span-2 glass-ultra rounded-2xl p-1 animate-fade-up"
                                style={{ animationDelay: '0.1s' }}
                            >
                                <div className="aspect-video relative w-full overflow-hidden rounded-xl">
                                    <ImageCarousel images={project.images} className="w-full h-full" />
                                </div>
                            </div>
                        ) : (
                            /* No images - show a nice placeholder card */
                            <div
                                className="glass-ultra rounded-2xl p-8 animate-fade-up flex flex-col items-center justify-center text-center border border-white/10"
                                style={{ animationDelay: '0.1s' }}
                            >
                                <div className="w-20 h-20 mb-4 rounded-2xl glass-frost flex items-center justify-center">
                                    <IoCodeSlash className="w-10 h-10 text-primary-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-color-text mb-2">No Visual Preview</h3>
                                <p className="text-color-text-muted text-sm max-w-sm">
                                    This project doesn&apos;t have visual screenshots. Check out the links and documentation to learn more about it.
                                </p>
                            </div>
                        )}

                        <div
                            className="flex flex-col gap-4 animate-fade-up"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="glass-ultra rounded-2xl p-5 shine-sweep border border-white/10 shadow-xl shadow-black/10">
                                <h2 className="text-lg font-bold text-color-text mb-4 flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/20">
                                        <IoGlobeOutline className="text-primary-400 w-4 h-4" />
                                    </div>
                                    <span className="animated-gradient-text">Project Links</span>
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl glass-frost border border-white/10 text-primary-400 hover:text-primary-300 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <IoGlobeOutline className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-sm">Live Demo</span>
                                            <IoArrowBack className="w-3 h-3 rotate-180 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                        </a>
                                    )}

                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl glass-frost border border-white/10 text-primary-400 hover:text-primary-300 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <IoLogoGithub className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-sm">Source Code</span>
                                            <IoArrowBack className="w-3 h-3 rotate-180 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                        </a>
                                    )}

                                    {project.links.docs && (
                                        <a
                                            href={project.links.docs}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl glass-frost border border-white/10 text-primary-400 hover:text-primary-300 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <IoDocumentText className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-sm">Documentation</span>
                                            <IoArrowBack className="w-3 h-3 rotate-180 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {project.keyFeatures && (
                                <div className="glass-ultra rounded-2xl p-5 border border-white/10 shadow-xl shadow-black/10">
                                    <h2 className="text-lg font-bold text-color-text mb-4 animated-gradient-text">Key Features</h2>
                                    <ul className="space-y-2 text-color-text-muted">
                                        {project.keyFeatures.slice(0, showAllFeatures ? project.keyFeatures.length : 3).map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2.5 leading-relaxed p-2.5 rounded-lg glass-frost border border-white/5 hover:border-primary-500/20 hover:bg-white/5 transition-all duration-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 mt-1.5 flex-shrink-0 shadow-lg shadow-primary-500/30" />
                                                <span className="text-xs">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {project.keyFeatures.length > 3 && (
                                        <button
                                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                                            className="mt-3 text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1.5 group"
                                        >
                                            {showAllFeatures ? (
                                                <>
                                                    <span>Show less</span>
                                                    <IoArrowBack className="w-4 h-4 rotate-90 group-hover:-translate-y-0.5 transition-transform" />
                                                </>
                                            ) : (
                                                <>
                                                    <span>View {project.keyFeatures.length - 3} more</span>
                                                    <IoArrowBack className="w-4 h-4 -rotate-90 group-hover:translate-y-0.5 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="mb-8 overflow-x-hidden animate-fade-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        {/* Premium Tabs */}
                        <div className="flex flex-wrap gap-2 p-2 glass-ultra rounded-2xl mb-6 w-fit border border-white/10 shadow-lg shadow-black/10">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'overview'
                                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-color-text-muted hover:text-color-text hover:bg-white/10'
                                    }`}
                            >
                                Overview
                            </button>

                            {(project.challenges || project.solutions) && (
                                <button
                                    onClick={() => setActiveTab('challenges')}
                                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'challenges'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/10'
                                        }`}
                                >
                                    Case Study
                                </button>
                            )}

                            {project.technologies && (
                                <button
                                    onClick={() => setActiveTab('technologies')}
                                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'technologies'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/10'
                                        }`}
                                >
                                    Technologies
                                </button>
                            )}

                            {project.testimonials && project.testimonials.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('testimonials')}
                                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'testimonials'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/10'
                                        }`}
                                >
                                    Testimonials
                                </button>
                            )}

                            {project.partners && project.partners.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('partners')}
                                    className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${activeTab === 'partners'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/10'
                                        }`}
                                >
                                    Partners
                                </button>
                            )}
                        </div>

                        <div className="prose prose-lg prose-invert max-w-none overflow-x-hidden">
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Render MDX for long description or fallback to regular description */}
                                    <div className="glass-ultra rounded-2xl p-8 md:p-10 markdown-content border border-white/10 shadow-xl shadow-black/10 shine-sweep">
                                        {serializedContent && project.longDescription ? (
                                            <MDXRemote {...serializedContent} components={mdxComponents} />
                                        ) : (
                                            <p className="text-color-text-muted leading-relaxed mb-4 text-lg">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'challenges' && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {project.challenges && (
                                        <div className="glass-ultra rounded-2xl p-8 border border-white/10 shadow-xl shadow-black/10">
                                            <h3 className="text-xl font-bold text-color-text mb-6 flex items-center gap-3">
                                                <div className="p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/20">
                                                    <IoCodeSlash className="w-5 h-5 text-red-400" />
                                                </div>
                                                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Challenges</span>
                                            </h3>
                                            <ul className="space-y-4 text-color-text-muted">
                                                {project.challenges.map((challenge, index) => (
                                                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl glass-frost border border-white/5 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300 leading-relaxed">
                                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 mt-2 flex-shrink-0 shadow-lg shadow-red-500/30" />
                                                        <span className="text-sm">{challenge}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {project.solutions && (
                                        <div className="glass-ultra rounded-2xl p-8 border border-white/10 shadow-xl shadow-black/10">
                                            <h3 className="text-xl font-bold text-color-text mb-6 flex items-center gap-3">
                                                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/20">
                                                    <IoCodeSlash className="w-5 h-5 text-green-400 transform rotate-180" />
                                                </div>
                                                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Solutions</span>
                                            </h3>
                                            <ul className="space-y-4 text-color-text-muted">
                                                {project.solutions.map((solution, index) => (
                                                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl glass-frost border border-white/5 hover:border-green-500/20 hover:bg-green-500/5 transition-all duration-300 leading-relaxed">
                                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2 flex-shrink-0 shadow-lg shadow-green-500/30" />
                                                        <span className="text-sm">{solution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'technologies' && project.technologies && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {project.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="glass-ultra rounded-2xl p-6 group shine-sweep relative overflow-hidden border border-white/10 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary-900/40 transition-all duration-300 animate-fade-up"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            {/* Gradient glow on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-500 rounded-2xl" />

                                            {/* Tech icon */}
                                            <div className="mb-4 relative z-10">
                                                <div className="relative w-14 h-14 flex items-center justify-center">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300" />
                                                    <TechIcon
                                                        name={tech.name}
                                                        className="w-9 h-9 text-primary-300 relative z-10 group-hover:text-primary-200 transition-colors duration-300"
                                                    />
                                                </div>
                                            </div>

                                            {/* Tech name and description */}
                                            <div className="relative z-10">
                                                <h3 className="font-bold text-xl text-color-text mb-2 group-hover:text-primary-300 transition-colors duration-300">{tech.name}</h3>
                                                {tech.description && (
                                                    <p className="text-sm text-color-text-muted leading-relaxed">{tech.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Testimonials Tab */}
                            {activeTab === 'testimonials' && project.testimonials && project.testimonials.length > 0 && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold flex items-center gap-3">
                                            <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/20">
                                                <IoChatbubbles className="w-5 h-5 text-primary-400" />
                                            </div>
                                            <span className="animated-gradient-text">Client Testimonials</span>
                                        </h3>
                                        {project.testimonials.length > 1 && (
                                            <div className="flex gap-3">
                                                {project.testimonials.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setActiveTestimonial(index)}
                                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial
                                                            ? "bg-gradient-to-r from-primary-400 to-accent-400 shadow-lg shadow-primary-500/50 scale-125"
                                                            : "bg-white/20 hover:bg-white/40"
                                                            }`}
                                                        aria-label={`View testimonial ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        className="glass-ultra rounded-2xl p-10 sm:p-12 relative overflow-hidden shine-sweep border border-white/10 shadow-2xl shadow-black/20 animate-fade-in"
                                        key={activeTestimonial}
                                    >
                                        {/* Decorative gradient orbs */}
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary-500/25 to-accent-500/15 rounded-full blur-[80px]" />
                                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-accent-500/20 to-primary-500/15 rounded-full blur-[60px]" />
                                        {/* Large quote mark backgrounds */}
                                        <div className="absolute top-8 left-8 text-9xl text-primary-500/15 font-serif leading-none">&quot;</div>
                                        <div className="absolute bottom-8 right-8 text-9xl text-primary-500/15 font-serif leading-none rotate-180">&quot;</div>
                                        <div className="relative z-10">
                                            <blockquote className="text-xl sm:text-2xl italic text-color-text font-light leading-relaxed mb-8 pl-8 pr-8">
                                                &quot;{project.testimonials[activeTestimonial].quote}&quot;
                                            </blockquote>
                                            <div className="flex items-center gap-5 mt-8">
                                                {/* Avatar with gradient */}
                                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-500/40">
                                                    <span className="text-2xl text-white font-bold">
                                                        {project.testimonials[activeTestimonial].author.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-color-text">
                                                        {project.testimonials[activeTestimonial].author}
                                                    </div>
                                                    {project.testimonials[activeTestimonial].position && (
                                                        <div className="text-sm text-color-text-muted">
                                                            {project.testimonials[activeTestimonial].position}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Partners Tab */}
                            {activeTab === 'partners' && project.partners && project.partners.length > 0 && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/20">
                                            <IoBusinessOutline className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold animated-gradient-text">Project Partners</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {project.partners.map((partner, index) => {
                                            const partnerData = typeof partner === 'string'
                                                ? { name: partner, url: undefined, description: undefined }
                                                : partner;

                                            return (
                                                <div
                                                    key={index}
                                                    className="glass-ultra rounded-2xl p-6 group shine-sweep relative overflow-hidden border border-white/10 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary-900/40 transition-all duration-300 animate-fade-up"
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    {/* Gradient glow on hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-500 rounded-2xl" />

                                                    <div className="relative z-10">
                                                        {/* Partner icon */}
                                                        <div className="mb-4">
                                                            <div className="relative w-14 h-14 flex items-center justify-center">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300" />
                                                                <IoBusinessOutline className="w-8 h-8 text-primary-300 relative z-10 group-hover:text-primary-200 transition-colors duration-300" />
                                                            </div>
                                                        </div>

                                                        {/* Partner name */}
                                                        {partnerData.url ? (
                                                            <a
                                                                href={partnerData.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="font-bold text-xl text-color-text mb-2 group-hover:text-primary-300 transition-colors duration-300 hover:underline block"
                                                            >
                                                                {partnerData.name}
                                                            </a>
                                                        ) : (
                                                            <h4 className="font-bold text-xl text-color-text mb-2 group-hover:text-primary-300 transition-colors duration-300">
                                                                {partnerData.name}
                                                            </h4>
                                                        )}

                                                        {/* Partner description */}
                                                        {partnerData.description && (
                                                            <p className="text-sm text-color-text-muted leading-relaxed">
                                                                {partnerData.description}
                                                            </p>
                                                        )}

                                                        {/* Visit link */}
                                                        {partnerData.url && (
                                                            <a
                                                                href={partnerData.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 mt-4 text-sm text-primary-400 hover:text-primary-300 transition-colors group/link"
                                                            >
                                                                <span>Visit Website</span>
                                                                <IoArrowBack className="w-3 h-3 rotate-180 group-hover/link:translate-x-1 transition-transform" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}