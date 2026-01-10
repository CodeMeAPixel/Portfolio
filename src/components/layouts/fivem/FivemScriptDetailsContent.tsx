"use client";

import { useState } from 'react';
import Link from 'next/link';

import {
    IoArrowBack, IoCalendarOutline, IoCheckmarkCircle, IoCodeSlashOutline,
    IoLogoGithub, IoPricetagOutline, IoTimeOutline, IoChevronDown, IoChevronUp,
    IoLinkOutline, IoSparkles, IoPlayCircle, IoDocumentText, IoWarning,
    IoAlertCircle, IoList
} from 'react-icons/io5';

import type { FivemScript } from '@/types/fivem';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { FivemMarkdown } from '@/components/fivem/FivemMarkdown';

interface FivemScriptDetailsContentProps {
    script: FivemScript;
}

type ContentTab = 'overview' | 'features' | 'video' | 'installation' | 'requirements';

export default function FivemScriptDetailsContent({ script }: FivemScriptDetailsContentProps) {
    const [activeTab, setActiveTab] = useState<ContentTab>('overview');
    const [isRequirementsExpanded, setIsRequirementsExpanded] = useState(false);

    // Determine available tabs
    const tabs: { id: ContentTab; label: string; icon: React.ReactNode; available: boolean }[] = [
        { id: 'overview', label: 'Overview', icon: <IoDocumentText className="w-4 h-4" />, available: true },
        { id: 'features', label: 'Features', icon: <IoSparkles className="w-4 h-4" />, available: script.features.length > 0 },
        { id: 'video', label: 'Video Preview', icon: <IoPlayCircle className="w-4 h-4" />, available: !!script.video },
        { id: 'installation', label: 'Installation', icon: <IoList className="w-4 h-4" />, available: !!script.installation },
        { id: 'requirements', label: 'Requirements', icon: <IoCheckmarkCircle className="w-4 h-4" />, available: !!script.requirements?.length },
    ];

    const availableTabs = tabs.filter(tab => tab.available);

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
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-primary-500/15 to-purple-500/10 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/15 rounded-full blur-3xl animate-float-medium" />
            </div>

            <div className="relative z-10 container-section max-w-6xl py-16 md:py-24 overflow-x-hidden">
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

                {/* Deprecated Warning Banner */}
                {script.deprecated && (
                    <div className="mb-6 md:mb-8 animate-fade-in">
                        <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/10 via-red-600/5 to-red-500/10 p-4 md:p-6">
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                            <div className="relative flex items-start gap-3 md:gap-4">
                                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-red-500/20 border border-red-500/30 flex-shrink-0">
                                    <IoWarning className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base md:text-lg font-bold text-red-400 mb-1">Deprecated Script</h3>
                                    <p className="text-sm md:text-base text-red-300/80 break-words">
                                        {script.deprecatedMessage || "This script is no longer actively maintained and may not receive future updates or support."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 overflow-hidden">
                    {/* Left column - Images and content tabs */}
                    <div className="md:col-span-2 animate-fade-in-up min-w-0">
                        {/* Script title and status */}
                        <div className="flex flex-wrap justify-between items-start mb-6 gap-3 md:gap-4">
                            <div className="flex items-center gap-2 md:gap-3 flex-wrap min-w-0">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up break-words">
                                    <span className="animated-gradient-text text-shadow-glow">{script.title}</span>
                                </h1>
                                {script.deprecated && (
                                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                                        DEPRECATED
                                    </span>
                                )}
                            </div>
                            <StatusBadge status={script.status} deprecated={script.deprecated} />
                        </div>

                        {/* Image carousel - Premium Glass Container */}
                        <div
                            className="aspect-video relative w-full glass-ultra rounded-2xl overflow-hidden p-1 mb-8 animate-fade-in-up"
                            style={{ animationDelay: '100ms' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />
                            <ImageCarousel images={script.images} title={script.title} className="w-full h-full rounded-xl" />
                            {script.deprecated && (
                                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-xs font-bold flex items-center gap-1.5 z-10">
                                    <IoWarning className="w-3.5 h-3.5" />
                                    Deprecated
                                </div>
                            )}
                        </div>

                        {/* Premium Content Tabs */}
                        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            {/* Tab Navigation */}
                            <div className="flex flex-wrap gap-2 p-2 glass-ultra rounded-2xl mb-6">
                                {availableTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm rounded-xl transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                                            : 'text-color-text-muted hover:text-color-text hover:bg-white/5'
                                            }`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.icon}
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="glass-ultra rounded-2xl p-4 sm:p-6 min-h-[300px] animate-fade-in overflow-hidden">
                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex-shrink-0">
                                                <IoDocumentText className="text-primary-400 text-lg sm:text-xl" />
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-color-text">Description</h2>
                                        </div>
                                        <div className="prose prose-invert max-w-none overflow-hidden">
                                            <FivemMarkdown content={script.longDescription} />
                                        </div>

                                        {/* Quick highlights */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/10">
                                            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                <div className="text-xs sm:text-sm text-color-text-muted mb-1">Framework</div>
                                                <div className="font-semibold text-color-text text-sm sm:text-base">{script.framework}</div>
                                            </div>
                                            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                <div className="text-xs sm:text-sm text-color-text-muted mb-1">Version</div>
                                                <div className="font-semibold text-color-text text-sm sm:text-base">v{script.version}</div>
                                            </div>
                                            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                                <div className="text-xs sm:text-sm text-color-text-muted mb-1">Last Updated</div>
                                                <div className="font-semibold text-color-text text-sm sm:text-base">{script.lastUpdated}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Features Tab */}
                                {activeTab === 'features' && (
                                    <div>
                                        <div className="flex items-center gap-2 sm:gap-3 mb-6 flex-wrap">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex-shrink-0">
                                                <IoSparkles className="text-primary-400 text-lg sm:text-xl" />
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-color-text">Features</h2>
                                            <span className="px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300">
                                                {script.features.length} features
                                            </span>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {script.features.map((feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group animate-fade-in border border-transparent hover:border-primary-500/20"
                                                    style={{ animationDelay: `${index * 50}ms` }}
                                                >
                                                    <div className="p-1.5 rounded-lg bg-green-500/20 group-hover:scale-110 transition-transform">
                                                        <IoCheckmarkCircle className="w-4 h-4 text-green-400" />
                                                    </div>
                                                    <span className="text-color-text-muted group-hover:text-color-text transition-colors">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Video Preview Tab */}
                                {activeTab === 'video' && script.video && (
                                    <div>
                                        <div className="flex items-center gap-2 sm:gap-3 mb-6">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex-shrink-0">
                                                <IoPlayCircle className="text-primary-400 text-lg sm:text-xl" />
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-color-text">Video Preview</h2>
                                        </div>
                                        <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black/20">
                                            <iframe
                                                className="absolute inset-0 w-full h-full rounded-xl"
                                                src={script.video}
                                                title={`${script.title} preview`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <p className="text-sm text-color-text-muted mt-4 text-center">
                                            Watch the full demonstration of {script.title} in action
                                        </p>
                                    </div>
                                )}

                                {/* Installation Tab */}
                                {activeTab === 'installation' && script.installation && (
                                    <div>
                                        <div className="flex items-center gap-2 sm:gap-3 mb-6">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex-shrink-0">
                                                <IoList className="text-primary-400 text-lg sm:text-xl" />
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-color-text">Installation Guide</h2>
                                        </div>
                                        <div className="space-y-3">
                                            {(() => {
                                                const steps = typeof script.installation === 'string'
                                                    ? script.installation.split('\n')
                                                    : (script.installation.steps || []);
                                                return steps.map((step, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group animate-fade-in border border-transparent hover:border-primary-500/20"
                                                        style={{ animationDelay: `${index * 75}ms` }}
                                                    >
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-color-text-muted group-hover:text-color-text transition-colors pt-1">{typeof step === 'string' ? step.replace(/^\d+\.\s+/, '') : step}</span>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {/* Requirements Tab */}
                                {activeTab === 'requirements' && script.requirements && (
                                    <div>
                                        <div className="flex items-center gap-2 sm:gap-3 mb-6 flex-wrap">
                                            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 flex-shrink-0">
                                                <IoCheckmarkCircle className="text-primary-400 text-lg sm:text-xl" />
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-bold text-color-text">Requirements</h2>
                                            <span className="px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300">
                                                {script.requirements.length} required
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {script.requirements.map((req, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group animate-fade-in border border-transparent hover:border-amber-500/20"
                                                    style={{ animationDelay: `${index * 75}ms` }}
                                                >
                                                    <div className="p-1.5 rounded-lg bg-amber-500/20 group-hover:scale-110 transition-transform">
                                                        <IoAlertCircle className="w-4 h-4 text-amber-400" />
                                                    </div>
                                                    <span className="text-color-text-muted group-hover:text-color-text transition-colors">{req}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right column - Purchase info, details, etc. */}
                    <div
                        className="md:col-span-1 space-y-4 md:space-y-6 animate-fade-in-up min-w-0"
                        style={{ animationDelay: '200ms' }}
                    >
                        {/* Purchase card - Premium */}
                        <div className={`glass-ultra rounded-xl md:rounded-2xl p-4 md:p-6 shine-sweep spotlight ${script.deprecated ? 'border border-red-500/20' : ''}`}>
                            <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
                                {script.price && <h3 className="text-xl md:text-2xl font-bold animated-gradient-text">{script.price}</h3>}
                                <span className="px-2 md:px-3 py-1 glass-frost rounded-full text-xs font-medium text-color-text-muted flex-shrink-0">
                                    v{script.version}
                                </span>
                            </div>

                            {script.deprecated ? (
                                <div className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/30 text-red-300 font-semibold rounded-xl mb-4">
                                    <IoWarning className="w-5 h-5" />
                                    <span>No Longer Available</span>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}

                            {script.links.demo && !script.deprecated && (
                                <a
                                    href={script.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 glass-frost text-color-text hover:bg-white/10 font-semibold rounded-xl transition-all duration-300 mb-4"
                                >
                                    <IoPlayCircle className="w-5 h-5" />
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
                                {script.author && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                            <IoCodeSlashOutline className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-color-text">Author</div>
                                            <div className="text-color-text-muted">{script.author}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                        <IoCodeSlashOutline className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Framework</div>
                                        <div className="text-color-text-muted">{script.framework}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                        <IoCalendarOutline className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Last Updated</div>
                                        <div className="text-color-text-muted">{script.lastUpdated}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="p-2 rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20">
                                        <IoTimeOutline className="w-5 h-5 text-primary-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Status</div>
                                        <div className={`${script.status === 'Archived' ? 'text-yellow-400' :
                                            script.deprecated ? 'text-red-400' :
                                                'text-color-text-muted'
                                            }`}>
                                            {script.status === 'Archived' ? 'Archived' : script.deprecated ? 'Deprecated' : script.status}
                                        </div>
                                    </div>
                                </div>

                                {script.deprecated && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <div className="p-2 rounded-lg bg-red-500/20">
                                            <IoWarning className="w-5 h-5 text-red-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-red-400">Deprecation Notice</div>
                                            <div className="text-red-300/80 text-sm">No longer maintained</div>
                                        </div>
                                    </div>
                                )}

                                {script.status === 'Archived' && !script.deprecated && (
                                    <div className="flex items-start gap-4 p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                                        <div className="p-2 rounded-lg bg-slate-500/20">
                                            <IoWarning className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-400">Archived</div>
                                            <div className="text-slate-300/80 text-sm">No longer actively developed</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Migration Guide Section - Only show for deprecated scripts with successors */}
                        {script.deprecated && script.links.successor && script.migrationGuide && (
                            <div className="glass-ultra rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                                        <IoSparkles className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-amber-400 mb-2">Successor Available</h3>
                                        <p className="text-sm text-amber-300/80 mb-4">
                                            This script has been replaced by <span className="font-semibold">{script.migrationGuide.successor}</span>, which offers improved features and continued support.
                                        </p>
                                        <a
                                            href={script.links.successor}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-amber-300 hover:text-amber-200 transition-all duration-300 font-medium text-sm"
                                        >
                                            <IoLogoGithub className="w-4 h-4" />
                                            <span>View {script.migrationGuide.successor}</span>
                                        </a>
                                    </div>
                                </div>
                                {script.migrationGuide.steps.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-amber-500/20">
                                        <div className="text-xs font-semibold text-amber-400 mb-2">Migration Steps</div>
                                        <ol className="space-y-1 text-xs text-amber-300/70">
                                            {script.migrationGuide.steps.map((step, index) => (
                                                <li key={index} className="flex gap-2">
                                                    <span className="font-semibold flex-shrink-0">{index + 1}.</span>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        )}

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

function StatusBadge({ status, deprecated }: { status: FivemScript['status']; deprecated?: boolean }) {
    if (deprecated) {
        return (
            <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25">
                Deprecated
            </span>
        );
    }

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
