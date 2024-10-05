import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);

import "vant/lib/index.css";
import { CountDown, Uploader } from "vant";
app.use(CountDown);
app.use(Uploader);

import "./assets/style.css";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";

import TopSeek from "./components/top_seek.vue";
import OpenTip from "./components/opn_tip.vue";
app.component("TopSeek", TopSeek);
app.component("OpenTip", OpenTip);

app.use(Antd);
app.use(store).use(router).mount("#app");
