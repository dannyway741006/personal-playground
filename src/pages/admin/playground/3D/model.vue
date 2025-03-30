<template lang="pug">
section.babylonWrapper
  canvas#modelCanvas
  .babylon__wrapper
    .babylon__btn.d-flex.justify-center.align-center(
      @click.stop="controlModel('model', false)"
    )
      img(:src="buttonData[store.locale]?.[modelState]?.url", alt="icon")
      p {{ buttonData[store.locale]?.[modelState].name }}
    .babylon__btn.d-flex.justify-center.align-center.reset_btn(
      @click.stop="resetModel('model_reset')"
    )
      img(:src="buttonData[store.locale]?.reset?.url", alt="icon")
      p {{ buttonData[store.locale]?.reset.name }}
</template>
<script lang="ts">
export default {
  name: "Model",
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { myScene, togglePyramids } from "../../../../js/babylon/babylonModel";
import { useApiStore } from "../../../../store/apiStore";

const buttonData = ref({
  zh_cht: {
    id: 1,
    open: {
      name: "收合",
      url: "/images/model.png",
    },

    close: {
      name: "展開",
      url: "/images/close-model.png",
    },
    reset: {
      name: "Reset",
      url: "/images/icon/360.png",
    },
  },
  en: {
    id: 1,
    open: {
      name: "close",
      url: "/images/model.png",
    },
    close: {
      name: "open",
      url: "/images/close-model.png",
    },
    reset: {
      name: "Reset",
      url: "/images/icon/360.png",
    },
  },
});
const store = useApiStore();
const modelState = ref("close");
const proIsModelOpen = ref(false);
const isReset = ref(false);
const resetModel = () => {
  proIsModelOpen.value = true;
  isReset.value = true;
  myScene.appModelReset();
  controlModel();
};
const controlModel = () => {
  if (myScene.scene && myScene.vuePbrMaterial) {
    togglePyramids(
      proIsModelOpen.value,
      myScene.vueConeTop,
      myScene.vueConeBottom,
      myScene.vueHeight,
      myScene.scene
    );
  }
  proIsModelOpen.value
    ? (modelState.value = "close")
    : (modelState.value = "open");
  proIsModelOpen.value = !proIsModelOpen.value;
};
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
.babylon
  &__wrapper
    // border: 2px solid red
    position: absolute
    top: calc(100% - 115px)
    transform: translate(-50%, -50%)
    left: 50%
    display: flex
    gap: 60px
  &__btn
    cursor: pointer
    padding: 17px
    border: 1px solid
    border-image-source: linear-gradient(131.92deg, rgba(255, 255, 255, 0.2) 14.14%, rgba(0, 0, 0, 0) 47.67%, rgba(255, 255, 255, 0.2) 82.63%)
    background: linear-gradient(180deg, rgba(239, 241, 249, 0.6) 0%, rgba(239, 241, 249, 0.048) 100%)
    border-radius: 16px
    background-color: var.$white-1
    img
      width: 32px
      width: 32px
      display: block
      margin-right: 8px
    p
      font-size: 20px
      font-weight: 700
      line-height: 30px
      letter-spacing: 0.04em
      color: var.$red-1
</style>