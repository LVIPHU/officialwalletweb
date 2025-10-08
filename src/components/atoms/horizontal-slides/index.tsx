'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { useEffect, useRef, ReactNode } from 'react'
import { on, off } from '@/lib/misc'
import { useWindowSize } from '@/hooks/use-window-size'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/styles'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

interface HorizontalSlidesProps {
  children: ReactNode
}

export default function HorizontalSlides({ children }: HorizontalSlidesProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { width: windowWidth } = useWindowSize()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!targetRef.current || !triggerRef.current) return

    const ctx = gsap.context(() => {
      const cardsContainer = targetRef.current!
      const cards = Array.from(cardsContainer.children) as HTMLElement[]

      // reset styles
      gsap.set(cardsContainer, { clearProps: 'all' })
      gsap.set(cards, { clearProps: 'all' })

      if (isMobile) {
        console.log('kill')
        ScrollTrigger.getAll().forEach((t) => t.kill())
        ScrollSmoother.get()?.kill()
        return
      }

      const totalScroll = cardsContainer.scrollWidth - windowWidth + 50

      const scrollTrack = gsap.to(cardsContainer, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
        },
      })

      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: 'left 95%',
            end: 'center 90%',
            scrub: true,
            containerAnimation: scrollTrack,
          },
        })
      })
    }, targetRef)

    return () => ctx.revert()
  }, [windowWidth, isMobile])

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
