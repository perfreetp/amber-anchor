// 横断面：沿任意 A-B 线采样地面高程与水面线
import type { CrossSection, FanModel, ProfileSample, Vec2 } from '../types';
import { ChannelBathymetry, createTerrainField } from './terrain';
import { v2dist } from './math';

let counter = 0;

export function buildCrossSection(model: FanModel, a: Vec2, b: Vec2): CrossSection {
  const field = createTerrainField(model.params);
  const bath = new ChannelBathymetry(model.reaches);
  const total = v2dist(a, b);
  // 采样间距与精度挂钩，保证剖面线足够细
  const spacing = Math.max(2, model.terrain.extent / 900);
  const steps = Math.max(8, Math.round(total / spacing));
  const samples: ProfileSample[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = a.x + (b.x - a.x) * t;
    const y = a.y + (b.y - a.y) * t;
    const s = bath.sample(field, x, y);
    samples.push({
      d: total * t,
      ground: s.ground,
      water: s.water,
      waterLabel: s.waterReachId
    });
  }
  counter += 1;
  return {
    id: `section-${Date.now().toString(36)}-${counter}`,
    a: { ...a },
    b: { ...b },
    samples,
    createdAt: new Date().toISOString()
  };
}
