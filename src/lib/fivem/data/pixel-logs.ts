import { FivemScript } from "@/types/fivem";

const script: FivemScript = {
    id: "pxl",
    title: "Pixel Logs",
    description: "An advanced Discord logging system for FiveM and RedM servers, providing comprehensive logging capabilities with a clean and modern interface.",
    longDescription: "Pixel Logs is a powerful and customizable Discord logging system designed specifically for FiveM and RedM servers. It provides comprehensive event tracking, detailed debug capabilities, extensive configuration options, and seamless Discord integration to help server administrators monitor and troubleshoot their servers with ease. Whether you're tracking player activities, monitoring administrative actions, or debugging server issues, Pixel Logs delivers the information you need with a clean, organized interface.",
    price: "$5.00",
    framework: "Standalone",
    status: "In Development",
    version: "1.px0001a",
    lastUpdated: "2025-04-10",
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
        demo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        purchase: "https://tebex.io/",
        documentation: "https://docs.codemeapixel.dev/pixel-logs",
        slug: "pixel-logs"
    },
    requirements: [
        "FiveM or RedM server",
        "Discord webhook permissions",
        "Server owner or access to server.cfg"
    ],
    installation: "1. Download the script files\n2. Upload to your resources folder\n3. Add to server.cfg\n4. Configure your Discord webhooks\n5. Set the appropriate convars in server.cfg\n6. Restart your server"
};

export default script;
