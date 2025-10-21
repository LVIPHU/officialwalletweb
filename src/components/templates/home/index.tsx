'use client'
import { useEffect, useRef, useState } from 'react'
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
import Lenis from 'lenis'
import { TestimonialCarousel } from '@/components/molecules/testimonial-carousel'
import { DownloadCard } from '@/components/molecules/download-card'
import PlatformTabs from '@/components/molecules/platform-tabs'
import Image from 'next/image'
import { FeaturesSection } from '@/components/organisms/features-section'
import { Trans } from '@lingui/react/macro'
import { ChainCard } from '@/components/molecules/chain-card'

// const Parallax = dynamic(() => import('@/components/atoms/parallax').then((Parallax) => Parallax), { ssr: false })

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
      console.log('[Home template] Lenis className: ', lenis.className)
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
    // console.log('[Home template] use scroll', window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked)
  })

  useFrame(() => {
    if (window.scrollY <= 400) {
      setScreenIphone('1')
    } else if (window.scrollY > 400 && window.scrollY <= 1600) {
      setScreenIphone('2')
    } else if (window.scrollY > 1600 && window.scrollY <= 3400) {
      setScreenIphone('3')
    } else {
      setScreenIphone('4')
    }
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
      <div className={'canvas'}>
        <WebGL />
      </div>

      {/* Hero Section */}
      <Container className='flex min-h-dvh items-center pb-5 md:pb-10 xl:pb-16'>
        <div className='grid w-full items-center md:grid-cols-2'>
          <div className='flex flex-col items-center gap-8 md:items-start md:gap-13'>
            <h1 className='font-clash-display text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-start md:text-6xl md:leading-20'>
              <AuroraText>
                <Trans>True crypto ownership.</Trans>
              </AuroraText>
              <br />
              <AuroraText>
                <Trans>Powerful Web3 experiences</Trans>
              </AuroraText>
            </h1>
            <p className='max-w-md text-center md:text-start'>
              <Trans>
                Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust Wallet.
              </Trans>
            </p>
            <div className='min-h-svw md:hidden'>
              <Image
                src={'/assets/background/network.webp'}
                alt={'network'}
                width={612}
                height={612}
                className='object-contain'
              />
            </div>
            <Button variant={'neon'} size={'2xl'} className={'w-fit md:relative'}>
              <span>
                <Trans>Explore now</Trans>
              </span>
            </Button>
          </div>
          <div className='hidden w-full md:block'>
            <Image src={'/assets/background/network.webp'} alt={'network'} width={612} height={612} />
          </div>
        </div>
      </Container>

      {/* About Section */}
      <Container id='about' className='h-dvh py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='flex h-full flex-col items-center gap-8 md:gap-6'>
          <AnimatedContent distance={50} threshold={0.7}>
            <div className='flex max-w-2xl flex-col gap-8 text-center md:gap-6'>
              <h2 className='font-clash-display text-5xl font-semibold'>
                <Trans>About</Trans>
              </h2>
              <p>
                <Trans>
                  As a leading self-custody multi-chain platform, we support millions of assets across 100+ blockchains.
                  We provide secure, user-friendly access to the decentralized web while maintaining complete control
                  over your digital assets.
                </Trans>
              </p>
            </div>
          </AnimatedContent>
          <div ref={aboutRectRef} className='relative mt-6 h-full w-full grow sm:mt-12 md:mt-24'>
            <AnimatedContent distance={0} threshold={0.36} className={'absolute inset-0 z-[-1]'}>
              <div className='relative left-[4.5%] h-full w-full scale-200 md:scale-100'>
                <div className='background-glow' />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>

      {/* Build Section */}
      <Container id='features' className='h-dvh py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='grid h-full items-center justify-center gap-8 md:grid-cols-2'>
          <AnimatedContent distance={10} threshold={0.4} className='md:order-last'>
            <div className='flex h-full max-w-md flex-col gap-8 text-center md:gap-6 md:text-start'>
              <h2 className='font-clash-display text-4xl font-semibold'>
                <Trans>Build for everyone</Trans>
              </h2>
              <p>
                <Trans>
                  Our platform is designed with accessibility and usability at its core. Whether you&apos;re a crypto
                  beginner or an experienced DeFi user, TB Wallet provides the tools and features you need to navigate
                  the Web3 ecosystem safely and efficiently.
                </Trans>
              </p>
            </div>
          </AnimatedContent>
          <div ref={platformRectRef} className='relative h-full w-full'>
            <AnimatedContent distance={10} threshold={0.4} className={'absolute inset-0 z-[-1]'}>
              <div className='relative left-[4.5%] h-full w-full scale-200 md:scale-160'>
                <div className='background-glow' />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <Container
        id='features'
        className='h-[75dvh] py-5 md:h-auto md:py-10 xl:py-16'
        data-lenis-scroll-snap-align='start'
      >
        <div ref={featuresRectRef} className='flex h-full items-center md:h-auto md:items-start'>
          <div className='relative grow'>
            <FeaturesSection />
          </div>
        </div>
      </Container>

      {/* One Platform, Millions of Assets */}
      <Container id='assets' className='min-h-[85dvh] py-5 md:py-10 xl:py-16'>
        <div className='flex flex-col items-center justify-center gap-8 md:gap-12'>
          <div className='relative flex max-w-3xl flex-col items-center gap-8 text-center md:gap-6'>
            <AnimatedContent name={'asset-title'}>
              <h2 className='font-clash-display text-4xl font-semibold'>
                <Trans>One Platform, Millions of Assets</Trans>
              </h2>
            </AnimatedContent>
            <AnimatedContent name={'asset-description'}>
              <p>
                <Trans>
                  As a leading self-custody multi-chain platform, we support millions of assets across 100+ blockchains.
                  From Bitcoin, Ethereum, and Solana, to Cosmos, Optimism, and much more.
                </Trans>
              </p>
            </AnimatedContent>
          </div>
          <div className='grid w-full grid-cols-2 gap-4 md:gap-10 lg:grid-cols-4'>
            {CHAINS.map((crypto) => (
              <ChainCard key={crypto.id} chain={crypto} />
            ))}
          </div>
        </div>
      </Container>

      {/* One wallet. Cross-platform */}
      <Container id='platform' className='min-h-[85dvh] py-5 md:py-10 xl:py-16'>
        <div className='flex h-full flex-col items-center justify-center gap-8 text-center md:gap-12 md:text-start'>
          <AnimatedContent>
            <h2 className='font-clash-display text-4xl font-semibold'>
              <Trans>One wallet. Cross platform</Trans>
            </h2>
          </AnimatedContent>
          <div className='relative h-full grow'>
            <PlatformTabs />
            <AnimatedContent distance={0} threshold={0.36} className={'absolute inset-0 z-[-1]'}>
              <div className='relative left-[4.5%] h-full w-full scale-200 md:scale-130'>
                <div className='background-glow' />
              </div>
            </AnimatedContent>
          </div>
        </div>
      </Container>

      {/*Community Testimonials*/}
      <Container id='community' className='min-h-[85dvh] py-5 md:py-10 xl:py-16'>
        <div className='relative flex h-full flex-col items-center justify-center gap-8 text-center md:gap-12 md:text-start'>
          <h2 className='font-clash-display max-w-sm text-4xl font-semibold md:max-w-none'>
            <Trans>Community talk about us</Trans>
          </h2>
          <AnimatedContent distance={0} threshold={0.4} className={'absolute inset-0 z-[-1]'}>
            <div className='relative top-1/5 left-[4.5%] h-full w-full scale-200 md:top-[5%] md:scale-130'>
              <div className='background-glow' />
            </div>
          </AnimatedContent>
          <TestimonialCarousel />
        </div>
      </Container>

      {/* Download Section */}
      <Container id='download' className='min-h-[70dvh] py-5 md:min-h-[85dvh] md:py-10 xl:py-16'>
        <div className='relative flex h-full w-full flex-col items-center justify-center gap-8 text-center md:gap-12 md:text-start'>
          <h2 className='font-clash-display text-4xl font-semibold'>
            <Trans>Download now</Trans>
          </h2>
          <div className='grid w-full max-w-[850px] grid-cols-2 gap-3 md:gap-6 lg:gap-12'>
            {DOWNLOADS.map((data) => (
              <DownloadCard key={data.id} data={data} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
