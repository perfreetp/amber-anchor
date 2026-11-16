# 冲积扇水系渠系过程式编辑器（Vue 3 + WebGPU）

面向规划院流域方案编制的过程式生成编辑器：输入扇顶位置、扇半径、纵向坡度、主河道宽度、
分汊级数与随机种子，按规则确定性长出主河道、多级分汊以及两岸干渠 / 支渠 / 斗渠；
支持节点级手改与锁定、横断面剖切、版本提交与审核批注、双版本并排对比、配置单复现与指标统计。

## 运行

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # 生产构建
npx tsc --noEmit   # 类型检查
node --experimental-vm-modules scripts/selftest.mjs   # 核心逻辑自检（先 esbuild 打包）
```

自检脚本打包方式：

```bash
npx esbuild scripts/selftest.ts --bundle --platform=node --format=esm --outfile=scripts/selftest.mjs
node scripts/selftest.mjs
```

浏览器要求：Chrome / Edge 113+，开启硬件加速（WebGPU）。不支持时页面给出明确提示。

## 功能与实现对照

| 需求 | 实现位置 | 说明 |
| --- | --- | --- |
| 六参数过程式生成 | `src/core/generator.ts` | 主河道 → 递归分汊 → 两岸干渠 → 支渠 → 斗渠 |
| 同种子同参数完全一致 | `src/core/rng.ts` | mulberry32 + 结构路径派生随机流；无全局随机状态，自检逐点比对 |
| 节点拖拽改线与锁定 | `View3D.vue` / `generator.ts` | 拖拽只改单段；锁定后重算整段及下游手改段按 id 原地保留，未锁段重排 |
| 滑块实时重算 | `src/store/editor.ts` | 120ms 防抖，重算时通过 `collectKeptReaches` 注入保留集 |
| 超 3000 段自动降精度 | `generator.ts` | 按段数预算自适应放大节点步长，保证预览精度落入 3000 段以内 |
| 水面视角高光 | `renderer/shaders.ts` | Fresnel + 镜面高光 + 确定性波纹，随相机角度变化 |
| 岸线描边 / 级别色阶 | `FanRenderer.ts` | 深色宽 ribbon 铺底；河道/干渠/支渠/斗渠四档色阶，锁定段橙色 |
| 缩小层级隐藏 | `FanRenderer.updateLOD` | 按米/像素阈值在 shader 中裁剪斗渠、支渠 |
| 任意横断面高程/水面线 | `core/profile.ts` + `ProfilePanel.vue` | 三维拉线，SVG 绘制地面线与水面线，可在剖面上打批注 |
| 版本与审核流 | `store/editor.ts` | 提交快照；审核人画面/剖面打点；制作方逐条回复、闭环 |
| 双版本对比 | `CompareView.vue` + `core/diff.ts` | 相机联动双视图，结构 id 对齐输出新增/消失/改动/偏差表 |
| 配置单导出/导入复现 | `core/configSheet.ts` | 仅含种子与参数，导入后自检段数指纹 |
| 总长与渠系密度统计 | `core/stats.ts` | 河道、渠系分项长度，密度 km/km²（按扇形面积） |

## 确定性设计要点

1. **结构 id 只描述拓扑**（如 `river:main/b0/b1`、`canal:main:L/s0/l1_R`），与种子和几何无关，
   因此锁定、对比、再生成挂接都可以稳定按 id 对齐。
2. 每个结构的随机流由 `(seed, path)` 经字符串 hash 派生，生成过程对随机流的消费顺序固定，
   不依赖 Map 迭代顺序或时间。
3. 地形是纯函数 `(params, seed, x, y) → 高程`，值噪声同样走 hash，无隐式状态。
4. 手改段在重算时以深拷贝注入保留集，未锁定段完全重新生成；父段被保留时子段首点吸附到父段锚点。

## 目录结构

```
src/
  core/        纯逻辑：随机、地形、生成器、剖面、统计、差异、配置单（无 DOM 依赖，可 Node 自检）
  renderer/    WebGPU 渲染器、WGSL 着色器、轨道相机
  store/       Vue 响应式仓库（参数、模型、版本、批注、持久化）
  components/  Vue 组件（参数面板、三维视图、剖面、审核、版本、对比）
scripts/       Node 自检脚本
```
