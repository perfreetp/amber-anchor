// 轨道相机：旋转 / 平移 / 缩放，输出 view、projection 矩阵
import { clamp, mat4LookAt, mat4Perspective, v3, type Vec3 } from '../core/math';

export class OrbitCamera {
  target: Vec3 = v3(0, 400, 0);
  yaw = 0; // 绕 z 轴方位角
  pitch = 0.95; // 俯视角（0 = 正俯视）
  distance = 2600;
  fov = (50 * Math.PI) / 180;
  near = 1;
  far = 20000;
  aspect = 1;

  setAspect(w: number, h: number) {
    this.aspect = w / h;
  }

  get eye(): Vec3 {
    const cp = Math.cos(this.pitch);
    return v3(
      this.target.x + this.distance * cp * Math.sin(this.yaw),
      this.target.y + this.distance * cp * Math.cos(this.yaw),
      this.target.z + this.distance * Math.sin(this.pitch)
    );
  }

  view() {
    return mat4LookAt(this.eye, this.target, v3(0, 0, 1));
  }

  proj() {
    return mat4Perspective(this.fov, this.aspect, this.near, this.far);
  }

  rotate(dx: number, dy: number) {
    this.yaw -= dx * 0.005;
    this.pitch = clamp(this.pitch + dy * 0.004, 0.08, 1.45);
  }

  /** 屏幕像素位移 → 地面平移（按当前距离缩放） */
  pan(dx: number, dy: number) {
    const scale = this.distance * 0.0016;
    const sx = Math.sin(this.yaw);
    const cx = Math.cos(this.yaw);
    // 屏幕右向量（世界 xy）
    this.target.x += (-cx * dx + sx * dy) * scale;
    this.target.y += (sx * dx + cx * dy) * scale;
  }

  zoom(delta: number) {
    this.distance = clamp(this.distance * Math.exp(delta * 0.0012), 120, 9000);
  }

  /** 当前地面分辨率（米/像素），用于 LOD 层级隐藏判定 */
  metersPerPixel(height: number): number {
    return (2 * this.distance * Math.tan(this.fov / 2)) / height;
  }
}
