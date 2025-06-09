"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { LinkHubProfile, LinkItem, SocialLink } from '@/types/links';
import * as IoIcons from 'react-icons/io5';
import { IoArrowForward } from 'react-icons/io5';
import PlaylistSection from './PlaylistSection';
import { Profile, Playlist } from '@/data/linksData';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';

interface LinkHubContentProps {
    profile: Profile;
    playlist: Playlist;
}

export default function LinkHubContent({ profile, playlist }: LinkHubContentProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

    // Get the dynamic icon component
    const getIconComponent = (iconName: string) => {
        const IconComponent = (IoIcons as any)[iconName];
        if (IconComponent) {
            return <IconComponent className="w-5 h-5" />;
        }
        return null;
    };

    // Filter links by active category
    const visibleLinks = activeCategory
        ? profile.categories.find(cat => cat.id === activeCategory)?.links || []
        : profile.featuredLinks;

    return (
        <section className="py-16 sm:py-20 bg-bg-alt min-h-screen flex flex-col items-center relative">
            <BackgroundEffects />

            {/* Background gradient overlay */}
            <div className="container max-w-xl mx-auto px-4 relative z-10">
                <div className="relative z-10">
                    {/* Profile section */}
                    <motion.div
                        className="flex flex-col items-center text-center mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="relative mb-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-500/30 relative z-10">
                                <Image
                                    src={profile.avatar}
                                    alt={profile.name}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Glow effect behind avatar */}
                            <div className="absolute -inset-1 bg-primary-500/20 rounded-full blur-xl z-0"></div>

                            {/* Discord status indicator */}
                            {profile.discord && (
                                <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-bg-alt z-20
                                        ${profile.discord.status === 'online' ? 'bg-green-500' :
                                        profile.discord.status === 'idle' ? 'bg-yellow-500' :
                                            profile.discord.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'}`}>
                                </div>
                            )}
                        </div>

                        <h1 className="text-2xl font-bold text-color-text mb-1">{profile.name}</h1>
                        <p className="text-primary-400 mb-4">{profile.title}</p>

                        <p className="text-color-text-muted max-w-md">{profile.bio}</p>

                        {/* Social links */}
                        <div className="flex flex-wrap justify-center gap-3 mt-5">
                            {profile.socialLinks.map(social => (
                                <SocialButton key={social.id} social={social} getIconComponent={getIconComponent} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Category filter - Modified to include playlist tab */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                    ${activeCategory === null && !showPlaylist
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                }`}
                            onClick={() => {
                                setActiveCategory(null);
                                setShowPlaylist(false);
                            }}
                        >
                            Featured
                        </button>

                        {profile.categories.map(category => (
                            <button
                                key={category.id}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                        ${activeCategory === category.id && !showPlaylist
                                        ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                        : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                    }`}
                                onClick={() => {
                                    setActiveCategory(category.id);
                                    setShowPlaylist(false);
                                }}
                            >
                                {category.name}
                            </button>
                        ))}

                        {/* Playlist Tab */}
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                    ${showPlaylist
                                    ? 'bg-primary-800/40 text-primary-300 border border-primary-700/40'
                                    : 'bg-card text-color-text-muted border border-color-border hover:bg-card-alt'
                                }`}
                            onClick={() => setShowPlaylist(true)}
                        >
                            My Playlist
                        </button>
                    </motion.div>

                    {/* Content Area - Either Links or Playlist */}
                    {!showPlaylist ? (
                        /* Links list */
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {visibleLinks.map((link, index) => (
                                <LinkCard
                                    key={link.id}
                                    link={link}
                                    index={index}
                                    getIconComponent={getIconComponent}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        /* Playlist Section */
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <PlaylistSection playlist={playlist} />
                        </motion.div>
                    )}

                    {/* Back to website link */}
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                        >
                            Back to Website
                            <IoArrowForward className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}

// Social button component
function SocialButton({ social, getIconComponent }: { social: SocialLink, getIconComponent: (iconName: string) => JSX.Element | null }) {
    return (
        <motion.a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-transform hover:scale-110 ${social.color || 'bg-primary-800/40'}`}
            title={social.title}
            whileHover={{
                boxShadow: '0 0 15px rgba(var(--color-primary-500), 0.5)',
                y: -2
            }}
            whileTap={{ scale: 0.95 }}
        >
            {social.icon && getIconComponent(social.icon)}
        </motion.a>
    );
}

// Link card component with enhanced animations
function LinkCard({
    link,
    index,
    getIconComponent
}: {
    link: LinkItem,
    index: number,
    getIconComponent: (iconName: string) => JSX.Element | null
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={link.url}
            target={link.url.startsWith('http') ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="relative overflow-hidden rounded-xl bg-card border border-color-border hover:border-primary-700/40 transition-all duration-300 group animated-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                y: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Top gradient accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-primary-400 opacity-60 group-hover:opacity-100 transition-opacity"></div>

            <div className="p-4 flex items-center">
                {link.icon && (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${link.color || 'bg-primary-800/40'} transition-transform group-hover:scale-110 duration-300`}>
                        {getIconComponent(link.icon)}
                    </div>
                )}

                <div className="flex-grow">
                    <motion.h3
                        className="font-medium text-lg text-color-text group-hover:text-primary-300 transition-colors"
                        animate={isHovered ? { scale: 1.01 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {link.title}
                    </motion.h3>

                    {link.description && (
                        <p className="text-sm text-color-text-muted line-clamp-1">{link.description}</p>
                    )}
                </div>

                <motion.div
                    className="ml-2"
                    animate={isHovered ? { x: 3 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoArrowForward className={`w-4 h-4 text-primary-400 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
                </motion.div>
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
        </motion.a>
    );
}
