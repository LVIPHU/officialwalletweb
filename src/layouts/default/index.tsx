/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

'use client'
import { Intro } from '@/components/atoms/intro'
import { PropsWithChildren, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useFrame } from '@/hooks/use-frame'
import { isBrowser, decodeHashSelector } from '@/lib/misc'
import Lenis from 'lenis'
import MobileSidebar from '@/components/organisms/mobile-sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { useTheme } from 'next-themes'
import { useIsTablet } from '@/hooks/use-tablet'
import { useScroll } from '@/hooks/use-scroll'

export default function DefaultLayout({ children }: Readonly<PropsWithChildren>) {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const isTablet = useIsTablet()

  // Access Lenis instance from Zustand store
  const lenis = useStore((state) => state.lenis)
  const setLenis = useStore((state) => state.setLenis)

  /**
   * Initialize Lenis smooth scrolling when the component mounts.
   * - Disable smooth scrolling on tablet for better touch experience.
   * - Store Lenis instance globally in Zustand.
   * - Clean up when component unmounts.
   */
  useEffect(() => {
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      smoothWheel: !isTablet,
      syncTouch: !isTablet,
    })

    // Attach Lenis instance to global window for debugging if needed
    window.lenis = lenis
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [isTablet])

  const [hash, setHash] = useState<string>('')

  /**
   * Handle scrolling to an element when hash changes (e.g., from clicking anchor links).
   * Uses Lenis to smoothly scroll to the target section.
   * Decodes URL-encoded hash to handle Unicode characters in headings.
   */
  useEffect(() => {
    if (lenis && hash) {
      // Decode hash for safe querySelector usage (handles Unicode characters)
      const decodedHash = decodeHashSelector(hash)
      // Try querySelector first, fallback to getElementById if needed
      const target =
        document.querySelector(decodedHash) ||
        document.getElementById(hash.replace('#', '')) ||
        document.getElementById(decodeURIComponent(hash.replace('#', '')))
      if (target instanceof HTMLElement) {
        lenis.scrollTo(target, { offset: 0 })
      }
    }
  }, [lenis, hash])

  /**
   * Handle browser refresh or route change:
   * If there's a hash in the URL, trigger scroll to that section after navigation.
   * Preserves encoded hash as-is (will be decoded in scroll handler).
   * Otherwise, scroll to top when pathname changes.
   */
  useEffect(() => {
    if (isBrowser && window.location.hash) {
      // Preserve the hash as-is (may be encoded), will be decoded when scrolling
      const hash = window.location.hash
      setHash(hash)
    } else {
      // Auto scroll to top when pathname changes (only if no hash)
      if (lenis) {
        lenis.scrollTo(0, { immediate: false })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [pathname, lenis])

  /**
   * Intercept internal anchor link clicks within the same page.
   * Prevents default jump behavior and replaces it with Lenis smooth scroll.
   */
  useEffect(() => {
    // catch anchor links clicks
    function onClick(e: Event) {
      e.preventDefault()
      const node = e.currentTarget as HTMLAnchorElement
      const hash = node.href.split('#').pop() || ''
      setHash(`#${hash}`)
      setTimeout(() => {
        window.location.hash = hash
      }, 0)
    }

    // Only handle anchor links pointing to the same pathname
    const internalLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]')).filter(
      (node) => new URL(node.href).pathname === pathname && node.hash
    )

    internalLinks.forEach((node) => {
      node.addEventListener('click', onClick, false)
    })

    return () => {
      internalLinks.forEach((node) => {
        node.removeEventListener('click', onClick, false)
      })
    }
  }, [pathname])

  /**
   * Frame-based update for Lenis animation.
   * This ensures Lenis updates smoothly every animation frame.
   */
  useFrame((time) => {
    lenis?.raf(time)
  }, 0)

  /**
   * Alternative scroll listener using custom `useScroll` hook.
   * This duplicates the logic above to keep track of which section is active,
   * ensuring consistent hash updates across scrolling states.
   */
  useScroll(() => {
    const sections = document.querySelectorAll('section[id]')
    const scrollMiddle = window.innerHeight * 0.4
    let currentId = ''

    for (const section of sections) {
      const rect = section.getBoundingClientRect()
      const top = rect.top
      const bottom = rect.bottom

      if (top <= scrollMiddle && bottom >= scrollMiddle) {
        currentId = section.id
        break
      }
    }

    if (currentId) {
      const newHash = `#${currentId}`
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash)
      }
    }
  }, [])

  return (
    <div className='mb-auto flex grow flex-col'>
      {/*<Cursor/>*/}
      <Intro />
      <MobileSidebar />
      <SidebarInset>
        <div className={'background-hero'} />
        {children}
        <div data-theme={resolvedTheme || 'dark'} className={'background-footer'} />
      </SidebarInset>
    </div>
  )
}
