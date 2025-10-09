import React, { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  ease?: string | ((progress: number) => number)
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  mode?: 'scrub' | 'once'
  offsetVH?: number
  onComplete?: () => void
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  mode = 'scrub',
  offsetVH = 0,
  onComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const axis = direction === 'horizontal' ? 'x' : 'y'
    const offset = reverse ? -distance : distance
    const startPct = (1 - threshold) * 100

    // 👇 thêm offset theo viewport height
    const startPosition = `top ${startPct + offsetVH * 100}%`
    const endPosition = `bottom ${startPct + offsetVH * 100}%`

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    })

    const scrollTriggerConfig: ScrollTrigger.Vars = {
      trigger: el,
      start: startPosition,
      end: endPosition,
      id: `animated-${Date.now()}`,
      markers: false,
    }

    if (mode === 'scrub') {
      scrollTriggerConfig.scrub = true
    } else if (mode === 'once') {
      scrollTriggerConfig.toggleActions = 'play none none none'
      scrollTriggerConfig.once = true
    }

    const tween = gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: scrollTriggerConfig,
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    mode,
    offsetVH,
    onComplete,
  ])

  return <div ref={ref}>{children}</div>
}

export default AnimatedContent
