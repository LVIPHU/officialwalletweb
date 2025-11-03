import '@/styles/globals.css'
import linguiConfig from '../../../lingui.config'
import type { Metadata } from 'next'
import ProviderRegistry from '@/providers'
import { cn } from '@/lib/styles'
import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import { PropsWithChildren } from 'react'
import { PageLangParam } from '@/i18n/initLingui'
import { FONT_CLASH_DISPLAY, FONT_POPPINS } from '@/styles/fonts'
import DefaultLayout from '@/layouts/default'
import { getDirection } from '@/lib/direction'
import { LOCALES } from '@/constants/direction.constants'

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  title: 'TBC Wallet - The Future of Cryptocurrency Management',
  description:
    'Experience the future of cryptocurrency management with TBC Wallet. Secure, fast, and user-friendly platform for all your digital assets.',
}

export default async function RootLayout({ children, params }: Readonly<PropsWithChildren<PageLangParam>>) {
  const lang = (await params).lang
  const dir = getDirection(lang as LOCALES)
  return (
    <html
      dir={dir}
      lang={lang}
      className={cn('w-full overflow-x-hidden antialiased', FONT_POPPINS.variable, FONT_CLASH_DISPLAY.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel='prefetch' as='image' href='/assets/background/glow-blue.webp' />
        <link rel='prefetch' as='image' href='/assets/background/glow-purple.webp' />
        <link rel='prefetch' as='image' href='/assets/background/glow-orange.webp' />
        <link rel='prefetch' as='image' href='/assets/background/glow-olive.webp' />
        <title />
      </head>
      <body className={cn('relative flex min-h-dvh flex-col pl-[calc(100vw-100%)] antialiased')}>
        <ProviderRegistry params={params}>
          <DefaultLayout>
            <Header />
            <main className='grow'>{children}</main>
            <Footer />
          </DefaultLayout>
        </ProviderRegistry>
      </body>
    </html>
  )
}
