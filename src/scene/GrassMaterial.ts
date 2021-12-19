import { Color, DoubleSide, ShaderMaterial, ShaderMaterialParameters, UniformsLib, UniformsUtils } from 'three'
import grassVert from '@/scene/grass.vert'
import grassFrag from '@/scene/grass.frag'
import perlin from '@/scene/perlin.glsl'
import rotateAroundAxis from '@/scene/rotateAroundAxis.glsl'

export default class GrassMaterial {
  public readonly shader: ShaderMaterial
  private time: number;

  constructor () {
    this.time = 0
    const uniforms = UniformsUtils.merge(
      [
        UniformsLib.lights,
        {
          time: {
            value: this.time
          }
        },
        {
          colorTop: {
            value: new Color('#bcd25c'),
            type: 'c'
          },
          colorBottom: {
            value: new Color('#537024'),
            type: 'c'
          }
        }
      ]
    )
    const parameters: ShaderMaterialParameters = {
      vertexShader: rotateAroundAxis + perlin + grassVert,
      fragmentShader: grassFrag,
      uniforms,
      side: DoubleSide,
      lights: true
    }

    this.shader = new ShaderMaterial(parameters)
  }

  animate (time: number): void {
    this.time = time
    this.shader.uniforms.time.value = this.time
    this.shader.uniformsNeedUpdate = true
  }
}
