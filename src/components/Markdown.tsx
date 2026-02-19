import { useMemo } from 'react'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'

/* ─── Register languages ─────────────────────────────── */
import lua from 'highlight.js/lib/languages/lua'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import markdown from 'highlight.js/lib/languages/markdown'

hljs.registerLanguage('lua', lua)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)

/* ─── Configure marked with highlight extension ──────── */
marked.use(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    },
  }),
)

marked.setOptions({
  breaks: true,
  gfm: true,
})

interface MarkdownProps {
  content: string
  className?: string
}

/** Strip YAML frontmatter (--- ... ---) from the top of content */
function stripFrontmatter(raw: string): string {
  return raw.replace(/^\s*---[\s\S]*?---\s*/, '')
}

/** Wrap bare <table> elements in a scrollable container */
function wrapTables(html: string): string {
  return html.replace(
    /<table>/g,
    '<div class="table-wrapper"><table>',
  ).replace(/<\/table>/g, '</table></div>')
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const html = useMemo(() => {
    const clean = stripFrontmatter(content)
    const raw = marked.parse(clean, { async: false }) as string
    return wrapTables(raw)
  }, [content])

  return (
    <div
      className={`prose-custom ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
