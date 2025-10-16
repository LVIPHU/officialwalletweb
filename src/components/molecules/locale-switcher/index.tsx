'use client'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Item, ItemActions, ItemContent, ItemTitle } from '@/components/ui/item'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Globe, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/styles'
import { LOCALES } from '@/constants/direction.constants'

const languages: Record<LOCALES, string> = {
  ar: 'العربية',
  en: 'English',
  es: 'Español',
  fi: 'Suomi',
  fr: 'Français',
  pt: 'Português',
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
} as const

export function LocaleSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const defaultLocale: LOCALES = 'en'
  const [locale, setLocale] = useState<LOCALES>((pathname?.split('/')[1] as LOCALES) || defaultLocale)

  function handleChange(value: string) {
    const locale = value as LOCALES
    const pathNameWithoutLocale = pathname?.split('/')?.slice(2) ?? []
    const newPath = `/${locale}/${pathNameWithoutLocale.join('/')}`

    setLocale(locale)
    router.push(`${newPath}${window.location.search}${window.location.hash}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>
          <Globe className='mr-2 h-4 w-4' />
          {languages[locale]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-90'>
        <div className='grid grid-cols-2 gap-4'>
          {Object.keys(languages).map((lang) => (
            <Item
              key={lang}
              onClick={() => handleChange(lang)}
              className={cn('cursor-pointer', lang === locale && 'border-accent-foreground border-2')}
            >
              <ItemContent>
                <ItemTitle>{languages[lang as keyof typeof languages]}</ItemTitle>
              </ItemContent>
              <ItemActions>{lang === locale && <Check className='size-4' />}</ItemActions>
            </Item>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
