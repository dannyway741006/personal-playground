import "./style.css";
import App from "./App.vue";
import { registerPlugins } from "./plugins";
import { createApp } from "vue";
const app = createApp(App);
registerPlugins(app);
app.mount("#app");
//# sourceMappingURL=main.js.map