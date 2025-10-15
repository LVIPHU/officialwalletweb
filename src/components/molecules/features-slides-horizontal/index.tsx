'use client'
import { useEffect, useRef, ReactNode, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useWindowSize } from '@/hooks/use-window-size'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/styles'
import { useControls } from 'leva'
import AnimatedContent from '@/components/atoms/animated-content'

gsap.registerPlugin(ScrollTrigger)

interface HorizontalSlidesProps {
  children: ReactNode
}

const bgStep: Record<number, string> = {
  0: 'green',
  1: 'blue',
  2: 'purple',
  3: 'orange',
  4: 'olive',
}

export default function FeaturesSlidesHorizontal({ children }: HorizontalSlidesProps) {
  const [step, setStep] = useState<number>(0)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { width: windowWidth } = useWindowSize()
  const isMobile = useIsMobile()

  const [
    { horizontalScroll: markersHorizontalScroll, cardFadeIn: markersCardFadeIn, cardFadeOut: markersCardFadeOut },
  ] = useControls('markers', () => ({
    horizontalScroll: false,
    cardFadeIn: false,
    cardFadeOut: false,
  }))

  useEffect(() => {
    if (!targetRef.current || !triggerRef.current) return

    ScrollTrigger.getAll().forEach((t) => t.kill())

    const ctx = gsap.context(() => {
      const container = targetRef.current!
      const cards = Array.from(container.children) as HTMLElement[]

      // reset styles
      gsap.set(cards[0], { opacity: 1 })

      if (isMobile) {
        console.log('mobile')
        gsap.set(container, { clearProps: 'all' })
        gsap.set(cards, { clearProps: 'all' })
        return
      }

      const totalScroll = container.scrollWidth - windowWidth / 2 + 50

      const scrollTrack = gsap.to(container, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          id: 'horizontal-scroll',
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${totalScroll + 100}`,
          scrub: 1,
          pin: true,
          markers: markersHorizontalScroll,
        },
      })

      cards.forEach((card, idx) => {
        gsap.to(card, {
          opacity: 1,
          scrollTrigger: {
            id: `card-fade-in-${idx}`,
            trigger: card,
            start: 'left 49%',
            end: 'center-=30% 44%',
            scrub: true,
            containerAnimation: scrollTrack,
            markers: markersCardFadeIn,
          },
        })

        const title = card.querySelector('[data-title]')
        const icon = card.querySelector('[data-icon]')
        const desc = card.querySelector('[data-desc]')

        if (!title || !icon || !desc) return

        const tl = gsap.timeline({
          scrollTrigger: {
            id: `card-fade-out-${idx}`,
            trigger: card,
            start: 'center+=10% 45%',
            end: 'center+=30% 45%',
            scrub: true,
            containerAnimation: scrollTrack,
            markers: markersCardFadeOut,
            onLeave: () => setStep(idx + 1),
            onEnterBack: () => setStep(idx),
          },
        })

        tl.to(card.querySelector('[data-title]'), { y: 30, opacity: 0, duration: 0.6 }, '<0.1')
          .to(card.querySelector('[data-icon]'), { y: 30, opacity: 0, duration: 0.6 }, '<0.1')
          .to(card.querySelector('[data-subtitle]'), { y: 30, opacity: 0, duration: 0.6 }, '<0.1')
          .to(card.querySelector('[data-desc]'), { y: 30, opacity: 0, duration: 0.6 }, '<0.1')
      })
    }, targetRef)

    return () => ctx.revert()
  }, [windowWidth, isMobile, markersHorizontalScroll, markersCardFadeIn, markersCardFadeOut])

  return (
    <div data-slot='trigger' ref={triggerRef} className='relative md:z-[-1]'>
      <AnimatedContent
        distance={0}
        threshold={0.36}
        className={'absolute inset-y-2 left-1/12 z-[-1] h-screen w-[200px] -translate-x-full'}
      >
        <div data-color={bgStep[step]} className='background-glow' />
      </AnimatedContent>
      <div
        data-slot='target'
        ref={targetRef}
        className={cn(
          'relative flex w-full items-center justify-start gap-8 py-8',
          'md:h-screen md:flex-row md:flex-nowrap md:px-16',
          'h-auto flex-col px-6'
        )}
      >
        {children}
      </div>
    </div>
  )
}
