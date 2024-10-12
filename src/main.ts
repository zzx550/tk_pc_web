import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const app = createApp(App);

import "vant/lib/index.css";
import { CountDown, Uploader, List } from "vant";
app.use(CountDown);
app.use(Uploader);
app.use(List);

import "./assets/style.css";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";

import TopSeek from "./components/top_seek.vue";
import OpenTip from "./components/opn_tip.vue";
import BotBase from "./components/botmm.vue";
import globalFloatingIcon from "./components/globalFloatingIcon.vue";
import Captcha from "./components/Captcha.vue";
app.component("TopSeek", TopSeek);
app.component("OpenTip", OpenTip);
app.component("BotBase", BotBase);
app.component("globalFloatingIcon", globalFloatingIcon);
app.component("Captcha", Captcha);

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css';
import 'swiper/css/bundle';
app.use(VueAwesomeSwiper);

import i18n from "./lang";
app.use(i18n);

app.use(Antd);
app.use(store).use(router).mount("#app");
