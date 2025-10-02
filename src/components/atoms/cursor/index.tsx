'use client'
import gsap from 'gsap'
import {useCallback, useEffect, useRef, useState} from 'react'
import s from './cursor.module.css'
import {cn} from "@/lib/styles";

const Cursor = () => {
    const cursor = useRef<HTMLDivElement | null>(null)
    const [isGrab, setIsGrab] = useState(false)
    const [isPointer, setIsPointer] = useState(false)
    const [hasMoved, setHasMoved] = useState(false)

    const onMouseMove = useCallback(
        ({ clientX, clientY }: MouseEvent) => {
            gsap.to(cursor.current, {
                x: clientX,
                y: clientY,
                duration: hasMoved ? 0.6 : 0,
                ease: 'expo.out',
            })
            if (!hasMoved) setHasMoved(true)
        },
        [hasMoved]
    )

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove, false)

        return () => {
            window.removeEventListener('mousemove', onMouseMove, false)
        }
    }, [onMouseMove])

    useEffect(() => {
        document.documentElement.classList.add('has-custom-cursor')

        return () => {
            document.documentElement.classList.remove('has-custom-cursor')
        }
    }, [])

    useEffect(() => {
        const elements = [
            ...document.querySelectorAll<HTMLElement>(
                "button,a,input,label,[data-cursor]"
            ),
        ]

        const onMouseEnter = (e: Event) => {
            const target = e.currentTarget as HTMLElement
            if (target.dataset.cursor === "grab") {
                setIsGrab(true)
            }
            if (target.dataset.cursor === "pointer" || target.tagName === "A" || target.tagName === "BUTTON") {
                setIsPointer(true)
            }
        }

        const onMouseLeave = () => {
            setIsGrab(false)
            setIsPointer(false)
        }

        elements.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter, false)
            el.addEventListener("mouseleave", onMouseLeave, false)
        })

        return () => {
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter, false)
                el.removeEventListener("mouseleave", onMouseLeave, false)
            })
        }
    }, [])

    return (
        <div style={{ opacity: hasMoved ? 1 : 0 }} className={s.container}>
            <div ref={cursor}>
                <div
                    className={cn(s.cursor, isGrab && s.grab, isPointer && s.pointer)}
                />
            </div>
        </div>
    )
}

export { Cursor }