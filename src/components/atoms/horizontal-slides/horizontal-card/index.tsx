'use client'
import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'

interface HorizontalCardProps {
  readonly feature: Feature
  readonly className?: string
}

export function HorizontalCard({ feature, className }: HorizontalCardProps) {
  return (
    <div className={cn('grid h-screen w-full grid-cols-1 md:w-screen md:grid-cols-12', className)}>
      <div className='col-span-11 flex items-center justify-center md:col-start-2'>
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
