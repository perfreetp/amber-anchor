// 基于 CDP 的交互冒烟测试：圈选→偏移→分块→检查→复核→导出
const base = 'http://127.0.0.1:9222'

async function cdp() {
  const list = await (await fetch(base + '/json')).json()
  const page = list.find((t) => t.type === 'page')
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
  }
  const send = (method, params = {}) =>
    new Promise((r) => { const mid = ++id; pending.set(mid, r); ws.send(JSON.stringify({ id: mid, method, params })) })
  await send('Runtime.enable')
  const evalJs = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error('JS异常: ' + JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails.text))
    return r.result.value
  }
  return { send, evalJs, close: () => ws.close() }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const c = await cdp()
const { evalJs } = c

// 等 React 挂载
await sleep(1500)
const title = await evalJs('document.querySelector(".brand").textContent')
console.log('1) 应用挂载:', title.trim().slice(0, 20))

// 切到圈选工具并在画布上模拟点击 5 个点（工具栏第一个 seg：视角0/圈选1/样条2）
await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("圈选范围")).click()`)
await sleep(200)
const toolOn = await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("圈选范围")).className`)
console.log('2) 圈选工具激活:', toolOn.includes('on'))
const rect = await evalJs(`(()=>{const r=document.querySelector(".terrain-wrap canvas").getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})()`)
console.log('   画布尺寸:', rect.w, 'x', rect.h)

async function click(cx, cy, shift = false) {
  if (shift) await c.send('Input.dispatchKeyEvent', { type: 'keyPressed', modifiers: 8, key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
  await c.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: cx, y: cy, button: 'left', clickCount: 1, modifiers: shift ? 8 : 0 })
  await c.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: cx, y: cy, button: 'left', clickCount: 1, modifiers: shift ? 8 : 0 })
  if (shift) await c.send('Input.dispatchKeyEvent', { type: 'keyReleased', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
}
// 射线扫描找出能命中地形的屏幕点，再选 5 个围成区域的点做圈选
const hitPts = await evalJs(`(() => {
  const cv = document.querySelector(".terrain-wrap canvas");
  const r = cv.getBoundingClientRect();
  const out = [];
  for (let fy = 0.28; fy <= 0.75; fy += 0.04) {
    for (let fx = 0.36; fx <= 0.64; fx += 0.04) {
      const ev = new PointerEvent('pointerdown', { clientX: r.x + r.width * fx, clientY: r.y + r.height * fy, bubbles: true });
      // 直接借助 React 事件不可行，改用合成事件标记测试
      out.push([fx, fy]);
    }
  }
  return out;
})()`)
// 用真实 CDP 点击探测命中（命中地形会追加黄色界址点，通过覆盖层 GL 点不可直接查 DOM，
// 改为：先点 4 个候选点，再用单元数判断整体是否落在地形上）
const probe = async (pts4) => {
  for (const [fx, fy] of pts4) await click(rect.x + rect.w * fx, rect.y + rect.h * fy)
  await sleep(250)
  const n = await evalJs(`[...document.querySelectorAll(".small")].map(e=>e.textContent).find(t=>t.includes("单元")) || ""`)
  const m = n.match(/(\d+)\s*个单元/)
  return m ? Number(m[1]) : 0
}
// 先重置：切回视角再切圈选，清空草稿
await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("视角")).click()`)
await sleep(100)
await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("圈选范围")).click()`)
await sleep(100)
// 地形在屏幕中央（x≈0.36–0.64, y≈0.35–0.72），直接在该区域内取五点
const pts = [
  [0.44, 0.46], [0.58, 0.44], [0.60, 0.60], [0.52, 0.68], [0.42, 0.60],
]
const hit = await probe(pts)
console.log('3) 五点圈选命中单元:', hit)
if (!hit) { console.log('!! 圈选未命中地形，终止'); c.close(); process.exit(1) }
// Shift+点击首点闭合
await click(rect.x + rect.w * pts[0][0], rect.y + rect.h * pts[0][1], true)
await sleep(700)
const unitText = await evalJs(`[...document.querySelectorAll(".small")].map(e=>e.textContent).find(t=>t.includes("单元")) || "无"`)
console.log('   闭合后:', unitText)

// 调厚度滑块到较大值制造自交（按标签定位）
await evalJs(`(()=>{
  const lab=[...document.querySelectorAll(".field")].find(e=>e.textContent.includes("等距内偏厚度"));
  const sl=lab.querySelector('input[type=range]');
  const set=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  set.call(sl, 2.6); sl.dispatchEvent(new Event('input',{bubbles:true}));
})()`)
await sleep(400)
const hud = await evalJs(`document.querySelector(".hud").innerText.replace(/\\n/g,' | ')`)
console.log('4) HUD 状态:', hud.slice(0, 140))

// 提交批次
await evalJs(`[...document.querySelectorAll(".topbar .btn")].find(b=>b.textContent.includes("提交批次检查")).click()`)
await sleep(600)
const reviewText = await evalJs(`document.querySelector(".review-summary")?.innerText.replace(/\\n/g,' ') || "无复核面板"`)
console.log('5) 批次复核:', reviewText)
if (!reviewText.includes('PC-')) { console.log('!! 批次未创建，终止后续步骤'); c.close(); process.exit(1) }

// 逐条处理：全部驳回（验证放行路径）
const issueCount = await evalJs(`document.querySelectorAll(".issue").length`)
console.log('6) 问题条数:', issueCount)
// 批量驳回（误报）→ 放行
await evalJs(`[...document.querySelectorAll(".review-foot .btn")].find(b=>b.textContent.includes("全部驳回")).click()`)
await sleep(400)
const state = await evalJs(`document.querySelector(".batch-state")?.textContent || ""`)
console.log('7) 全驳回后状态:', state)
const releaseDisabled = await evalJs(`document.querySelector(".review-foot .btn.primary").disabled`)
console.log('8) 放行按钮可用:', !releaseDisabled)

// 放行（触发 zip 下载）
await c.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: 'C:\\\\Windows\\\\Temp\\\\trn_dl', eventsEnabled: true })
await evalJs(`document.querySelector(".review-foot .btn.primary").click()`)
await sleep(1200)
const tag = await evalJs(`document.querySelector(".tabs .tag.green")?.textContent || "无放行标记"`)
console.log('9) 放行结果:', tag)

// 切到坡度分级模式验证着色切换
await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("坡度分级")).click()`)
await sleep(400)
const legend = await evalJs(`document.querySelector(".legend")?.innerText.replace(/\\n/g,' ') || "无图例"`)
console.log('10) 坡度图例:', legend.slice(0, 80))

// 摊平图标签计数
await evalJs(`[...document.querySelectorAll(".tabs button")].find(b=>b.textContent.includes("摊平下料图")).click()`)
await sleep(400)
const nestTab = await evalJs(`document.querySelector(".tabs button.on").textContent`)
console.log('11) 下料图页签:', nestTab)

c.close()
console.log('\nCDP 交互冒烟测试完成 ✅')
process.exit(0)
