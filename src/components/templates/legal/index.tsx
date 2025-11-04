/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import { PropsWithChildren } from 'react'
import { Container } from '@/components/atoms/container'
import { cn } from '@/lib/styles'

interface LegalTemplateProps extends PropsWithChildren {
  title?: string
  className?: string
}

/**
 * LegalTemplate - Layout template for legal documents (Privacy Policy, Terms of Service)
 *
 * Provides:
 * - Optimized reading width (800-900px max-width)
 * - Proper typography spacing for long-form content
 * - Responsive design
 */
export default function LegalTemplate({ children, title, className }: LegalTemplateProps) {
  return (
    <Container className={cn('mx-auto max-w-4xl py-8 lg:py-12 xl:py-16', className)}>
      <article className='prose prose-lg dark:prose-invert lg:prose-xl max-w-none'>
        {title && <h1 className='font-clash-display mb-8 text-4xl font-extrabold lg:text-5xl'>{title}</h1>}
        <div className='text-foreground/90'>{children}</div>
      </article>
    </Container>
  )
}
