<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const current = ref('md')

onMounted(() => {
  console.log(route.path)
  let hash = location.hash
  let currentRoute = 'md'
  if (hash.includes('docx')) {
    currentRoute = 'docx'
  } else if (hash.includes('excel')) {
    currentRoute = 'excel'
  } else if (hash.includes('pdf')) {
    currentRoute = 'pdf'
  }
  current.value = currentRoute
})

function go(key) {
  router.push({
    path: key,
    query: { ...route.query }
  })
}
</script>

<template>
  <div>
    <el-menu :default-active="current" class="el-menu-demo" mode="horizontal" @select="go">
      <el-menu-item index="md"> markdown文件预览 </el-menu-item>
      <el-menu-item index="docx"> docx文件预览 </el-menu-item>
      <el-menu-item index="excel"> excel文件预览 </el-menu-item>
      <el-menu-item index="pdf"> pdf文件预览 </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<style scoped lang="less">
:deep(.ant-tabs-nav-wrap) {
  padding-left: 20px !important;
}
</style>
