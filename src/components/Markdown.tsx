import { useMemo } from 'react'
import { marked } from 'marked'

// Configure marked for clean output
marked.setOptions({
  breaks: true,
  gfm: true,
})

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const html = useMemo(() => {
    return marked.parse(content, { async: false }) as string
  }, [content])

  return (
    <div
      className={`prose-custom ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
