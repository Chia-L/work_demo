<script setup>
import HighLight from '@/components/HighLight.vue'
</script>

<template>
  <high-light lang="javascript">
    <template #default>
      <span> def getVal: print('你好') </span>
    </template>
  </high-light>
</template>

<style scoped></style>
