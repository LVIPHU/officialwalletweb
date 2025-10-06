import { cn } from '@/lib/styles'
import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'

type ContainerProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Container<T extends ElementType = 'section'>({ as, className, children, ...props }: ContainerProps<T>) {
  const Component = as || 'section'
  return (
    /* @ts-ignore */
    <Component className={cn('container mx-auto w-full px-4 sm:px-6 xl:px-12', className)} {...props}>
      {children}
    </Component>
  )
}
