/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

export type ContentType = 'legal' | 'features' | 'blog' | 'support'

export interface TocHeading {
  readonly url: string
  readonly text: string
  readonly depth: number
}

export interface ContentMetadata {
  readonly title: string
  readonly date?: string
  readonly description?: string
  readonly category?: string
}

export interface ContentPath {
  readonly lang: string
  readonly segments: readonly string[]
}

export interface ContentResult {
  readonly content: string
  readonly data: ContentMetadata
  readonly headings: readonly TocHeading[]
}
