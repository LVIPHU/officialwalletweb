/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import 'server-only'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { remark } from 'remark'
import { toString } from 'mdast-util-to-string'
import { slug } from 'github-slugger'
import type { Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { TocHeading } from '@/types/content.types'

/**
 * Get all content paths by scanning the content directory
 * @returns Array of content paths with lang and segments
 */
export async function getAllContentPaths(): Promise<Array<{ lang: string; segments: string[] }>> {
  const contentDir = join(process.cwd(), 'src', 'content')
  const paths: Array<{ lang: string; segments: string[] }> = []

  async function scanDirectory(dirPath: string, lang: string, segments: string[] = []) {
    try {
      const entries = await readdir(dirPath)

      for (const entry of entries) {
        const fullPath = join(dirPath, entry)
        const stats = await stat(fullPath)

        if (stats.isDirectory()) {
          await scanDirectory(fullPath, lang, [...segments, entry])
        } else if (stats.isFile() && entry.endsWith('.mdx')) {
          const filename = entry.replace(/\.mdx$/, '')
          paths.push({
            lang,
            segments: [...segments, filename],
          })
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read, skip
      console.warn(`Failed to scan directory: ${dirPath}`, error)
    }
  }

  try {
    const langDirs = await readdir(contentDir)

    for (const lang of langDirs) {
      const langPath = join(contentDir, lang)
      const stats = await stat(langPath)

      if (stats.isDirectory()) {
        await scanDirectory(langPath, lang, [])
      }
    }
  } catch (error) {
    console.error('Failed to scan content directory:', error)
  }

  return paths
}

/**
 * Get content file path from URL segments
 * @param lang - Language code
 * @param segments - URL path segments
 * @returns Full file path
 */
export function getContentPath(lang: string, segments: readonly string[]): string {
  const contentDir = join(process.cwd(), 'src', 'content', lang, ...segments)
  return `${contentDir}.mdx`
}

/**
 * Remark plugin to extract TOC headings from markdown AST
 */
function remarkTocHeadings() {
  return (tree: Parent, file: any) => {
    const toc: TocHeading[] = []

    visit(tree, 'heading', (node: any) => {
      const textContent = toString(node).replace(/<[^>]*(>|$)/g, '')

      if (textContent) {
        toc.push({
          url: `#${slug(textContent)}`,
          text: textContent,
          depth: node.depth,
        })
      }
    })

    file.data.toc = toc
  }
}

/**
 * Extract headings from markdown content using remark
 * @param content - Markdown content string
 * @returns Array of headings with URL, text, and depth
 */
export async function extractHeadings(content: string): Promise<readonly TocHeading[]> {
  const vfile = await remark().use(remarkTocHeadings).process(content)
  return (vfile.data.toc as TocHeading[]) || []
}
