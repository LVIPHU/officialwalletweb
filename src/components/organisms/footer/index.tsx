'use client'
import React from 'react'
import { Logo } from '@/components/atoms/logo'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { Container } from '@/components/atoms/container'
import GlassCard from '@/components/molecules/glass-card'
import { NAVIGATION_ITEMS, NavigationItem, SOCIAL_LINKS } from '@/constants/navigation.constants'

const Footer = () => {
  return (
    <Container>
      <GlassCard className='mb-24 px-7 py-10'>
        {/* --- Top Grid --- */}
        <div className='grid gap-y-10 py-10 sm:grid-cols-4 md:gap-8 lg:grid-cols-7'>
          {/* Logo section */}
          <div className='col-span-full flex flex-col items-center gap-4 lg:col-span-2'>
            <NavigationLink href='#'>
              <Logo size='3xl' />
            </NavigationLink>
            <p className='text-5xl font-black text-white'>TBChat</p>
          </div>

          {/* Navigation sections */}
          {Object.entries(NAVIGATION_ITEMS).map(([title, links]) => (
            <FooterColumn key={title} title={title} links={links} />
          ))}
        </div>

        {/* --- Bottom Bar --- */}
        <div className='mt-5 flex flex-col items-center justify-center border-t border-white/10 pt-7 lg:flex-row lg:justify-between'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            © 2025{' '}
            <NavigationLink href='#' className='font-medium hover:text-[#0DCC61]'>
              TB Wallet
            </NavigationLink>
            . All rights reserved.
          </span>

          <div className='mt-4 flex items-center space-x-4 lg:mt-0'>
            <p className='font-semibold text-gray-500'>Stay connect:</p>
            {SOCIAL_LINKS.map((social) => (
              <NavigationLink
                key={social.id}
                href={social.href}
                aria-label={social.id}
                className='flex h-9 w-9 items-center justify-center rounded-xl bg-gray-700 transition-colors duration-300 hover:bg-[#0DCC61]'
              >
                <social.icon className='size-5 text-white' fill='currentColor' />
              </NavigationLink>
            ))}
          </div>
        </div>
      </GlassCard>
    </Container>
  )
}

/* --- Subcomponent: FooterColumn --- */
function FooterColumn({ title, links }: { title: string; links: NavigationItem[] }) {
  return (
    <div className='text-left lg:mx-auto'>
      <h4 className='mb-6 text-lg font-medium text-white/90 capitalize'>{title}</h4>
      <ul className='space-y-3 text-sm'>
        {links.map((link) => (
          <li key={link.id}>
            <NavigationLink href={link.href} className='text-gray-400 transition-colors duration-200 hover:text-white'>
              {link.id}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
