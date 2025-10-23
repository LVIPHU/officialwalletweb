import { cn } from '@/lib/styles'

type GlassCardProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, style }) => {
  return (
    <div
      className={cn(
        'border-primary rounded-2xl border bg-white/20 backdrop-blur-sm dark:border-white/40 dark:bg-black/40',
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

export default GlassCard
