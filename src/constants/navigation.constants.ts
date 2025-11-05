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
        title: msg`macOS app`,
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
      {
        id: 'terms-of-service',
        href: '/legal/terms-of-service',
        title: msg`Terms of Service`,
        description: msg`Coming soon`,
      },
      {
        id: 'privacy-policy',
        href: '/legal/privacy-policy',
        title: msg`Privacy Policy`,
        description: msg`Coming soon`,
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
