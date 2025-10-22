'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/styles'
import GlassCard from '@/components/molecules/glass-card'
import { TESTIMONIALS } from '@/constants/landing.constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import Autoplay from 'embla-carousel-autoplay'
import QuoteSVG from '@public/assets/icons/quote.svg'

function chunkArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size))
}

function getCardGridClass(index: number) {
  const layouts = [
    'col-span-1 md:col-span-5',
    'col-span-1 md:col-span-5 md:col-end-11',
    'col-span-1 md:col-span-5 md:col-start-2',
    'col-span-1 md:col-span-5 md:col-end-12',
  ]
  return layouts[index % layouts.length]
}

const TestimonialCard = ({ testimonial, className }: { testimonial: any; className?: string }) => (
  <GlassCard className={className}>
    <div className='flex h-full flex-col items-center justify-center gap-5 px-6 py-5 md:items-start md:gap-10'>
      <div className='flex flex-col items-center justify-center gap-6 md:items-start md:gap-4'>
        <QuoteSVG className='size-7 fill-black md:size-4 dark:fill-white' />
        <p>{testimonial.content}</p>
      </div>
      <div className='flex flex-col items-center gap-3 md:flex-row'>
        <Avatar className='size-20 md:size-10'>
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='overflow-hidden'>
          <p className='font-semibold'>{testimonial.name}</p>
          <p className='dark:text-muted-foreground truncate text-sm'>{testimonial.role}</p>
        </div>
      </div>
    </div>
  </GlassCard>
)

const TestimonialGrid = ({ testimonials }: { testimonials: any[] }) => (
  <div className='grid h-full grid-cols-1 gap-6 md:grid-cols-11 md:gap-12'>
    {testimonials.map((t, i) => (
      <TestimonialCard
        key={t.id}
        testimonial={t}
        className={cn(getCardGridClass(i), 'h-full min-h-[400px] md:min-h-0')}
      />
    ))}
  </div>
)

export function TestimonialCarousel() {
  const isMobile = useIsMobile()
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

  const size = useMemo(() => (isMobile ? 1 : 4), [isMobile])
  const plugin = useMemo(() => Autoplay({ delay: 3000, stopOnInteraction: true }), [])
  const testimonialGroups = useMemo(
    () => chunkArray(isMobile ? TESTIMONIALS.slice(0, 4) : TESTIMONIALS, size),
    [size, isMobile]
  )

  return (
    <div className='w-full'>
      <Carousel
        setApi={setApi}
        plugins={[plugin]}
        className='flex w-full items-center justify-center md:px-10'
        onMouseEnter={plugin.stop}
        onMouseLeave={plugin.reset}
      >
        <CarouselContent>
          {testimonialGroups.map((group, index) => (
            <CarouselItem className='basis-10/11 md:basis-full' key={index}>
              <TestimonialGrid testimonials={group} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={'ghost'} className={"size-14 md:-left-2 md:[&_svg:not([class*='size-'])]:size-10"} />
        <CarouselNext variant={'ghost'} className={"size-14 md:-right-2 md:[&_svg:not([class*='size-'])]:size-10"} />
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
