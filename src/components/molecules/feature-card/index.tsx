'use client'
import type { Feature } from '@/types/landing.types'
import { cn } from '@/lib/styles'
import { Trans } from '@lingui/react/macro'
import { useLingui } from '@lingui/react'

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
  const { i18n } = useLingui()
  return (
    <div
      className={cn(
        'grid w-full grid-cols-1 md:h-screen md:w-xl md:grid-cols-12 md:opacity-0 first:md:ml-60 last:md:mr-60 lg:w-2xl xl:w-3xl 2xl:w-4xl',
        className
      )}
    >
      <div className='col-span-5 flex items-center justify-center md:col-start-8'>
        <div className='flex flex-col items-center justify-center gap-7 md:items-start'>
          <h2 data-title className='font-clash-display text-center text-4xl font-semibold md:text-start'>
            <Trans>Features</Trans>
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
            {i18n._(feature.title)}
          </p>
          <p data-desc className='max-w-md text-center md:text-start'>
            {i18n._(feature.description)}
          </p>
        </div>
      </div>
    </div>
  )
}
