import type { PrismaClient } from '../../src/generated/prisma/client.js'
import { ProductPlatform, ProductFramework, ProductStatus } from '../../src/generated/prisma/client.js'

export async function seedProducts(prisma: PrismaClient) {
  await prisma.product.create({
    data: {
      slug: 'pixel-logs',
      title: 'Pixel Logs',
      description: 'An advanced Discord logging system for FiveM and RedM servers, providing comprehensive logging capabilities with a clean and modern interface.',
      longDescription: `An advanced Discord logging system for **FiveM** and **RedM** servers, providing comprehensive logging capabilities with a clean and modern interface.

> **Note:** This resource is not yet ready for production use and is only public at this stage for transparency. Please check back in a few days for an official release.

## Documentation

- Installation Guide - Detailed installation instructions
- Configuration Guide - How to configure Pixel Logs
- Events Guide - Information about events and exports
- Customization Guide - How to customize message templates and appearance
- Debug Guide - How to use the debug system
- Proxy Support Guide - How to use proxy support
- Troubleshooting Guide - Solutions for common issues
- Integration Guide - How to integrate with other resources
- Convars Guide - Detailed information about convars

## Support

For support, feature requests, or bug reports:
1. Check the GitHub Issues
2. Join our Discord Server`,
      author: 'CodeMeAPixel',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.ESX,
      status: ProductStatus.InDevelopment,
      version: '1.px0001a',
      images: [
        '/scripts/pxl/pxl-console.png',
        '/scripts/pxl/pxl-player-join.png',
        '/scripts/pxl/pxl-player-leave.png',
        '/scripts/pxl/pxl-startup.png',
      ],
      tags: ['Logging', 'Discord', 'Admin', 'Debug', 'Standalone'],
      features: [
        'Event logging for player joins/leaves, chat, deaths, commands, admin actions',
        'Detailed death tracking with cause, weapon, location, killer info',
        'Administrative action logging with bans, kicks, warns',
        'Advanced debug system with in-memory logging',
        'txAdmin integration for server management events',
        'Per-event toggling and customizable templates',
        'Custom embed colors and player avatar support',
        'Multiple webhook support for different log types',
        'Proxy support for routing Discord webhook requests',
        'Automatic error catching with stack traces',
      ],
      lastUpdated: '2025-07-31',
      requirements: ['FiveM or RedM server', 'Discord webhook permissions', 'Server owner or access to server.cfg'],
      language: 'Lua',
    },
  })

  await prisma.product.create({
    data: {
      slug: 'spike-guard',
      title: 'SpikeGuard',
      description: 'Advanced FXServer performance monitoring system with Discord integration, real-time alerts, and modular architecture.',
      longDescription: `## SpikeGuard - Advanced FXServer Performance Monitor

A professional-grade hybrid monitoring solution for FXServer (FiveM/RedM) featuring modular architecture, automatic version checking, and intelligent Discord alerting.

### Overview

SpikeGuard is a comprehensive monitoring system designed specifically for FXServer environments:

- **Real-time Performance Monitoring** - Track memory usage, hitch warnings, and player counts with precision
- **Intelligent Discord Integration** - Advanced embed notifications with cooldown protection and smart alerting
- **Automatic Profiler Dumps** - Capture detailed performance data when thresholds are exceeded
- **Low-latency Communication** - File-based JSON communication for reliable data exchange
- **Modular Architecture** - Clean, maintainable code with separated concerns

### Modular Components

- **Version Manager** - GitHub API integration and automatic update notifications
- **Performance Monitor** - Data collection, analysis, and trend tracking
- **Profiler Manager** - Automatic dumps triggered by performance thresholds
- **File Manager** - Safe file operations and data validation`,
      author: 'CodeMeAPixel',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.InDevelopment,
      version: '1.0.0',
      tags: ['Monitoring', 'Performance', 'Discord', 'FXServer', 'Profiler', 'Analytics'],
      features: [
        'Real-time performance monitoring',
        'Intelligent Discord integration with embeds',
        'Automatic profiler dumps',
        'GitHub version checking',
        'Modular architecture design',
        'File-based JSON communication',
        'Performance trend tracking',
        'Configurable alert thresholds',
        'Comprehensive logging system',
        'Production-ready error handling',
      ],
      lastUpdated: '2026-01-10',
      githubUrl: 'https://github.com/ByteBrushStudios/SpikeGuard',
      requirements: ['FXServer (FiveM/RedM)', 'Node.js 16.9.0+', 'Discord Bot token', 'File write permissions'],
    },
  })

  await prisma.product.create({
    data: {
      slug: 'cfx-manager',
      title: 'CFX Manager',
      description: 'Server management script for easily managing FXServer resources, events, and dispatcher configuration with permission-based commands.',
      longDescription: `## CFX Manager - FXServer Management System

A lightweight server management script for FiveM/RedM that provides easy control over server resources, events, and AI dispatcher systems.

### Key Capabilities
- **Server Management** - Control resources and server events
- **Dispatcher Control** - Enable/disable AI dispatcher events
- **Permission System** - ACE-based permission management
- **Version Management** - Built-in version checking and update notifications

### Supported Dispatcher Events
- **Police**: PoliceCar, PoliceHeli, PoliceRoadBlock, PoliceBike, PoliceBoat
- **Swat**: SwatSquad, SwatHeli
- **Fire**: FireTruck
- **Medical**: Medics
- **Military**: ArmyResponse
- **Gang**: GangViolence

### Commands
- \`/cfx help\` - Display help menu
- \`/cfx version\` - Check current version
- \`/cfx updates\` - Check for available updates (requires permission)`,
      author: 'CodeMeAPixel',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.Released,
      version: '0.0.1',
      tags: ['Management', 'Server', 'Dispatcher', 'Admin', 'Commands', 'Utilities'],
      features: [
        'Server resource management',
        'AI dispatcher event control',
        'ACE permission system',
        'Version checking & updates',
        'Advanced logging system',
        'Configuration-driven design',
        'In-game commands',
        '16+ dispatcher event types',
        'GitHub integration',
        'Persistent configuration',
      ],
      lastUpdated: '2023-12-18',
      githubUrl: 'https://github.com/ByteBrushStudios/cfx_manager',
      docsUrl: 'https://bytebrushstudios.github.io/cfx_manager/',
      requirements: ['FXServer (FiveM/RedM)', 'Artifact 1181+'],
      language: 'Lua',
      license: 'MIT',
    },
  })

  await prisma.product.create({
    data: {
      slug: 'community-commands',
      title: 'Community Commands',
      description: 'Server-sided script providing essential roleplay commands including /911, /dispatch, and community-driven features.',
      longDescription: `Community Commands is a community-driven FiveM script designed to provide your server with all essential roleplay commands. The script operates on a foundational level, offering critical chat-based commands that enhance player immersion and server interaction.

The script is built on early release principles with constant updates based on community feedback. Features are requested and evaluated through a structured process, ensuring that only the most impactful additions make it into production.

This script works in conjunction with the FiveMToDiscord Logs Script for enhanced server logging and Discord integration capabilities. Originally designed with extensive dispatcher and emergency services support (/911, /dispatch, etc.), the script provides the foundational commands needed for immersive roleplay environments.`,
      author: 'TheRealToxicDev',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.Deprecated,
      deprecated: true,
      deprecationMessage: 'This project was archived on December 16, 2023. The repository is now read-only and no longer maintained.',
      version: '1.0.1',
      tags: ['Commands', 'Roleplay', 'Chat', 'Emergency', 'Community', 'Deprecated', 'Archived'],
      features: [
        'Essential roleplay commands (/911, /dispatch)',
        'RP name customization (/rpname)',
        'Character ID system (/id)',
        'OOC communication (/ooc)',
        'Action emotes (/me, /do)',
        'Server announcements (/devannounce, /news)',
        'Advertisement messages (/ad)',
        'Community-driven feature system',
        'Server-side implementation for consistency',
        'Discord logging integration support',
      ],
      lastUpdated: '2023-12-16',
      githubUrl: 'https://github.com/ByteBrushStudios/Community-Commands',
      docsUrl: 'https://therealtoxicdev.github.io/FiveM-Community-Commands/',
      discordUrl: 'https://discord.gg/QhmXAJdPQu',
      language: 'Lua',
      license: 'GPL-3.0',
    },
  })

  await prisma.product.create({
    data: {
      slug: 'fivem2discord',
      title: 'FiveM2Discord',
      description: 'Simple Discord webhook integration resource for logging FiveM server events to Discord channels.',
      longDescription: `FiveM2Discord is a simple resource that allows you to send certain server-related events to a Discord channel of your choice through webhooks. This resource provides a straightforward way to log server activities and keep your Discord community updated in real-time.

**DEPRECATED**: This resource has been superseded by Pixel Logs, a more advanced and feature-rich Discord logging system that supports both FiveM and RedM servers. The migration from FiveM2Discord to Pixel Logs is straightforward and recommended for all server administrators.`,
      author: 'ByteBrushStudios',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.Archived,
      deprecated: true,
      deprecationMessage: 'This resource is no longer maintained and has been replaced by Pixel Logs.',
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
      version: '1.0',
      tags: ['Discord', 'Webhooks', 'Logging', 'Integration', 'Events', 'Deprecated', 'Archived'],
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
      lastUpdated: '2025-03-02',
      githubUrl: 'https://github.com/ByteBrushStudios/FiveM2Discord',
      successorUrl: 'https://github.com/ByteBrushStudios/pixel_logs',
      language: 'Lua',
      license: 'MIT',
    },
  })

  await prisma.product.create({
    data: {
      slug: 'hidden-objects',
      title: 'Hidden Objects',
      description: 'A FiveM script for hidden objects gameplay mechanics and interactions.',
      longDescription: `## Hidden Objects - FiveM Script

A unique FiveM script that adds hidden objects gameplay mechanics to your server.

### Overview

Hidden Objects brings an interactive mystery element to your FiveM server. Players can search for and discover hidden objects throughout the map, adding a layer of engagement and exploration to server gameplay.

### Key Features
- Interactive object discovery mechanics
- Customizable object placement
- Visual indicators for found/unfound objects
- Progress tracking for players
- Search and discover gameplay loops
- Reward integration capabilities`,
      author: 'CodeMeAPixel',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.Released,
      version: '1.0.0',
      tags: ['Gameplay', 'Mystery', 'Discovery', 'Interactive', 'Exploration'],
      features: [
        'Interactive object discovery',
        'Precision placement system',
        'Player progress tracking',
        'Reward integration',
        'Server-side validation',
        'Notification system',
        'Multi-location support',
        'Data persistence',
      ],
      lastUpdated: '2021-02-05',
      githubUrl: 'https://github.com/CodeMeAPixel/HiddenObjects-FiveM',
      requirements: ['FXServer (FiveM)', 'Artifact 1181+'],
    },
  })

  await prisma.product.create({
    data: {
      slug: 'special-chars-blocker',
      title: 'Special Chars Blocker',
      description: 'A simple FiveM resource to block players from joining who have Special Characters or Injectors in their Steam name.',
      longDescription: `## Special Chars Blocker - FiveM Security Script

A lightweight security resource that prevents players with special characters or suspected injectors in their Steam names from joining your server.

### Security Protection
- Automatic special character detection
- Injector pattern recognition
- Real-time player validation on join
- Server-wide protection

### Detection System
- Custom character blocklist
- Pattern matching for known exploits
- Whitelist support for legitimate characters
- Configurable sensitivity levels

### Player Management
- Auto-kick on detection
- Detailed rejection messages
- Logging of blocked connections
- Admin notifications`,
      author: 'CodeMeAPixel',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.Released,
      version: '1.0.0',
      tags: ['Security', 'Anti-Cheat', 'Protection', 'Validation', 'Safety'],
      features: [
        'Special character detection',
        'Automatic player blocking',
        'Injector pattern recognition',
        'Connection logging',
        'Configurable blocklist',
        'Real-time validation',
        'Custom messages',
        'Admin notifications',
      ],
      lastUpdated: '2022-10-22',
      githubUrl: 'https://github.com/CodeMeAPixel/Special-Chars-Blocker-FiveM',
      requirements: ['FXServer (FiveM)', 'Artifact 1181+'],
    },
  })

  await prisma.product.create({
    data: {
      slug: 'toxic-anticheat',
      title: 'Toxic AntiCheat',
      description: 'A FiveM AntiCheat resource designed to detect hackers and ban them from your server.',
      longDescription: `## Toxic AntiCheat - FiveM Security System

A comprehensive anti-cheat system designed to detect and prevent hacking attempts on your FiveM server.

**This project has been archived and is no longer actively maintained.** While the code remains available for reference, it is recommended to use modern anti-cheat solutions that are actively developed and updated.

### Historical Features
- Spawning unauthorized vehicles detection
- God mode detection
- Teleportation detection
- Speed hacks detection
- Weapon spawning detection
- Player spawning detection
- Model manipulation detection
- Animation violations detection`,
      author: 'CodeMeAPixel',
      isFree: true,
      platform: ProductPlatform.FiveM,
      framework: ProductFramework.Standalone,
      status: ProductStatus.Archived,
      deprecated: true,
      migrationGuide: {
        successor: 'Modern Anti-Cheat Solutions',
        steps: [
          'Consider using actively maintained anti-cheat frameworks',
          'Review updated exploitation detection methods',
          'Implement modern security practices',
          'Check community-supported solutions',
          'Update to modern FiveM security standards',
        ],
      },
      version: '1.0.0',
      tags: ['Security', 'Anti-Cheat', 'Detection', 'Protection', 'Archived'],
      features: [
        'Cheat detection system',
        'Automatic banning',
        'Detailed logging',
        'Configurable thresholds',
        'Admin notifications',
        'Ban system integration',
        'Ban history tracking',
        'Server-wide protection',
      ],
      lastUpdated: '2021-02-08',
      githubUrl: 'https://github.com/CodeMeAPixel/ToxicAntiCheat',
      requirements: ['FXServer (FiveM)', 'Artifact 1181+'],
    },
  })

  console.log('  -> Products seeded')
}
