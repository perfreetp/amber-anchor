// 最小 3D 数学库（列主序 mat4，与 WebGPU 一致）

export type Vec2 = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number };
export type Mat4 = Float32Array;

export const v2 = (x: number, y: number): Vec2 => ({ x, y });
export const v3 = (x: number, y: number, z: number): Vec3 => ({ x, y, z });

export function v2add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}
export function v2sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}
export function v2scale(a: Vec2, s: number): Vec2 {
  return { x: a.x * s, y: a.y * s };
}
export function v2len(a: Vec2): number {
  return Math.hypot(a.x, a.y);
}
export function v2dist(a: Vec2, b: Vec2): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
export function v2norm(a: Vec2): Vec2 {
  const l = Math.hypot(a.x, a.y) || 1;
  return { x: a.x / l, y: a.y / l };
}
export function v2dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y;
}
/** 角度（弧度）对应的单位向量，0 = +y 方向（扇体朝向） */
export function dirFromAngle(angle: number): Vec2 {
  return { x: Math.sin(angle), y: Math.cos(angle) };
}

export function v3add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}
export function v3sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
export function v3scale(a: Vec3, s: number): Vec3 {
  return { x: a.x * s, y: a.y * s, z: a.z * s };
}
export function v3cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}
export function v3dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
export function v3len(a: Vec3): number {
  return Math.hypot(a.x, a.y, a.z);
}
export function v3norm(a: Vec3): Vec3 {
  const l = v3len(a) || 1;
  return { x: a.x / l, y: a.y / l, z: a.z / l };
}
export function v3lerp(a: Vec3, b: Vec3, t: number): Vec3 {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    z: a.z + (b.z - a.z) * t
  };
}

export function mat4Identity(): Mat4 {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
}

/** 透视投影（WebGPU 深度 0..1，z 为正） */
export function mat4Perspective(fovy: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1 / Math.tan(fovy / 2);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = far / (near - far);
  m[11] = -1;
  m[14] = (far * near) / (near - far);
  return m;
}

export function mat4LookAt(eye: Vec3, target: Vec3, up: Vec3): Mat4 {
  const z = v3norm(v3sub(eye, target)); // 相机朝 -z
  const x = v3norm(v3cross(up, z));
  const y = v3cross(z, x);
  const m = mat4Identity();
  m[0] = x.x; m[1] = y.x; m[2] = z.x;
  m[4] = x.y; m[5] = y.y; m[6] = z.y;
  m[8] = x.z; m[9] = y.z; m[10] = z.z;
  m[12] = -v3dot(x, eye);
  m[13] = -v3dot(y, eye);
  m[14] = -v3dot(z, eye);
  return m;
}

export function mat4Multiply(a: Mat4, b: Mat4): Mat4 {
  const out = new Float32Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      out[c * 4 + r] =
        a[0 * 4 + r] * b[c * 4 + 0] +
        a[1 * 4 + r] * b[c * 4 + 1] +
        a[2 * 4 + r] * b[c * 4 + 2] +
        a[3 * 4 + r] * b[c * 4 + 3];
    }
  }
  return out;
}

export function mat4VP(p: Mat4, v: Mat4): Mat4 {
  return mat4Multiply(p, v);
}

export function transformPoint(m: Mat4, p: Vec3): Vec3 {
  const w = m[3] * p.x + m[7] * p.y + m[11] * p.z + m[15];
  return {
    x: (m[0] * p.x + m[4] * p.y + m[8] * p.z + m[12]) / w,
    y: (m[1] * p.x + m[5] * p.y + m[9] * p.z + m[13]) / w,
    z: (m[2] * p.x + m[6] * p.y + m[10] * p.z + m[14]) / w
  };
}

/** 世界坐标 → 屏幕 NDC（-1..1），用于 CPU 拾取与 billboard */
export function worldToNDC(m: Mat4, p: Vec3): { x: number; y: number; z: number; visible: boolean } {
  const w = m[3] * p.x + m[7] * p.y + m[11] * p.z + m[15];
  const x = (m[0] * p.x + m[4] * p.y + m[8] * p.z + m[12]) / w;
  const y = (m[1] * p.x + m[5] * p.y + m[9] * p.z + m[13]) / w;
  const z = (m[2] * p.x + m[6] * p.y + m[10] * p.z + m[14]) / w;
  return { x, y, z, visible: w > 0 && z >= 0 && z <= 1 };
}

/** 通用 4x4 求逆（用于屏幕射线反算） */
export function mat4Invert(a: Mat4): Mat4 | null {
  const out = new Float32Array(16);
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) return null;
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}

/** 屏幕像素点 → 世界射线（与 z=0 平面的交点），用于点选与拖拽 */
export function screenToGroundPlane(
  vpInv: Mat4,
  px: number,
  py: number,
  width: number,
  height: number
): Vec3 | null {
  const ndcX = (px / width) * 2 - 1;
  const ndcY = 1 - (py / height) * 2;
  const near = transformPoint(vpInv, { x: ndcX, y: ndcY, z: 0 });
  const far = transformPoint(vpInv, { x: ndcX, y: ndcY, z: 1 });
  const dir = v3sub(far, near);
  if (Math.abs(dir.z) < 1e-9) return null;
  const t = -near.z / dir.z;
  if (t < 0) return null;
  return v3add(near, v3scale(dir, t));
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** 折线总长度（米） */
export function polylineLength(points: { x: number; y: number }[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += v2dist(points[i - 1], points[i]);
  }
  return total;
}
