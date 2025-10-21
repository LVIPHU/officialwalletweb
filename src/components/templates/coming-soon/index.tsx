'use client'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Container } from '@/components/atoms/container'
import { Trans } from '@lingui/react/macro'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'

export default function ComingSoonTemplate() {
  const { i18n } = useLingui()
  return (
    <Container className='relative h-[75dvh] md:h-[80dvh]'>
      <div className='background-ellipse' />
      <Empty className='h-full gap-8'>
        <EmptyHeader className='max-w-4xl'>
          <EmptyMedia className='font-medium text-lg md:text-xl rounded-full border border-foreground px-8 py-2 mb-6'>
            <Trans>Coming Soon</Trans>
          </EmptyMedia>
          <EmptyTitle className='font-medium text-4xl md:text-6xl'>
            <Trans>We’re launching soon!</Trans>
          </EmptyTitle>
          <EmptyDescription className='font-medium text-lg md:text-xl'>
            <Trans>
              Something incredible is on the horizon! Drop your email below to be first in line for early access.
            </Trans>
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className='max-w-4xl'>
          <InputGroup className='h-16'>
            <InputGroupInput className='h-14 text-xl! font-medium!' placeholder={i18n._(msg`name@email.com`)} />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton variant='default' size='2xl' className='text-white rounded-xl'>
                <Trans>Sign up</Trans>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </EmptyContent>
      </Empty>
    </Container>
  )
}
