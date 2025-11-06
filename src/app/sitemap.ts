/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import 'server-only'
import type { MetadataRoute } from 'next'
import { getAllContentPaths } from '@/lib/content-utils'
import { getContentByPath } from '@/lib/content'
import linguiConfig from '../../lingui.config'
import { SITE_METADATA } from '@/constants/site-metadata.constants'

const { locales } = linguiConfig

/**
 * Generate sitemap for all locales and content
 * Includes static routes and dynamic content routes
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_METADATA.siteUrl

  if (!siteUrl) {
    console.warn('SITE_METADATA.siteUrl is not set, skipping sitemap generation')
    return []
  }

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Get all content paths
  const allContentPaths = await getAllContentPaths()

  // Generate entries for each locale
  for (const locale of locales) {
    if (locale === 'pseudo') continue // Skip pseudo locale

    // Static home route for each locale
    sitemapEntries.push({
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })

    // Process content paths for this locale
    const localeContentPaths = allContentPaths.filter((path) => path.lang === locale)

    for (const contentPath of localeContentPaths) {
      try {
        const { data } = await getContentByPath(contentPath.lang, contentPath.segments)
        const pathString = contentPath.segments.join('/')
        const url = `${siteUrl}/${contentPath.lang}/${pathString}`

        // Determine priority based on content type
        let priority = 0.7
        let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'

        if (contentPath.segments[0] === 'legal') {
          priority = 0.5
          changeFrequency = 'yearly'
        } else if (contentPath.segments[0] === 'features') {
          priority = 0.8
          changeFrequency = 'weekly'
        } else if (contentPath.segments[0] === 'blog') {
          priority = 0.9
          changeFrequency = 'weekly'
        }

        sitemapEntries.push({
          url,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency,
          priority,
        })
      } catch (error) {
        console.warn(
          `Failed to generate sitemap entry for ${contentPath.lang}/${contentPath.segments.join('/')}:`,
          error
        )
      }
    }
  }

  return sitemapEntries
}
