'use client'
import Link from 'next/link'
import { cn } from '@/lib/styles'
import { usePathname } from 'next/navigation'
import { LOCALES } from '@/constants/direction.constants'

const EXTERNAL_LINK_REGEX = /^(https?:)?\/\//i
const defaultLocale = 'en'

interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children: React.ReactNode
}

// TODO: Lingui does not automatically hydrate the locale into the href.
// Currently, we're manually adding the locale as a temporary workaround.
// Need to investigate why Lingui isn't handling this automatically.

export function NavigationLink({ children, className, href, ...rest }: NavigationLinkProps) {
  const pathname = usePathname()
  const isExternal = EXTERNAL_LINK_REGEX.test(href)

  const locale = (pathname?.split('/')[1] as LOCALES) || defaultLocale
  const newPath = `/${locale}${href}`

  if (isExternal) {
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' className={cn('no-underline', className)} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={newPath} className={cn('no-underline', className)} {...rest}>
      {children}
    </Link>
  )
}
