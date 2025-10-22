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
import { cn } from '@/lib/styles'

interface FeaturesCarouselProps {
  children: React.ReactNode
}

export function FeaturesCarousel({ children }: FeaturesCarouselProps) {
  const slides = React.Children.toArray(children)

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (slides.length === 0) return null

  return (
    <div className='w-full'>
      <Carousel setApi={setApi} className='relative w-full'>
        <div data-color={BACKGROUND_ENUM[current - 1]} className='background-glow translate-x-[20%] scale-140' />
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx}>{slide}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className='mt-4 flex items-center justify-center gap-2.5 md:hidden'>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn('bg-primary/10 h-2 w-7 rounded-full', {
              'bg-primary': current === index + 1,
            })}
          />
        ))}
      </div>
    </div>
  )
}
