import { FivemScript } from '@/types/fivem';

const fivem2Discord: FivemScript = {
    id: 'fivem2discord',
    title: 'FiveM2Discord',
    author: 'ByteBrushStudios',
    description:
        'Simple Discord webhook integration resource for logging FiveM server events to Discord channels',
    longDescription: `
FiveM2Discord is a simple resource that allows you to send certain server-related events to a Discord channel of your choice through webhooks. This resource provides a straightforward way to log server activities and keep your Discord community updated in real-time.

The script enables seamless integration between your FiveM server and Discord, allowing administrators to monitor server events and player activities directly through Discord webhooks. This makes it easy to stay informed about important server events without constantly monitoring the server console.

⚠️ **DEPRECATED**: This resource has been superseded by Pixel Logs, a more advanced and feature-rich Discord logging system that supports both FiveM and RedM servers. The migration from FiveM2Discord to Pixel Logs is straightforward and recommended for all server administrators.
  `,
    version: '1.0',
    framework: 'Standalone',
    status: 'Archived',
    deprecated: true,
    deprecationMessage:
        'This resource is no longer maintained and has been replaced by Pixel Logs. For new implementations and continued support, please use Pixel Logs instead.',
    images: [],
    features: [
        'Discord webhook integration',
        'Server event logging',
        'Chat message forwarding',
        'Player death tracking',
        'Command logging',
        'Real-time event notifications',
        'Simple webhook-based configuration',
        'Easy event filtering',
    ],
    tags: ['Discord', 'Webhooks', 'Logging', 'Integration', 'Events', 'Deprecated', 'Archived'],
    links: {
        github: 'https://github.com/ByteBrushStudios/FiveM2Discord',
        successor: 'https://github.com/ByteBrushStudios/pixel_logs',
        slug: "fivem2discord"
    },
    installation: {
        requirements: ['FiveM Server', 'Discord Webhook URL'],
        steps: [
            'Download the resource from GitHub',
            'Extract to your resources folder',
            'Create Discord webhooks in your desired channels',
            'Configure webhook URLs in the resource config',
            'Add ensure fivem2discord to your server.cfg',
            'Restart server or start resource',
            'Note: Consider migrating to Pixel Logs for better features and continued support',
        ],
    },
    migrationGuide: {
        successor: 'Pixel Logs',
        steps: [
            'Remove FiveM2Discord from your server',
            'Download and install Pixel Logs',
            'Configure your webhooks and settings in the new resource',
            'Restart your server',
        ],
        successorFeatures: [
            'Enhanced message formatting with rich embeds',
            'Comprehensive logging for various event types',
            'Improved security with better identifier handling',
            'RedM support for both FiveM and RedM servers',
            'Easy configuration with extensive customization',
            'Built-in debugging features',
            'Customizable player avatars in Discord messages',
        ],
    },
    language: 'Lua',
    license: 'MIT',
    lastUpdated: '2025-03-02', // Last update before deprecation
};

export default fivem2Discord;
