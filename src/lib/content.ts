/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import 'server-only'
import { readFile } from 'fs/promises'
import matter from 'gray-matter'
import { getContentPath, extractHeadings } from './content-utils'
import type { ContentResult, ContentMetadata } from '@/types/content.types'

/**
 * Get content by path segments (dynamic routing)
 * @param lang - Language code (e.g., 'en', 'ar', 'es')
 * @param pathSegments - Array of path segments (e.g., ['legal', 'privacy-policy'])
 * @returns Content result with content, metadata, and headings
 * @throws Error if file doesn't exist
 */
export async function getContentByPath(lang: string, pathSegments: readonly string[]): Promise<ContentResult> {
  const filePath = getContentPath(lang, pathSegments)

  let content = ''
  try {
    content = await readFile(filePath, 'utf-8')
  } catch (error) {
    // Fallback to English if content not found for requested language
    if (lang !== 'en' && pathSegments.length > 0) {
      try {
        return await getContentByPath('en', pathSegments)
      } catch {
        // If English also fails, throw original error
      }
    }
    throw new Error(`Content file not found: ${filePath}`)
  }

  // Parse frontmatter if present
  const parsed = matter(content)

  // Extract headings from content using remark
  const headings = await extractHeadings(parsed.content)
  const filteredHeadings = headings.filter((h) => h.depth <= 2)

  // Parse metadata with defaults
  const metadata: ContentMetadata = {
    title: (parsed.data.title as string) || '',
    date: parsed.data.date as string | undefined,
    description: parsed.data.description as string | undefined,
    category: parsed.data.category as string | undefined,
  }

  return {
    content: parsed.content,
    data: metadata,
    headings: filteredHeadings,
  }
}
