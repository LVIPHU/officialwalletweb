/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

import { msg } from '@lingui/core/macro'
import BTC from '@public/assets/chain/BTC.svg'
import ETH from '@public/assets/chain/ETH.svg'
import TRX from '@public/assets/chain/TRX.svg'
import TBC from '@public/assets/chain/TBC.svg'
import Wallet from '@public/assets/icons/wallet.svg'
import Swap from '@public/assets/icons/swap.svg'
import Miner from '@public/assets/icons/miner.svg'
import Layers from '@public/assets/icons/layers.svg'
import USD from '@public/assets/icons/usd.svg'
import { Chain, Download, Feature, Platform, Testimonial } from '@/types/landing.types'

export const FEATURES: Feature[] = [
  {
    id: 'miner',
    title: msg`Miner`,
    description: msg`Boost earnings by connecting to mining pools and tracking rewards in-app. TBC Wallet simplifies mining management, helping both new and seasoned users maximize returns securely.`,
    icon: Miner,
    color: 'card-chain-green',
  },
  {
    id: 'multi-signature',
    title: msg`Multi signature`,
    description: msg`Fortify your wallet with multi-approval transactions for enhanced protection against threats—ideal for personal or shared use, ensuring your assets stay safe and accessible only to you.`,
    icon: Wallet,
    color: 'card-chain-blue-purple',
  },
  {
    id: 'swap',
    title: msg`Swap`,
    description: msg`Effortlessly exchange tokens across chains with low fees and real-time rates. Whether trading Bitcoin for Solana or optimizing your portfolio, TBC Wallet makes swaps quick and intuitive.`,
    icon: Swap,
    color: 'card-chain-purple',
  },
  {
    id: 'instant-transfer',
    title: msg`Instant transfer`,
    description: msg`Send assets across chains with near-zero delays and minimal costs. TBC Wallet ensures fast, reliable transactions for everyday use, from peer-to-peer sends to dApp funding.`,
    icon: Layers,
    color: 'card-chain-orange',
  },
  {
    id: 'usdt-fee',
    title: msg`USDT Fee`,
    description: msg`Pay fees in USDT for stable, predictable costs amid market swings. This flexible feature adds transparency, making Web3 interactions more budget-friendly and user-centric.`,
    icon: USD,
    color: 'card-chain-olive',
  },
] as const

export const CHAINS: Chain[] = [
  { id: 'TBC', title: msg`TBChain`, logo: TBC },
  { id: 'BTC', title: msg`Bitcoin`, logo: BTC },
  { id: 'TRX', title: msg`Tron`, logo: TRX },
  { id: 'ETH', title: msg`Ethereum`, logo: ETH },
] as const

export const BACKGROUND_ENUM: Record<number, string> = {
  0: 'green',
  1: 'blue',
  2: 'purple',
  3: 'orange',
  4: 'olive',
}

export const PLATFORMS: Platform[] = [
  {
    id: 'mobile',
    title: msg`Mobile app`,
    images: {
      desktop: '/assets/background/mobile-app.webp',
      mobile: '/assets/background/mobile-app-mobile.webp',
    },
  },
  { id: 'extension', title: msg`Extension`, images: { desktop: '/assets/background/extension-app.webp', mobile: '' } },
  { id: 'desktop', title: msg`Desktop app`, images: { desktop: '/assets/background/desktop-app.webp', mobile: '' } },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TBC Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://i.pravatar.cc/201',
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TBC Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://i.pravatar.cc/202',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TBC Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://i.pravatar.cc/203',
  },
  {
    id: '4',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://i.pravatar.cc/204',
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TBC Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://i.pravatar.cc/205',
  },
  {
    id: '6',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TBC Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://i.pravatar.cc/206',
  },
  {
    id: '7',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TBC Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://i.pravatar.cc/207',
  },
  {
    id: '8',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://i.pravatar.cc/208',
  },
  {
    id: '9',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TBC Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://i.pravatar.cc/209',
  },
  {
    id: '10',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TBC Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://i.pravatar.cc/210',
  },
  {
    id: '11',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TBC Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://i.pravatar.cc/211',
  },
  {
    id: '12',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://i.pravatar.cc/212',
  },
  {
    id: '13',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TBC Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://i.pravatar.cc/213',
  },
  {
    id: '14',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TBC Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://i.pravatar.cc/214',
  },
  {
    id: '15',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TBC Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://i.pravatar.cc/215',
  },
  {
    id: '16',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://i.pravatar.cc/216',
  },
] as const

export const DOWNLOADS: Download[] = [
  {
    id: 'app-store',
    url: 'https://apps.apple.com/app/6739870518',
    images: {
      desktop: '/assets/download/app-store.webp',
      mobile: '/assets/download/app-store-mobile.webp',
    },
  },
  {
    id: 'windows',
    url: 'https://download.chainviews.net/tbchat01.exe',
    images: {
      desktop: '/assets/download/windows.webp',
      mobile: '/assets/download/windows-mobile.webp',
    },
  },
  {
    id: 'google-play',
    url: 'https://download.chainviews.net/tbchat.apk',
    images: {
      desktop: '/assets/download/google-play.webp',
      mobile: '/assets/download/google-play-mobile.webp',
    },
  },
  {
    id: 'android',
    url: 'https://download.chainviews.net/tbchat.apk',
    images: {
      desktop: '/assets/download/android.webp',
      mobile: '/assets/download/android-mobile.webp',
    },
  },
]
