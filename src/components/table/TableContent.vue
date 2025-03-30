<template lang='pug'>
v-data-table(
  v-model:page="pageData",
  :headers="headerIndex.headersPost",
  :items="dessertData",
  :items-length="totalItems",
  :loading="loading",
  :items-per-page="itemsPerPage",
  @update:options="loadItems"
)
  template(v-slot:loading)
    v-skeleton-loader(type="table-row@4")
  template(v-slot:[`item.imagePreview`]="{ item }")
    v-col
      v-img(:src="item.imagePreview", alt="預覽圖片", width="192", height="108")
  template(v-slot:[`item.status`]="{ item }")
    v-chip.ma-2(:color="item.status === 1 ? `tag-1` : `tag-2`", label)
      v-icon(
        :icon="item.status === 1 ? `mdi-arrow-up-bold-box-outline` : `mdi-arrow-down-bold-box-outline`",
        start
      )
      | {{ item.status === 1 ? "上架" : "下架" }}
  template(v-slot:[`item.setting`]="{ item }")
    tr.tableContent
      td.tableContent
        v-btn.model_list_btn(prepend-icon="mdi-pen", color="primary") {{ `Edit` }}
        v-btn.model_list_btn(
          prepend-icon="mdi-delete-empty-outline",
          color="btn-delete"
        ) {{ `Delete` }}
  template(#bottom)
</template>

<script setup lang='ts'>
//composition api
import { ref, onMounted, inject } from "vue";
import type { Ref } from "../../interface/index";

//vue template
// import TableTitle from "../../../../../slot/template/TableTitle.vue";
// import TableBody from "../../../../../slot/template/TableBody.vue";
//json Data
interface Dessert {
  imagePreview: string;
  name: number;
  status: number;
  created: string | number;
  edited: string | number;
  [key: string]: string | number;
}
import headerIndex from "../../data/headerIndex.json";
const dessertData = inject("desserts", []);
// const page = ref<number>(1);
const pageData = inject("page") as Ref<number>;
const totalItems = ref<number>(4);
const loading = ref<boolean>(false);
const itemsPerPage = ref(7);
const serverItems = ref<Array<Object>>([]);
// const pageCount = computed(() => {
//   return Math.ceil(dessertData.length / itemsPerPage.value);
// });

interface LoadItemsParams {
  page: number;
  itemsPerPage: number;
  sortBy: Array<{ key: string; order: string }>;
}

const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }: LoadItemsParams) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = dessertData.slice();

        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          console.log("sortBy::", sortBy, items);
          items.sort((a: Dessert, b: Dessert) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc"
              ? Number(bValue) - Number(aValue)
              : Number(aValue) - Number(bValue);
          });
        }
        const paginated = items.slice(start, end);
        console.log("paginated::", paginated, items.length);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};
interface IResponse {
  items: Array<object>;
  total: number;
}

const loadItems = ({ page, itemsPerPage, sortBy }: LoadItemsParams) => {
  console.log("loading data::", page, itemsPerPage, sortBy);
  loading.value = true;
  FakeAPI.fetch({ page, itemsPerPage, sortBy }).then((response: unknown) => {
    const { items, total } = response as IResponse;
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
};

onMounted(async () => {
  console.log("mounted::", dessertData);
});
</script>

<style lang='sass' scoped>
.v-card-title
  background-color: #BDBDBD
.tableContent
  display: flex
  justify-content: center
  column-gap: 10px

.model_list_btn
  font-size: 12px
  padding: 0 14px
  height: 31px
</style>