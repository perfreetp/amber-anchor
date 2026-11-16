import * as THREE from 'three';
import { CATEGORIES } from '../catalog.js';

// 每个分类一个程序化模型，尺寸大致按真实比例（米）
// 所有模型原点在底部中心，方便贴地

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.1, ...opts });
}

function rotorModel() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.12, 16), mat(0x222831));
  base.position.y = 0.06;
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 12), mat(0x3a4750));
  stem.position.y = 0.2;
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.1, 16), mat(0x2e86ff));
  head.position.y = 0.36;
  const nozzle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.04), mat(0x111111));
  nozzle.position.set(0.08, 0.38, 0);
  g.add(base, stem, head, nozzle);
  return g;
}

function sprayModel() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.1, 14), mat(0x222831));
  base.position.y = 0.05;
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 10), mat(0x3a4750));
  stem.position.y = 0.15;
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.08, 14), mat(0x27ae60));
  cap.position.y = 0.26;
  g.add(base, stem, cap);
  return g;
}

function valveModel() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.2), mat(0x5d6d7e));
  body.position.y = 0.09;
  const bonnet = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.14, 12), mat(0x7f8c8d));
  bonnet.position.y = 0.24;
  const coil = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.1, 10), mat(0x2c3e50));
  coil.position.y = 0.35;
  g.add(body, bonnet, coil);
  return g;
}

function plantModel(seed = 1) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.8, 8), mat(0x6e4b26));
  trunk.position.y = 0.4;
  const crownColor = seed % 2 ? 0x2e8b57 : 0x3aa655;
  const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), mat(crownColor, { flatShading: true }));
  crown.position.y = 1.35;
  crown.scale.set(1, 1.15, 1);
  g.add(trunk, crown);
  return g;
}

function lightModel() {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.8, 10), mat(0x2c3e50));
  pole.position.y = 0.4;
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 14, 10),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, emissive: 0xffc400, emissiveIntensity: 0.9 })
  );
  head.position.y = 0.85;
  g.add(pole, head);
  return g;
}

function benchModel() {
  const g = new THREE.Group();
  const wood = mat(0x8e5a2b);
  const iron = mat(0x34495e, { metalness: 0.4 });
  for (const x of [-0.65, 0.65]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.5), iron);
    leg.position.set(x, 0.225, 0);
    g.add(leg);
  }
  for (let i = 0; i < 3; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.12), wood);
    slat.position.set(0, 0.47, -0.18 + i * 0.18);
    g.add(slat);
  }
  for (let i = 0; i < 2; i++) {
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 0.05), wood);
    back.position.set(0, 0.72 + i * 0.18, -0.28);
    g.add(back);
  }
  return g;
}

const builders = {
  rotor: rotorModel,
  spray: sprayModel,
  valve: valveModel,
  plant: plantModel,
  light: lightModel,
  bench: benchModel,
};

export function buildModel(category, seed = 1) {
  const g = builders[category] ? builders[category](seed) : new THREE.Group();
  g.traverse((o) => {
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = false; }
  });
  return g;
}

// 喷洒覆盖扇形（贴地，半透明；叠加自然加深）
export function buildCoverageMesh(range, arcDeg, color) {
  const theta = THREE.MathUtils.degToRad(arcDeg);
  const geo = new THREE.CircleGeometry(range, Math.max(12, Math.floor(arcDeg / 4)), -theta / 2 + Math.PI / 2, theta);
  const m = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, m);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.03;
  mesh.renderOrder = 5;
  return mesh;
}

export function categoryColor(category) {
  return CATEGORIES[category]?.color ?? 0x999999;
}
