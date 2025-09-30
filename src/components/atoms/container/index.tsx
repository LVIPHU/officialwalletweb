import clsx from 'clsx'
import type { ReactNode } from 'react'

interface ContainerProps {
    readonly className?: string
    readonly as?: React.ElementType
    readonly children: ReactNode
}

export function Container({ children, as: Component = 'section', className}: ContainerProps) {
    return (
        <Component
            className={clsx(
                'mx-auto w-full max-w-6xl px-4 sm:px-6 xl:px-12',
                className,
            )}
        >
            {children}
        </Component>
    )
}