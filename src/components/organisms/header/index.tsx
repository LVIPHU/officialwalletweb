'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/styles'
import { SITE_METADATA } from '@/constants/site-metadata.constants'
import { Logo } from '@/components/atoms/logo'
import { useScroll } from '@/hooks/use-scroll'
import { ThemeSwitcher } from '@/components/molecules/theme-switcher'
import { Container } from '@/components/atoms/container'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { NAVIGATION_ITEMS } from '@/constants/navigation.constants'
import { LocaleSwitcher } from '@/components/molecules/locale-switcher'
import { Trans } from '@lingui/react/macro'
import { NavSection } from '@/types/navigation.types'
import type { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useScroll(({ scroll }) => {
    const newState = scroll > 10
    setHasScrolled((prev) => (prev !== newState ? newState : prev))
  })

  return (
    <Container
      as='header'
      className={cn(
        'transition-all duration-300 ease-in-out',
        'rounded-full px-4 py-2',
        hasScrolled ? 'bg-white/80 shadow-md backdrop-blur-xl dark:bg-white/10' : 'bg-transparent shadow-none',
        SITE_METADATA.stickyNav ? 'sticky top-2 z-50 lg:top-3' : 'mt-2 lg:mt-3'
      )}
    >
      <div className='flex items-center justify-between gap-3'>
        {/* Left: Logo */}
        <Logo showText />

        {/* Middle: Navigation (tablet & up) */}
        <div className='hidden flex-1 justify-center md:flex'>
          <NavigationMenu>
            <NavigationMenuList>
              {NAVIGATION_ITEMS.map((section) => (
                <NavigationSection key={section.id} section={section} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Utilities (tablet & up) */}
        <div className='hidden items-center gap-2 md:flex lg:gap-10'>
          <ThemeSwitcher />
          <LocaleSwitcher />
          <Button variant='explore' size='sm' className='rounded-full text-base! font-normal whitespace-nowrap'>
            <Trans>Download</Trans>
          </Button>
        </div>

        {/* Mobile: Sidebar */}
        <SidebarTrigger className='md:hidden' />
      </div>
    </Container>
  )
}

interface NavigationSectionProps {
  section: NavSection
}

function NavigationSection({ section }: NavigationSectionProps) {
  const { i18n } = useLingui()

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          'h-8 rounded-full border border-transparent bg-transparent px-3 text-sm font-medium',
          'hover:bg-primary hover:border-primary hover:text-black',
          'data-[state=open]:bg-primary! data-[state=open]:border-primary data-[state=open]:text-black'
        )}
      >
        {i18n._(section.title)}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <div className='flex w-[90vw] max-w-6xl flex-col gap-6 p-4 lg:flex-row lg:gap-8 lg:p-6'>
          {/* Left Highlight */}
          <div className='from-muted/40 to-muted hidden w-1/3 flex-col justify-end rounded-md bg-gradient-to-b p-6 select-none lg:flex'>
            <div className='mb-2 text-lg font-medium'>shadcn/ui</div>
            <p className='text-muted-foreground text-sm leading-snug'>
              Beautifully designed components built with Tailwind CSS.
            </p>
          </div>

          {/* Links */}
          <ul className='grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3'>
            {section.items.map((item) => (
              <ListItem key={item.id} href={item.href} title={item.title}>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
            ))}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

interface ListItemProps extends Omit<React.ComponentPropsWithoutRef<'li'>, 'title'> {
  href: string
  title: MessageDescriptor
}

function ListItem({ title, children, href, ...props }: ListItemProps) {
  const { i18n } = useLingui()
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <NavigationLink
          href={href}
          className={cn(
            'block rounded-md p-3 transition-colors',
            isActive
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-foreground/80 hover:text-foreground hover:bg-muted/40'
          )}
        >
          <div className='mb-1 text-sm leading-none font-medium'>{i18n._(title)}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>{children}</p>
        </NavigationLink>
      </NavigationMenuLink>
    </li>
  )
}
