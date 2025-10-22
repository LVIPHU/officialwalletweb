'use client'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PLATFORMS } from '@/constants/landing.constants'
import { cn } from '@/lib/styles'
import { Trans } from '@lingui/react/macro'
import { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'

export default function PlatformTabs() {
  return (
    <Tabs defaultValue={PLATFORMS[0].id} className='flex w-full flex-col items-center'>
      <TabsList className='flex flex-wrap justify-center gap-4 bg-transparent p-0 sm:gap-5 md:gap-6'>
        {PLATFORMS.map(({ id, title }) => (
          <PlatformTabTrigger key={id} value={id} label={title} />
        ))}
      </TabsList>

      {PLATFORMS.map(({ id, images: { desktop, mobile } }) => (
        <TabsContent key={id} value={id} className='mt-11 md:mt-0'>
          {desktop ? (
            <div className='flex items-center justify-center pt-5 lg:pt-11'>
              <picture>
                <source srcSet={mobile} media='(max-width: 767px)' />
                <Image src={desktop} alt={id} width={940} height={548} className='object-contain' />
              </picture>
            </div>
          ) : (
            <ComingSoon />
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}

/* --- Sub Components --- */
function PlatformTabTrigger({ value, label }: { value: string; label: MessageDescriptor }) {
  const { i18n } = useLingui()
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'border-foreground! text-foreground! cursor-pointer rounded-full border border-solid px-6 py-2 text-center transition-colors duration-300 ease-in-out',
        'hover:border-primary/70! hover:text-primary! hover:data-[state=active]:text-foreground!',
        'data-[state=active]:border-primary! data-[state=active]:bg-primary! dark:data-[state=active]:text-black!'
      )}
    >
      {i18n._(label)}
    </TabsTrigger>
  )
}

function ComingSoon() {
  return (
    <div className='flex h-[548px] w-full items-center justify-center rounded-xl md:w-[940px]'>
      <p className='text-6xl font-semibold tracking-wide md:text-8xl'>
        <Trans>Coming soon</Trans>
      </p>
    </div>
  )
}
