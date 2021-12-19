import { BufferAttribute, BufferGeometry, InstancedMesh, Matrix4, Vector3 } from 'three'
import GrassMaterial from '@/scene/GrassMaterial'

export default class GrassObject {
  public readonly mesh: InstancedMesh
  public readonly geometry: BufferGeometry
  public readonly material: GrassMaterial
  public readonly count: number

  constructor (points: Vector3[]) {
    this.count = points.length
    this.geometry = this.setupGeometry()
    this.material = this.setupMaterial()
    this.mesh = this.setupMesh()
    this.setupMatrices(points)
  }

  private setupGeometry () {
    const scale = 0.3
    const width2 = 0.05 * scale
    const height = 1.0 * scale

    const vertices = new Float32Array([
      ...this.triangle(-width2 * 4, height * 0.6, width2),
      ...this.triangle(0, height, width2),
      ...this.triangle(width2 * 4, height * 0.8, width2)
    ])
    const uv = new Float32Array([
      0, 0,
      1, 0,
      0.5, 1,
      0, 0,
      1, 0,
      0.5, 1,
      0, 0,
      1, 0,
      0.5, 1
    ])
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))
    geometry.setAttribute('uv', new BufferAttribute(uv, 2))
    return geometry
  }

  private triangle (offset: number, height: number, width2: number): number[] {
    return [
      offset - width2, -0.0, 0.0,
      offset + width2, -0.0, 0.0,
      offset, height, 0.0
    ]
  }

  private setupMesh () {
    return new InstancedMesh(this.geometry, this.material.shader, this.count)
  }

  private setupMaterial () {
    // const material = new MeshBasicMaterial({ color: '0xFFFF00' })
    return new GrassMaterial()
  }

  private setupMatrices (points: Vector3[]) {
    for (let i = 0; i < points.length; i++) {
      const matrix = new Matrix4()
      matrix.makeTranslation(points[i].x, points[i].y, points[i].z)
      this.mesh.setMatrixAt(i, matrix)
    }
  }

  animate (time: number):void {
    this.material.animate(time)
  }
}
