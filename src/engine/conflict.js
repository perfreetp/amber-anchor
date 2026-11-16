// 碰撞检测：返回所有相交物件对
import { obbIntersect } from './isoMath.js'

export function computeConflicts(items, visibleTypes) {
  const list = items.filter((o) => visibleTypes.has(o.type))
  const out = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (obbIntersect(list[i], list[j])) {
        out.push({ a: list[i].id, b: list[j].id })
      }
    }
  }
  return out
}

export function conflictIdSet(conflicts) {
  const s = new Set()
  for (const p of conflicts) {
    s.add(p.a)
    s.add(p.b)
  }
  return s
}
