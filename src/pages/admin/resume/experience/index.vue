<template lang="pug">
v-sheet
  v-timeline(align="start")
    v-timeline-item(
      v-for="(experience, idx) in resume.experience.years",
      :key="idx",
      :dot-color="experience.color",
      size="small"
    )
      template(v-slot:opposite)
        .pt-1.headline.font-weight-bold(
          :style="`color:${experience.color}`",
          v-text="experience.year"
        )
      v-card
        v-card-title.text-h6(:style="`background-color:${experience.color}`")
          p(:style="`color:${experience.titleColor}`") {{ experience.title }}
        v-card-text.bg-white.text--primary
          p {{ `職稱：` + experience.content.title }}
          ul
            li(
              v-for="(list, listIdex) in experience.content.item",
              :key="listIdex"
            )
              | {{ list }}
</template>
<script lang="ts">
export default {
  name: "Experience",
};
</script>
<script lang="ts" setup>
import resume from "../../../../data/resume/resume.json";
</script>
<style lang="sass" scoped>
ul
  list-style-type: disc
</style>