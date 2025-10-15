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
import MobileSidebar from '@/components/organisms/mobile-sidebar'
import DefaultLayout from '@/layouts/default'

export async function generateStaticParams() {
  return linguiConfig.locales.map((lang) => ({ lang }))
}

export const metadata: Metadata = {
  title: 'TB Wallet - The Future of Cryptocurrency Management',
  description:
    'Experience the future of cryptocurrency management with TB Wallet. Secure, fast, and user-friendly platform for all your digital assets.',
}

export default async function RootLayout({ children, params }: Readonly<PropsWithChildren<PageLangParam>>) {
  const lang = (await params).lang

  return (
    <html
      lang={lang}
      className={cn(
        'w-full overflow-x-hidden scroll-smooth antialiased',
        FONT_POPPINS.variable,
        FONT_CLASH_DISPLAY.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel='preload' as='image' href='/assets/background/glow-green.webp' />
        <link rel='preload' as='image' href='/assets/background/glow-blue.webp' />
        <link rel='preload' as='image' href='/assets/background/glow-purple.webp' />
        <link rel='preload' as='image' href='/assets/background/glow-orange.webp' />
        <link rel='preload' as='image' href='/assets/background/glow-olive.webp' />
        <title />
      </head>
      <body className={cn('relative flex min-h-screen flex-col antialiased')}>
        <ProviderRegistry params={params}>
          <DefaultLayout>
            <div className={'background-hero'} />
            <Header />
            <MobileSidebar />
            <main className='grow'>{children}</main>
            <Footer />
            <div className={'background-footer'} />
          </DefaultLayout>
        </ProviderRegistry>
      </body>
    </html>
  )
}
