import { createApp } from "vue";
import "./index.css";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import App from "./App.vue";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable);

app.mount("#app");
