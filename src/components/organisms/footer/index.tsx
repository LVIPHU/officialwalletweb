'use client'
import React, { useMemo } from 'react'
import { Logo } from '@/components/atoms/logo'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { Container } from '@/components/atoms/container'
import GlassCard from '@/components/molecules/glass-card'
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/constants/navigation.constants'
import { Trans } from '@lingui/react/macro'
import { NavSection } from '@/types/navigation.types'
import { useLingui } from '@lingui/react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useTheme } from 'next-themes'

const footerStyleLight: React.CSSProperties = {
  borderImageSlice: '1',
  borderImageSource:
    'linear-gradient(90deg, rgba(255, 255, 255, 0) 1.16%, rgba(0, 0, 0, 0.15) 25.87%, rgba(0, 0, 0, 0.3) 50.58%, rgba(0, 0, 0, 0.15) 75.29%, rgba(255, 255, 255, 0) 100%)',
}

const footerStyleDark: React.CSSProperties = {
  borderImageSlice: '1',
  borderImageSource:
    'linear-gradient(90deg, rgba(255, 255, 255, 0) 1.16%, rgba(255, 255, 255, 0.15) 50.58%, rgba(255, 255, 255, 0) 100%)',
}

const Footer = () => {
  const isMobile = useIsMobile()
  const { resolvedTheme } = useTheme()

  const navigationList = useMemo(() => {
    if (isMobile) {
      const arrNav = [...NAVIGATION_ITEMS]
      return arrNav.sort((a, b) => a.items.length - b.items.length)
    }
    return NAVIGATION_ITEMS
  }, [isMobile])

  return (
    <Container>
      <GlassCard
        data-theme={resolvedTheme}
        className='border-footer border-gradient-footer mb-4 rounded-[44px] px-0 py-5 sm:mb-6 md:mb-24 md:px-7 md:py-10'
      >
        {/* --- Top Grid --- */}
        <div className='grid grid-cols-2 gap-x-3 gap-y-10 pt-0 pb-30 md:grid-cols-7 md:gap-8 md:py-10'>
          {/* Logo section */}
          <div className='col-span-full flex flex-col items-center gap-4 md:col-span-2'>
            <Logo classNameIcon='size-16 md:size-24' />
            <p className='isolate text-5xl font-black text-black mix-blend-normal dark:text-white'>TB Wallet</p>
          </div>

          <div className='col-span-full md:hidden'>
            <SocialLink />
          </div>

          {/* Navigation sections */}
          {navigationList.map((section) => (
            <FooterColumn key={section.id} section={section} />
          ))}
        </div>

        {/* --- Bottom Bar --- */}
        <div className='absolute inset-x-0 bottom-2 mt-5 flex flex-col items-center justify-center pt-7 md:relative lg:flex-row lg:justify-between'>
          <span className='text-neutral-500'>
            © 2025{' '}
            <NavigationLink href='#' className='hover:text-primary'>
              TB Wallet
            </NavigationLink>{' '}
            <Trans>. All rights reserved.</Trans>
          </span>

          <div className='hidden lg:block'>
            <SocialLink />
          </div>
        </div>
      </GlassCard>
    </Container>
  )
}

interface FooterColumnProps {
  section: NavSection // type an toàn: phần tử của NAVIGATION_ITEMS
}

function FooterColumn({ section }: FooterColumnProps) {
  const { i18n } = useLingui()
  return (
    <div className='flex lg:mx-auto'>
      <div className='flex flex-col gap-4 text-start md:gap-7'>
        {/* i18n title section */}
        <h4 className='text-lg font-medium capitalize'>{i18n._(section.title)}</h4>

        <ul className='space-y-3 text-sm md:space-y-7'>
          {section.items.map((item) => (
            <li key={item.id}>
              <NavigationLink
                href={item.href}
                className='hover:text-primary dark:hover:text-primary text-neutral-500 transition-colors duration-200'
              >
                {i18n._(item.title)}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SocialLink() {
  return (
    <div className='mt-4 flex flex-col items-center gap-4 md:flex-row lg:mt-0'>
      <p className='font-semibold text-neutral-500'>
        <Trans>Stay connected:</Trans>
      </p>
      <div className='flex items-center gap-x-4'>
        {SOCIAL_LINKS.map((social) => (
          <NavigationLink
            key={social.id}
            href={social.href}
            aria-label={social.id}
            className='hover:bg-primary flex size-13 items-center justify-center rounded-xl bg-gray-700 transition-colors duration-300'
          >
            <social.icon className='size-6 text-white' fill='currentColor' />
          </NavigationLink>
        ))}
      </div>
    </div>
  )
}

export default Footer
