import { create } from 'zustand'
import Lenis from "lenis";

interface StoreState {
    headerData?: unknown
    setHeaderData: (headerData: unknown) => void

    footerData?: unknown
    setFooterData: (footerData: unknown) => void

    navIsOpen: boolean
    setNavIsOpen: (toggle: boolean) => void

    lenis: Lenis | null
    setLenis: (lenis: Lenis | null) => void

    overflow: boolean
    setOverflow: (overflow: boolean) => void

    triggerTransition: string
    setTriggerTransition: (triggerTransition: string) => void

    thresholds: Record<string, number>
    addThreshold: (params: { id: string; value: number }) => void

    introOut: boolean
    setIntroOut: (introOut: boolean) => void
}

export const useStore = create<StoreState>((set, get) => ({
    headerData: undefined,
    setHeaderData: (headerData) => set({ headerData }),

    footerData: undefined,
    setFooterData: (footerData) => set({ footerData }),

    navIsOpen: false,
    setNavIsOpen: (toggle) => set({ navIsOpen: toggle, overflow: !toggle }),

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

    introOut: false,
    setIntroOut: (introOut) => set({ introOut }),
}))
