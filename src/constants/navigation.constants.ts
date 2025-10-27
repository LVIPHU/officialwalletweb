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
      { id: 'mobile-app', href: 'https://download.chainviews.net/', title: msg`Mobile app'` },
      { id: 'desktop-app', href: 'https://download.chainviews.net/', title: msg`Desktop app` },
      { id: 'browser-extension', href: '/browser-extension', title: msg`Browser Extension` },
    ],
  },
  {
    id: 'features',
    title: msg`Features`,
    items: [
      { id: 'swap', href: '/swap', title: msg`Swap` },
      { id: 'miner', href: '/miner', title: msg`Miner` },
      { id: 'multi-signature', href: '/multi-signature', title: msg`Multi signature` },
      { id: 'instant-transfer', href: '/instant-transfer', title: msg`Instant transfer` },
      { id: 'usdt-fee', href: '/usdt-fee', title: msg`USDT fee` },
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
