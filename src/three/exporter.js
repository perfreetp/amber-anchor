import * as THREE from 'three';
import { boundaryBounds } from './geo.js';

// 用独立 WebGL 渲染器渲染正交俯视图（主渲染器可能是 WebGPU，无法直接读回像素）
// hide: 导出时临时隐藏的对象（手柄、标签等）
export async function exportTopViewPNG({ scene, boundary, objects, filename, hide = [] }) {
  const b = boundaryBounds(boundary);
  const margin = Math.max(b.w, b.d) * 0.12 + 2;
  const W = 1600;
  const H = Math.round((W * (b.d + margin * 2)) / (b.w + margin * 2));

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const { WebGLRenderer } = await import('three');
  const renderer = new WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(W, H, false);

  const cam = new THREE.OrthographicCamera(
    b.cx - b.w / 2 - margin, b.cx + b.w / 2 + margin,
    -(b.cz - b.d / 2 - margin), -(b.cz + b.d / 2 + margin),
    0.1, 500
  );
  // 注意：OrthographicCamera 的 up 方向决定图纸朝向，这里让 -z 朝上（北在上）
  cam.position.set(b.cx, 100, b.cz);
  cam.up.set(0, 0, -1);
  cam.lookAt(b.cx, 0, b.cz);
  cam.updateProjectionMatrix();

  // 导出前隐藏辅助对象、关闭雾
  const prevFog = scene.fog;
  const prevBg = scene.background;
  scene.fog = null;
  scene.background = new THREE.Color(0xf4f7f2);
  const vis = hide.map((o) => o.visible);
  hide.forEach((o) => { o.visible = false; });

  renderer.render(scene, cam);

  hide.forEach((o, i) => { o.visible = vis[i]; });
  scene.fog = prevFog;
  scene.background = prevBg;

  // 合成到 2D 画布：加编号与坐标表
  const out = document.createElement('canvas');
  const tableH = 40 + objects.length * 22 + 20;
  out.width = W; out.height = H + tableH;
  const ctx = out.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(canvas, 0, 0);

  // 世界坐标 -> 像素
  const toPx = (x, z) => {
    const v = new THREE.Vector3(x, 0, z).project(cam);
    return [((v.x + 1) / 2) * W, ((1 - v.y) / 2) * H];
  };

  ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  objects.forEach((o, i) => {
    const [px, py] = toPx(o.x, o.z);
    ctx.beginPath();
    ctx.arc(px, py, 13, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#c0392b';
    ctx.stroke();
    ctx.fillStyle = '#c0392b';
    ctx.fillText(String(i + 1), px, py);
  });

  // 坐标表
  let y = H + 24;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#222';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('编号坐标表（单位：米）', 20, y);
  y += 14;
  ctx.font = '14px monospace';
  objects.forEach((o, i) => {
    y += 22;
    ctx.fillText(
      `#${String(i + 1).padStart(3, ' ')}  ${(o.label || '').padEnd(10, ' ')}  X=${o.x.toFixed(2).padStart(8, ' ')}  Z=${o.z.toFixed(2).padStart(8, ' ')}  旋转=${Math.round(o.rotY * 180 / Math.PI)}°`,
      20, y
    );
  });

  const a = document.createElement('a');
  a.download = filename || '俯视图.png';
  a.href = out.toDataURL('image/png');
  a.click();
  renderer.dispose();
}

export function exportCSV(objects, filename) {
  const header = '编号,类别,名称,型号,X(m),Z(m),旋转(度),射程(m),角度(度)\n';
  const lines = objects.map((o, i) =>
    [i + 1, o.categoryLabel, o.name, o.model, o.x.toFixed(2), o.z.toFixed(2),
     Math.round(o.rotY * 180 / Math.PI), o.range ?? '', o.arc ?? ''].join(',')
  );
  const csv = '﻿' + header + lines.join('\n');
  const a = document.createElement('a');
  a.download = filename || '布置坐标.csv';
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
