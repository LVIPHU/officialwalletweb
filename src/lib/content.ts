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
import { join } from 'path'
import matter from 'gray-matter'

export type LegalContentType = 'privacy' | 'terms'

interface LegalContentResult {
  content: string
  data: Record<string, unknown>
}

/**
 * Get legal content from filesystem
 * @param lang - Language code (e.g., 'en', 'ar', 'es')
 * @param type - Type of legal content ('privacy' or 'terms')
 * @returns Content string and frontmatter data
 * @throws Error if file doesn't exist
 */
export async function getLegalContent(lang: string, type: LegalContentType): Promise<LegalContentResult> {
  const contentDir = join(process.cwd(), 'src', 'content', lang, 'legal')

  // Try .mdx first, then .md
  const extensions = ['mdx', 'md']
  let content = ''
  let filePath = ''

  for (const ext of extensions) {
    filePath = join(contentDir, `${type}.${ext}`)
    try {
      content = await readFile(filePath, 'utf-8')
      break
    } catch (error) {
      // File doesn't exist with this extension, try next
      continue
    }
  }

  if (!content) {
    // Fallback to English if content not found for requested language
    if (lang !== 'en') {
      try {
        return await getLegalContent('en', type)
      } catch {
        // If English also fails, throw original error
      }
    }
    throw new Error(`Legal content file not found: ${filePath}`)
  }

  // Parse frontmatter if present
  const parsed = matter(content)

  return {
    content: parsed.content,
    data: parsed.data,
  }
}
