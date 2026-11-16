// 批次自动检查：严重 / 提醒两级问题清单
export function runChecks(partition, hf, offsetResult, opts) {
  const { sheetW, sheetH, slopeLimit = 40, distortionLimit = 0.03 } = opts
  const issues = []
  let n = 0
  const push = (level, code, title, detail, ref = {}) =>
    issues.push({ id: 'I-' + String(++n).padStart(3, '0'), level, code, title, detail, ...ref, status: 'pending' })

  if (!partition.blocks.length) {
    push('severe', 'EMPTY', '雕刻范围为空', '未圈选雕刻范围，或范围内没有地形格网单元')
  }
  if (partition.outerContour.length < 3) {
    push('severe', 'OPEN_CONTOUR', '外轮廓未闭合', '外轮廓顶点数不足 3，无法形成封闭下料边界，请重新圈选范围')
  }

  // 分块重叠：单元被多块占用
  const seen = new Set()
  let overlap = 0
  for (const b of partition.blocks) {
    for (const k of b.cells) {
      if (seen.has(k)) overlap++
      seen.add(k)
    }
  }
  if (overlap) push('severe', 'OVERLAP', '分块重叠', `${overlap} 个格网单元被多个分块重复占用，需调整分缝位置`)

  // 幅面（块尺寸单位 m，板材单位 mm，统一到 mm）
  for (const b of partition.blocks) {
    const wMM = b.flatWidth * 1000, hMM = b.flatHeight * 1000
    if (wMM > sheetW || hMM > sheetH) {
      push(
        'severe',
        'SHEET_SIZE',
        `${b.id} 超出板材幅面`,
        `摊平外包尺寸 ${wMM.toFixed(0)} × ${hMM.toFixed(0)} mm，板材幅面 ${sheetW} × ${sheetH} mm`,
        { blockId: b.id }
      )
    }
  }

  // 等距偏移
  if (offsetResult) {
    if (offsetResult.degenerate) {
      push('severe', 'OFFSET_DEGEN', '内偏轮廓退化', '浮雕厚度偏移量过大，偏移后轮廓面积为零，请减小厚度')
    }
    if (offsetResult.selfIntersections.length) {
      push(
        'reminder',
        'OFFSET_SELF',
        '内偏轮廓自交',
        `检测到 ${offsetResult.selfIntersections.length} 处自交（3D/2D 视图中红色标记），需减小浮雕厚度或修改雕刻范围`
      )
    }
  }

  // 摊平失真
  for (const b of partition.blocks) {
    if (b.maxDistortion > distortionLimit) {
      push(
        'reminder',
        'DISTORT',
        `${b.id} 摊平失真偏大`,
        `最大边长失真 ${(b.maxDistortion * 100).toFixed(1)}%，超过 ${distortionLimit * 100}% 参考限值，建议细化分块`,
        { blockId: b.id }
      )
    }
  }

  // 拼缝两侧摊平下料长偏差（反映两块各自松弛后的拼合误差）
  for (const s of partition.seams) {
    const mismatch = Math.abs(s.flatLengthA - s.flatLengthB) / Math.max(1e-6, s.surfaceLength)
    if (mismatch > 0.05) {
      push(
        'reminder',
        'SEAM_MISMATCH',
        `${s.id} 两侧下料长不一致`,
        `A 侧 ${(s.flatLengthA * 1000).toFixed(0)}mm / B 侧 ${(s.flatLengthB * 1000).toFixed(0)}mm，偏差 ${(mismatch * 100).toFixed(1)}%，拼合时需预留修边量`,
        { seamId: s.id }
      )
    }
  }

  // 陡坡
  for (const b of partition.blocks) {
    let maxSlope = 0
    for (const k of b.cells) {
      const [ix, iy] = k.split(',').map(Number)
      for (const [vx, vy] of [[ix, iy], [ix + 1, iy], [ix, iy + 1], [ix + 1, iy + 1]]) {
        maxSlope = Math.max(maxSlope, hf.slopeDeg(vx, vy))
      }
    }
    if (maxSlope > slopeLimit) {
      push(
        'reminder',
        'STEEP',
        `${b.id} 存在陡坡`,
        `块内最大坡度 ${maxSlope.toFixed(1)}°，超过 ${slopeLimit}° 雕刻限值，建议调整样条放缓山脊/沟谷`,
        { blockId: b.id }
      )
    }
  }

  const severe = issues.filter((i) => i.level === 'severe').length
  const reminder = issues.length - severe
  return { issues, severe, reminder }
}

export function batchStatus(issues) {
  if (!issues.length) return 'releasable'
  if (issues.some((i) => i.status === 'pending')) return 'reviewing'
  if (issues.some((i) => i.status === 'confirmed')) return 'rework'
  return 'releasable' // 全部驳回（误报）后放行
}

function fmtMM(m) {
  return (m * 1000).toFixed(0)
}
