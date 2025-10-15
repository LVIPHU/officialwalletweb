'use client'

import { useMemo } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { cn } from '@/lib/styles'
import GlassCard from '@/components/molecules/glass-card'
import { TESTIMONIALS } from '@/constants/landing.constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile'
import Autoplay from 'embla-carousel-autoplay'

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
    <div className='flex h-full flex-col justify-center gap-5 px-6 py-5 md:gap-10'>
      <div>
        <p className='text-5xl leading-none'>“</p>
        <p>{testimonial.content}</p>
      </div>
      <div className='flex items-center'>
        <Avatar className='h-10 w-10'>
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='ml-3 overflow-hidden'>
          <p className='font-semibold'>{testimonial.name}</p>
          <p className='text-muted-foreground truncate text-sm'>{testimonial.role}</p>
        </div>
      </div>
    </div>
  </GlassCard>
)

const TestimonialGrid = ({ testimonials }: { testimonials: any[] }) => (
  <div className='grid grid-cols-1 gap-6 md:grid-cols-11 md:gap-12'>
    {testimonials.map((t, i) => (
      <TestimonialCard key={t.id} testimonial={t} className={cn(getCardGridClass(i))} />
    ))}
  </div>
)

export function TestimonialCarousel() {
  const isMobile = useIsMobile()
  const size = useMemo(() => (isMobile ? 2 : 4), [isMobile])
  const plugin = useMemo(() => Autoplay({ delay: 3000, stopOnInteraction: true }), [])
  const testimonialGroups = useMemo(() => chunkArray(TESTIMONIALS, size), [size])

  return (
    <Carousel
      plugins={[plugin]}
      className='flex h-full w-full items-center justify-center px-10'
      onMouseEnter={plugin.stop}
      onMouseLeave={plugin.reset}
    >
      <CarouselContent className='h-full'>
        {testimonialGroups.map((group, index) => (
          <CarouselItem key={index} className='h-full'>
            <TestimonialGrid testimonials={group} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant={'ghost'} className={"-left-2 [&_svg:not([class*='size-'])]:size-10"} />
      <CarouselNext variant={'ghost'} className={"-right-2 [&_svg:not([class*='size-'])]:size-10"} />
    </Carousel>
  )
}
