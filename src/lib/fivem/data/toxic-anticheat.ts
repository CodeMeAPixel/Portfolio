import { FivemScript } from "@/types/fivem";

const script: FivemScript = {
    id: "toxic-anticheat",
    title: "Toxic AntiCheat",
    description: "A FiveM AntiCheat resource designed to detect hackers and ban them from your server.",
    longDescription: `
## 🛡️ Toxic AntiCheat - FiveM Security System

**A comprehensive anti-cheat system designed to detect and prevent hacking attempts on your FiveM server.**

---

## 🌟 Overview

Toxic AntiCheat was a dedicated security solution for FiveM servers, providing real-time detection of common hacking methods and exploits. It served as an important line of defense against malicious players.

## ⚠️ Project Status

**This project has been archived and is no longer actively maintained.** While the code remains available for reference, it is recommended to use modern anti-cheat solutions that are actively developed and updated.

## 🎯 Historical Features

### 🔍 Detection System
- Spawning unauthorized vehicles
- God mode detection
- Teleportation detection
- Speed hacks
- Weapon spawning
- Player spawning
- Model manipulation
- Animation violations

### 🛡️ Security Features
- Real-time player monitoring
- Ban system integration
- Connection logging
- Admin notifications
- Configurable detection thresholds
- Whitelist support

### 📊 Logging & Monitoring
- Detailed cheat attempt logs
- Admin notification system
- Ban history tracking
- Player statistics

## 🚀 Installation

Since this project is archived, installation is for historical/reference purposes only:

1. Download from GitHub
2. Extract to your server's \`resources/\` folder
3. Rename folder to \`toxic_anticheat\`
4. Add \`ensure toxic_anticheat\` to server.cfg
5. Configure in config.lua
6. Restart server

## ⚠️ Migration Notice

**⚠️ This script has been archived and is not recommended for new implementations.**

Modern anti-cheat solutions should be used instead. Consider:
- Actively maintained anti-cheat frameworks
- Updated exploitation detection methods
- Modern security practices
- Community-supported solutions

## 🎨 Features List

- 🔍 Cheat detection system
- 🚫 Automatic banning
- 📊 Detailed logging
- ⚙️ Configurable thresholds
- 👮 Admin notifications
- 🔐 Integration with ban systems
- 💾 Persistent ban history
- 🌍 Server-wide protection

## 📝 Technical Details

Built with:
- Pure Lua implementation
- FiveM-native APIs
- Efficient monitoring loops
- Server-side validation

## 🤝 Server Integration

Compatible with:
- ESX Framework
- vRP Framework
- Custom ban systems
- Standalone servers

## 📚 Documentation

For historical reference, the GitHub repository contains:
- Original source code
- Configuration examples
- Installation guides
- Known limitations

## ❌ Known Limitations

As this is archived, be aware of:
- Lack of active maintenance
- Potential compatibility issues with newer FiveM versions
- Outdated detection methods
- No ongoing support

**Use for reference or educational purposes only. Do not deploy in production environments.**
    `,
    price: "Free",
    framework: "Standalone",
    status: "Archived",
    version: "1.0.0",
    lastUpdated: "2021-02-08",
    author: "CodeMeAPixel",
    features: [
        "🔍 Cheat detection system",
        "🚫 Automatic banning",
        "📊 Detailed logging",
        "⚙️ Configurable thresholds",
        "👮 Admin notifications",
        "🔐 Ban system integration",
        "💾 Ban history tracking",
        "🌍 Server-wide protection"
    ],
    images: [],
    tags: ["Security", "Anti-Cheat", "Detection", "Protection", "Archived"],
    links: {
        github: "https://github.com/CodeMeAPixel/ToxicAntiCheat",
        slug: "toxic-anticheat"
    },
    requirements: [
        "FXServer (FiveM)",
        "Artifact 1181+"
    ],
    installation: "⚠️ Archived - Installation not recommended\n1. Download from GitHub\n2. Extract to resources/toxic_anticheat/\n3. Add 'ensure toxic_anticheat' to server.cfg\n4. Note: Use modern anti-cheat solutions instead",
    deprecated: true,
    migrationGuide: {
        successor: "Modern Anti-Cheat Solutions",
        steps: [
            "Consider using actively maintained anti-cheat frameworks",
            "Review updated exploitation detection methods",
            "Implement modern security practices",
            "Check community-supported solutions",
            "Update to modern FiveM security standards"
        ]
    }
};

export default script;
