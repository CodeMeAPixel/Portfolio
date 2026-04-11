"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoLogoDiscord, IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';

interface LanyardData {
    success: boolean;
    data: {
        discord_user: {
            username: string;
            discriminator: string;
            id: string;
            avatar: string;
            public_flags: number;
            flags: number;
            locale: string;
            mfa_enabled: boolean;
            avatar_decoration_data: string | null;
        };
        discord_status: 'online' | 'idle' | 'dnd' | 'offline';
        active_on_discord_web: boolean;
        active_on_discord_desktop: boolean;
        active_on_discord_mobile: boolean;
        activities: Array<{
            id: string;
            name: string;
            type: number;
            state?: string;
            details?: string;
            timestamps?: {
                start?: number;
                end?: number;
            };
            assets?: {
                large_image?: string;
                large_text?: string;
                small_image?: string;
                small_text?: string;
            };
            created_at: number;
            sync_id?: string;
            session_id?: string;
            party?: {
                id: string;
            };
            flags?: number;
            buttons?: Array<{
                label: string;
                url: string;
            }>;
        }>;
        spotify: null | {
            track_id: string;
            timestamps: {
                start: number;
                end: number;
            };
            song: string;
            artist: string;
            album_art_url: string;
            album: string;
        };
        listening_to_spotify: boolean;
    };
}

export default function DiscordPresence() {
    const [data, setData] = useState<LanyardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const DISCORD_USER_ID = '510065483693817867';

    useEffect(() => {
        const fetchDiscordStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
                if (!response.ok) throw new Error('Failed to fetch Discord status');
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                console.error('Discord Presence Error:', err);
                setError(err instanceof Error ? err.message : 'Failed to load Discord status');
            } finally {
                setLoading(false);
            }
        };

        fetchDiscordStatus();

        // Poll every 30 seconds for updates
        const interval = setInterval(fetchDiscordStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'idle': return 'bg-yellow-500';
            case 'dnd': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'online': return 'Online';
            case 'idle': return 'Idle';
            case 'dnd': return 'Do Not Disturb';
            default: return 'Offline';
        }
    };

    const getActivityEmoji = (type: number) => {
        switch (type) {
            case 0: return '🎮'; // Game
            case 1: return '🎙️'; // Streaming
            case 2: return '🎵'; // Listening
            case 3: return '👁️'; // Watching
            case 4: return '🎯'; // Custom
            case 5: return '🏷️'; // Competing
            default: return '📌';
        }
    };

    const getActivityTypeText = (type: number) => {
        switch (type) {
            case 0: return 'Playing';
            case 1: return 'Streaming';
            case 2: return 'Listening to';
            case 3: return 'Watching';
            case 4: return '';
            case 5: return 'Competing in';
            default: return 'Activity';
        }
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        if (minutes === 0) return `${seconds}s`;
        if (minutes < 60) return `${minutes}m`;
        return `${Math.floor(minutes / 60)}h`;
    };

    if (loading) {
        return (
            <div className="mb-24 animate-fade-up">
                <div className="p-8 rounded-2xl glass-ultra border border-white/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error || !data?.data) {
        return null; // Silently fail - don't show error state
    }

    const { discord_user, discord_status, activities, spotify } = data.data;
    const mainActivity = activities.find(a => a.type !== 4); // Filter out custom status
    const customStatus = activities.find(a => a.type === 4);

    // Support animated avatars (GIFs) - Discord uses 'a_' prefix for animated avatars
    const isAnimatedAvatar = discord_user.avatar.startsWith('a_');
    const avatarFormat = isAnimatedAvatar ? 'gif' : 'png';
    const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${avatarFormat}?size=512`;

    return (
        <div
            className="mb-24 animate-fade-up"
            style={{ animationDelay: '0.35s' }}
        >
            <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-xl glass-frost">
                    <IoLogoDiscord className="w-6 h-6 text-[#5865F2]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-color-text">Discord Presence</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent"></div>
            </div>

            <div className="relative p-6 md:p-8 rounded-2xl glass-ultra overflow-hidden transition-all duration-500 group hover:-translate-y-1.5">
                {/* Animated glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/0 via-[#5865F2]/10 to-[#5865F2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Spotlight effect */}
                <div className="absolute inset-0 spotlight opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Main Discord Info */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6 pb-6 border-b border-white/10">
                        {/* Avatar and Status */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#5865F2]/30">
                                    <Image
                                        src={avatarUrl}
                                        alt={discord_user.username}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                        unoptimized={isAnimatedAvatar}
                                    />
                                </div>
                                {/* Status indicator */}
                                <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-bg ${getStatusColor(discord_status)} flex items-center justify-center`}>
                                    {discord_status === 'online' && <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-color-text">{discord_user.username}</h3>
                                <span className="text-sm text-[#5865F2] font-semibold flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${getStatusColor(discord_status)}`}></span>
                                    {getStatusText(discord_status)}
                                </span>
                                <span className="text-xs text-color-text-muted mt-0.5">@{discord_user.username}#{discord_user.discriminator}</span>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <div className="flex gap-3 ml-auto">
                            <a
                                href="https://discord.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-lg glass-frost border border-[#5865F2]/30 text-[#5865F2] hover:bg-[#5865F2]/10 transition-all duration-300 text-sm font-semibold"
                            >
                                Message
                            </a>
                        </div>
                    </div>

                    {/* Activities Section */}
                    <div className="space-y-4">
                        {/* Spotify */}
                        {spotify && (
                            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 flex items-start gap-4">
                                <div className="text-2xl">🎵</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1">Listening to Spotify</div>
                                    <div className="text-sm font-bold text-color-text truncate">{spotify.song}</div>
                                    <div className="text-xs text-color-text-muted truncate">{spotify.artist}</div>
                                    <div className="text-xs text-color-text-muted mt-1">{spotify.album}</div>
                                </div>
                            </div>
                        )}

                        {/* Main Activity */}
                        {mainActivity && (
                            <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-400 flex items-start gap-4">
                                <div className="text-2xl">{getActivityEmoji(mainActivity.type)}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-1">
                                        {getActivityTypeText(mainActivity.type)} {mainActivity.name}
                                    </div>
                                    {mainActivity.details && (
                                        <div className="text-sm font-semibold text-color-text truncate">{mainActivity.details}</div>
                                    )}
                                    {mainActivity.state && (
                                        <div className="text-xs text-color-text-muted truncate">{mainActivity.state}</div>
                                    )}
                                    {mainActivity.timestamps?.start && (
                                        <div className="text-xs text-color-text-muted mt-1">
                                            {formatTime(Date.now() - mainActivity.timestamps.start)} elapsed
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Custom Status */}
                        {customStatus && (
                            <div className="p-4 rounded-xl bg-white/5 border border-primary-400 flex items-start gap-3">
                                <div className="text-lg">✨</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-color-text">{customStatus.state}</div>
                                </div>
                            </div>
                        )}

                        {/* No Activity */}
                        {!mainActivity && !spotify && (
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                                <span className="text-sm text-color-text-muted">No current activity</span>
                            </div>
                        )}
                    </div>

                    {/* Active On Badges */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                        {data.data.active_on_discord_web && (
                            <span className="text-xs font-semibold glass-frost text-primary-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <IoCheckmarkCircle className="w-3 h-3" />
                                Web
                            </span>
                        )}
                        {data.data.active_on_discord_desktop && (
                            <span className="text-xs font-semibold glass-frost text-primary-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <IoCheckmarkCircle className="w-3 h-3" />
                                Desktop
                            </span>
                        )}
                        {data.data.active_on_discord_mobile && (
                            <span className="text-xs font-semibold glass-frost text-primary-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <IoCheckmarkCircle className="w-3 h-3" />
                                Mobile
                            </span>
                        )}
                        {!data.data.active_on_discord_web && !data.data.active_on_discord_desktop && !data.data.active_on_discord_mobile && (
                            <span className="text-xs font-semibold glass-frost text-color-text-muted px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <IoEllipseOutline className="w-3 h-3" />
                                Offline
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
