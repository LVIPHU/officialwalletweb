'use client'

import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PLATFORMS } from '@/constants/landing.constants'
import { cn } from '@/lib/styles'

export default function PlatformTabs() {
  return (
    <Tabs defaultValue={PLATFORMS[0].id} className='flex w-full flex-col items-center'>
      <TabsList className='flex flex-wrap justify-center gap-6 bg-transparent p-0'>
        {PLATFORMS.map(({ id }) => (
          <PlatformTabTrigger key={id} value={id} label={id} />
        ))}
      </TabsList>

      {PLATFORMS.map(({ id, content }) => (
        <TabsContent key={id} value={id} className='mt-11'>
          {content ? (
            <Image src={content} alt={id} width={940} height={548} priority className='rounded-xl object-contain' />
          ) : (
            <ComingSoon />
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}

/* --- Sub Components --- */
function PlatformTabTrigger({ value, label }: { value: string; label: string }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'rounded-full border border-white! px-6 py-2 text-white! transition-all duration-300',
        'data-[state=active]:border-[#0DCC61]! data-[state=active]:bg-[#0DCC61]! data-[state=active]:text-black!',
        'hover:border-[#0DCC61]/70! hover:text-[#0DCC61]!'
      )}
    >
      {label}
    </TabsTrigger>
  )
}

function ComingSoon() {
  return (
    <div className='flex h-[548px] w-full items-center justify-center rounded-xl md:w-[940px]'>
      <p className='text-6xl font-semibold tracking-wide text-white md:text-8xl'>Coming soon</p>
    </div>
  )
}
