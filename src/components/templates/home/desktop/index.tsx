/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import { button, useControls } from 'leva'
import { useRect, ensureRect } from '@/hooks/use-rect'
import { useWindowSize } from '@/hooks/use-window-size'
import { useScroll } from '@/hooks/use-scroll'
import { Button } from '@/components/ui/button'
import { CHAINS, DOWNLOADS, FEATURES } from '@/constants/landing.constants'
import { useStore } from '@/lib/store'
import { Container } from '@/components/atoms/container'
import { TestimonialCarousel } from '@/components/molecules/testimonial-carousel'
import { DownloadCard } from '@/components/molecules/download-card'
import PlatformTabs from '@/components/molecules/platform-tabs'
import Image from 'next/image'
import { Trans } from '@lingui/react/macro'
import { ChainCard } from '@/components/molecules/chain-card'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { FeatureCard } from '@/components/molecules/feature-card'
import { cn } from '@/lib/styles'

const FeaturesSlidesHorizontal = dynamic(
  () =>
    import('@/components/molecules/features-slides-horizontal').then(
      (FeaturesSlidesHorizontal) => FeaturesSlidesHorizontal
    ),
  { ssr: false }
)

const AuroraText = dynamic(() => import('@/components/atoms/aurora-text').then(({ AuroraText }) => AuroraText), {
  ssr: false,
})

const AnimatedContent = dynamic(
  () => import('@/components/atoms/animated-content').then((AnimatedContent) => AnimatedContent),
  { ssr: false }
)

const AnimatedSequence = dynamic(
  () => import('@/components/atoms/animated-content').then(({ AnimatedSequence }) => AnimatedSequence),
  { ssr: false }
)

const WebGL = dynamic(() => import('@/components/atoms/webgl').then(({ WebGL }) => WebGL), { ssr: false })

export default function HomeTemplateDesktop() {
  const { height: windowHeight } = useWindowSize()

  const lenis = useStore(({ lenis }) => lenis)
  const introOut = useStore(({ introOut }) => introOut)
  const setScreenIphone = useStore((state) => state.setScreenIphone)

  useControls(
    'lenis',
    () => ({
      stop: button(() => {
        lenis?.stop()
      }),
      start: button(() => {
        lenis?.start()
      }),
    }),
    [lenis]
  )

  useControls(
    'scrollTo',
    () => ({
      immediate: button(() => {
        lenis?.scrollTo(30000, { immediate: true })
      }),
      smoothDuration: button(() => {
        lenis?.scrollTo(30000, { lock: true, duration: 10 })
      }),
      smooth: button(() => {
        lenis?.scrollTo(30000)
      }),
      forceScrollTo: button(() => {
        lenis?.scrollTo(30000, { force: true })
      }),
    }),
    [lenis]
  )

  useEffect(() => {
    if (!lenis) return
    function onClassNameChange(lenis: Lenis) {
      console.info(lenis.className)
    }
    lenis.on('className change' as any, onClassNameChange)

    return () => {
      lenis.off('className change' as any, onClassNameChange)
    }
  }, [lenis])

  const [aboutRectRef, aboutRect] = useRect()
  const [platformRectRef, platformRect] = useRect()
  const [featuresRectRef, featuresRect] = useRect()

  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
    addThreshold({ id: 'intro', value: windowHeight / 4 })
  }, [])

  useEffect(() => {
    const rect = ensureRect(aboutRect)

    const height = rect.height || 0
    const top = rect.top ? rect.top - windowHeight / 2 : 0

    addThreshold({ id: 'about-start', value: top })
    addThreshold({
      id: 'about-center',
      value: top + height,
    })
    addThreshold({
      id: 'about-end',
      value: top + height + windowHeight / 2,
    })
  }, [aboutRect])

  useEffect(() => {
    const rect = ensureRect(platformRect)

    const height = rect.height || 0
    const top = rect.top ? rect.top - windowHeight / 2 : 0

    addThreshold({ id: 'platform-start', value: top })
    addThreshold({
      id: 'platform-center',
      value: top + height,
    })
    addThreshold({
      id: 'platform-end',
      value: top + height + windowHeight / 2,
    })
  }, [platformRect])

  useEffect(() => {
    const rect = ensureRect(featuresRect)

    const height = rect.height || 0
    const top = rect.top ? rect.top - windowHeight / 2 : 0

    addThreshold({ id: 'features-start', value: top })
    addThreshold({
      id: 'features-center',
      value: top + height * 0.9,
    })
    addThreshold({
      id: 'features-end',
      value: top + height + windowHeight / 2,
    })
  }, [featuresRect])

  useEffect(() => {
    const top = lenis?.limit || 0
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll(() => {
    if (window.scrollY <= 400) {
      setScreenIphone('1')
    } else if (window.scrollY > 400 && window.scrollY <= 1600) {
      setScreenIphone('2')
    } else if (window.scrollY > 1600 && window.scrollY <= 2600) {
      setScreenIphone('3')
    } else if (window.scrollY > 2600 && window.scrollY <= 3000) {
      setScreenIphone('4')
    }
  })

  return (
    <div className='relative min-h-dvh overflow-x-hidden'>
      <div className={'canvas hidden lg:block'}>
        <WebGL />
      </div>

      {/* Hero Section */}
      <Container id='hero' className='flex min-h-dvh items-center pb-5 lg:pb-10 xl:pb-16'>
        <div className='grid w-full items-center lg:grid-cols-2'>
          <div className='flex w-full flex-col items-center gap-8 lg:items-start lg:gap-13'>
            <h1 className='font-clash-display flex flex-col text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-start lg:text-6xl lg:leading-20'>
              <HeroTextIn introOut={introOut}>
                <AuroraText speed={0}>
                  <Trans>Own Your Crypto.</Trans>
                </AuroraText>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <AuroraText speed={0}>
                  <Trans>Unleash Web3</Trans>
                </AuroraText>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <AuroraText speed={0}>
                  <Trans>Possibilities</Trans>
                </AuroraText>
              </HeroTextIn>
            </h1>
            <HeroTextIn introOut={introOut}>
              <p className='max-w-md text-center lg:text-start'>
                <Trans>
                  TBC Wallet empowers you to manage diverse assets like Bitcoin, Ethereum, and TRON. Securely dive into
                  DeFi, NFTs, and dApps with full control. Your keys, your future.
                </Trans>
              </p>
            </HeroTextIn>
            <NavigationLink href='/#download'>
              <Button
                variant={'neon'}
                size={'2xl'}
                className={cn('hide-button w-fit lg:relative', introOut && 'show-button')}
              >
                <span>
                  <Trans>Explore now</Trans>
                </span>
              </Button>
            </NavigationLink>
          </div>
          <div className='hidden w-full lg:block'>
            <Image src={'/assets/background/network.webp'} alt={'hero'} width={612} height={612} />
          </div>
        </div>
      </Container>

      {/* About Section */}
      <Container id='about' className='min-h-dvh py-5 lg:h-dvh lg:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='flex h-full flex-col items-center gap-8 lg:gap-6'>
          <AnimatedContent distance={50} threshold={0.7}>
            <div className='flex max-w-2xl flex-col gap-8 text-center lg:gap-6'>
              <h2 className='font-clash-display text-5xl font-semibold'>
                <Trans>About</Trans>
              </h2>
              <p>
                <Trans>
                  TBC Wallet is a leading multi-chain wallet with robust security and an intuitive interface. It
                  simplifies Web3 interactions, from token management to dApp access, while giving you total control
                  over your digital wealth.
                </Trans>
              </p>
            </div>
          </AnimatedContent>
          <div ref={aboutRectRef} className='relative mt-6 h-full w-full grow sm:mt-12 lg:mt-24'>
            <AnimatedContent distance={0} threshold={0.36} className={'absolute inset-0 z-[-1]'}>
              <div className='relative left-[4.5%] h-full w-full scale-200 lg:scale-100'>
                <div className='background-glow' />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>

      {/* Platform Section */}
      <Container id='build' className='min-h-dvh py-5 lg:h-dvh lg:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='grid h-full items-center justify-center gap-8 lg:grid-cols-2'>
          <AnimatedContent distance={10} threshold={0.4} className='lg:order-last'>
            <div className='flex h-full max-w-md flex-col gap-8 text-center lg:gap-6 lg:text-start'>
              <h2 className='font-clash-display text-4xl font-semibold'>
                <Trans>Designed for All, Built for You</Trans>
              </h2>
              <p>
                <Trans>
                  TBC Wallet bridges the gap for beginners and experts alike. Its user-friendly design offers easy
                  onboarding for newcomers and advanced tools for DeFi pros, ensuring secure, efficient navigation of
                  the decentralized ecosystem.
                </Trans>
              </p>
            </div>
          </AnimatedContent>
          <div ref={platformRectRef} className='relative h-full w-full'>
            <AnimatedContent distance={10} threshold={0.4} className={'absolute inset-0 z-[-1]'}>
              <div className='relative left-[4.5%] h-full w-full scale-200 lg:scale-160'>
                <div className='background-glow' />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <Container
        id='features'
        className='h-[80dvh] py-5 lg:h-auto lg:py-10 xl:py-16'
        data-lenis-scroll-snap-align='start'
      >
        <div ref={featuresRectRef} className='flex h-full items-center lg:h-auto lg:items-start'>
          <div className='relative grow'>
            <FeaturesSlidesHorizontal>
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </FeaturesSlidesHorizontal>
          </div>
        </div>
      </Container>

      {/* One Platform, Millions of Assets */}
      <Container id='assets' className='min-h-[85dvh] py-5 lg:py-10 xl:py-16'>
        <div className='flex flex-col items-center justify-center gap-8 lg:gap-12'>
          <AnimatedContent distance={150} duration={3}>
            <div className='relative flex max-w-3xl flex-col items-center gap-8 text-center lg:gap-6'>
              <h2 className='font-clash-display text-4xl font-semibold'>
                <Trans>Your All-in-One Web3 Wallet</Trans>
              </h2>
              <p>
                <Trans>
                  TBC Wallet connects you to diverse ecosystems, from Bitcoin and Ethereum to Optimism and Cosmos.
                  Manage portfolios, engage in DeFi, trade NFTs, and link to dApps—all in one secure, self-custody hub.
                </Trans>
              </p>
            </div>
          </AnimatedContent>
          <AnimatedSequence
            className='grid w-full grid-cols-2 gap-4 lg:gap-10 xl:grid-cols-4'
            threshold={0.3}
            distance={100}
            stagger={0.5}
          >
            {CHAINS.map((crypto) => (
              <ChainCard key={crypto.id} chain={crypto} />
            ))}
          </AnimatedSequence>
        </div>
      </Container>

      {/* One wallet. Cross-platform */}
      <Container id='platform' className='min-h-[85dvh] py-5 lg:py-10 xl:py-16'>
        <div className='flex h-full flex-col items-center justify-center gap-8 text-center lg:gap-12 lg:text-start'>
          <AnimatedContent duration={3}>
            <h2 className='font-clash-display text-4xl font-semibold'>
              <Trans>One wallet. Cross platform</Trans>
            </h2>
          </AnimatedContent>
          <div className='relative h-full grow'>
            <PlatformTabs />
            <AnimatedContent distance={0} className={'absolute inset-0 z-[-1]'}>
              <div className='relative top-[10%] left-[4.5%] h-full w-full scale-200 lg:scale-130'>
                <div className='background-glow' />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>

      {/*Community Testimonials*/}
      <Container id='community' className='min-h-[85dvh] py-5 lg:py-10 xl:py-16'>
        <div className='relative flex h-full flex-col items-center justify-center gap-8 text-center lg:gap-12 lg:text-start'>
          <AnimatedContent duration={3}>
            <h2 className='font-clash-display max-w-sm text-4xl font-semibold lg:max-w-none'>
              <Trans>Community talk about us</Trans>
            </h2>
          </AnimatedContent>
          <AnimatedContent distance={0} className={'absolute inset-0 z-[-1]'}>
            <div className='relative top-1/5 left-[4%] h-full w-full scale-200 lg:top-[5%] lg:scale-90'>
              <div className='background-glow' />
            </div>
          </AnimatedContent>
          <AnimatedContent duration={3} className='w-full'>
            <TestimonialCarousel />
          </AnimatedContent>
        </div>
      </Container>

      {/* Download Section */}
      <Container id='download' className='min-h-[70dvh] py-5 lg:min-h-[85dvh] lg:py-10 xl:py-16'>
        <div className='relative flex h-full w-full flex-col items-center justify-center gap-8 text-center lg:gap-12 lg:text-start'>
          <AnimatedContent duration={3}>
            <h2 className='font-clash-display text-4xl font-semibold'>
              <Trans>Download now</Trans>
            </h2>
          </AnimatedContent>
          <AnimatedSequence
            className='grid w-full max-w-[850px] grid-cols-2 gap-3 lg:gap-6 xl:gap-12'
            threshold={0.3}
            distance={100}
            stagger={0.5}
          >
            {DOWNLOADS.map((data) => (
              <DownloadCard key={data.id} data={data} />
            ))}
          </AnimatedSequence>
        </div>
      </Container>
    </div>
  )
}

const HeroTextIn = ({ children, introOut }: { children: ReactNode; introOut: boolean }) => {
  return <span className={cn('hide-text', introOut && 'show-text')}>{children}</span>
}
