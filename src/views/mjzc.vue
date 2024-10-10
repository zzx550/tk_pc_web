<template>
  <div class="content head_b_" style="padding: 40px 0">
    <div v-html="txt"></div>
  </div>
</template>

<script setup lang="ts">
  import { api_indexDesc } from '@/requset/api'
  import { ref } from 'vue'

  let txt = ref<string>('')

  api_indexDesc({ name: 'seller_policy' }).then((res: any) => {
    if (res.success) {
      txt.value = res.data
    }
  })
</script>

<style lang="less" scoped>
  tbody {
    border: 1px solid #ccc;
    text-align: center;
    td {
      padding: 8px 0;
      border: 1px solid #ccc;
      font-size: 14px;
    }
  }
</style>
