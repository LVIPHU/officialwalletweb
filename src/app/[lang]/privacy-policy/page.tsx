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
import { getLegalContent } from '@/lib/content'
import { MarkdownContent } from '@/components/molecules/markdown-content'
import LegalTemplate from '@/components/templates/legal'
import { initLingui, PageLangParam } from '@/i18n/initLingui'
import linguiConfig from '../../../../lingui.config'

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageLangParam): Promise<Metadata> {
  const lang = (await params).lang
  initLingui(lang)

  return {
    title: 'Privacy Policy - TBC Wallet',
    description:
      "Read TBC Wallet's Privacy Policy to understand how we collect, use, and protect your personal information.",
  }
}

export default async function PrivacyPolicyPage({ params }: PageLangParam) {
  const lang = (await params).lang
  initLingui(lang)

  try {
    const { content, data } = await getLegalContent(lang, 'privacy')
    const title = (data.title as string) || 'Privacy Policy'

    return (
      <LegalTemplate title={title}>
        <MarkdownContent content={content} />
      </LegalTemplate>
    )
  } catch (error) {
    console.error('Error loading privacy policy:', error)
    notFound()
  }
}
