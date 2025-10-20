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
        'grid w-full grid-cols-1 md:h-screen md:w-xl md:grid-cols-12 md:opacity-0 lg:w-2xl xl:w-3xl 2xl:w-4xl',
        'first:md:ml-4 last:md:mr-4 first:lg:ml-16 last:lg:mr-16 first:xl:ml-24 last:xl:mr-24 first:2xl:ml-38 last:2xl:mr-38',
        className
      )}
    >
      <div className='col-span-5 flex items-center justify-center md:col-start-8'>
        <div className='relative flex flex-col items-center justify-center gap-7 md:items-start lg:pt-38 xl:pt-28 2xl:pt-10'>
          <h2 data-title className='font-clash-display text-center text-4xl font-semibold md:hidden'>
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
