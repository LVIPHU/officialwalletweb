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
        'rounded-full py-2 saturate-100',
        hasScrolled
          ? 'bg-white/80 shadow-md backdrop-blur-xl dark:bg-white/10'
          : 'bg-transparent shadow-none backdrop-blur-none',
        SITE_METADATA.stickyNav ? 'sticky top-2 z-50 lg:top-3' : 'mt-2 lg:mt-3'
      )}
    >
      <div className='flex items-center justify-between gap-3'>
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className='hidden md:flex'>
          <NavigationMenu>
            <NavigationMenuList>
              {Object.keys(NAVIGATION_ITEMS).map((title) => (
                <NavigationItem key={title} title={title} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right section */}
        <div className='hidden items-center gap-2 md:flex'>
          <ThemeSwitcher />
          <LocaleSwitcher />
          <Button variant={'explore'} className='rounded-full' size='sm'>
            Download
          </Button>
        </div>

        {/* Sidebar for mobile */}
        <SidebarTrigger className='md:hidden' />
      </div>
    </Container>
  )
}

function NavigationItem({ title }: { title: string }) {
  return (
    <NavigationMenuItem key={title}>
      <NavigationMenuTrigger className='data-[state=open]:text-primary bg-transparent'>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='flex gap-8 md:w-2xl lg:w-3xl xl:w-4xl 2xl:w-5xl'>
          <div className='row-span-3'>
            <div className='from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md'>
              <div className='mt-4 mb-2 text-lg font-medium'>shadcn/ui</div>
              <p className='text-muted-foreground text-sm leading-tight'>
                Beautifully designed components built with Tailwind CSS.
              </p>
            </div>
          </div>

          <ul className='default-transition grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-2 xl:grid-cols-3 2xl:gap-x-10'>
            {NAVIGATION_ITEMS[title as keyof typeof NAVIGATION_ITEMS]?.map((item: any) => (
              <ListItem key={item.id} href={item.href} title={item.id}>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
            ))}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
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
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>{children}</p>
        </NavigationLink>
      </NavigationMenuLink>
    </li>
  )
}
