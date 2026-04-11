import { FivemScript } from "../../../types/fivem";

const script: FivemScript = {
    id: "pxloadingscreen",
    title: "pxLoadingScreen",
    description: "Premium Loading Screen for FiveM.",
    longDescription: `
# pxLoadingScreen

A glassmorphism loading screen for FiveM. Frosted glass panels, a real-time system console, staff roster, auto-populated resource list, social links, music player, and a full theme system all configured through a single \`config.js\` file with no rebuild required.

---

## Installation

1. Copy the \`pxLoadingScreen\` folder into your server's \`resources/\` directory.
2. Add to \`server.cfg\`:
\`\`\`
   ensure pxLoadingScreen
   \`\`\`
3. Place your media files in the \`media/\` directory.
4. Edit \`config.js\` to match your server.
5. Restart or \`refresh\` + \`ensure pxLoadingScreen\`.

See the [setup docs](/docs/scripts/fivem/pxloadingscreen/setup) for a full walkthrough.
    `,
    price: "Free",
    framework: "Standalone",
    status: "Released",
    version: "0.2.0",
    lastUpdated: "2026-03-04",
    features: [
        "Glassmorphism UI with frosted glass panels, backdrop blur, and accent colored glow effects",
        "Background media with video/image support stream large files externally without impacting download size",
        "Feature rich and customizable music player",
        "Animated progress bar with shimmer effect, color customization, and glowing end indicator",
        "Now Playing section (in left panel) showing current track info, track counter (x/y), and real time controls",
        "Extensive social links panel with branding and more",
        "Tabbed content panel with 5 built in templates",
        "Info cards with per card colors icons and descriptions",
        "Server branding with optional icon title subtitle and pulsing glow",
        "Rotating tips at bottom of left panel with smooth fade transitions",
        "Real time status display with blinking indicator dot",
        "Full theme customization and configuration",
        "Keyboard controls for hiding the panels and more",
        "No rebuild required ever"
    ],
    images: [
        "https://cmap.pics/ibNxG/vlBznS.png/raw",
        "https://embrly.ca/ibNxG/pUvEZs.png/raw",
        "https://cmap.pics/ibNxG/tkgITZ.png/raw",
        "https://cmap.pics/ibNxG/ndwshH.png/raw",
        "https://cmap.pics/ibNxG/54nxbB.png/raw",
        "https://cmap.pics/ibNxG/pPdEjL.png/raw",
        "https://cmap.pics/ibNxG/6-uNGH.png/raw"
    ],
    tags: ["fivem", "qbcore", "esx", "qbox", "loading-screen"],
    links: {
        documentation: "/docs/scripts/fxserver/pxloadingscreen",
        github: "https://github.com/CodeMeAPixel/pxLoadingScreen",
        demo: "https://loading.codemeapixel.dev/",
        discord: "https://discord.gg/BsEhHBTbXw",
        slug: "pxloadingscreen"
    },
    requirements: [
        "oxmysql",
        "qb-core"
    ],
    installation: "1. Download from GitHub\n2. Extract to resources/cfx_manager/\n3. Add 'ensure cfx_manager' to server.cfg\n4. Configure dispatcher.lua\n5. Restart server",
    deprecated: false,
    deprecatedMessage: ""
};

export default script;
