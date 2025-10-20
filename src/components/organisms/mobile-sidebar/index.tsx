'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroup,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/constants/navigation.constants'
import { useLingui } from '@lingui/react'
import { Logo } from '@/components/atoms/logo'
import { NavigationLink } from '@/components/atoms/navigation-link'
import Image from 'next/image'
import { cn } from '@/lib/styles'

export default function MobileSidebar() {
  const { i18n } = useLingui()

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <div className='mt-2 flex items-center justify-between'>
          <Logo showText />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {NAVIGATION_ITEMS.map((section) => (
          <Collapsible key={section.id} defaultOpen={false} className='group/collapsible'>
            <SidebarGroup>
              {/* Collapsible Trigger */}
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className='text-foreground/80 hover:text-foreground flex w-full items-center justify-between py-2 text-sm font-medium'>
                  {i18n._(section.title)}
                  <ChevronDown className='ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180' />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              {/* Collapsible Content */}
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild>
                          <NavigationLink
                            href={item.href}
                            className={cn(
                              'flex items-center rounded-md px-3 py-2 text-sm transition-colors',
                              'text-foreground/80 hover:text-foreground hover:bg-muted/40'
                            )}
                          >
                            {i18n._(item.title)}
                          </NavigationLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className='flex items-center justify-center gap-4 py-4'>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target='_blank'
              rel='noopener noreferrer'
              className='opacity-70 transition-opacity hover:opacity-100'
            >
              <Image src={social.icon} alt={social.id} width={20} height={20} className='object-contain' />
            </a>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
