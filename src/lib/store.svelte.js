import { History } from './history.js';
import * as G from './geometry.js';
import { snapAll } from './snapping.js';
import {
  coastline,
  fairway,
  anchorages,
  aquacultureZones,
  initialParcels,
  initialJobs,
  nextParcelId,
  resetParcelSeq,
  surveyors,
  SEA_USE_TYPES
} from './sample-data.js';

const clone = (v) => structuredClone(v);

class EditorStore {
  parcels = $state([]);
  jobs = $state([]);
  selectedParcelId = $state(null);
  selectedRingIndex = $state(0);
  boxSelectedIds = $state([]);
  boxRect = $state(null); // 世界坐标框选矩形
  tool = $state('select'); // select | box | split-line | split-coast | split-fairway | subtract-anchorage | subtract-fairway
  snapEnabled = $state(true);
  snapTolPx = $state(15);
  layers = $state({
    parcels: true,
    vertices: true,
    seaTypes: true,
    coastline: true,
    fairway: true,
    aquaculture: true,
    anchorages: true
  });
  notice = $state(null);
  history = new History();
  baseData = Object.freeze({ coastline, fairway, anchorages, aquacultureZones, surveyors, seaTypes: SEA_USE_TYPES });

  constructor() {
    const seeded = initialParcels();
    resetParcelSeq(seeded.length);
    this.parcels = seeded;
    this.jobs = initialJobs(seeded);
  }

  // ---------- 通知 ----------
  notify(type, text) {
    this.notice = { id: Math.random().toString(36).slice(2), type, text, at: Date.now() };
  }
  clearNotice(id) {
    if (this.notice && this.notice.id === id) this.notice = null;
  }

  // ---------- 校验（派生） ----------
  validation = $derived(
    this.parcels.map((p) => ({ id: p.id, issues: G.polygonIssues({ rings: p.rings }) }))
  );

  issuesOf(parcelId) {
    return this.validation.find((v) => v.id === parcelId)?.issues ?? [];
  }
  hasBlockingIssue(parcelId) {
    return this.issuesOf(parcelId).some((i) => i.type === '自相交' || i.type === '顶点不足');
  }

  selectedParcel = $derived(this.parcels.find((p) => p.id === this.selectedParcelId) ?? null);

  // ---------- 历史 ----------
  begin(label) {
    this.history.push(clone(this.parcels), label);
  }
  undo() {
    const prev = this.history.undo(clone(this.parcels));
    if (prev) {
      this.parcels = prev;
      this._pruneSelection();
    }
  }
  redo() {
    const next = this.history.redo(clone(this.parcels));
    if (next) {
      this.parcels = next;
      this._pruneSelection();
    }
  }
  _pruneSelection() {
    if (!this.parcels.some((p) => p.id === this.selectedParcelId)) {
      this.selectedParcelId = this.parcels[0]?.id ?? null;
      this.selectedRingIndex = 0;
    }
    this.boxSelectedIds = this.boxSelectedIds.filter((id) => this.parcels.some((p) => p.id === id));
  }

  // ---------- 选择 ----------
  selectParcel(id, ringIndex = 0) {
    this.selectedParcelId = id;
    const p = this.parcels.find((x) => x.id === id);
    this.selectedRingIndex = p && ringIndex < p.rings.length ? ringIndex : 0;
  }
  setTool(tool) {
    this.tool = tool;
    if (tool !== 'box') this.boxSelectedIds = [];
  }

  // ---------- 节点级编辑 ----------
  // 吸附：把世界坐标候选点按 15px（换算世界距离）吸附
  applySnap(worldPt, excludeParcelId = null, ringIndex = null) {
    if (!this.snapEnabled) return { point: worldPt, snap: null };
    const tolWorld = this.snapTolPx / this.viewScale;
    const hit = snapAll(worldPt, tolWorld, {
      coastline: this.baseData.coastline,
      fairway: this.baseData.fairway,
      parcels: this.parcels,
      excludeParcelId,
      excludeRing: ringIndex
    });
    return hit ? { point: hit.point, snap: hit } : { point: worldPt, snap: null };
  }
  viewScale = $state(1); // 画布每米像素数，由 CanvasEditor 回写

  moveVertex(parcelId, ringIndex, vertexIndex, worldPt) {
    const p = this.parcels.find((x) => x.id === parcelId);
    if (!p) return;
    const { point } = this.applySnap(worldPt, parcelId, ringIndex);
    p.rings[ringIndex][vertexIndex].x = point.x;
    p.rings[ringIndex][vertexIndex].y = point.y;
  }

  moveEdge(parcelId, ringIndex, edgeIndex, dx, dy) {
    const p = this.parcels.find((x) => x.id === parcelId);
    if (!p) return;
    const ring = p.rings[ringIndex];
    const a = ring[edgeIndex];
    const b = ring[(edgeIndex + 1) % ring.length];
    const snapA = this.applySnap({ x: a.x + dx, y: a.y + dy }, parcelId, ringIndex);
    const snapB = this.applySnap({ x: b.x + dx, y: b.y + dy }, parcelId, ringIndex);
    // 边线整体吸附到航道中心线时两端走同一吸附源
    if (snapA.snap?.kind === 'edge' && snapB.snap?.kind === 'edge' && snapA.snap.source === snapB.snap.source) {
      a.x = snapA.point.x; a.y = snapA.point.y;
      b.x = snapB.point.x; b.y = snapB.point.y;
    } else {
      a.x += dx; a.y += dy;
      b.x += dx; b.y += dy;
    }
  }

  insertVertex(parcelId, ringIndex, edgeIndex, worldPt) {
    const p = this.parcels.find((x) => x.id === parcelId);
    if (!p) return;
    this.begin('插入界址点');
    p.rings[ringIndex].splice(edgeIndex + 1, 0, { ...worldPt });
  }

  deleteVertex(parcelId, ringIndex, vertexIndex) {
    const p = this.parcels.find((x) => x.id === parcelId);
    if (!p) return;
    if (p.rings[ringIndex].length <= 3) {
      this.notify('warn', '每个环至少保留 3 个界址点，无法删除');
      return;
    }
    this.begin('删除界址点');
    p.rings[ringIndex].splice(vertexIndex, 1);
  }

  updateParcelProps(parcelId, patch) {
    const p = this.parcels.find((x) => x.id === parcelId);
    if (!p) return;
    this.begin('修改宗海属性');
    Object.assign(p, patch);
  }

  deleteParcel(parcelId) {
    const idx = this.parcels.findIndex((x) => x.id === parcelId);
    if (idx < 0) return;
    this.begin('删除宗海');
    this.parcels.splice(idx, 1);
    this.jobs = this.jobs.filter((j) => j.parcelId !== parcelId);
    this._pruneSelection();
  }

  // ---------- 框选 ----------
  boxSelect(rect) {
    this.boxRect = rect;
    const ids = [];
    for (const p of this.parcels) {
      const c = G.centroid(p.rings[0]);
      if (c.x >= rect.minX && c.x <= rect.maxX && c.y >= rect.minY && c.y <= rect.maxY) ids.push(p.id);
    }
    this.boxSelectedIds = ids;
    if (ids.length) this.selectedParcelId = ids[0];
  }
  clearBox() {
    this.boxRect = null;
    this.boxSelectedIds = [];
  }

  // ---------- 合并 ----------
  mergeSelected() {
    const targets = this.parcels.filter((p) => this.boxSelectedIds.includes(p.id));
    if (targets.length < 2) {
      this.notify('warn', '请框选至少两宗相邻宗海后再合并');
      return;
    }
    try {
      this.begin(`合并 ${targets.length} 宗宗海`);
      const merged = G.mergePolygons(targets.map((t) => ({ rings: t.rings })));
      const keep = targets[0];
      keep.rings = merged.rings;
      const removedIds = targets.slice(1).map((t) => t.id);
      this.parcels = this.parcels.filter((p) => !removedIds.includes(p.id));
      // 工单：被合并宗海的工单归档为已合并
      for (const j of this.jobs) {
        if (removedIds.includes(j.parcelId)) {
          j.stage = '已合并';
          j.history.push({ at: now(), action: `宗海合并入 ${keep.id}`, by: '系统' });
        }
      }
      this.boxSelectedIds = [];
      this.boxRect = null;
      this.selectedParcelId = keep.id;
      this.notify('ok', `合并成功，新宗海编号 ${keep.id}，净面积 ${G.polygonArea({ rings: keep.rings }).toFixed(2)} m²`);
    } catch (e) {
      this.history.undoStack.pop(); // 回滚空动作
      this.notify('error', e.message);
    }
  }

  // ---------- 切割 ----------
  splitWithLine(a, b) {
    const p = this.selectedParcel;
    if (!p) return this.notify('warn', '请先在左侧选择一宗宗海');
    try {
      this.begin('直线切割宗海');
      this._applySplit(p, G.splitPolygonByLine({ rings: p.rings }, a, b));
    } catch (e) {
      this.history.undoStack.pop();
      this.notify('error', e.message);
    }
  }

  splitByPolyline(polyline, label) {
    const p = this.selectedParcel;
    if (!p) return this.notify('warn', '请先在左侧选择一宗宗海');
    try {
      const pieces = G.splitPolygonByPolyline({ rings: p.rings }, polyline);
      this.begin(label);
      this._applySplit(p, pieces);
    } catch (e) {
      if (this.history.undoStack.length) this.history.undoStack.pop();
      this.notify('error', e.message);
    }
  }

  splitAlongFairway() {
    this.splitByPolyline(this.baseData.fairway.centerline, '沿航道切割宗海');
  }
  splitAlongCoastline() {
    this.splitByPolyline(this.baseData.coastline, '沿岸线切割宗海');
  }

  _applySplit(originParcel, pieces) {
    // 第一片保留原编号，其余生成新宗海并自动建工单
    originParcel.rings = pieces[0].rings;
    const newOnes = [];
    for (const pc of pieces.slice(1)) {
      const id = nextParcelId();
      const np = {
        id,
        applicant: originParcel.applicant,
        seaType: originParcel.seaType,
        elevation: originParcel.elevation,
        status: '待分派',
        rings: pc.rings
      };
      this.parcels.push(np);
      newOnes.push(np);
      this.jobs.push({
        jobId: `GD-2026-${2000 + this.jobs.length}`,
        parcelId: id,
        applicant: np.applicant,
        receivedAt: now(),
        stage: '待分派',
        assignee: null,
        qcResult: null,
        reworkCount: 0,
        qcSubmits: 0,
        history: [{ at: now(), action: `由 ${originParcel.id} 切割新增`, by: '系统' }]
      });
    }
    this.notify('ok', `切割完成：保留 ${originParcel.id}，新增 ${newOnes.length} 宗（${newOnes.map((n) => n.id).join('、')}）`);
  }

  // ---------- 扣减（孔洞） ----------
  subtractAnchorage(anchorageId) {
    const p = this.selectedParcel;
    if (!p) return this.notify('warn', '请先选择要扣减的宗海');
    const anc = this.baseData.anchorages.find((a) => a.id === anchorageId);
    if (!anc) return;
    try {
      this.begin(`扣减锚地 ${anc.name}`);
      const out = G.subtractAsHole({ rings: p.rings }, anc.ring);
      if (!out) {
        this.history.undoStack.pop();
        return this.notify('warn', `${anc.name}未完全落在 ${p.id} 轮廓内，请改用「直线/沿航道切割」先分割再处理`);
      }
      p.rings = out.rings;
      this.notify('ok', `已在 ${p.id} 上扣除 ${anc.name}，形成孔洞`);
    } catch (e) {
      this.history.undoStack.pop();
      this.notify('error', e.message);
    }
  }

  subtractFairway() {
    const p = this.selectedParcel;
    if (!p) return this.notify('warn', '请先选择要扣减的宗海');
    try {
      const corridor = G.bufferPolyline(this.baseData.fairway.centerline, this.baseData.fairway.width / 2);
      const outer = p.rings[0];
      const inside = G.clipRingConvex(corridor, G.ensureCCW(outer));
      if (inside.length < 3 || G.ringArea(inside) < 1) {
        return this.notify('warn', '航道与该宗海无重叠区域');
      }
      const touches = inside.some((v) =>
        G.ringEdges(outer).some(([a, b]) => G.pointSegDistance(v, a, b).dist < 0.05)
      );
      if (touches) {
        return this.notify('warn', '航道贯穿该宗海边界，扣减会使其断开，请改用「沿航道切割」');
      }
      this.begin('扣除航道形成孔洞');
      const out = G.subtractAsHole({ rings: p.rings }, inside);
      if (!out) return this.notify('error', '航道缓冲带不在轮廓内，无法扣减');
      p.rings = out.rings;
      this.notify('ok', `已扣除航道段，孔洞面积 ${G.ringArea(inside).toFixed(2)} m²`);
    } catch (e) {
      if (this.history.undoStack.length) this.history.undoStack.pop();
      this.notify('error', e.message);
    }
  }

  // ---------- 工单流转 ----------
  registerJob(form) {
    const id = nextParcelId();
    const ref = this.parcels.at(-1);
    const base = ref ? G.bbox([{ rings: ref.rings }]) : { maxX: 0, minY: 0 };
    const ox = (base.maxX ?? 0) + 200;
    const oy = base.minY ?? 200;
    const parcel = {
      id,
      applicant: form.applicant,
      seaType: form.seaType,
      elevation: Number(form.elevation) || 10,
      status: '待分派',
      rings: [
        [
          { x: ox, y: oy },
          { x: ox + 500, y: oy },
          { x: ox + 500, y: oy + 400 },
          { x: ox, y: oy + 400 }
        ]
      ]
    };
    this.begin('前台接单登记');
    this.parcels.push(parcel);
    const job = {
      jobId: `GD-2026-${1000 + this.jobs.length + 1}`,
      parcelId: id,
      applicant: form.applicant,
      receivedAt: now(),
      stage: '待分派',
      assignee: null,
      qcResult: null,
      reworkCount: 0,
      qcSubmits: 0,
      history: [{ at: now(), action: '前台接单登记', by: '前台' }]
    };
    this.jobs.push(job);
    this.selectedParcelId = id;
    this.notify('ok', `接单成功：宗海 ${id}，工单 ${job.jobId}`);
    return job;
  }

  _jobOf(parcelId) {
    return this.jobs.find((j) => j.parcelId === parcelId);
  }

  assignJob(jobId, surveyorId) {
    const job = this.jobs.find((j) => j.jobId === jobId);
    if (!job) return;
    const u = this.baseData.surveyors.find((s) => s.id === surveyorId);
    job.assignee = surveyorId;
    job.stage = '调查中';
    job.history.push({ at: now(), action: `分派给 ${u?.name ?? surveyorId}`, by: '调度员' });
    this._syncParcel(job.parcelId, job.stage);
  }

  submitQc(jobId) {
    const job = this.jobs.find((j) => j.jobId === jobId);
    if (!job) return;
    if (this.hasBlockingIssue(job.parcelId)) {
      this.notify('error', `宗海 ${job.parcelId} 存在自相交边界，系统阻止提交质检`);
      return;
    }
    job.stage = '待质检';
    job.qcSubmits = (job.qcSubmits ?? 0) + 1;
    job.history.push({ at: now(), action: '提交质检抽查', by: this.baseData.surveyors.find((s) => s.id === job.assignee)?.name ?? '承办人' });
    this._syncParcel(job.parcelId, job.stage);
  }

  qcPass(jobId) {
    const job = this.jobs.find((j) => j.jobId === jobId);
    if (!job) return;
    job.stage = '质检合格';
    job.qcResult = { pass: true, at: now(), by: '质检员' };
    job.history.push({ at: now(), action: '质检抽查合格', by: '质检员' });
    this._syncParcel(job.parcelId, job.stage);
  }

  qcReject(jobId, reason) {
    const job = this.jobs.find((j) => j.jobId === jobId);
    if (!job) return;
    job.stage = '不合格打回';
    job.reworkCount += 1;
    job.qcResult = { pass: false, at: now(), reason, by: '质检员' };
    job.history.push({ at: now(), action: `质检不合格打回：${reason || '未填写原因'}`, by: '质检员' });
    this._syncParcel(job.parcelId, job.stage);
  }

  reworkResubmit(jobId) {
    const job = this.jobs.find((j) => j.jobId === jobId);
    if (!job) return;
    if (this.hasBlockingIssue(job.parcelId)) {
      this.notify('error', `宗海 ${job.parcelId} 仍存在自相交边界，请先修正再提交`);
      return;
    }
    job.stage = '待质检';
    job.qcSubmits = (job.qcSubmits ?? 0) + 1;
    job.history.push({ at: now(), action: '返工后重新提交质检', by: '承办人' });
    this._syncParcel(job.parcelId, job.stage);
  }

  _syncParcel(parcelId, stage) {
    const p = this.parcels.find((x) => x.id === parcelId);
    if (p) p.status = stage;
  }

  // ---------- 看板统计 ----------
  dashboard = $derived.by(() => {
    const jobs = this.jobs;
    const total = jobs.length;
    const done = jobs.filter((j) => j.stage === '质检合格').length;
    const rejected = jobs.filter((j) => j.stage === '不合格打回').length;
    const submits = jobs.reduce((s, j) => s + (j.qcSubmits ?? 0), 0);
    const reworks = jobs.reduce((s, j) => s + j.reworkCount, 0);
    const reworkRate = submits ? reworks / submits : 0;
    const bySurveyor = this.baseData.surveyors.map((u) => {
      const mine = jobs.filter((j) => j.assignee === u.id);
      return {
        ...u,
        total: mine.length,
        done: mine.filter((j) => j.stage === '质检合格').length,
        rework: mine.reduce((s, j) => s + j.reworkCount, 0)
      };
    });
    const stageCounts = {};
    for (const j of jobs) stageCounts[j.stage] = (stageCounts[j.stage] ?? 0) + 1;
    return { total, done, rejected, submits, reworks, reworkRate, bySurveyor, stageCounts };
  });

  // ---------- 闭合差（导出前检查） ----------
  closureReport() {
    return this.parcels.map((p) => {
      const e = G.closureErrors(p.rings[0]);
      return { id: p.id, applicant: p.applicant, ...e, exceed: e.area > 1 };
    });
  }
}

function now() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export const editor = new EditorStore();
