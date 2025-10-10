'use client'
import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'

interface HorizontalCardProps {
  readonly feature: Feature
  readonly className?: string
}

export function HorizontalCard({ feature, className }: HorizontalCardProps) {
  return (
    <div
      className={cn('grid h-screen w-full grid-cols-1 md:w-3xl md:grid-cols-12 lg:w-4xl xl:w-5xl 2xl:w-6xl', className)}
    >
      <div className='col-span-7 flex items-center justify-center md:col-start-6'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <h2 data-title className='text-xl font-semibold'>
            {feature.title}
          </h2>
          <div data-icon className='mb-2 text-4xl'>
            {feature.icon} ICON
          </div>
          <p data-desc className='text-muted-foreground max-w-md'>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  )
}
