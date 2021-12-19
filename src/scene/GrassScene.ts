import { BoxGeometry, Color, Light, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Scene, Vector3 } from 'three'
import GrassObject from '@/scene/GrassObject'
import LandscapeObject from '@/scene/LandscapeObject'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class GrassScene {
  public readonly scene: Scene;
  public readonly camera: PerspectiveCamera;
  private grassObject: GrassObject
  private landscapeObject: LandscapeObject
  private controls: OrbitControls | undefined;

  constructor (width = 800, height = 600, element: HTMLDivElement | undefined = undefined) {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 100)
    this.camera.position.z = 2.5
    this.camera.position.x = 1.0
    this.camera.position.y = 0.6

    this.camera.lookAt(new Vector3(0, 0, 0))
    if (element) {
      this.controls = new OrbitControls(this.camera, element)
    }

    this.landscapeObject = new LandscapeObject()
    this.scene.add(this.landscapeObject.object)

    this.grassObject = new GrassObject(this.landscapeObject.generateRandomPoints(100))
    this.scene.add(this.grassObject.mesh)
  }

  public updateSize (width = 800, height = 600): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  animate (time: number):void {
    this.grassObject.animate(time)
  }
}
