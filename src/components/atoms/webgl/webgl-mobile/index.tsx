'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { MathUtils } from 'three'
import { Model as ModelIphone13, ScreenKey } from '@/components/atoms/webgl/model/iphone-13'

function IPhoneStatic({ screen }: { screen?: ScreenKey }) {
  const parent = useRef<any>(null)
  const { viewport } = useThree()

  useEffect(() => {
    if (!parent.current) return

    const scale = viewport.height
    parent.current.scale.setScalar(scale)

    parent.current.position.set(0, 0, 0)

    parent.current.rotation.set(MathUtils.degToRad(0), MathUtils.degToRad(180), MathUtils.degToRad(0))
  }, [viewport])

  return (
    <>
      <group ref={parent}>
        <ModelIphone13 scale={[1, 1, 1]} screen={screen} />
      </group>
    </>
  )
}

export function WebGLMobile({ screen }: { screen?: ScreenKey }) {
  return (
    <div className='relative h-full w-full'>
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 1000],
          near: 0.1,
          far: 5000,
        }}
        gl={{
          powerPreference: 'high-performance',
          antialias: typeof window !== 'undefined' && window.devicePixelRatio <= 1.5, // tắt khử răng cưa trên mobile retina
          alpha: true,
          stencil: false, // tắt stencil buffer (hiếm khi cần)
          depth: true,
          preserveDrawingBuffer: false, // giảm memory (chỉ bật nếu cần chụp ảnh)
        }}
        dpr={[1, Math.min(1.5, window.devicePixelRatio || 1)]} // hạ DPR cho mobile
        frameloop='demand' // render khi có thay đổi, tiết kiệm CPU
        performance={{ min: 0.5 }} // giảm auto-performance limit của R3F
        resize={{ scroll: false, debounce: 200 }} // giảm tần suất resize
        shadows={false} // tắt shadow nếu không cần
      >
        <Suspense fallback={null}>
          <IPhoneStatic screen={screen} />
        </Suspense>
      </Canvas>
    </div>
  )
}
