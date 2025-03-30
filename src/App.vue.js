/// <reference types="../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted } from "vue";
import { allResize } from "./func/helpFunc";
//api
// import { getLang } from "./api/lang";
// import { useTheme } from "vuetify";
// const theme = useTheme();
// 取得語系
onMounted(async () => {
    let app = document.getElementById("app");
    allResize(app);
    // try {
    //   const res = await getLang();
    //   appStore.setOpenLang(res.data);
    // } catch (error) {
    //   console.log(error);
    // }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map