<template lang="pug">
v-app-bar(prominent, color="admin-layout")
  v-app-bar-nav-icon(
    variant="text",
    :icon="hamburger",
    @click.stop="controlSidebar"
  )
  .img_box
    img(:src="navigation.sidebarLogo.logoSrc", alt="Logo")
  //- v-toolbar-title {{ `Dashboard` }}
  v-spacer
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, inject } from "vue";
import navigation from "../../data/navigation.json";
interface Ref<T> {
  value: T;
}
const emits = defineEmits(["drawerState"]);
const drawer = inject("drawer") as Ref<boolean>;
const hamburger = ref<string>("mdi-menu-close");

const controlSidebar = () => {
  emits("drawerState");
};
watch(drawer, (newValue) => {
  hamburger.value = newValue ? "mdi-menu-close" : "mdi-menu-open";
});
</script>
<style lang="sass" scoped>
.img_box
  width: 100%
  height: 100%
  max-width: 140px
  max-height: 45px
  background: #fff
  padding: 10px
  margin-left: 12px
  img
    width: 100%
    height: 100%
    object-fit: contain
    object-position: center
</style>