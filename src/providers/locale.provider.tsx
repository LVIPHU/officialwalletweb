'use client'
import '@/libs/dayjs'
import { I18nProvider } from '@lingui/react'
import { type Messages, setupI18n } from '@lingui/core'
import { useState } from 'react'

interface LocaleProviderProps {
    readonly children: React.ReactNode
    readonly initialLocale: string
    readonly initialMessages: Messages
}

export function LocaleProvider({ children, initialLocale, initialMessages }: LocaleProviderProps) {
    const [i18n] = useState(() => {
        return setupI18n({
            locale: initialLocale,
            messages: { [initialLocale]: initialMessages },
        })
    })
    return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}