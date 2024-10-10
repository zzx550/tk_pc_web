<template>
  <div class="merchantSettled" style="padding: 40px 0">
    <div v-html="txt"></div>
  </div>
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
  // .merchantSettled {
  //   background-color: #fff;
  //   position: relative;
  //   z-index: 5;
  //   padding: 20px 0;
  // }
</style>
