'use client'
import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from '@/lib/misc'

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
