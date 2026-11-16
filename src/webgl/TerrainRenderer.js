// WebGL2 地形渲染器：曲率/坡度着色、雕刻范围、偏移轮廓、自交标记、样条、拼缝
import { perspective, lookAt, multiply, invert, screenRay, vec3 } from '../lib/mat4.js'

const VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in float aSlope;
layout(location=3) in float aCurv;
uniform mat4 uMVP;
uniform vec3 uLightDir;
uniform int uMode; // 0 高程 1 曲率 2 坡度分级
uniform float uCurvScale;
out vec3 vColor;
out float vShade;
vec3 slopeColor(float d){
  if(d < 15.0) return vec3(0.36,0.72,0.38);
  if(d < 25.0) return vec3(0.93,0.83,0.34);
  if(d < 35.0) return vec3(0.95,0.58,0.22);
  return vec3(0.86,0.27,0.24);
}
vec3 curvColor(float c){
  float t = clamp(c * uCurvScale * 0.5 + 0.5, 0.0, 1.0);
  vec3 lo = vec3(0.20,0.42,0.85); // 沟谷/凹 蓝
  vec3 mid = vec3(0.93,0.93,0.88);
  vec3 hi = vec3(0.83,0.24,0.22); // 山脊/凸 红
  return t < 0.5 ? mix(lo, mid, t*2.0) : mix(mid, hi, (t-0.5)*2.0);
}
void main(){
  gl_Position = uMVP * vec4(aPos,1.0);
  if(uMode == 1) vColor = curvColor(aCurv);
  else if(uMode == 2) vColor = slopeColor(aSlope);
  else {
    float t = clamp(aPos.z / 32.0, 0.0, 1.0);
    vColor = mix(vec3(0.30,0.45,0.33), vec3(0.78,0.70,0.55), t);
  }
  vShade = 0.45 + 0.55 * max(dot(normalize(aNormal), normalize(uLightDir)), 0.0);
}`

const FRAG = `#version 300 es
precision highp float;
in vec3 vColor;
in float vShade;
out vec4 frag;
void main(){ frag = vec4(vColor * vShade, 1.0); }`

const LINE_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aColor;
uniform mat4 uMVP;
out vec3 vColor;
void main(){ gl_Position = uMVP * vec4(aPos,1.0); vColor = aColor; }`
const LINE_FRAG = `#version 300 es
precision highp float;
in vec3 vColor;
out vec4 frag;
void main(){ frag = vec4(vColor, 1.0); }`

const POINT_VERT = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aColor;
layout(location=2) in float aSize;
uniform mat4 uMVP;
out vec3 vColor;
void main(){ gl_Position = uMVP * vec4(aPos,1.0); gl_PointSize = aSize; vColor = aColor; }`
const POINT_FRAG = `#version 300 es
precision highp float;
in vec3 vColor;
out vec4 frag;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  if(length(d) > 0.5) discard;
  float ring = smoothstep(0.42,0.5,length(d));
  frag = vec4(mix(vColor, vec3(0.05), ring*0.8), 1.0);
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
  return s
}
function program(gl, vs, fs) {
  const p = gl.createProgram()
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs))
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p))
  return p
}

export class TerrainRenderer {
  constructor(canvas) {
    this.canvas = canvas
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: false })
    if (!gl) throw new Error('当前浏览器不支持 WebGL2')
    this.gl = gl
    this.prog = program(gl, VERT, FRAG)
    this.lineProg = program(gl, LINE_VERT, LINE_FRAG)
    this.pointProg = program(gl, POINT_VERT, POINT_FRAG)
    this.vao = gl.createVertexArray()
    this.vbo = gl.createBuffer()
    this.indexBuf = gl.createBuffer()
    this.lineVao = gl.createVertexArray()
    this.lineVbo = gl.createBuffer()
    this.pointVao = gl.createVertexArray()
    this.pointVbo = gl.createBuffer()
    this.mode = 0
    this.hf = null
    this.cam = { yaw: 0.7, pitch: 0.62, dist: 150, target: [50, 40, 10] }
    this.overlays = { lines: [], points: [], quads: [] }
    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.10, 0.12, 0.15, 1)
    this.resize()
    this.ro = new ResizeObserver(() => { this.resize(); this.render() })
    this.ro.observe(canvas)
  }

  resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const w = Math.max(1, Math.floor(this.canvas.clientWidth * dpr))
    const h = Math.max(1, Math.floor(this.canvas.clientHeight * dpr))
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w; this.canvas.height = h
    }
    this.gl.viewport(0, 0, w, h)
  }

  setTerrain(hf, mode) {
    this.hf = hf
    if (mode !== undefined) this.mode = mode
    const gl = this.gl
    const cols = hf.nx + 1, rows = hf.ny + 1
    const verts = new Float32Array(cols * rows * 8)
    let curvMax = 1e-6
    for (let iy = 0; iy <= hf.ny; iy++) {
      for (let ix = 0; ix <= hf.nx; ix++) {
        const [x, y] = hf.xy(ix, iy)
        const n = hf.normal(ix, iy)
        const slope = hf.slopeDeg(ix, iy)
        const curv = hf.curvature(ix, iy)
        curvMax = Math.max(curvMax, Math.abs(curv))
        const o = (ix + cols * iy) * 8
        verts.set([x, y, hf.at(ix, iy), n[0], n[1], n[2], slope, curv], o)
      }
    }
    this.curvScale = 1 / curvMax
    const idx = []
    for (let iy = 0; iy < hf.ny; iy++) {
      for (let ix = 0; ix < hf.nx; ix++) {
        const a = ix + cols * iy, b = a + 1, c = a + cols, d = c + 1
        idx.push(a, c, b, b, c, d)
      }
    }
    this.indexCount = idx.length
    gl.bindVertexArray(this.vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.DYNAMIC_DRAW)
    const stride = 8 * 4
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0)
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 12)
    gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.FLOAT, false, stride, 24)
    gl.enableVertexAttribArray(3); gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 28)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuf)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(idx), gl.DYNAMIC_DRAW)
    gl.bindVertexArray(null)
    this.render()
  }

  // overlays: { quads:[{x0,y0,x1,y1,color,z,alpha}], lines:[{pts:[[x,y,z]..],color,loop}], points:[{p:[x,y,z],color,size}] }
  setOverlays(o) { this.overlays = o; this.render() }

  vp() {
    const { yaw, pitch, dist, target } = this.cam
    const eye = [
      target[0] + dist * Math.cos(pitch) * Math.sin(yaw),
      target[1] + dist * Math.cos(pitch) * Math.cos(yaw),
      target[2] + dist * Math.sin(pitch),
    ]
    const proj = perspective(50 * Math.PI / 180, this.canvas.width / this.canvas.height, 0.5, 2000)
    const view = lookAt(eye, target, [0, 0, 1])
    return { proj, view, mvp: multiply(proj, view), eye }
  }

  screenRay(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect()
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1
    const ndcY = 1 - ((clientY - rect.top) / rect.height) * 2
    const { mvp } = this.vp()
    return screenRay(invert(mvp), ndcX, ndcY)
  }

  render() {
    const gl = this.gl
    if (!this.hf) return
    this.resize()
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    const { mvp } = this.vp()

    gl.useProgram(this.prog)
    gl.uniformMatrix4fv(gl.getUniformLocation(this.prog, 'uMVP'), false, mvp)
    gl.uniform3f(gl.getUniformLocation(this.prog, 'uLightDir'), -0.45, -0.35, 0.82)
    gl.uniform1i(gl.getUniformLocation(this.prog, 'uMode'), this.mode)
    gl.uniform1f(gl.getUniformLocation(this.prog, 'uCurvScale'), this.curvScale || 1)
    gl.bindVertexArray(this.vao)
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_INT, 0)

    // 透明面（雕刻单元 / 悬停单元）
    const quads = this.overlays.quads || []
    if (quads.length) {
      const data = []
      for (const q of quads) {
        const z = q.z
        const a = q.color, al = q.alpha
        data.push(
          q.x0, q.y0, z, ...a, al, q.x1, q.y0, z, ...a, al, q.x1, q.y1, z, ...a, al,
          q.x0, q.y0, z, ...a, al, q.x1, q.y1, z, ...a, al, q.x0, q.y1, z, ...a, al
        )
      }
      const buf = new Float32Array(data)
      gl.useProgram(this.fillProg || (this.fillProg = this._fillProgram()))
      const fp = this.fillProg
      gl.uniformMatrix4fv(gl.getUniformLocation(fp, 'uMVP'), false, mvp)
      gl.bindVertexArray(this.fillVao || (this.fillVao = gl.createVertexArray()))
      gl.bindBuffer(gl.ARRAY_BUFFER, this.fillVbo || (this.fillVbo = gl.createBuffer()))
      gl.bufferData(gl.ARRAY_BUFFER, buf, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 7 * 4, 0)
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 7 * 4, 12)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.depthMask(false)
      gl.drawArrays(gl.TRIANGLES, 0, quads.length * 6)
      gl.depthMask(true)
      gl.disable(gl.BLEND)
    }

    // 线
    const lines = this.overlays.lines || []
    if (lines.length) {
      const data = []
      for (const ln of lines) {
        const c = ln.color
        for (let i = 0; i < ln.pts.length - 1; i++) {
          data.push(...ln.pts[i], ...c, ...ln.pts[i + 1], ...c)
        }
        if (ln.loop && ln.pts.length > 2) data.push(...ln.pts[ln.pts.length - 1], ...c, ...ln.pts[0], ...c)
      }
      gl.useProgram(this.lineProg)
      gl.uniformMatrix4fv(gl.getUniformLocation(this.lineProg, 'uMVP'), false, mvp)
      gl.bindVertexArray(this.lineVao)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.lineVbo)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * 4, 0)
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 6 * 4, 12)
      gl.drawArrays(gl.LINES, 0, data.length / 6)
    }

    // 点
    const points = this.overlays.points || []
    if (points.length) {
      const data = []
      for (const pt of points) data.push(...pt.p, ...pt.color, pt.size)
      gl.useProgram(this.pointProg)
      gl.uniformMatrix4fv(gl.getUniformLocation(this.pointProg, 'uMVP'), false, mvp)
      gl.bindVertexArray(this.pointVao)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.pointVbo)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 7 * 4, 0)
      gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 7 * 4, 12)
      gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 7 * 4, 24)
      gl.drawArrays(gl.POINTS, 0, points.length)
    }
    gl.bindVertexArray(null)
  }

  _fillProgram() {
    const gl = this.gl
    const vs = `#version 300 es
      layout(location=0) in vec3 aPos; layout(location=1) in vec4 aColor;
      uniform mat4 uMVP; out vec4 vColor;
      void main(){ gl_Position = uMVP*vec4(aPos,1.0); vColor=aColor; }`
    const fs = `#version 300 es
      precision highp float; in vec4 vColor; out vec4 frag;
      void main(){ frag=vColor; }`
    return program(gl, vs, fs)
  }

  // 最近样条控制点（3D 距离阈值，屏幕空间近似）
  pickControlPoint(ray, splines) {
    let best = null, bestD = 1.6
    for (const sp of splines) {
      sp.controls.forEach((c, i) => {
        const p = [c.x, c.y, this.hf ? this.hf.sample(c.x, c.y) + 0.6 : c.y]
        const v = vec3.sub(p, ray.origin)
        const t = vec3.dot(v, ray.dir)
        if (t < 0) return
        const proj = vec3.add(ray.origin, vec3.scale(ray.dir, t))
        const d = vec3.len(vec3.sub(p, proj))
        if (d < bestD) { bestD = d; best = { splineId: sp.id, index: i, point: p } }
      })
    }
    return best
  }

  dispose() { this.ro.disconnect() }
}
