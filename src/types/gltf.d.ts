declare module '*.glb' {
  import { Mesh, Material } from 'three'
  export interface GLTFResult {
    nodes: Record<string, Mesh>
    materials: Record<string, Material>
  }
  export const useGLTF: (path: string) => GLTFResult
}
