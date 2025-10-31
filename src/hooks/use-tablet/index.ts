'use client'
import { useMediaQuery } from '../use-media-query'

const TABLET_BREAKPOINT = 1024

export function useIsTablet() {
  return useMediaQuery(`(max-width: ${TABLET_BREAKPOINT - 1}px)`, {
    defaultValue: false,
    initializeWithValue: false,
  })
}
