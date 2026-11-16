import { describe, it, expect } from 'vitest';
import * as G from '../geometry.js';

const sq = (x, y, w, h) => [
  { x, y },
  { x: x + w, y },
  { x: x + w, y: y + h },
  { x, y: y + h }
];

describe('面积与定向', () => {
  it('鞋带面积与孔洞净面积', () => {
    expect(G.ringArea(sq(0, 0, 10, 10))).toBeCloseTo(100, 6);
    const poly = { rings: [sq(0, 0, 10, 10), sq(2, 2, 4, 4)] };
    expect(G.polygonArea(poly)).toBeCloseTo(84, 6);
  });
  it('CCW 归一化', () => {
    const cw = [
      { x: 0, y: 0 },
      { x: 0, y: 10 },
      { x: 10, y: 10 },
      { x: 10, y: 0 }
    ];
    expect(G.signedArea(G.ensureCCW(cw))).toBeGreaterThan(0);
  });
});

describe('自相交检测', () => {
  it('蝴蝶结多边形必须报自相交', () => {
    const bowtie = [
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      { x: 10, y: 0 },
      { x: 0, y: 10 }
    ];
    const hits = G.ringSelfIntersections(bowtie);
    expect(hits.length).toBe(1);
    expect(hits[0].point.x).toBeCloseTo(5, 6);
    expect(hits[0].point.y).toBeCloseTo(5, 6);
  });
  it('正常矩形无自相交', () => {
    expect(G.ringSelfIntersections(sq(0, 0, 5, 5)).length).toBe(0);
  });
  it('polygonIssues 标记顶点不足', () => {
    const issues = G.polygonIssues({ rings: [[{ x: 0, y: 0 }, { x: 1, y: 0 }]] });
    expect(issues.some((i) => i.type === '顶点不足')).toBe(true);
  });
});

describe('相邻面合并', () => {
  it('共边两矩形合并为一个矩形且面积相加', () => {
    const a = { rings: [sq(0, 0, 10, 10)] };
    const b = { rings: [sq(10, 0, 10, 10)] };
    const m = G.mergeTwoPolygons(a, b);
    expect(m.rings.length).toBe(1);
    expect(G.ringArea(m.rings[0])).toBeCloseTo(200, 6);
    expect(G.ringSelfIntersections(m.rings[0]).length).toBe(0);
  });
  it('包含关系合并产生孔洞', () => {
    const outer = { rings: [sq(0, 0, 20, 20)] };
    const inner = { rings: [sq(5, 5, 6, 6)] };
    const m = G.mergeTwoPolygons(outer, inner);
    expect(m.rings.length).toBe(2);
    expect(G.polygonArea(m)).toBeCloseTo(400 - 36, 6);
  });
  it('不相邻且无包含关系应抛错', () => {
    const a = { rings: [sq(0, 0, 4, 4)] };
    const b = { rings: [sq(100, 100, 4, 4)] };
    expect(() => G.mergeTwoPolygons(a, b)).toThrow();
  });
  it('mergePolygons 串联合并三宗', () => {
    const ps = [
      { rings: [sq(0, 0, 10, 10)] },
      { rings: [sq(10, 0, 10, 10)] },
      { rings: [sq(20, 0, 10, 10)] }
    ];
    const m = G.mergePolygons(ps);
    expect(G.ringArea(m.rings[0])).toBeCloseTo(300, 6);
  });
});

describe('直线切割', () => {
  it('竖切矩形得两片，面积和不变', () => {
    const poly = { rings: [sq(0, 0, 10, 10)] };
    const out = G.splitPolygonByLine(poly, { x: 4, y: -5 }, { x: 4, y: 15 });
    expect(out.length).toBe(2);
    const sum = out.reduce((s, p) => s + G.polygonArea(p), 0);
    expect(sum).toBeCloseTo(100, 5);
  });
  it('未贯穿的切割线应抛错', () => {
    const poly = { rings: [sq(0, 0, 10, 10)] };
    expect(() => G.splitPolygonByLine(poly, { x: -5, y: -5 }, { x: -2, y: -2 })).toThrow();
  });
  it('切割后孔洞按质心归属', () => {
    const poly = { rings: [sq(0, 0, 10, 10), sq(1, 1, 2, 2)] };
    const out = G.splitPolygonByLine(poly, { x: 5, y: -5 }, { x: 5, y: 15 });
    const totalHoles = out.reduce((s, p) => s + (p.rings.length - 1), 0);
    expect(totalHoles).toBe(1);
  });
});

describe('扣减孔洞', () => {
  it('完全在内的裁剪环成为孔洞', () => {
    const poly = { rings: [sq(0, 0, 20, 20)] };
    const out = G.subtractAsHole(poly, sq(6, 6, 5, 5));
    expect(out.rings.length).toBe(2);
    expect(G.polygonArea(out)).toBeCloseTo(400 - 25, 6);
  });
  it('超出轮廓返回 null 而非错误数据', () => {
    const poly = { rings: [sq(0, 0, 10, 10)] };
    expect(G.subtractAsHole(poly, sq(8, 8, 10, 10))).toBeNull();
  });
});

describe('航道缓冲带', () => {
  it('直折线缓冲带为矩形且宽度正确', () => {
    const ring = G.bufferPolyline(
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 }
      ],
      10
    );
    expect(G.signedArea(ring)).toBeGreaterThan(0);
    expect(G.ringArea(ring)).toBeCloseTo(100 * 20, 5);
  });
  it('折点缓冲带无自相交', () => {
    const ring = G.bufferPolyline(
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 200, y: 60 }
      ],
      12
    );
    expect(G.ringSelfIntersections(ring).length).toBe(0);
  });
});

describe('凸裁剪与闭合差', () => {
  it('Sutherland-Hodgman 裁剪得到交集', () => {
    const out = G.clipRingConvex(sq(0, 0, 10, 10), sq(5, -5, 10, 20));
    expect(G.ringArea(out)).toBeCloseTo(50, 5);
  });
  it('闭合差随首尾偏差增大', () => {
    // 模拟导线测量：末点本应回到首点 (0,0)，实测落在 (0.3, -0.4)
    const ring = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
      { x: 0.3, y: -0.4 }
    ];
    const e = G.closureErrors(ring);
    expect(e.linear).toBeCloseTo(0.5, 6);
    expect(e.area).toBeCloseTo(0.5 * e.meanEdge * 0.5, 5);
    expect(e.area).toBeGreaterThan(0);
  });
});

describe('点在面内', () => {
  it('孔洞内点判定为面外', () => {
    const poly = { rings: [sq(0, 0, 20, 20), sq(5, 5, 5, 5)] };
    expect(G.pointInPolygon({ x: 1, y: 1 }, poly)).toBe(true);
    expect(G.pointInPolygon({ x: 7, y: 7 }, poly)).toBe(false);
  });
});

describe('沿参考折线切割', () => {
  it('折线段在面内带拐点时仍切成两片且面积守恒', () => {
    const poly = { rings: [sq(0, 0, 20, 20)] };
    // Z 形折线，面内部分包含拐点 (10,10)
    const line = [
      { x: -5, y: 2 },
      { x: 8, y: 8 },
      { x: 10, y: 10 },
      { x: 13, y: 13 },
      { x: 25, y: 18 }
    ];
    const out = G.splitPolygonByPolyline(poly, line);
    expect(out.length).toBe(2);
    const sum = out.reduce((s, x) => s + G.polygonArea(x), 0);
    expect(sum).toBeCloseTo(400, 5);
    expect(out.every((x) => G.ringSelfIntersections(x.rings[0]).length === 0)).toBe(true);
  });
  it('参考线不穿过面时抛错', () => {
    const poly = { rings: [sq(0, 0, 10, 10)] };
    expect(() =>
      G.splitPolygonByPolyline(poly, [
        { x: -5, y: -5 },
        { x: -2, y: -2 }
      ])
    ).toThrow();
  });
});
