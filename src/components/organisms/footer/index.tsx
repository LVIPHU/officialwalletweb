'use client'
import React from 'react'
import { Logo } from '@/components/atoms/logo'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { Container } from '@/components/atoms/container'
import GlassCard from '@/components/molecules/glass-card'
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/constants/navigation.constants'
import { Trans } from '@lingui/react/macro'
import { NavSection } from '@/types/navigation.types'
import { useLingui } from '@lingui/react'

const Footer = () => {
  return (
    <Container>
      <GlassCard className='mb-4 rounded-[44px] border-0 px-0 py-5 sm:mb-6 md:mb-24 md:px-7 md:py-10'>
        {/* --- Top Grid --- */}
        <div className='grid grid-cols-2 gap-x-3 gap-y-10 pt-0 pb-30 md:grid-cols-7 md:gap-8 md:py-10'>
          {/* Logo section */}
          <div className='col-span-full flex flex-col items-center gap-4 md:col-span-2'>
            <NavigationLink href='#'>
              <Logo classNameIcon='size-16 md:size-24' />
            </NavigationLink>
            <p className='text-5xl font-black text-white'>TB Wallet</p>
          </div>

          <div className='col-span-full md:hidden'>
            <SocialLink />
          </div>

          {/* Navigation sections */}
          {NAVIGATION_ITEMS.map((section) => (
            <FooterColumn key={section.id} section={section} />
          ))}
        </div>

        {/* --- Bottom Bar --- */}
        <div className='absolute inset-x-0 bottom-2 mt-5 flex flex-col items-center justify-center pt-7 md:relative lg:flex-row lg:justify-between'>
          <span className='text-white dark:text-neutral-500'>
            © 2025{' '}
            <NavigationLink href='#' className='hover:text-[#0DCC61]'>
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
    <div className='flex items-start justify-center lg:mx-auto'>
      <div className='flex flex-col gap-4 text-start md:gap-7'>
        {/* i18n title section */}
        <h4 className='text-lg font-medium text-white capitalize'>{i18n._(section.title)}</h4>

        <ul className='space-y-3 text-sm md:space-y-7'>
          {section.items.map((item) => (
            <li key={item.id}>
              <NavigationLink
                href={item.href}
                className='hover:text-primary dark:hover:text-primary text-white transition-colors duration-200 dark:text-neutral-500'
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
      <p className='font-semibold text-white dark:text-neutral-500'>
        <Trans>Stay connected:</Trans>
      </p>
      <div className='flex items-center gap-x-4'>
        {SOCIAL_LINKS.map((social) => (
          <NavigationLink
            key={social.id}
            href={social.href}
            aria-label={social.id}
            className='flex size-13 items-center justify-center rounded-xl bg-gray-700 transition-colors duration-300 hover:bg-[#0DCC61]'
          >
            <social.icon className='size-6 text-white' fill='currentColor' />
          </NavigationLink>
        ))}
      </div>
    </div>
  )
}

export default Footer
