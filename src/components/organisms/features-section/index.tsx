'use client'
import dynamic from 'next/dynamic'
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

export default function FeaturesSection() {
  const content = FEATURES.map((feature) => <FeatureCard key={feature.id} feature={feature} />)

  return (
    <div>
      <div className='block md:hidden'>
        <FeaturesCarousel>{content}</FeaturesCarousel>
      </div>
      <div className='hidden md:block'>
        <FeaturesSlidesHorizontal>{content}</FeaturesSlidesHorizontal>
      </div>
    </div>
  )
}
