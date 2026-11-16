// 几何算法库：平面坐标（单位：米），环 = 顶点数组（末点不重复首点，闭合边隐式连接）
// polygon = { rings: [外环, 孔洞1, 孔洞2, ...] }

export const EPS = 1e-9;

export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function dist2(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function samePoint(a, b, tol = 1e-6) {
  return dist(a, b) <= tol;
}

// 带符号面积（鞋带公式，隐式闭合），正值表示逆时针
export function signedArea(ring) {
  let s = 0;
  for (let i = 0; i < ring.length; i++) {
    const p = ring[i];
    const q = ring[(i + 1) % ring.length];
    s += p.x * q.y - q.x * p.y;
  }
  return s / 2;
}

export function ringArea(ring) {
  return Math.abs(signedArea(ring));
}

// 面（含孔洞）净面积
export function polygonArea(polygon) {
  if (!polygon || !polygon.rings || !polygon.rings.length) return 0;
  let a = ringArea(polygon.rings[0]);
  for (let i = 1; i < polygon.rings.length; i++) a -= ringArea(polygon.rings[i]);
  return Math.max(0, a);
}

export function ringLength(ring) {
  let l = 0;
  for (let i = 0; i < ring.length; i++) l += dist(ring[i], ring[(i + 1) % ring.length]);
  return l;
}

export function bbox(polygons) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of polygons) {
    for (const ring of p.rings) {
      for (const v of ring) {
        minX = Math.min(minX, v.x);
        maxX = Math.max(maxX, v.x);
        minY = Math.min(minY, v.y);
        maxY = Math.max(maxY, v.y);
      }
    }
  }
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

export function centroid(ring) {
  let cx = 0, cy = 0, a = 0;
  for (let i = 0; i < ring.length; i++) {
    const p = ring[i];
    const q = ring[(i + 1) % ring.length];
    const f = p.x * q.y - q.x * p.y;
    a += f;
    cx += (p.x + q.x) * f;
    cy += (p.y + q.y) * f;
  }
  a *= 0.5;
  if (Math.abs(a) < EPS) {
    // 退化情况取顶点均值
    const m = ring.reduce((s, v) => ({ x: s.x + v.x, y: s.y + v.y }), { x: 0, y: 0 });
    return { x: m.x / ring.length, y: m.y / ring.length };
  }
  return { x: cx / (6 * a), y: cy / (6 * a) };
}

// ---- 线段相交 ----
function cross(ax, ay, bx, by) {
  return ax * by - ay * bx;
}

// 返回 {x,y,t,u} 或 null；t/u 为两线段上的参数 [0,1]
export function segInter(p1, p2, p3, p4) {
  const d1x = p2.x - p1.x, d1y = p2.y - p1.y;
  const d2x = p4.x - p3.x, d2y = p4.y - p3.y;
  const den = cross(d1x, d1y, d2x, d2y);
  if (Math.abs(den) < EPS) return null; // 平行/共线不视为交叉
  const t = cross(p3.x - p1.x, p3.y - p1.y, d2x, d2y) / den;
  const u = cross(p3.x - p1.x, p3.y - p1.y, d1x, d1y) / den;
  if (t < -EPS || t > 1 + EPS || u < -EPS || u > 1 + EPS) return null;
  const tc = Math.min(1, Math.max(0, t));
  return { x: p1.x + d1x * tc, y: p1.y + d1y * tc, t, u };
}

export function ringEdges(ring) {
  const edges = [];
  for (let i = 0; i < ring.length; i++) {
    edges.push([ring[i], ring[(i + 1) % ring.length], i]);
  }
  return edges;
}

// 环自相交检测（含隐式闭合边），返回相交明细
export function ringSelfIntersections(ring) {
  const hits = [];
  const n = ring.length;
  if (n < 4) return hits;
  const edges = ringEdges(ring);
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      const adjacent = j - i === 1 || (i === 0 && j === n - 1);
      if (adjacent) continue;
      const [a, b] = edges[i];
      const [c, d] = edges[j];
      const hit = segInter(a, b, c, d);
      if (hit) {
        // 交点恰为非相邻边公共端点也算（尖刺/重复点）
        hits.push({ edge1: i, edge2: j, point: { x: hit.x, y: hit.y } });
      }
    }
  }
  return hits;
}

// 整个面的自相交（外环 + 每个孔洞各自检查，孔洞之间/孔洞与外环重叠另行检查）
export function polygonIssues(polygon) {
  const issues = [];
  polygon.rings.forEach((ring, ri) => {
    if (ring.length < 3) {
      issues.push({ ringIndex: ri, type: '顶点不足', detail: `环${ri}至少需要3个界址点` });
      return;
    }
    for (const h of ringSelfIntersections(ring)) {
      issues.push({
        ringIndex: ri,
        type: '自相交',
        detail: `环${ri}边${h.edge1 + 1}与边${h.edge2 + 1}相交于 (${h.point.x.toFixed(2)}, ${h.point.y.toFixed(2)})`,
        point: h.point
      });
    }
  });
  // 孔洞必须落在外环内
  const outer = polygon.rings[0];
  for (let i = 1; i < polygon.rings.length; i++) {
    const c = centroid(polygon.rings[i]);
    if (!pointInRing(c, outer)) {
      issues.push({ ringIndex: i, type: '孔洞越界', detail: `孔洞${i}中心不在外轮廓内` });
    }
  }
  return issues;
}

// 射线法点在环内
export function pointInRing(p, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i], b = ring[j];
    const intersect =
      a.y > p.y !== b.y > p.y &&
      p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function pointInPolygon(p, polygon) {
  if (!pointInRing(p, polygon.rings[0])) return false;
  for (let i = 1; i < polygon.rings.length; i++) {
    if (pointInRing(p, polygon.rings[i])) return false;
  }
  return true;
}

// 点到线段的距离及投影点
export function pointSegDistance(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 < EPS ? 0 : ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.min(1, Math.max(0, t));
  const proj = { x: a.x + t * dx, y: a.y + t * dy };
  return { dist: dist(p, proj), point: proj, t };
}

export function nearestPointOnPolyline(p, line) {
  let best = null;
  for (let i = 0; i < line.length - 1; i++) {
    const r = pointSegDistance(p, line[i], line[i + 1]);
    if (!best || r.dist < best.dist) best = { ...r, segment: i };
  }
  return best;
}

// ---- 环定向 ----
export function ensureCCW(ring) {
  return signedArea(ring) < 0 ? [...ring].reverse() : ring;
}
export function ensureCW(ring) {
  return signedArea(ring) > 0 ? [...ring].reverse() : ring;
}

// Sutherland-Hodgman：用凸裁剪环（CCW）裁剪主体环
export function clipRingConvex(subject, clip) {
  let out = subject.map((p) => ({ ...p }));
  const cw = ensureCCW(clip);
  for (let i = 0; i < cw.length; i++) {
    const a = cw[i];
    const b = cw[(i + 1) % cw.length];
    const input = out;
    out = [];
    const inside = (pt) => cross(b.x - a.x, b.y - a.y, pt.x - a.x, pt.y - a.y) >= -EPS;
    for (let k = 0; k < input.length; k++) {
      const cur = input[k];
      const prev = input[(k + input.length - 1) % input.length];
      const curIn = inside(cur);
      const prevIn = inside(prev);
      if (curIn) {
        if (!prevIn) {
          const hit = segInter(prev, cur, a, b);
          if (hit) out.push({ x: hit.x, y: hit.y });
        }
        out.push(cur);
      } else if (prevIn) {
        const hit = segInter(prev, cur, a, b);
        if (hit) out.push({ x: hit.x, y: hit.y });
      }
    }
    if (!out.length) break;
  }
  return out;
}

function ringContainsRing(outer, inner) {
  return inner.every((v) => pointInRing(v, outer));
}

// 在环上找点 P 的位置（顶点或边上），返回增强序列 [{pt, kind}]，cut 点带 edge
function augmentWithPoints(ring, points) {
  const aug = ring.map((pt) => ({ pt, kind: 'v' }));
  for (const target of points) {
    let placed = false;
    for (const idx of aug.keys()) {
      if (samePoint(aug[idx].pt, target, 1e-5)) {
        placed = true;
        break;
      }
    }
    if (placed) continue;
    for (let i = 0; i < ring.length; i++) {
      const a = ring[i], b = ring[(i + 1) % ring.length];
      const r = pointSegDistance(target, a, b);
      if (r.dist < 1e-5 && r.t > EPS && r.t < 1 - EPS) {
        // 找到插入位置：边 (a,b) 在 aug 中 a 之后
        let insertAt = -1;
        for (let k = 0; k < aug.length; k++) {
          if (samePoint(aug[k].pt, a, 1e-5)) {
            insertAt = k + 1;
            break;
          }
        }
        if (insertAt > 0) {
          aug.splice(insertAt, 0, { pt: { ...target }, kind: 'cut', edge: i });
          placed = true;
          break;
        }
      }
    }
    if (!placed) throw new Error('接合点不在环边界上');
  }
  return aug;
}

function arcBetween(aug, fromPt, toPt) {
  const fi = aug.findIndex((n) => samePoint(n.pt, fromPt, 1e-5));
  const ti = aug.findIndex((n) => samePoint(n.pt, toPt, 1e-5));
  if (fi < 0 || ti < 0) throw new Error('接合点定位失败');
  const arc = [];
  for (let k = fi; ; k = (k + 1) % aug.length) {
    arc.push({ ...aug[k].pt });
    if (k === ti) break;
  }
  return arc;
}

// 两个面合并（要求共享一条边、两个接合点；或一个完全包含另一个）
export function mergeTwoPolygons(pa, pb) {
  const outerA = pa.rings[0];
  const outerB = pb.rings[0];

  // 包含关系 → 被包含者成为孔洞
  if (ringContainsRing(outerA, outerB)) {
    return { rings: [outerA, outerB, ...pa.rings.slice(1), ...pb.rings.slice(1)] };
  }
  if (ringContainsRing(outerB, outerA)) {
    return { rings: [outerB, outerA, ...pa.rings.slice(1), ...pb.rings.slice(1)] };
  }

  // 求边界接合点（相交点 + 落在对方边上的顶点）
  const junctionMap = new Map();
  const addJ = (p) => {
    const key = `${Math.round(p.x * 1000)},${Math.round(p.y * 1000)}`;
    if (!junctionMap.has(key)) junctionMap.set(key, { x: p.x, y: p.y });
  };
  for (const ea of ringEdges(outerA)) {
    for (const eb of ringEdges(outerB)) {
      const hit = segInter(ea[0], ea[1], eb[0], eb[1]);
      if (hit) addJ(hit);
    }
    for (const v of outerB) {
      const r = pointSegDistance(v, ea[0], ea[1]);
      if (r.dist < 1e-5) addJ(v);
    }
  }
  for (const v of outerA) {
    for (const eb of ringEdges(outerB)) {
      const r = pointSegDistance(v, eb[0], eb[1]);
      if (r.dist < 1e-5) addJ(v);
    }
  }
  const junctions = [...junctionMap.values()];
  if (junctions.length !== 2) {
    throw new Error('两宗宗海没有唯一公共边（应恰好有2个接合点），无法合并');
  }
  const [P, Q] = junctions;
  const augA = augmentWithPoints(outerA, [P, Q]);
  const augB = augmentWithPoints(outerB, [P, Q]);
  const arcA1 = arcBetween(augA, P, Q);
  const arcA2 = arcBetween(augA, Q, P);
  const arcB1 = arcBetween(augB, P, Q);
  const arcB2 = arcBetween(augB, Q, P);

  const target = ringArea(outerA) + ringArea(outerB);
  const candidates = [
    arcA1.concat(arcB2.slice(1, -1)), // P→Q 沿 A，Q→P 沿 B
    arcA1.concat([...arcB1].reverse().slice(1, -1)),
    arcA2.concat(arcB1.slice(1, -1)),
    arcA2.concat([...arcB2].reverse().slice(1, -1))
  ];
  let best = null;
  for (const ring of candidates) {
    if (ring.length < 3 || ringSelfIntersections(ring).length) continue;
    const a = ringArea(ring);
    const score = Math.abs(a - target);
    if (!best || score < best.score) best = { ring, score };
  }
  if (!best) throw new Error('合并后的轮廓存在自相交，已放弃合并');

  // 原有孔洞按质心归属
  const holes = [];
  for (const h of [...pa.rings.slice(1), ...pb.rings.slice(1)]) {
    if (pointInRing(centroid(h), best.ring)) holes.push(h);
  }
  return { rings: [best.ring, ...holes] };
}

export function mergePolygons(polygons) {
  if (polygons.length < 2) throw new Error('请至少选择两宗相邻宗海');
  let acc = { rings: polygons[0].rings.map((r) => r.map((v) => ({ ...v }))) };
  for (let i = 1; i < polygons.length; i++) {
    acc = mergeTwoPolygons(acc, { rings: polygons[i].rings.map((r) => r.map((v) => ({ ...v }))) });
  }
  return acc;
}

// 直线切割面：line = [a, b]，返回 0..n 个新面
export function splitPolygonByLine(polygon, a, b) {
  const outer = polygon.rings[0];
  const aug = augmentWithPoints(outer, []); // 复制结构
  // 求切割线与各边交点并插入
  const cuts = [];
  for (let i = 0; i < outer.length; i++) {
    const p1 = outer[i], p2 = outer[(i + 1) % outer.length];
    const hit = segInter(p1, p2, a, b);
    if (!hit) continue;
    if (hit.t < EPS || hit.t > 1 - EPS) continue; // 交点在顶点处，顶点本身已在序列中
    cuts.push({ x: hit.x, y: hit.y, edge: i });
  }
  // 去重并按边顺序插入
  const uniq = [];
  for (const c of cuts) {
    if (!uniq.some((u) => samePoint(u, c, 1e-5))) uniq.push(c);
  }
  if (uniq.length < 2) {
    throw new Error('切割线未贯穿宗海（与外轮廓交点少于2个）');
  }
  if (uniq.length > 2) {
    throw new Error('切割线与外轮廓交点过多，请简化切割线后重试');
  }
  const full = augmentWithPoints(outer, uniq);
  const [E1, E2] = uniq;
  const arc1 = arcBetween(full, E1, E2);
  const arc2 = arcBetween(full, E2, E1);
  const pieces = [arc1, arc2].filter((r) => r.length >= 3 && ringArea(r) > 0.01);
  if (pieces.length < 2) throw new Error('切割失败：未能形成两个有效面');

  // 孔洞按质心分配
  const result = pieces.map((ring) => ({ rings: [ring] }));
  for (const hole of polygon.rings.slice(1)) {
    const c = centroid(hole);
    const host = result.find((pc) => pointInRing(c, pc.rings[0]));
    if (host) host.rings.push(hole);
  }
  return result;
}

// 把折线与目标面求交，返回 { entry, exit, inner }：
// entry/exit 为折线穿过外环的两个交点，inner 为二者之间落在面内的全部有序点（含折线拐点）。
export function cuttingLineFromPolyline(polygon, polyline) {
  const outer = polygon.rings[0];
  const collected = [];
  if (pointInRing(polyline[0], outer)) collected.push({ ...polyline[0], kind: 'in' });

  for (let i = 0; i < polyline.length - 1; i++) {
    const a = polyline[i];
    const b = polyline[i + 1];
    const hits = [];
    for (let ei = 0; ei < outer.length; ei++) {
      const hit = segInter(a, b, outer[ei], outer[(ei + 1) % outer.length]);
      if (hit && hit.t > EPS && hit.t < 1 - EPS) hits.push({ x: hit.x, y: hit.y, t: hit.t, kind: 'cross' });
    }
    hits.sort((p, q) => p.t - q.t);
    for (const h of hits) {
      if (!collected.some((u) => samePoint(u, h, 1e-5))) collected.push({ x: h.x, y: h.y, kind: 'cross' });
    }
    if (pointInRing(b, outer) && !collected.some((u) => samePoint(u, b, 1e-5))) {
      collected.push({ ...b, kind: 'in' });
    }
  }
  const crosses = collected.filter((c) => c.kind === 'cross');
  if (crosses.length < 2) {
    throw new Error('参考线未贯穿该宗海（与外轮廓交点少于2个），无法切割');
  }
  if (crosses.length > 2) {
    throw new Error('参考线与外轮廓交点过多，请简化参考线后重试');
  }
  return { entry: crosses[0], exit: crosses[1], inner: collected.map(({ x, y }) => ({ x, y })) };
}

// 沿参考折线切割：把两个贯穿点插入外环，用面内折线段把环拆成两个子环，
// 孔洞按质心归属。
export function splitPolygonByPolyline(polygon, polyline) {
  const { entry, exit, inner } = cuttingLineFromPolyline(polygon, polyline);
  const outer = polygon.rings[0];
  const aug = augmentWithPoints(outer, [entry, exit]);
  const arc1 = arcBetween(aug, entry, exit); // 外环弧 A
  const arc2 = arcBetween(aug, exit, entry); // 外环弧 B
  // 面内切割路径（含两端交点），正反两个方向分别与两条外环弧闭合成环
  const cutForward = inner.map((v) => ({ ...v }));
  const cutBack = [...inner].reverse().map((v) => ({ ...v }));
  const ring1 = arc1.concat(cutBack.slice(1, -1));
  const ring2 = arc2.concat(cutForward.slice(1, -1));
  const pieces = [ring1, ring2].filter((r) => r.length >= 3 && ringArea(r) > 0.01);
  if (pieces.length < 2) throw new Error('切割失败：未能形成两个有效面');

  const result = pieces.map((ring) => ({ rings: [ring] }));
  for (const hole of polygon.rings.slice(1)) {
    const c = centroid(hole);
    const host = result.find((pc) => pointInRing(c, pc.rings[0]));
    if (host) host.rings.push(hole);
  }
  return result;
}

// 扣减：裁剪面完全落在外环内 → 作为孔洞；否则返回 null（界面提示改用切割）
export function subtractAsHole(polygon, clipRing) {
  const outer = polygon.rings[0];
  if (!ringContainsRing(outer, clipRing)) return null;
  for (const hole of polygon.rings.slice(1)) {
    if (clipRing.some((v) => pointInRing(v, hole))) {
      throw new Error('扣减范围与已有孔洞重叠');
    }
  }
  return { rings: [outer, ...polygon.rings.slice(1), clipRing.map((v) => ({ ...v }))] };
}

// ---- 闭合差 ----
// 线性闭合差：末点到首点的距离；面积闭合差：0.5 × 线性闭合差 × 平均边长（m²）
export function closureErrors(ring) {
  const n = ring.length;
  const linear = dist(ring[0], ring[n - 1]);
  const meanEdge = ringLength(ring) / n;
  const area = 0.5 * linear * meanEdge;
  return { linear, area, meanEdge };
}

export function formatCoord(v, digits = 3) {
  return Number(v).toFixed(digits);
}

// 折线等宽缓冲带（miter 接头，两端方形封头），返回 CCW 环
export function bufferPolyline(line, halfWidth) {
  if (line.length < 2) throw new Error('航道中心线至少需要2个点');
  const left = [];
  const right = [];
  const dirs = [];
  for (let i = 0; i < line.length - 1; i++) {
    const dx = line[i + 1].x - line[i].x;
    const dy = line[i + 1].y - line[i].y;
    const l = Math.hypot(dx, dy) || 1;
    dirs.push({ x: dx / l, y: dy / l });
  }
  const offset = (d) => ({ x: -d.y * halfWidth, y: d.x * halfWidth }); // 左侧法向
  for (let i = 0; i < line.length; i++) {
    let d;
    if (i === 0) d = dirs[0];
    else if (i === line.length - 1) d = dirs[dirs.length - 1];
    else {
      const a = dirs[i - 1];
      const b = dirs[i];
      const mx = a.x + b.x;
      const my = a.y + b.y;
      const ml = Math.hypot(mx, my);
      if (ml < EPS) d = a;
      else {
        const m = { x: mx / ml, y: my / ml };
        // miter 长度随夹角放大，锐角过大时退化为单段法向
        const dot = m.x * a.x + m.y * a.y;
        const miter = dot > 0.35 ? 1 / dot : 1;
        d = { x: m.x * miter, y: m.y * miter };
      }
    }
    const o = offset(d);
    left.push({ x: line[i].x + o.x, y: line[i].y + o.y });
    right.push({ x: line[i].x - o.x, y: line[i].y - o.y });
  }
  const ring = left.concat([...right].reverse());
  return ensureCCW(ring);
}
