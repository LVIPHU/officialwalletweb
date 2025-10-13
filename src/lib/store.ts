import { create } from 'zustand'
import Lenis from 'lenis'

interface StoreState {
  navIsOpen: boolean
  setNavIsOpen: (toggle: boolean) => void

  screenIphone: string
  setScreenIphone: (screenIphone: string) => void

  lenis: Lenis | null
  setLenis: (lenis: Lenis | null) => void

  overflow: boolean
  setOverflow: (overflow: boolean) => void

  triggerTransition: string
  setTriggerTransition: (triggerTransition: string) => void

  thresholds: Record<string, number>
  addThreshold: (params: { id: string; value: number }) => void
  removeThreshold: (id: string) => void
  clearThresholds: () => void

  introOut: boolean
  setIntroOut: (introOut: boolean) => void
}

export const useStore = create<StoreState>((set, get) => ({
  navIsOpen: false,
  setNavIsOpen: (toggle) => set({ navIsOpen: toggle, overflow: !toggle }),

  screenIphone: '1',
  setScreenIphone: (screenIphone) => set({ screenIphone }),

  lenis: null,
  setLenis: (lenis) => set({ lenis }),

  overflow: true,
  setOverflow: (overflow) => set({ overflow }),

  triggerTransition: '',
  setTriggerTransition: (triggerTransition) => set({ triggerTransition }),

  thresholds: {},
  addThreshold: ({ id, value }) => {
    const thresholds = { ...get().thresholds }
    thresholds[id] = value
    set({ thresholds })
  },
  removeThreshold: (id) =>
    set((state) => {
      const thresholds = { ...state.thresholds }
      delete thresholds[id]
      return { thresholds }
    }),
  clearThresholds: () => set({ thresholds: {} }),

  introOut: false,
  setIntroOut: (introOut) => set({ introOut }),
}))
