export interface LinkItem {
    id: string;
    title: string;
    url: string;
    icon?: string; // Icon name for React Icons
    description?: string;
    color?: string; // Tailwind color class
    featured?: boolean;
    category?: string;
    new?: boolean; // Flag to highlight new links
}

export interface SocialLink extends LinkItem {
    username?: string;
    followers?: number; // Optional follower count for social platforms
}

export interface LinkCategory {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string; // Tailwind color class
    links: LinkItem[];
}

export interface DiscordStatus {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    status: 'online' | 'idle' | 'dnd' | 'offline';
    activity?: {
        name: string;
        type: string;
        url?: string;
        details?: string;
        state?: string;
        applicationId?: string;
        timestamps?: {
            start?: number;
            end?: number;
        };
    };
}

export interface LinkHubProfile {
    name: string;
    avatar: string;
    title: string;
    bio: string;
    discord?: DiscordStatus;
    featuredLinks: LinkItem[];
    socialLinks: SocialLink[];
    categories: LinkCategory[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioFile?: string;
  spotifyUrl?: string;
  genre?: string; // Add genre field
}

export interface Playlist {
  title: string;
  description: string;
  tracks: Track[];
}
