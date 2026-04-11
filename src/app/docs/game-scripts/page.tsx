import DocsContent from "../../../components/docs/DocsContent";
import { IoTerminal, IoWarning, IoInformationCircle } from "react-icons/io5";

export const metadata = {
    title: "Game Scripts & Resources",
    description: "Comprehensive documentation for FiveM, RedM, Minecraft, and other game server scripts.",
};

export default function GameScriptsPage() {
    const meta = {
        title: "Game Scripts & Resources",
        description: "Comprehensive documentation for FiveM, RedM, Minecraft, and other game server scripts.",
        lastUpdated: "April 10, 2026",
        readingTime: "4 min read",
        authors: [
            { name: "CodeMeAPixel", url: "https://codemeapixel.dev" }
        ]
    };

    const nextDoc = {
        title: "pxLoadingScreen for FiveM",
        href: "/docs/scripts/fxserver/pxloadingscreen/setup"
    };

    return (
        <DocsContent meta={meta} nextDoc={nextDoc}>
            <h2 id="overview">Overview</h2>
            <p>
                Welcome to the game scripts documentation hub! Here you'll find comprehensive guides for developing,
                installing, and managing scripts and resources for various game servers including FiveM, RedM, and more.
                Whether you're setting up a simple resource or building a complete game mode, this documentation will
                guide you through the process.
            </p>

            <div className="bg-primary-900/30 border-l-4 border-primary-400 p-4 rounded-r-lg my-6">
                <div className="flex items-start gap-3">
                    <IoInformationCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-primary-300 mb-1">Tip</h4>
                        <p className="text-color-text-muted text-sm">
                            Most scripts are open source and available on GitHub. Start by reviewing existing resources to understand patterns and best practices.
                        </p>
                    </div>
                </div>
            </div>

            <h2 id="supported-platforms">Supported Platforms</h2>
            <p>
                This documentation covers scripts and resources for the following platforms:
            </p>

            <ul>
                <li><strong>FiveM</strong> - GTA V roleplay and customization framework</li>
                <li><strong>RedM</strong> - Red Dead Redemption 2 server framework</li>
                <li><strong>Minecraft</strong> - Server plugins and mods</li>
            </ul>

            <h2 id="documentation-structure">Documentation Structure</h2>
            <p>
                The game scripts documentation is organized by platform and resource type:
            </p>

            <ul>
                <li><strong>FXServer Guides</strong> - FiveM/RedM server setup, management, and resource development</li>
                <li><strong>Resources & Scripts</strong> - Documentation for specific available resources</li>
                <li><strong>Development</strong> - Lua scripting, frameworks, and best practices</li>
                <li><strong>Troubleshooting</strong> - Common issues and debugging techniques</li>
            </ul>

            <h2 id="fivem-basics">FiveM Basics</h2>
            <p>
                FiveM is a modification framework for GTA V, allowing you to run custom game modes on dedicated servers.
                Here's a simple example of a Lua resource:
            </p>

            <pre className="language-lua">
                <code>{`-- fxmanifest.lua
fx_version 'cerulean'
game 'gta5'

author 'Your Name'
description 'A simple example resource'
version '1.0.0'

shared_scripts {
  'shared.lua'
}

client_scripts {
  'client.lua'
}

server_scripts {
  'server.lua'
}

-- client.lua
RegisterCommand('hello', function(source, args, rawCommand)
  TriggerEvent('chat:addMessage', {
    color = {255, 0, 0},
    multiline = true,
    args = {"Hello!", "Welcome to FiveM"}
  })
end, false)`}</code>
            </pre>

            <h3 id="starting-fxserver">Starting an FXServer</h3>
            <p>
                To run your FiveM server locally or in production:
            </p>

            <div className="bg-card-alt border border-color-border rounded-lg my-6 overflow-hidden">
                <div className="flex items-center px-4 py-2 bg-card border-b border-color-border">
                    <div className="flex gap-1.5 mr-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400/70"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>
                    <span className="text-xs text-color-text-muted">Terminal</span>
                </div>
                <div className="p-4 font-mono text-sm">
                    <div className="flex">
                        <span className="text-primary-400">$</span>
                        <span className="ml-2">./run.sh</span>
                    </div>
                    <div className="text-color-text-muted mt-2 text-xs">
                        # Your FiveM server will start and load all resources from resources.cfg
                    </div>
                </div>
            </div>

            <h2 id="best-practices">Best Practices</h2>
            <p>
                When developing scripts and resources, follow these best practices:
            </p>

            <div className="bg-amber-900/30 border-l-4 border-amber-300 p-4 rounded-r-lg my-6">
                <div className="flex items-start gap-3">
                    <IoWarning className="w-6 h-6 text-amber-300 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-amber-300 mb-1">Important</h4>
                        <p className="text-color-text-muted text-sm">
                            Always test your scripts on a local server before deploying to production. Breaking changes can disrupt the player experience.
                        </p>
                    </div>
                </div>
            </div>

            <ul>
                <li>Use version control (Git) for all your resources</li>
                <li>Follow consistent naming conventions and code style</li>
                <li>Implement proper error handling and logging</li>
                <li>Document your APIs and configuration options</li>
                <li>Use events and exports for resource communication</li>
                <li>Test with various client versions and configurations</li>
                <li>Keep resources modular and independent where possible</li>
            </ul>

            <h2 id="getting-started">Getting Started</h2>
            <p>
                Choose your platform and follow the setup guide:
            </p>

            <ul>
                <li><strong>FiveM</strong> - Start with FXServer setup and your first resource</li>
                <li><strong>RedM</strong> - Configure RedM server and Red Dead framework resources</li>
                <li><strong>Minecraft</strong> - Install and configure server plugins</li>
            </ul>

            <h2 id="community">Community & Support</h2>
            <p>
                Join the community and get help with your game scripts:
            </p>

            <ul>
                <li>Join the FiveM forums and Discord community</li>
                <li>Check GitHub repositories for open source resources</li>
                <li>Review existing resource code to learn patterns</li>
                <li>Reach out in relevant community channels with specific questions</li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>
            <p>
                Ready to get started with game scripts? Here's what to do next:
            </p>

            <ul>
                <li>Set up your FXServer or game server environment</li>
                <li>Install and configure a framework (ESX, QBCore, etc.)</li>
                <li>Download and install your first resources</li>
                <li>Review script documentation for configuration options</li>
                <li>Begin developing your own custom resources</li>
            </ul>
        </DocsContent>
    );
}
