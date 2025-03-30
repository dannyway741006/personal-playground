precision highp float;

varying vec2 vUV;

// Uniforms
uniform vec3 neonColor;  // 霓虹灯的颜色
uniform float time;      // 动画时间
uniform float intensity; // 发光强度

void main() {
  vec2 center = vec2(0.5, 0.5); // UV 中心点
  float distance = length(vUV - center); // 距离中心的距离

    // 创建动态的光环效果
  float glow = sin(distance * 10.0 - time * 2.0) * 0.5 + 0.5;

    // 使光环向外扩散
  glow = pow(1.0 - distance, 3.0) * glow * intensity;

  gl_FragColor = vec4(neonColor, glow);
}