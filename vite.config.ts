import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Layouts from "vite-plugin-vue-layouts"
import Vuetify from "vite-plugin-vuetify"
import glsl from "vite-plugin-glsl"

export default defineConfig(({ mode }) => ({
  server: {
    host: true, // 允许使用本地 IP 地址访问
    allowedHosts: [
      ".ngrok-free.app", // 通配符，允許所有 *.ngrok-free.app 子域名
    ],
    port: mode === "production" ? 3030 : 5174,
  },
  ssr: {
    noExternal: mode === "development" ? ["vue-router"] : [],
  },
  build: {
    target: "es2022", // 或 'esnext'
    outDir: "dist",
    assetsDir: "assets",
    terserOptions: {
      compress: {
        drop_console: true,
      },
      output: {
        comments: false,
      },
      toplevel: true, //增加壓縮率
    },
    chunkSizeWarningLimit: 5000, //大於5MB警告
  },
  plugins: [
    glsl(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components(),
    // Pages({
    //   dirs: "src/pages",
    //   exclude: ["**/components/*.vue"],
    //   extendRoute(route, parent) {
    //     if (route.path === "/")
    //       return {
    //         ...route,
    //         // redirect: "login",
    //       }
    //   },
    //   importMode: "async",
    // }),
    // Layouts({
    //   layoutsDirs: "src/layouts",
    //   defaultLayout: "deshboard",
    // }),

    vue(),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.sass",
      },
    }),
  ],
  base: "/personal-playground/", // 必須與你的倉庫名稱一致
}))
