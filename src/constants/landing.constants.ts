import { msg } from '@lingui/core/macro'
import BTC from '@public/assets/chain/BTC.svg'
import ETH from '@public/assets/chain/ETH.svg'
import SOL from '@public/assets/chain/SOL.svg'
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
    description: msg`Maximize your crypto earnings with TB Wallet’s built-in miner support. Seamlessly connect to mining pools or manage your mining activities directly from the wallet. Our platform simplifies the process, letting you monitor rewards and optimize your mining strategy—all while keeping your assets secure and under your control.`,
    icon: Miner,
    color: 'card-chain-green',
  },
  {
    id: 'multi-signature',
    title: msg`Multi signature`,
    description: msg`Protect your wealth with industry-leading security. TB Wallet’s multi-signature feature requires multiple approvals for transactions, adding an extra layer of protection against unauthorized access. Perfect for individuals and teams, this feature ensures your assets remain safe, giving you peace of mind in the fast-paced world of Web3.`,
    icon: Wallet,
    color: 'card-chain-blue-purple',
  },
  {
    id: 'swap',
    title: msg`Swap`,
    description: msg`Trade with ease across 100+ blockchains. TB Wallet’s integrated swap feature lets you exchange assets instantly, from Bitcoin to altcoins, without leaving the platform. Enjoy competitive rates, low fees, and a user-friendly interface that makes swapping tokens as simple as a few clicks, whether you're a beginner or a DeFi pro.`,
    icon: Swap,
    color: 'card-chain-purple',
  },
  {
    id: 'instant-transfer',
    title: msg`Instant transfer`,
    description: msg`Move your assets at the speed of Web3. TB Wallet’s instant transfer feature enables lightning-fast transactions across supported blockchains, with minimal delays and low costs. Whether you're sending tokens to a friend or interacting with a dApp, TB Wallet ensures your transfers are quick, reliable, and hassle-free.`,
    icon: Layers,
    color: 'card-chain-orange',
  },
  {
    id: 'usdt-fee',
    title: msg`USDT Fee`,
    description: msg`Take control of transaction costs with TB Wallet’s USDT fee option. Pay network fees in USDT for predictable, stable costs, even in volatile markets. This feature simplifies budgeting for transactions and enhances your Web3 experience by offering flexibility and transparency in every interaction.`,
    icon: USD,
    color: 'card-chain-olive',
  },
] as const

export const CHAINS: Chain[] = [
  { id: 'TBC', title: msg`TBChain`, logo: TBC },
  { id: 'SOL', title: msg`Solana`, logo: SOL },
  { id: 'BTC', title: msg`Bitcoin`, logo: BTC },
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
  { id: 'extensions', title: msg`Extension`, images: { desktop: '', mobile: '' } },
  { id: 'desktop', title: msg`Desktop app`, images: { desktop: '', mobile: '' } },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TB Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sarah',
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TB Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mike',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TB Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Emily',
  },
  {
    id: '4',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jay',
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TB Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sarah',
  },
  {
    id: '6',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TB Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mike',
  },
  {
    id: '7',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TB Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Emily',
  },
  {
    id: '8',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jay',
  },
  {
    id: '9',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TB Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sarah',
  },
  {
    id: '10',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TB Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mike',
  },
  {
    id: '11',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TB Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Emily',
  },
  {
    id: '12',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jay',
  },
  {
    id: '13',
    name: 'Sarah Johnson',
    role: 'Crypto Investor',
    content:
      "TB Wallet has completely transformed how I manage my crypto portfolio. The interface is intuitive and the security is top-notch.'",
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Sarah',
  },
  {
    id: '14',
    name: 'Mike Chen',
    role: 'DeFi Enthusiast',
    content:
      'The staking features and DeFi integration make TB Wallet my go-to platform. I have earned more rewards than ever before.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mike',
  },
  {
    id: '15',
    name: 'Emily Rodriguez',
    role: 'Beginner Trader',
    content:
      'As someone new to crypto, TB Wallet made it so easy to get started. The tutorials and support team are amazing.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Emily',
  },
  {
    id: '16',
    name: 'Jay Jay',
    role: 'Free trader',
    content: 'As a leading self- custody multi- chain platform, we support millions of assets across 100+ blockchains.',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Jay',
  },
] as const

export const DOWNLOADS: Download[] = [
  {
    id: 'app-store',
    url: '#',
    images: {
      desktop: '/assets/download/app-store.webp',
      mobile: '/assets/download/app-store-mobile.webp',
    },
  },
  {
    id: 'windows',
    url: '#',
    images: {
      desktop: '/assets/download/windows.webp',
      mobile: '/assets/download/windows-mobile.webp',
    },
  },
  {
    id: 'google-play',
    url: '#',
    images: {
      desktop: '/assets/download/google-play.webp',
      mobile: '/assets/download/google-play-mobile.webp',
    },
  },
  {
    id: 'android',
    url: '#',
    images: {
      desktop: '/assets/download/android.webp',
      mobile: '/assets/download/android-mobile.webp',
    },
  },
]
