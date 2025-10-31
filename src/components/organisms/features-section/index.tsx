'use client'
import dynamic from 'next/dynamic'
import { FEATURES } from '@/constants/landing.constants'
import { FeatureCard } from '@/components/molecules/feature-card'
import { FeaturesCarousel } from '@/components/molecules/features-carousel'
import { useIsTablet } from '@/hooks/use-tablet'

const FeaturesSlidesHorizontal = dynamic(
  () =>
    import('@/components/molecules/features-slides-horizontal').then(
      (FeaturesSlidesHorizontal) => FeaturesSlidesHorizontal
    ),
  { ssr: false }
)

export default function FeaturesSection() {
  const isTablet = useIsTablet()
  const content = FEATURES.map((feature) => <FeatureCard key={feature.id} feature={feature} />)

  if (isTablet) {
    return <FeaturesCarousel>{content}</FeaturesCarousel>
  }
  return <FeaturesSlidesHorizontal>{content}</FeaturesSlidesHorizontal>
}
