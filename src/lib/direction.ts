import { DIRECTION_MAP, LOCALES } from '@/constants/direction.constants'

export function getDirection(locale: LOCALES): 'ltr' | 'rtl' {
  return DIRECTION_MAP[locale] ?? 'ltr'
}

export function applyDocumentDirection(locale: LOCALES) {
  const dir = getDirection(locale)
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', dir)
  }
}
