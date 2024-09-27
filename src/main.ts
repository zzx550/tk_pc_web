import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app =createApp(App)

import './assets/style.css'

import 'ant-design-vue/dist/reset.css';
import { Button } from 'ant-design-vue';

import TopSeek from './components/top_seek.vue'
app.component('TopSeek',TopSeek)

app.use(Button)
app.use(store).use(router).mount('#app')
