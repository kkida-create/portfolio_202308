import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";

const pinia = createPinia();

const app = createApp(App);

app.config.globalProperties.$axios = axios;

createApp(App).use(router).use(pinia).mount("#app");
