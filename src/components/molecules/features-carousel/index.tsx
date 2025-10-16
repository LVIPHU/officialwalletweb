import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BACKGROUND_ENUM } from '@/constants/landing.constants'
import AnimatedContent from '@/components/atoms/animated-content'

interface FeaturesCarouselProps {
  children: React.ReactNode
}

export function FeaturesCarousel({ children }: FeaturesCarouselProps) {
  const slides = React.Children.toArray(children)

  if (slides.length === 0) return null

  return (
    <Carousel className='w-full'>
      <CarouselContent className='relative'>
        {slides.map((slide, idx) => (
          <CarouselItem key={idx} className='relative flex justify-center'>
            <div
              data-color={BACKGROUND_ENUM[idx]}
              className='background-glow top-full left-full translate-x-[12%] translate-y-[3%] scale-120'
            />
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
