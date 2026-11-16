// 样例批次生成器：生成 6 栋楼、含一个单层上万要素的巨型教学楼，
// 并植入 12 类确定性缺陷，供质检规则验证与性能压测。

let seqCounter = 0;
const nid = (bid, floor, type) => `${bid}-${floor}-${type}-${String(++seqCounter).padStart(4, '0')}`;

function makeBuilding(bid, name, ox, oy, w, d, floors) {
  return {
    id: `${bid}-building`, type: 'building', buildingId: bid, floor: 'F01',
    name, polygon: [[ox, oy], [ox + w, oy], [ox + w, oy + d], [ox, oy + d]],
    area: w * d, _w: w, _d: d
  };
}

// 网格房间 + 点要素
function genGridFloor({ bid, floor, ox, oy, W, D, opts }) {
  const out = [];
  const margin = 3;
  const cols = opts.cols, rows = opts.rows;
  const rw = (W - margin * 2) / cols, rd = (D - margin * 2) / rows;
  let rseq = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x0 = ox + margin + c * rw, y0 = oy + margin + r * rd;
      const roomNo = `${floor}-R${String(++rseq).padStart(3, '0')}`;
      // 缺陷 11：B02-F01 的 7 号房间缺编号
      const missingNo = bid === 'B02' && floor === 'F01' && rseq === 7;
      out.push({
        id: nid(bid, floor, 'room'), type: 'room', buildingId: bid, floor,
        polygon: [[x0, y0], [x0 + rw, y0], [x0 + rw, y0 + rd], [x0, y0 + rd]],
        roomNo: missingNo ? '' : roomNo,
        name: missingNo ? '未编号房间' : `${roomNo} 室`,
        area: +(rw * rd).toFixed(1)
      });
    }
  }

  // 楼梯：沿底部走廊布置
  const stairCount = opts.stairs;
  for (let i = 0; i < stairCount; i++) {
    const sx = ox + (W / (stairCount + 1)) * (i + 1);
    const sy = oy + D - 1.4;
    out.push({
      id: nid(bid, floor, 'stair'), type: 'stair', buildingId: bid, floor,
      x: sx, y: sy, w: 3.2, d: 2.4,
      stairNo: `${floor}-S${i + 1}`
    });
  }

  // 出口：室内网格布设（行列间距 ≤ 50m，保证任意房间中心 30m 内有出口）；
  // B04 例外，出口全部置于北墙外（outside），远离南侧消防通道 → R09
  if (opts.exits !== 0) {
    const exitCount = opts.exits;
    // 大平面用规整 5×3 网格（间距 40×40m，覆盖半径 < 29m），其余按面积自动分列
    const gridCols = opts.exitGridCols || Math.max(1, Math.round(Math.sqrt(exitCount * W / D)));
    const gridRows = Math.ceil(exitCount / gridCols);
    let ei = 0;
    for (let rr = 0; rr < gridRows && ei < exitCount; rr++) {
      for (let cc = 0; cc < gridCols && ei < exitCount; cc++) {
        let ex, ey, outside;
        if (bid === 'B04') {
          ex = ox + (W / (exitCount + 1)) * (ei + 1);
          ey = oy - 80; // 北墙外 80m，距南侧消防通道 > 50m → R09
          outside = true;
        } else {
          ex = ox + (W / (gridCols + 1)) * (cc + 1);
          ey = oy + (D / (gridRows + 1)) * (rr + 1);
          outside = false;
        }
        let exitNo = `${floor}-E${String(ei + 1).padStart(2, '0')}`;
        // 缺陷 6：B03-F01 出口编号重复
        if (bid === 'B03' && floor === 'F01' && ei === 1) exitNo = `${floor}-E01`;
        let width = 1.2;
        // 缺陷 2：B01-F01 首个出口宽度不足
        if (bid === 'B01' && floor === 'F01' && ei === 0) width = 0.7;
        out.push({
          id: nid(bid, floor, 'exit'), type: 'exit', buildingId: bid, floor,
          x: ex, y: ey, exitNo, width, outside
        });
        ei++;
      }
    }
  }

  // 灭火器：默认每房间一个
  let eseq = 0;
  for (const room of out.filter((f) => f.type === 'room')) {
    const cx = (room.polygon[0][0] + room.polygon[2][0]) / 2;
    const cy = (room.polygon[0][1] + room.polygon[2][1]) / 2;
    // 缺陷 4：B02-F01 东侧一条区域无灭火器（覆盖盲区，约 2 列房间）
    if (bid === 'B02' && floor === 'F01' && cx > ox + W * 0.82) continue;
    let capacity = 4;
    // 缺陷 5：B02 一个灭火器失效
    if (bid === 'B02' && floor === 'F01' && room.roomNo === `${floor}-R002`) capacity = 0;
    out.push({
      id: nid(bid, floor, 'ext'), type: 'extinguisher', buildingId: bid, floor,
      x: cx, y: cy, code: `MF-${bid}-${++eseq}`, capacity
    });
  }
  // 缺陷 12：B01-F01 灭火器重复摆放
  if (bid === 'B01' && floor === 'F01') {
    const t = out.find((f) => f.type === 'extinguisher');
    out.push({
      id: nid(bid, floor, 'ext'), type: 'extinguisher', buildingId: bid, floor,
      x: t.x, y: t.y, code: 'MF-DUP-01', capacity: 4
    });
  }

  // 监控：每 2 个房间一个
  let cseq = 0;
  out.filter((f) => f.type === 'room').forEach((room, idx) => {
    if (idx % 2 === 0) {
      const cx = (room.polygon[0][0] + room.polygon[2][0]) / 2;
      const cy = (room.polygon[0][1] + room.polygon[2][1]) / 2;
      out.push({
        id: nid(bid, floor, 'cam'), type: 'camera', buildingId: bid, floor,
        x: cx, y: cy, camNo: `CAM-${bid}-${++cseq}`, coverage: 8
      });
    }
  });

  return out;
}

function genFireLanes() {
  const lanes = [];
  const defs = [
    // 横向主干道（沿 y=175），宽 6m
    { laneNo: 'L1', width: 6, polygon: [[-10, 172], [470, 172], [470, 178], [-10, 178]] },
    // 纵向连接道，宽 5m
    { laneNo: 'L2', width: 5, polygon: [[262, -10], [267, -10], [267, 200], [262, 200]] },
    // 缺陷 8：L3 宽度仅 3m，不满足 4m 要求
    { laneNo: 'L3', width: 3, polygon: [[360, 165], [363, 165], [363, 60], [360, 60]] },
    // 体育馆环路
    { laneNo: 'L4', width: 4.5, polygon: [[360, 158], [470, 158], [470, 163], [360, 163]] }
  ];
  for (const d of defs) {
    lanes.push({ id: `lane-${d.laneNo}`, type: 'fireLane', floor: 'F01', ...d });
  }
  return lanes;
}

export function generateBatch() {
  seqCounter = 0;
  const drawings = [];
  const all = [];
  const push = (drawingId, buildingId, buildingName, floor, feats) => {
    drawings.push({ drawingId, buildingId, buildingName, floor, featureCount: feats.length });
    all.push(...feats);
  };

  // B01 巨型教学楼：240x160，3.2m 房间 → 单层 75x50=3750 房间 + 同数量灭火器/监控 ≈ 1.1 万要素
  const b1 = { bid: 'B01', name: '主教学楼', ox: 0, oy: 0, W: 240, D: 160, floors: 3 };
  push('B01-building', 'B01', b1.name, 'F01', [makeBuilding('B01', b1.name, b1.ox, b1.oy, b1.W, b1.D, b1.floors)]);
  for (let f = 1; f <= b1.floors; f++) {
    const floor = `F0${f}`;
    const feats = genGridFloor({
      bid: 'B01', floor, ox: b1.ox, oy: b1.oy, W: b1.W, D: b1.D,
      opts: { cols: 75, rows: 50, stairs: 8, exits: 54, exitGridCols: 9 }
    });
    push(`B01-${floor}`, 'B01', b1.name, floor, feats);
  }

  // B02 图书馆
  const b2 = { bid: 'B02', name: '图书馆', ox: 280, oy: 0, W: 80, D: 60, floors: 3 };
  push('B02-building', 'B02', b2.name, 'F01', [makeBuilding('B02', b2.name, b2.ox, b2.oy, b2.W, b2.D, b2.floors)]);
  for (let f = 1; f <= b2.floors; f++) {
    push(`B02-F0${f}`, 'B02', b2.name, `F0${f}`, genGridFloor({
      bid: 'B02', floor: `F0${f}`, ox: b2.ox, oy: b2.oy, W: b2.W, D: b2.D,
      opts: { cols: 12, rows: 8, stairs: 2, exits: 6 }
    }));
  }

  // B03 办公楼（4 层，楼梯只到 F03 → 缺陷 10；F01 出口重号 → 缺陷 6）
  const b3 = { bid: 'B03', name: '行政办公楼', ox: 380, oy: 0, W: 60, D: 50, floors: 4 };
  push('B03-building', 'B03', b3.name, 'F01', [makeBuilding('B03', b3.name, b3.ox, b3.oy, b3.W, b3.D, b3.floors)]);
  for (let f = 1; f <= b3.floors; f++) {
    const floor = `F0${f}`;
    const feats = genGridFloor({
      bid: 'B03', floor, ox: b3.ox, oy: b3.oy, W: b3.W, D: b3.D,
      opts: { cols: 10, rows: 7, stairs: f <= 3 ? 2 : 0, exits: 6 }
    });
    push(`B03-${floor}`, 'B03', b3.name, floor, feats);
  }

  // B04 实验楼：F02 无出口（缺陷 1），出口在北侧（缺陷 9）
  const b4 = { bid: 'B04', name: '实验楼', ox: 280, oy: 90, W: 70, D: 50, floors: 3 };
  push('B04-building', 'B04', b4.name, 'F01', [makeBuilding('B04', b4.name, b4.ox, b4.oy, b4.W, b4.D, b4.floors)]);
  for (let f = 1; f <= b4.floors; f++) {
    const floor = `F0${f}`;
    push(`B04-${floor}`, 'B04', b4.name, floor, genGridFloor({
      bid: 'B04', floor, ox: b4.ox, oy: b4.oy, W: b4.W, D: b4.D,
      opts: { cols: 10, rows: 7, stairs: 2, exits: f === 2 ? 0 : 9, exitGridCols: 3 }
    }));
  }

  // B05 体育馆：大开间 + 远端实训车间（缺陷 3：疏散距离超标），无摄像头（缺陷 7）
  const b5 = { bid: 'B05', name: '体育馆', ox: 370, oy: 80, W: 90, D: 70, floors: 2 };
  const b5Outline = makeBuilding('B05', b5.name, b5.ox, b5.oy, b5.W, b5.D, b5.floors);
  for (let f = 1; f <= b5.floors; f++) {
    const floor = `F0${f}`;
    const feats = [];
    // 大厅
    feats.push({
      id: nid('B05', floor, 'room'), type: 'room', buildingId: 'B05', floor,
      polygon: [[b5.ox + 2, b5.oy + 2], [b5.ox + b5.W - 2, b5.oy + 2],
                [b5.ox + b5.W - 2, b5.oy + 45], [b5.ox + 2, b5.oy + 45]],
      roomNo: `${floor}-HALL`, name: '比赛大厅', area: (b5.W - 4) * 43
    });
    // 远端车间（距出口 > 30m，且 25m 内无灭火器）
    feats.push({
      id: nid('B05', floor, 'room'), type: 'room', buildingId: 'B05', floor,
      polygon: [[b5.ox + 2, b5.oy + 47], [b5.ox + 24, b5.oy + 47],
                [b5.ox + 24, b5.oy + 68], [b5.ox + 2, b5.oy + 68]],
      roomNo: `${floor}-W01`, name: '远端实训车间', area: 22 * 21
    });
    feats.push({
      id: nid('B05', floor, 'stair'), type: 'stair', buildingId: 'B05', floor,
      x: b5.ox + b5.W - 6, y: b5.oy + b5.D - 2, w: 3.2, d: 2.4, stairNo: `${floor}-S1`
    });
    // 出口集中在大厅南墙，远端车间（北端）距出口 > 30m → R03
    for (let i = 0; i < 3; i++) {
      feats.push({
        id: nid('B05', floor, 'exit'), type: 'exit', buildingId: 'B05', floor,
        x: b5.ox + 15 + i * 28, y: b5.oy + 22,
        exitNo: `${floor}-E${i + 1}`, width: 1.4, outside: false
      });
    }
    // 仅大厅放 2 个灭火器，远端车间无灭火器材 → 也会触发覆盖盲区
    feats.push(
      { id: nid('B05', floor, 'ext'), type: 'extinguisher', buildingId: 'B05', floor, x: b5.ox + 10, y: b5.oy + 10, code: `MF-B05-${f}-1`, capacity: 5 },
      { id: nid('B05', floor, 'ext'), type: 'extinguisher', buildingId: 'B05', floor, x: b5.ox + b5.W - 10, y: b5.oy + 10, code: `MF-B05-${f}-2`, capacity: 5 }
    );
    // 整层无摄像头 → 监控盲区
    push(`B05-${floor}`, 'B05', b5.name, floor, feats);
    if (f === 1) push('B05-building', 'B05', b5.name, 'F01', [b5Outline]);
  }

  // 消防通道
  push('CAMPUS-lanes', 'CAMPUS', '校园总平', 'F01', genFireLanes());

  return {
    batchId: `BATCH-${new Date().toISOString().slice(0, 10)}-01`,
    generatedAt: new Date().toISOString(),
    drawings,
    features: all
  };
}
