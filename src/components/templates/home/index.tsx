'use client'
import { useIsTablet } from '@/hooks/use-tablet'
import HomeTemplateMobile from '@/components/templates/home/mobile'
import HomeTemplateDesktop from '@/components/templates/home/desktop'

const HomeTemplate: React.FC<any> = () => {
  const isTablet = useIsTablet()
  if (isTablet) {
    return <HomeTemplateMobile />
  }
  return <HomeTemplateDesktop />
}

export default HomeTemplate
