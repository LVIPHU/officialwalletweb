'use client'

import dynamic from 'next/dynamic'
import { useIsMobile } from '@/hooks/use-mobile'
import { FEATURES } from '@/constants/landing.constants'
import { FeatureCard } from '@/components/molecules/feature-card'
import { FeaturesCarousel } from '@/components/molecules/features-carousel'

const FeaturesSlidesHorizontal = dynamic(
  () =>
    import('@/components/molecules/features-slides-horizontal').then(
      (FeaturesSlidesHorizontal) => FeaturesSlidesHorizontal
    ),
  { ssr: false }
)

export function FeaturesSection() {
  const isMobile = useIsMobile()

  const content = FEATURES.map((feature) => <FeatureCard key={feature.id} feature={feature} />)

  return (
    <>
      {isMobile ? (
        <FeaturesCarousel>{content}</FeaturesCarousel>
      ) : (
        <FeaturesSlidesHorizontal>{content}</FeaturesSlidesHorizontal>
      )}
    </>
  )
}
