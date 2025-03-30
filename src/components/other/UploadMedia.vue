<template lang='pug'>
v-card(elevation="1" width="400" height="350")
  v-card-title(style="background-color: #0D47A1; color: white") 上傳媒體
  v-divider
  div.pl-2.pr-4.pt-6
    v-file-input(variant="outlined" density="compact" show-size label="檔案")
    v-file-input(variant="outlined"  density="compact" show-size label="縮圖")
    div.d-flex.flex-column
      p.mb-1 檔案格式：JPG、MP4
      p.mb-4 影片請上傳縮圖
    v-card-actions
      v-spacer
      v-btn(class="text-none mb-4" color="blue-darken-1" variant="text" @click="dialog = false") 取消
      v-btn(color="blue-darken-1" variant="text" @click="dialog = false") 確認
</template>

<script setup lang='ts'>
</script>

<style lang='sass' scoped>
</style>