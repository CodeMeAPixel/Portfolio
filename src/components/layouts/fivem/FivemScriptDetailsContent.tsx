"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

import {
    IoArrowBack, IoCalendarOutline, IoCheckmarkCircle, IoCodeSlashOutline,
    IoLogoGithub, IoPricetagOutline, IoTimeOutline, IoChevronDown, IoChevronUp,
    IoLinkOutline, IoInformationCircleOutline
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
        <section className="py-24 bg-bg-alt relative z-10">
            <div className="container-section max-w-6xl">
                <Link
                    href="/fivem"
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
                >
                    <IoArrowBack className="w-4 h-4" />
                    <span>Back to all scripts</span>
                </Link>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left column - Images and quick info */}
                    <motion.div
                        className="md:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Script title and status */}
                        <div className="flex flex-wrap justify-between items-start mb-6">
                            <h1 className="heading-primary mb-2 sm:mb-0">
                                {script.title}
                            </h1>
                            <StatusBadge status={script.status} />
                        </div>

                        {/* Image carousel - Improved for FiveM screenshots */}
                        <div className="aspect-video relative w-full">
                            <ImageCarousel images={script.images} className="w-full h-full" />
                        </div>

                        {/* Tabs for description, installation, etc. */}
                        <div className="mb-8">
                            <div className="flex border-b border-color-border mb-6">
                                <button
                                    className={`px-4 py-2 font-medium text-sm ${activeTab === 'description' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-color-text-muted hover:text-color-text'
                                        }`}
                                    onClick={() => setActiveTab('description')}
                                >
                                    Description
                                </button>
                                {script.installation && (
                                    <button
                                        className={`px-4 py-2 font-medium text-sm ${activeTab === 'installation' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-color-text-muted hover:text-color-text'
                                            }`}
                                        onClick={() => setActiveTab('installation')}
                                    >
                                        Installation
                                    </button>
                                )}
                                {script.requirements && (
                                    <button
                                        className={`px-4 py-2 font-medium text-sm ${activeTab === 'requirements' ? 'text-primary-400 border-b-2 border-primary-500' : 'text-color-text-muted hover:text-color-text'
                                            }`}
                                        onClick={() => setActiveTab('requirements')}
                                    >
                                        Requirements
                                    </button>
                                )}
                            </div>

                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'description' && (
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-color-text-muted">{script.longDescription}</p>
                                    </div>
                                )}

                                {activeTab === 'installation' && script.installation && (
                                    <div className="prose prose-invert max-w-none">
                                        <ol className="space-y-2 text-color-text-muted">
                                            {script.installation.split('\n').map((step, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-900/30 text-primary-300 text-xs font-medium flex-shrink-0 mt-0.5">
                                                        {index + 1}
                                                    </span>
                                                    <span>{step.replace(/^\d+\.\s+/, '')}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}

                                {activeTab === 'requirements' && script.requirements && (
                                    <div className="prose prose-invert max-w-none">
                                        <ul className="space-y-2 text-color-text-muted">
                                            {script.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Feature list */}
                        <div className="card mb-8">
                            <h2 className="heading-secondary mb-4 flex items-center gap-2">
                                <IoInformationCircleOutline className="text-primary-400 text-2xl" />
                                Features
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {script.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-color-text-muted">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Embedded video if available */}
                        {script.video && (
                            <div className="mb-8">
                                <h2 className="heading-secondary mb-4">Video Preview</h2>
                                <div className="relative pt-[56.25%] rounded-xl overflow-hidden border border-color-border">
                                    <iframe
                                        className="absolute inset-0 w-full h-full"
                                        src={script.video}
                                        title={`${script.title} preview`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right column - Purchase info, details, etc. */}
                    <motion.div
                        className="md:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Purchase card */}
                        <div className="card mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-color-text">{script.price}</h3>
                                <div className="text-color-text-muted text-sm">v{script.version}</div>
                            </div>

                            {script.status === 'Released' && script.links.purchase && (
                                <a
                                    href={script.links.purchase}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
                                >
                                    <IoPricetagOutline className="w-5 h-5" />
                                    <span>Purchase Now</span>
                                </a>
                            )}

                            {script.status === 'In Development' && (
                                <div className="btn-secondary w-full flex items-center justify-center gap-2 mb-4 cursor-not-allowed opacity-80">
                                    <span>Coming Soon</span>
                                </div>
                            )}

                            {script.links.demo && (
                                <a
                                    href={script.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary w-full flex items-center justify-center gap-2 mb-4"
                                >
                                    <span>Watch Demo</span>
                                </a>
                            )}

                            {script.links.github && (
                                <a
                                    href={script.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-color-text-muted hover:text-primary-400 transition-colors mb-4"
                                >
                                    <IoLogoGithub className="w-5 h-5" />
                                    <span>View on GitHub</span>
                                </a>
                            )}

                            {script.links.documentation && (
                                <a
                                    href={script.links.documentation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-color-text-muted hover:text-primary-400 transition-colors"
                                >
                                    <IoLinkOutline className="w-5 h-5" />
                                    <span>Documentation</span>
                                </a>
                            )}
                        </div>

                        {/* Script details */}
                        <div className="card mb-6">
                            <h3 className="font-semibold text-lg text-color-text mb-4">Script Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <IoCodeSlashOutline className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Framework</div>
                                        <div className="text-color-text-muted">{script.framework}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <IoCalendarOutline className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Last Updated</div>
                                        <div className="text-color-text-muted">{script.lastUpdated}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <IoTimeOutline className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-medium text-color-text">Status</div>
                                        <div className="text-color-text-muted">{script.status}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Requirements (collapsible on mobile) */}
                        {script.requirements && (
                            <div className="card md:hidden mb-6">
                                <button
                                    className="w-full flex items-center justify-between"
                                    onClick={() => setIsRequirementsExpanded(!isRequirementsExpanded)}
                                >
                                    <h3 className="font-semibold text-lg text-color-text">Requirements</h3>
                                    {isRequirementsExpanded ? (
                                        <IoChevronUp className="w-5 h-5 text-primary-400" />
                                    ) : (
                                        <IoChevronDown className="w-5 h-5 text-primary-400" />
                                    )}
                                </button>

                                {isRequirementsExpanded && (
                                    <div className="mt-4 space-y-2">
                                        {script.requirements.map((req, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-color-text-muted">{req}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tags */}
                        <div className="card">
                            <h3 className="font-semibold text-lg text-color-text mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {script.tags.map(tag => (
                                    <span key={tag} className="tag bg-primary-900/30 border-primary-700/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StatusBadge({ status }: { status: FivemScript['status'] }) {
    let bgColor = 'bg-primary-900/30';
    let textColor = 'text-primary-300';
    let borderColor = 'border-primary-700/30';

    if (status === 'Released') {
        bgColor = 'bg-green-900/30';
        textColor = 'text-green-300';
        borderColor = 'border-green-700/30';
    } else if (status === 'In Development') {
        bgColor = 'bg-amber-900/30';
        textColor = 'text-amber-300';
        borderColor = 'border-amber-700/30';
    } else if (status === 'Coming Soon') {
        bgColor = 'bg-purple-900/30';
        textColor = 'text-purple-300';
        borderColor = 'border-purple-700/30';
    }

    return (
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${bgColor} ${textColor} ${borderColor} border`}>
            {status}
        </span>
    );
}
