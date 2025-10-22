import { cn } from '@/lib/styles'

type GlassCardProps = {
  children?: React.ReactNode
  className?: string
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'border-primary rounded-2xl border bg-white/20 backdrop-blur-sm dark:border-white/40 dark:bg-black/40',
        className
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard
