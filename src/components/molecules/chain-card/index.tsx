import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/styles'
import { Chain } from '@/types/landing.types'
import { NavigationLink } from '@/components/atoms/navigation-link'

const chainCardVariants = cva('rounded-[52px] flex flex-col gap-5 justify-center items-center', {
  variants: {
    chain: {
      TBC: 'card-chain-green',
      BTC: 'card-chain-orange',
      ETH: 'card-chain-olive',
      SOL: 'card-chain-blue-purple',
    },
    size: {
      default: 'h-[380px] w-full',
    },
  },
  defaultVariants: {
    chain: 'TBC',
    size: 'default',
  },
})

interface ChainCardProps {
  chain: Chain
  className?: string
  iconClassName?: string
  size?: VariantProps<typeof chainCardVariants>['size']
}

export function ChainCard({ size = 'default', chain, className, iconClassName }: ChainCardProps) {
  const Logo = () => {
    if (!chain?.logo) {
      return <span className='hidden'>Missing brand icon for {chain.name}</span>
    }
    return <chain.logo className={cn('size-23', iconClassName)} fill='currentColor' />
  }

  return (
    <NavigationLink href={`${chain?.url}?ref=btchat`}>
      <div data-slot='chain-card' className={cn(chainCardVariants({ chain: chain.id, size }), className)}>
        <Logo />
        <p className='text-center text-5xl font-black'>{chain.name}</p>
      </div>
    </NavigationLink>
  )
}
