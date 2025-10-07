export const noop = () => {}

type EventHandler = (e: Event) => void

export function on<K extends keyof HTMLElementEventMap>(
    obj: HTMLElement | Document | Window | null,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
): void {
  obj?.addEventListener(type, listener as EventListener, options)
}

export function off<K extends keyof HTMLElementEventMap>(
    obj: HTMLElement | Document | Window | null,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
): void {
  obj?.removeEventListener(type, listener as EventListener, options)
}

export const isBrowser = typeof window !== 'undefined'

export const isNavigator = typeof navigator !== 'undefined'
