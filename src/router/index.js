import { createRouter, createWebHistory } from "vue-router";
// import { setupLayouts } from "virtual:generated-layouts"
// import generatedRoutes from "virtual:generated-pages"
import AboutMe from "../pages/admin/resume/about-me/index.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: AboutMe,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
//# sourceMappingURL=index.js.map