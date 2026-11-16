// 端到端验证：无头 Chrome（SwiftShader WebGL）跑完整业务流程
// 运行：node tests/e2e.mjs
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'test-results');
mkdirSync(OUT, { recursive: true });

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let BASE = '';

let passed = 0;
let failed = 0;
function check(name, cond, extra = '') {
  if (cond) {
    passed += 1;
    console.log(`  ✅ ${name}`);
  } else {
    failed += 1;
    console.error(`  ❌ ${name} ${extra}`);
  }
}

async function waitForServer(url, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error('dev server 未就绪');
}

const PORT = 5193;
const server = spawn(
  process.platform === 'win32' ? 'node_modules\\.bin\\vite.cmd' : 'node_modules/.bin/vite',
  ['--port', String(PORT), '--strictPort'],
  {
    cwd: ROOT,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);
server.stdout.on('data', (d) => {
  process.stdout.write(`[vite] ${d}`);
  const text = d.toString().replace(/\x1b\[[0-9;]*m/g, '');
  const m = /Local:\s*(https?:\/\/[^\s]+)/.exec(text);
  if (m && !BASE) BASE = m[1].replace(/\/$/, '');
});
server.stderr.on('data', (d) => process.stderr.write(`[vite-err] ${d}`));

function killServer() {
  if (!server.pid) return;
  if (process.platform === 'win32') {
    spawn('taskkill', ['/PID', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    try {
      process.kill(-server.pid);
    } catch {
      server.kill();
    }
  }
}

let exitCode = 0;
try {
  await waitForServer(BASE || `http://127.0.0.1:${PORT}`);
  BASE ||= `http://127.0.0.1:${PORT}`;
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu-sandbox',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--window-size=1440,900',
    ],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error(`[console.error] ${msg.text()}`);
  });

  console.log('\n== 1. 页面加载与自定义元素 ==');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('viewport-3d canvas');
  check('app-shell / viewport-3d 已注册', await page.evaluate(() => !!customElements.get('app-shell') && !!customElements.get('viewport-3d')));

  console.log('\n== 2. 绘制工具：真实鼠标点击地面添加控制点 ==');
  const box = await page.locator('viewport-3d canvas').boundingBox();
  // 在画布上横向点 4 个点（绘制模式是默认工具）
  for (const fx of [0.3, 0.45, 0.6, 0.72]) {
    await page.mouse.click(box.x + box.width * fx, box.y + box.height * 0.55);
    await page.waitForTimeout(120);
  }
  const cpCount = await page.evaluate(() => window.__store.controlPoints.length);
  check('地面点击产生控制点', cpCount >= 4, `实际 ${cpCount}`);

  console.log('\n== 3. 构造长直道路并生成，验证 300+ 树木与实例化 ==');
  await page.evaluate(() => {
    const st = window.__store;
    st.clearControlPoints();
    for (let i = 0; i <= 10; i++) st.addControlPoint({ x: i * 100, z: Math.sin(i) * 12 });
    st.buildRoad();
  });
  await page.waitForTimeout(800);
  const stats = await page.evaluate(() => {
    const st = window.__store;
    const count = (k) => st.placements.filter((p) => p.kind === k).length;
    const vp = document.querySelector('app-shell').shadowRoot.querySelector('viewport-3d');
    const scene = vp.engine.scene;
    const instanced = scene.meshes.filter((m) => m.thinInstanceCount > 0);
    return {
      roadBuilt: st.roadBuilt,
      length: st.roadTotalLength,
      trees: count('tree'),
      shrubs: count('shrub'),
      lamps: count('lamp'),
      flowerbeds: count('flowerbed'),
      instancedMeshKinds: instanced.length,
      totalInstances: instanced.reduce((s, m) => s + m.thinInstanceCount, 0),
    };
  });
  console.log('   ', stats);
  check('道路已生成且长度约 1000m', stats.roadBuilt && stats.length > 900, `长度 ${stats.length}`);
  check('行道树 ≥ 300 棵', stats.trees >= 300, `实际 ${stats.trees}`);
  check('灌木/路灯/花坛均已布置', stats.shrubs > 100 && stats.lamps > 20 && stats.flowerbeds > 20);
  check('实例化网格种类精简（每类 1 个 draw call）', stats.instancedMeshKinds <= 12, `实际 ${stats.instancedMeshKinds}`);
  check('thin instance 总数覆盖全部布置', stats.totalInstances >= stats.trees + stats.shrubs + stats.lamps);

  console.log('\n== 4. 帧率与 draw call（SwiftShader 软件渲染下） ==');
  const perf = await page.evaluate(async () => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    let n = 0;
    const t0 = performance.now();
    await new Promise((res) => {
      const loop = () => {
        n += 1;
        if (performance.now() - t0 < 2000) requestAnimationFrame(loop);
        else res();
      };
      requestAnimationFrame(loop);
    });
    const vp = document.querySelector('app-shell').shadowRoot.querySelector('viewport-3d');
    const engine = vp.engine.engine;
    // _drawCalls 是累计计数器，跨两帧取差值即单帧 draw call
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const d0 = engine._drawCalls?.current ?? 0;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const d1 = engine._drawCalls?.current ?? 0;
    const drawCalls = d1 - d0;
    return { fps: Math.round(n / 2), drawCalls };
  });
  console.log(`    实测 FPS ≈ ${perf.fps}，单帧 draw call ≈ ${perf.drawCalls}`);
  check('draw call 数量与对象数解耦（< 45，实例化生效；2300+ 实例仅约 30+ draw call）', perf.drawCalls >= 0 && perf.drawCalls < 45, `drawCalls=${perf.drawCalls}`);
  check('软件渲染下保持持续出帧（真实 GPU 会显著更高）', perf.fps >= 3, `FPS=${perf.fps}`);

  console.log('\n== 5. 同种子确定性：两次重生成结果完全一致 ==');
  const snap = await page.evaluate(() => {
    const st = window.__store;
    st.regenerate([]);
    const a = JSON.stringify(
      st.placements.filter((p) => !p.locked).map((p) => [p.id, p.s, p.offset, p.species, p.canopy]),
    );
    st.regenerate([]);
    const b = JSON.stringify(
      st.placements.filter((p) => !p.locked).map((p) => [p.id, p.s, p.offset, p.species, p.canopy]),
    );
    return { a, b };
  });
  check('两次重生成的非锁定布置逐字段相等', snap.a === snap.b);

  console.log('\n== 6. 手动挪树 → 自动锁定 → 重生成原地不动 ==');
  const lockResult = await page.evaluate(() => {
    const st = window.__store;
    const t = st.placements.find((p) => p.kind === 'tree');
    const target = { x: t.position.x + 6, y: 0, z: t.position.z + 4 };
    st.movePlacement(t.id, target);
    const moved = st.placements.find((p) => p.id === t.id);
    st.regenerate([]);
    const after = st.placements.find((p) => p.id === t.id);
    return {
      lockedAfterMove: moved.locked,
      survivesRegen: !!after,
      samePosition:
        after && Math.abs(after.position.x - target.x) < 1e-6 && Math.abs(after.position.z - target.z) < 1e-6,
      stillLocked: after?.locked === true,
    };
  });
  check('挪动后 locked=true', lockResult.lockedAfterMove);
  check('整路重生成后锁定树仍存在且坐标不变', lockResult.survivesRegen && lockResult.samePosition && lockResult.stillLocked);

  console.log('\n== 7. 框选单段重生成：段外对象不动，只重算受影响段 ==');
  const segResult = await page.evaluate(() => {
    const st = window.__store;
    const seg = 2;
    const sig = (p) => `${p.id}:${p.s.toFixed(3)}:${p.offset.toFixed(3)}`;
    const outsideBefore = st.placements.filter((p) => p.segment !== seg).map(sig).join('|');
    const insideCountBefore = st.placements.filter((p) => p.segment === seg && !p.locked).length;
    // 改参数后只重生成第 2 段：段内应变化，段外保持旧数据
    st.updateParams({ treeSpacing: 8.5 });
    st.regenerate([seg]);
    const outsideAfter = st.placements.filter((p) => p.segment !== seg).map(sig).join('|');
    const insideCountAfter = st.placements.filter((p) => p.segment === seg && !p.locked).length;
    return {
      outsideUntouched: outsideBefore === outsideAfter,
      insideChanged: insideCountBefore !== insideCountAfter,
      scopeCleared: st.selectedSegments.length === 0,
    };
  });
  check('重算段之外的对象完全不变', segResult.outsideUntouched);
  check('段内按新参数重算（数量发生变化）', segResult.insideChanged);
  check('重生成后框选状态清空', segResult.scopeCleared);
  // 还原间距供后续用例
  await page.evaluate(() => window.__store.updateParams({ treeSpacing: 6 }));

  console.log('\n== 8. 框选工具：真实鼠标拖拽产生选区 ==');
  await page.evaluate(() => window.__store.setTool('select'));
  await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.45);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.65, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  const selSegs = await page.evaluate(() => window.__store.selectedSegments);
  check('拖拽框选覆盖到至少 1 个道路段', selSegs.length >= 1, `段数 ${selSegs.length}`);
  // 点工具栏的“选中段重生成”
  await page.getByRole('button', { name: /选中段重生成/ }).click();
  await page.waitForTimeout(300);
  check('选中段重生成按钮可用且执行成功', (await page.evaluate(() => window.__store.selectedSegments)).length === 0);

  console.log('\n== 9. 夏/冬季节切换（叶色与树冠密度） ==');
  const seasonOk = await page.evaluate(async () => {
    const st = window.__store;
    const vp = document.querySelector('app-shell').shadowRoot.querySelector('viewport-3d');
    const crownScale = () => {
      const mesh = vp.engine.scene.meshes.find((m) => m.name.startsWith('crown-'));
      const mats = mesh?.thinInstanceGetWorldMatrices?.() ?? [];
      // 矩阵 m[0][0] 即 x 方向缩放（本应用实例无旋转，取缩放分量即可）
      return mats.slice(0, 30).map((m) => m.m[0]);
    };
    st.updateParams({ season: 'summer' });
    await new Promise((r) => setTimeout(r, 200));
    const summer = crownScale();
    st.updateParams({ season: 'winter' });
    await new Promise((r) => setTimeout(r, 200));
    const winter = crownScale();
    const avg = (a) => a.reduce((s, v) => s + v, 0) / (a.length || 1);
    return {
      rendered: winter.length > 0,
      densityDropped: avg(winter) < avg(summer) * 0.9,
      ratio: avg(winter) / avg(summer),
    };
  });
  check('冬季树冠实例仍渲染且密度明显降低', seasonOk.rendered && seasonOk.densityDropped, `缩放比 ${seasonOk.ratio?.toFixed(2)}`);
  // 存一张冬季俯视图人工复核
  const winterShot = await page.evaluate(() =>
    document.querySelector('app-shell').shadowRoot.querySelector('viewport-3d').engine.topDownScreenshot(),
  );
  writeFileSync(resolve(OUT, 'topdown-winter.png'), Buffer.from(winterShot.split(',')[1], 'base64'));
  await page.evaluate(() => window.__store.updateParams({ season: 'summer' }));

  console.log('\n== 10. 自动核对：越界参数给部分分 ==');
  await page.evaluate(() => {
    const st = window.__store;
    st.setRole('student');
    st.updateParams({ treeSpacing: 3, roadWidth: 20, lampSpacing: 40, flowerBedLength: 4 });
  });
  await page.waitForTimeout(200);
  // 监听对话框
  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: /提交方案并自动核对/ }).click();
  await page.waitForTimeout(300);
  const grade = await page.evaluate(() => {
    const st = window.__store;
    const g = st.grades[0];
    return g
      ? {
          exists: true,
          autoScore: g.autoScore,
          failed: g.checks.filter((c) => !c.passed).map((c) => c.label),
          tags: g.errorTags,
        }
      : { exists: false };
  });
  console.log('   ', grade);
  check('提交生成成绩记录', grade.exists);
  check('存在越界项且自动分 < 100', grade.exists && grade.autoScore < 100 && grade.failed.length >= 3, `得分 ${grade.autoScore}`);
  check('典型错误标签已提取', grade.exists && grade.tags.length >= 3);

  console.log('\n== 11. 教师复核打分与班级汇总 ==');
  const reviewOk = await page.evaluate(() => {
    const st = window.__store;
    st.setRole('teacher');
    const g = st.grades[0];
    st.updateGrade(g.id, { finalScore: 88, teacherComment: '树种搭配合理，注意树间距下限。' });
    const after = st.grades.find((x) => x.id === g.id);
    return after.finalScore === 88 && after.teacherComment.length > 0;
  });
  check('教师复核分与评语写入成功', reviewOk);
  // 切到成绩选项卡，确认汇总面板渲染无异常（自定义元素在 shadow DOM 内，需逐层穿透）
  await page.getByRole('button', { name: /成绩与汇总/ }).click();
  await page.waitForTimeout(300);
  const summaryText = await page.evaluate(() => {
    const shell = document.querySelector('app-shell');
    const panel = shell.shadowRoot.querySelector('grading-panel');
    return panel.shadowRoot.textContent;
  });
  check('成绩汇总面板渲染（含分数段与错误频次）', summaryText.includes('分数段') && summaryText.includes('典型错误'));

  console.log('\n== 12. 导出布置清单 CSV（真实下载） ==');
  await page.getByRole('button', { name: /布置工作台/ }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 8000 }),
    page.evaluate(() => {
      const shell = document.querySelector('app-shell');
      const panel = shell.shadowRoot.querySelector('param-panel');
      panel.shadowRoot.querySelector('#exportCsv').click();
    }),
  ]);
  const csvPath = resolve(OUT, 'placement.csv');
  await download.saveAs(csvPath);
  check('CSV 文件已下载', existsSync(csvPath));

  console.log('\n== 13. 俯视截图导出 ==');
  const shot = await page.evaluate(() => document.querySelector('app-shell').shadowRoot.querySelector('viewport-3d').engine.topDownScreenshot());
  check('截图返回 PNG data URL', typeof shot === 'string' && shot.startsWith('data:image/png'));
  writeFileSync(resolve(OUT, 'topdown.png'), Buffer.from(shot.split(',')[1], 'base64'));
  check('截图已保存到 test-results/topdown.png', existsSync(resolve(OUT, 'topdown.png')));

  console.log('\n== 14. 运行期异常检查 ==');
  check('全程无未捕获页面异常', pageErrors.length === 0, pageErrors.join('; '));

  await browser.close();
} catch (e) {
  console.error('测试执行异常：', e);
  exitCode = 1;
} finally {
  killServer();
}

console.log(`\n结果：${passed} 通过 / ${failed} 失败`);
if (failed > 0 || exitCode) process.exit(1);
