"use client";

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

// Import core highlight.js and a theme
import 'highlight.js/styles/night-owl.css';

// Configure marked with highlight.js for syntax highlighting
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                // Apply syntax highlighting first
                const highlighted = hljs.highlight(code, { language: lang }).value;
                return highlighted;
            } catch (error) {
                console.error("Highlight.js error:", error);
            }
        }
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    breaks: true
});

// Custom renderer
const renderer = new marked.Renderer();

// Add IDs to headings for linking
renderer.heading = function (text, level) {
    // Convert text to string and ensure it's safe to use as an ID
    const textStr = String(text || '');
    const id = textStr.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

    return `
    <h${level} id="${id}" class="heading-anchor">
      ${textStr}
    </h${level}>
  `;
};

// Custom code renderer to add language label and copy button
renderer.code = function (code, language) {
    const lang = language || 'text';
    const langDisplay = lang === 'jsx' ? 'React' :
        lang === 'tsx' ? 'React+TS' :
            lang === 'js' ? 'JavaScript' :
                lang.charAt(0).toUpperCase() + lang.slice(1);

    // Process the code with highlight.js
    const highlightedCode = hljs.highlight(code, { language: lang }).value;

    // Wrap in custom container with line numbers support
    return `
    <div class="code-block-container">
      <div class="code-header">
        <div class="code-dots">
          <span class="code-dot"></span>
          <span class="code-dot"></span>
          <span class="code-dot"></span>
        </div>
        <span class="code-language">${langDisplay}</span>
        <button class="copy-button" data-code="${encodeURIComponent(code)}">
          <span class="copy-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1-2 2v1"></path>
            </svg>
          </span>
          <span class="copied-icon" style="display:none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        </button>
      </div>
      <div class="code-content">
        <pre class="has-line-numbers"><code class="hljs language-${lang}">${highlightedCode}</code></pre>
      </div>
    </div>
  `;
};

// Set the custom renderer
marked.use({ renderer });

interface MDXContentProps {
    source: string;
}

export function MDXContent({ source }: MDXContentProps) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        try {
            if (!source) {
                console.error("Empty source content received");
                setHtml('<div class="error-message">No content available</div>');
                return;
            }

            // Convert markdown to HTML
            const renderedHtml = marked.parse(source);

            // Sanitize HTML for security (this removes potentially harmful scripts)
            const sanitizedHtml = DOMPurify.sanitize(renderedHtml);

            setHtml(sanitizedHtml);
        } catch (error) {
            console.error("Error rendering markdown:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setHtml(`<div class="error-message">Error rendering content: ${errorMessage}</div>`);
        }
    }, [source]);

    // Add copy functionality and line numbers to code blocks after rendering
    useEffect(() => {
        if (!html) return;

        try {
            // Add copy button functionality
            const copyButtons = document.querySelectorAll('.copy-button');

            copyButtons.forEach((button) => {
                button.addEventListener('click', async () => {
                    try {
                        const encodedCode = (button as HTMLElement).dataset.code || '';
                        const code = decodeURIComponent(encodedCode);
                        await navigator.clipboard.writeText(code);

                        // Update UI for feedback
                        const copyIcon = button.querySelector('.copy-icon');
                        const copiedIcon = button.querySelector('.copied-icon');

                        if (copyIcon && copiedIcon) {
                            copyIcon.setAttribute('style', 'display:none');
                            copiedIcon.setAttribute('style', 'display:inline-flex');
                            button.classList.add('copied');

                            setTimeout(() => {
                                copyIcon.setAttribute('style', 'display:inline-flex');
                                copiedIcon.setAttribute('style', 'display:none');
                                button.classList.remove('copied');
                            }, 2000);
                        }
                    } catch (err) {
                        console.error('Failed to copy code:', err);
                    }
                });
            });

            // Add line numbers to code blocks with improved spacing
            const codeBlocks = document.querySelectorAll('.has-line-numbers code');
            codeBlocks.forEach((block) => {
                const lines = (block.textContent || '').split('\n');
                const linesCount = lines.length;

                // Skip if we already added line numbers
                if (block.parentElement?.querySelector('.line-numbers-rows')) return;

                // Create line numbers container
                const lineNumbersContainer = document.createElement('div');
                lineNumbersContainer.className = 'line-numbers-rows';

                // Generate line numbers
                for (let i = 1; i <= linesCount; i++) {
                    const lineSpan = document.createElement('span');
                    lineSpan.setAttribute('data-line', i.toString());
                    lineNumbersContainer.appendChild(lineSpan);
                }

                // Add line numbers to the pre element (parent of code)
                const pre = block.parentElement;
                if (pre) {
                    pre.appendChild(lineNumbersContainer);
                    pre.classList.add('with-line-numbers');
                }
            });
        } catch (error) {
            console.error("Error enhancing code blocks:", error);
        }
    }, [html]);

    return (
        <div
            className="mdx-content"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
