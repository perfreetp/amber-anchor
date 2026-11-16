import * as THREE from 'three';

// 多边形工具：边界点 [[x,z],...]

export function pointInPolygon(x, z, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i];
    const [xj, zj] = poly[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

// 最近边界点；返回 {x, z, dist}
export function closestOnBoundary(x, z, poly) {
  let best = null;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [x1, z1] = poly[j];
    const [x2, z2] = poly[i];
    const dx = x2 - x1, dz = z2 - z1;
    const len2 = dx * dx + dz * dz;
    let t = len2 ? ((x - x1) * dx + (z - z1) * dz) / len2 : 0;
    t = Math.max(0, Math.min(1, t));
    const px = x1 + t * dx, pz = z1 + t * dz;
    const d = Math.hypot(x - px, z - pz);
    if (!best || d < best.dist) best = { x: px, z: pz, dist: d };
  }
  return best;
}

// 由边界生成挤出地面（顶面 y=0，向下挤出 depth）
export function buildGround(boundary, depth = 0.4) {
  const shape = new THREE.Shape();
  boundary.forEach(([x, z], i) => {
    if (i === 0) shape.moveTo(x, -z);
    else shape.lineTo(x, -z);
  });
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2); // shape(x,y) -> world(x, 0, y)，法线朝上
  geo.translate(0, -depth, 0); // 顶面落在 y=0，体块向下挤出
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x5da854, roughness: 0.95, metalness: 0 });
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x8a6f4d, roughness: 1 });
  const mesh = new THREE.Mesh(geo, [groundMat, sideMat]);
  mesh.receiveShadow = true;
  mesh.name = 'ground';
  // 顶面移到 y=0：ExtrudeGeometry 挤出方向 +z，旋转后变为 -y，即占据 [-depth, 0]
  return mesh;
}

// 边界线（亮边）
export function buildBoundaryLine(boundary) {
  const pts = boundary.map(([x, z]) => new THREE.Vector3(x, 0.05, z));
  pts.push(pts[0].clone());
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xffffff }));
}

export function boundaryBounds(boundary) {
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const [x, z] of boundary) {
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
  }
  return { minX, maxX, minZ, maxZ, cx: (minX + maxX) / 2, cz: (minZ + maxZ) / 2, w: maxX - minX, d: maxZ - minZ };
}
