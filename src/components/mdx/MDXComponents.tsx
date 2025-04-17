"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

// Custom heading components with animations
const headingVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const H1 = (props: React.ComponentPropsWithoutRef<"h1">) => (
    <motion.h1
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className="heading-primary mb-4"
        {...props}
    />
);

const H2 = (props: React.ComponentPropsWithoutRef<"h2">) => (
    <motion.h2
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className="heading-secondary mt-12 mb-4 pb-2 border-b border-primary-700/30"
        {...props}
    />
);

const H3 = (props: React.ComponentPropsWithoutRef<"h3">) => (
    <motion.h3
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        className="text-xl font-bold mt-8 mb-4 text-primary-300"
        {...props}
    />
);

// Custom code block with syntax highlighting
const CodeBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const language = className ? className.replace(/language-/, '') : '';

    return (
        <div className="relative group rounded-lg overflow-hidden my-6">
            <div className="absolute top-2 right-2 px-2 py-1 text-xs font-mono rounded-md bg-primary-900/40 text-primary-300 border border-primary-700/30 opacity-70">
                {language}
            </div>
            <pre className={`${className} p-4 overflow-x-auto`}>
                {children}
            </pre>
        </div>
    );
};

// Custom image component
const CustomImage = (props: React.ComponentPropsWithoutRef<"img"> & { width?: number, height?: number }) => {
    // If the image is served from an external domain, use the default img tag
    if (props.src && (props.src.startsWith('http://') || props.src.startsWith('https://'))) {
        return (
            <div className="my-8 overflow-hidden rounded-lg border border-primary-800/20 shadow-lg">
                <img {...props} className="w-full h-auto" />
            </div>
        );
    }

    // Otherwise use Next.js optimized Image component
    return (
        <div className="my-8 overflow-hidden rounded-lg border border-primary-800/20 shadow-lg">
            <Image
                src={props.src || ''}
                alt={props.alt || ''}
                width={props.width || 1200}
                height={props.height || 630}
                className="w-full h-auto"
            />
        </div>
    );
};

// Custom blockquote component
const BlockQuote = (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
        className="border-l-4 border-primary-500 pl-4 py-1 my-6 bg-primary-900/10 rounded-r-lg italic"
        {...props}
    />
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

// Custom table components
const Table = (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-primary-800/20">
        <table className="min-w-full divide-y divide-primary-800/20" {...props} />
    </div>
);

const TH = (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
        className="px-4 py-3 bg-primary-900/20 text-left text-xs font-medium text-primary-300 uppercase tracking-wider"
        {...props}
    />
);

const TD = (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
        className="px-4 py-3 whitespace-nowrap text-sm border-b border-primary-800/10"
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
