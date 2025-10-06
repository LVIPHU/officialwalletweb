'use client'
import cn from 'clsx'
import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import s from './intro.module.css'
import { useIsMobile } from '@/hooks/use-mobile'

export const Intro = () => {
  const isMobile = useIsMobile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [scroll, setScroll] = useState(false)
  const introOut = useStore(({ introOut }) => introOut)
  const setIntroOut = useStore(({ setIntroOut }) => setIntroOut)
  const lenis = useStore(({ lenis }) => lenis)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (isMobile) {
      lenis?.start()
      document.documentElement.classList.toggle('intro', false)
      return
    }

    if (!scroll) {
      document.documentElement.classList.toggle('intro', true)
    }

    if (!lenis) return
    if (scroll) {
      lenis.start()
      document.documentElement.classList.toggle('intro', false)
    } else {
      setTimeout(() => {
        lenis.stop()
      }, 0)

      document.documentElement.classList.toggle('intro', true)
    }
  }, [scroll, lenis, isMobile])

  return (
    <div
      className={cn(s.wrapper, isLoaded && s.out)}
      onTransitionEnd={(e) => {
        e.currentTarget.classList.forEach((value) => {
          if (value.includes('out')) {
            setScroll(true)
          }
          if (value.includes('show')) {
            setIntroOut(true)
          }
        })
      }}
    >
      <div className={cn(isLoaded && s.relative)}>
        <TBC isLoaded={isLoaded} fill={'var(--accent)'} />
        <EI isLoaded={isLoaded} fill={'var(--accent)'} className={cn(introOut && s.translate)} />
      </div>
    </div>
  )
}

export const Title = ({ className }: { className: string }) => {
  const introOut = useStore(({ introOut }) => introOut)

  return (
    <div className={className}>
      <TBC fill={'var(--primary)'} />
      <EI fill={'var(--primary)'} className={cn(introOut && s.translate, s.mobile)} />
    </div>
  )
}

interface ChartSVGProps {
  readonly isLoaded?: boolean
  readonly className?: string
  readonly fill?: string
}

const TBC = ({ isLoaded, className, fill }: ChartSVGProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 1360 336' className={cn(s.lns, className)}>
      <g fill={fill}>
        <path
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 1 } as React.CSSProperties}
          d='M 509.7 10.8 L 501 34.8 Q 491.7 30.3 481.95 27.6 Q 472.2 24.9 459 24.9 Q 439.8 24.9 424.65 34.8 Q 409.5 44.7 400.8 63.3 Q 392.1 81.9 392.1 108.3 Q 392.1 133.5 400.65 152.4 Q 409.2 171.3 424.35 181.8 Q 439.5 192.3 459 192.3 Q 473.7 192.3 484.5 188.7 Q 495.3 185.1 505.5 179.4 L 514.2 203.1 Q 503.1 209.1 488.85 213.15 Q 474.6 217.2 455.7 217.2 Q 428.4 217.2 407.4 204.15 Q 386.4 191.1 374.7 166.95 Q 363 142.8 363 109.5 Q 363 77.4 374.85 52.65 Q 386.7 27.9 408.45 13.95 Q 430.2 0 459.3 0 Q 474.3 0 486.6 2.85 Q 498.9 5.7 509.7 10.8 Z M 93 213.6 L 64.5 213.6 L 64.5 28.8 L 0 28.8 L 0 3.6 L 157.5 3.6 L 157.5 28.8 L 93 28.8 L 93 213.6 Z M 187.5 213 L 187.5 4.2 Q 198 3 213.6 2.1 Q 229.2 1.2 249.3 1.2 Q 287.7 1.2 308.4 15.75 Q 329.1 30.3 329.1 55.2 Q 329.1 71.7 320.25 83.25 Q 311.4 94.8 294.6 102.3 Q 315 109.5 325.5 122.25 Q 336 135 336 153.6 Q 336 182.1 313.5 199.05 Q 291 216 248.1 216 Q 229.8 216 213.45 215.1 Q 197.1 214.2 187.5 213 Z M 250.2 116.4 L 216 116.4 L 216 190.5 Q 231.9 192.3 250.2 192.3 Q 276.9 192.3 291.9 182.7 Q 306.9 173.1 306.9 154.8 Q 306.9 136.8 292.2 126.6 Q 277.5 116.4 250.2 116.4 Z M 216 25.8 L 216 94.2 L 249 94.2 Q 272.7 94.2 286.65 84.3 Q 300.6 74.4 300.6 58.8 Q 300.6 42 286.8 33.15 Q 273 24.3 249 24.3 Q 239.1 24.3 231 24.75 Q 222.9 25.2 216 25.8 Z'
          vectorEffect='non-scaling-stroke'
        />
      </g>
    </svg>
  )
}

const EI = ({ isLoaded, className, fill }: ChartSVGProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 1360 336' className={cn(s.ei, className)}>
      <g fill={fill}>
        <path
          style={{ '--index': 2 } as React.CSSProperties}
          className={cn(s.start, isLoaded && s.show)}
          d='M 92.4 212.1 L 57 212.1 L 0 9 L 28.2 0 L 75.6 181.8 L 120.3 24 L 156 24 L 200.4 181.8 L 247.5 0.9 L 273.9 9 L 217.2 212.1 L 181.8 212.1 L 137.4 54.3 L 92.4 212.1 Z M 924.9 212.1 L 798.9 212.1 L 798.9 2.1 L 924.9 2.1 L 924.9 26.7 L 827.4 26.7 L 827.4 90.6 L 911.4 90.6 L 911.4 114.6 L 827.4 114.6 L 827.4 187.5 L 924.9 187.5 L 924.9 212.1 Z M 462.3 204.6 L 436.2 215.1 L 412.8 155.1 L 315.6 155.1 L 292.2 214.5 L 267.9 204.6 L 350.1 2.1 L 381.3 2.1 L 462.3 204.6 Z M 1034.4 212.1 L 1005.9 212.1 L 1005.9 27.3 L 941.4 27.3 L 941.4 2.1 L 1098.9 2.1 L 1098.9 27.3 L 1034.4 27.3 L 1034.4 212.1 Z M 617.1 212.1 L 492.3 212.1 L 492.3 2.1 L 520.8 2.1 L 520.8 186.6 L 617.1 186.6 L 617.1 212.1 Z M 770.4 212.1 L 645.6 212.1 L 645.6 2.1 L 674.1 2.1 L 674.1 186.6 L 770.4 186.6 L 770.4 212.1 Z M 364.2 30.3 L 324.6 131.1 L 403.5 131.1 L 364.2 30.3 Z'
          vectorEffect='non-scaling-stroke'
        />
      </g>
    </svg>
  )
}
