# 校运会场地三维布置编辑器

体育部建项目下单、制作员在等轴测场地上布置物件、保障处主管审核放行后导出俯视图与物料清单的 Web 编辑器。
技术栈：**React 19 + Canvas2D + OffscreenCanvas（2:1 等轴测）+ Vite**，无第三方图形/状态库。

## 启动

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # 生产构建
node test/smoke.test.js   # 引擎数学/碰撞冒烟测试
node test/e2e.cdp.mjs     # 无头 Chrome 端到端（需先 npm run dev）
```

数据持久化在浏览器 `localStorage`（key：`sportsvenue.projects.v1`），首次打开带 3 个演示工单。

## 功能与实现对照

| 需求 | 实现位置 |
| --- | --- |
| 等轴测投影（2:1）、屏幕/世界坐标互逆 | `src/engine/isoMath.js` `project/screenToWorld` |
| 地面 0.5m 网格 + 跑道分道线/起止线 | `renderer.js` `drawGround/drawTrack`（stadium 多边形） |
| 物件深度排序、正确遮挡 | `isoMath.js` `depthKey`（底盘最大 x+y），引擎与图块均按此排序，动态物件按深度插回 |
| 帐篷/器材/看台/指示牌四类造型 | `renderer.js` `drawItem`（锥顶帐篷、阶梯看台、立杆指示牌、捆扎器材箱） |
| 像素命中拾取 | `picker.js`：离屏画布按颜色编码物件 ID，`getImageData` 读像素；手柄圆形优先命中 |
| 移动/旋转/45°步进/缩放手柄 | `renderer.js` `drawSelection` + `editorEngine.js` 状态机 |
| 拖动轴向约束 | `editorEngine.onMove`：位移超 0.6m 阈值后锁定主轴 |
| 松手吸附 0.5m 网格、底盘贴地 | `onUp` 中 `snap()` + `z=0` |
| 包围盒相交描红 + 侧栏冲突对 | `conflict.js`（OBB SAT 分离轴检测）+ `ConflictPanel.jsx` |
| 框选批量整体挪动 | `picker.pickRect` 选框采样 + 多选组共用 `drag.starts` |
| OffscreenCanvas 图块缓存，只重绘变动区 | `tileCache.js`：256px 图块，按物件屏幕 AABB 失效脏块重绘 |
| 图层按类型隐藏 | `LayersPanel.jsx` + 引擎 `setVisible`（隐藏即退出选中与冲突计算） |
| 正交俯视导出 PNG | `renderer.js` `renderTopDown` + `exporter.exportPNG` |
| 按类型汇总物料 CSV | `exporter.buildMaterialRows/exportCSV`（含 BOM 表头、合计） |
| 项目按截止时间排序、返工 >3 标红 | `storage.sortProjects` + `ProjectList.jsx` |
| 审核意见挂具体版本 | `App.jsx` 版本快照 `versions[].reviews[]`，`ReviewPanel.jsx` |
| 放行后只读 | 项目 `status==='approved'` 时引擎 `setReadOnly(true)` |

## 架构

```
src/
  engine/                纯逻辑与 Canvas 渲染（不依赖 React）
    isoMath.js           等轴测数学、OBB 碰撞、AABB、吸附
    catalog.js           四类物件目录与工厂
    renderer.js          等轴测场景/物件/手柄 + 正交俯视图
    picker.js            像素级命中与框选
    tileCache.js         OffscreenCanvas 图块缓存
    conflict.js          冲突对计算
    exporter.js          PNG / CSV 导出
    editorEngine.js      交互状态机、相机、渲染调度
    storage.js           工单/版本/审核持久化与种子数据
  components/            React UI（项目列表、物件库、图层、冲突、物料、审核）
```

### 渲染与缓存策略

- 静态层（地面 + 未变动物件）绘入 256px 的 `OffscreenCanvas` 图块；相机变化时整体重建。
- 拖动/旋转/缩放期间，变动物件从缓存剔除改为动态层绘制，并按其**新旧屏幕 AABB** 仅失效覆盖到的图块，松手后全量失效一次。
- 动态物件不直接盖在最上层，而是带深度键插回绘制序列，保证拖过其他物件前后时遮挡关系仍然正确。

### 交互状态机

`idle / pan / marquee / drag / rotate / step45 / scale`，鼠标事件在 `editorEngine.js` 内闭环；
React 只负责把引擎 `emit` 的状态投影到侧栏，并在内容签名变化时写回 `localStorage`。
