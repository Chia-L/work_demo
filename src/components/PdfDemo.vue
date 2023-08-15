<script setup>
import {onMounted, reactive} from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
// import {createLoadingTask} from 'vue3-pdfjs/esm'
let state = reactive({
  source: '',
  pageNum: 1,
  numPages: 2
})
onMounted(()=>{
  // const loadingTask = createLoadingTask(state.source)
  // loadingTask.promise.then(() => {
  //   state.numPages = 2
  // })
})
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1
  }
}
function fileChange(e) {
  var reader = new FileReader()
  reader.readAsDataURL(e.target?.files[0])
  reader.onload = function (e) {
    state.source = e.target.result
  }
}
</script>

<template>
  <div id="pdf-demo">
    <input type="file" @change="fileChange"/>
    <div class="pdf-preview">
      <VuePdfEmbed :source="state.source" class="vue-pdf-embed-demo"></VuePdfEmbed>
    </div>
<!--    <el-button @click="lastPage" :disabled="state.pageNum === 1">上一页</el-button>-->
<!--    <el-button @click="nextPage" :disabled="state.pageNum === state.numPages">下一页</el-button>-->
  </div>
</template>

<style scoped>
</style>
