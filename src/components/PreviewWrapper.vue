<script setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'

const upload = ref()

const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}

function httpRequest(file) {
  const fileReader = new FileReader()
  const text = fileReader.readAsText(file)
  console.log('ddd', text)
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
      <template #tip>
        <div class="el-upload__tip text-red">limit 1 file, new file will cover the old file</div>
      </template>
    </el-upload>
    <slot name="default"></slot>
  </div>
</template>

<style scoped></style>
