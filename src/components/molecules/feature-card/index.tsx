import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/styles'
import type { Feature } from '@/types/landing.types'

interface FeatureCardProps {
  readonly feature: Feature
  readonly className?: string
}

export function FeatureCard({ feature, className }: FeatureCardProps) {
  return (
    <Card className={cn('hover:border-primary transition-colors', className)}>
      <CardHeader>
        <div className='mb-2 text-4xl'>{feature.icon}</div>
        <CardTitle className='text-xl'>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='text-muted-foreground'>{feature.description}</CardDescription>
      </CardContent>
    </Card>
  )
}
