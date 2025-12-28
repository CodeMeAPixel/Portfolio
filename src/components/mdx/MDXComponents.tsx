"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Custom Link component that wraps Next.js Link
const CustomLink = ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a">) => {
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props}>{children}</a>
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 group"
            {...props}
        >
            {children}
            <span className="inline-block text-xs opacity-70 group-hover:translate-x-0.5 transition-transform">↗</span>
        </a>
    );
};

// Custom heading components with CSS animations
const H1 = (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
        className="heading-primary mb-4 animate-fade-up"
        {...props}
    />
);

const H2 = (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
        className="heading-secondary mt-12 mb-4 pb-2 border-b border-primary-700/30 animate-fade-up"
        {...props}
    />
);

const H3 = (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
        className="text-xl font-bold mt-8 mb-4 text-primary-300 animate-fade-up"
        {...props}
    />
);

// Custom code block with premium glassmorphism styling
const CodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const language = className ? className.replace(/language-/, '') : '';
    const langDisplay = language === 'jsx' ? 'React' :
        language === 'tsx' ? 'React+TS' :
            language === 'js' ? 'JavaScript' :
                language === 'ts' ? 'TypeScript' :
                    language.charAt(0).toUpperCase() + language.slice(1);

    return (
        <div className="relative group rounded-xl overflow-hidden my-8 glass-ultra border border-white/10 shadow-xl shadow-black/20">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 border border-primary-500/20">
                    {langDisplay}
                </span>
            </div>
            <pre className={`${className} p-4 overflow-x-auto text-sm`}>
                {children}
            </pre>
        </div>
    );
};

// Custom image component with premium styling
const CustomImage = (props: React.ComponentPropsWithoutRef<"img"> & { width?: number, height?: number }) => {
    // If the image is served from an external domain, use the default img tag
    if (props.src && (props.src.startsWith('http://') || props.src.startsWith('https://'))) {
        return (
            <div className="my-8 overflow-hidden rounded-xl glass-ultra border border-white/10 shadow-xl shadow-black/20 group">
                <div className="relative">
                    <img alt={props.alt || "Image"} {...props} className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            </div>
        );
    }

    // Otherwise use Next.js optimized Image component
    return (
        <div className="my-8 overflow-hidden rounded-xl glass-ultra border border-white/10 shadow-xl shadow-black/20 group">
            <div className="relative">
                <Image
                    src={props.src || ''}
                    alt={props.alt || ''}
                    width={props.width || 1200}
                    height={props.height || 630}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </div>
    );
};

// Custom blockquote component with premium styling
const BlockQuote = (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
        className="relative border-l-4 border-gradient-to-b from-primary-400 to-accent-500 pl-6 pr-4 py-4 my-8 glass-frost rounded-r-xl italic text-color-text-muted border-primary-500 shadow-lg shadow-primary-500/10"
        {...props}
    >
        <span className="absolute -left-3 -top-3 text-4xl text-primary-500/30 font-serif">&ldquo;</span>
    </blockquote>
);

// Custom list items
const UL = (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-color-text-muted" {...props} />
);

const OL = (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-color-text-muted" {...props} />
);

const LI = (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="pl-2" {...props} />
);

// Custom table components with premium glassmorphism
const Table = (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-8 rounded-xl glass-ultra border border-white/10 shadow-xl shadow-black/20">
        <table className="min-w-full divide-y divide-white/10" {...props} />
    </div>
);

const TH = (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
        className="px-5 py-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-left text-xs font-semibold text-primary-300 uppercase tracking-wider border-b border-white/10"
        {...props}
    />
);

const TD = (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
        className="px-5 py-4 text-sm border-b border-white/5 text-color-text-muted transition-colors hover:bg-white/5"
        {...props}
    />
);

export const MDXComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    a: CustomLink,
    img: CustomImage,
    pre: CodeBlock,
    blockquote: BlockQuote,
    ul: UL,
    ol: OL,
    li: LI,
    table: Table,
    th: TH,
    td: TD
};
