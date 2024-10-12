<template>
  <img class="bac_wz_" src="../assets/wz_bac.jpg" />
  <div style="padding: 40px 0">
    <div class="content_wz" v-html="txt"></div>
  </div>
  <a href="#/">
    <img class="home_bq_" src="../assets/home.png" />
  </a>
</template>
<script setup lang="ts">
  import { api_indexDesc } from '@/requset/api'
  import { ref } from 'vue'

  let txt = ref<string>('')

  api_indexDesc({ name: 'privacy_policy' }).then((res: any) => {
    if (res.success) {
      txt.value = res.data
    }
  })
</script>

<style lang="less" scoped>
  .content_wz {
    top: 540px;
    ::v-deep h1 {
      padding: 10px 0;
    }
  }
</style>
