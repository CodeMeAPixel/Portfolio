import DocsContent from "@/components/docs/DocsContent";
import TableOfContents from "@/components/docs/TableOfContents";
import { IoTerminal, IoWarning, IoInformationCircle } from "react-icons/io5";

export const metadata = {
    title: "Introduction to Documentation",
    description: "Learn about the purpose and structure of this documentation.",
};

export default function IntroductionPage() {
    const meta = {
        title: "Introduction to Documentation",
        description: "Learn about the purpose and structure of this documentation.",
        lastUpdated: "January 15, 2024",
        readingTime: "3 min read",
        authors: [
            { name: "CodeMeAPixel", url: "https://codemeapixel.dev" }
        ]
    };

    const nextDoc = {
        title: "Quick Start Guide",
        href: "/docs/getting-started/quick-start"
    };

    return (
        <DocsContent meta={meta} nextDoc={nextDoc} toc={<TableOfContents />}>
            <h2 id="overview">Overview</h2>
            <p>
                Welcome to the documentation hub! This comprehensive resource is designed to help you understand the
                architecture, components, and best practices for using our platform. Whether you're a developer,
                designer, or product manager, you'll find valuable information to enhance your workflow.
            </p>

            <div className="bg-primary-900/30 border-l-4 border-primary-400 p-4 rounded-r-lg my-6">
                <div className="flex items-start gap-3">
                    <IoInformationCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-primary-300 mb-1">Tip</h4>
                        <p className="text-color-text-muted text-sm">
                            Use the search functionality (Ctrl+K or Cmd+K) to quickly find specific topics across all documentation.
                        </p>
                    </div>
                </div>
            </div>

            <h2 id="documentation-structure">Documentation Structure</h2>
            <p>
                The documentation is organized into several main sections to help you find what you need:
            </p>

            <ul>
                <li><strong>Getting Started</strong> - Introduction, installation, and quick start guides</li>
                <li><strong>Frontend Development</strong> - Components, styling, and UI patterns</li>
                <li><strong>Backend Development</strong> - API references, authentication, and data models</li>
                <li><strong>Deployment</strong> - Build processes, hosting options, and CI/CD pipelines</li>
            </ul>

            <h2 id="code-examples">Code Examples</h2>
            <p>
                Throughout the documentation, you'll find code examples to help illustrate concepts.
                Here's a simple example of a React component:
            </p>

            <pre className="language-tsx">
                <code>{`import React from 'react';

function Button({ children, variant = 'primary' }) {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}

export default Button;`}</code>
            </pre>

            <h3 id="terminal-commands">Terminal Commands</h3>
            <p>
                When terminal commands are needed, they'll be presented in a clear format:
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
                        <span className="ml-2">npm install @codemeapixel/ui-library</span>
                    </div>
                </div>
            </div>

            <h2 id="warnings-and-notes">Warnings and Notes</h2>
            <p>
                Important information will be highlighted using note and warning blocks:
            </p>

            <div className="bg-amber-900/30 border-l-4 border-amber-300 p-4 rounded-r-lg my-6">
                <div className="flex items-start gap-3">
                    <IoWarning className="w-6 h-6 text-amber-300 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-amber-300 mb-1">Warning</h4>
                        <p className="text-color-text-muted text-sm">
                            Always backup your data before performing upgrades or making significant changes to your configuration.
                        </p>
                    </div>
                </div>
            </div>

            <h2 id="contributing">Contributing to Documentation</h2>
            <p>
                This documentation is continuously improved, and we welcome contributions from the community.
                If you notice errors, have suggestions for improvements, or want to contribute new content,
                please refer to our contribution guidelines.
            </p>

            <h2 id="getting-help">Getting Help</h2>
            <p>
                If you can't find what you're looking for in the documentation, there are several ways to get help:
            </p>

            <ul>
                <li>Submit an issue in our GitHub repository</li>
                <li>Join our community Discord server</li>
                <li>Reach out through the contact form on the website</li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>
            <p>
                Now that you're familiar with the documentation structure, you can proceed to the Quick Start Guide to
                begin working with our platform or explore specific topics that interest you.
            </p>
        </DocsContent>
    );
}
