<template lang="pug">
v-main.menu_main
  #main_wrapper.main_wrapper(
    :class="drawer ? (isMobile ? 'pl-16' : 'pl-3') : isMobile ? 'pl-3' : 'pl-16'"
  )
    #title_wrapper.title_wrapper
      h1.pt-2.pb-4.pl-4 {{ titleObj.title.title }}{{ titleObj.title.title_sub1 }}{{ titleObj.title.title_sub2 }}
    .main_box(:style="{ height: `calc(100% - ${elementHeight}px)` }")
      router-view(v-slot="{ Component }")
        transition(name="fade")
          component(:is="Component")
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, inject, computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import { getElementHeight } from "../../func/helpFunc";
import { GetTitleData, projectTitle } from "../../js/plugin/getTitleByRoute";
import type { TitleObj, Ref } from "../../interface/index";

const titleInstance = new GetTitleData();
titleInstance.use(projectTitle);
const route = useRoute();
const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const drawer = inject("drawer") as Ref<boolean>;

const elementHeight = ref(0);
const titleObj = ref<TitleObj>({
  title: "",
  title_sub1: "",
  title_sub2: "",
});

watch(route, async () => {
  titleObj.value.title = await titleInstance.getProjectTitle();
});

onMounted(async () => {
  titleObj.value.title = await titleInstance.getProjectTitle();
  getElementHeight("title_wrapper").then((height) => {
    elementHeight.value = height;
  });
  setTimeout(() => {
    let outElement = document.getElementById("title_wrapper") as HTMLElement;
    const observer = new ResizeObserver(() => {
      getElementHeight("title_wrapper").then((height) => {
        elementHeight.value = height;
      });
    });
    observer.observe(outElement, { box: "border-box" });
  }, 100);
});
</script>
<style lang="sass" scoped>
.menu_main
  overflow: hidden
  height: 100%
  // border: 10px solid red

.main_wrapper
  padding: 10px 10px 10px 10px
  height: 100%
  max-height: 100%
  // border: 13px solid blue
  overflow: hidden

.main_box
  overflow: auto
  // border: 3px solid green
</style>
