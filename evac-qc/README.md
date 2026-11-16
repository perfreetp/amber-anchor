# 校园疏散指示图 · 分层渲染与批次质检工具

Svelte 5 + Canvas2D + OffscreenCanvas 实现的楼栋疏散图纸分层渲染与批次质检系统。

## 启动

```bash
npm install
npm run dev        # 开发服务器
npm test           # 规则单测 + 渲染专项 + 浏览器端到端
npm run build      # 生产构建
```

## 核心能力

### 渲染（`src/lib/renderer.js` + `spatial.js`）

- **瓦片离屏预渲染**：按 2 的幂对缩放分桶（LOD），每桶以固定基准缩放把 64m×64m 瓦片绘制到 `OffscreenCanvas`（256px），主画布交互帧只 `drawImage` 视口内瓦片；LRU 缓存（默认 360 张/桶）
- **LOD 分级**：缩放低于 2× 只画简化色块与每瓦点要素数量标注（`出n 灭n 监n`）；放大到房间级（≥2×）才绘制房间编号与 `宽×深m` 尺寸标注
- **视口裁剪**：统一网格空间索引（`SpatialIndex`），平移缩放只查询/绘制视口覆盖格子内的要素，样例批次单层 1.1 万要素、全批 3 万+
- **静态跳帧**：视图签名（中心/缩放/图层/楼层/选中/闪烁）不变时跳过重绘，交互实测稳定 60 FPS（要求 ≥30）
- **交互**：拖拽平移、滚轮以光标为锚点缩放、悬停高亮并显示属性面板、单击/Shift 多选要素（包围框标出并高亮同编号关联出口）
- **定位闪烁**：质检问题点击后自动切楼层、居中并在要素上闪烁三次（1.8s）

### 图层（右侧图层树，可独立开关）

建筑轮廓、房间、楼梯、出口、灭火器、监控点位、消防通道；支持按楼层过滤。

### 质检（`src/lib/qc.js`，Worker 后台执行 `qc.worker.js`）

| 规则 | 检查项 | 严重度 |
|---|---|---|
| R01 | 楼层无出口 | 致命 |
| R02 | 出口宽度 <1.0m | 严重 |
| R03 | 房间至最近室内出口 >30m | 严重 |
| R04 | 灭火器覆盖盲区 >25m | 严重 |
| R05 | 灭火器失效（容量 0） | 致命 |
| R06 | 出口编号重复 | 严重 |
| R07 | 整层监控盲区 | 一般 |
| R08 | 消防通道宽度 <4m | 致命 |
| R09 | 室外出口距消防通道 >50m | 严重 |
| R10 | 楼梯楼层不连续 | 严重 |
| R11 | 房间缺编号 | 一般 |
| R12 | 灭火器重复摆放 <1m | 提示 |

- 问题按 **致命 / 严重 / 一般 / 提示** 分级，支持严重度与复核状态双重筛选
- 复核员逐条 **确认 / 驳回 / 重置**，状态实时汇总
- **整批达标才放行**：存在待复核 → 暂不可放行；确认了致命/严重项 → 不予放行；全部闭环且无拦截项 → 准予放行
- 导出问题清单 CSV（带 BOM，Excel 直开）与放行结论 TXT

### 导入格式

「导入图纸 JSON」接受单文件或多文件，结构为：

```json
{
  "batchId": "BATCH-...",
  "drawings": [{ "drawingId": "B01-F01", "buildingId": "B01", "buildingName": "主教学楼", "floor": "F01" }],
  "features": [
    { "id": "..", "type": "room", "buildingId": "B01", "floor": "F01",
      "polygon": [[x,y],...], "roomNo": "F01-R001", "name": "...", "area": 32.5 },
    { "id": "..", "type": "exit", "buildingId": "B01", "floor": "F01",
      "x": 12, "y": 8, "exitNo": "F01-E01", "width": 1.2, "outside": false },
    { "id": "..", "type": "extinguisher", "x": 12, "y": 8, "code": "MF-1", "capacity": 4 },
    { "id": "..", "type": "camera", "x": 12, "y": 8, "camNo": "CAM-1", "coverage": 8 },
    { "id": "..", "type": "stair", "x": 12, "y": 8, "w": 3.2, "d": 2.4, "stairNo": "F01-S1" },
    { "id": "..", "type": "fireLane", "laneNo": "L1", "width": 6, "polygon": [[x,y],...] }
  ]
}
```

也接受裸要素数组。点要素用 `x/y`，面/线要素用 `polygon`。

## 目录结构

```
src/
  lib/
    constants.js     图层/严重度/LOD 常量
    spatial.js       SpatialIndex 网格索引、PointGrid 点网格、命中检测
    renderer.js      TileRenderer 瓦片离屏渲染 + LOD + 叠加层
    qc.js            12 条质检规则与放行结论（纯函数，Worker 共用）
    qc.worker.js     质检 Worker
    sampleData.js    6 栋楼/3 万要素样例生成器（含 12 类确定性缺陷）
    store.svelte.js  全局状态（大数据非响应式，UI 状态 runes）
  components/        TopBar / QcPanel / MapCanvas / LayerTree
scripts/
  test-qc.js         规则覆盖与放行闭环单测
  test-render.js     索引/LOD/命中检测与性能专项
  e2e.mjs            Playwright 无头浏览器端到端
```

## 性能数据（本机，3 万要素批次）

- 空间索引构建 ~55ms；整批质检 ~0.4s（Worker 线程）
- 有界最近邻 ~10μs/次；视口查询只返回视口内 ~1k 要素
- 浏览器实测静止与平移缩放均 60 FPS，瓦片缓存命中后交互帧仅做 `drawImage`
