// 视觉验证：圈选→分块→切到各视图截图
const list = await (await fetch('http://127.0.0.1:9222/json')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
}
const send = (method, params = {}) => new Promise((r) => { const mid = ++id; pending.set(mid, r); ws.send(JSON.stringify({ id: mid, method, params })) })
await send('Runtime.enable'); await send('Page.enable')
const evalJs = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const click = async (x, y) => {
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
}
await sleep(1000)
await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("圈选范围")).click()`)
await sleep(200)
const rect = await evalJs(`(()=>{const r=document.querySelector(".terrain-wrap canvas").getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})()`)
const pts = [[0.44, 0.46], [0.58, 0.44], [0.60, 0.60], [0.52, 0.68], [0.42, 0.60]]
for (const [fx, fy] of pts) await click(rect.x + rect.w * fx, rect.y + rect.h * fy)
await sleep(200)
await send('Input.dispatchKeyEvent', { type: 'keyPressed', modifiers: 8, key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await click(rect.x + rect.w * pts[0][0], rect.y + rect.h * pts[0][1])
await send('Input.dispatchKeyEvent', { type: 'keyReleased', key: 'Shift', code: 'ShiftLeft', windowsVirtualKeyCode: 16 })
await sleep(1000)
const units = await evalJs(`[...document.querySelectorAll(".small")].map(e=>e.textContent).find(t=>t.includes("单元"))`)
console.log('圈选:', units)

// 坡度模式截图
await evalJs(`[...document.querySelectorAll(".seg button")].find(b=>b.textContent.includes("坡度分级")).click()`)
await sleep(600)
let shot = await send('Page.captureScreenshot', { format: 'png' })
const { writeFileSync, mkdirSync } = await import('node:fs')
mkdirSync('scripts/shots', { recursive: true })
writeFileSync('scripts/shots/1-slope-3d.png', Buffer.from(shot.data, 'base64'))

// 摊平下料图
await evalJs(`[...document.querySelectorAll(".tabs button")].find(b=>b.textContent.includes("摊平下料图")).click()`)
await sleep(900)
shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('scripts/shots/2-nesting.png', Buffer.from(shot.data, 'base64'))

// 拼缝表
await evalJs(`[...document.querySelectorAll(".tabs button")].find(b=>b.textContent.includes("拼缝对应")).click()`)
await sleep(400)
shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('scripts/shots/3-seams.png', Buffer.from(shot.data, 'base64'))

// 批次复核
await evalJs(`[...document.querySelectorAll(".topbar .btn")].find(b=>b.textContent.includes("提交批次检查")).click()`)
await sleep(700)
shot = await send('Page.captureScreenshot', { format: 'png' })
writeFileSync('scripts/shots/4-review.png', Buffer.from(shot.data, 'base64'))
console.log('截图已保存到 scripts/shots/')
process.exit(0)
