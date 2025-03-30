<template lang="pug">
v-sheet
  v-timeline(align="start")
    v-timeline-item(
      v-for="(technology, idx) in resume.technology.years",
      :key="idx",
      :dot-color="technology.color",
      size="small"
    )
      template(v-slot:opposite)
        .pt-1.headline.font-weight-bold(
          :style="`color:${technology.color}`",
          v-text="technology.year"
        )
      v-card
        v-card-title.text-h6(:style="`background-color:${technology.color}`")
          p(:style="`color:${technology.titleColor}`") {{ technology.title }}
        v-card-text.bg-white.text--primary
          p {{ `職稱：` + technology.content.title }}
          ul
            li(
              v-for="(list, listIdex) in technology.content.item",
              :key="listIdex"
            )
              | {{ list }}
</template>
<script lang="ts">
export default {
  name: "Technology",
};
</script>
<script lang="ts" setup>
import resume from "../../../../data/resume/resume.json";
</script>
<style lang="sass" scoped>
ul
  list-style-type: disc
</style>