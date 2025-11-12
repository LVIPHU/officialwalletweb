/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import type { ComputedFields } from 'contentlayer2/source-files'
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import { slug } from 'github-slugger'
import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkExternalLinks from 'remark-external-links'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// Extract TOC headings from markdown
async function extractTocHeadings(content: string) {
  const { remark } = await import('remark')
  const { toString } = await import('mdast-util-to-string')
  const { visit } = await import('unist-util-visit')

  const toc: Array<{ url: string; text: string; depth: number }> = []

  const vfile = await remark()
    .use(() => (tree) => {
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
    })
    .process(content)

  return toc
}

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  lang: {
    type: 'string',
    resolve: (doc) => {
      // Extract language from flattenedPath: en/features/miner -> 'en'
      // flattenedPath format: {lang}/{category}/{slug}
      const pathParts = doc._raw.flattenedPath.split('/')
      return pathParts[0] || 'en'
    },
  },
  slug: {
    type: 'string',
    resolve: (doc) => {
      // Extract slug from flattened path: en/features/miner -> 'miner'
      const pathParts = doc._raw.flattenedPath.split('/')
      // Remove language and category, get the last part
      if (pathParts.length >= 3) {
        return pathParts[pathParts.length - 1]
      }
      return pathParts[pathParts.length - 1] || ''
    },
  },
  path: {
    type: 'string',
    resolve: (doc) => {
      // Return path without language: features/miner
      const pathParts = doc._raw.flattenedPath.split('/')
      if (pathParts.length >= 3) {
        return pathParts.slice(1).join('/')
      }
      return doc._raw.flattenedPath
    },
  },
  toc: {
    type: 'json',
    resolve: async (doc) => {
      const headings = await extractTocHeadings(doc.body.raw)
      return headings.filter((h) => h.depth <= 2)
    },
  },
}

export const Feature = defineDocumentType(() => ({
  name: 'Feature',
  filePathPattern: '**/features/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date' },
    category: { type: 'string', default: 'features' },
  },
  computedFields: {
    ...computedFields,
  },
}))

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: '**/about/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date' },
    category: { type: 'string', default: 'about' },
  },
  computedFields: {
    ...computedFields,
  },
}))

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Feature, About],
  disableImportAliasWarning: true,
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkGfm,
      remarkSlug as any,
      [
        remarkExternalLinks as any,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      // Disable rehype-autolink-headings as we handle anchor links in MDX components
      // We use custom HeadingAnchor component instead to avoid duplicate # symbols
      // [
      //   rehypeAutolinkHeadings,
      //   {
      //     behavior: 'prepend',
      //     headingProperties: {
      //       className: ['hover:[&_.heading-anchor]:opacity-100'],
      //     },
      //     content: icon,
      //   },
      // ],
    ],
  },
})
