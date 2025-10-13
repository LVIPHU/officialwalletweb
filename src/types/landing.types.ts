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
  readonly initials: string
}

export interface NavigationItem {
  readonly id: string
  readonly label: string
  readonly href: string
}

export interface SectionProps {
  readonly className?: string
  readonly children?: React.ReactNode
}

export interface HeroSectionProps extends SectionProps {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly primaryAction: {
    readonly label: string
    readonly href?: string
    readonly onClick?: () => void
  }
  readonly secondaryAction: {
    readonly label: string
    readonly href?: string
    readonly onClick?: () => void
  }
}

export interface FeatureCardProps {
  readonly feature: Feature
  readonly className?: string
}

export interface TestimonialCardProps {
  readonly testimonial: Testimonial
  readonly className?: string
}
