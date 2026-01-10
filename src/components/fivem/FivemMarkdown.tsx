"use client";

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

// Import highlight.js theme
import 'highlight.js/styles/night-owl.css';

// Configure marked for GFM support
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (error) {
                console.error("Highlight.js error:", error);
            }
        }
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    breaks: true
});

// Custom renderer for FiveM markdown
const renderer = new marked.Renderer();

// Custom blockquote to support GitHub-style alerts
renderer.blockquote = function (quote) {
    const quoteStr = String(quote || '');

    // Check for GitHub-style alerts: [!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION]
    const alertMatch = quoteStr.match(/^\s*<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);

    if (alertMatch) {
        const alertType = alertMatch[1].toUpperCase();
        const content = quoteStr.replace(alertMatch[0], '<p>');

        const alertConfig: Record<string, { icon: string; label: string; accentColor: string; bgGradient: string; borderColor: string; iconBg: string }> = {
            NOTE: {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gfm-alert-icon"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
                label: 'Note',
                accentColor: 'text-blue-400',
                bgGradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
                borderColor: 'border-l-blue-500',
                iconBg: 'bg-blue-500/20'
            },
            TIP: {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gfm-alert-icon"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.9V17h8v-2.1A7 7 0 0 0 12 2z"/></svg>`,
                label: 'Tip',
                accentColor: 'text-emerald-400',
                bgGradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
                borderColor: 'border-l-emerald-500',
                iconBg: 'bg-emerald-500/20'
            },
            IMPORTANT: {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gfm-alert-icon"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
                label: 'Important',
                accentColor: 'text-violet-400',
                bgGradient: 'from-violet-500/15 via-violet-500/5 to-transparent',
                borderColor: 'border-l-violet-500',
                iconBg: 'bg-violet-500/20'
            },
            WARNING: {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gfm-alert-icon"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
                label: 'Warning',
                accentColor: 'text-amber-400',
                bgGradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
                borderColor: 'border-l-amber-500',
                iconBg: 'bg-amber-500/20'
            },
            CAUTION: {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="gfm-alert-icon"><path d="M12 9v4"/><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.871L13.637 3.591a1.914 1.914 0 0 0-3.274 0z"/><path d="M12 17h.01"/></svg>`,
                label: 'Caution',
                accentColor: 'text-red-400',
                bgGradient: 'from-red-500/15 via-red-500/5 to-transparent',
                borderColor: 'border-l-red-500',
                iconBg: 'bg-red-500/20'
            }
        };

        const config = alertConfig[alertType];

        return `
            <div class="gfm-alert relative overflow-hidden rounded-lg border-l-4 ${config.borderColor} bg-gradient-to-r ${config.bgGradient} backdrop-blur-sm my-4">
                <div class="p-3 sm:p-4">
                    <div class="flex items-center gap-2 sm:gap-3 mb-2">
                        <div class="${config.accentColor} ${config.iconBg} p-1.5 sm:p-2 rounded-lg flex-shrink-0">${config.icon}</div>
                        <span class="${config.accentColor} font-semibold text-sm">${config.label}</span>
                    </div>
                    <div class="text-color-text-muted text-sm leading-relaxed gfm-alert-content pl-0 sm:pl-11">${content}</div>
                </div>
            </div>
        `;
    }

    // Default blockquote styling
    return `<blockquote class="border-l-4 border-primary-500/50 bg-primary-500/10 rounded-r-lg pl-4 pr-4 py-3 my-4 text-color-text-muted italic">${quoteStr}</blockquote>`;
};

// Custom code block renderer - responsive
renderer.code = function (code, language) {
    const lang = language || 'text';
    const langDisplay = lang === 'jsx' ? 'React' :
        lang === 'tsx' ? 'React+TS' :
            lang === 'js' ? 'JavaScript' :
                lang === 'lua' ? 'Lua' :
                    lang === 'cfg' ? 'Config' :
                        lang.charAt(0).toUpperCase() + lang.slice(1);

    let highlightedCode: string;
    try {
        highlightedCode = hljs.highlight(code, { language: lang }).value;
    } catch {
        highlightedCode = hljs.highlightAuto(code).value;
    }

    return `
        <div class="fivem-code-block rounded-lg sm:rounded-xl overflow-hidden my-4 border border-white/10 bg-black/30 -mx-2 sm:mx-0">
            <div class="flex items-center justify-between px-3 sm:px-4 py-2 bg-white/5 border-b border-white/10">
                <div class="flex items-center gap-1.5 sm:gap-2">
                    <span class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/60"></span>
                    <span class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60"></span>
                    <span class="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/60"></span>
                </div>
                <span class="text-[10px] sm:text-xs text-color-text-muted font-mono">${langDisplay}</span>
            </div>
            <pre class="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm"><code class="hljs language-${lang}">${highlightedCode}</code></pre>
        </div>
    `;
};

// Custom inline code
renderer.codespan = function (code) {
    return `<code class="px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-300 text-sm font-mono">${code}</code>`;
};

// Custom links
renderer.link = function (href, title, text) {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${href}"${titleAttr} class="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

// Custom list styling
renderer.list = function (body, ordered) {
    const tag = ordered ? 'ol' : 'ul';
    const listClass = ordered
        ? 'list-decimal list-inside space-y-2 my-4 text-color-text-muted'
        : 'list-disc list-inside space-y-2 my-4 text-color-text-muted';
    return `<${tag} class="${listClass}">${body}</${tag}>`;
};

renderer.listitem = function (text) {
    return `<li class="leading-relaxed">${text}</li>`;
};

// Custom headings
renderer.heading = function (text, level) {
    const sizes: Record<number, string> = {
        1: 'text-2xl font-bold text-color-text mb-4 mt-6',
        2: 'text-xl font-bold text-color-text mb-3 mt-5',
        3: 'text-lg font-semibold text-color-text mb-2 mt-4',
        4: 'text-base font-semibold text-color-text mb-2 mt-3',
        5: 'text-sm font-semibold text-color-text mb-1 mt-2',
        6: 'text-sm font-medium text-color-text-muted mb-1 mt-2'
    };
    return `<h${level} class="${sizes[level]}">${text}</h${level}>`;
};

// Custom paragraph
renderer.paragraph = function (text) {
    return `<p class="text-color-text-muted leading-relaxed mb-4">${text}</p>`;
};

// Custom horizontal rule
renderer.hr = function () {
    return `<hr class="border-t border-white/10 my-6" />`;
};

// Custom table - with responsive wrapper
renderer.table = function (header, body) {
    return `
        <div class="table-wrapper overflow-x-auto my-4 rounded-xl border border-white/10 -mx-2 sm:mx-0">
            <table class="w-full text-sm min-w-[400px]">
                <thead class="bg-white/5">${header}</thead>
                <tbody>${body}</tbody>
            </table>
        </div>
    `;
};

renderer.tablerow = function (content) {
    return `<tr class="border-b border-white/5">${content}</tr>`;
};

renderer.tablecell = function (content, flags) {
    const tag = flags.header ? 'th' : 'td';
    const align = flags.align ? ` style="text-align: ${flags.align}"` : '';
    const cellClass = flags.header
        ? 'px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-color-text text-xs sm:text-sm whitespace-nowrap'
        : 'px-2 sm:px-4 py-2 sm:py-3 text-color-text-muted text-xs sm:text-sm';
    return `<${tag} class="${cellClass}"${align}>${content}</${tag}>`;
};

// Set the custom renderer
marked.use({ renderer });

interface FivemMarkdownProps {
    content: string;
    className?: string;
}

export function FivemMarkdown({ content, className = '' }: FivemMarkdownProps) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        try {
            if (!content) {
                setHtml('');
                return;
            }

            // Trim leading/trailing whitespace from the content
            const trimmedContent = content.trim();

            // Convert markdown to HTML
            const renderedHtml = marked.parse(trimmedContent);

            // Sanitize HTML for security but allow our custom classes and SVGs
            const sanitizedHtml = DOMPurify.sanitize(renderedHtml, {
                ADD_TAGS: ['svg', 'path', 'circle', 'polyline', 'rect'],
                ADD_ATTR: ['viewBox', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'rx', 'ry', 'points', 'class']
            });

            setHtml(sanitizedHtml);
        } catch (error) {
            console.error("Error rendering markdown:", error);
            setHtml(`<p class="text-red-400">Error rendering content</p>`);
        }
    }, [content]);

    return (
        <div
            className={`fivem-markdown ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export default FivemMarkdown;
