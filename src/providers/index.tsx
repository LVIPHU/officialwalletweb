import {PropsWithChildren} from "react";
import {initLingui, PageLangParam} from "@/i18n/initLingui";
import LocaleProvider from "@/providers/locale.provider";
import ThemeProvider from "@/providers/theme.provider";
import {allMessages} from "@/i18n/i18n";
import {SidebarProvider} from "@/components/ui/sidebar";

export default async function ProviderRegistry({ children, params }: Readonly<PropsWithChildren<PageLangParam>>) {
    const lang = (await params).lang
    initLingui(lang)
    return (
        <LocaleProvider initialLocale={lang} initialMessages={allMessages[lang]!}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
            </ThemeProvider>
        </LocaleProvider>
    )
}