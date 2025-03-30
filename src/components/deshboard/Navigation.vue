<template lang="pug">
v-navigation-drawer.menu_drawer(
  color="admin-layout",
  v-model="drawer",
  prominent,
  :width="drawer ? (isMobile ? '256' : '256') : isMobile ? '0.00000000001' : '56'"
)
  v-list.h-100(:opened="openArr", @update:opened="updateOpenArr")
    .c_avatar
      v-avatar.logo_img(:size="!drawer === true ? 40 : 80")
        v-img(src="/images/favicon.ico")
      v-list-item(v-show="drawer", title="英業達股份有限公司")
    v-divider.w-75.ma-auto
    .list_wrapper
      .list_box.h-100
        //-選單 第一層
        v-list-group(
          v-for="item in menu",
          :key="item.id",
          :value="item.key",
          :prepend-icon="item.icon",
          :append-icon="item.subLinks === null ? 'null' : null"
        )
          template(v-slot:activator="{ props }")
            v-list-item.menu_list(
              :key="item.id",
              v-bind="props",
              :title="item.text",
              active-class="bgActive_1",
              @click.prevent="control({ subKey: item.key }, item?.to)"
            )
          //-選單 第二層
          v-list-group.sub_item_list(
            v-for="(sub, i) in item.subLinks",
            :key="i",
            :value="sub.key",
            :prepend-icon="sub.icon",
            :append-icon="sub.subLinks === null ? 'null' : null"
          )
            template(v-slot:activator="{ props }")
              v-list-item.menu_item(
                v-show="drawer",
                :key="sub.id",
                v-bind="props",
                :title="sub.text",
                active-class="bgActive_2",
                @click.prevent="control({ fatherKey: sub.fatherKey, subKey: sub.key }, sub?.to)"
              )
            //-選單 第三層
            v-list-item.menu_sub_item(
              v-show="drawer",
              v-for="(subItem, i) in sub.subLinks",
              :key="i",
              :value="subItem",
              :title="subItem.text",
              @click.prevent="control({ fatherKey: sub.fatherKey, subKey: sub.key }, subItem?.to)"
            )
</template>
<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import navigation from "../../data/navigation.json";
import { ref, inject, computed } from "vue";
import type { Ref, Keys } from "../../interface/index";

const { mobile } = useDisplay();
const isMobile = computed(() => mobile.value);
const drawer = inject("drawer") as Ref<boolean>;
const router = useRouter();
const menu = ref(navigation.menuItems);
const openArr = ref<string[]>([]);
const updateArr = ref<string[]>([]);

const control = (keys: Keys, to: string) => {
  let keyStatus: Keys = keys;
  console.log("control::", keys, to);
  openArr.value = [];

  let action = {
    true: () => {
      const keysToPush = ["subKey", "fatherKey"]
        .filter((key) => keyStatus[key as keyof Keys] !== undefined)
        .map((key) => keyStatus[key as keyof Keys] as string);
      openArr.value.push(...keysToPush);
    },
    false: () => {
      if (keyStatus.fatherKey) {
        openArr.value.push(keyStatus.fatherKey);
      }
    },
  };

  const isCheckUpdateArr = updateArr.value.includes(keyStatus.subKey || "");
  const isActionKey =
    (keyStatus.fatherKey || keyStatus.subKey) && isCheckUpdateArr;

  action[isActionKey ? "true" : "false"]();
  if (to !== null) router.push(to);
};

const updateOpenArr = (newOpenArr: string[]) => {
  openArr.value = newOpenArr;
  updateArr.value = newOpenArr;
};
</script>
<style lang="sass" scoped>
.c_avatar
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  padding: 15px
  .v-img__img--cover
    object-fit: contain
.logo_img
  background: #000000
  width: 100%
  height: 100%
.bgActive_1
  background-color: rgba(#ffffff, 0.7 )
  color: #424242
.bgActive_2
  background-color: rgba(#BDBDBD, 0.3)
  color: white
</style>
  