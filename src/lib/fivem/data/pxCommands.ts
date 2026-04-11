import { FivemScript } from "../../../types/fivem";

const script: FivemScript = {
    id: "pxcommands",
    title: "pxCommands",
    description: "A modular chat and command system for FiveM supporting ESX, QBCore, QBox, and standalone servers.",
    longDescription: `
\`pxCommands\` bridges the gap between complex frameworks and standalone simplicity. It handles the heavy lifting of command security creation and registration, leaving you to focus on the logic.

---

## Modular System
pxCommands uses a modular client side architecture. You can easily extend how players interact with your commands.

| Module | Description | Event Trigger |
| :--- | :--- | :--- |
| **Notifications** | Colored screen alerts | \`pxc:notify\` |
| **Overhead Text** | Floating 3D text | \`pxc:showFloatingText\` |


---

## Documentation

| Resource | Description |
| :--- | :--- |
| [Getting Started](https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/getting-started) | Full installation and framework setup. |
| [Command Packs](https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/command-packs) | How to write and register new commands. |
| [Config Reference](https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/configuration) | Deep dive into config.lua settings. |
| [Module Reference](https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/modules) | Introduction to our module system. |
| [Troubleshooting](https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/troubleshooting) | Common issues and information |
| [Architecture](https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/architecture) | Technical flow and module breakdown. |
    `,
    price: "Free",
    framework: "Standalone",
    status: "Released",
    version: "0.1.0",
    lastUpdated: "2026-04-10",
    features: [
        "Framework agnostic with explicit configuration",
        "Modular architecture (commands, modules, system)",
        "Event namespace (pxc:*)",
        "Server-side security enforcement",
        "Automatic command help and suggestions",
        "Range-based proximity messaging"
    ],
    images: [],
    tags: ["framework", "standalone", "commands", "custom-commands"],
    links: {
        documentation: "https://codemeapixel.dev/docs/scripts/fxserver/pxcommands/getting-started",
        github: "https://github.com/CodeMeAPixel/pxCommands",
        docs: "https://github.com/CodeMeAPixel/pxCommands/tree/main/docs",
        slug: "pxcommands"
    },
    requirements: [
        "FXServer (FiveM)",
        "Artifact 19771+",
        "LUA Development Experience"
    ],
    installation: "1. Download from GitHub\n2. Extract to resources/pxCommands/\n3. Add 'ensure pxCommands' to server.cfg\n4. Configure config.lua for your framework\n5. Restart server",
    deprecated: false,
    deprecatedMessage: ""
};

export default script;
