import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Vuetify from "vite-plugin-vuetify"
import glsl from "vite-plugin-glsl"

export default defineConfig({
  build: {
    outDir: "dist", // 確保輸出到 dist 資料夾
    assetsDir: "assets",
    target: "es2022",
  },
  plugins: [
    vue(),
    Vuetify({
      autoImport: true,
      styles: { configFile: "src/styles/settings.sass" },
    }),
    glsl(),
  ],
  base: "/personal-playground/", // 與你的 GitHub Pages 路徑一致
})
