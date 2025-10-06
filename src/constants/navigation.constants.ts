export const NAVIGATION_ITEMS = [
  {
    id: 'wallet',
    children: [
      { id: 'download', href: '/download' },
      { id: 'browser-extension', href: '/browser-extension' },
    ],
  },
  {
    id: 'features',
    children: [
      { id: 'swap', href: '/swap' },
      { id: 'staking', href: '/staking' },
      { id: 'nft', href: '/nft' },
      { id: 'security', href: '/security' },
      { id: 'buy-crypto', href: '/buy-crypto' },
      { id: 'swift', href: '/swift' },
    ],
  },
  {
    id: 'build',
    children: [
      { id: 'developer', href: '/developer' },
      { id: 'wallet-core', href: '/developer/wallet-core' },
      { id: 'submit-dapp', href: '/developer/listing-new-dapps' },
      { id: 'get-assets-listed', href: '/developer/listing-new-assets' },
    ],
  },
  {
    id: 'support',
    children: [
      { id: 'FAQ', href: '/faq' },
      { id: 'contact-us', href: '/contact-us' },
    ],
  },
  {
    id: 'about',
    children: [
      { id: 'about-us', href: '/about-us' },
      { id: 'careers', href: '/careers' },
      { id: 'press-kit', href: '/press' },
      { id: 'blog', href: '/blog' },
      { id: 'trust-squad', href: '/trust-squad-program' },
      { id: 'terms-of-service', href: '/terms-of-service' },
      { id: 'privacy-policy', href: '/privacy-policy' },
    ],
  },
] as const
