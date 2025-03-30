<template lang="pug">
.container
  video(ref="videoRef", style="display: none")
  canvas(ref="canvasRef")
</template>
<script lang="ts">
export default {
  name: "MediaPipe",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { SelfieSegmentation, Results } from "@mediapipe/selfie_segmentation";

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let segmentation: SelfieSegmentation | null = null;
let videoStream: MediaStream | null = null;

// 初始化摄像头
const setupCamera = async () => {
  videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
  if (videoRef.value) {
    videoRef.value.srcObject = videoStream;
    await new Promise(
      (resolve) => (videoRef.value!.onloadedmetadata = () => resolve(null))
    );
    videoRef.value.play();
  }
};

// 初始化 Selfie Segmentation
const setupSegmentation = async () => {
  segmentation = new SelfieSegmentation({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
  });

  segmentation.setOptions({
    modelSelection: 1, // 0: 快速模式，1: 高质量模式
    selfieMode: true,
  });

  segmentation.onResults(onResults);
  await segmentation.initialize();
  processVideo();
};

// 处理视频帧
const processVideo = async () => {
  if (!videoRef.value || !segmentation) return;
  await segmentation.send({ image: videoRef.value });
  requestAnimationFrame(processVideo);
};

const background = new Image();
background.src = "https://picsum.photos/200/300"; // 你的背景图
let isBackgroundLoaded = false;

background.onload = () => {
  isBackgroundLoaded = true;
  console.log("背景加载完成");
};

const onResults = (results: Results) => {
  if (!canvasRef.value || !videoRef.value) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d")!;
  canvas.width = videoRef.value.videoWidth;
  canvas.height = videoRef.value.videoHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 保存当前状态
  ctx.save();

  // 绘制 segmentation mask - 正常方向
  const mask = results.segmentationMask;
  ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-in";

  // 绘制水平翻转的摄像头图像
  ctx.scale(-1, 1); // 水平翻转
  ctx.translate(-canvas.width, 0); // 平移到正确位置
  ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height);
  // 恢复到初始状态
  ctx.restore();
  // 绘制背景
  if (isBackgroundLoaded) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }

  // 恢复正常绘制模式
  ctx.globalCompositeOperation = "source-over";
};

// 生命周期管理
onMounted(async () => {
  await setupCamera();
  await setupSegmentation();
});

onUnmounted(() => {
  if (videoStream) videoStream.getTracks().forEach((track) => track.stop());
});
</script>
<style lang="sass" scoped>
.container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 100%

canvas
  width: 100%
  height: auto
  border: 3px solid red
  height: 100%
</style>