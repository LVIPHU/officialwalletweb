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
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { HorizontalCard } from '@/components/atoms/horizontal-slides/horizontal-card'
import { FEATURES, TESTIMONIALS, CRYPTOCURRENCIES } from '@/constants/landing.constants'
import { isBrowser } from '@/lib/misc'
import { useStore } from '@/lib/store'
import { clamp, mapRange } from '@/lib/maths'
import { Container } from '@/components/atoms/container'
import AnimatedContent from '@/components/atoms/animated-content'
import Lenis from 'lenis'
import { AuroraText } from '@/components/atoms/aurora-text'

const Parallax = dynamic(() => import('@/components/atoms/parallax').then((Parallax) => Parallax), { ssr: false })

const WebGL = dynamic(() => import('@/components/atoms/webgl').then(({ WebGL }) => WebGL), { ssr: false })

const HorizontalSlides = dynamic(
  () => import('@/components/atoms/horizontal-slides').then((HorizontalSlides) => HorizontalSlides),
  { ssr: false }
)

if (isBrowser) {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

export default function HomeTemplate() {
  const zoomRef = useRef<HTMLElement | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const introOut = useStore(({ introOut }) => introOut)

  const [theme, setTheme] = useState('dark')
  const lenis = useStore(({ lenis }) => lenis)

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
  const [featuresRectRef, featuresRect] = useRect()
  // const [platformRectRef, platformRect] = useRect()

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
      value: top + height + windowHeight / 2,
    })
    addThreshold({
      id: 'about-end',
      value: top + height + windowHeight,
    })
  }, [aboutRect])

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

  // useEffect(() => {
  //   const rect = ensureRect(platformRect)
  //
  //   const height = rect.height || 0
  //   const top = rect.top ? rect.top - windowHeight / 2 : 0
  //
  //   addThreshold({ id: 'platform-start', value: top + windowHeight / 2 })
  //   addThreshold({
  //     id: 'platform-end',
  //     value: top + height + windowHeight / 2,
  //   })
  //   addThreshold({
  //     id: 'outro',
  //     value: top + height + windowHeight,
  //   })
  // }, [platformRect])

  useEffect(() => {
    const top = lenis?.limit || 0
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll((e) => {
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
    <div className='relative min-h-screen'>
      <div className={'canvas'}>
        <WebGL />
      </div>

      {/* Hero Section */}
      <Container className='flex min-h-screen items-center pb-5 md:pb-10 xl:pb-16'>
        <div className='grid items-center gap-10 md:grid-cols-2'>
          <div className={'flex flex-col gap-7 md:gap-13'}>
            <h1 className='font-clash-display text-3xl leading-16 font-extrabold tracking-tight sm:text-4xl md:text-6xl md:leading-20'>
              <AuroraText>True crypto ownership.</AuroraText>
              <br />
              <AuroraText>Powerful Web3 experiences</AuroraText>
            </h1>
            <p className='max-w-md'>
              Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust Wallet.
            </p>
            <Button variant={'explore'} size={'2xl'} className={'w-fit'}>
              <span>Explore now</span>
            </Button>
          </div>
        </div>
      </Container>

      {/* About Section */}
      <Container id='about' className='min-h-screen py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='flex h-full flex-col items-center gap-6'>
          <AnimatedContent distance={50} threshold={0.7}>
            <div className='flex max-w-2xl flex-col gap-y-6 text-center'>
              <h2 className='text-4xl font-semibold'>About</h2>
              <p>
                As a leading self-custody multi-chain platform, we support millions of assets across 100+ blockchains.
                We provide secure, user-friendly access to the decentralized web while maintaining complete control over
                your digital assets.
              </p>
            </div>
          </AnimatedContent>
          <div ref={aboutRectRef} className='relative mt-6 min-h-[500px] min-w-screen grow sm:mt-12 md:mt-24'>
            <div className='background-glow' />
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <Container id='features' className='min-h-screen py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div ref={featuresRectRef}>
          <AnimatedContent threshold={0.6}>
            <Parallax speed={0.5}>
              <div className='text-center'>
                <h2 className='mb-6 text-4xl font-bold uppercase'>Features</h2>
                <p className='mx-auto max-w-3xl text-xl'>
                  Discover the powerful features that make TB Wallet the perfect choice for managing your digital
                  assets.
                </p>
              </div>
            </Parallax>
          </AnimatedContent>
          <div className='flex'>
            <div className='grow'>
              <HorizontalSlides>
                {FEATURES.map((feature) => (
                  <HorizontalCard key={feature.id} feature={feature} />
                ))}
              </HorizontalSlides>
            </div>
          </div>
        </div>
      </Container>

      {/* One Platform, Millions of Assets */}
      <Container id='platform' className='min-h-screen py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div>
          <h2 className='mb-6 text-4xl font-bold'>One Platform, Millions of Assets</h2>
          <p className='text-xl0 mb-12'>
            Access thousands of cryptocurrencies and digital assets from a single, secure platform.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-8'>
            {CRYPTOCURRENCIES.map((crypto) => (
              <Badge
                key={crypto.symbol}
                variant='outline'
                className='flex h-16 w-16 items-center justify-center rounded-full border-gray-600 text-2xl font-bold text-white transition-colors hover:border-green-500'
              >
                {crypto.symbol}
              </Badge>
            ))}
          </div>
        </div>
      </Container>

      {/* Community Testimonials */}
      <Container id='community' className='min-h-screen py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-4xl font-bold'>Community talk about us</h2>
            <p className='mx-auto max-w-3xl text-xl'>
              Join thousands of satisfied users who trust TB Wallet for their cryptocurrency needs.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-3'>
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className='border-gray-600 bg-gray-700'>
                <CardContent className='p-6'>
                  <div className='mb-4 flex items-center space-x-4'>
                    <Badge className='flex h-12 w-12 items-center justify-center rounded-full bg-green-500'>
                      <span className='text-lg font-bold text-white'>{testimonial.initials}</span>
                    </Badge>
                    <div>
                      <h4 className='text-lg font-bold text-white'>{testimonial.name}</h4>
                      <p className='text-gray-300'>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className='text-gray-300'>{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* Download Section */}
      <Container id='download' className='min-h-screen py-5 md:py-10 xl:py-16' data-lenis-scroll-snap-align='start'>
        <div className='mx-auto max-w-7xl text-center'>
          <h2 className='mb-6 text-4xl font-bold'>Download now</h2>
          <p className='mb-12 text-xl'>
            Get started with TB Wallet today and experience the future of cryptocurrency management.
          </p>
          <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
            <Button
              variant='outline'
              size='lg'
              className='border-gray-600 bg-gray-800 px-8 py-4 text-lg text-white hover:border-green-500 hover:text-green-400'
            >
              <span className='mr-3 text-2xl'>📱</span>
              <div className='text-left'>
                <div className='text-sm text-gray-400'>Download on the</div>
                <div className='text-lg font-bold'>App Store</div>
              </div>
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='border-gray-600 bg-gray-800 px-8 py-4 text-lg text-white hover:border-green-500 hover:text-green-400'
            >
              <span className='mr-3 text-2xl'>🤖</span>
              <div className='text-left'>
                <div className='text-sm text-gray-400'>Get it on</div>
                <div className='text-lg font-bold'>Google Play</div>
              </div>
            </Button>
          </div>
        </div>
      </Container>
      <Separator className='bg-gray-700' />
    </div>
  )
}
