import { useMemo, useState } from 'react'
import {useIsMobile} from "@/hooks/use-mobile";
import {cn} from "@/lib/styles";

export const GridDebugger = () => {
    const [visible, setVisible] = useState(false)
    const isMobile = useIsMobile()

    const columns = useMemo(() => {
        return parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                '--layout-columns-count'
            ) || "12"
        )
    }, [isMobile])

    return (
        <div className={'fixed top-0 left-0 w-full h-screen pointer-events-none z-50'}>
            <button
                className={'right-0 absolute'}
                style={{ pointerEvents: 'all' }}
                aria-label="Toggle Grid Debugger"
                title="Toggle Grid Debugger"
                onClick={() => {
                    setVisible(!visible)
                }}
            >
                🌐
            </button>
            {visible && (
                <div className={cn('absolute inset-0 grid gap-3', `grid-cols-${columns > 12 ? 12 : columns}`)}>
                    {new Array(columns).fill(0).map((_, key) => (
                        <span key={key} className={'col-span-1 bg-primary opacity-30'}></span>
                    ))}
                </div>
            )}
        </div>
    )
}