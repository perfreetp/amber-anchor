# 宗海图矢量编辑与出图系统

面向县自然资源和规划局用海审核人员的海域使用权宗海图编辑平台。
技术栈：**Svelte 5（runes）+ Canvas2D 矢量编辑 + three.js 斜视预览 + Vite**，无后端依赖，业务数据保存在浏览器内存中（示例数据开箱即用）。

## 启动

```bash
npm install
npm run dev      # 开发：http://127.0.0.1:5173
npm test         # 30 个几何/业务单元测试
npm run build    # 生产构建到 dist/
```

## 功能与操作对照

| 需求 | 实现位置 | 操作方式 |
| --- | --- | --- |
| 宗海/界址点/用海类型图层 | `LeftPanel.svelte` | 左侧图层开关，用海类型按 8 类国标色着色 |
| 海岸线/航道/养殖区/锚地底图 | `sample-data.js` + `CanvasEditor` 渲染 | 图层开关控制显隐 |
| 节点级编辑 | `CanvasEditor.svelte`、`store.svelte.js` | 拖动界址点移动单点；拖动边线整体平移两端；双击/右键边线插点；Del 删点；右侧界址点表可输坐标 |
| 框选相邻宗海合并 | 工具栏「框选宗海」→ 拖矩形 →「合并框选宗海」 | `geometry.mergePolygons`，要求共边（2 个接合点），含包含关系转孔洞，合并后自相交自动放弃 |
| 沿航道/岸线切割 | 工具栏对应按钮（先选中宗海） | `splitPolygonByPolyline` 提取面内折线段并拆环，面积严格守恒，新宗海自动建工单 |
| 直线切割 | 工具栏「直线切割」，单击定两点 | `splitPolygonByLine`，交点自动插入外轮廓 |
| 扣除航道/锚地形成孔洞 | 工具栏扣减按钮，锚地需点击面 | 完全落在轮廓内→加孔洞；贯穿边界→提示改走切割，防止生成无效几何 |
| 自相交标红+阻止提交 | `polygonIssues` 实时派生；`submitQc` 门禁 | 画布红圈标记交点、左侧列表 ⚠、右侧明细，提交按钮被拦截并 Toast 提示 |
| 15px 吸附 | `snapping.js` | 勾选吸附后，界址点吸岸线拐点/相邻宗海顶点，边线整体吸航道中心线，画布显示吸附标记 |
| 撤销重做 50 步 | `history.js` | Ctrl+Z / Ctrl+Y，工具栏显示栈深度，每步带动作描述 |
| three.js 斜视预览 | `ThreePreview.svelte` | ExtrudeGeometry 按用海高程拉伸（孔洞贯通），正交相机可旋转/缩放/自动旋转，点柱体选中宗海 |
| 接单→分派→质检→打回 | `WorkflowPanel.svelte` 四个页签 | 登记生成草稿宗海+工单；分派给 4 位师傅；质检合格/填原因打回；返工后重新提交 |
| 完成量/返工率看板 | 看板页签 | KPI、阶段分布条形图、师傅工作量与返工率 |
| 1:5000 出图 | `export.js` | 导出 SVG（mm 单位、图廓、标题栏、孔洞虚线、J/K 点号）+ 界址点坐标表 CSV |
| 闭合差超 1 m² 单列 | 导出前弹窗 | 线性闭合差=首尾点距，面积闭合差=0.5×线性闭合差×平均边长；超差宗海红行列出并在 SVG 描红 |

## 目录结构

```
src/
  lib/
    geometry.js          # 纯几何算法（相交/合并/切割/孔洞/缓冲带/闭合差），全部有单测
    snapping.js          # 顶点与航道中心线吸附
    history.js           # 50 步撤销重做栈
    sample-data.js       # 海岸线、航道、锚地、养殖区、初始宗海、师傅、工单
    store.svelte.js      # 全局状态与全部业务动作（Svelte 5 runes class）
    export.js            # 1:5000 SVG 与坐标表 CSV 导出
    CanvasEditor.svelte  # Canvas2D 画布：相机、命中、拖动、框选、切割交互
    ThreePreview.svelte  # three.js 斜视拉伸预览
    Toolbar/LeftPanel/RightPanel/WorkflowPanel/NoticeToast.svelte
  App.svelte
```

## 几何口径

- 平面坐标单位为米，环采用隐式闭合（末点不重复首点），外环 CCW、孔洞 CW 由算法保证。
- 面积用鞋带公式，净面积 = 外环面积 − 孔洞面积。
- 自相交按非相邻边严格求交（平行/共线不算），蝴蝶结等病态轮廓实时检出。
- 切割后面积守恒误差为 0（同一组顶点重新组环），见 `geometry.test.js`。
