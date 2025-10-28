import type { MessageDescriptor } from '@lingui/core'

export interface NavItem {
  readonly id: string
  readonly href: string
  readonly title: MessageDescriptor
  readonly description: MessageDescriptor
}

export interface NavSection {
  readonly id: string
  readonly title: MessageDescriptor
  readonly items: readonly NavItem[]
}

export type Navigation = readonly NavSection[]
