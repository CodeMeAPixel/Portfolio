"use client";

import { useState } from 'react';
import Link from 'next/link';

import {
    IoArrowBack, IoCalendarOutline, IoCheckmarkCircle, IoCodeSlashOutline,
    IoLogoGithub, IoPricetagOutline, IoTimeOutline, IoChevronDown, IoChevronUp,
    IoLinkOutline, IoSparkles
} from 'react-icons/io5';

import type { FivemScript } from '@/types/fivem';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

interface FivemScriptDetailsContentProps {
    script: FivemScript;
}

export default function FivemScriptDetailsContent({ script }: FivemScriptDetailsContentProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'installation' | 'requirements'>('description');
    const [isRequirementsExpanded, setIsRequirementsExpanded] = useState(false);

    return (
        <section className="py-24 md:py-32 bg-bg relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Floating Orbs - CSS animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-primary-500/15 to-purple-500/10 rounded-full blur-3xl animate-float-slow"
                />
                <div
                    className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/15 rounded-full blur-3xl animate-float-medium"
                />
            </div>

            <div className="relative z-10 container-section max-w-6xl py-24">
                {/* Back Button */}
                <div className="animate-fade-in">
                    <Link
                        href="/fivem"
                        className="inline-flex items-center gap-2 px-4 py-2 glass-frost rounded-full text-primary-400 hover:text-primary-300 hover:bg-white/10 transition-all duration-300 mb-8 group"
                    >
                        <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all scripts</span>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left column - Images and quick info */}
                    <div className="md:col-span-2 animate-fade-in-up">
                        {/* Script title and status */}
                        <div className="flex flex-wrap justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 animate-fade-in-up">
                                    <span className="animated-gradient-text text-shadow-glow">{script.title}</span>
                                </h1>
                            </div>
                            <StatusBadge status={script.status} />
                        </div>

                        {/* Image carousel - Premium Glass Container */}
                        <div
                            className="aspect-video relative w-full glass-ultra rounded-2xl overflow-hidden p-1 mb-8 animate-fade-in-up"
                            style={{ animationDelay: '100ms' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
                            <ImageCarousel images={script.images} className="w-full h-full rounded-xl" />
                        </div>

                        {/* Premium Tabs */}
                        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="flex gap-2 p-1.5 glass-frost rounded-xl mb-6">
                                <button
                                    className={`px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 ${activeTab === 'description'
                                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                        : 'text-color-text-muted hover:text-color-text hover:bg-white/5'
                                        }`}
                                    onClick={() => setActiveTab('description')}
                                >
                                    Description
                                </button>
                                {script.installation && (
                                    <button
                                        className={`px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 ${activeTab === 'installation'
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                            : 'text-color-text-muted hover:text-color-text hover:bg-white/5'
                                            }`}
                                        onClick={() => setActiveTab('installation')}
                                    >
                                        Installation
                                    </button>
                                )}
                                {script.requirements && (
                                    <button
                                        className={`px-4 py-2.5 font-medium text-sm rounded-lg transition-all duration-300 ${activeTab === 'requirements'
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                            : 'text-color-text-muted hover:text-color-text hover:bg-white/5'
                                            }`}
                                        onClick={() => setActiveTab('requirements')}
                                    >
                                        Requirements
                                    </button>
                                )}
                            </div>

                            <div className="glass-ultra rounded-xl p-6 animate-fade-in">
                                {activeTab === 'description' && (
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-color-text-muted leading-relaxed">{script.longDescription}</p>
                                    </div>
                                )}

                                {activeTab === 'installation' && script.installation && (
                                    <div className="prose prose-invert max-w-none">
                                        <ol className="space-y-3 text-color-text-muted">
                                            {script.installation.split('\n').map((step, index) => (
                                                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold flex-shrink-0">
                                                        {index + 1}
                                                    </span>
                                                    <span className="pt-0.5">{step.replace(/^\d+\.\s+/, '')}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}

                                {activeTab === 'requirements' && script.requirements && (
                                    <div className="prose prose-invert max-w-none">
                                        <ul className="space-y-3 text-color-text-muted">
                                            {script.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                                    <IoCheckmarkCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Feature list - Premium Card */}
                        <div
                            className="glass-ultra rounded-2xl p-6 mb-8 shine-sweep animate-fade-in-up"
                            style={{ animationDelay: '300ms' }}
                        >
                            <h2 className="text-xl font-bold text-color-text mb-6 flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                    <IoSparkles className="text-primary-400 text-xl" />
                                </div>
                                Features
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {script.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group animate-fade-in"
                                        style={{ animationDelay: `${400 + index * 50}ms` }}
                                    >
                                        <IoCheckmarkCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                        <span className="text-color-text-muted group-hover:text-color-text transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Embedded video if available */}
                        {script.video && (
                            <div
                                className="mb-8 animate-fade-in-up"
                                style={{ animationDelay: '400ms' }}
                            >
                                <h2 className="text-xl font-bold text-color-text mb-4">Video Preview</h2>
                                <div className="relative pt-[56.25%] glass-ultra rounded-2xl overflow-hidden p-1">
                                    <iframe
                                        className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-xl"
                                        src={script.video}
                                        title={`${script.title} preview`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right column - Purchase info, details, etc. */}
                    <div
                        className="md:col-span-1 space-y-6 animate-fade-in-up"
                        style={{ animationDelay: '200ms' }}
                    >
                        {/* Purchase card - Premium */}
                        <div className="glass-ultra rounded-2xl p-6 shine-sweep spotlight">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold animated-gradient-text">{script.price}</h3>
                                <span className="px-3 py-1 glass-frost rounded-full text-xs font-medium text-color-text-muted">
                                    v{script.version}
                                </span>
                            </div>

                            {script.status === 'Released' && script.links.purchase && (
                                <a
                                    href={script.links.purchase}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] transition-all duration-300 mb-4"
                                >
                                    <IoPricetagOutline className="w-5 h-5" />
                                    <span>Purchase Now</span>
                                </a>
                            )}

                            {script.status === 'In Development' && (
                                <div className="w-full flex items-center justify-center gap-2 px-6 py-3 glass-frost text-color-text-muted font-semibold rounded-xl cursor-not-allowed mb-4">
                                    <span>Coming Soon</span>
                                </div>
                            )}

                            {script.links.demo && (
                                <a
                                    href={script.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 glass-frost text-color-text hover:bg-white/10 font-semibold rounded-xl transition-all duration-300 mb-4"
                                >
                                    <span>Watch Demo</span>
                                </a>
                            )}

                            <div className="space-y-3 pt-2 border-t border-white/10">
                                {script.links.github && (
                                    <a
                                        href={script.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-color-text-muted hover:text-primary-400 transition-all duration-300 group"
                                    >
                                        <IoLogoGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>View on GitHub</span>
                                    </a>
                                )}

                                {script.links.documentation && (
                                    <a
                                        href={script.links.documentation}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-color-text-muted hover:text-primary-400 transition-all duration-300 group"
                                    >
                                        <IoLinkOutline className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Documentation</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Script details - Premium */}
                        <div className="glass-ultra rounded-2xl p-6">
                            <h3 className="font-bold text-lg text-color-text mb-6">Script Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                        <IoCodeSlashOutline className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Framework</div>
                                        <div className="text-color-text-muted">{script.framework}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                        <IoCalendarOutline className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Last Updated</div>
                                        <div className="text-color-text-muted">{script.lastUpdated}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                        <IoTimeOutline className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Status</div>
                                        <div className="text-color-text-muted">{script.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Requirements (collapsible on mobile) */}
                        {script.requirements && (
                            <div className="glass-ultra rounded-2xl p-6 md:hidden">
                                <button
                                    className="w-full flex items-center justify-between"
                                    onClick={() => setIsRequirementsExpanded(!isRequirementsExpanded)}
                                >
                                    <h3 className="font-bold text-lg text-color-text">Requirements</h3>
                                    <div className="p-2 rounded-lg bg-white/10">
                                        {isRequirementsExpanded ? (
                                            <IoChevronUp className="w-5 h-5 text-primary-400" />
                                        ) : (
                                            <IoChevronDown className="w-5 h-5 text-primary-400" />
                                        )}
                                    </div>
                                </button>

                                {isRequirementsExpanded && (
                                    <div className="mt-4 space-y-2 animate-fade-in">
                                        {script.requirements.map((req, index) => (
                                            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                                                <IoCheckmarkCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-color-text-muted">{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags - Premium */}
                        <div className="glass-ultra rounded-2xl p-6">
                            <h3 className="font-bold text-lg text-color-text mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {script.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 glass-frost rounded-full text-sm font-medium text-primary-300 border border-primary-500/20 hover:border-primary-500/40 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatusBadge({ status }: { status: FivemScript['status'] }) {
    let gradientFrom = 'from-primary-500';
    let gradientTo = 'to-accent-500';
    let shadowColor = 'shadow-primary-500/25';

    if (status === 'Released') {
        gradientFrom = 'from-green-500';
        gradientTo = 'to-emerald-500';
        shadowColor = 'shadow-green-500/25';
    } else if (status === 'In Development') {
        gradientFrom = 'from-amber-500';
        gradientTo = 'to-orange-500';
        shadowColor = 'shadow-amber-500/25';
    } else if (status === 'Coming Soon') {
        gradientFrom = 'from-purple-500';
        gradientTo = 'to-pink-500';
        shadowColor = 'shadow-purple-500/25';
    }

    return (
        <span className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-lg ${shadowColor}`}>
            {status}
        </span>
    );
}
