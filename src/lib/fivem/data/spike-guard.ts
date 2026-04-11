import { FivemScript } from "../../../types/fivem";

const script: FivemScript = {
    id: "spike-guard",
    title: "SpikeGuard",
    description: "Advanced FXServer performance monitoring system with Discord integration, real-time alerts, and modular architecture.",
    longDescription: `
## 🛡️ SpikeGuard - Advanced FXServer Performance Monitor

**A professional-grade hybrid monitoring solution for FXServer (FiveM/RedM) featuring modular architecture, automatic version checking, and intelligent Discord alerting.**

---

## 🌟 Overview

SpikeGuard is a comprehensive monitoring system designed specifically for FXServer environments. Unlike simple webhook-based solutions, SpikeGuard provides:

- **🔍 Real-time Performance Monitoring** - Track memory usage, hitch warnings, and player counts with precision
- **🤖 Intelligent Discord Integration** - Advanced embed notifications with cooldown protection and smart alerting
- **📊 Automatic Profiler Dumps** - Capture detailed performance data when thresholds are exceeded
- **⚡ Low-latency Communication** - File-based JSON communication for reliable data exchange
- **🛠️ Production-ready** - Robust error handling, logging, and monitoring capabilities
- **🔄 Automatic Version Checking** - Stay updated with the latest releases from GitHub
- **🧩 Modular Architecture** - Clean, maintainable code with separated concerns

## 🎯 Key Features

### 🔧 FXServer Monitoring (Lua) - Modular Design
- **Memory Tracking**: Precise memory usage monitoring with real-time tracking
- **Hitch Detection**: Real-time frame time spike detection with configurable thresholds
- **Player Monitoring**: Track connected players and server capacity
- **Server Metrics**: Uptime, resource count, and performance state tracking
- **Consecutive Spike Detection**: Identify performance patterns and trends
- **Console Commands**: Enhanced manual control with detailed statistics
- **Export Functions**: Extended integration with version and performance state exports
- **Performance Analysis**: Automatic analysis with recommendations and severity levels

### 🤖 Discord Bot (Node.js)
- **File Watcher**: Real-time monitoring using chokidar for instant updates
- **Smart Alerting**: Multi-level alerts (warning/critical) with spam protection
- **Rich Embeds**: Professional Discord embeds with color coding and comprehensive data
- **Cooldown System**: Prevents alert spam with configurable cooldown periods
- **Slash Commands**: Ready-to-extend framework for Discord interactions
- **Error Recovery**: Robust error handling with automatic reconnection

### 📊 Data & Analytics
- **JSON Status Files**: Human-readable status tracking with timestamps
- **Profiler Integration**: Automatic profiler dumps with detailed server metrics
- **Log Management**: Comprehensive logging with configurable levels
- **Performance History**: Track server performance over time with trends analysis
- **Threshold Monitoring**: Configurable warning and critical thresholds

## 🧩 Modular Architecture

SpikeGuard introduces a completely modular architecture for better maintainability:

- **Version Manager** - GitHub API integration and automatic update notifications
- **Performance Monitor** - Data collection, analysis, and trend tracking
- **Profiler Manager** - Automatic dumps triggered by performance thresholds
- **File Manager** - Safe file operations and data validation

## 🚀 Quick Start

### Prerequisites
- FXServer running FiveM or RedM
- Node.js 16.9.0 or higher
- Discord Bot created via Discord Developer Portal
- File write permissions and internet connection

### Installation
1. Clone the repository: \`git clone https://github.com/ByteBrushStudios/SpikeGuard.git\`
2. Copy \`fx/\` folder to server's \`resources/spikeguard/\`
3. Add \`ensure spikeguard\` to server.cfg
4. Configure bot: Copy \`bot/config.example.json\` to \`bot/config.json\`
5. Install dependencies: \`cd bot && npm install\`
6. Start the bot: \`npm start\`

## ⚙️ Console Commands

- \`spikeguard:status\` - Detailed status report with performance analysis
- \`spikeguard:dump\` - Force profiler dump (bypasses cooldown)
- \`spikeguard:reload\` - Reload configuration and reset state
- \`spikeguard:version\` - Check for updates manually
- \`spikeguard:stats\` - System statistics and performance trends

## 📈 Export Functions

\`\`\`lua
-- Basic performance data
local memoryUsage = exports.spikeguard:GetMemoryUsage()
local hitchTime = exports.spikeguard:GetHitchWarning()
local playerCount = exports.spikeguard:GetPlayersCount()
local serverUptime = exports.spikeguard:GetServerUptime()

-- Advanced monitoring data
local serverMetrics = exports.spikeguard:GetServerMetrics()
local performanceState = exports.spikeguard:GetPerformanceState()

-- Version information
local versionInfo = exports.spikeguard:GetVersionInfo()
\`\`\`

## 🐛 Troubleshooting

### Common Issues
- **Resource not starting**: Check folder name is \`spikeguard\` and verify \`ensure\` entry in server.cfg
- **No status.json**: Enable debug mode in config.lua
- **Bot not connecting**: Verify bot token in config.json and internet connectivity
- **No alerts**: Check file watcher status and threshold settings

## 🔐 Security
- Use environment variables for bot tokens
- Restrict bot permissions to minimum required
- Regularly rotate bot tokens
- Use .gitignore to exclude config files

## 📄 License

MIT License - Open source and free to use
    `,
    price: "TBA",
    framework: "Standalone",
    status: "In Development",
    version: "1.0.0",
    lastUpdated: "2026-01-10",
    features: [
        "🔍 Real-time performance monitoring",
        "🤖 Intelligent Discord integration with embeds",
        "📊 Automatic profiler dumps",
        "🔄 GitHub version checking",
        "🧩 Modular architecture design",
        "⚡ File-based JSON communication",
        "📈 Performance trend tracking",
        "🎯 Configurable alert thresholds",
        "💾 Comprehensive logging system",
        "🛡️ Production-ready error handling"
    ],
    images: [],
    tags: ["Monitoring", "Performance", "Discord", "FXServer", "Profiler", "Analytics"],
    links: {
        github: "https://github.com/ByteBrushStudios/SpikeGuard",
        slug: "spike-guard"
    },
    requirements: [
        "FXServer (FiveM/RedM)",
        "Node.js 16.9.0+",
        "Discord Bot token",
        "File write permissions"
    ],
    installation: "1. Clone from GitHub\n2. Copy fx/ folder to resources/spikeguard/\n3. Add ensure spikeguard to server.cfg\n4. Configure bot/config.json with Discord credentials\n5. Run: cd bot && npm install && npm start",
    deprecated: false,
    deprecatedMessage: ""
};

export default script;
