// WGSL 着色器：地形 / 水面（视角相关高光）/ 岸线 / billboard 节点 / 剖面线
// 颜色按渠系级别分色阶，缩小后高级别渠段通过 uniform 整体隐藏

export const commonWGSL = /* wgsl */ `
struct Camera {
  vp: mat4x4<f32>,
  eye: vec3<f32>,
  time: f32,
  maxVisibleLevel: f32,
  _pad: vec2<f32>,
};
@group(0) @binding(0) var<uniform> camera: Camera;
`;

export const terrainWGSL = /* wgsl */ `
${commonWGSL}
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) world: vec3<f32>,
  @location(1) mask: f32,
};
@vertex
fn vs_main(@location(0) position: vec3<f32>, @location(1) mask: f32) -> VSOut {
  var out: VSOut;
  out.pos = camera.vp * vec4<f32>(position, 1.0);
  out.world = position;
  out.mask = mask;
  return out;
}
fn hash2(p: vec2<f32>) -> f32 {
  return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453);
}
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  // 冲积扇地物色阶：高处分层着色 + 细粒度纹理
  let z = in.world.z;
  let bands = clamp(z * 0.02, 0.0, 1.0);
  var low = vec3<f32>(0.55, 0.47, 0.32);
  var high = vec3<f32>(0.78, 0.68, 0.48);
  var base = mix(low, high, bands);
  let grain = hash2(floor(in.world.xy * 0.9)) * 0.05;
  base += grain;
  // 扇缘外压暗，突出扇体轮廓
  base = mix(vec3<f32>(0.16, 0.17, 0.15), base, clamp(in.mask, 0.0, 1.0));
  return vec4<f32>(base, 1.0);
}
`;

export const waterWGSL = /* wgsl */ `
${commonWGSL}
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) world: vec3<f32>,
  @location(1) color: vec3<f32>,
  @location(2) level: f32,
  @location(3) uv: vec2<f32>,
};
@vertex
fn vs_main(@location(0) position: vec3<f32>,
           @location(1) color: vec3<f32>,
           @location(2) level: f32,
           @location(3) uv: vec2<f32>) -> VSOut {
  var out: VSOut;
  var p = position;
  // 细微波动（仅 z 向，确定性 sin 场）
  let wave = sin(p.x * 0.06 + camera.time * 1.4) * 0.12
           + sin(p.y * 0.09 - camera.time * 1.1) * 0.09;
  p.z += wave;
  out.pos = camera.vp * vec4<f32>(p, 1.0);
  // 缩小时隐藏高级别渠段：裁剪到近平面后方
  if (level > camera.maxVisibleLevel + 0.5) {
    out.pos = vec4<f32>(0.0, 0.0, 2.0, 1.0);
  }
  out.world = p;
  out.color = color;
  out.level = level;
  out.uv = uv;
  return out;
}
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  if (in.level > camera.maxVisibleLevel + 0.5) { discard; }
  let viewDir = normalize(camera.eye - in.world);
  // 近似水平法线（叠加波纹扰动）
  let n = normalize(vec3<f32>(
    cos(in.world.x * 0.06 + camera.time * 1.4) * 0.03,
    cos(in.world.y * 0.09 - camera.time * 1.1) * 0.03,
    1.0));
  // Fresnel：视角越掠射高光越强——随视角变化的水面高光
  let fresnel = pow(1.0 - clamp(dot(n, viewDir), 0.0, 1.0), 3.0);
  let lightDir = normalize(vec3<f32>(0.35, 0.45, 0.82));
  let spec = pow(max(dot(reflect(-lightDir, n), viewDir), 0.0), 48.0);
  let ripple = 0.5 + 0.5 * sin(in.uv.y * 90.0 + camera.time * 2.0);
  var col = in.color;
  col = mix(col, vec3<f32>(0.85, 0.93, 1.0), fresnel * 0.75);
  col += spec * vec3<f32>(1.0, 0.98, 0.9) * 0.9;
  col += ripple * 0.03;
  return vec4<f32>(col, 1.0);
}
`;

/** 岸线描边：深色宽 ribbon，铺在水面 ribbon 之下 */
export const shoreWGSL = /* wgsl */ `
${commonWGSL}
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) level: f32,
};
@vertex
fn vs_main(@location(0) position: vec3<f32>, @location(1) level: f32) -> VSOut {
  var out: VSOut;
  var p = position;
  p.z -= 0.35;
  out.pos = camera.vp * vec4<f32>(p, 1.0);
  if (level > camera.maxVisibleLevel + 0.5) {
    out.pos = vec4<f32>(0.0, 0.0, 2.0, 1.0);
  }
  out.level = level;
  return out;
}
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  if (in.level > camera.maxVisibleLevel + 0.5) { discard; }
  return vec4<f32>(0.08, 0.1, 0.09, 1.0);
}
`;

export const markerWGSL = /* wgsl */ `
${commonWGSL}
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) color: vec3<f32>,
  @location(1) uv: vec2<f32>,
};
@vertex
fn vs_main(@location(0) center: vec3<f32>,
           @location(1) color: vec3<f32>,
           @location(2) corner: vec2<f32>,
           @location(3) size: f32) -> VSOut {
  var out: VSOut;
  // 屏幕正交的世界水平向量（俯视相机下保持恒定向右/向上）
  let eyeDir = normalize(camera.eye - center);
  let right = normalize(vec3<f32>(eyeDir.y, -eyeDir.x, 0.0));
  let up = normalize(cross(right, eyeDir));
  let p = center + right * corner.x * size + up * corner.y * size;
  out.pos = camera.vp * vec4<f32>(p, 1.0);
  out.color = color;
  out.uv = corner;
  return out;
}
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let r = length(in.uv);
  if (r > 1.0) { discard; }
  let edge = smoothstep(1.0, 0.82, r);
  return vec4<f32>(in.color, edge);
}
`;

export const sectionWGSL = /* wgsl */ `
${commonWGSL}
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) color: vec3<f32>,
};
@vertex
fn vs_main(@location(0) position: vec3<f32>, @location(1) color: vec3<f32>) -> VSOut {
  var out: VSOut;
  out.pos = camera.vp * vec4<f32>(position, 1.0);
  out.color = color;
  return out;
}
@fragment
fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  return vec4<f32>(in.color, 1.0);
}
`;
