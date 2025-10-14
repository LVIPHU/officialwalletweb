import X from '@public/assets/icons/x.svg'
import Discord from '@public/assets/icons/discord.svg'
import Telegram from '@public/assets/icons/telegram.svg'
import Youtube from '@public/assets/icons/youtube.svg'

export const NAVIGATION_ITEMS = {
  wallet: [
    { id: 'download', href: '/download' },
    { id: 'browser-extension', href: '/browser-extension' },
  ],
  features: [
    { id: 'swap', href: '/swap' },
    { id: 'staking', href: '/staking' },
    { id: 'nft', href: '/nft' },
    { id: 'security', href: '/security' },
    { id: 'buy-crypto', href: '/buy-crypto' },
    { id: 'swift', href: '/swift' },
  ],
  build: [
    { id: 'developer', href: '/developer' },
    { id: 'wallet-core', href: '/developer/wallet-core' },
    { id: 'submit-dapp', href: '/developer/listing-new-dapps' },
    { id: 'get-assets-listed', href: '/developer/listing-new-assets' },
  ],
  support: [
    { id: 'FAQ', href: '/faq' },
    { id: 'contact-us', href: '/contact-us' },
  ],
  about: [
    { id: 'about-us', href: '/about-us' },
    { id: 'careers', href: '/careers' },
    { id: 'press-kit', href: '/press' },
    { id: 'blog', href: '/blog' },
    { id: 'trust-squad', href: '/trust-squad-program' },
    { id: 'terms-of-service', href: '/terms-of-service' },
    { id: 'privacy-policy', href: '/privacy-policy' },
  ],
}
export type NavigationCategory = keyof typeof NAVIGATION_ITEMS
export type NavigationItem = (typeof NAVIGATION_ITEMS)[NavigationCategory][number]

export const SOCIAL_LINKS = [
  {
    id: 'x',
    href: '#',
    icon: X,
  },
  {
    id: 'telegram',
    href: '#',
    icon: Telegram,
  },
  {
    id: 'discord',
    href: '#',
    icon: Discord,
  },
  {
    id: 'youTube',
    href: '#',
    icon: Youtube,
  },
]
