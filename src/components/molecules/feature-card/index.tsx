'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'

gsap.registerPlugin(ScrollTrigger)

interface FeatureCardProps {
  readonly feature: Feature
  readonly className?: string
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const iconRef = useRef<HTMLDivElement | null>(null)
  const descRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'feature-card',
          trigger: cardRef.current,
          start: 'left 95%',
          end: 'center 95%',
          scrub: true,
          containerAnimation: (window as any).horizontalScrollTrack, // quan trọng
          markers: true, // thêm markers để thấy vị trí
        },
      })

      tl.to(titleRef.current, { y: -100, opacity: 0, ease: 'power1.out' }, 0)
      tl.to(descRef.current, { y: 100, opacity: 0, ease: 'power1.out' }, 0)
      tl.to(iconRef.current, { scale: 0.3, opacity: 0, ease: 'power1.out' }, 0)
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
      <div ref={cardRef} className={cn('grid h-screen w-full grid-cols-1 md:w-screen md:grid-cols-2', className)}>
        <div className='col-span-1 flex items-center justify-center md:col-start-2'>
          <div className='flex flex-col gap-4 items-center text-center'>
            <h2 ref={titleRef} className='text-xl font-semibold'>
              {feature.title}
            </h2>
            <div ref={iconRef} className='mb-2 text-4xl'>
              {feature.icon}
            </div>
            <p ref={descRef} className='text-muted-foreground max-w-md'>
              {feature.description}
            </p>
          </div>
        </div>
      </div>
  )
}
