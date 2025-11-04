/**
 * Copyright (c) 2025 NEXSOFT. All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, distribution, or modification of this file,
 * in whole or in part, is strictly prohibited without prior written consent
 * from NEXSOFT.
 */

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
