/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

'use client'
import Image from 'next/image'
import { Container } from '@/components/atoms/container'
import { Button } from '@/components/ui/button'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { CHAINS, DOWNLOADS, FEATURES } from '@/constants/landing.constants'
import { ChainCard } from '@/components/molecules/chain-card'
import { DownloadCard } from '@/components/molecules/download-card'
import { TestimonialCarousel } from '@/components/molecules/testimonial-carousel'
import PlatformTabs from '@/components/molecules/platform-tabs'
import { Trans } from '@lingui/react/macro'
import { AuroraText } from '@/components/atoms/aurora-text'
import { FeatureCard } from '@/components/molecules/feature-card'
import { FeaturesCarousel } from '@/components/molecules/features-carousel'

export default function HomeTemplateMobile() {
  return (
    <div className='relative min-h-dvh overflow-x-hidden'>
      {/* Hero */}
      <Container id='hero' className='flex flex-col items-center justify-center gap-6 py-10 text-center'>
        <h1 className='font-clash-display text-3xl font-extrabold'>
          <AuroraText speed={0}>
            <Trans>Own Your Crypto. Unleash Web3 Possibilities</Trans>
          </AuroraText>
        </h1>
        <p className='max-w-md'>
          <Trans>
            TBC Wallet empowers you to manage diverse assets like Bitcoin, Ethereum, and Solana. Securely dive into
            DeFi, NFTs, and dApps with full control. Your keys, your future.
          </Trans>
        </p>
        <div className='relative flex h-svw w-full items-center justify-center'>
          <Image
            src={'/assets/background/network.webp'}
            alt={'network'}
            width={612}
            height={612}
            className='absolute top-1/2 left-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 object-contain'
          />
          <Image src={'/mobile/screen/1.webp'} alt='network' fill className='object-contain' />
        </div>
        <NavigationLink href='/#download'>
          <Button variant='neon' size='2xl' className='w-fit'>
            <Trans>Explore now</Trans>
          </Button>
        </NavigationLink>
      </Container>

      {/* About */}
      <Container id='about' className='py-10 text-center'>
        <h2 className='font-clash-display text-4xl font-semibold'>
          <Trans>About</Trans>
        </h2>
        <p className='mt-4'>
          <Trans>
            TBC Wallet is a leading multi-chain wallet with robust security and an intuitive interface. It simplifies
            Web3 interactions, from token management to dApp access, while giving you total control over your digital
            wealth.
          </Trans>
        </p>
        <div className='relative mt-8 flex h-svw w-full items-center justify-center'>
          <Image src={'/mobile/screen/2.webp'} alt={'about'} fill className='object-contain' />
        </div>
      </Container>

      {/* Platform */}
      <Container id='build' className='py-10 text-center'>
        <h2 className='font-clash-display text-4xl font-semibold'>
          <Trans>Designed for All, Built for You</Trans>
        </h2>
        <p className='mt-4'>
          <Trans>
            TBC Wallet bridges the gap for beginners and experts alike. Its user-friendly design offers easy onboarding
            for newcomers and advanced tools for DeFi pros, ensuring secure, efficient navigation of the decentralized
            ecosystem.
          </Trans>
        </p>
        <div className='relative mt-8 flex h-svw w-full items-center justify-center'>
          <Image src={'/mobile/screen/3.webp'} alt={'platform'} fill className='object-contain' />
        </div>
      </Container>

      {/* Features */}
      <Container id='features' className='py-10'>
        <div className='flex h-full items-center'>
          <FeaturesCarousel>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </FeaturesCarousel>
        </div>
      </Container>

      {/* Assets */}
      <Container id='assets' className='py-10 text-center'>
        <h2 className='font-clash-display text-4xl font-semibold'>
          <Trans>Your All-in-One Web3 Wallet</Trans>
        </h2>
        <p className='mt-4'>
          <Trans>
            TBC Wallet connects you to diverse ecosystems, from Bitcoin and Ethereum to Optimism and Cosmos. Manage
            portfolios, engage in DeFi, trade NFTs, and link to dApps—all in one secure, self-custody hub.
          </Trans>
        </p>
        <div className='mt-8 grid grid-cols-2 gap-4'>
          {CHAINS.map((chain) => (
            <ChainCard key={chain.id} chain={chain} />
          ))}
        </div>
      </Container>

      {/* Cross Platform */}
      <Container id='platform' className='py-10 text-center'>
        <h2 className='font-clash-display mb-8 text-4xl font-semibold'>
          <Trans>One wallet. Cross platform</Trans>
        </h2>
        <PlatformTabs />
      </Container>

      {/* Testimonials */}
      <Container id='community' className='py-10 text-center'>
        <h2 className='font-clash-display text-4xl font-semibold'>
          <Trans>Community talk about us</Trans>
        </h2>
        <TestimonialCarousel />
      </Container>

      {/* Download */}
      <Container id='download' className='py-10 text-center'>
        <h2 className='font-clash-display text-4xl font-semibold'>
          <Trans>Download now</Trans>
        </h2>
        <div className='mt-6 grid grid-cols-2 gap-3'>
          {DOWNLOADS.map((data) => (
            <DownloadCard key={data.id} data={data} />
          ))}
        </div>
      </Container>
    </div>
  )
}
