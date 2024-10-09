<template>
  <div
    id="app"
    :style="
      show ? { 'background-color': '#fff' } : { 'background-color': '#f7f7f7' }
    "
  >
    <img
      v-if="show"
      class="bac_app"
      style="width: 100%"
      src="./assets/home/bac_top.png"
    />
    <img
      v-else
      class="bac_app"
      style="width: 100%"
      src="./assets/home/bac_top_h.png"
    />
    <router-view class="content" />
  </div>
  <globalFloatingIcon v-if="login" />
</template>
<script setup lang="ts">
  import { ref, watch, getCurrentInstance } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  //路由跳转
  const router = useRouter()
  //获取数据
  // const route = useRoute()
  // const { proxy } = getCurrentInstance()
  const show = ref<Boolean>(true)
  const login = ref<Boolean>(true)

  //监听当前路由
  watch(
    () => router.currentRoute.value.path,
    (newValue, oldValue) => {
      //获取所有路由
      // var allroute = proxy.$router.options.routes
      // console.log('newValue :>> ', newValue)
      if (newValue == '/login') {
        login.value = false
      } else {
        login.value = true
      }
      if (newValue == '/') {
        show.value = true
      } else {
        show.value = false
      }
    },
    { immediate: true }
  )

  window.addEventListener('resize', function () {
    if (window.innerWidth < 800) {
      // 窗口宽度小于800时执行的代码
      window.location.href = 'https://www.mysshopvipb.net/app/#/'
      console.log('窗口宽度小于800像素')
    }
  })

  // https://www.mysshopvipb.net/app/#/
</script>

<style lang="less" scoped>
  #app {
    min-height: 100vh;
    .bac_app {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .content {
      padding-top: 10px;
    }
  }
</style>
