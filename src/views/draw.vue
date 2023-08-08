<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// import decode from '@/utils/decode'

const dataJson = require('../assets/json/chiaData.json')

const container = ref(null)
const dr = 4.8 // 正六边形的边长
const siteMap = {
  dr_site: '/images/dr_site.png',
  dr_master_control: '/images/dr_master_control.png'
}

const siteData = [
  { type: 'dr_site', value: [20, 22.2] },
  { type: 'dr_site', value: [32, 22.2] },
  { type: 'dr_master_control', value: [43, 22.2] },
  { type: 'dr_site', value: [143, 22.2] },
  { type: 'dr_master_control', value: [173, 22.2] }
]

/**
 * @description 初始话图标
 */
function initCharts() {
  const regionJson = dataJson
  echarts.registerMap('china', regionJson)
  container.value = echarts.init(document.getElementById('container'))
  container.value?.setOption(getOption())
}

/**
 * @description 渲染正六边形
 * @param params
 * @param api
 * @returns {{children: [{shape: {points: []}, z2: number, style: {fill: string, stroke: null, lineWidth: number}, type: string}], type: string}}
 */
/*function renderItemHexBin(params, api) {
  const center = api.coord([api.value(0), api.value(1)])
  const drDx = api.coord([dr, 0])[0] - api.coord([0, 0])[0]
  const drDy = api.coord([dr, 0])[1] - api.coord([0, 0])[1]
  const geoDr = Math.sqrt(Math.pow(drDx, 2) + Math.pow(drDy, 2))
  const points = []
  let angle = 0
  for (var i = 0; i < 6; i++, angle += Math.PI / 3) {
    points.push([center[0] + geoDr * Math.cos(angle), center[1] + geoDr * Math.sin(angle)])
  }
  return {
    type: 'group',
    children: [
      {
        type: 'polygon',
        shape: {
          points: points
        },
        style: {
          stroke: '#e23',
          fill: 'rgba(0, 0, 0, 0)',
          lineWidth: 1
        },
        z2: -19
      }
    ]
  }
}*/

/**
 * @description 获取配置
 * @param chinaJson
 * @returns {{geo: {regions: [{name: string, itemStyle: {normal: {label: {show: boolean}, opacity: number}}, value: number}], itemStyle: {normal: {borderColor: string, areaColor: string}, emphasis: {areaColor: string}}, label: {emphasis: {show: boolean}}, roam: boolean, map: string}, series: [{geoIndex: number, data: *, aspectScale: number, itemStyle: {normal: {borderColor: string, areaColor: string}, emphasis: {areaColor: string}}, label: {normal: {show: boolean}, emphasis: {show: boolean, textStyle: {color: string}}}, type: string, roam: boolean, map: string, showLegendSymbol: boolean, animation: boolean}, {data: [{name: string, value: number[]}], coordinateSystem: string, type: string, renderItem: function(*, *): {children: [{shape: {points: []}, z2: number, style: {fill: string, stroke: null, lineWidth: number}, type: string}], type: string}}], tooltip: {show: boolean}}}
 */
function getOption() {
  return {
    tooltip: {
      show: false
    },
    aria: {
      enabled: true,
      decal: {
        show: true
      }
    },
    geo: {
      top: '12%',
      roam: false,
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#083669',
          borderColor: '#1569D2'
        },
        emphasis: {
          areaColor: '#083669'
        }
      },
      regions: [
        {
          name: '南海诸岛',
          value: 0,
          itemStyle: {
            normal: {
              opacity: 0,
              label: {
                show: false
              }
            }
          }
        }
      ]
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        zoom: 1.8,
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077'
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        animation: false,
        data: []
      },
      {
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: (params, api) => {
          return {
            type: 'image',
            style: {
              image: '/images/hex_bin.png',
              x: api.coord([api.value(0), api.value(1)])[0],
              y: api.coord([api.value(0), api.value(1)])[1],
              width: 90,
              height: 90
            }
          }
        },
        data: [
          { name: '右1', value: [22.1, 44.246921938165304] },
          { name: '右2', value: [28.05, 47.21384387632961] },
          { name: '右3', value: [28.05, 41.36999999999999] },
          { name: '右4', value: [34.05, 50.14076581449492] },
          { name: '右5', value: [34.05, 44.356921938165304] },
          { name: '右6', value: [34.05, 38.56307806183468] },
          { name: '右7', value: [40.01, 47.31384387633061] },
          { name: '右8', value: [40.01, 41.50999999999999] },
          { name: '右9', value: [46.02, 50.27076581449591] },
          { name: '右10', value: [46.02, 44.4569219381653] },
          { name: '右11', value: [46.02, 38.66307806183468] },
          { name: '右12', value: [51.99, 47.3938438763306] },
          { name: '右13', value: [51.99, 41.569999999999986] },
          { name: '右14', value: [57.92, 44.45692193816529] },
          { name: '左1', value: [138.81, 44.45692193816529] },
          { name: '左2', value: [144.79, 47.413843876330594] },
          { name: '左3', value: [144.79, 41.59999999999998] },
          { name: '左4', value: [150.76, 50.3107658144959] },
          { name: '左5', value: [150.76, 44.51692193816528] },
          { name: '左6', value: [150.76, 38.70307806183467] },
          { name: '左7', value: [156.72, 47.41384387633059] },
          { name: '左8', value: [156.72, 41.60999999999997] },
          { name: '左9', value: [162.69, 50.32076581449589] },
          { name: '左10', value: [162.69, 44.556921938165276] },
          { name: '左11', value: [162.69, 38.76807806183466] },
          { name: '左12', value: [168.66, 47.45384387633058] },
          { name: '左13', value: [168.66, 41.669999999999964] },
          { name: '左14', value: [174.63, 44.63692193816527] }
        ]
      },
      {
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: (params, api) => {
          return {
            type: 'image',
            style: {
              image: '/images/arc_view.png',
              x: api.coord([api.value(0), api.value(1)])[0],
              y: api.coord([api.value(0), api.value(1)])[1],
              width: 620,
              height: 310
            }
          }
        },
        data: [
          [15, 52.48],
          [132, 52.48]
        ]
      },
      {
        // 当只有一个时经纬度在正六边形的基础上[+3.2, -2.6]
        // 当只有两个时经纬度在正六边形的基础上[[+2, -2.6], [+4.6, -2.6]]
        // 当只有三个时经纬度在正六边形的基础上[[+2, -1.8], [+4.6, -1.8], [+2, -3.4], [+4.6, -3.4]]
        // 当只有四个时经纬度在正六边形的基础上[[+2, -1.8], [+4.6, -1.8], [+2, -3.4], [+4.6, -3.4]]
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: (params, api) => {
          return {
            type: 'image',
            style: {
              image: '/images/oracle.png',
              x: api.coord([api.value(0), api.value(1)])[0],
              y: api.coord([api.value(0), api.value(1)])[1],
              width: 18,
              height: 14
            }
          }
        },
        data: [
          [24.1, 42.446921938165304], // 24.1, 41.646921938165304
          [26.7, 42.446921938165304], // 22.1, 44.246921938165304
          [24.1, 40.846921938165304], // d
          [26.7, 40.846921938165304] // d
        ]
      },
      {
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: (params, api) => {
          return {
            type: 'image',
            style: {
              image: '/images/ring.png',
              x: api.coord([api.value(0), api.value(1)])[0],
              y: api.coord([api.value(0), api.value(1)])[1],
              width: 40,
              height: 40
            }
          }
        },
        data: [
          [66.92, 42.48],
          [134.62, 42.48]
        ]
      },
      /*{
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: renderItemHexBin,
        itemStyle: {
          normal: {
            color: '#ab1',
            opacity: 0
          }
        },
        data: [
          { name: '右1', value: [21, 39.5] },
          { name: '右2', value: [28.2, 42.646921938164304] },
          { name: '右3', value: [28.2, 36.35307806183469] },
          { name: '右4', value: [35.4, 45.78384387632961] },
          { name: '右5', value: [35.4, 39.5] },
          { name: '右6', value: [35.4, 33.206156123669375] },
          { name: '右7', value: [42.6, 42.656921938165304] },
          { name: '右8', value: [42.599999999999994, 36.34307806183469] },
          { name: '右9', value: [49.800000000000004, 45.81384387633061] },
          { name: '右10', value: [49.8, 39.49999999999999] },
          { name: '右11', value: [49.79999999999999, 33.18615612366938] },
          { name: '右12', value: [57, 42.6569219381653] },
          { name: '右13', value: [56.99999999999999, 36.34307806183468] },
          { name: '右14', value: [64.199999999999996, 39.499999999999986] },
          { name: '左1', value: [142.199999999999996, 39.499999999999986] },
          { name: '左2', value: [149.39999999999998, 42.65692193816529] },
          { name: '左3', value: [149.39999999999998, 36.343078061834674] },
          { name: '左4', value: [156.59999999999997, 45.813843876330594] },
          { name: '左5', value: [156.59999999999997, 39.49999999999998] },
          { name: '左6', value: [156.59999999999997, 33.18615612366936] },
          { name: '左7', value: [163.79999999999995, 42.65692193816528] },
          { name: '左8', value: [163.79999999999995, 36.34307806183467] },
          { name: '左9', value: [170.99999999999994, 45.81384387633059] },
          { name: '左10', value: [170.99999999999994, 39.49999999999997] },
          { name: '左11', value: [170.99999999999994, 33.186156123669356] },
          { name: '左12', value: [178.19999999999993, 42.656921938165276] },
          { name: '左13', value: [178.19999999999993, 36.34307806183466] },
          { name: '左14', value: [185.39999999999992, 39.499999999999964] }
        ]
      },*/
      {
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: (params, api) => {
          const dataIndex = params.dataIndex
          const imageUrl = siteMap[siteData[dataIndex].type]
          const point = api.coord(siteData[dataIndex].value) // 站点坐标
          const centerLinePoint = api.coord([73.82, 27.4]) // 专线的起点坐标
          const startPoint = [point[0] + 43, point[1] + 5] // 站点折线起点
          const endPoint = [centerLinePoint[0], centerLinePoint[1] + 5] // 站点折线终点
          const turningPoint = [startPoint[0], endPoint[1]] // 站点折线拐点
          return {
            type: 'group',
            children: [
              {
                type: 'rect',
                shape: {
                  x: centerLinePoint[0],
                  y: centerLinePoint[1],
                  width: 660,
                  height: 10,
                  r: 5
                },
                style: {
                  fill: '#0DDCF0',
                  lineWidth: 4
                }
              },
              {
                type: 'image',
                style: {
                  image: imageUrl,
                  x: point[0],
                  y: point[1],
                  width: 90,
                  height: 90
                }
              },
              {
                type: 'polyline',
                shape: {
                  points: [startPoint, turningPoint, endPoint]
                },
                style: {
                  stroke: '#0DDCF0',
                  fill: 'rgba(0, 0, 0, 0)'
                }
              }
            ]
          }
        },
        data: siteData
      }
    ]
  }
}

/**
 * @description 求该中心点正六边形周围某个弧度偏向的正六边形的中心点
 * @param point 需求其周正六边形中心的点的正六边形的中心点
 * @param angle 中心点的弧度值（与0弧度的夹角）
 * @param dr 正六边形的边长
 * @returns {*[]}
 */
function getHexBinCenterPoints(point, angle, dr) {
  if (!Array.isArray(point)) return []
  let [dx, dy] = point
  const pr = 2 * dr * Math.cos(Math.PI / 6)
  return [dx + pr * Math.cos(angle), dy + pr * Math.sin(angle)]
}

/**
 * @description 获取该正六边形相邻右侧的上下两个正六边形的中心点
 * @param points
 * @returns {*}
 */
function getRightSidePoint(points) {
  return points.reduce((pre, item) => {
    const rightTop = Math.PI / 6
    const rightBottom = 2 * Math.PI - Math.PI / 6
    const rightTopPoint = getHexBinCenterPoints(item, rightTop, dr)
    const rightBottomPoint = getHexBinCenterPoints(item, rightBottom, dr)
    pre = pre.concat([rightTopPoint, rightBottomPoint])
    return pre
  }, [])
}

/**
 * @description 计算某个中心点正六边形的某个夹角的顶点
 * @param point
 * @param angle
 * @returns {*[]}
 */
function getHexBinPointByAngle(points, angle) {
  return points.map((item) => {
    const [dx, dy] = item
    return [dx + dr * Math.cos(angle), dy + dr * Math.sin(angle)]
  })
}

// 计算中心点
getRightSidePoint([[186.19999999999993, 43.656921938165276]])
getHexBinPointByAngle(
  [
    [142.199999999999996, 39.499999999999986],
    [149.39999999999998, 42.65692193816529],
    [149.39999999999998, 36.343078061834674],
    [156.59999999999997, 45.813843876330594],
    [156.59999999999997, 39.49999999999998],
    [156.59999999999997, 33.18615612366936],
    [163.79999999999995, 42.65692193816528],
    [163.79999999999995, 36.34307806183467],
    [170.99999999999994, 45.81384387633059],
    [170.99999999999994, 39.49999999999997],
    [170.99999999999994, 33.186156123669356],
    [178.19999999999993, 42.656921938165276],
    [178.19999999999993, 36.34307806183466],
    [185.39999999999992, 39.499999999999964]
  ],
  (2 * Math.PI) / 3
)

function setScale() {
  const designWidth = 1920 //设计稿的宽度，根据实际项目调整
  const designHeight = 1080 //设计稿的高度，根据实际项目调整
  const designPixelRatio = designWidth / designHeight
  const devicePixelRatio =
    document.documentElement.clientWidth / document.documentElement.clientHeight
  let scale =
    devicePixelRatio < designPixelRatio
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight
  document.querySelector('#screen').style.transform = `scale(${scale})`
}

onMounted(() => {
  window.onresize = function () {
    setScale()
  }
  initCharts()
})
</script>

<template>
  <div class="page">
    <div id="screen">
      <div id="container" style="margin-top: 100px">ddd</div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-image: url('/public/images/bg.jpg');
  background-size: 100% 100%;
}
#screen {
  display: flex;
  flex-flow: column nowrap;
  width: 1920px;
  height: 1080px;
  transform-origin: 0 0;
  position: absolute;
}
#container {
  flex: 1;
}
.footer {
  height: 350px;
}
</style>
