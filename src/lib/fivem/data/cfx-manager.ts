import { FivemScript } from "@/types/fivem";

const script: FivemScript = {
    id: "cfx-manager",
    title: "CFX Manager",
    description: "Server management script for easily managing FXServer resources, events, and dispatcher configuration with permission-based commands.",
    longDescription: `
## 🛠️ CFX Manager - FXServer Management System

**A lightweight server management script for FiveM/RedM that provides easy control over server resources, events, and AI dispatcher systems.**

---

## 🌟 Overview

CFX Manager is a simple yet powerful server management tool designed to help FXServer administrators control and monitor their servers with ease. It provides centralized management of resources, events, and the AI dispatcher system with permission-based command access.

Key Capabilities:
- **🎛️ Server Management** - Control resources and server events
- **🚨 Dispatcher Control** - Enable/disable AI dispatcher events
- **🔐 Permission System** - ACE-based permission management
- **📊 Version Management** - Built-in version checking and update notifications
- **📝 Logging System** - Comprehensive logging with color support
- **⚙️ Configuration-Driven** - Flexible configuration system

## 🎯 Key Features

### 🛠️ Resource Management
- Enable/disable server resources on-the-fly
- Monitor resource status and state
- Integrated resource control commands

### 🚨 AI Dispatcher Control
- Disable unwanted dispatcher events
- Fine-grained event control (police, fire, medical, etc.)
- Customize which AI-spawned services respond to player actions
- Support for 16+ different dispatcher event types

### 📋 Supported Dispatcher Events
- **Police**: PoliceCar, PoliceHeli, PoliceRoadBlock, PoliceBike, PoliceBoat
- **Swat**: SwatSquad, SwatHeli
- **Fire**: FireTruck
- **Medical**: Medics
- **Military**: ArmyResponse
- **Gang**: GangViolence
- **Transport**: PoliceTransport
- **Other**: BikerBackup, Invalid

### 🔐 Permission-Based Commands
- \`/cfx help\` - Display help menu
- \`/cfx version\` - Check current version
- \`/cfx updates\` - Check for available updates (requires permission)
- ACE permission: \`cfxmanager.<command>\`

### 📊 Advanced Features
- **Logging with Colors** - Color-coded console and chat messages
- **Version Checking** - Automatic GitHub version checking
- **Update Notifications** - Alert admins about new versions
- **Shared Functions** - Available to both server and client
- **Customizable** - Fully configurable through Lua tables

## 📁 File Structure

\`\`\`
cfx_manager/
├── manager.lua          # Core manager functions
├── dispatcher.lua       # Dispatcher configuration
├── commands.lua         # Command registration
├── fxmanifest.lua       # Resource manifest
└── version.lua          # Version management
\`\`\`

## ⚙️ Configuration

### Dispatcher Configuration

\`\`\`lua
DISPATCHER = {
    state = 'on',  -- 'on' disables all, 'off' enables all
    events = {
        PoliceCar = true,      -- Disable police cars
        PoliceHeli = true,     -- Disable police helicopters
        FireTruck = true,      -- Disable fire trucks
        SwatSquad = true,      -- Disable SWAT teams
        Medics = true,         -- Disable medics
        GangViolence = true,   -- Disable gang violence
        -- ... more events
    }
}
\`\`\`

## 🚀 Quick Start

1. Download the resource
2. Extract to your server's \`resources/\` folder
3. Rename folder to \`cfx_manager\`
4. Add \`ensure cfx_manager\` to server.cfg
5. Configure dispatcher.lua as needed
6. Restart server

## 🎮 Console Commands

\`\`\`lua
-- Display help menu
/cfx help

-- Check current version
/cfx version

-- Check for updates (admin only)
/cfx updates
\`\`\`

## 📖 Export Functions

\`\`\`lua
-- Logging function
CFXManager:Logger(message, color, multiline, print_to_chat)

-- Version information
CFXManager:Version()

-- Permission checking
CFXManager:HasAcePermission(source, permission)

-- Check for updates
CFXManager:CheckManagerForUpdates()
\`\`\`

## 🔐 Permissions

Set permissions in your server.cfg:

\`\`\`
add_ace identifier.fivem:STEAM_ID "cfxmanager.updates" allow
add_ace identifier.fivem:STEAM_ID "cfxmanager.help" allow
add_ace identifier.fivem:STEAM_ID "cfxmanager.version" allow
\`\`\`

## 📝 Logging Examples

The logger supports multiple output types:
- Console output with colors
- Chat notifications
- Multiline messages

\`\`\`lua
CFXManager:Logger('Server event disabled', { 255, 0, 0 }, false, false)
CFXManager:Logger('Dispatcher updated', { 0, 255, 0 }, true, true)
\`\`\`

## 🌐 GitHub Integration

- Automatic version checking via GitHub API
- Release information display
- Update notifications

## 🎨 Customization

All dispatcher events are customizable:
- Set to \`nil\` to use defaults
- Set to \`true\` to disable the event
- Set to \`false\` to enable the event
- Combine settings to create custom configurations

## 📄 License

MIT License - Open source and free to use

## 🤝 Community

Built for the FiveM/RedM community by ByteBrush Studios
    `,
    price: "Free",
    framework: "Standalone",
    status: "Released",
    version: "0.0.1",
    lastUpdated: "2023-12-18",
    features: [
        "🛠️ Server resource management",
        "🚨 AI dispatcher event control",
        "🔐 ACE permission system",
        "📊 Version checking & updates",
        "📝 Advanced logging system",
        "⚙️ Configuration-driven design",
        "🎮 In-game commands",
        "📈 16+ dispatcher event types",
        "🌐 GitHub integration",
        "💾 Persistent configuration"
    ],
    images: [],
    tags: ["Management", "Server", "Dispatcher", "Admin", "Commands", "Utilities"],
    links: {
        documentation: "https://bytebrushstudios.github.io/cfx_manager/",
        github: "https://github.com/ByteBrushStudios/cfx_manager",
        slug: "cfx-manager"
    },
    requirements: [
        "FXServer (FiveM/RedM)",
        "Artifact 1181+"
    ],
    installation: "1. Download from GitHub\n2. Extract to resources/cfx_manager/\n3. Add 'ensure cfx_manager' to server.cfg\n4. Configure dispatcher.lua\n5. Restart server",
    deprecated: false,
    deprecatedMessage: ""
};

export default script;
