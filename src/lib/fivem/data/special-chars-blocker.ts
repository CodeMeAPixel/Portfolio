import { FivemScript } from "@/types/fivem";

const script: FivemScript = {
    id: "special-chars-blocker",
    title: "Special Chars Blocker",
    description: "A simple FiveM resource to block players from joining who have Special Characters or Injectors in their Steam name.",
    longDescription: `
## 🛡️ Special Chars Blocker - FiveM Security Script

**A lightweight security resource that prevents players with special characters or suspected injectors in their Steam names from joining your server.**

---

## 🌟 Overview

Special Chars Blocker is a simple yet effective security tool designed to protect your FiveM server from potential exploiters and hackers. It automatically detects and blocks players whose Steam names contain suspicious special characters or injection patterns.

## 🎯 Key Features

### 🛡️ Security Protection
- Automatic special character detection
- Injector pattern recognition
- Real-time player validation on join
- Server-wide protection

### 🔍 Detection System
- Custom character blocklist
- Pattern matching for known exploits
- Whitelist support for legitimate characters
- Configurable sensitivity levels

### 📋 Player Management
- Auto-kick on detection
- Detailed rejection messages
- Logging of blocked connections
- Admin notifications

## 🚀 Quick Start

1. Download from GitHub
2. Extract to your server's \`resources/\` folder
3. Rename folder to \`special_chars_blocker\`
4. Add \`ensure special_chars_blocker\` to server.cfg
5. Configure blocked characters if needed
6. Restart server

## ⚙️ Configuration

### Character Blocklist

Configure which characters are blocked:
\`\`\`lua
BLOCKED_CHARS = {
    "^", "<", ">", "[", "]", "{", "}", "|", "\\\\", "\`"
}
\`\`\`

### Whitelist

Add characters that should be allowed:
\`\`\`lua
WHITELIST_CHARS = {
    "-", "_", ".", " "
}
\`\`\`

## 🎨 Features List

- 🛡️ Automatic character detection
- 🚫 Special character blocking
- 🔐 Injector pattern recognition
- 📊 Connection logging
- ⚙️ Easy configuration
- 🔄 Real-time validation
- 💬 Custom rejection messages
- 👮 Admin notifications

## 📝 Logging

All blocked connections are logged for admin review:
- Player name
- Steam ID
- Detected violation type
- Timestamp

## 🤝 Server Integration

Works seamlessly with:
- ESX Framework (optional)
- vRP Framework (optional)
- Pure Standalone servers
- Custom ban systems
    `,
    price: "Free",
    framework: "Standalone",
    status: "Released",
    version: "1.0.0",
    lastUpdated: "2022-10-22",
    author: "CodeMeAPixel",
    features: [
        "🛡️ Special character detection",
        "🚫 Automatic player blocking",
        "🔐 Injector pattern recognition",
        "📊 Connection logging",
        "⚙️ Configurable blocklist",
        "🔄 Real-time validation",
        "💬 Custom messages",
        "👮 Admin notifications"
    ],
    images: [],
    tags: ["Security", "Anti-Cheat", "Protection", "Validation", "Safety"],
    links: {
        github: "https://github.com/CodeMeAPixel/Special-Chars-Blocker-FiveM",
        slug: "special-chars-blocker"
    },
    requirements: [
        "FXServer (FiveM)",
        "Artifact 1181+"
    ],
    installation: "1. Download from GitHub\n2. Extract to resources/special_chars_blocker/\n3. Add 'ensure special_chars_blocker' to server.cfg\n4. Configure blocked characters if needed\n5. Restart server",
    deprecated: false
};

export default script;
