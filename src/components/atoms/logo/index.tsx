import { cn } from '@/lib/styles'
import LogoSVG from '@public/assets/logo.svg'

interface LogoProps {
  readonly className?: string
  readonly showText?: boolean
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
    '3xl': 'w-24 h-24',
  }

  const textSizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <LogoSVG className={cn(sizeClasses[size])} />
      {!showText && <span className={cn('font-semibold text-gray-900', textSizeClasses[size])}>Company</span>}
    </div>
  )
}
