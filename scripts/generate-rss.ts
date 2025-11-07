/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { SITE_METADATA } from '../src/constants/site-metadata.constants'
import { escape } from '../src/lib/utils/content/html-escaper'

const RSS_PAGE = 'feed.xml'
const LOCALES = ['ar', 'en', 'es', 'fi', 'fr', 'pt', 'zh-hans', 'zh-hant']
const VALID_TYPES = ['legal', 'features']

interface ContentItem {
  title: string
  description?: string
  slug: string
  lang: string
  date?: string
  category: string
  body: {
    raw: string
  }
  draft?: boolean
}

interface RssItem {
  title: string
  description?: string
  url: string
  pubDate: string
  category: string
}

/**
 * Load contentlayer data from JSON files
 * This approach works better with tsx than module imports
 */
function loadContentlayerData() {
  const contentlayerPath = path.join(process.cwd(), '.contentlayer', 'generated')

  try {
    // Load Feature data
    const featuresPath = path.join(contentlayerPath, 'Feature', '_index.json')
    const featuresData = JSON.parse(readFileSync(featuresPath, 'utf-8'))
    const allFeatures: ContentItem[] = Array.isArray(featuresData) ? featuresData : []

    // Load Legal data
    const legalsPath = path.join(contentlayerPath, 'Legal', '_index.json')
    const legalsData = JSON.parse(readFileSync(legalsPath, 'utf-8'))
    const allLegals: ContentItem[] = Array.isArray(legalsData) ? legalsData : []

    return { allFeatures, allLegals }
  } catch (error) {
    console.error('❌ Error loading contentlayer data.')
    console.error('Please ensure contentlayer is built first: npm run contentlayer:build')
    console.error('Error:', error)
    throw new Error('Contentlayer generated files not found. Run: npm run contentlayer:build')
  }
}

function generateRssItem(item: RssItem): string {
  const { title, description, url, pubDate, category } = item
  return `
    <item>
      <guid isPermaLink="true">${url}</guid>
      <title>${escape(title)}</title>
      <link>${url}</link>
      ${description ? `<description>${escape(description)}</description>` : ''}
      <pubDate>${pubDate}</pubDate>
      <category>${escape(category)}</category>
    </item>`
}

function generateRss(
  items: RssItem[],
  options: {
    title: string
    link: string
    description: string
    language: string
    feedUrl: string
    lastBuildDate: string
  }
): string {
  const { title, link, description, language, feedUrl, lastBuildDate } = options
  const { email, author } = SITE_METADATA

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(title)}</title>
    <link>${link}</link>
    <description>${escape(description)}</description>
    <language>${language}</language>
    <managingEditor>${email} (${author})</managingEditor>
    <webMaster>${email} (${author})</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    ${items.map(generateRssItem).join('')}
  </channel>
</rss>`
}

function extractDescription(content: string, fallback?: string): string {
  if (!content) return fallback || ''
  const firstParagraph = content
    .split('\n\n')
    .find((para) => para.trim().length > 0)
    ?.replace(/[#*_`]/g, '')
    .substring(0, 200)
  return firstParagraph || fallback || ''
}

/**
 * Sort RSS items by date (newest first)
 */
function sortRssItems(items: RssItem[]): RssItem[] {
  return [...items].sort((a, b) => {
    const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0
    const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0
    return dateB - dateA
  })
}

async function generateFeedForType(
  lang: string,
  type: 'legal' | 'features',
  allFeatures: ContentItem[],
  allLegals: ContentItem[]
) {
  const allContent = type === 'features' ? allFeatures : allLegals
  const langContent = allContent.filter((item) => item.lang === lang && !item.draft)

  const contentItems: RssItem[] = []

  for (const content of langContent) {
    const pathString = `${type}/${content.slug}`
    const url = `${SITE_METADATA.siteUrl}/${lang}/${pathString}`
    const pubDate = content.date ? new Date(content.date).toUTCString() : new Date().toUTCString()
    const description = extractDescription(content.body?.raw || '', content.description)

    contentItems.push({
      title: content.title || content.slug,
      description,
      url,
      pubDate,
      category: content.category || type,
    })
  }

  // Sort by date (newest first)
  const sortedItems = sortRssItems(contentItems)
  const lastBuildDate =
    sortedItems.length > 0 && sortedItems[0].pubDate ? sortedItems[0].pubDate : new Date().toUTCString()

  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  const feedUrl = `${SITE_METADATA.siteUrl}/${lang}/feed-${type}.xml`

  const rss = generateRss(sortedItems, {
    title: `${SITE_METADATA.title} - ${typeTitle} (${lang.toUpperCase()})`,
    link: `${SITE_METADATA.siteUrl}/${lang}/${type}`,
    description: `${SITE_METADATA.description} - ${type} content`,
    language: lang,
    feedUrl,
    lastBuildDate,
  })

  return rss
}

async function generateFeedForLocale(lang: string, allFeatures: ContentItem[], allLegals: ContentItem[]) {
  const allContent = [...allFeatures, ...allLegals]
  const langContent = allContent.filter((item) => item.lang === lang && !item.draft)

  const contentItems: RssItem[] = []

  for (const content of langContent) {
    const category = content.category || 'features'
    const pathString = `${category}/${content.slug}`
    const url = `${SITE_METADATA.siteUrl}/${lang}/${pathString}`
    const pubDate = content.date ? new Date(content.date).toUTCString() : new Date().toUTCString()
    const description = extractDescription(content.body?.raw || '', content.description)

    contentItems.push({
      title: content.title || content.slug,
      description,
      url,
      pubDate,
      category: category || 'general',
    })
  }

  // Sort by date (newest first)
  const sortedItems = sortRssItems(contentItems)
  const lastBuildDate =
    sortedItems.length > 0 && sortedItems[0].pubDate ? sortedItems[0].pubDate : new Date().toUTCString()

  const feedUrl = `${SITE_METADATA.siteUrl}/${lang}/feed.xml`

  const rss = generateRss(sortedItems, {
    title: `${SITE_METADATA.title} - ${lang.toUpperCase()}`,
    link: `${SITE_METADATA.siteUrl}/${lang}`,
    description: SITE_METADATA.description,
    language: lang,
    feedUrl,
    lastBuildDate,
  })

  return rss
}

export async function generateRssFeeds() {
  console.log('🗒️  Generating RSS feeds...')

  // Load contentlayer data from JSON files
  const { allFeatures, allLegals } = loadContentlayerData()

  const outputDir = path.join(process.cwd(), 'public')

  let generatedCount = 0

  // Generate feeds for each locale
  for (const lang of LOCALES) {
    // Generate main feed for locale
    const mainFeed = await generateFeedForLocale(lang, allFeatures, allLegals)
    const mainFeedPath = path.join(outputDir, lang, RSS_PAGE)
    mkdirSync(path.dirname(mainFeedPath), { recursive: true })
    writeFileSync(mainFeedPath, mainFeed, 'utf-8')
    generatedCount++
    console.log(`  ✓ Generated ${lang}/feed.xml`)

    // Generate feeds for each content type
    for (const type of VALID_TYPES) {
      const typeFeed = await generateFeedForType(lang, type as 'legal' | 'features', allFeatures, allLegals)
      const typeFeedPath = path.join(outputDir, lang, `feed-${type}.xml`)
      writeFileSync(typeFeedPath, typeFeed, 'utf-8')
      generatedCount++
      console.log(`  ✓ Generated ${lang}/feed-${type}.xml`)
    }
  }

  console.log(`\n✅ Successfully generated ${generatedCount} RSS feed files!`)
}

// Run if called directly
if (require.main === module) {
  generateRssFeeds().catch((error) => {
    console.error('❌ Error generating RSS feeds:', error)
    process.exit(1)
  })
}
