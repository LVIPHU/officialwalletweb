'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { Color, MathUtils } from 'three'
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
      <ambientLight intensity={0.6} color={new Color('#ffffff')} />
      <directionalLight position={[150, 200, 300]} intensity={1} color={'#ffffff'} />
      <directionalLight position={[-100, -50, -150]} intensity={0.5} color={'#ffffff'} />

      <Float floatIntensity={0} rotationIntensity={0}>
        <group ref={parent}>
          <ModelIphone13 scale={[1, 1, 1]} screen={screen} />
        </group>
      </Float>
    </>
  )
}
function Content({ screen }: { screen?: ScreenKey }) {
  return (
    <Suspense fallback={null}>
      <IPhoneStatic screen={screen} />
    </Suspense>
  )
}

export function WebGLMobile({ screen }: { screen?: ScreenKey }) {
  return (
    <div className='relative h-full w-full'>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1000], near: 0.01, far: 10000 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <Content screen={screen} />
      </Canvas>
    </div>
  )
}
