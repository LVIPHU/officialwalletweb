import { useStore } from '@/lib/store'
import { useEffect } from 'react'
import {ScrollCallback} from "lenis";

export function useScroll(callback: ScrollCallback, deps = []) {
    const lenis = useStore(({ lenis }) => lenis)

    useEffect(() => {
        if (!lenis) return
        lenis.on('scroll', callback)
        // @ts-ignore
        lenis.emit()

        return () => {
            lenis.off('scroll', callback)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lenis, callback, [...deps]])
}