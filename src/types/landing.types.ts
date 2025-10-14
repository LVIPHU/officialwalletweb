/**
 * Type definitions for TB Wallet landing page
 */

export interface Feature {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string
}

export interface Chain {
  readonly id: 'TBC' | 'BTC' | 'ETH' | 'SOL'
  readonly name: string
  readonly logo?: React.FC<React.SVGProps<SVGSVGElement>>
  readonly url?: string
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
  readonly image: string
}
