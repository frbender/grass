<template>
  <scene class="scene"></scene>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Scene from '@/components/Scene.vue'

@Options({
  components: {
    Scene
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.scene {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
