'use client'
import dynamic from 'next/dynamic'
import { useIsTablet } from '@/hooks/use-tablet'

const HomeTemplateDesktop = dynamic(() => import('./desktop'), { ssr: false })
const HomeTemplateMobile = dynamic(() => import('./mobile'), { ssr: false })

export default function HomeTemplate() {
  const isTablet = useIsTablet()

  return isTablet ? <HomeTemplateMobile /> : <HomeTemplateDesktop />
}
