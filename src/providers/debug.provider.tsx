'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PropsWithChildren, useEffect } from 'react'
import Tempus from '@/lib/tempus'
import dynamic from 'next/dynamic'
import { useDebug } from '@/hooks/use-debug'
import { useStore } from '@/lib/store'
import { useScroll } from '@/hooks/use-scroll'
import { RealViewport } from '@/components/atoms/real-viewport'
import { isBrowser } from '@/lib/misc'
import { Leva } from 'leva'

if (isBrowser && Tempus) {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

  // merge rafs
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)
  Tempus.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

const Stats = dynamic(() => import('@/components/atoms/stats').then(({ Stats }) => Stats), { ssr: false })

const GridDebugger = dynamic(
  () => import('@/components/atoms/grid-debugger').then(({ GridDebugger }) => GridDebugger),
  { ssr: false }
)

export default function DebugProvider({ children }: Readonly<PropsWithChildren>) {
  const debug = useDebug()
  const lenis = useStore(({ lenis }) => lenis)

  useScroll(ScrollTrigger.update)

  useEffect(() => {
    if (lenis) {
      ScrollTrigger.refresh()
      lenis?.start()
    }
  }, [lenis])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

  return (
    <>
      <Leva hidden={true} />
      {debug && (
        <>
          <GridDebugger />
          <Stats />
        </>
      )}

      <RealViewport />
      {children}
    </>
  )
}
