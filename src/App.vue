<template lang="pug">
v-app
  router-view 
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { allResize } from "./func/helpFunc";

//api
// import { getLang } from "./api/lang";

// import { useTheme } from "vuetify";
// const theme = useTheme();

// 取得語系
onMounted(async () => {
  let app = document.getElementById("app") as HTMLElement;
  allResize(app);
  // try {
  //   const res = await getLang();
  //   appStore.setOpenLang(res.data);
  // } catch (error) {
  //   console.log(error);
  // }
});
</script>

<style lang="sass">
@import "./styles/main"
</style>
