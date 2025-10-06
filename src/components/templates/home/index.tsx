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
import { FeatureCard } from '@/components/molecules/feature-card'
import { FEATURES, TESTIMONIALS, CRYPTOCURRENCIES } from '@/constants/landing.constants'
import LightRays from '@/components/atoms/light-rays'
import { isBrowser } from '@/lib/misc'
import { useStore } from '@/lib/store'
import { clamp, mapRange } from '@/lib/maths'
import Lenis from 'lenis'
import { Container } from '@/components/atoms/container'

const WebGL = dynamic(() => import('@/components/atoms/webgl').then(({ WebGL }) => WebGL), { ssr: false })

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
    if (!rect.top) return

    const height = rect?.height || 0

    const start = rect.top + windowHeight * 0.5
    const end = rect.top + height - windowHeight

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

  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const rect = ensureRect(aboutRect)

    const height = rect.height || 0
    const top = rect.top ? rect.top - windowHeight / 2 : 0

    addThreshold({ id: 'about-start', value: top })
    addThreshold({
      id: 'about-end',
      value: top + height,
    })
  }, [aboutRect])

  useEffect(() => {
    const top = lenis?.limit || 0
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll((e) => {
    console.log('[Home template] use scroll', window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked)
  })

  useFrame(() => {
    console.log('[Home template] use frame', window.scrollY, lenis?.scroll, lenis?.isScrolling)
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
    <div className='min-h-screen'>
      <div className={'canvas'}>
        <WebGL />
      </div>
      {/* Hero Section */}
      <section className='relative flex h-screen items-center px-6 pt-24 pb-16'>
        <div className={'absolute inset-0 translate-x-1/5'}>
          <LightRays
            raysOrigin='bottom-center'
            raysColor='#00ffff'
            raysSpeed={0}
            lightSpread={0.1}
            rayLength={0.6}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className='custom-rays'
          />
        </div>

        <div className='mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2'>
          {/* Left Content */}
          <div>
            <h1 className='font-class-display mb-6 text-5xl leading-tight font-bold lg:text-7xl'>
              True crypto ownership.
              <br />
              <span>Powerful Web3</span>
              <br />
              experiences
            </h1>
            <p className='mb-8 text-xl leading-relaxed text-gray-300'>
              Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust Wallet.
            </p>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button className='flex items-center space-x-3 rounded-lg border-2 border-purple-400 bg-transparent px-8 py-4 text-lg text-blue-900 hover:bg-purple-50'>
                <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                  />
                </svg>
                <span>Download Mobile App</span>
              </Button>
              <Button className='flex items-center space-x-3 rounded-lg border-2 border-purple-400 bg-transparent px-8 py-4 text-lg text-blue-900 hover:bg-purple-50'>
                <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                <span>Download Extension</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Container id='about' data-lenis-scroll-snap-align='start'>
        <div ref={aboutRectRef}>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-4xl font-bold text-white'>About</h2>
            <p className='mx-auto max-w-3xl text-xl text-gray-300'>
              TB Wallet is revolutionizing cryptocurrency management. Our platform combines cutting-edge security with
              an intuitive user experience.
            </p>
          </div>
          <div className='grid items-center gap-12 lg:grid-cols-2'>
            <Card className='mx-auto h-96 w-80 border-gray-600 bg-gray-700'>
              <CardContent className='p-6'>
                <div className='mb-4 h-8 w-full rounded-lg bg-green-500'></div>
                <div className='space-y-3'>
                  <div className='h-4 w-3/4 rounded bg-gray-600'></div>
                  <div className='h-4 w-1/2 rounded bg-gray-600'></div>
                  <div className='h-4 w-2/3 rounded bg-gray-600'></div>
                </div>
              </CardContent>
            </Card>
            <div>
              <h3 className='mb-6 text-3xl font-bold text-white'>Built for the Future</h3>
              <p className='mb-6 text-lg text-gray-300'>
                Our advanced technology ensures your assets are always secure while providing lightning-fast
                transactions and seamless user experience across all devices.
              </p>
              <ul className='space-y-4'>
                <li className='flex items-center space-x-3'>
                  <Badge className='bg-green-500 text-white'></Badge>
                  <span className='text-white'>Bank-level security</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Badge className='bg-green-500 text-white'></Badge>
                  <span className='text-white'>Multi-platform support</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <Badge className='bg-green-500 text-white'></Badge>
                  <span className='text-white'>24/7 customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <section id='features' className='px-6 py-16'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-4xl font-bold text-white'>Features</h2>
            <p className='mx-auto max-w-3xl text-xl text-gray-300'>
              Discover the powerful features that make TB Wallet the perfect choice for managing your digital assets.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* One Platform, Millions of Assets */}
      <section className='bg-gray-900 px-6 py-16'>
        <div className='mx-auto max-w-7xl text-center'>
          <h2 className='mb-6 text-4xl font-bold text-white'>One Platform, Millions of Assets</h2>
          <p className='mb-12 text-xl text-gray-300'>
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
      </section>

      {/* Community Testimonials */}
      <section className='px-6 py-16'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-4xl font-bold text-white'>Community talk about us</h2>
            <p className='mx-auto max-w-3xl text-xl text-gray-300'>
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
                  <p className='text-gray-300'>"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id='download' className='bg-gray-900 px-6 py-16'>
        <div className='mx-auto max-w-7xl text-center'>
          <h2 className='mb-6 text-4xl font-bold text-white'>Download now</h2>
          <p className='mb-12 text-xl text-gray-300'>
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
      </section>
      <Separator className='bg-gray-700' />
    </div>
  )
}
