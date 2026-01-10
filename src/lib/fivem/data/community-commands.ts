import { FivemScript } from '@/types/fivem';

const communityCommands: FivemScript = {
    id: 'community-commands',
    title: 'Community Commands',
    author: 'TheRealToxicDev',
    description:
        'Server-sided script providing essential roleplay commands including /911, /dispatch, and community-driven features',
    longDescription: `
Community Commands is a community-driven FiveM script designed to provide your server with all essential roleplay commands. The script operates on a foundational level, offering critical chat-based commands that enhance player immersion and server interaction.

The script is built on early release principles with constant updates based on community feedback. Features are requested and evaluated through a structured process, ensuring that only the most impactful additions make it into production.

This script works in conjunction with the FiveMToDiscord Logs Script for enhanced server logging and Discord integration capabilities. Community Commands is entirely community-driven, meaning features and improvements are directly influenced by user suggestions and server needs.

Originally designed with extensive dispatcher and emergency services support (/911, /dispatch, etc.), the script provides the foundational commands needed for immersive roleplay environments. Commands are executed server-side for security and consistency across all players.
  `,
    version: '1.0.1',
    framework: 'Standalone',
    status: 'Deprecated',
    deprecated: true,
    deprecationMessage:
        'This project was archived on December 16, 2023. The repository is now read-only and no longer maintained. The script is preserved for historical reference and existing server implementations.',
    images: [],
    features: [
        'Essential roleplay commands (/911, /dispatch)',
        'RP name customization (/rpname)',
        'Character ID system (/id)',
        'OOC (Out of Character) communication (/ooc)',
        'Action emotes (/me, /do)',
        'Server announcements (/devannounce, /news)',
        'Advertisement messages (/ad)',
        'Community-driven feature system',
        'Server-side implementation for consistency',
        'Discord logging integration support',
    ],
    tags: ['Commands', 'Roleplay', 'Chat', 'Emergency', 'Community', 'Deprecated', 'Archived'],
    links: {
        github: 'https://github.com/ByteBrushStudios/Community-Commands',
        documentation: 'https://therealtoxicdev.github.io/FiveM-Community-Commands/', // Note: Site is no longer available (404)
        discord: 'https://discord.gg/QhmXAJdPQu',
        slug: "community-commands"
    },
    installation: {
        requirements: ['FiveM Server', 'FiveMToDiscord Logs Script (recommended)'],
        steps: [
            'Download the latest release from GitHub',
            'Extract files to your resources folder',
            'Ensure the folder is named "Community Commands" or similar',
            'Add ensure Community-Commands to your server.cfg',
            'Restart server or start resource',
        ],
    },
    language: 'Lua',
    license: 'GPL-3.0',
    lastUpdated: '2023-12-16',
};

export default communityCommands;
