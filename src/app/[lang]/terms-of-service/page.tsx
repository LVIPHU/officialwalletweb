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
    title: 'Terms of Service - TBC Wallet',
    description: "Read TBC Wallet's Terms of Service to understand the terms and conditions for using our services.",
  }
}

export default async function TermsOfServicePage({ params }: PageLangParam) {
  const lang = (await params).lang
  initLingui(lang)

  try {
    const { content, data } = await getLegalContent(lang, 'terms')
    const title = (data.title as string) || 'Terms of Service'

    return (
      <LegalTemplate title={title}>
        <MarkdownContent content={content} />
      </LegalTemplate>
    )
  } catch (error) {
    console.error('Error loading terms of service:', error)
    notFound()
  }
}
