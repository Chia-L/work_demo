<template>
  <div
    ref="containerRef"
    class="r-ScaleChildAdapter match-parent center overflow-hidden"
  >
    <div
      ref="childRef"
      class="child"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'

const containerRef = ref(null)
const childRef = ref(null)
const {width: containerWidth, height: containerHeight} = useElementSize(containerRef)
const {width: childWidth, height: childHeight} = useElementSize(childRef)

const scale = computed(() => {
  const containerRatio = containerWidth.value / containerHeight.value
  const childRatio = childWidth.value / childHeight.value

  // 容器比率要大，子的缩放比由 H1/H2 决定
  if (containerRatio > childRatio) {
    return containerHeight.value / childHeight.value
  }

  // 孩子比率要大，子的缩放比由 W1/W2 决定
  return containerWidth.value / childWidth.value
})
</script>

<style scoped lang="scss">
.r-ScaleChildAdapter {
  .child > ::v-deep(*) {
    transform: scale(v-bind(scale));
  }
}
</style>
