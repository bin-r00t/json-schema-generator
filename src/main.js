import { createApp } from "vue";
import "./style.css";
import Main from "./Main.vue";
import router from "./router";

createApp(Main).use(router).mount("#app");
