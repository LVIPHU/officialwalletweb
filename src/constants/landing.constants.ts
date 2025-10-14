import { Chain, Download, Feature, Testimonial } from '@/types/landing.types'
import BTC from '@public/assets/chain/BTC.svg'
import ETH from '@public/assets/chain/ETH.svg'
import SOL from '@public/assets/chain/SOL.svg'
import TBC from '@public/assets/chain/TBC.svg'

import Wallet from '@public/assets/icons/wallet.svg'
import Message from '@public/assets/icons/message.svg'
import Contact from '@public/assets/icons/contact.svg'
import Layers from '@public/assets/icons/layers.svg'
import User from '@public/assets/icons/user.svg'

export const FEATURES: Feature[] = [
  {
    id: 'multi-signature',
    title: 'multi-signature',
    subtitle: 'multi-signature',
    description: 'Your assets are protected with military-grade encryption and multi-layer security protocols.',
    icon: Wallet,
  },
  {
    id: 'swap',
    title: 'swap',
    subtitle: 'swap',
    description: 'Lightning-fast transaction processing with minimal fees and instant confirmations.',
    icon: Message,
  },
  {
    id: 'miner',
    title: 'miner',
    subtitle: 'miner',
    description: 'Support for hundreds of cryptocurrencies and tokens in one unified platform.',
    icon: Contact,
  },
  {
    id: 'instant-transfer',
    title: 'instant-transfer',
    subtitle: 'instant-transfer',
    description: 'Access your wallet anywhere with our intuitive mobile application.',
    icon: Layers,
  },
  {
    id: 'nfts-wallet',
    title: 'nfts-wallet',
    subtitle: 'nfts-wallet',
    description: 'Earn passive income through our integrated staking and DeFi features.',
    icon: User,
  },
] as const

export const CHAINS: Chain[] = [
  { id: 'TBC', name: 'TBChat', logo: TBC },
  { id: 'SOL', name: 'Solana', logo: SOL },
  { id: 'BTC', name: 'Bitcoin', logo: BTC },
  { id: 'ETH', name: 'Ethereum', logo: ETH },
] as const

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
    image: '/assets/download/app-store.webp',
  },
  {
    id: 'windows',
    url: '#',
    image: '/assets/download/windows.webp',
  },
  {
    id: 'google-play',
    url: '#',
    image: '/assets/download/google-play.webp',
  },
  {
    id: 'android',
    url: '#',
    image: '/assets/download/android.webp',
  },
]
