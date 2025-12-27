"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Referral, ReferralCategory } from '@/types/referrals';
import * as IoIcons from 'react-icons/io5';
import { IoClipboardOutline, IoCheckmarkOutline, IoArrowForward, IoSearchOutline, IoClose, IoSparkles, IoGiftOutline } from 'react-icons/io5';

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
        <section className="py-24 md:py-32 bg-bg min-h-screen relative z-10 overflow-hidden">
            {/* Premium multi-layer background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-aurora opacity-40"></div>
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            {/* Animated floating orbs */}
            <motion.div
                className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/5 blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-primary-400/15 to-transparent blur-[80px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <div className="container-section relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    {/* Premium Badge */}
                    <motion.div
                        className="flex justify-center mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 glass-frost rounded-full">
                            <IoGiftOutline className="w-4 h-4" />
                            Exclusive Offers
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="text-color-text">Referrals & </span>
                        <span className="animated-gradient-text text-shadow-glow">Offers</span>
                    </h1>
                    <p className="text-color-text-muted max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                        Use these referral links and promo codes to get discounts on products and services I recommend.
                        I may receive a commission or credit when you use these links at no extra cost to you.
                    </p>
                </motion.div>

                <div className="flex flex-col items-center mb-14">
                    {/* Premium Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative max-w-lg w-full mb-8"
                    >
                        <div className="relative glass-ultra rounded-2xl overflow-hidden">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-400">
                                <IoSearchOutline className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search referrals..."
                                className="w-full pl-14 pr-12 py-4 bg-transparent border-0 text-color-text placeholder:text-color-text-muted text-sm focus:ring-0 focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg glass-frost text-color-text-muted hover:text-primary-400 transition-colors"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                >
                                    <IoClose className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Premium Category tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-3 p-3 rounded-2xl glass-ultra"
                    >
                        <button
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2
                                ${activeCategory === null
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                                    : 'text-color-text-muted hover:text-color-text glass-frost hover:scale-105'
                                }`}
                            onClick={() => setActiveCategory(null)}
                        >
                            <IoSparkles className="w-4 h-4" />
                            All Referrals
                        </button>

                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2
                                    ${activeCategory === category.id
                                        ? 'bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-lg shadow-primary-500/30'
                                        : 'text-color-text-muted hover:text-color-text glass-frost hover:scale-105'
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
                        className="text-center p-16 glass-ultra rounded-3xl"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass-frost flex items-center justify-center">
                            <IoSearchOutline className="w-10 h-10 text-primary-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No referrals found</h3>
                        <p className="text-color-text-muted mb-8 text-lg">
                            Try adjusting your search or selecting a different category.
                        </p>
                        <div className="flex justify-center gap-4">
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-3 rounded-xl font-semibold glass-frost text-primary-400 hover:scale-105 transition-all duration-300"
                                >
                                    Clear Search
                                </button>
                            )}
                            {activeCategory !== null && (
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="relative px-6 py-3 rounded-xl font-semibold overflow-hidden shine-sweep"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                                    <span className="relative z-10 text-white">Show All Referrals</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

// Enhanced ReferralCard component with premium glassmorphism
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
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 }
            }}
            className="flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            <div className="relative h-full overflow-hidden rounded-2xl glass-ultra transition-all duration-500 group">
                {/* Animated glow border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Spotlight effect */}
                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

                {/* New badge */}
                {referral.new && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 glass-frost text-primary-300 text-xs font-semibold rounded-full">
                        ✨ New
                    </div>
                )}

                {/* Banner image section */}
                <div className="relative aspect-video overflow-hidden">
                    {referral.bannerImage && !imageError ? (
                        <>
                            <Image
                                src={referral.bannerImage}
                                alt={`${referral.title} banner`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={() => setImageError(true)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent"></div>

                            {/* Shine sweep effect */}
                            <div className="absolute inset-0 shine-sweep opacity-0 group-hover:opacity-100"></div>
                        </>
                    ) : (
                        // Premium fallback gradient background
                        <div className="w-full h-full bg-gradient-to-br from-primary-900/40 to-bg relative">
                            <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="px-6 py-3 rounded-xl glass-frost text-lg font-bold text-primary-300">
                                    {referral.company}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20 px-4 py-2 glass-frost text-primary-300 text-xs font-semibold rounded-full">
                        {referral.categoryName}
                    </div>
                </div>

                <div className="p-6 relative z-10">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-color-text group-hover:text-primary-300 transition-colors mb-3">
                        {referral.title}
                    </h2>

                    {/* Description */}
                    <p className="text-color-text-muted mb-5 line-clamp-3 leading-relaxed">
                        {referral.description}
                    </p>

                    {/* Discount highlight */}
                    {referral.discount && (
                        <div className="mb-5 px-4 py-3 glass-frost rounded-xl relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-400 rounded-r"></div>
                            <p className="text-primary-300 font-semibold pl-2">{referral.discount}</p>
                        </div>
                    )}

                    {/* Benefits list */}
                    {referral.benefits && referral.benefits.length > 0 && (
                        <div className="mb-5">
                            <p className="text-sm text-color-text-muted mb-2 font-semibold">Benefits:</p>
                            <ul className="space-y-2 text-sm">
                                {referral.benefits.slice(0, 2).map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary-400 mt-0.5 flex-shrink-0">•</span>
                                        <span className="text-color-text-muted">{benefit}</span>
                                    </li>
                                ))}
                                {referral.benefits.length > 2 && (
                                    <li className="text-xs text-primary-400 pl-4 font-semibold">
                                        +{referral.benefits.length - 2} more benefits
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Promo code */}
                    {referral.code && (
                        <div className="mb-6">
                            <p className="text-sm text-color-text-muted mb-2 font-semibold">Promo Code:</p>
                            <div className="flex">
                                <div className="flex-grow px-4 py-3 glass-frost rounded-l-xl font-mono text-primary-300 flex items-center justify-center tracking-wider font-semibold">
                                    {referral.code}
                                </div>
                                <button
                                    onClick={() => onCopyCode(referral.code!)}
                                    className={`px-4 py-3 rounded-r-xl transition-all duration-300 flex items-center justify-center ${copiedCode === referral.code
                                        ? 'bg-green-500/20 text-green-300'
                                        : 'bg-primary-500/20 hover:bg-primary-500/30 text-primary-300'
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

                    {/* Premium Get Offer button */}
                    <motion.a
                        href={referral.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold overflow-hidden shine-sweep"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></span>
                        <span className="relative z-10 flex items-center gap-2 text-white">
                            Get Offer
                            <IoArrowForward className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
