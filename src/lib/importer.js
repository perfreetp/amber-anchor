// 数据导入：高程点 CSV、等高线 CSV、GeoJSON（点/线/要素集）
export function parseText(text, kind) {
  if (kind === 'auto') {
    kind = /^\s*[{[]/.test(text) ? 'geojson' : 'csv'
  }
  if (kind === 'geojson') return parseGeoJson(text)
  return parseCsv(text)
}

function splitLine(line) {
  const out = []
  let cur = '', q = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (q) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (c === '"') q = false
      else cur += c
    } else if (c === '"') q = true
    else if (c === ',' || c === '\t' || c === ';') { out.push(cur); cur = '' }
    else cur += c
  }
  out.push(cur)
  return out.map((s) => s.trim())
}

function num(s) {
  if (s === undefined) return NaN
  return Number(String(s).replace(/[^\d.eE+-]/g, ''))
}

// 自动识别列：x/y/z 或 id,z 等高线
export function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  if (!lines.length) throw new Error('文件为空')
  const header = splitLine(lines[0]).map((s) => s.toLowerCase())
  const hasHeader = /[a-z一-龥]/.test(lines[0]) && !header.every((h) => h !== '' && !isNaN(Number(h)))
  let ix = header.findIndex((h) => /^(x|e|lon|lng|经度|东距)$/.test(h))
  let iy = header.findIndex((h) => /^(y|n|lat|纬度|北距)$/.test(h))
  let iz = header.findIndex((h) => /^(z|h|elev|elevation|height|高程|海拔|标高)$/.test(h))
  let iid = header.findIndex((h) => /(id|编号|等高线)/.test(h))
  const startRow = hasHeader ? 1 : 0
  if (!hasHeader) {
    const cells = splitLine(lines[0]).length
    if (cells >= 3) { ix = 0; iy = 1; iz = 2 }
    else if (cells === 2) { ix = 0; iid = 0; iz = 1 }
    else throw new Error('列数不足，至少需要 x,y,z 两列或三列')
  }
  const points = []
  let prevId = null
  let prev = null
  for (let r = startRow; r < lines.length; r++) {
    const c = splitLine(lines[r])
    if (iz >= 0 && ix >= 0 && iy >= 0) {
      const x = num(c[ix]), y = num(c[iy]), z = num(c[iz])
      if ([x, y, z].some((v) => isNaN(v))) continue
      points.push({ x, y, z, source: 'point' })
    } else if (iz >= 0 && iid >= 0) {
      // 等高线折线：沿折线补点
      const id = c[iid]
      const z = num(c[iz])
      const xs = c.map(num)
      // 两列形式 id,z 时无法定位坐标，跳过
      if (ix < 0 && c.length < 3) throw new Error('等高线数据需要包含 x,y 坐标列')
      if (isNaN(z)) continue
      const x = num(c[ix < 0 ? 0 : ix]), y = num(c[iy < 0 ? 1 : iy])
      if (isNaN(x) || isNaN(y)) continue
      points.push({ x, y, z, source: 'contour', contourId: id })
      if (prev && id === prevId) {
        const d = Math.hypot(x - prev.x, y - prev.y)
        const n = Math.max(1, Math.ceil(d / 4))
        for (let k = 1; k < n; k++) {
          const t = k / n
          points.push({ x: prev.x + (x - prev.x) * t, y: prev.y + (y - prev.y) * t, z, source: 'contour-interp', contourId: id })
        }
      }
      prev = { x, y }
      prevId = id
    }
  }
  if (!points.length) throw new Error('未解析到有效数据行，请检查表头（x,y,z / 等高线编号,x,y,z）')
  return points
}

export function parseGeoJson(text) {
  const gj = JSON.parse(text)
  const points = []
  const visit = (geom, props) => {
    if (!geom) return
    const zOf = (c) => (c.length >= 3 ? c[2] : props && (props.elevation ?? props.z ?? props.h ?? props.高程))
    if (geom.type === 'Point') {
      const z = zOf(geom.coordinates)
      if (z !== undefined && z !== null) points.push({ x: geom.coordinates[0], y: geom.coordinates[1], z, source: 'point' })
    } else if (geom.type === 'MultiPoint') {
      geom.coordinates.forEach((c) => { const z = zOf(c); if (z !== undefined) points.push({ x: c[0], y: c[1], z, source: 'point' }) })
    } else if (geom.type === 'LineString') {
      const z = geom.coordinates[0] && geom.coordinates[0][2]
      geom.coordinates.forEach((c) => points.push({ x: c[0], y: c[1], z: c[2] ?? z, source: 'contour' }))
    } else if (geom.type === 'MultiLineString') {
      geom.coordinates.forEach((line) => line.forEach((c) => points.push({ x: c[0], y: c[1], z: c[2] ?? props?.z ?? 0, source: 'contour' })))
    } else if (geom.type === 'Feature') {
      visit(geom.geometry, geom.properties)
    } else if (geom.type === 'FeatureCollection') {
      geom.features.forEach((f) => visit(f.geometry, f.properties))
    } else if (geom.type === 'GeometryCollection') {
      geom.geometries.forEach((g) => visit(g, props))
    }
  }
  visit(gj, null)
  if (!points.length) throw new Error('GeoJSON 中未找到带高程的点/线要素')
  return points
}

// 归一化到模型坐标系（米），保持比例；高程按水平尺度的 1/4 缩放，避免陡坡失真
export function normalizePoints(points, targetW = 100) {
  const xs = points.map((p) => p.x), ys = points.map((p) => p.y), zs = points.map((p) => p.z)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const minZ = Math.min(...zs), maxZ = Math.max(...zs)
  const sx = maxX - minX || 1, sy = maxY - minY || 1, sz = maxZ - minZ || 1
  const scale = targetW / Math.max(sx, sy)
  return points.map((p) => ({
    x: (p.x - minX) * scale,
    y: (p.y - minY) * scale,
    z: ((p.z - minZ) / sz) * targetW * 0.25,
    source: p.source,
  }))
}

export const SAMPLE_CSV = `id,x,y,z
1,2,4,5.2
1,8,6,5.8
1,14,9,7.1
2,4,16,9.4
2,12,18,10.2
2,20,20,11.6
3,10,26,14.8
3,18,28,15.9
4,24,8,8.3
4,30,12,9.7
5,26,22,13.1
5,32,24,14.2
6,6,34,12.4
6,16,36,13.8
7,22,38,17.6
7,30,40,18.9
8,36,30,12.8
8,40,36,14.1`
