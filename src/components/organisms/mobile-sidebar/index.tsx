'use client'
import { useState, useCallback, memo } from 'react'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ThemeSwitcher } from '@/components/molecules/theme-switcher'
import { LocaleSwitcher } from '@/components/molecules/locale-switcher'
import { NavigationLink } from '@/components/atoms/navigation-link'
import { Logo } from '@/components/atoms/logo'
import { cn } from '@/lib/styles'
import { NAVIGATION_ITEMS } from '@/constants/navigation.constants'
import { NavItem } from '@/types/navigation.types'
import type { MessageDescriptor } from '@lingui/core'

export default function MobileSidebar() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = useCallback((id: string, isOpen: boolean) => {
    setOpenId(isOpen ? id : null)
  }, [])

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className='mb-11'>
        <div className='mt-2 flex items-center justify-between'>
          <Logo showText />
          <SidebarTrigger className='text-primary size-9 [&_svg]:size-7!' />
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent data-lenis-prevent>
        {NAVIGATION_ITEMS.map((section) => (
          <NavSection
            key={section.id}
            id={section.id}
            title={section.title}
            items={section.items}
            open={openId === section.id}
            onToggle={handleToggle}
          />
        ))}
      </SidebarContent>
      <SidebarRail />

      {/* Footer */}
      <SidebarFooter>
        <div className='flex w-full flex-col items-end gap-6 px-8 pt-4 pb-8'>
          <div className='grid w-full grid-cols-2'>
            <div className='col-start-2 flex w-full justify-between'>
              <ThemeSwitcher className='relative right-4.5' />
              <LocaleSwitcher />
            </div>
          </div>
          <Button variant='neon' className='h-11! w-full rounded-full text-xl font-normal whitespace-nowrap'>
            <Trans>Download</Trans>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

interface NavSectionProps {
  id: string
  title: MessageDescriptor
  items: readonly NavItem[]
  open: boolean
  onToggle: (id: string, isOpen: boolean) => void
}

const NavSection = memo(({ id, title, items, open, onToggle }: NavSectionProps) => {
  const { i18n } = useLingui()
  const handleToggle = useCallback((state: boolean) => onToggle(id, state), [id, onToggle])

  return (
    <Collapsible open={open} onOpenChange={handleToggle} className='group/collapsible px-10'>
      <SidebarGroup className='border-sidebar-border border-b px-0'>
        <SidebarGroupLabel asChild className='group/label'>
          <CollapsibleTrigger
            className={cn(
              'w-full pb-2 text-2xl! font-semibold transition-colors',
              'text-foreground! hover:text-foreground group-data-[state=open]/collapsible:text-primary!'
            )}
          >
            {i18n._(title)}
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ id, title, href }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton asChild>
                    <NavigationLink
                      href={href}
                      className={cn(
                        'flex items-center rounded-md py-2 text-xl font-medium transition-colors',
                        'hover:bg-muted/40 text-[#BEEDC8]'
                      )}
                    >
                      {i18n._(title)}
                    </NavigationLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
})

NavSection.displayName = 'NavSection'
