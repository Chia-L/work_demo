import { createRouter, createWebHashHistory } from 'vue-router'
import Draw from '@/views/draw'
import Test from '@/views/test'
import MapC from '@/views/map'
import HighLightTest from '@/views/HighLightTest'
import FilePreview from '@/views/FilePreview'

const preview = [
  { path: '/md', component: () => import('@/components/MdDemo.vue') },
  { path: '/docx', component: () => import('@/components/DocxDemo.vue') },
  { path: '/excel', component: () => import('@/components/ExcelDemo.vue') },
  { path: '/pdf', component: () => import('@/components/PdfDemo.vue') }
]

const routes = [
  {
    path: '/',
    name: 'draw',
    component: Draw
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/map',
    name: 'map',
    component: MapC
  },
  {
    path: '/hlt',
    name: 'HighLightTest',
    component: HighLightTest
  },
  {
    path: '/fp',
    name: 'FilePreview',
    component: FilePreview,
    children: [...preview]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
