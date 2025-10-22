import React from 'react'
import { MessageDescriptor } from '@lingui/core'

/**
 * Type definitions for TB Wallet landing page
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
  readonly id: 'TBC' | 'BTC' | 'ETH' | 'SOL'
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
