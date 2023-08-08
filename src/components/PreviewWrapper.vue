<script setup>
import { ref, defineEmits } from 'vue'
import { genFileId } from 'element-plus'

const emits = defineEmits(['file-change'])
const upload = ref()

const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}

function httpRequest(file) {
  const fileReader = new FileReader()
  fileReader.readAsText(file.file)
  fileReader.onload = (e) => {
    emits('file-change', e.target.result)
  }
}
</script>

<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :limit="1"
      :on-exceed="handleExceed"
      :http-request="httpRequest"
    >
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
    </el-upload>
    <slot name="default"></slot>
  </div>
</template>

<style scoped></style>
