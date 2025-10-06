import { useMemo, useState } from 'react'
import {useIsMobile} from "@/hooks/use-mobile";
import {cn} from "@/lib/styles";
import {Button} from "@/components/ui/button";
import {Columns4} from "lucide-react";
import {Container} from "@/components/atoms/container";

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

    const columnsVariant = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
    }

    return (
        <div className={'fixed top-0 left-0 w-full h-screen pointer-events-none z-50'}>
            <Button
                size={'icon'}
                variant={'ghost'}
                className={'right-5 bottom-5 absolute'}
                style={{ pointerEvents: 'all' }}
                aria-label="Toggle Grid Debugger"
                title="Toggle Grid Debugger"
                onClick={() => {
                    setVisible(!visible)
                }}
            >
                <Columns4/>
            </Button>
            {visible && (
                <Container className={'absolute inset-0 bg-green-500 opacity-30'}>
                    <div className={cn('w-full h-full grid gap-3 bg-white', columnsVariant[columns as keyof typeof columnsVariant])}>
                        {new Array(columns).fill(0).map((_, key) => (
                            <span key={key} className={'col-span-1 bg-blue-500'}></span>
                        ))}
                    </div>
                </Container>

            )}
        </div>
    )
}