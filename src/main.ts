import "./style.css"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"
import { registerPlugins } from "./plugins"

import { createApp } from "vue"

const app = createApp(App)

registerPlugins(app)

app.mount("#app")
