<template>
  <div ref="sceneContainer">
    <canvas class="scene" ref="sceneElement" :width="width" :height="height"></canvas>
  </div>
</template>

<script lang="ts">
import { WebGLRenderer } from 'three'
import { Options, Vue } from 'vue-class-component'
import { Ref, Watch } from 'vue-property-decorator'
import GrassScene from '@/scene/GrassScene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { NodeUtils } from 'three/examples/jsm/nodes/core/NodeUtils'
import elements = NodeUtils.elements;

@Options({
  components: {}
})
export default class Scene extends Vue {
  @Ref() readonly sceneElement!: HTMLDivElement
  @Ref() readonly sceneContainer!: HTMLDivElement

  // initialize to undefined as to make them non-reactive
  private renderer: WebGLRenderer | undefined = undefined;
  private resizeObserver: ResizeObserver | undefined = undefined;
  private scene: GrassScene | undefined = undefined;

  // reactive props
  private width = 800;
  private height = 600;
  private animating = true;

  mounted () {
    this.renderer = new WebGLRenderer({ canvas: this.sceneElement, antialias: true })
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.resizeObserver.observe(this.sceneContainer)
    this.scene = new GrassScene(0, 0, this.sceneElement)

    requestAnimationFrame(this.animate)
  }

  onResize (entries: ResizeObserverEntry[]) {
    const canvas = entries[0]
    this.width = canvas.contentRect.width
    this.height = canvas.contentRect.height
  }

  @Watch('width')
  @Watch('height')
  updateScene () {
    if (!this.renderer) return
    this.renderer.setSize(this.width, this.height)

    if (!this.scene) return
    this.scene.updateSize(this.width, this.height)
  }

  animate (time: number) {
    if (!this.animating) return
    requestAnimationFrame(this.animate)

    if (!this.renderer) return
    if (!this.scene) return
    try {
      this.scene.animate(time * 0.001)
      this.renderer.render(this.scene.scene, this.scene.camera)
    } catch (e) {
      this.animating = false
      throw e
    }
  }
}
</script>

<style scoped>
.scene {
  position: absolute;
}
</style>
