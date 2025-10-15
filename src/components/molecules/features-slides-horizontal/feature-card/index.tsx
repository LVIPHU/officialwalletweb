'use client'
import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'

interface FeatureCardProps {
  readonly feature: Feature
  readonly className?: string
}

const variantCard: Record<string, string> = {
  'multi-signature': 'card-chain-green',
  swap: 'card-chain-blue-purple',
  miner: 'card-chain-purple',
  'instant-transfer': 'card-chain-orange',
  'nfts-wallet': 'card-chain-olive ',
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'grid h-screen w-full grid-cols-1 opacity-0 md:w-xl md:grid-cols-12 first:md:ml-60 last:md:mr-60 lg:w-2xl xl:w-3xl 2xl:w-4xl',
        className
      )}
    >
      <div className='col-span-5 flex items-center justify-center md:col-start-8'>
        <div className='flex flex-col justify-center gap-7'>
          <h2 data-title className='text-4xl'>
            {feature.title}
          </h2>
          <div
            data-icon
            className={cn(
              'flex size-30 flex-col items-center justify-center gap-5 rounded-3xl',
              variantCard[feature.id]
            )}
          >
            <feature.icon className='size-20' fill='currentColor' />
          </div>
          <p data-subtitle className='text-3xl font-semibold'>
            {feature.subtitle}
          </p>
          <p data-desc className='max-w-md'>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  )
}
