'use client'
import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { useWindowSize } from '@/hooks/use-window-size'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/styles'
import { on, off } from '@/lib/misc'
import { useControls } from 'leva'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

interface HorizontalSlidesProps {
  children: ReactNode
}

export default function HorizontalSlides({ children }: HorizontalSlidesProps) {
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

    const ctx = gsap.context(() => {
      const cardsContainer = targetRef.current!
      const cards = Array.from(cardsContainer.children) as HTMLElement[]

      // reset styles
      gsap.set(cards[0], { opacity: 1 })

      if (isMobile) {
        ScrollTrigger.getAll().forEach((t) => t.kill())
        ScrollSmoother.get()?.kill()
        return
      }

      const totalScroll = cardsContainer.scrollWidth - windowWidth / 2 + 50

      const scrollTrack = gsap.to(cardsContainer, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          id: 'horizontal-scroll',
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          markers: markersHorizontalScroll,
        },
      })

      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          scrollTrigger: {
            id: 'card-fade-in',
            trigger: card,
            start: 'left 95%',
            end: 'center 90%',
            scrub: true,
            containerAnimation: scrollTrack,
            markers: markersCardFadeIn,
          },
        })

        cards.forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              id: 'card-fade-out',
              trigger: card,
              start: 'center 50%',
              end: 'center+=30% 50%',
              scrub: true,
              containerAnimation: scrollTrack,
              markers: markersCardFadeOut,
            },
          })
          tl.to(card.querySelector('[data-title]'), { y: 60, opacity: 0, duration: 0.6 })
            .to(card.querySelector('[data-icon]'), { scale: 0.8, opacity: 0, duration: 0.6 }, '<0.1')
            .to(card.querySelector('[data-desc]'), { y: 30, opacity: 0, duration: 0.6 }, '<0.1')
        })
      })
    }, targetRef)

    return () => ctx.revert()
  }, [windowWidth, isMobile, markersHorizontalScroll, markersCardFadeIn, markersCardFadeOut])

  useEffect(() => {
    if (isMobile) return

    const onLoad = () => {
      if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
          content: '#horizontal-slide-content',
          wrapper: '#horizontal-slide-wrapper',
          smooth: 1.2,
          effects: true,
          smoothTouch: 0.1,
        })
      }
    }

    on(window, 'load', onLoad, false)
    return () => {
      off(window, 'load', onLoad, false)
      ScrollSmoother.get()?.kill()
    }
  }, [isMobile])

  return (
    <div id='horizontal-slide-wrapper'>
      <div id='horizontal-slide-content' className='overflow-hidden'>
        <div ref={triggerRef} className='relative overflow-hidden'>
          <div
            ref={targetRef}
            className={cn(
              'flex w-full items-center justify-start gap-8 py-8',
              'md:h-screen md:flex-row md:flex-nowrap md:px-16',
              'h-auto flex-col px-6'
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
