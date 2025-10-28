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
      {
        id: 'mobile-app',
        href: 'https://download.chainviews.net/',
        title: msg`Mobile app`,
        description: msg`The world of Web3 in your pocket`,
      },
      {
        id: 'desktop-app',
        href: 'https://download.chainviews.net/',
        title: msg`Desktop app`,
        description: msg`An optimized Web3 experience for desktop`,
      },
      {
        id: 'browser-extension',
        href: '/browser-extension',
        title: msg`Browser Extension`,
        description: msg`An optimized Web3 experience for desktop`,
      },
    ],
  },
  {
    id: 'features',
    title: msg`Features`,
    items: [
      { id: 'swap', href: '/swap', title: msg`Swap`, description: msg`Coming soon` },
      { id: 'miner', href: '/miner', title: msg`Miner`, description: msg`Coming soon` },
      { id: 'multi-signature', href: '/multi-signature', title: msg`Multi signature`, description: msg`Coming soon` },
      {
        id: 'instant-transfer',
        href: '/instant-transfer',
        title: msg`Instant transfer`,
        description: msg`Coming soon`,
      },
      { id: 'usdt-fee', href: '/usdt-fee', title: msg`USDT fee`, description: msg`Coming soon` },
    ],
  },
  {
    id: 'support',
    title: msg`Support`,
    items: [
      { id: 'FAQ', href: '/faq', title: msg`FAQ`, description: msg`Coming soon` },
      { id: 'contact-us', href: '/contact-us', title: msg`Contact Us`, description: msg`Coming soon` },
    ],
  },
  {
    id: 'about',
    title: msg`About`,
    items: [
      { id: 'about-us', href: '/about-us', title: msg`About Us`, description: msg`Coming soon` },
      { id: 'careers', href: '/careers', title: msg`Careers`, description: msg`Coming soon` },
      { id: 'press-kit', href: '/press', title: msg`Press Kit`, description: msg`Coming soon` },
      { id: 'blog', href: '/blog', title: msg`Blog`, description: msg`Coming soon` },
      {
        id: 'terms-of-service',
        href: '/terms-of-service',
        title: msg`Terms of Service`,
        description: msg`Coming soon`,
      },
      { id: 'privacy-policy', href: '/privacy-policy', title: msg`Privacy Policy`, description: msg`Coming soon` },
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
