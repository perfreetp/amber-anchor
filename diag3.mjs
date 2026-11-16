import * as G from './src/lib/geometry.js';
import { initialParcels, fairway, coastline } from './src/lib/sample-data.js';
const p = initialParcels()[0];
console.log('ZH-001 外轮廓:', JSON.stringify(p.rings[0]));
for (let i = 0; i < fairway.centerline.length - 1; i++) {
  const a = fairway.centerline[i];
  const b = fairway.centerline[i + 1];
  const hits = [];
  p.rings[0].forEach((v, ei) => {
    const w = p.rings[0][(ei + 1) % p.rings[0].length];
    const h = G.segInter(a, b, v, w);
    if (h) hits.push({ edge: ei, t: h.t.toFixed(3), u: h.u.toFixed(3) });
  });
  console.log(`航道段${i} ${JSON.stringify(a)}→${JSON.stringify(b)} 交点:`, hits);
}
for (let i = 0; i < coastline.length - 1; i++) {
  const a = coastline[i];
  const b = coastline[i + 1];
  const hits = [];
  p.rings[0].forEach((v, ei) => {
    const w = p.rings[0][(ei + 1) % p.rings[0].length];
    const h = G.segInter(a, b, v, w);
    if (h) hits.push({ edge: ei, t: h.t.toFixed(3), u: h.u.toFixed(3) });
  });
  if (hits.length) console.log(`岸线段${i} 交点:`, hits);
}
