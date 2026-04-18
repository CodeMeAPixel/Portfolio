"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Referral, ReferralCategory } from '../../../types/referrals';
import * as IoIcons from 'react-icons/io5';
import { IoClipboardOutline, IoCheckmarkOutline, IoArrowForward, IoSearchOutline, IoClose, IoSparkles, IoGiftOutline, IoChevronDown } from 'react-icons/io5';

interface ReferralsContentProps {
    referrals: Referral[];
    categories: ReferralCategory[];
}

export default function ReferralsContent({ referrals, categories }: ReferralsContentProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
        <section className="pt-20 pb-24 md:pt-24 md:pb-32 bg-bg relative z-10 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-dot-pattern opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>

            <div className="container-section relative z-10">
                <div className="mb-16 text-center animate-fade-in">
                    {/* Premium Badge */}
                    <div className="flex justify-center mb-8 animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-300 border border-color-border bg-card/50 rounded-full">
                            <IoGiftOutline className="w-4 h-4" />
                            Exclusive Offers
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="text-color-text">Referrals & </span>
                        <span className="animated-gradient-text">Offers</span>
                    </h1>
                    <p className="text-color-text-muted max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                        Use these referral links and promo codes to get discounts on products and services I recommend.
                        I may receive a commission or credit when you use these links at no extra cost to you.
                    </p>
                </div>

                <div className="flex flex-col items-center mb-14">
                    {/* Premium Search bar */}
                    <div className="relative max-w-lg w-full mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="relative border border-color-border bg-card rounded-xl overflow-hidden">
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
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg border border-color-border bg-card text-color-text-muted hover:text-primary-400 transition-colors"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                >
                                    <IoClose className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Premium Category tabs - Mobile and Desktop */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        {/* Mobile: Custom Dropdown */}
                        <div className="md:hidden" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium border border-color-border bg-card rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 text-color-text"
                            >
                                <span className="flex items-center gap-2">
                                    {activeCategory === null ? (
                                        <>
                                            <IoSparkles className="w-4 h-4 text-primary-400" />
                                            All Categories
                                        </>
                                    ) : (
                                        <>
                                            {categories.find(c => c.id === activeCategory)?.icon && getIconComponent(categories.find(c => c.id === activeCategory)?.icon || '')}
                                            <span className="text-primary-300">{categories.find(c => c.id === activeCategory)?.name}</span>
                                        </>
                                    )}
                                </span>
                                <IoChevronDown className={`w-5 h-5 text-primary-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute left-4 right-4 mt-2 py-2 bg-card rounded-xl border border-color-border shadow-xl shadow-black/20 z-50 max-h-80 overflow-y-auto">
                                    <button
                                        onClick={() => { setActiveCategory(null); setIsDropdownOpen(false); }}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${activeCategory === null
                                            ? 'text-primary-300 bg-primary-500/10'
                                            : 'text-color-text-muted hover:text-color-text hover:bg-card-alt'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <IoSparkles className="w-4 h-4" />
                                            All Referrals
                                        </span>
                                        {activeCategory === null && <IoCheckmarkOutline className="w-4 h-4 text-primary-400" />}
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => { setActiveCategory(category.id); setIsDropdownOpen(false); }}
                                            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${activeCategory === category.id
                                                ? 'text-primary-300 bg-primary-500/10'
                                                : 'text-color-text-muted hover:text-color-text hover:bg-card-alt'
                                                }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                {category.icon && getIconComponent(category.icon)}
                                                {category.name}
                                            </span>
                                            {activeCategory === category.id && <IoCheckmarkOutline className="w-4 h-4 text-primary-400" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Desktop: Horizontal scrollable tabs */}
                        <div className="hidden md:flex items-center overflow-x-auto gap-2.5 pb-2 -mx-4 px-4 lg:-mx-0 lg:px-0">
                            <button
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 flex-shrink-0 group relative overflow-hidden
                                    ${activeCategory === null
                                        ? 'bg-primary-500 text-white'
                                        : 'text-color-text-muted hover:text-color-text border border-color-border hover:border-primary-500/20 hover:bg-card-alt'
                                    }`}
                                onClick={() => setActiveCategory(null)}
                            >
                                <IoSparkles className="w-4 h-4 flex-shrink-0" />
                                <span className="hidden lg:inline">All Referrals</span>
                                <span className="lg:hidden">All</span>
                            </button>

                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 flex-shrink-0 group relative overflow-hidden
                                        ${activeCategory === category.id
                                            ? 'bg-primary-500 text-white'
                                            : 'text-color-text-muted hover:text-color-text border border-color-border hover:border-primary-500/20 hover:bg-card-alt'
                                        }`}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    {category.icon && getIconComponent(category.icon)}
                                    <span className="hidden lg:inline">{category.name}</span>
                                    <span className="lg:hidden text-xs">{category.name.substring(0, 3)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Display referrals */}
                {filteredReferrals.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredReferrals.map((referral, index) => (
                            <ReferralCard
                                key={referral.id}
                                referral={referral}
                                index={index}
                                copiedCode={copiedCode}
                                onCopyCode={handleCopyCode}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-16 border border-color-border bg-card rounded-2xl animate-fade-in">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl border border-color-border bg-card flex items-center justify-center">
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
                                    className="px-6 py-3 rounded-xl font-semibold border border-color-border bg-card text-primary-400 hover:bg-card-alt active:scale-95 transition-all duration-300"
                                >
                                    Clear Search
                                </button>
                            )}
                            {activeCategory !== null && (
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="px-6 py-3 rounded-xl font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                                >
                                    Show All Referrals
                                </button>
                            )}
                        </div>
                    </div>
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
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="flex flex-col h-full animate-fade-in-up hover:-translate-y-2 transition-transform duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative h-full overflow-hidden rounded-2xl border border-color-border bg-card transition-all duration-500 group">
                {/* New badge */}
                {referral.new && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 border border-color-border bg-card/50 text-primary-300 text-xs font-semibold rounded-full">
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


                        </>
                    ) : (
                        // Premium fallback gradient background
                        <div className="w-full h-full bg-gradient-to-br from-primary-900/40 to-bg relative">
                            <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="px-6 py-3 rounded-xl border border-color-border bg-card text-lg font-bold text-primary-300">
                                    {referral.company}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-20 px-4 py-2 border border-color-border bg-card/50 text-primary-300 text-xs font-semibold rounded-full">
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
                        <div className="mb-5 px-4 py-3 border border-color-border bg-card rounded-xl relative overflow-hidden">
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
                                <div className="flex-grow px-4 py-3 border border-color-border bg-card rounded-l-xl font-mono text-primary-300 flex items-center justify-center tracking-wider font-semibold">
                                    {referral.code}
                                </div>
                                <button
                                    onClick={() => onCopyCode(referral.code!)}
                                    className={`px-4 py-3 rounded-r-xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 ${copiedCode === referral.code
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
                    <a
                        href={referral.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-color-border bg-card hover:bg-card-alt text-color-text-muted transition-colors"
                    >
                        Get Offer
                        <IoArrowForward className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
