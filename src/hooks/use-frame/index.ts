/**
 * Hook đăng ký callback chạy mỗi frame, quản lý lifecycle tự động.
 * @param callback - Hàm chạy mỗi frame (time, delta)
 * @param priority - Thứ tự thực thi callback (mặc định = 0)
 */

import { useEffect, useRef } from 'react'
import Tempus, { TempusCallback } from '@/lib/tempus'

export function useFrame(callback: TempusCallback, priority = 0): void {
    const cbRef = useRef<TempusCallback>(callback)
    cbRef.current = callback

    useEffect(() => {
        if (!Tempus) return

        const wrapped = (time: number, delta: number): void => {
            cbRef.current?.(time, delta)
        }

        const unsubscribe = Tempus.add(wrapped, priority)

        return () => {
            Tempus?.remove(wrapped)
            unsubscribe?.()
        }
    }, [priority])
}
