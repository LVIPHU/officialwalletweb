import { cn } from '@/lib/utils'

interface LogoProps {
  readonly className?: string
  readonly showText?: boolean
  readonly size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-lg',
    lg: 'w-12 h-12 text-2xl'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <div className={cn(
        'bg-green-500 rounded-lg flex items-center justify-center font-bold text-black',
        sizeClasses[size]
      )}>
        TB
      </div>
      {showText && (
        <span className={cn('font-bold', textSizeClasses[size])}>
          TB Wallet
        </span>
      )}
    </div>
  )
}
