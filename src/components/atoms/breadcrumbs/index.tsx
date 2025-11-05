/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import { cn } from '@/lib/styles'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbsProps {
  category?: string
  title: string
  className?: string
}

/**
 * Breadcrumbs component
 * Displays category and title in format: [Category] > [Title]
 * Does not include Home link
 */
export function Breadcrumbs({ category, title, className }: BreadcrumbsProps) {
  if (!category && !title) {
    return null
  }

  return (
    <nav
      aria-label='Breadcrumbs'
      className={cn('text-muted-foreground mb-6 flex items-center gap-2 text-sm', className)}
    >
      {category && (
        <>
          <span className='capitalize'>{category}</span>
          <ChevronRight className='size-4' />
        </>
      )}
      <span className='text-foreground font-medium'>{title}</span>
    </nav>
  )
}
