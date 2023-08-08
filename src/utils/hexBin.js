import { number } from 'echarts'
export function hexBinStatistics(points, r) {
  debugger
  const dx = r * 2 * Math.sin(Math.PI / 3)
  const dy = r * 1.5
  const binsById = {}
  const bins = []
  for (let i = 0, n = points.length; i < n; ++i) {
    const point = points[i]
    let px = point[0]
    let py = point[1]
    if (isNaN(px) || isNaN(py)) {
      continue
    }
    let pj = Math.round((py = py / dy))
    let pi = Math.round((px = px / dx - (pj & 1) / 2))
    const py1 = py - pj
    if (Math.abs(py1) * 3 > 1) {
      const px1 = px - pi
      const pi2 = pi + (px < pi ? -1 : 1) / 2
      const pj2 = pj + (py < pj ? -1 : 1)
      const px2 = px - pi2
      const py2 = py - pj2
      if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) {
        pi = pi2 + (pj & 1 ? 1 : -1) / 2
        pj = pj2
      }
    }
    const id = pi + '-' + pj
    let bin = binsById[id]
    if (bin) {
      bin.points.push(point)
    } else {
      bins.push((bin = binsById[id] = { points: [point] }))
      bin.x = (pi + (pj & 1) / 2) * dx
      bin.y = pj * dy
    }
  }
  let maxBinLen = -Infinity
  for (let i = 0; i < bins.length; i++) {
    maxBinLen = Math.max(maxBinLen, bins.length)
  }
  return {
    maxBinLen: maxBinLen,
    bins: bins
  }
}

export function renderItemHexBin(params, api, hexagonRadiusInGeo, hexBinResult) {
  debugger
  const center = api.coord([api.value(0), api.value(1)])
  const points = []
  const pointsBG = []
  const maxViewRadius = api.size([hexagonRadiusInGeo, 0])[0]
  const minViewRadius = Math.min(maxViewRadius, 4)
  const extentMax = Math.log(Math.sqrt(hexBinResult.maxBinLen))
  const viewRadius = number.linearMap(
    Math.log(Math.sqrt(api.value(2))),
    [0, extentMax],
    [minViewRadius, maxViewRadius]
  )
  let angle = Math.PI / 6
  for (let i = 0; i < 6; i++, angle += Math.PI / 3) {
    points.push([
      center[0] + viewRadius * Math.cos(angle),
      center[1] + viewRadius * Math.sin(angle)
    ])
    pointsBG.push([
      center[0] + maxViewRadius * Math.cos(angle),
      center[1] + maxViewRadius * Math.sin(angle)
    ])
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
          stroke: '#ccc',
          fill: api.visual('color'),
          lineWidth: 1
        }
      },
      {
        type: 'polygon',
        shape: {
          points: pointsBG
        },
        style: {
          stroke: null,
          fill: 'rgba(0,0,0,0.5)',
          lineWidth: 0
        },
        z2: -19
      }
    ]
  }
}
