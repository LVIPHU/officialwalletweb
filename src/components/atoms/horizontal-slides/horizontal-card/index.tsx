'use client'
import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'

interface HorizontalCardProps {
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

export function HorizontalCard({ feature, className }: HorizontalCardProps) {
  return (
    <div
      className={cn(
        'grid h-screen w-full grid-cols-1 first:ml-28 last:mr-28 md:w-3xl md:grid-cols-12 lg:w-4xl xl:w-5xl 2xl:w-6xl',
        className
      )}
    >
      <div className='col-span-6 flex items-center justify-center md:col-start-7'>
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
            <feature.icon className={'size-20'} fill='currentColor' />
          </div>
          <p data-subtitle className='text-3xl font-semibold'>
            {feature.subtitle}
          </p>
          <p data-desc>{feature.description}</p>
        </div>
      </div>
    </div>
  )
}
