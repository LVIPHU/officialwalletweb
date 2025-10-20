'use client'
import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { BACKGROUND_ENUM } from '@/constants/landing.constants'
import { useEffect, useState } from 'react'

interface FeaturesCarouselProps {
  children: React.ReactNode
}

export function FeaturesCarousel({ children }: FeaturesCarouselProps) {
  const slides = React.Children.toArray(children)

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  if (slides.length === 0) return null

  return (
    <Carousel setApi={setApi} className='relative w-full'>
      <div
        data-color={BACKGROUND_ENUM[current]}
        className='background-glow translate-x-[18%] translate-y-[10%] scale-140'
      />
      <CarouselContent>
        {slides.map((slide, idx) => (
          <CarouselItem key={idx}>{slide}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
