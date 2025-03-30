

<template lang="pug">
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const route = useRoute();
onMounted(() => {
  console.log(route.name);
});
</script>


