import DocsContent from "../../../components/docs/DocsContent";
import { IoTerminal, IoWarning, IoInformationCircle } from "react-icons/io5";

export const metadata = {
    title: "FXServer Management",
    description: "Learn how to manage, configure, and optimize your FiveM/RedM server infrastructure.",
};

export default function ServerManagementPage() {
    const meta = {
        title: "FXServer Management",
        description: "Learn how to manage, configure, and optimize your FiveM/RedM server infrastructure.",
        lastUpdated: "April 10, 2026",
        readingTime: "5 min read",
        authors: [
            { name: "CodeMeAPixel", url: "https://codemeapixel.dev" }
        ]
    };

    const nextDoc = {
        title: "Server Configuration",
        href: "/docs/server-management/configuration"
    };

    return (
        <DocsContent meta={meta} nextDoc={nextDoc}>
            <h2 id="overview">Overview</h2>
            <p>
                FXServer management covers the essential practices and tools needed to run, maintain, and optimize
                your FiveM or RedM server. This documentation provides comprehensive guides for installation, configuration,
                resource management, and troubleshooting.
            </p>

            <div className="bg-primary-900/30 border-l-4 border-primary-400 p-4 rounded-r-lg my-6">
                <div className="flex items-start gap-3">
                    <IoInformationCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-primary-300 mb-1">Tip</h4>
                        <p className="text-color-text-muted text-sm">
                            Keep your FXServer artifacts up to date for security patches, performance improvements, and new features.
                        </p>
                    </div>
                </div>
            </div>

            <h2 id="documentation-structure">Documentation Structure</h2>
            <p>
                The server management documentation is organized into the following sections:
            </p>

            <ul>
                <li><strong>Installation & Setup</strong> - Getting your FXServer up and running</li>
                <li><strong>Configuration</strong> - server.cfg, resource management, and optimization</li>
                <li><strong>Resource Development</strong> - Creating and managing custom resources</li>
                <li><strong>Security</strong> - ACE permissions, authentication, and data protection</li>
                <li><strong>Monitoring</strong> - Performance metrics, logging, and diagnostics</li>
                <li><strong>Troubleshooting</strong> - Common issues and their solutions</li>
            </ul>

            <h2 id="key-concepts">Key Concepts</h2>
            <p>
                Before diving into specific topics, it's helpful to understand some key concepts:
            </p>

            <ul>
                <li><strong>Resources</strong> - Modular packages that add functionality to your server</li>
                <li><strong>Artifacts</strong> - Versioned FXServer binaries with specific capabilities</li>
                <li><strong>Framework</strong> - Base systems like ESX, QBCore, or QBox that provide shared functionality</li>
                <li><strong>ACE Permissions</strong> - Access Control Entry system for managing who can execute commands</li>
                <li><strong>Convars</strong> - Configuration variables that control server behavior</li>
            </ul>

            <h2 id="quick-server-setup">Quick Server Setup</h2>
            <p>
                Here's a minimal example of a server.cfg to get started:
            </p>

            <pre className="language-text">
                <code>{`# Server Identity
sv_serverName "My FiveM Server"
sv_maxclients 32
sv_hostname "my-server.example.com"

# Execution
exec resources.cfg

# Server Token (from https://keymaster.fivem.net/)
sv_licenseKey "YOUR_LICENSE_KEY_HERE"

# Recommended CVars
set sv_enforceGameBuild 14995
set sv_pure 1
set onesync on
set mysql_slow_query_warning 100`}</code>
            </pre>

            <h3 id="terminal-setup">Starting Your Server</h3>
            <p>
                Use the following command to start your server:
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
                        # On Windows: run.cmd
                    </div>
                </div>
            </div>

            <h2 id="resource-management">Resource Management</h2>
            <p>
                Resources are the foundation of your server's functionality. They can be developed independently and
                loaded based on your needs. Common patterns include:
            </p>

            <ul>
                <li><strong>Framework Resources</strong> - Core systems providing shared API (ESX, QBCore)</li>
                <li><strong>Feature Resources</strong> - Add-ons that depend on a framework</li>
                <li><strong>Standalone Resources</strong> - Independent functionality that doesn't require a framework</li>
            </ul>

            <h2 id="best-practices">Best Practices</h2>

            <div className="bg-amber-900/30 border-l-4 border-amber-300 p-4 rounded-r-lg my-6">
                <div className="flex items-start gap-3">
                    <IoWarning className="w-6 h-6 text-amber-300 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-amber-300 mb-1">Important</h4>
                        <p className="text-color-text-muted text-sm">
                            Always backup your server data and test updates on a staging server before deploying to production.
                        </p>
                    </div>
                </div>
            </div>

            <p>
                Follow these best practices to maintain a stable and secure server:
            </p>

            <ul>
                <li>Keep your FXServer artifacts updated to the latest version</li>
                <li>Use version control (Git) for your resources and configuration</li>
                <li>Implement proper ACE permission structure for admin commands</li>
                <li>Monitor server performance and resource usage regularly</li>
                <li>Document your custom resources and configuration choices</li>
                <li>Test updates in a staging environment first</li>
                <li>Maintain regular backups of your database and configurations</li>
            </ul>

            <h2 id="getting-support">Getting Support</h2>
            <p>
                If you encounter issues or have questions about server management:
            </p>

            <ul>
                <li>Check the troubleshooting section for common solutions</li>
                <li>Review FXServer console logs for error messages</li>
                <li>Search the FiveM forums and community Discord</li>
                <li>Contact resource developers for resource-specific issues</li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>
            <p>
                Now that you have a foundation, explore the specific sections to deepen your knowledge:
            </p>

            <ul>
                <li>Read about detailed <strong>Configuration</strong> options</li>
                <li>Learn how to manage <strong>Resources</strong> effectively</li>
                <li>Implement <strong>Security</strong> best practices</li>
                <li>Set up <strong>Monitoring</strong> and diagnostics</li>
            </ul>
        </DocsContent>
    );
}
