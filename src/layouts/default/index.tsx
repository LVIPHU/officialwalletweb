'use client'
import {Intro} from "@/components/atoms/intro";
import {PropsWithChildren, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {usePathname} from 'next/navigation'
import { useStore } from "@/lib/store";
import Lenis from "lenis";
import useRafLoop from "@/hooks/use-raf-loop/useRafLoop";

const Cursor = dynamic(
    () => import('@/components/atoms/cursor').then((mod) => mod.Cursor),
    { ssr: false }
)

const PageTransition = dynamic(
    () => import('@/components/atoms/page-transition').then((mod) => mod.PageTransition),
    { ssr: false }
)

export default function DefaultLayout({ children }: Readonly<PropsWithChildren>) {
    const pathname = usePathname()
    const lenis = useStore((state) => state.lenis)
    const setLenis = useStore((state) => state.setLenis)

    useEffect(() => {
        window.scrollTo(0, 0)
        const lenis = new Lenis({
            // gestureOrientation: 'both',
            smoothWheel: true,
            // smoothTouch: true,
            syncTouch: true,
        })
        window.lenis = lenis
        setLenis(lenis)

        // new ScrollSnap(lenis, { type: 'proximity' })

        return () => {
            lenis.destroy()
            setLenis(null)
        }
    }, [])

    const [hash, setHash] = useState<string>('')

    useEffect(() => {
        if (lenis && hash) {
            // scroll to on hash change
            const target = document.querySelector(hash)
            if (target instanceof HTMLElement) {
                lenis.scrollTo(target, { offset: 0 })
            }
        }
    }, [lenis, hash])

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const hash = window.location.hash.replace('#', '')
            setHash(`#${hash}`)
        }
    }, [pathname])

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

        const internalLinks = Array.from(
            document.querySelectorAll<HTMLAnchorElement>('a[href]')
        ).filter((node) => new URL(node.href).pathname === pathname && node.hash)

        internalLinks.forEach((node) => {
            node.addEventListener('click', onClick, false)
        })

        return () => {
            internalLinks.forEach((node) => {
                node.removeEventListener('click', onClick, false)
            })
        }
    }, [pathname])

    useRafLoop((time) => {
        lenis?.raf(time)
    }, true)

    return (
        <div className='flex flex-col mb-auto grow'>
            <Cursor/>
            <Intro/>
            <PageTransition/>
            { children }
        </div>
    )
}