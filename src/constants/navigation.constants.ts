import { msg } from '@lingui/core/macro'
import X from '@public/assets/icons/x.svg'
import Discord from '@public/assets/icons/discord.svg'
import Telegram from '@public/assets/icons/telegram.svg'
import Youtube from '@public/assets/icons/youtube.svg'
import { Navigation } from '@/types/navigation.types'

export const NAVIGATION_ITEMS: Navigation = [
  {
    id: 'wallet',
    title: msg`Wallet`,
    items: [
      { id: 'download', href: '/download', title: msg`Download` },
      { id: 'browser-extension', href: '/browser-extension', title: msg`Browser Extension` },
    ],
  },
  {
    id: 'features',
    title: msg`Features`,
    items: [
      { id: 'swap', href: '/swap', title: msg`Swap` },
      { id: 'staking', href: '/staking', title: msg`Staking` },
      { id: 'nft', href: '/nft', title: msg`NFT` },
      { id: 'security', href: '/security', title: msg`Security` },
      { id: 'buy-crypto', href: '/buy-crypto', title: msg`Buy Crypto` },
      { id: 'swift', href: '/swift', title: msg`Swift` },
    ],
  },
  {
    id: 'build',
    title: msg`Build`,
    items: [
      { id: 'developer', href: '/developer', title: msg`Developer` },
      { id: 'wallet-core', href: '/developer/wallet-core', title: msg`Wallet Core` },
      { id: 'submit-dapp', href: '/developer/listing-new-dapps', title: msg`Submit Dapp` },
      { id: 'get-assets-listed', href: '/developer/listing-new-assets', title: msg`Get Assets Listed` },
    ],
  },
  {
    id: 'support',
    title: msg`Support`,
    items: [
      { id: 'FAQ', href: '/faq', title: msg`FAQ` },
      { id: 'contact-us', href: '/contact-us', title: msg`Contact Us` },
    ],
  },
  {
    id: 'about',
    title: msg`About`,
    items: [
      { id: 'about-us', href: '/about-us', title: msg`About Us` },
      { id: 'careers', href: '/careers', title: msg`Careers` },
      { id: 'press-kit', href: '/press', title: msg`Press Kit` },
      { id: 'blog', href: '/blog', title: msg`Blog` },
      { id: 'trust-squad', href: '/trust-squad-program', title: msg`Trust Squad` },
      { id: 'terms-of-service', href: '/terms-of-service', title: msg`Terms of Service` },
      { id: 'privacy-policy', href: '/privacy-policy', title: msg`Privacy Policy` },
    ],
  },
]

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
