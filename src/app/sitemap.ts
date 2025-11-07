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
import { allFeatures, allLegals } from 'contentlayer/generated'
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

    // Static support routes (FAQ and Contact Us are now TSX pages, not MDX)
    sitemapEntries.push({
      url: `${siteUrl}/${locale}/support/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    sitemapEntries.push({
      url: `${siteUrl}/${locale}/support/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    // Process features for this locale
    const localeFeatures = allFeatures.filter((f) => f.lang === locale && !('draft' in f && f.draft))
    for (const feature of localeFeatures) {
      const url = `${siteUrl}/${locale}/features/${feature.slug}`
      sitemapEntries.push({
        url,
        lastModified: feature.date ? new Date(feature.date) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    // Process legal docs for this locale
    const localeLegals = allLegals.filter((l) => l.lang === locale && !('draft' in l && l.draft))
    for (const legal of localeLegals) {
      const url = `${siteUrl}/${locale}/legal/${legal.slug}`
      sitemapEntries.push({
        url,
        lastModified: legal.date ? new Date(legal.date) : new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    }
  }

  return sitemapEntries
}
