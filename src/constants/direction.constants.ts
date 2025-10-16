export type LOCALES = 'en' | 'es' | 'pt' | 'fr' | 'ar' | 'fi' | 'zh-hans' | 'zh-hant'

export const DIRECTION_MAP: Record<LOCALES, 'ltr' | 'rtl'> = {
  ar: 'ltr',
  en: 'ltr',
  es: 'ltr',
  pt: 'ltr',
  fr: 'ltr',
  fi: 'ltr',
  'zh-hans': 'ltr',
  'zh-hant': 'ltr',
}
