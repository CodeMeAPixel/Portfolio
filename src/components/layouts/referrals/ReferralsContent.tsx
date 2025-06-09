"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Referral, ReferralCategory } from '@/types/referrals';
import * as IoIcons from 'react-icons/io5';
import { IoClipboardOutline, IoCheckmarkOutline, IoArrowForward, IoSearchOutline, IoClose } from 'react-icons/io5';

interface ReferralsContentProps {
    referrals: Referral[];
    categories: ReferralCategory[];
}

export default function ReferralsContent({ referrals, categories }: ReferralsContentProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Get the dynamic icon component
    const getIconComponent = (iconName: string) => {
        const IconComponent = (IoIcons as any)[iconName];
        if (IconComponent) {
            return <IconComponent className="w-5 h-5" />;
        }
        return null;
    };

    // Filter referrals based on active category and search query
    const filteredReferrals = referrals
        .filter(referral =>
            !activeCategory || referral.category === activeCategory
        )
        .filter(referral => {
            if (!searchQuery) return true;

            const query = searchQuery.toLowerCase();
            return (
                referral.title.toLowerCase().includes(query) ||
                referral.description.toLowerCase().includes(query) ||
                referral.company.toLowerCase().includes(query) ||
                (referral.code && referral.code.toLowerCase().includes(query))
            );
        });

    // Handle copy code to clipboard
    const handleCopyCode = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);

            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopiedCode(null);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    return (
        <section className="py-16 sm:py-24 bg-bg-alt min-h-screen relative z-10 overflow-hidden">
            {/* Background grid effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 pixel-grid-layer-1"></div>
                <div className="absolute inset-0 pixel-grid-layer-2"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute text-primary-900/5 text-[10rem] md:text-[16rem] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                />

                {/* Floating elements */}
                <motion.div
                    className="absolute top-[10%] right-[5%] w-72 h-72 bg-primary-500/5 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.div
                    className="absolute bottom-[15%] left-[10%] w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                />
            </div>

            <div className="container-section relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="heading-primary mb-4">Referrals & Offers</h1>
                    <p className="text-color-text-muted max-w-3xl mx-auto">
                        Use these referral links and promo codes to get discounts on products and services I recommend.
                        I may receive a commission or credit when you use these links at no extra cost to you.
                    </p>
                </motion.div>

                <div className="flex flex-col items-center mb-12">
                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative max-w-md w-full mb-6"
                    >
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-color-text-muted">
                            <IoSearchOutline className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search referrals..."
                            className="w-full pl-12 pr-10 py-3 rounded-xl bg-card border border-color-border text-color-text placeholder:text-color-text-muted text-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                        />
                        {searchQuery && (
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-color-text-muted hover:text-color-text"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search"
                            >
                                <IoClose className="w-5 h-5" />
                            </button>
                        )}
                    </motion.div>

                    {/* Category tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 mb-6"
                    >
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${activeCategory === null
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                }`}
                            onClick={() => setActiveCategory(null)}
                        >
                            All Referrals
                        </button>

                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
                                    ${activeCategory === category.id
                                        ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                        : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                    }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.icon && getIconComponent(category.icon)}
                                {category.name}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Display referrals */}
                {filteredReferrals.length > 0 ? (
                    <motion.div
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {filteredReferrals.map((referral, index) => (
                            <ReferralCard
                                key={referral.id}
                                referral={referral}
                                index={index}
                                copiedCode={copiedCode}
                                onCopyCode={handleCopyCode}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center p-10 bg-card border border-color-border rounded-xl"
                    >
                        <h3 className="text-xl font-semibold mb-2">No referrals found</h3>
                        <p className="text-color-text-muted mb-6">
                            Try adjusting your search or selecting a different category.
                        </p>
                        <div className="flex justify-center gap-4">
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="btn-secondary text-sm py-2"
                                >
                                    Clear Search
                                </button>
                            )}
                            {activeCategory !== null && (
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="btn-secondary text-sm py-2"
                                >
                                    Show All Referrals
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

// Enhanced ReferralCard component with more animation
function ReferralCard({
    referral,
    index,
    copiedCode,
    onCopyCode
}: {
    referral: Referral;
    index: number;
    copiedCode: string | null;
    onCopyCode: (code: string) => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            className="flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                y: -5,
                boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)'
            }}
        >
            <div className="relative h-full overflow-hidden rounded-xl bg-card border border-color-border animated-border transition-all duration-300 group hover:shadow-lg hover:shadow-primary-900/10">
                {/* Top gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity z-10"></div>

                {/* New badge */}
                {referral.new && (
                    <div className="absolute top-4 right-4 z-20 px-2 py-1 bg-primary-500/10 text-primary-300 text-xs font-medium rounded-md border border-primary-500/20">
                        New
                    </div>
                )}

                {/* Banner image section */}
                <div className="relative aspect-video bg-gradient-to-br from-card-alt to-card">
                    {referral.bannerImage && !imageError ? (
                        <>
                            <Image
                                src={referral.bannerImage}
                                alt={`${referral.title} banner`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={() => setImageError(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-70"></div>
                        </>
                    ) : (
                        // Fallback gradient background when no banner
                        <div className="w-full h-full bg-gradient-to-br from-card to-card-alt">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 left-0 w-40 h-40 bg-primary-500/5 rounded-full -translate-x-20 -translate-y-20"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full translate-x-16 translate-y-16"></div>

                            {/* Company name as text when no image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`px-6 py-3 rounded-lg text-lg font-bold ${referral.color || 'bg-primary-900/30 text-primary-300'
                                    }`}
                                    style={referral.color ? {
                                        backgroundColor: `var(--${referral.color.replace('bg-', '')})25`,
                                        color: `var(--${referral.color.replace('bg-', '')})`
                                    } : {}}
                                >
                                    {referral.company}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-card/90 backdrop-blur-sm text-color-text text-xs font-medium rounded-full border border-color-border">
                        {referral.categoryName}
                    </div>
                </div>

                <div className="p-6">
                    {/* Custom color accent based on referral.color if provided */}
                    {referral.color && (
                        <div
                            className="absolute top-1.5 right-0 w-1.5 h-16 rounded-l-md opacity-80 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: `var(--${referral.color.replace('bg-', '')})` }}
                        ></div>
                    )}

                    {/* Title */}
                    <motion.h2
                        className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors mb-2"
                        animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {referral.title}
                    </motion.h2>

                    {/* Description */}
                    <p className="text-color-text-muted mb-4 line-clamp-3">
                        {referral.description}
                    </p>

                    {/* Discount highlight with improved styling */}
                    {referral.discount && (
                        <div className="mb-4 px-4 py-3 bg-primary-900/20 border border-primary-800/30 rounded-lg relative overflow-hidden">
                            {/* Subtle accent */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500/50 rounded-r"></div>
                            <p className="text-primary-300 font-medium pl-2">{referral.discount}</p>
                        </div>
                    )}

                    {/* Benefits list - if available */}
                    {referral.benefits && referral.benefits.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm text-color-text-muted mb-2">Benefits:</p>
                            <ul className="space-y-1.5 text-sm">
                                {referral.benefits.slice(0, 2).map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                                        <span className="text-color-text-muted">{benefit}</span>
                                    </li>
                                ))}
                                {referral.benefits.length > 2 && (
                                    <li className="text-xs text-primary-400 pl-4">
                                        +{referral.benefits.length - 2} more benefits
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Promo code with improved styling */}
                    {referral.code && (
                        <div className="mb-6">
                            <p className="text-sm text-color-text-muted mb-2">Promo Code:</p>
                            <div className="flex">
                                <div className="flex-grow px-4 py-2 bg-card-alt border border-color-border rounded-l-lg font-mono text-primary-300 flex items-center justify-center tracking-wider">
                                    {referral.code}
                                </div>
                                <button
                                    onClick={() => onCopyCode(referral.code!)}
                                    className={`px-3 py-2 border border-primary-700/40 rounded-r-lg transition-colors flex items-center justify-center ${copiedCode === referral.code
                                        ? 'bg-green-800/40 text-green-300 border-green-700/40'
                                        : 'bg-primary-800/40 hover:bg-primary-800/60 text-primary-300'
                                        }`}
                                    title={copiedCode === referral.code ? "Copied!" : "Copy code"}
                                >
                                    {copiedCode === referral.code ? (
                                        <IoCheckmarkOutline className="w-5 h-5" />
                                    ) : (
                                        <IoClipboardOutline className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Visit button with enhanced animation */}
                    <motion.a
                        href={referral.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all text-primary-300 font-medium ${referral.color || 'bg-primary-900/20 border-primary-800/30 hover:bg-primary-800/30 hover:border-primary-700/40'
                            }`}
                        animate={isHovered ? { y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' } : { y: 0, boxShadow: '0 0px 0px rgba(0, 0, 0, 0)' }}
                        transition={{ duration: 0.2 }}
                        style={referral.color ? {
                            backgroundColor: `var(--${referral.color.replace('bg-', '')})15`,
                            borderColor: `var(--${referral.color.replace('bg-', '')})30`,
                        } : {}}
                        whileHover={referral.color ? {
                            backgroundColor: `var(--${referral.color.replace('bg-', '')})25`,
                            borderColor: `var(--${referral.color.replace('bg-', '')})40`,
                        } : {}}
                    >
                        Get Offer
                        <IoArrowForward className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </motion.a>
                </div>

                {/* Subtle hover glow effect */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        boxShadow: 'inset 0 0 20px rgba(var(--color-primary-500), 0.1)'
                    }}
                />

                {/* Subtle corner decoration */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-primary-500 rotate-45 translate-x-[10px] -translate-y-[10px]"></div>
                </div>
            </div>
        </motion.div>
    );
}
