/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getContentByPath } from '@/lib/content'
import { MarkdownContent } from '@/components/molecules/markdown-content'
import MdxLayout from '@/components/templates/mdx-layout'
import { initLingui } from '@/i18n/initLingui'
import { getAllContentPaths } from '@/lib/content-utils'
import type { ContentType } from '@/types/content.types'

interface DynamicPageParams {
  params: Promise<{ lang: string; rest: string[] }>
}

/**
 * Generate static params for all MDX content files
 */
export async function generateStaticParams() {
  const paths = await getAllContentPaths()
  const allParams: Array<{ lang: string; rest: string[] }> = []

  for (const path of paths) {
    allParams.push({
      lang: path.lang,
      rest: path.segments,
    })
  }

  return allParams
}

/**
 * Generate metadata for the page based on content frontmatter
 */
export async function generateMetadata({ params }: DynamicPageParams): Promise<Metadata> {
  const { lang, rest } = await params

  try {
    initLingui(lang)
    const { data } = await getContentByPath(lang, rest)

    return {
      title: data.title ? `${data.title} - TBC Wallet` : 'TBC Wallet',
      description: data.description || 'TBC Wallet documentation and content',
    }
  } catch {
    return {
      title: 'TBC Wallet',
      description: 'TBC Wallet documentation and content',
    }
  }
}

/**
 * Determine content type from path segments
 */
function getContentType(segments: readonly string[]): ContentType {
  if (segments[0] === 'legal') {
    return 'legal'
  }
  if (segments[0] === 'features') {
    return 'features'
  }
  return 'blog'
}

/**
 * Dynamic page handler for all MDX content
 * Maps URL path to content directory structure:
 * /en/legal/privacy-policy -> src/content/en/legal/privacy-policy.mdx
 */
export default async function DynamicContentPage({ params }: DynamicPageParams) {
  const { lang, rest } = await params

  // Skip if rest is empty or has invalid segments
  if (!rest || rest.length === 0) {
    notFound()
  }

  initLingui(lang)

  try {
    const { content, data, headings } = await getContentByPath(lang, rest)
    const contentType = getContentType(rest)

    return (
      <MdxLayout type={contentType} title={data.title} category={data.category || rest[0]} headings={headings}>
        <MarkdownContent content={content} />
      </MdxLayout>
    )
  } catch (error) {
    console.error('Error loading content:', error)
    notFound()
  }
}
