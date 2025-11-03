import HomeTemplate from '@/components/templates/home'
import { initLingui, PageLangParam } from '@/i18n/initLingui'

export default async function HomePage(props: PageLangParam) {
  const lang = (await props.params).lang
  initLingui(lang)
  return (
    <div>
      <HomeTemplate />
    </div>
  )
}
