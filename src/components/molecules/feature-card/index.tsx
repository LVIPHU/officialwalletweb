import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'

interface FeatureCardProps {
  readonly feature: Feature
  readonly className?: string
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  return (
    <div className={cn('grid h-screen w-full grid-cols-1 md:w-screen md:grid-cols-2', className)}>
      <div className='col-span-1 flex items-center justify-center md:col-start-2'>
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl'>{feature.title}</h2>
          <div className='mb-2 text-4xl'>{feature.icon}</div>
          <p className='text-muted-foreground'>{feature.description}</p>
        </div>
      </div>
    </div>
  )
}
