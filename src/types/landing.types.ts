/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import React from 'react'
import { MessageDescriptor } from '@lingui/core'

/**
 * Type definitions for TBC Wallet landing page
 */

export interface Feature {
  readonly color:
    | 'card-chain-green'
    | 'card-chain-blue-purple'
    | 'card-chain-purple'
    | 'card-chain-orange'
    | 'card-chain-olive'
  readonly id: string
  readonly title: MessageDescriptor
  readonly description: MessageDescriptor
  readonly icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export interface Chain {
  readonly id: 'TBC' | 'BTC' | 'ETH' | 'SOL' | 'TRX'
  readonly title: MessageDescriptor
  readonly logo?: React.FC<React.SVGProps<SVGSVGElement>>
  readonly url?: string
}

export interface Platform {
  readonly id: string
  readonly title: MessageDescriptor
  readonly images: {
    desktop: string
    mobile?: string
    tablet?: string
  }
}

export interface Testimonial {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly content: string
  readonly avatar: string
}

export interface Download {
  readonly id: string
  readonly url: string
  readonly images: {
    desktop: string
    mobile?: string
    tablet?: string
  }
}
