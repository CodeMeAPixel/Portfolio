import { FivemScript } from "@/types/fivem";

const script: FivemScript = {
    id: "hidden-objects",
    title: "Hidden Objects",
    description: "A FiveM script for hidden objects gameplay mechanics and interactions.",
    longDescription: `
## 🎮 Hidden Objects - FiveM Script

**A unique FiveM script that adds hidden objects gameplay mechanics to your server.**

---

## 🌟 Overview

Hidden Objects brings an interactive mystery element to your FiveM server. Players can search for and discover hidden objects throughout the map, adding a layer of engagement and exploration to server gameplay.

## 🎯 Key Features

### 🔍 Hidden Objects System
- Interactive object discovery mechanics
- Customizable object placement
- Visual indicators for found/unfound objects
- Progress tracking for players

### 🎮 Gameplay Mechanics
- Search and discover gameplay loops
- Object interaction system
- Reward integration capabilities
- Discovery notifications

### ⚙️ Configuration
- Fully customizable object locations
- Adjustable search radius
- Configurable discovery rewards
- Easy-to-use setup

## 🚀 Quick Start

1. Download from GitHub
2. Extract to your server's \`resources/\` folder
3. Rename folder to \`hidden_objects\`
4. Add \`ensure hidden_objects\` to server.cfg
5. Configure objects in config file
6. Restart server

## 🎨 Customization

The script is fully customizable with:
- Easy object placement editing
- Adjustable search parameters
- Integration with other scripts
- Event-based reward system

## 📝 Features List

- ✨ Interactive object discovery
- 🎯 Precision object placement
- 📊 Progress tracking
- 🔐 Player data storage
- 🎁 Reward integration
- 📱 Mobile-friendly notifications
- 🌍 Multi-location support
- ⚙️ Server-side validation
    `,
    price: "Free",
    framework: "Standalone",
    status: "Released",
    version: "1.0.0",
    lastUpdated: "2021-02-05",
    author: "CodeMeAPixel",
    features: [
        "🔍 Interactive object discovery",
        "🎯 Precision placement system",
        "📊 Player progress tracking",
        "🎁 Reward integration",
        "⚙️ Server-side validation",
        "📱 Notification system",
        "🌍 Multi-location support",
        "🔐 Data persistence"
    ],
    images: [],
    tags: ["Gameplay", "Mystery", "Discovery", "Interactive", "Exploration"],
    links: {
        github: "https://github.com/CodeMeAPixel/HiddenObjects-FiveM",
        slug: "hidden-objects"
    },
    requirements: [
        "FXServer (FiveM)",
        "Artifact 1181+"
    ],
    installation: "1. Download from GitHub\n2. Extract to resources/hidden_objects/\n3. Add 'ensure hidden_objects' to server.cfg\n4. Configure objects.lua\n5. Restart server",
    deprecated: false
};

export default script;
