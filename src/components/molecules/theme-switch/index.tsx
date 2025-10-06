'use client'

import { Button } from '@/components/ui/button'
import { CloudSun, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ThemeSwitchProps {
  size?: number
  className?: string
}

export const ThemeSwitch = ({ size = 20, className }: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const toggleTheme = {
    light: 'dark',
    system: 'light',
    dark: 'system',
  }

  const validThemes = ['light', 'dark', 'system'] as const
  const currentTheme = validThemes.includes(theme as (typeof validThemes)[number])
    ? (theme as (typeof validThemes)[number])
    : 'light'

  useEffect(() => {
    if (!wrapperRef.current) return

    const xPositions = {
      light: 0,
      system: -size,
      dark: -size * 2,
    }

    gsap.to(wrapperRef.current, {
      x: xPositions[currentTheme],
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [currentTheme, size])

  return (
    <Button size='icon' variant='ghost' className={className} onClick={() => setTheme(toggleTheme[currentTheme])}>
      <div className='cursor-pointer overflow-hidden' style={{ width: size, height: size }}>
        <div ref={wrapperRef} className='flex gap-1 pt-0.5 pl-0.5' style={{ display: 'flex', flexDirection: 'row' }}>
          <Sun size={size} className='shrink-0' />
          <CloudSun size={size} className='shrink-0' />
          <Moon size={size} className='shrink-0' />
        </div>
      </div>
    </Button>
  )
}
