<template lang="pug">
section.babylonWrapper
  canvas#modelCanvas
</template>
<script lang="ts">
export default {
  name: "City",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { myScene } from "../../../../js/babylon/babylonCity";
import { useApiStore } from "../../../../store/apiStore";
const store = useApiStore();
const modeTimer = async () => {
  const canvas = document.getElementById("modelCanvas") as HTMLCanvasElement;
  await myScene.createScene(canvas, store);
};

onMounted(async () => {
  nextTick(() => {
    let modelTimer = setTimeout(() => {
      modeTimer();
      clearTimeout(modelTimer);
    }, 10);
  });
});

onBeforeUnmount(async () => {
  myScene.disposeModel();
});
</script>
<style lang="sass" scoped>
@use "../../../../styles/_variables" as var
.babylonWrapper
  // border: 3px solid red
  height: calc(100% - 10px)
  position: relative

#modelCanvas
  width: 100%
  height: 100%
  // border: 3px solid pink
  outline: none
</style>

