<template lang="pug">
AppBar(@drawerState="drawerState")
Navigation
Content
</template>
<script lang="ts" setup>
import { ref, onMounted, nextTick, watch, provide, computed } from "vue";
const drawer = ref<boolean>(true);
const drawerState = () => {
  drawer.value = !drawer.value;
};
provide("drawer", drawer);
</script>
