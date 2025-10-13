import { cn } from '@/lib/styles'

type GlassCardProps = {
  children?: React.ReactNode
  className?: string
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/30 bg-black/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard
