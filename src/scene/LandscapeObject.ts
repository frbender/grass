import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import landscape from '../assets/landscape.obj'
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Matrix3,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Vector3
} from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { OBJLoader2 } from 'wwobjloader2'

export default class LandscapeObject {
  private surface: Mesh

  constructor () {
    const loader = new OBJLoader()
    const surface = loader.parse(landscape)
    const mesh = surface.children[0] as Mesh
    const smoothMesh = this.smoothSurface(mesh.geometry)
    const material = new MeshBasicMaterial({ color: new Color('#537024'), side: DoubleSide })
    this.surface = new Mesh(smoothMesh, material)
  }

  private smoothSurface (geometry: BufferGeometry) {
    return mergeVertices(geometry)
  }

  get object (): Object3D {
    return this.surface
  }

  public generateRandomPoints (samples: number): Vector3[] {
    const newPositions = []
    const positions = this.surface.geometry.getAttribute('position').array
    if (!this.surface.geometry.index) return []
    const index = this.surface.geometry.index.array

    for (let i = 0; i < index.length - 3; i += 3) {
      const pointMat = new Matrix3()
      pointMat.set(positions[index[i] * 3], positions[index[i] * 3 + 1], positions[index[i] * 3 + 2],
        positions[index[i + 1] * 3], positions[index[i + 1] * 3 + 1], positions[index[i + 1] * 3 + 2],
        positions[index[i + 2] * 3], positions[index[i + 2] * 3 + 1], positions[index[i + 2] * 3 + 2])

      for (let j = 0; j < samples; j++) {
        const pointMatCopy = new Matrix3().copy(pointMat)
        let u = Math.random()
        let v = Math.random()
        if (u + v >= 1.0) {
          u = 1 - u
          v = 1 - v
        }
        const w = 1 - u - v
        const uvw = new Vector3(u, v, w)
        uvw.divideScalar(uvw.x + uvw.y + uvw.z)
        const xyz = uvw.applyMatrix3(pointMatCopy.transpose())

        newPositions.push(xyz)
      }
    }
    return newPositions
  }
}
