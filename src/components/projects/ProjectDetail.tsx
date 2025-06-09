"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/types/project';
import { useState, useEffect } from 'react';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { IoArrowBack, IoCalendarOutline, IoCodeSlash, IoLogoGithub, IoGlobeOutline, IoDocumentText, IoPersonOutline, IoPeopleOutline } from 'react-icons/io5';
import { TechIcon } from '@/components/ui/TechIcon';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

interface ProjectDetailProps {
    project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'technologies'>('overview');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [serializedContent, setSerializedContent] = useState(null);
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
            <th className="px-4 py-2 text-left text-color-text font-medium border-b border-color-border" {...props} />
        ),
        td: (props: any) => (
            <td className="px-4 py-2 text-color-text-muted border-b border-color-border" {...props} />
        ),
    };

    return (
        <section className="py-16 sm:py-24 bg-bg-alt relative z-10 overflow-hidden">
            <BackgroundEffects />
            <div className="container-section max-w-6xl mx-auto px-4">
                <Link
                    href="/projects"
                    className="text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-2 mb-8"
                >
                    <IoArrowBack className="w-4 h-4 flex-shrink-0" />
                    <span>Back to all projects</span>
                </Link>

                <article className="w-full overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="heading-primary mb-4">{project.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 mb-8 text-color-text-muted">
                            {project.date && (
                                <div className="flex items-center gap-1.5">
                                    <IoCalendarOutline className="text-primary-400 w-4 h-4 flex-shrink-0" />
                                    <time className="text-sm">
                                        {new Date(project.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </time>
                                </div>
                            )}

                            {project.role && (
                                <div className="flex items-center gap-1.5">
                                    <IoPersonOutline className="text-primary-400 w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm">{project.role}</span>
                                </div>
                            )}

                            {project.teamSize && (
                                <div className="flex items-center gap-1.5">
                                    <IoPeopleOutline className="text-primary-400 w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm">Team of {project.teamSize}</span>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag bg-primary-900/30 border-primary-700/30 text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <motion.div
                            className="lg:col-span-2 rounded-xl border border-color-border shadow-lg self-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="aspect-video relative w-full overflow-hidden rounded-xl">
                                <ImageCarousel images={project.images} className="w-full h-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col gap-4 self-start"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="card flex-grow">
                                <h2 className="heading-secondary mb-4 text-xl">Project Links</h2>
                                <div className="flex flex-col gap-3">
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors p-2 rounded-lg bg-primary-900/20 hover:bg-primary-900/30"
                                        >
                                            <IoGlobeOutline className="w-5 h-5" />
                                            <span>Live Demo</span>
                                        </a>
                                    )}

                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors p-2 rounded-lg bg-primary-900/20 hover:bg-primary-900/30"
                                        >
                                            <IoLogoGithub className="w-5 h-5" />
                                            <span>Source Code</span>
                                        </a>
                                    )}

                                    {project.links.docs && (
                                        <a
                                            href={project.links.docs}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors p-2 rounded-lg bg-primary-900/20 hover:bg-primary-900/30"
                                        >
                                            <IoDocumentText className="w-5 h-5" />
                                            <span>Documentation</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {project.keyFeatures && (
                                <div className="card">
                                    <h2 className="heading-secondary mb-4 text-xl">Key Features</h2>
                                    <ul className="list-disc pl-5 text-color-text-muted space-y-2">
                                        {project.keyFeatures.slice(0, showAllFeatures ? project.keyFeatures.length : 2).map((feature, index) => (
                                            <li key={index} className="leading-relaxed">{feature}</li>
                                        ))}
                                    </ul>
                                    {project.keyFeatures.length > 2 && (
                                        <button
                                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                                            className="mt-3 text-sm text-primary-400 hover:text-primary-300 transition-colors underline"
                                        >
                                            {showAllFeatures ? 'Show less' : `View ${project.keyFeatures.length - 2} more`}
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-12 overflow-x-hidden"
                    >
                        <div className="flex border-b border-color-border mb-8">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview'
                                    ? 'border-primary-400 text-primary-300'
                                    : 'border-transparent text-color-text-muted hover:text-color-text'
                                    }`}
                            >
                                Overview
                            </button>

                            {(project.challenges || project.solutions) && (
                                <button
                                    onClick={() => setActiveTab('challenges')}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'challenges'
                                        ? 'border-primary-400 text-primary-300'
                                        : 'border-transparent text-color-text-muted hover:text-color-text'
                                        }`}
                                >
                                    Challenges & Solutions
                                </button>
                            )}

                            {project.technologies && (
                                <button
                                    onClick={() => setActiveTab('technologies')}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'technologies'
                                        ? 'border-primary-400 text-primary-300'
                                        : 'border-transparent text-color-text-muted hover:text-color-text'
                                        }`}
                                >
                                    Technologies
                                </button>
                            )}
                        </div>

                        <div className="prose prose-lg prose-invert max-w-none overflow-x-hidden">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Render MDX for long description or fallback to regular description */}
                                    <div className="markdown-content">
                                        {serializedContent && project.longDescription ? (
                                            <MDXRemote {...serializedContent} components={mdxComponents} />
                                        ) : (
                                            <p className="text-color-text-muted leading-relaxed mb-4">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Testimonials Section - Now supports multiple testimonials */}
                                    {project.testimonials && project.testimonials.length > 0 && (
                                        <div className="my-12">
                                            <h3 className="text-xl font-semibold text-primary-300 mb-6">Client Testimonials</h3>
                                            <div className="relative">
                                                {project.testimonials.length > 1 && (
                                                    <div className="absolute -top-10 right-0 flex gap-2">
                                                        {project.testimonials.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => setActiveTestimonial(index)}
                                                                className={`w-2.5 h-2.5 rounded-full transition-all ${index === activeTestimonial
                                                                    ? "bg-primary-400 hover:bg-primary-600/60"
                                                                    : "bg-primary-700/40 hover:bg-primary-600/60"
                                                                    }`}
                                                                aria-label={`View testimonial ${index + 1}`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                <motion.div
                                                    className="p-8 sm:p-10 bg-primary-900/10 border border-primary-900/50 rounded-xl relative overflow-hidden"
                                                    initial={{ opacity: 0.8, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5 }}
                                                    key={activeTestimonial}
                                                >
                                                    {/* Decorative elements */}
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full translate-x-16 -translate-y-16" />
                                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-500/5 rounded-full -translate-x-12 translate-y-12" />
                                                    {/* Large quote mark backgrounds - positioned further away from content */}
                                                    <div className="absolute top-6 left-6 text-9xl text-primary-500/10 font-serif leading-none opacity-50">&quot;</div>
                                                    <div className="absolute bottom-6 right-6 text-9xl text-primary-500/10 font-serif leading-none rotate-180 opacity-50">&quot;</div>
                                                    <div className="relative z-10">
                                                        {/* Added padding to prevent overlap with quote marks */}
                                                        <blockquote className="text-xl sm:text-2xl italic text-color-text font-light leading-relaxed mb-6 pl-10 pr-10">
                                                            &quot;{project.testimonials[activeTestimonial].quote}&quot;
                                                        </blockquote>
                                                        <div className="flex items-center gap-4 mt-8">
                                                            {/* Avatar placeholder */}
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/30 to-primary-700/30 flex items-center justify-center border border-primary-600/30">
                                                                <span className="text-xl text-primary-300 font-medium">
                                                                    {project.testimonials[activeTestimonial].author.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-primary-300">
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
                                                </motion.div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'challenges' && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    {project.challenges && (
                                        <div className="card">
                                            <h3 className="heading-secondary mb-4 flex items-center">
                                                <span className="p-2 mr-2 rounded-full bg-primary-900/30 text-primary-300">
                                                    <IoCodeSlash className="w-5 h-5" />
                                                </span>
                                                Challenges
                                            </h3>
                                            <ul className="list-disc pl-5 text-color-text-muted space-y-4">
                                                {project.challenges.map((challenge, index) => (
                                                    <li key={index} className="leading-relaxed">{challenge}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {project.solutions && (
                                        <div className="card">
                                            <h3 className="heading-secondary mb-4 flex items-center">
                                                <span className="p-2 mr-2 rounded-full bg-primary-900/30 text-primary-300">
                                                    <IoCodeSlash className="w-5 h-5 transform rotate-180" />
                                                </span>
                                                Solutions
                                            </h3>
                                            <ul className="list-disc pl-5 text-color-text-muted space-y-4">
                                                {project.solutions.map((solution, index) => (
                                                    <li key={index} className="leading-relaxed">{solution}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'technologies' && project.technologies && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                    {project.technologies.map((tech, index) => (
                                        <motion.div
                                            key={index}
                                            className="p-4 sm:p-6 rounded-xl bg-card-alt border border-color-border hover:border-primary-700/50 transition-all duration-300 group hover:bg-[rgba(var(--color-primary-900),0.2)] relative overflow-hidden"
                                            whileHover={{
                                                boxShadow: "0 10px 25px -5px rgba(var(--color-primary-900), 0.2)"
                                            }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            {/* Gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/0 to-primary-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {/* Tech icon */}
                                            <div className="mb-4 relative z-10">
                                                <div className="relative w-12 h-12 flex items-center justify-center">
                                                    <div className="absolute inset-0 bg-primary-900/20 rounded-xl transform rotate-45 group-hover:scale-110 transition-transform duration-300" />
                                                    <TechIcon
                                                        name={tech.name}
                                                        className="w-9 h-9 text-primary-300 relative z-10 group-hover:text-primary-400 transition-colors duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 rounded-xl blur-lg transition-all duration-300" />
                                                </div>
                                            </div>
                                            {/* Tech name and description */}
                                            <div className="relative z-10">
                                                <h3 className="font-bold text-xl text-primary-300 mb-2 group-hover:text-primary-200 transition-colors duration-300">{tech.name}</h3>
                                                {tech.description && (
                                                    <p className="text-sm text-color-text-muted leading-relaxed">{tech.description}</p>
                                                )}
                                            </div>
                                            {/* Decorative element */}
                                            <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary-500/5 rounded-tl-[40px] transform rotate-45 translate-x-8 translate-y-8 group-hover:bg-primary-500/10 transition-colors duration-300" />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </article>
            </div>
        </section>
    );
}