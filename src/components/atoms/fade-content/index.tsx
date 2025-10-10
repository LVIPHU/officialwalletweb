'use client'
import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FadeContentProps {
  children: ReactNode
  blur?: boolean
  duration?: number
  easing?: string
  delay?: number
  threshold?: number
  initialOpacity?: number
  className?: string
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1, // gsap dùng giây, không ms
  easing = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // reset trạng thái ban đầu
    gsap.set(el, {
      opacity: initialOpacity,
      filter: blur ? 'blur(10px)' : 'none',
    })

    const tween = gsap.to(el, {
      opacity: 1,
      filter: blur ? 'blur(0px)' : 'none',
      ease: easing,
      duration,
      delay,
      scrollTrigger: {
        trigger: el,
        start: `top bottom-${threshold * 100}%`,
        end: `bottom top-${threshold * 100}%`,
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [blur, duration, easing, delay, threshold, initialOpacity])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default FadeContent
