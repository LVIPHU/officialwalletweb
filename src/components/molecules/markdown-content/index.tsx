/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkExternalLinks from 'remark-external-links'
import { cn } from '@/lib/styles'

interface MarkdownContentProps {
  content: string
  className?: string
}

/**
 * MarkdownContent - Component to render markdown content with proper styling
 *
 * Supports:
 * - GitHub Flavored Markdown (tables, strikethrough, etc.)
 * - Auto-generated heading IDs for anchor links
 * - External links with target="_blank" and rel="noopener noreferrer"
 * - Custom styling for legal documents
 */
export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn('markdown-content', className)}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          // @ts-ignore
          [remarkSlug, {}],
          [
            // @ts-ignore
            remarkExternalLinks,
            {
              target: '_blank',
              rel: ['noopener', 'noreferrer'],
            },
          ],
        ]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className='font-clash-display mt-8 mb-6 text-4xl font-semibold first:mt-0 lg:text-5xl' {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className='font-clash-display mt-8 mb-4 text-3xl font-semibold first:mt-0 lg:text-4xl' {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className='mt-6 mb-3 text-2xl font-semibold first:mt-0 lg:text-3xl' {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className='mt-4 mb-2 text-xl font-semibold first:mt-0 lg:text-2xl' {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className='mt-4 mb-2 text-lg font-semibold first:mt-0 lg:text-xl' {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className='mt-4 mb-2 text-base font-semibold first:mt-0 lg:text-lg' {...props} />
          ),
          p: ({ node, ...props }) => <p className='text-foreground/90 mb-4 leading-7 lg:leading-8' {...props} />,
          ul: ({ node, ...props }) => (
            <ul className='mb-4 ml-6 list-disc space-y-2 [&>li]:leading-7 lg:[&>li]:leading-8' {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className='mb-4 ml-6 list-decimal space-y-2 [&>li]:leading-7 lg:[&>li]:leading-8' {...props} />
          ),
          li: ({ node, ...props }) => <li className='text-foreground/90' {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className='border-primary/50 bg-muted/50 text-foreground/80 my-4 border-l-4 pl-4 italic'
              {...props}
            />
          ),
          code: ({ node, className, ...props }) => {
            const isInline = !className
            return isInline ? (
              <code className='bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm' {...props} />
            ) : (
              <code className={className} {...props} />
            )
          },
          pre: ({ node, ...props }) => <pre className='bg-muted mb-4 overflow-x-auto rounded-lg p-4' {...props} />,
          a: ({ node, ...props }) => <a className='text-primary underline-offset-4 hover:underline' {...props} />,
          hr: ({ node, ...props }) => <hr className='border-border my-8' {...props} />,
          table: ({ node, ...props }) => (
            <div className='my-6 overflow-x-auto'>
              <table className='border-border w-full border-collapse border' {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className='bg-muted' {...props} />,
          th: ({ node, ...props }) => (
            <th className='border-border border px-4 py-2 text-left font-semibold' {...props} />
          ),
          td: ({ node, ...props }) => <td className='border-border text-foreground/90 border px-4 py-2' {...props} />,
          strong: ({ node, ...props }) => <strong className='text-foreground font-semibold' {...props} />,
          em: ({ node, ...props }) => <em className='text-foreground/90 italic' {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
