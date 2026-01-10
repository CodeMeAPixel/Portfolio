import { FivemScript } from "@/types/fivem";

const script: FivemScript = {
    id: "pxl",
    title: "Pixel Logs",
    description: "An advanced Discord logging system for FiveM and RedM servers, providing comprehensive logging capabilities with a clean and modern interface.",
    longDescription: `
An advanced Discord logging system for **FiveM** and **RedM** servers, providing comprehensive logging capabilities with a clean and modern interface.

> [!CAUTION]
> This resource is not yet ready for production use and is only public at this stage for transparency. Please check back in a few days for an official release :D


## 📚 Documentation

For detailed information about Pixel Logs, please refer to the following documentation:

- [Installation Guide](/docs/installation.md) - Detailed installation instructions
- [Configuration Guide](/docs/configuration.md) - How to configure Pixel Logs
- [Events Guide](/docs/events.md) - Information about events and exports
- [Customization Guide](/docs/customization.md) - How to customize message templates and appearance
- [Debug Guide](/docs/debug.md) - How to use the debug system
- [Proxy Support Guide](/docs/proxy.md) - How to use proxy support
- [Troubleshooting Guide](/docs/troubleshooting.md) - Solutions for common issues
- [Integration Guide](/docs/integration.md) - How to integrate with other resources
- [Convars Guide](/docs/convars.md) - Detailed information about convars


## ❓ Support

> [!IMPORTANT]
> For support, feature requests, or bug reports, please:
> 1. Check the [GitHub Issues](https://github.com/ByteBrushStudios/pixel_logs/issues)
> 2. Join our [Discord Server](https://discord.gg/Vv2bdC44Ge)
    `,
    price: "TBA",
    framework: "ESX, QBCore, Standalone",
    status: "In Development",
    version: "1.px0001a",
    lastUpdated: "2025-07-31",
    features: [
        "📝 Event Logging for player joins/leaves, chat messages, deaths, commands, admin actions, resources, and custom events",
        "🔍 Detailed death tracking with cause, weapon details, location, and killer information",
        "👮 Administrative action logging including bans, kicks, and warns with reason and duration tracking",
        "🐛 Advanced debug system with in-memory logging and separate webhook for critical errors",
        "🔄 txAdmin integration for server management event tracking",
        "⚙️ Extensive configuration with per-event toggling and customizable templates",
        "🎨 Custom embed colors and player avatar support for Discord logs",
        "🔗 Multiple webhook support with different channels for different log types",
        "🛡️ Proxy support for routing Discord webhook requests",
        "📋 Player identifier control for privacy management",
        "💡 Automatic error catching with stack traces and error details",
        "📊 Resource information inclusion in error logs for easier debugging"
    ],
    images: [
        "/scripts/pxl/pxl-console.png",
        "/scripts/pxl/pxl-player-join.png",
        "/scripts/pxl/pxl-player-leave.png",
        "/scripts/pxl/pxl-startup.png"
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Logging", "Discord", "Admin", "Debug", "Standalone"],
    links: {
        // demo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        //purchase: "https://tebex.io/",
        //documentation: "https://docs.codemeapixel.dev/pixel-logs",
        slug: "pixel-logs"
    },
    requirements: [
        "FiveM or RedM server",
        "Discord webhook permissions",
        "Server owner or access to server.cfg"
    ],
    installation: `1. Download the latest release from the GitHub Repository\n2. Extract the files to your server's resources directory`
};

export default script;
