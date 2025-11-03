'use client'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import dynamic from 'next/dynamic'
import { button, useControls } from 'leva'
import { useRect, ensureRect } from '@/hooks/use-rect'
import { useIntersection } from '@/hooks/use-intersection'
import { useWindowSize } from '@/hooks/use-window-size'
import { useScroll } from '@/hooks/use-scroll'
import { useFrame } from '@/hooks/use-frame'
import { Button } from '@/components/ui/button'
import { CHAINS, DOWNLOADS } from '@/constants/landing.constants'
import { isBrowser } from '@/lib/misc'
import { useStore } from '@/lib/store'
import { clamp, mapRange } from '@/lib/maths'
import { Container } from '@/components/atoms/container'
import { TestimonialCarousel } from '@/components/molecules/testimonial-carousel'
import { DownloadCard } from '@/components/molecules/download-card'
import PlatformTabs from '@/components/molecules/platform-tabs'
import Image from 'next/image'
import { Trans } from '@lingui/react/macro'
import { ChainCard } from '@/components/molecules/chain-card'
import { NavigationLink } from '@/components/atoms/navigation-link'
import FeaturesSection from '@/components/organisms/features-section'

const AuroraText = dynamic(() => import('@/components/atoms/aurora-text').then(({ AuroraText }) => AuroraText), {
  ssr: false,
})

const AnimatedContent = dynamic(
  () => import('@/components/atoms/animated-content').then((AnimatedContent) => AnimatedContent),
  { ssr: false }
)

const WebGL = dynamic(() => import('@/components/atoms/webgl').then(({ WebGL }) => WebGL), { ssr: false })

if (isBrowser) {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

export default function HomeTemplate() {
  const zoomRef = useRef<HTMLElement | null>(null)
  const [theme, setTheme] = useState('dark')
  const [hasScrolled, setHasScrolled] = useState(false)

  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
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
      // console.log('[Home template] Lenis className: ', lenis.className)
    }

    lenis.on('className change' as any, onClassNameChange)

    return () => {
      lenis.off('className change' as any, onClassNameChange)
    }
  }, [lenis])

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    const rect = ensureRect(zoomWrapperRect)

    const top = rect.top || 0
    const height = rect.height || 0

    const start = top + windowHeight * 0.5
    const end = top + height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    const el = zoomRef.current
    if (!el) return

    el.style.setProperty('--progress1', `${progress1}`)
    el.style.setProperty('--progress2', `${progress2}`)

    if (progress === 1) {
      el.style.setProperty('background-color', 'currentColor')
    } else {
      el.style.removeProperty('background-color')
    }
  })

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

  useScroll((e) => {
    if (window.scrollY <= 400) {
      setScreenIphone('1')
    } else if (window.scrollY > 400 && window.scrollY <= 1600) {
      setScreenIphone('2')
    } else if (window.scrollY > 1600 && window.scrollY <= 2600) {
      setScreenIphone('3')
    } else if (window.scrollY > 2600 && window.scrollY <= 3000) {
      setScreenIphone('4')
    }
    // console.log('[Home template] use scroll', window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked)
  })

  useFrame(() => {
    // console.log('[Home template] use frame', window.scrollY, lenis?.scroll, lenis?.isScrolling)
  }, 1)

  const inUseRef = useRef<HTMLElement | null>(null)

  const [visible, setIsVisible] = useState(false)
  const intersection = useIntersection(inUseRef, {
    threshold: 0.2,
  })
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true)
    }
  }, [intersection])

  return (
    <div className='relative min-h-dvh overflow-x-hidden'>
      <div className={'canvas hidden lg:block'}>
        <WebGL />
      </div>

      {/* Hero Section */}
      <Container className='flex min-h-dvh items-center pb-5 lg:pb-10 xl:pb-16'>
        <div className='grid w-full items-center lg:grid-cols-2'>
          <div className='flex w-full flex-col items-center gap-8 lg:items-start lg:gap-13'>
            <h1 className='font-clash-display flex flex-col text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-start lg:text-6xl lg:leading-20'>
              <AuroraText speed={0}>
                <Trans>Own Your Crypto.</Trans>
              </AuroraText>
              <AuroraText speed={0}>
                <Trans>Unleash Web3</Trans>
              </AuroraText>
              <AuroraText speed={0}>
                <Trans>Possibilities</Trans>
              </AuroraText>
            </h1>
            <p className='max-w-md text-center lg:text-start'>
              <Trans>
                TBC Wallet empowers you to manage diverse assets like Bitcoin, Ethereum, and Solana. Securely dive into
                DeFi, NFTs, and dApps with full control. Your keys, your future.
              </Trans>
            </p>
            <div className='relative flex h-svw w-full items-center justify-center lg:hidden'>
              <Image
                src={'/assets/background/network.webp'}
                alt={'network'}
                width={612}
                height={612}
                className='absolute top-1/2 left-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 object-contain'
              />
              <Image src={'/mobile/screen/1.webp'} alt={'network'} fill className='object-contain' />
            </div>
            <NavigationLink href='/#download'>
              <Button variant={'neon'} size={'2xl'} className={'w-fit lg:relative'}>
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
            <div className='relative flex h-svw w-full items-center justify-center lg:hidden'>
              <Image src={'/mobile/screen/2.webp'} alt={'about'} fill className='object-contain' />
            </div>
          </div>
        </div>
      </Container>

      {/* Platform Section */}
      <Container
        id='platform'
        className='min-h-dvh py-5 lg:h-dvh lg:py-10 xl:py-16'
        data-lenis-scroll-snap-align='start'
      >
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
            <div className='relative mb-5 flex h-svw w-full items-center justify-center lg:hidden'>
              <Image src={'/mobile/screen/3.webp'} alt={'platform'} fill className='object-contain' />
            </div>
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
            {/*<FeaturesSection />*/}
          </div>
        </div>
      </Container>

      {/* One Platform, Millions of Assets */}
      <Container id='assets' className='min-h-[85dvh] py-5 lg:py-10 xl:py-16'>
        <div className='flex flex-col items-center justify-center gap-8 lg:gap-12'>
          <div className='relative flex max-w-3xl flex-col items-center gap-8 text-center lg:gap-6'>
            <AnimatedContent name={'asset-title'}>
              <h2 className='font-clash-display text-4xl font-semibold'>
                <Trans>Your All-in-One Web3 Wallet</Trans>
              </h2>
            </AnimatedContent>
            <AnimatedContent name={'asset-description'}>
              <p>
                <Trans>
                  TBC Wallet connects you to diverse ecosystems, from Bitcoin and Ethereum to Optimism and Cosmos.
                  Manage portfolios, engage in DeFi, trade NFTs, and link to dApps—all in one secure, self-custody hub.
                </Trans>
              </p>
            </AnimatedContent>
          </div>
          <div className='grid w-full grid-cols-2 gap-4 lg:gap-10 xl:grid-cols-4'>
            {CHAINS.map((crypto) => (
              <ChainCard key={crypto.id} chain={crypto} />
            ))}
          </div>
        </div>
      </Container>

      {/* One wallet. Cross-platform */}
      <Container id='platform' className='min-h-[85dvh] py-5 lg:py-10 xl:py-16'>
        <div className='flex h-full flex-col items-center justify-center gap-8 text-center lg:gap-12 lg:text-start'>
          <AnimatedContent>
            <h2 className='font-clash-display text-4xl font-semibold'>
              <Trans>One wallet. Cross platform</Trans>
            </h2>
          </AnimatedContent>
          <div className='relative h-full grow'>
            <PlatformTabs />
            <AnimatedContent distance={0} threshold={0.36} className={'absolute inset-0 z-[-1]'}>
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
          <h2 className='font-clash-display max-w-sm text-4xl font-semibold lg:max-w-none'>
            <Trans>Community talk about us</Trans>
          </h2>
          <AnimatedContent distance={0} threshold={0.4} className={'absolute inset-0 z-[-1]'}>
            <div className='relative top-1/5 left-[4%] h-full w-full scale-200 lg:top-[5%] lg:scale-90'>
              <div className='background-glow' />
            </div>
          </AnimatedContent>
          <TestimonialCarousel />
        </div>
      </Container>

      {/* Download Section */}
      <Container id='download' className='min-h-[70dvh] py-5 lg:min-h-[85dvh] lg:py-10 xl:py-16'>
        <div className='relative flex h-full w-full flex-col items-center justify-center gap-8 text-center lg:gap-12 lg:text-start'>
          <h2 className='font-clash-display text-4xl font-semibold'>
            <Trans>Download now</Trans>
          </h2>
          <div className='grid w-full max-w-[850px] grid-cols-2 gap-3 lg:gap-6 xl:gap-12'>
            {DOWNLOADS.map((data) => (
              <DownloadCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
