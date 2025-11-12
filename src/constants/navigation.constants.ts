/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import { msg } from '@lingui/core/macro'
import X from '@public/assets/icons/x.svg'
import Discord from '@public/assets/icons/discord.svg'
import Telegram from '@public/assets/icons/telegram.svg'
import { Navigation } from '@/types/navigation.types'

export const NAVIGATION_ITEMS: Navigation = [
  {
    id: 'wallet',
    title: msg`Wallet`,
    items: [
      {
        id: 'ios-app',
        href: 'https://apps.apple.com/app/6739870518',
        title: msg`iOS app`,
        description: msg`The world of Web3 in your pocket`,
      },
      {
        id: 'android-app',
        href: 'https://download.chainviews.net/tbchat.apk',
        title: msg`Android app`,
        description: msg`The world of Web3 in your pocket`,
      },
      {
        id: 'windows-app',
        href: 'https://download.chainviews.net/tbchat01.exe',
        title: msg`Windows app`,
        description: msg`An optimized Web3 experience for desktop`,
      },
      {
        id: 'macos-app',
        href: 'https://download.chainviews.net/tbchat.dmg',
        title: msg`MacOS app`,
        description: msg`An optimized Web3 experience for desktop`,
      },
      {
        id: 'browser-extension',
        href: 'https://download.chainviews.net/dist.zip',
        title: msg`Browser Extension`,
        description: msg`An optimized Web3 experience for desktop`,
      },
    ],
  },
  {
    id: 'features',
    title: msg`Features`,
    items: [
      {
        id: 'swap',
        href: 'https://dex-test.nexsoft.duckdns.org/',
        title: msg`Swap`,
        description: msg`Swap securely and seamlessly`,
      },
      {
        id: 'miner',
        href: '/features/miner',
        title: msg`Miner`,
        description: msg`Boost earnings by connecting to mining pools and tracking rewards in-app`,
      },
      {
        id: 'multi-signature',
        href: '/features/multi-signature',
        title: msg`Multi signature`,
        description: msg`Fortify your wallet with multi-approval transactions for enhanced protection`,
      },
      {
        id: 'instant-transfer',
        href: '/features/instant-transfer',
        title: msg`Instant transfer`,
        description: msg`Send assets across chains with near-zero delays and minimal costs`,
      },
      {
        id: 'usdt-fee',
        href: '/features/usdt-fee',
        title: msg`USDT fee`,
        description: msg`Pay fees in USDT for stable, predictable costs amid market swings`,
      },
    ],
  },
  {
    id: 'support',
    title: msg`Support`,
    items: [
      {
        id: 'FAQ',
        href: '/support/faq',
        title: msg`FAQ`,
        description: msg`Find answers to frequently asked questions about TBC Wallet`,
      },
      {
        id: 'contact-us',
        href: '/support/contact-us',
        title: msg`Contact Us`,
        description: msg`Get in touch with our support team for assistance`,
      },
    ],
  },
  {
    id: 'about',
    title: msg`About`,
    items: [
      {
        id: 'terms-of-service',
        href: '/about/terms-of-service',
        title: msg`Terms of Service`,
        description: msg`What you need to know to use our services`,
      },
      {
        id: 'privacy-policy',
        href: '/about/privacy-policy',
        title: msg`Privacy Policy`,
        description: msg`Your privacy matters, learn how we protect it`,
      },
    ],
  },
]

export const SOCIAL_LINKS = [
  {
    id: 'x',
    href: 'https://x.com/tbchatofficial',
    icon: X,
  },
  {
    id: 'telegram',
    href: 'https://t.me/TBChatGlobal',
    icon: Telegram,
  },
  {
    id: 'discord',
    href: 'https://discord.com/invite/6UHYk6k372',
    icon: Discord,
  },
]
