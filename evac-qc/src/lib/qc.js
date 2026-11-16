// 批次质检引擎：12 条规则 × 4 级严重度，纯函数，可在 Worker / 主线程运行
import { SpatialIndex, PointGrid, anchorOf, pointInPolygon } from './spatial.js';

export const RULES = {
  R01: { code: 'R01', name: '楼层无出口', severity: 'fatal' },
  R02: { code: 'R02', name: '出口宽度不足(<1.0m)', severity: 'major' },
  R03: { code: 'R03', name: '疏散距离超标(>30m)', severity: 'major' },
  R04: { code: 'R04', name: '灭火器覆盖盲区(>25m)', severity: 'major' },
  R05: { code: 'R05', name: '灭火器失效(容量为0)', severity: 'fatal' },
  R06: { code: 'R06', name: '出口编号重复', severity: 'major' },
  R07: { code: 'R07', name: '监控盲区(整层无监控)', severity: 'minor' },
  R08: { code: 'R08', name: '消防通道宽度不足(<4m)', severity: 'fatal' },
  R09: { code: 'R09', name: '出口未连通消防通道(>50m)', severity: 'major' },
  R10: { code: 'R10', name: '楼梯楼层不连续', severity: 'major' },
  R11: { code: 'R11', name: '房间缺编号', severity: 'minor' },
  R12: { code: 'R12', name: '灭火器重复摆放(<1m)', severity: 'info' }
};

let issueSeq = 0;
function issue(rule, featureId, buildingId, floor, message, refs = []) {
  return {
    issueId: `Q-${String(++issueSeq).padStart(5, '0')}`,
    rule: rule.code, ruleName: rule.name, severity: rule.severity,
    featureId, buildingId, floor, message, refs,
    status: 'pending'
  };
}

function pointSegDist(px, py, a, b) {
  const vx = b[0] - a[0], vy = b[1] - a[1];
  const wx = px - a[0], wy = py - a[1];
  const len2 = vx * vx + vy * vy || 1;
  let t = (wx * vx + wy * vy) / len2;
  t = Math.max(0, Math.min(1, t));
  const dx = px - (a[0] + t * vx), dy = py - (a[1] + t * vy);
  return Math.hypot(dx, dy);
}

function pointPolyDist(x, y, poly) {
  if (pointInPolygon(x, y, poly)) return 0;
  let min = Infinity;
  for (let i = 0; i < poly.length; i++) {
    min = Math.min(min, pointSegDist(x, y, poly[i], poly[(i + 1) % poly.length]));
  }
  return min;
}

export function runChecks(features, onProgress = null) {
  issueSeq = 0;
  const issues = [];
  const index = new SpatialIndex(features);
  // 点要素按 楼栋|楼层 分组建网格：质检分层评估，组内密度高，最近邻环扩张 1~2 圈即停
  const groupGrids = (type) => {
    const m = new Map();
    for (const f of features.filter((x) => x.type === type)) {
      const k = `${f.buildingId}|${f.floor}`;
      if (!m.has(k)) m.set(k, new PointGrid([]));
      m.get(k).features.push(f);
      m.get(k).insert(f);
    }
    return m;
  };
  const exitGrids = groupGrids('exit');
  const extGrids = groupGrids('extinguisher');
  const report = (p) => onProgress && onProgress(p);

  const groups = new Map(); // buildingId|floor -> features（不含建筑轮廓占位）
  const buildings = new Map(); // buildingId -> building feature
  const byBuilding = new Map();
  for (const f of features) {
    if (!f.buildingId) continue;
    if (f.type === 'building') { buildings.set(f.buildingId, f); continue; }
    const gk = `${f.buildingId}|${f.floor}`;
    if (!groups.has(gk)) groups.set(gk, []);
    groups.get(gk).push(f);
    if (!byBuilding.has(f.buildingId)) byBuilding.set(f.buildingId, new Set());
    byBuilding.get(f.buildingId).add(f.floor);
  }
  const lanes = features.filter((f) => f.type === 'fireLane');

  let step = 0;
  const totalSteps = groups.size * 6 + 3;

  for (const [gk, feats] of groups) {
    const [buildingId, floor] = gk.split('|');
    const of = (predicate) => feats.filter(predicate);
    const rooms = of((f) => f.type === 'room');
    const exits = of((f) => f.type === 'exit');
    const stairs = of((f) => f.type === 'stair');
    const exts = of((f) => f.type === 'extinguisher');
    const cams = of((f) => f.type === 'camera');

    // R01 楼层无出口
    report(++step / totalSteps);
    if (exits.length === 0) {
      const b = buildings.get(buildingId) || rooms[0];
      issues.push(issue(RULES.R01, b ? b.id : null, buildingId, floor,
        `${buildingId} ${floor} 未配置任何安全出口，无法疏散`));
    }

    // R02 出口宽度不足
    for (const e of exits) {
      if (e.width < 1.0) {
        issues.push(issue(RULES.R02, e.id, buildingId, floor,
          `出口 ${e.exitNo} 宽度 ${e.width}m，低于 1.0m 最低要求`));
      }
    }

    // R03 疏散距离超标：房间中心到本层最近室内出口 > 30m（室外出口归 R09 评估）
    report(++step / totalSteps);
    const eg = exitGrids.get(`${buildingId}|${floor}`);
    for (const r of rooms) {
      const c = anchorOf(r);
      const near = eg?.nearestWithin(c.x, c.y, 30, (f) => f.outside === false);
      if (!near) {
        // 30m 内无室内出口：若本层根本没有室内出口则交给 R01，否则记 R03
        if (!eg || !eg.features.some((f) => f.outside === false)) continue;
        issues.push(issue(RULES.R03, r.id, buildingId, floor,
          `${r.roomNo || r.name} 30m 范围内无安全出口`, []));
        continue;
      }
      const d = Math.hypot(near.x - c.x, near.y - c.y);
      if (d > 30) {
        issues.push(issue(RULES.R03, r.id, buildingId, floor,
          `${r.roomNo || r.name} 至最近出口 ${near.exitNo} 距离 ${d.toFixed(1)}m，超过 30m`,
          [near.id]));
      }
    }

    // R04 灭火器覆盖盲区：房间中心到本层最近灭火器 > 25m
    report(++step / totalSteps);
    const xg = extGrids.get(`${buildingId}|${floor}`);
    for (const r of rooms) {
      const c = anchorOf(r);
      const near = xg?.nearestWithin(c.x, c.y, 25);
      if (!near) {
        issues.push(issue(RULES.R04, r.id, buildingId, floor,
          `${r.roomNo || r.name} 周边 25m 内无灭火器`, []));
      }
    }

    // R05 灭火器失效
    report(++step / totalSteps);
    for (const x of exts) {
      if ((x.capacity ?? 0) <= 0) {
        issues.push(issue(RULES.R05, x.id, buildingId, floor,
          `灭火器 ${x.code} 容量为 0，已失效，需立即更换`));
      }
    }

    // R06 出口编号重复（同楼栋同楼层）
    report(++step / totalSteps);
    const exitNoMap = new Map();
    for (const e of exits) {
      if (!exitNoMap.has(e.exitNo)) exitNoMap.set(e.exitNo, []);
      exitNoMap.get(e.exitNo).push(e);
    }
    for (const [no, arr] of exitNoMap) {
      if (arr.length > 1) {
        issues.push(issue(RULES.R06, arr[0].id, buildingId, floor,
          `出口编号 ${no} 在本层重复出现 ${arr.length} 次`, arr.map((e) => e.id)));
      }
    }

    // R07 监控盲区
    report(++step / totalSteps);
    if (cams.length === 0) {
      const b = buildings.get(buildingId) || rooms[0];
      issues.push(issue(RULES.R07, b ? b.id : null, buildingId, floor,
        `${buildingId} ${floor} 整层无监控点位，存在监控盲区`));
    }

    // R11 房间缺编号
    for (const r of rooms) {
      if (!r.roomNo) {
        issues.push(issue(RULES.R11, r.id, buildingId, floor,
          `房间（${r.name || '未命名'}）缺少房间编号，疏散指示无法引用`));
      }
    }

    // R12 灭火器重复摆放（< 1m，组内点网格近邻检测，避免 n²）
    const seenDup = new Set();
    for (const x of exts) {
      const near = xg.within(x.x, x.y, 1, (f) => f !== x);
      for (const other of near) {
        const pair = [x.id, other.id].sort().join('|');
        if (seenDup.has(pair)) continue;
        seenDup.add(pair);
        issues.push(issue(RULES.R12, x.id, buildingId, floor,
          `灭火器 ${x.code} 与 ${other.code} 间距不足 1m，疑似重复摆放`,
          [other.id]));
      }
    }

    // R10 楼梯楼层不连续：非首层且本层无楼梯（无法竖向疏散；首层可直通室外）
    report(++step / totalSteps);
    const floors = [...byBuilding.get(buildingId)].sort();
    const fIdx = floors.indexOf(floor);
    if (fIdx > 0 && stairs.length === 0) {
      const b = buildings.get(buildingId) || rooms[0];
      issues.push(issue(RULES.R10, b ? b.id : null, buildingId, floor,
        `${buildingId} ${floor} 无楼梯，竖向疏散不连续（该楼栋共 ${floors.length} 层）`));
    }
  }

  // R08 消防通道宽度不足
  report(++step / totalSteps);
  for (const lane of lanes) {
    if (lane.width < 4) {
      issues.push(issue(RULES.R08, lane.id, 'CAMPUS', lane.floor,
        `消防通道 ${lane.laneNo} 宽度 ${lane.width}m，低于 4m 消防车通行要求`));
    }
  }

  // R09 室外出口未连通消防通道（最近通道 > 50m）；室内出口不参与本规则
  report(++step / totalSteps);
  for (const e of features.filter((f) => f.type === 'exit' && f.outside)) {
    let minD = Infinity;
    let nearLane = null;
    for (const lane of lanes) {
      const d = pointPolyDist(e.x, e.y, lane.polygon);
      if (d < minD) { minD = d; nearLane = lane; }
    }
    if (minD > 50) {
      issues.push(issue(RULES.R09, e.id, e.buildingId, e.floor,
        `出口 ${e.exitNo} 距最近消防通道 ${nearLane ? nearLane.laneNo : '—'} ${minD.toFixed(1)}m，超过 50m`,
        nearLane ? [nearLane.id] : []));
    }
  }

  report(1);
  return issues;
}

// 批次放行结论
export function evaluateBatch(issues) {
  const pending = issues.filter((i) => i.status === 'pending').length;
  const confirmed = issues.filter((i) => i.status === 'confirmed');
  const blocked = confirmed.filter((i) => i.severity === 'fatal' || i.severity === 'major').length;
  let status, conclusion;
  if (pending > 0) {
    status = 'reviewing';
    conclusion = `复核未完成：仍有 ${pending} 条问题待复核，暂不可放行`;
  } else if (blocked > 0) {
    status = 'hold';
    conclusion = `不予放行：${blocked} 条致命/严重问题已确认未整改，须整改后重新送检`;
  } else {
    status = 'released';
    conclusion = `复核通过：全部问题已闭环（确认的一般/提示问题 ${confirmed.length} 条已登记跟踪），准予放行`;
  }
  return { status, conclusion, pending, confirmedCount: confirmed.length, blocked };
}
