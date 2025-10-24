'use client'
import Link from 'next/link'
import { cn } from '@/lib/styles'

const EXTERNAL_LINK_REGEX = /^(https?:)?\/\//i

interface NavigationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
  children: React.ReactNode
}

export function NavigationLink({ children, className, href, ...rest }: NavigationLinkProps) {
  const isExternal = EXTERNAL_LINK_REGEX.test(href)

  if (isExternal) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('no-underline', className)}
            {...rest}
        >
          {children}
        </a>
    )
  }

  return (
      <Link
          href={href}
          className={cn('no-underline', className)}
          {...rest}
      >
        {children}
      </Link>
  )
}
