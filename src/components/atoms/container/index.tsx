import type { ReactNode } from 'react'
import {cn} from "@/lib/styles";

interface ContainerProps {
    readonly className?: string
    readonly as?: React.ElementType
    readonly children: ReactNode
}

export function Container({ children, as: Component = 'section', className}: ContainerProps) {
    return (
        <Component
            className={cn(
                'container mx-auto w-full px-4 sm:px-6 xl:px-12',
                className,
            )}
        >
            {children}
        </Component>
    )
}