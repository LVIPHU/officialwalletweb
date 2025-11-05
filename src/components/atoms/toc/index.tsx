/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

'use client'

import { useTocHighlight } from '@/hooks/use-toc-highlight'
import { cn } from '@/lib/styles'
import type { TocHeading } from '@/types/content.types'

interface TocProps {
  headings: readonly TocHeading[]
}

/**
 * Table of Contents component
 * Displays headings in a sticky sidebar on the right
 * Highlights active section based on scroll position
 * - Default text color: white (dark mode) / gray (light mode)
 * - Highlight color: primary blue
 * - Has bullet points by default
 * - Hover on item highlights like active item
 * - Text overflow with ellipsis
 */
export function Toc({ headings }: TocProps) {
  const { currentIndex } = useTocHighlight()

  // Select the max TOC item we have here for now

  if (headings.length === 0) {
    return null
  }

  return (
    <nav
      role='navigation'
      className='group sticky top-0 hidden h-fit w-[200px] lg:block'
      style={{
        left: 'calc((100vw - min(100vw, 768px)) / 2 + min(100vw, 768px) + 200px)',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <div className='h-full max-h-[calc(100vh-12rem)] overflow-y-auto ps-4' style={{ overscrollBehavior: 'contain' }}>
        <ul className='space-y-2 py-8'>
          {headings.map((h, i) => {
            if (!h.url && process.env.NODE_ENV === 'development') {
              console.error('Heading does not have URL')
            }

            const isActive = currentIndex === i

            return (
              <li key={`heading-${h.url}-${i}`} className={cn('text-sm transition-all duration-200')}>
                <a
                  className={cn(
                    'block truncate py-2 leading-normal transition-opacity duration-200',
                    'before:me-2 before:content-["•"]',
                    isActive
                      ? 'text-primary font-semibold opacity-100'
                      : 'text-gray-600 opacity-0 group-hover:opacity-100 dark:text-white',
                    'hover:text-primary!'
                  )}
                  href={h.url}
                  title={h.text}
                >
                  {h.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
