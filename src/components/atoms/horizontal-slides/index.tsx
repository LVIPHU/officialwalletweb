import gsap from 'gsap'
import { clamp, mapRange } from '@/lib/maths'
import { useEffect, useRef, useState, ReactNode } from 'react'
import {useWindowSize} from "@/hooks/use-window-size";
import {ensureRect, useRect} from "@/hooks/use-rect";
import {useIsMobile} from "@/hooks/use-mobile";
import {useScroll} from "@/hooks/use-scroll";
import s from './horizontal-slides.module.css'
import {cn} from "@/lib/styles";

interface HorizontalSlidesProps {
    children: ReactNode
}

export const HorizontalSlides = ({ children }: HorizontalSlidesProps) => {
    const elementRef = useRef<HTMLDivElement | null>(null)
    const isMobile = useIsMobile()
    const [wrapperRectRef, wrapperRect] = useRect()
    const [elementRectRef, elementRect] = useRect()

    const { height: windowHeight } = useWindowSize()
    const [windowWidth, setWindowWidth] = useState<number>(0)

    useScroll(({ scroll }: { scroll: number }) => {
        if (!elementRect || !elementRef.current || !wrapperRect) return

        const rect = ensureRect(wrapperRect)
        const elRect = ensureRect(elementRect)

        const top = rect.top || 0
        const height = rect.height || 0

        const start = top - windowHeight
        const end = top + height - windowHeight

        let progress = mapRange(start, end, scroll, 0, 1)
        progress = clamp(0, progress, 1)

        const width = elRect.width || 0
        const x = progress * (width - windowWidth)
        const cards = Array.from(elementRef.current.children) as HTMLElement[]

        gsap.to(cards, {
            x: -x,
            stagger: 0.033,
            ease: 'none',
            duration: 0,
        })
    })

    useEffect(() => {
        const onResize = () => {
            setWindowWidth(
                Math.min(window.innerWidth, document.documentElement.offsetWidth)
            )
        }

        window.addEventListener('resize', onResize, false)
        onResize()

        return () => {
            window.removeEventListener('resize', onResize, false)
        }
    }, [])

    return (
        <div
            className={s.wrapper}
            ref={wrapperRectRef}
            style={
                elementRect && "width" in elementRect && elementRect.width && !isMobile
                    ? { height: `${elementRect.width}px` }
                    : undefined
            }
        >
            <div className={s.inner}>
                <div
                    ref={(node) => {
                        elementRef.current = node
                        elementRectRef(node)
                    }}
                    className={cn(s.overflow, 'hidden md:flex')}
                >
                    {children}
                </div>

                <div className={cn(s.cards, 'md:hidden')}>{children}</div>
            </div>
        </div>
    )
}
