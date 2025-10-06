'use client'
import {useEffect, useRef, useState} from "react";
import dynamic from "next/dynamic";
import { button, useControls } from 'leva'
import {useRect, ensureRect} from "@/hooks/use-rect";
import {useIntersection} from "@/hooks/use-intersection";
import {useWindowSize} from "@/hooks/use-window-size";
import {useScroll} from "@/hooks/use-scroll";
import {useFrame} from "@/hooks/use-frame";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FeatureCard } from "@/components/molecules/feature-card"
import { FEATURES, TESTIMONIALS, CRYPTOCURRENCIES } from "@/constants/landing.constants"
import LightRays from "@/components/atoms/light-rays";
import {isBrowser} from "@/lib/misc";
import {useStore} from "@/lib/store";
import { clamp, mapRange } from '@/lib/maths'
import Lenis from "lenis";
import {Container} from "@/components/atoms/container";

const WebGL = dynamic(
    () => import('@/components/atoms/webgl').then(({ WebGL }) => WebGL),
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
        const top = rect.top
            ? rect.top - windowHeight / 2
            : 0

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
        <div className="min-h-screen">
            <div className={'canvas'}>
                <WebGL/>
            </div>
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 h-screen flex items-center">
                <div className={'absolute inset-0 translate-x-1/5'}>
                    <LightRays
                        raysOrigin="bottom-center"
                        raysColor="#00ffff"
                        raysSpeed={0}
                        lightSpread={0.1}
                        rayLength={0.6}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.1}
                        distortion={0.05}
                        className="custom-rays"
                    />
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight font-class-display">
                            True crypto ownership.<br/>
                            <span>Powerful Web3</span><br/>
                            experiences
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust
                            Wallet.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                className="bg-transparent border-2 border-purple-400 text-blue-900 hover:bg-purple-50 text-lg px-8 py-4 rounded-lg flex items-center space-x-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                <span>Download Mobile App</span>
                            </Button>
                            <Button
                                className="bg-transparent border-2 border-purple-400 text-blue-900 hover:bg-purple-50 text-lg px-8 py-4 rounded-lg flex items-center space-x-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span>Download Extension</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <Container id="about" data-lenis-scroll-snap-align="start">
                <div ref={aboutRectRef}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-white">About</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            TB Wallet is revolutionizing cryptocurrency management. Our platform combines cutting-edge
                            security with an intuitive user experience.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Card className="w-80 h-96 bg-gray-700 border-gray-600 mx-auto">
                            <CardContent className="p-6">
                                <div className="w-full h-8 bg-green-500 rounded-lg mb-4"></div>
                                <div className="space-y-3">
                                    <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
                                    <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
                                    <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
                                </div>
                            </CardContent>
                        </Card>
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-white">Built for the Future</h3>
                            <p className="text-lg text-gray-300 mb-6">
                                Our advanced technology ensures your assets are always secure while providing
                                lightning-fast transactions and seamless user experience across all devices.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3">
                                    <Badge className="bg-green-500 text-white"></Badge>
                                    <span className="text-white">Bank-level security</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Badge className="bg-green-500 text-white"></Badge>
                                    <span className="text-white">Multi-platform support</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Badge className="bg-green-500 text-white"></Badge>
                                    <span className="text-white">24/7 customer support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Features Section */}
            <section id="features" className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-white">Features</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Discover the powerful features that make TB Wallet the perfect choice for managing your
                            digital assets.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature}/>
                        ))}
                    </div>
                </div>
            </section>

            {/* One Platform, Millions of Assets */}
            <section className="py-16 px-6 bg-gray-900">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">One Platform, Millions of Assets</h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Access thousands of cryptocurrencies and digital assets from a single, secure platform.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {CRYPTOCURRENCIES.map((crypto) => (
                            <Badge key={crypto.symbol} variant="outline"
                                   className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-gray-600 text-white hover:border-green-500 transition-colors">
                                {crypto.symbol}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Testimonials */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-white">Community talk about us</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Join thousands of satisfied users who trust TB Wallet for their cryptocurrency needs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial) => (
                            <Card key={testimonial.id} className="bg-gray-700 border-gray-600">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <Badge
                                            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.initials}
                      </span>
                                        </Badge>
                                        <div>
                                            <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                                            <p className="text-gray-300">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">"{testimonial.content}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="py-16 px-6 bg-gray-900">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">Download now</h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Get started with TB Wallet today and experience the future of cryptocurrency management.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button variant="outline" size="lg"
                                className="bg-gray-800 text-white border-gray-600 hover:border-green-500 hover:text-green-400 text-lg px-8 py-4">
                            <span className="text-2xl mr-3">📱</span>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Download on the</div>
                                <div className="text-lg font-bold">App Store</div>
                            </div>
                        </Button>
                        <Button variant="outline" size="lg"
                                className="bg-gray-800 text-white border-gray-600 hover:border-green-500 hover:text-green-400 text-lg px-8 py-4">
                            <span className="text-2xl mr-3">🤖</span>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Get it on</div>
                                <div className="text-lg font-bold">Google Play</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </section>
            <Separator className="bg-gray-700"/>
        </div>
    )
}