/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import type { Metadata } from 'next'
import ComingSoonTemplate from '@/components/templates/coming-soon'
import { genPageMetadata } from '@/lib/seo'
import { SITE_METADATA } from '@/constants/site-metadata.constants'

export const metadata: Metadata = genPageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. ' + SITE_METADATA.description,
  lang: 'en',
  path: '',
})

export default function NotFound() {
  return <ComingSoonTemplate />
}
