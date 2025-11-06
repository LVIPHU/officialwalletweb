/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

'use strict'

const fs = require('fs').promises
const path = require('path')
const { readFile } = require('fs/promises')
const matter = require('gray-matter')

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content')
const OUTPUT_DIR = path.join(process.cwd(), 'public')
const LOCALES = ['ar', 'en', 'es', 'fi', 'fr', 'pt', 'zh-hans', 'zh-hant']
const VALID_TYPES = ['legal', 'features', 'support', 'blog']

const SITE_METADATA = {
  title: 'TBC Wallet - The Future of Cryptocurrency Management',
  titleHeader: 'TBC Wallet',
  author: 'NEXSOFT',
  description:
    'Experience the future of cryptocurrency management with TBC Wallet. Secure, fast, and user-friendly platform for all your digital assets.',
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://officialwalletweb.vercel.app',
  email: 'contact@tbchatofficial.com',
}

/**
 * Safely escape HTML entities
 */
function escape(text) {
  if (!text) return ''
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }
  return String(text).replace(/[&<>'"]/g, (match) => escapeMap[match] || match)
}

/**
 * Get content file path from segments
 */
function getContentPath(lang, segments) {
  return path.join(CONTENT_DIR, lang, ...segments) + '.mdx'
}

/**
 * Read and parse MDX content
 */
async function readContentFile(lang, segments) {
  try {
    const filePath = getContentPath(lang, segments)
    const content = await readFile(filePath, 'utf-8')
    const parsed = matter(content)
    return {
      data: parsed.data,
      content: parsed.content,
    }
  } catch (error) {
    return null
  }
}

/**
 * Extract first paragraph as description
 */
function extractDescription(content, fallback) {
  if (!content) return fallback || ''
  const firstParagraph = content
    .split('\n\n')
    .find((para) => para.trim().length > 0)
    ?.replace(/[#*_`]/g, '')
    .substring(0, 200)
  return firstParagraph || fallback || ''
}

/**
 * Scan content directory and get all content paths
 */
async function getAllContentPaths() {
  const paths = []

  async function scanDirectory(dirPath, lang, segments = []) {
    try {
      const entries = await fs.readdir(dirPath)

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry)
        const stats = await fs.stat(fullPath)

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
      // Directory doesn't exist, skip
    }
  }

  for (const lang of LOCALES) {
    const langPath = path.join(CONTENT_DIR, lang)
    try {
      await scanDirectory(langPath, lang, [])
    } catch (error) {
      // Language directory doesn't exist, skip
    }
  }

  return paths
}

/**
 * Generate RSS item from content
 */
function generateRssItem(item) {
  const { title, description, url, pubDate, category } = item
  return `    <item>
      <title>${escape(title)}</title>
      <description>${escape(description)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escape(category)}</category>
    </item>`
}

/**
 * Generate RSS XML
 */
function generateRss(items, options) {
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
    ${items.map(generateRssItem).join('\n')}
  </channel>
</rss>`
}

/**
 * Generate RSS feed for a specific locale and type
 */
async function generateFeedForType(lang, type) {
  const allPaths = await getAllContentPaths()
  const filteredPaths = allPaths.filter((path) => path.lang === lang && path.segments[0] === type)

  const contentItems = []

  for (const contentPath of filteredPaths) {
    const content = await readContentFile(contentPath.lang, contentPath.segments)
    if (!content) continue

    const pathString = contentPath.segments.join('/')
    const url = `${SITE_METADATA.siteUrl}/${contentPath.lang}/${pathString}`
    const pubDate = content.data.date ? new Date(content.data.date).toUTCString() : new Date().toUTCString()

    const description = extractDescription(content.content, content.data.description)

    contentItems.push({
      title: content.data.title || pathString,
      description,
      url,
      pubDate,
      category: content.data.category || contentPath.segments[0] || type,
    })
  }

  // Sort by date (newest first)
  contentItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  const lastBuildDate =
    contentItems.length > 0 && contentItems[0].pubDate ? contentItems[0].pubDate : new Date().toUTCString()

  const typeTitle = type.charAt(0).toUpperCase() + type.slice(1)
  const feedUrl = `${SITE_METADATA.siteUrl}/${lang}/feed-${type}.xml`

  const rss = generateRss(contentItems, {
    title: `${SITE_METADATA.title} - ${typeTitle} (${lang.toUpperCase()})`,
    link: `${SITE_METADATA.siteUrl}/${lang}/${type}`,
    description: `${SITE_METADATA.description} - ${type} content`,
    language: lang,
    feedUrl,
    lastBuildDate,
  })

  return rss
}

/**
 * Generate RSS feed for all content types in a locale
 */
async function generateFeedForLocale(lang) {
  const allPaths = await getAllContentPaths()
  const langPaths = allPaths.filter((path) => path.lang === lang)

  const contentItems = []

  for (const contentPath of langPaths) {
    const content = await readContentFile(contentPath.lang, contentPath.segments)
    if (!content) continue

    const pathString = contentPath.segments.join('/')
    const url = `${SITE_METADATA.siteUrl}/${contentPath.lang}/${pathString}`
    const pubDate = content.data.date ? new Date(content.data.date).toUTCString() : new Date().toUTCString()

    const description = extractDescription(content.content, content.data.description)

    contentItems.push({
      title: content.data.title || pathString,
      description,
      url,
      pubDate,
      category: content.data.category || contentPath.segments[0] || 'general',
    })
  }

  // Sort by date (newest first)
  contentItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  const lastBuildDate =
    contentItems.length > 0 && contentItems[0].pubDate ? contentItems[0].pubDate : new Date().toUTCString()

  const feedUrl = `${SITE_METADATA.siteUrl}/${lang}/feed.xml`

  const rss = generateRss(contentItems, {
    title: `${SITE_METADATA.title} - ${lang.toUpperCase()}`,
    link: `${SITE_METADATA.siteUrl}/${lang}`,
    description: SITE_METADATA.description,
    language: lang,
    feedUrl,
    lastBuildDate,
  })

  return rss
}

/**
 * Main function to generate all RSS feeds
 */
async function generateRssFeeds() {
  console.log('🗒️  Generating RSS feeds...')

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  let generatedCount = 0

  // Generate feeds for each locale
  for (const lang of LOCALES) {
    // Generate main feed for locale
    const mainFeed = await generateFeedForLocale(lang)
    const mainFeedPath = path.join(OUTPUT_DIR, lang, 'feed.xml')
    await fs.mkdir(path.dirname(mainFeedPath), { recursive: true })
    await fs.writeFile(mainFeedPath, mainFeed, 'utf-8')
    generatedCount++
    console.log(`  ✓ Generated ${lang}/feed.xml`)

    // Generate feeds for each content type
    for (const type of VALID_TYPES) {
      const typeFeed = await generateFeedForType(lang, type)
      const typeFeedPath = path.join(OUTPUT_DIR, lang, `feed-${type}.xml`)
      await fs.writeFile(typeFeedPath, typeFeed, 'utf-8')
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

module.exports = { generateRssFeeds }
