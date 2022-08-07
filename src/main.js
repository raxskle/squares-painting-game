import { createApp } from "vue";
import VueKonva from "vue-konva";

import App from "./App.vue";
import router from "./router";

import "@/assets/font/font.css";

const app = createApp(App);
app.use(router);
app.use(VueKonva);
app.mount("#app");
