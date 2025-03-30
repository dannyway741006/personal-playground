<template lang='pug'>
v-btn(color="primary") {{ props.mediaType === 'video' ? '選擇影片媒體' : '選擇圖片媒體' }}
  v-dialog(activator="parent" max-width="1200" v-model="isActive")
    v-card(rounded="lg")
      //標題及關閉按鈕
      v-card-title.d-flex.justify-space-between.align-center
        .text-h5.text-medium-emphasis.ps-2 從媒體庫選擇
        v-btn(icon="mdi-close" variant="text" @click="handelCancel")

      v-divider.mb-4
      //媒體內容
      v-card-text
        v-table(fixed-header hover=true)
          thead
            tr
              th.text-start 編號
              th.text-start 縮圖
              th.text-start 名稱
              th.text-start 選擇
          tbody
            tr(v-for="(media, index) in dummyMedia" :key="index")
              td {{media.id}}
              td 
                v-img(:src="media.thumbnail" alt="縮圖" width="192" height="108")
              td {{media.name}}
              td
                v-checkbox(v-model="selectedMediaId" :value="media.id")

      v-divider.mt-2

      //footer按鈕
      v-card-actions.my-2.d-flex.justify-end
        v-btn(color="grey darken-1" variant="text" @click="handelCancel") 取消
        v-btn(color="primary" variant="text" flat @click="handleSubmit") 確認

</template>

<script setup lang='ts'>
import { ref } from 'vue'
const selectedMediaId = ref([])
const isActive = ref(false)

const props = defineProps<{
  mediaType: string
}>()

//取消
const handelCancel = () => {
  console.log('取消')
  isActive.value = false
}
//確認
const handleSubmit = () => {
  console.log('確認')
  isActive.value = false
  console.log(selectedMediaId.value)
}


const dummyMedia = ref(
  [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/200/300',
      name: 'nameeeee'
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/200/300',
      name: 'neee'
    },
    {
      id: 3,
      thumbnail: 'https://picsum.photos/200/300',
      name: 'neeee'
    },
    {
      id: 4,
      thumbnail: 'https://picsum.photos/200/300',
      name: 'namee'
    },
    {
      id: 5,
      thumbnail: 'https://picsum.photos/200/300',
      name: 'na'
    },
  ]
)
</script>

<style lang='sass' scoped>
</style>