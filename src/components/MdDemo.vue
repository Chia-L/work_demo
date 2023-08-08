<script setup>
import { ref, onMounted, nextTick } from 'vue'
import PreviewWrapper from '@/components/PreviewWrapper'

const message = ref('') // 文档内容
const catalogue = ref([]) // 目录列表

const sHeight = ref('100px')
const preview = ref(null)
const scrollOut = ref()

onMounted(async () => {
  nextTick(() => {
    loadFile()
  })
  sHeight.value = window.screen.height - 320 + 'px'
})

// 加载文档
const loadFile = async () => {
  // 从接口获取文档内容，这部分省略了霍~
  message.value = ''

  // 建目录
  await nextTick()
  const anchors = preview.value.querySelectorAll('h1,h2,h3,h4,h5,h6')

  const titles = Array.from(anchors).filter((title) => !!title.innerText.trim())

  if (!titles.length) {
    catalogue.value = []
    return
  }

  const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort()

  catalogue.value = titles.map((el) => ({
    title: el.innerText,
    lineIndex: el.getAttribute('data-v-md-line'),
    indent: hTags.indexOf(el.tagName)
  }))
}

// 定位内容
const scrollTop = (anchor) => {
  const { lineIndex } = anchor

  const heading = preview.value?.querySelector(`[data-v-md-line="${lineIndex}"]`)

  if (heading) {
    console.log(preview.value)
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: scrollOut.value.$el,
      top: 0
    })
  }
}
</script>

<template>
  <preview-wrapper>
    <template #default>
      <div class="markInner">
        <el-row :gutter="10">
          <!-- 目录部分 -->
          <el-col :xs="24" :sm="24" :md="8" :lg="4">
            <div
              :style="{
                cursor: 'pointer',
                height: sHeight,
                overflowY: 'scroll',
                padding: '0 0 5px 0'
              }"
            >
              <div
                v-for="item in catalogue"
                :key="item"
                class="list-group-item"
                :style="{ padding: `10px 0 10px ${item.indent * 20}px` }"
                @click="scrollTop(item)"
              >
                <a>{{ item.title }}</a>
              </div>
            </div>
          </el-col>
          <!-- md文件部分 -->
          <el-col
            :xs="24"
            :sm="24"
            :md="16"
            :lg="20"
            :style="{
              height: sHeight,
              overflowY: 'scroll'
            }"
            ref="scrollOut"
          >
            <v-md-preview :text="message" ref="preview"></v-md-preview>
          </el-col>
        </el-row>
      </div>
    </template>
  </preview-wrapper>
</template>

<style scoped lang="less">
.list-group-item {
  font-size: 14px;
  border-radius: 5px;
  &:hover {
    background-color: #409eff78;
    color: #fff;
  }
}
</style>
