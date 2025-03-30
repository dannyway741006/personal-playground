import { ref } from 'vue';
/**
 * 拖曳排序功能
 * 使用範例可參閱底部的使用說明
 * @param data - 要排序的資料，必須是ref
 * @returns 回傳三個函式，分別是startDrag, onDrop, dragEnter
 */
export function useDragDrop(data) {
    const destinationIndex = ref();
    const startDrag = (event, item) => {
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('itemID', item.id.toString());
        }
        else {
            console.log('event.dataTransfer is undefined');
        }
    };
    const onDrop = (event) => {
        const itemID = event.dataTransfer?.getData('itemID');
        const index = data.value.findIndex((item) => item.id.toString() === itemID);
        const draggedItem = data.value.splice(index, 1)[0];
        data.value.splice(destinationIndex.value ?? 0, 0, draggedItem);
    };
    const dragEnter = (event, index) => {
        destinationIndex.value = index;
    };
    return { startDrag, onDrop, dragEnter };
}
/*
使用說明
要使用這個功能，只需要在要排序的元素上加上相對應的事件即可

<script>
import { useDragDrop } from '@/func/dragAndSort'
const data = ref([])                                         你要排序的資料，可以任意命名，必須是ref
const { startDrag, onDrop, dragEnter } = useDragDrop(data)
const isSortable = ref(false)                                這個是用來控制是否可以拖曳的狀態

<template>
v-list.pa-2(@drop="onDrop($event, destinationIndex)" @dragover.prevent)
  v-list-item(v-for='(item, index) in data' :key='index' @dragstart="startDrag($event, category)" @dragenter="dragEnter($event, index)")
v-row(align='center' :draggable="isSortable")

*/ 
//# sourceMappingURL=dragAndSort.js.map