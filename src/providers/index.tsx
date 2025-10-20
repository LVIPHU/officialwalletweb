import { PropsWithChildren } from 'react'
import { initLingui, PageLangParam } from '@/i18n/initLingui'
import { SidebarProvider } from '@/components/ui/sidebar'
import LocaleProvider from '@/providers/locale.provider'
import ThemeProvider from '@/providers/theme.provider'
import DebugProvider from '@/providers/debug.provider'
import { allMessages } from '@/i18n/i18n'

export default async function ProviderRegistry({ children, params }: Readonly<PropsWithChildren<PageLangParam>>) {
  const lang = (await params).lang
  initLingui(lang)
  return (
    <LocaleProvider initialLocale={lang} initialMessages={allMessages[lang]!}>
      <ThemeProvider attribute='class' defaultTheme='dark' enableColorScheme enableSystem disableTransitionOnChange>
        <DebugProvider>
          <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
        </DebugProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
