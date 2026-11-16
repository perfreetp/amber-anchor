// 基于 Chrome DevTools Protocol 的端到端冒烟（Node 内置 WebSocket/fetch，无第三方依赖）
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, readdirSync, statSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'
import net from 'node:net'
import path from 'node:path'

const log = (...a) => console.log('[e2e]', ...a)
log('脚本启动')

const DOWNLOAD_DIR = path.resolve('./test-downloads')
mkdirSync(DOWNLOAD_DIR, { recursive: true })

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9222
const URL = 'http://127.0.0.1:5173/'
const PROFILE = './.chrome-profile'

// 前置清理：仅清理占用本测试 profile 的残留实例（不动用户日常 Chrome）
try {
  const out = spawnSync('wmic', ['process', 'where', "name='chrome.exe'", 'get', 'processid,commandline'])
  const text = out.stdout?.toString() || ''
  for (const line of text.split('\n')) {
    if (!line.includes(PROFILE)) continue
    const m = line.match(/(\d+)\s*$/)
    if (m) {
      try { process.kill(Number(m[1]), 'SIGKILL') } catch { /* 已退出 */ }
    }
  }
  await sleep(400)
} catch { /* 无残留时忽略 */ }
rmSync(PROFILE, { recursive: true, force: true })
mkdirSync(PROFILE, { recursive: true })

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${PROFILE}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1600,1000',
  'about:blank',
])

async function waitPort() {
  for (let i = 0; i < 60; i++) {
    try {
      await new Promise((res, rej) => {
        const s = net.connect(PORT, '127.0.0.1')
        s.on('connect', () => s.end(res()))
        s.on('error', rej)
      })
      return
    } catch {
      await sleep(250)
    }
  }
  throw new Error('chrome devtools port not ready')
}
await waitPort()
log('Chrome 调试端口就绪')

const tabs = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()
const page = tabs.find((t) => t.type === 'page')

const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((res, rej) => {
  ws.onopen = res
  ws.onerror = rej
})
log('CDP WebSocket 已连接')
let msgId = 0
const pending = new Map()
const consoleErrors = []
const pageErrors = []
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id)
    pending.delete(m.id)
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result)
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    consoleErrors.push(m.params.args.map((a) => a.value || a.description).join(' '))
  }
  if (m.method === 'Runtime.exceptionThrown') {
    pageErrors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text)
  }
  // 自动接管 confirm/alert 对话框，否则会阻塞执行上下文导致后续求值挂起
  if (m.method === 'Page.javascriptDialogOpening') {
    send('Page.handleJavaScriptDialog', { accept: true }).catch(() => {})
  }
}
function send(method, params = {}) {
  const id = ++msgId
  ws.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
}
await send('Runtime.enable')
await send('Page.enable')
// 新版 Chrome 下载行为归 Browser 域：连浏览器级 WS 配置下载目录
const verInfo = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()
const browserWs = new WebSocket(verInfo.webSocketDebuggerUrl)
await new Promise((res, rej) => {
  browserWs.onopen = res
  browserWs.onerror = rej
})
let bId = 0
const bPending = new Map()
browserWs.onmessage = (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && bPending.has(m.id)) {
    const { resolve, reject } = bPending.get(m.id)
    bPending.delete(m.id)
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result)
  }
}
function bsend(method, params = {}) {
  const id = ++bId
  browserWs.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => bPending.set(id, { resolve, reject }))
}
await bsend('Browser.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath: DOWNLOAD_DIR.replace(/\\/g, '/'),
  eventsEnabled: false,
})
await send('Page.navigate', { url: URL })
await sleep(2500)

const results = []
const watchdog = setTimeout(() => {
  console.error('全局超时 75s，强制结束')
  try { chrome.kill() } catch { /* ignore */ }
  process.exit(2)
}, 75000)
watchdog.unref?.()
const withTimeout = (p, ms, name) =>
  Promise.race([
    p,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`${name} 步骤超时(${ms}ms)`)), ms)),
  ])
async function check(name, fn) {
  try {
    await withTimeout(fn(), 12000, name)
    results.push(['PASS', name])
  } catch (e) {
    results.push(['FAIL', `${name} — ${e.message}`])
  }
}
async function evalJs(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
  return r.result.value
}
async function click(selector) {
  const ok = await evalJs(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)})
    if (!el) return false
    el.click()
    return true
  })()`)
  if (!ok) throw new Error(`selector not found: ${selector}`)
}
async function mouse(type, x, y) {
  await send('Input.dispatchMouseEvent', {
    type, x, y, button: 'left',
    buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1,
  })
}
// React 受控组件必须用原生 value setter 再派发 input 事件，否则状态不更新
async function setValue(selector, value) {
  await evalJs(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)})
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(proto, 'value').set
    setter.call(el, ${JSON.stringify(value)})
    el.dispatchEvent(new Event('input', { bubbles: true }))
  })()`)
}

log('阶段'+1)
// $n. 项目列表：排序 & 标红
await check('项目列表含3个种子项目并按截止时间升序', async () => {
  const rows = await evalJs(`[...document.querySelectorAll('.project-table tbody tr')].map(tr => tr.querySelector('.cell-name')?.textContent)`)
  if (rows.length !== 3) throw new Error(`rows=${rows.length}`)
  const dates = await evalJs(`[...document.querySelectorAll('.project-table tbody tr td:nth-child(4)')].map(td => td.textContent.trim())`)
  const ts = dates.map((s) => new Date(s.replace('临近', '').trim()).getTime())
  if (ts[0] > ts[1] || ts[1] > ts[2]) throw new Error('未按截止时间升序')
})
await check('返工>3的项目行标红', async () => {
  if (!(await evalJs(`!!document.querySelector('.project-table tr.row-rework .text-rework')`))) {
    throw new Error('未找到标红行')
  }
})

log('阶段'+2)
// $n. 打开项目 & 画布渲染
await check('打开项目进入编辑器，画布已绘制地面', async () => {
  await click('.project-table tbody tr .btn')
  await sleep(900)
  const w = await evalJs(`(async () => {
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    const c = document.querySelector('.stage-canvas')
    const cx = Math.floor(c.width / 2), cy = Math.floor(c.height / 2)
    const d = c.getContext('2d').getImageData(cx - 4, cy - 4, 9, 9).data
    let opaque = 0
    for (let i = 3; i < d.length; i += 4) if (d[i] > 0) opaque++
    // 全画布不透明像素包围盒（诊断用）
    const all = c.getContext('2d').getImageData(0, 0, c.width, c.height).data
    let minX = c.width, minY = c.height, maxX = 0, maxY = 0, count = 0
    for (let y = 0; y < c.height; y += 2)
      for (let x = 0; x < c.width; x += 2) {
        if (all[(y * c.width + x) * 4 + 3] > 0) {
          count++; minX = Math.min(minX, x); maxX = Math.max(maxX, x)
          minY = Math.min(minY, y); maxY = Math.max(maxY, y)
        }
      }
    // 在不透明内容的几何中心再取一次样（场地菱形中心，而非画布中心）
    const gx = Math.floor((minX + maxX) / 2), gy = Math.floor((minY + maxY) / 2)
    const gd = c.getContext('2d').getImageData(gx - 4, gy - 4, 9, 9).data
    let gOpaque = 0
    for (let i = 3; i < gd.length; i += 4) if (gd[i] > 0) gOpaque++
    return { w: c.width, h: c.height, opaque, count, gOpaque, box: [minX, minY, maxX, maxY] }
  })()`)
  if (w.w < 800 || w.h < 500) throw new Error(`canvas 尺寸异常 ${w.w}x${w.h}`)
  if (w.count === 0) throw new Error('整张画布全透明，渲染未执行')
  // 画布中心或场地中心任一有不透明像素即视为地面已绘制
  if (w.opaque === 0 && w.gOpaque === 0) {
    throw new Error(`中心与场地中心均全透明；不透明包围盒=${JSON.stringify(w.box)}`)
  }
})

log('阶段'+3)
// $n. 物件库四类 & 添加
await check('物件库含帐篷/器材/看台/指示牌', async () => {
  const btns = await evalJs(`[...document.querySelectorAll('.palette-item .palette-name')].map(e => e.textContent)`)
  for (const name of ['帐篷', '器材', '看台', '指示牌']) {
    if (!btns.includes(name)) throw new Error(`缺少物件 ${name}`)
  }
})
await check('逐个添加4类物件并写入项目数据', async () => {
  const count = await evalJs(`(async () => {
    for (const b of document.querySelectorAll('.palette-item')) b.click()
    await new Promise(r => setTimeout(r, 200))
    const ps = JSON.parse(localStorage.getItem('sportsvenue.projects.v1'))
    return Math.max(...ps.map(p => p.items.length))
  })()`)
  if (count < 4) throw new Error(`物件数=${count}`)
})

log('阶段'+4)
// $n. 画面非空
await check('画布有实体内容（非背景像素占比>5%）', async () => {
  const stat = await evalJs(`(() => {
    const c = document.querySelector('.stage-canvas')
    const img = c.getContext('2d').getImageData(0, 0, c.width, c.height).data
    let nonBg = 0, total = 0
    for (let i = 0; i < img.length; i += 4 * 97, total++) {
      if (!(img[i] > 215 && img[i + 1] > 225 && img[i + 2] > 205)) nonBg++
    }
    return nonBg / total
  })()`)
  if (stat < 0.05) throw new Error(`非背景占比仅 ${(stat * 100).toFixed(1)}%`)
})

log('阶段'+5)
// $n. 鼠标框选不报错
await check('鼠标按下/拖动/释放（拾取与框选）无页面异常', async () => {
  const [lx, ly] = await evalJs(`(() => { const r = document.querySelector('.stage-canvas').getBoundingClientRect(); return [r.left, r.top] })()`)
  await mouse('mousePressed', lx + 480, ly + 280)
  await mouse('mouseMoved', lx + 720, ly + 460)
  await mouse('mouseReleased', lx + 720, ly + 460)
  await sleep(300)
  if (pageErrors.length) throw new Error(pageErrors[0])
})

log('阶段'+6)
// $n. 图层栏
await check('图层栏4个复选框且可切换显隐', async () => {
  await evalJs(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('图层')).click()`)
  await sleep(150)
  if ((await evalJs(`document.querySelectorAll('.layers input[type=checkbox]').length`)) !== 4) throw new Error('图层复选框数量异常')
  await evalJs(`document.querySelector('.layers input[type=checkbox]').click()`)
  await sleep(300)
  const off = await evalJs(`document.querySelectorAll('.layer-row.off').length`)
  if (off < 1) throw new Error('隐藏状态未生效')
  await evalJs(`document.querySelector('.layers input[type=checkbox]').click()`)
})

log('阶段'+7)
// $n. 物料表 + 导出按钮
await check('物料汇总表有数据行且导出按钮齐全', async () => {
  await evalJs(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('物料')).click()`)
  await sleep(200)
  if ((await evalJs(`document.querySelectorAll('.material-table tr').length`)) < 2) throw new Error('物料表无数据')
  const btns = await evalJs(`[...document.querySelectorAll('.export-bar .btn')].map(b => b.textContent)`)
  if (!btns.some((b) => b.includes('PNG')) || !btns.some((b) => b.includes('CSV'))) throw new Error('导出按钮缺失')
})

log('阶段'+8)
// $n. 审核流
await check('提交审核生成版本快照', async () => {
  await evalJs(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('审核')).click()`)
  await sleep(150)
  await setValue('.submit-box textarea', 'e2e 提交说明')
  await evalJs(`document.querySelector('.submit-box .btn.primary').click()`)
  await sleep(400)
  if ((await evalJs(`document.querySelectorAll('.version-card').length`)) < 1) throw new Error('未生成版本卡片')
})
await check('退回返工：意见挂到具体版本且返工计数+1', async () => {
  const beforeCount = await evalJs(`(() => {
    const ps = JSON.parse(localStorage.getItem('sportsvenue.projects.v1'))
    // 当前打开的项目：取最近提交过版本的那个
    const p = ps.filter((x) => x.versions.length > 0).sort((a, b) =>
      b.versions[b.versions.length - 1].ts - a.versions[a.versions.length - 1].ts)[0]
    return p.reworkCount
  })()`)
  await setValue('.opinion-box textarea', '帐篷间距不足，请调整')
  await evalJs(`[...document.querySelectorAll('.version-actions .btn.danger')][0].click()`)
  await sleep(500)
  const rv = await evalJs(`document.querySelector('.review-list .rv-bad .review-opinion')?.textContent || ''`)
  if (!rv.includes('帐篷间距')) throw new Error('审核意见未挂到版本')
  const afterCount = await evalJs(`(() => {
    const ps = JSON.parse(localStorage.getItem('sportsvenue.projects.v1'))
    const p = ps.filter((x) => x.versions.length > 0).sort((a, b) =>
      b.versions[b.versions.length - 1].ts - a.versions[a.versions.length - 1].ts)[0]
    // 审核意见挂在具体版本上：在该项目全部版本的 reviews 中查找
    const allReviews = p.versions.flatMap((v) => v.reviews || [])
    const hit = allReviews.find((r) => r.opinion && r.opinion.includes('帐篷间距'))
    return { count: p.reworkCount, status: p.status, hasOpinion: !!hit, result: hit?.result }
  })()`)
  if (afterCount.count !== beforeCount + 1) {
    throw new Error(`返工计数未增加: ${beforeCount} -> ${afterCount.count}`)
  }
  if (afterCount.status !== 'rework') throw new Error(`状态未变为 rework: ${afterCount.status}`)
  if (!afterCount.hasOpinion) throw new Error('版本快照上的审核意见缺失')
  if (afterCount.result !== 'rework') throw new Error(`审核结果标记异常: ${afterCount.result}`)
})

log('阶段'+9)
// 9. 导出：拦截下载锚点，直接校验生成的数据内容（无头下载管线不稳定，不依赖落盘）
await check('PNG 导出产生有效 dataURL，CSV 导出产生含表头的 Blob', async () => {
  await evalJs(`(() => {
    window.__captured = []
    const origClick = HTMLAnchorElement.prototype.click
    HTMLAnchorElement.prototype.click = function () {
      window.__captured.push({ name: this.download, href: this.href })
    }
  })()`)
  await evalJs(`[...document.querySelectorAll('.export-bar .btn')].find(b => b.textContent.includes('PNG')).click()`)
  await evalJs(`[...document.querySelectorAll('.export-bar .btn')].find(b => b.textContent.includes('CSV')).click()`)
  await sleep(300)
  if (pageErrors.length) throw new Error(pageErrors[0])
  const cap = await evalJs(`window.__captured`)
  const png = cap.find((c) => c.name.endsWith('.png'))
  const csv = cap.find((c) => c.name.endsWith('.csv'))
  if (!png) throw new Error('未触发 PNG 下载锚点')
  if (!csv) throw new Error('未触发 CSV 下载锚点')
  if (!png.href.startsWith('data:image/png;base64,')) throw new Error('PNG 不是有效 dataURL')
  // base64 解码后应为 PNG 签名
  const b64 = png.href.split(',')[1]
  const bin = atob(b64).slice(0, 8)
  const sig = [...bin].map((ch) => ch.charCodeAt(0))
  const isPng = sig[0] === 0x89 && sig[1] === 0x50 && sig[2] === 0x4e && sig[3] === 0x47
  if (!isPng) throw new Error('PNG 签名校验失败')
  if (b64.length < 2000) throw new Error(`PNG 数据过小: ${b64.length}`)
  if (!csv.href.startsWith('blob:')) throw new Error('CSV 未走 Blob 导出')
})

log('阶段'+10)
// 10. 冲突检测：注入重叠布置重开
await check('重叠布置产生冲突角标与冲突卡片', async () => {
  await evalJs(`(() => {
    const key = 'sportsvenue.projects.v1'
    const ps = JSON.parse(localStorage.getItem(key))
    const p = ps.find((x) => x.versions.length > 0)
    p.name = 'E2E冲突验证项目'
    p.items = [
      { id: 't1', type: 'tent', name: '帐篷', x: 20, y: 18, z: 0, rotation: 0, scale: 1, w: 4, d: 4, h: 2.8, label: '' },
      { id: 't2', type: 'tent', name: '帐篷', x: 21, y: 18, z: 0, rotation: 0, scale: 1, w: 4, d: 4, h: 2.8, label: '' },
    ]
    p.status = 'rework'
    localStorage.setItem(key, JSON.stringify(ps))
  })()`)
  await send('Page.reload', { ignoreCache: true })
  await sleep(1800)
  // 按注入的唯一名称精确打开
  await evalJs(`(() => {
    const rows = [...document.querySelectorAll('.project-table tbody tr')]
    const target = rows.find((tr) => tr.querySelector('.cell-name')?.textContent.includes('E2E冲突验证项目'))
    if (!target) throw new Error('找不到注入项目')
    target.querySelector('.btn').click()
  })()`)
  await sleep(1200)
  const badge = await evalJs(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('冲突')).textContent`)
  if (!badge.includes('1')) throw new Error(`冲突角标异常: ${badge}`)
  // 切到冲突 tab 才会渲染冲突卡片
  await evalJs(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('冲突')).click()`)
  await sleep(300)
  if ((await evalJs(`document.querySelectorAll('.conflict-card').length`)) < 1) throw new Error('冲突卡片缺失')
})

log('阶段'+11)
// $n. 放行后只读
await check('审核通过后画布进入只读并显示横幅', async () => {
  await evalJs(`[...document.querySelectorAll('.tab')].find(t => t.textContent.includes('审核')).click()`)
  await sleep(150)
  const hasApprove = await evalJs(`!!document.querySelector('.version-actions .btn.ok')`)
  if (hasApprove) {
    await evalJs(`document.querySelector('.version-actions .btn.ok').click()`)
    await sleep(400)
  }
  const banner = await evalJs(`!!document.querySelector('.readonly-banner')`)
  if (!banner) throw new Error('放行后未出现只读横幅')
})

console.log('\n==== E2E 结果 ====')
let fails = 0
for (const [s, n] of results) {
  if (s === 'FAIL') fails++
  console.log(`${s}  ${n}`)
}
console.log(`\nconsole errors: ${consoleErrors.length}`)
consoleErrors.slice(0, 5).forEach((e) => console.log('  -', e.split('\n')[0]))
console.log(`page exceptions: ${pageErrors.length}`)
pageErrors.slice(0, 5).forEach((e) => console.log('  -', e.split('\n')[0]))

ws.close()
try { browserWs.close() } catch { /* ignore */ }
chrome.kill()
clearTimeout(watchdog)
process.exit(fails ? 1 : 0)
