import * as React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface FeaturesCarouselProps {
  children: React.ReactNode
}

export function FeaturesCarousel({ children }: FeaturesCarouselProps) {
  const slides = React.Children.toArray(children)

  if (slides.length === 0) return null

  return (
    <Carousel className='w-full'>
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem key={i} className='flex justify-center'>
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
