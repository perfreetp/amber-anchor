import { describe, it, expect, beforeEach } from 'vitest';
import { editor } from '../store.svelte.js';
import * as G from '../geometry.js';

describe('编辑 store 业务链路', () => {
  beforeEach(() => {
    // 重新构造初始状态
    editor.parcels = [
      {
        id: 'ZH-001',
        applicant: '甲',
        seaType: 'ZSHY-01',
        elevation: 10,
        status: '待分派',
        rings: [[
          { x: 700, y: 1000 },
          { x: 1620, y: 950 },
          { x: 1620, y: 1500 },
          { x: 850, y: 1600 }
        ]]
      },
      {
        id: 'ZH-002',
        applicant: '乙',
        seaType: 'ZSHY-02',
        elevation: 10,
        status: '待分派',
        rings: [[
          { x: 1620, y: 950 },
          { x: 2400, y: 880 },
          { x: 2480, y: 1450 },
          { x: 1620, y: 1500 }
        ]]
      }
    ];
    editor.jobs = [
      { jobId: 'J1', parcelId: 'ZH-001', stage: '待分派', assignee: null, qcResult: null, reworkCount: 0, qcSubmits: 0, history: [] },
      { jobId: 'J2', parcelId: 'ZH-002', stage: '待分派', assignee: null, qcResult: null, reworkCount: 0, qcSubmits: 0, history: [] }
    ];
    editor.selectedParcelId = 'ZH-001';
    editor.history.clear();
    editor.boxSelectedIds = [];
  });

  it('框选两宗并合并：宗海数减少、面积守恒', () => {
    const areaBefore = editor.parcels.reduce((s, p) => s + G.polygonArea({ rings: p.rings }), 0);
    editor.boxSelect({ minX: 600, maxY: 1700, maxX: 2600, minY: 800 });
    expect(editor.boxSelectedIds.length).toBe(2);
    editor.mergeSelected();
    expect(editor.parcels.length).toBe(1);
    expect(G.ringSelfIntersections(editor.parcels[0].rings[0]).length).toBe(0);
    expect(G.polygonArea({ rings: editor.parcels[0].rings })).toBeCloseTo(areaBefore, 4);
  });

  it('直线切割产生新宗海并自动建工单', () => {
    editor.splitWithLine({ x: 1100, y: 800 }, { x: 1100, y: 1700 });
    expect(editor.parcels.length).toBe(3);
    const newParcel = editor.parcels.find((p) => p.id !== 'ZH-001' && p.id !== 'ZH-002');
    expect(newParcel).toBeTruthy();
    expect(editor.jobs.some((j) => j.parcelId === newParcel.id && j.stage === '待分派')).toBe(true);
  });

  it('锚地扣减形成孔洞（1号锚地落在 ZH-002 内）', () => {
    editor.selectParcel('ZH-002');
    editor.subtractAnchorage('anchor-1');
    const p = editor.parcels.find((x) => x.id === 'ZH-002');
    expect(p.rings.length).toBe(2);
  });

  it('自相交宗海被阻止提交质检', () => {
    const p = editor.parcels[0];
    // 制造蝴蝶结
    p.rings[0] = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: 10, y: 0 },
      { x: 0, y: 10 }
    ];
    expect(editor.hasBlockingIssue(p.id)).toBe(true);
    editor.assignJob('J1', 'u01');
    editor.submitQc('J1');
    const job = editor.jobs.find((j) => j.jobId === 'J1');
    expect(job.stage).toBe('调查中'); // 未进入待质检
  });

  it('完整工单流：分派→提交→合格', () => {
    editor.assignJob('J1', 'u02');
    expect(editor.jobs[0].stage).toBe('调查中');
    editor.submitQc('J1');
    expect(editor.jobs[0].stage).toBe('待质检');
    editor.qcPass('J1');
    expect(editor.jobs[0].stage).toBe('质检合格');
    expect(editor.dashboard.done).toBe(1);
  });

  it('打回→返工率统计→重新提交合格', () => {
    editor.assignJob('J2', 'u03');
    editor.submitQc('J2');
    editor.qcReject('J2', '界址点偏差');
    expect(editor.jobs[1].stage).toBe('不合格打回');
    expect(editor.jobs[1].reworkCount).toBe(1);
    editor.reworkResubmit('J2');
    expect(editor.jobs[1].stage).toBe('待质检');
    editor.qcPass('J2');
    expect(editor.dashboard.reworkRate).toBeCloseTo(0.5, 5); // 1 次返工 / 2 次提交
  });

  it('撤销重做恢复切割前状态', () => {
    const n0 = editor.parcels.length;
    editor.splitWithLine({ x: 1100, y: 800 }, { x: 1100, y: 1700 });
    expect(editor.parcels.length).toBe(n0 + 1);
    editor.undo();
    expect(editor.parcels.length).toBe(n0);
    editor.redo();
    expect(editor.parcels.length).toBe(n0 + 1);
  });

  it('接单登记生成草稿宗海与工单', () => {
    const n = editor.parcels.length;
    editor.registerJob({ applicant: '新项目', seaType: 'ZSHY-04', elevation: 15 });
    expect(editor.parcels.length).toBe(n + 1);
    const last = editor.parcels.at(-1);
    expect(last.applicant).toBe('新项目');
    expect(last.elevation).toBe(15);
    expect(editor.jobs.at(-1).stage).toBe('待分派');
  });

  it('闭合差报告结构正确并能标记超差', () => {
    const report = editor.closureReport();
    expect(report.length).toBe(editor.parcels.length);
    expect(report[0]).toHaveProperty('linear');
    expect(report[0]).toHaveProperty('area');
    expect(report[0]).toHaveProperty('exceed');
  });
});
