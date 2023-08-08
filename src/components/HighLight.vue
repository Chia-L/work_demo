<script setup>
import { ref, onMounted, defineProps } from 'vue'
import hljs from 'highlight.js/lib/core'

const props = defineProps({
  lang: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'github'
  }
})
const conRef = ref(null)

onMounted(() => {
  if (props.lang) {
    const lib = require('highlight.js/lib/languages/python')
    hljs.registerLanguage('python', lib)
  }
  if (props.theme) {
    // 加载css
    require('highlight.js/styles/github.css')
  }
  hljs.highlightBlock(conRef.value)
})
</script>
<template>
  <pre>
    <code ref="conRef">
      <slot></slot>
    </code>
  </pre>
</template>

<style scoped></style>
