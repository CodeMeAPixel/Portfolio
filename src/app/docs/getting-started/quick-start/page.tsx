import DocsContent from "@/components/docs/DocsContent";
import TableOfContents from "@/components/docs/TableOfContents";
import { IoRocket, IoCheckmarkCircle } from "react-icons/io5";

export const metadata = {
    title: "Quick Start Guide",
    description: "Get up and running quickly with our starter templates.",
};

export default function QuickStartPage() {
    const meta = {
        title: "Quick Start Guide",
        description: "Get up and running quickly with our starter templates.",
        lastUpdated: "January 18, 2024",
        readingTime: "5 min read",
        authors: [
            { name: "CodeMeAPixel", url: "https://codemeapixel.dev" }
        ]
    };

    const prevDoc = {
        title: "Introduction",
        href: "/docs/getting-started"
    };

    const nextDoc = {
        title: "Installation",
        href: "/docs/getting-started/installation"
    };

    return (
        <DocsContent
            meta={meta}
            prevDoc={prevDoc}
            nextDoc={nextDoc}
            toc={<TableOfContents />}
        >
            <h2 id="quick-setup">Quick Setup</h2>
            <p>
                This guide will help you set up a new project in just a few minutes.
                Follow these steps to create a basic application with our recommended configuration.
            </p>

            <h3 id="prerequisites">Prerequisites</h3>
            <p>Before you begin, make sure you have the following installed:</p>
            <ul>
                <li>Node.js (v16 or higher)</li>
                <li>npm (v7 or higher) or Yarn</li>
                <li>Git</li>
            </ul>

            <h2 id="starter-templates">Starter Templates</h2>
            <p>
                We provide several starter templates to help you get up and running quickly.
                Choose the template that best fits your project requirements:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="card p-5 border-primary-700/30">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-primary-900/30 p-2 rounded-lg">
                            <IoRocket className="w-6 h-6 text-primary-400" />
                        </div>
                        <h4 className="text-lg font-medium text-primary-300">Basic Template</h4>
                    </div>
                    <p className="text-color-text-muted text-sm mb-3">
                        A minimal setup with essential components and configuration.
                        Perfect for small projects or prototypes.
                    </p>
                    <div className="bg-card-alt/50 p-3 rounded-lg font-mono text-xs">
                        npx create-app@latest --template basic
                    </div>
                </div>

                <div className="card p-5 border-primary-700/30">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-primary-900/30 p-2 rounded-lg">
                            <IoRocket className="w-6 h-6 text-primary-400" />
                        </div>
                        <h4 className="text-lg font-medium text-primary-300">Full Stack</h4>
                    </div>
                    <p className="text-color-text-muted text-sm mb-3">
                        Complete setup with frontend, backend, and database configuration.
                        Ideal for production applications.
                    </p>
                    <div className="bg-card-alt/50 p-3 rounded-lg font-mono text-xs">
                        npx create-app@latest --template fullstack
                    </div>
                </div>
            </div>

            <h2 id="step-by-step">Step-by-Step Setup</h2>
            <p>
                Follow these steps to create a new project using our CLI tool:
            </p>

            <ol className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 flex items-center justify-center w-7 h-7 rounded-full text-primary-400 font-medium flex-shrink-0 mt-0.5">1</div>
                    <div>
                        <h4 className="font-medium text-color-text">Create a new project</h4>
                        <p className="text-color-text-muted mt-1">Run the following command to create a new project:</p>
                        <div className="bg-card-alt/50 p-3 rounded-lg font-mono text-xs mt-2">
                            npx create-app@latest my-awesome-project
                        </div>
                    </div>
                </li>

                <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 flex items-center justify-center w-7 h-7 rounded-full text-primary-400 font-medium flex-shrink-0 mt-0.5">2</div>
                    <div>
                        <h4 className="font-medium text-color-text">Navigate to the project directory</h4>
                        <div className="bg-card-alt/50 p-3 rounded-lg font-mono text-xs mt-2">
                            cd my-awesome-project
                        </div>
                    </div>
                </li>

                <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 flex items-center justify-center w-7 h-7 rounded-full text-primary-400 font-medium flex-shrink-0 mt-0.5">3</div>
                    <div>
                        <h4 className="font-medium text-color-text">Install dependencies</h4>
                        <div className="bg-card-alt/50 p-3 rounded-lg font-mono text-xs mt-2">
                            npm install
                            # or
                            yarn
                        </div>
                    </div>
                </li>

                <li className="flex items-start gap-3">
                    <div className="bg-primary-900/30 flex items-center justify-center w-7 h-7 rounded-full text-primary-400 font-medium flex-shrink-0 mt-0.5">4</div>
                    <div>
                        <h4 className="font-medium text-color-text">Start the development server</h4>
                        <div className="bg-card-alt/50 p-3 rounded-lg font-mono text-xs mt-2">
                            npm run dev
                            # or
                            yarn dev
                        </div>
                    </div>
                </li>
            </ol>

            <h2 id="project-structure">Project Structure</h2>
            <p>
                After setting up your project, you'll have a directory structure similar to this:
            </p>

            <pre className="language-text">
                <code>{`my-awesome-project/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── pages/        # Application pages
│   ├── styles/       # CSS and style definitions
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   └── index.tsx     # Application entry point
├── .env              # Environment variables
├── package.json      # Project dependencies
└── tsconfig.json     # TypeScript configuration`}</code>
            </pre>

            <h2 id="key-features">Key Features</h2>
            <p>
                Our starter templates come with several key features to help you build robust applications:
            </p>

            <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                    <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-color-text">TypeScript Support</h4>
                        <p className="text-color-text-muted text-sm">
                            Full TypeScript support with pre-configured settings for better type safety.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-color-text">Component Library</h4>
                        <p className="text-color-text-muted text-sm">
                            Pre-built UI components that follow design best practices.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-color-text">Responsive Layouts</h4>
                        <p className="text-color-text-muted text-sm">
                            Mobile-first responsive design with Tailwind CSS.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <IoCheckmarkCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-color-text">Authentication</h4>
                        <p className="text-color-text-muted text-sm">
                            Ready-to-use authentication system with multiple providers.
                        </p>
                    </div>
                </div>
            </div>

            <h2 id="whats-next">What's Next?</h2>
            <p>
                Now that you have your project set up, you can:
            </p>

            <ul>
                <li>Explore the <a href="/docs/frontend/components" className="text-primary-400 hover:text-primary-300 transition-colors">Component Library</a> to understand available UI elements</li>
                <li>Learn about the <a href="/docs/frontend/styling" className="text-primary-400 hover:text-primary-300 transition-colors">Styling System</a> to customize the look and feel</li>
                <li>Set up <a href="/docs/backend/api" className="text-primary-400 hover:text-primary-300 transition-colors">API endpoints</a> for your application</li>
                <li>Configure <a href="/docs/deployment/build" className="text-primary-400 hover:text-primary-300 transition-colors">deployment options</a> for your production environment</li>
            </ul>

            <p className="mt-6">
                For a more detailed installation guide, proceed to the <a href="/docs/getting-started/installation" className="text-primary-400 hover:text-primary-300 transition-colors">Installation</a> section.
            </p>
        </DocsContent>
    );
}
