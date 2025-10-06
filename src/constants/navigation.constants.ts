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
    children: [{ id: 'swap', href: '/swap' }],
  },
  { id: 'build', children: [] },
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
      { id: 'terms-of-service', href: '/terms-of-service' },
      { id: 'privacy-policy', href: '/privacy-policy' },
    ],
  },
] as const
